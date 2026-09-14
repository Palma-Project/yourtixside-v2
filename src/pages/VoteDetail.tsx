/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, LogOut } from 'lucide-react';
import { Poll } from '../data/polls';
import { useLanguage } from '../i18n/LanguageContext';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { hasVoted, recordVote, getVoteDeltas } from '../lib/voteStorage';

interface VoteDetailProps {
  poll: Poll;
  onBack: () => void;
}

export const VoteDetail: React.FC<VoteDetailProps> = ({ poll, onBack }) => {
  const { t, lang } = useLanguage();
  const { user, configured, renderButtonInto, signOut } = useGoogleAuth();
  const buttonHostRef = useRef<HTMLDivElement>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deltas, setDeltas] = useState<Record<string, number>>(() => getVoteDeltas(poll.id));

  const existingVote = user ? hasVoted(poll.id, user.email) : null;
  const alreadyVoted = !!existingVote || submitted;

  useEffect(() => {
    if (existingVote) setSelected(existingVote.candidateIds);
  }, [existingVote?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user && !alreadyVoted && buttonHostRef.current) {
      renderButtonInto(buttonHostRef.current);
    }
  }, [user, alreadyVoted, renderButtonInto]);

  const totalWithDeltas = useMemo(() => {
    return poll.candidates.reduce((sum, c) => sum + c.votes + (deltas[c.id] || 0), 0);
  }, [poll, deltas]);

  const toggleCandidate = (candidateId: string) => {
    if (alreadyVoted) return;
    setError(null);
    if (poll.selectionType === 'single') {
      setSelected([candidateId]);
      return;
    }
    setSelected((prev) => {
      if (prev.includes(candidateId)) return prev.filter((id) => id !== candidateId);
      if (poll.maxSelect && prev.length >= poll.maxSelect) return prev;
      return [...prev, candidateId];
    });
  };

  const handleSubmit = () => {
    if (!user) return;
    const min = poll.selectionType === 'multi' ? poll.minSelect ?? 1 : 1;
    const max = poll.selectionType === 'multi' ? poll.maxSelect ?? poll.candidates.length : 1;

    if (selected.length < min) {
      setError(t.voteDetail.selectAtLeast.replace('{min}', String(min)));
      return;
    }
    if (selected.length > max) {
      setError(t.voteDetail.selectAtMost.replace('{max}', String(max)));
      return;
    }

    setSubmitting(true);
    setError(null);
    // Simulated network delay for the submit affordance; real version
    // will POST to the backend described in docs/VOTING_BACKEND_MIGRATION.md.
    setTimeout(() => {
      recordVote(poll.id, user.email, selected);
      setDeltas(getVoteDeltas(poll.id));
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  const pickHint =
    poll.selectionType === 'single'
      ? t.voteDetail.pickSingle
      : t.voteDetail.pickMulti
          .replace('{min}', String(poll.minSelect ?? 1))
          .replace('{max}', String(poll.maxSelect ?? poll.candidates.length));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-[#565e74] text-[13px] font-semibold hover:text-[#191c1e] transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft size={15} />
          {t.voteDetail.back}
        </button>

        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wide">
          {t.voting.closes} {poll.closesLabel}
        </span>
        <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#191c1e] tracking-tight leading-tight mt-1.5 mb-3">
          {poll.question}
        </h1>
        <p className="text-[14px] leading-[23px] text-[#565e74] mb-8">{poll.description}</p>

        {/* Candidates — always visible to everyone */}
        <h2 className="text-[13px] font-bold uppercase tracking-wide text-[#94a3b8] mb-3">
          {t.voteDetail.candidates}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {poll.candidates.map((candidate) => {
            const votes = candidate.votes + (deltas[candidate.id] || 0);
            const pct = totalWithDeltas > 0 ? Math.round((votes / totalWithDeltas) * 100) : 0;
            const isSelected = selected.includes(candidate.id);
            const clickable = !alreadyVoted;

            return (
              <button
                key={candidate.id}
                onClick={() => toggleCandidate(candidate.id)}
                disabled={!clickable}
                className={`relative text-left rounded-2xl border overflow-hidden transition-all ${
                  clickable ? 'cursor-pointer hover:border-[#dc2626]' : 'cursor-default'
                } ${isSelected ? 'border-[#dc2626] ring-1 ring-[#dc2626]' : 'border-[#e2e8f0]'}`}
              >
                {alreadyVoted && (
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                      isSelected ? 'bg-[#fef2f2]' : 'bg-[#f8fafc]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                )}
                <div className="relative flex items-start gap-3 p-3.5">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[14px] font-bold text-[#191c1e] truncate">{candidate.name}</h3>
                      {isSelected && !alreadyVoted && (
                        <span className="w-5 h-5 rounded-full bg-[#dc2626] text-white flex items-center justify-center shrink-0">
                          <Check size={12} />
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-[#565e74] leading-[18px] mt-0.5 line-clamp-2">
                      {candidate.summary}
                    </p>
                    {alreadyVoted && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[12px] font-bold text-[#191c1e]">{pct}%</span>
                        {isSelected && (
                          <span className="text-[11px] font-semibold text-[#dc2626]">
                            {t.voteDetail.yourPick}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Vote action panel */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-[#f7f9fb] p-5">
          {alreadyVoted ? (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0">
                <Check size={18} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#191c1e]">
                  {submitted && !existingVote ? t.voteDetail.submitted : t.voteDetail.alreadyVoted}
                </p>
                <p className="text-[13px] text-[#565e74] mt-0.5">{t.voteDetail.alreadyVotedBody}</p>
              </div>
            </div>
          ) : !configured ? (
            <p className="text-[13px] text-[#94a3b8] text-center py-2">{t.voteDetail.signInNotConfigured}</p>
          ) : !user ? (
            <div className="text-center">
              <p className="text-[13px] text-[#565e74] mb-4">{t.voteDetail.signInPrompt}</p>
              <div className="flex justify-center" ref={buttonHostRef} />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#e2e8f0]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#94a3b8] leading-none">{t.voteDetail.signedInAs}</p>
                    <p className="text-[13px] font-semibold text-[#191c1e] truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={signOut}
                  className="shrink-0 flex items-center gap-1 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] transition-colors cursor-pointer"
                >
                  <LogOut size={13} />
                  {t.voteDetail.switchAccount}
                </button>
              </div>

              <p className="text-[12px] text-[#94a3b8] mb-3">{pickHint}</p>

              {error && <p className="text-[12px] font-semibold text-[#dc2626] mb-3">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting || selected.length === 0}
                className="w-full px-5 py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? t.voteDetail.submitting : t.voteDetail.submit}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
