/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Poll } from '../data/polls';
import { useLanguage } from '../i18n/LanguageContext';

interface VoteCardProps {
  poll: Poll;
}

export const VoteCard: React.FC<VoteCardProps> = ({ poll }) => {
  const { t, lang } = useLanguage();
  const [options, setOptions] = useState(poll.options);
  const [votedId, setVotedId] = useState<string | null>(null);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = (optionId: string) => {
    if (votedId) return;
    setOptions((prev) => prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o)));
    setVotedId(optionId);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-[15px] font-bold text-[#191c1e] leading-snug">{poll.question}</h3>
        <span className="shrink-0 text-[11px] font-semibold text-[#94a3b8] whitespace-nowrap pt-0.5">
          {t.voting.closes} {poll.closesLabel}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isPicked = votedId === option.id;
          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!!votedId}
              className={`relative w-full text-left rounded-xl border overflow-hidden transition-all ${
                votedId ? 'cursor-default' : 'cursor-pointer hover:border-[#dc2626]'
              } ${isPicked ? 'border-[#dc2626]' : 'border-[#e2e8f0]'}`}
            >
              {votedId && (
                <div
                  className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                    isPicked ? 'bg-[#fef2f2]' : 'bg-[#f8fafc]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              )}
              <div className="relative flex items-center justify-between px-3.5 py-2.5">
                <span
                  className={`text-[13px] font-semibold ${
                    isPicked ? 'text-[#dc2626]' : 'text-[#191c1e]'
                  }`}
                >
                  {option.label}
                </span>
                {votedId && (
                  <span className="text-[12px] font-bold text-[#565e74] shrink-0 ml-2">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[12px] text-[#94a3b8] pt-1 border-t border-[#f1f5f9]">
        <span>
          {totalVotes.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} {t.voting.votes}
        </span>
        {votedId && <span className="text-[#059669] font-semibold">{t.voting.voted}</span>}
      </div>
    </div>
  );
};
