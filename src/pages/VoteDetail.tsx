/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Users,
  Vote as VoteIcon,
  Share2,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { Poll, totalVotes } from '../data/polls';
import { getVoteDeltas } from '../lib/voteStorage';
import { useLanguage } from '../i18n/LanguageContext';

interface VoteDetailProps {
  poll: Poll;
  onBack: () => void;
  onOpenCandidate: (pollId: string, candidateId: string) => void;
}

export const VoteDetail: React.FC<VoteDetailProps> = ({ poll, onOpenCandidate }) => {
  const { t, lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const locale = lang === 'id' ? 'id-ID' : 'en-US';
  const deltas = useMemo(() => getVoteDeltas(poll.id), [poll.id]);

  const candidatesWithVotes = useMemo(
    () => poll.candidates.map((c) => ({ ...c, votes: c.votes + (deltas[c.id] || 0) })),
    [poll.candidates, deltas]
  );

  const total = useMemo(
    () => candidatesWithVotes.reduce((sum, c) => sum + c.votes, 0),
    [candidatesWithVotes]
  );

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? candidatesWithVotes
        : candidatesWithVotes.filter((c) => c.category === activeCategory),
    [candidatesWithVotes, activeCategory]
  );

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="bg-white">
      {/* Announcement bar */}
      <div className="bg-[#b3220f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center gap-3 text-[12px]">
          <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wide shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {poll.periodLabel}
          </span>
          <span className="text-white/80 truncate hidden sm:block">{poll.question}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 bg-white/15 px-2.5 py-1 rounded-full font-semibold shrink-0">
            {t.voteDetail.timeLeft}: {poll.closesLabel}
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff5f5] via-white to-white border-b border-[#f1f0f7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white border border-[#f3d5d5] text-[#b3220f] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
            {poll.eyebrow}
          </span>

          <h1 className="mt-5 text-[32px] sm:text-[44px] font-extrabold tracking-tight leading-[1.15] text-[#191c1e]">
            {poll.headlineLead}
            <br />
            <span className="text-[#dc2626]">{poll.headlineAccent}</span>
            <br />
            {poll.headlineTail}
          </h1>

          <p className="mt-4 text-[15px] leading-[25px] text-[#565e74] max-w-2xl mx-auto">
            {poll.description}
          </p>

          {/* Stat cards */}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
            <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm px-5 py-3.5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                <VoteIcon size={16} />
              </span>
              <div className="text-left">
                <div className="text-[20px] font-extrabold text-[#dc2626] leading-none">
                  {total.toLocaleString(locale)}
                </div>
                <div className="text-[11px] text-[#94a3b8] font-semibold mt-1">
                  {t.voteDetail.totalVotes}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm px-5 py-3.5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#f1f5f9] text-[#475569] flex items-center justify-center shrink-0">
                <Users size={16} />
              </span>
              <div className="text-left">
                <div className="text-[20px] font-extrabold text-[#191c1e] leading-none">
                  {poll.finalistCount}
                </div>
                <div className="text-[11px] text-[#94a3b8] font-semibold mt-1">
                  {t.voteDetail.finalists}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ece9f5] shadow-sm px-5 py-3.5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#f1f5f9] text-[#475569] flex items-center justify-center shrink-0">
                <ShieldCheck size={16} />
              </span>
              <div className="text-left">
                <div className="text-[20px] font-extrabold text-[#191c1e] leading-none">1 : 1</div>
                <div className="text-[11px] text-[#94a3b8] font-semibold mt-1">{poll.ratioLabel}</div>
              </div>
            </div>
          </div>

          {/* Category pills */}
          {poll.categories.length > 1 && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {poll.categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowAll(false);
                  }}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#dc2626] text-white shadow-sm'
                      : 'bg-white border border-[#ece9f5] text-[#565e74] hover:border-[#dc2626] hover:text-[#191c1e]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Live ticker */}
      <div className="border-b border-[#f1f0f7] bg-[#fbfaff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-6 overflow-x-auto no-scrollbar">
          {poll.ticker.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 text-[12px] whitespace-nowrap shrink-0"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.kind === 'system' ? 'bg-[#dc2626]' : 'bg-[#10b981]'
                }`}
              />
              <span className="font-semibold text-[#191c1e]">{item.name}</span>
              {item.city && <span className="text-[#94a3b8]">({item.city})</span>}
              <span className="text-[#565e74]">{item.message}</span>
              {item.time && <span className="text-[#cbd5e1]">{item.time}</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Candidate grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
              {t.voteDetail.officialList}
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#191c1e] tracking-tight mt-2">
              {t.voteDetail.gridTitle}
            </h2>
            <p className="text-[14px] text-[#565e74] mt-1.5">{t.voteDetail.gridSubtitle}</p>
          </div>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-[#94a3b8]">{t.voteDetail.sortBy}</span>
            <span className="inline-flex items-center gap-1.5 bg-white border border-[#ece9f5] px-3 py-1.5 rounded-lg font-semibold text-[#191c1e]">
              {t.voteDetail.sortMost}
              <ChevronDown size={14} className="text-[#94a3b8]" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((c) => {
            const percent = total > 0 ? Math.round((c.votes / total) * 100) : 0;
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-[#ece9f5] shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] bg-[#191c1e] overflow-hidden">
                  <img
                    src={c.photo}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/30" />

                  <span className="absolute top-3 left-3 bg-white/95 text-[#191c1e] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    NO. {c.number}
                  </span>
                  {c.badge && (
                    <span className="absolute top-3 right-3 bg-[#fff5ed] text-[#c2410c] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                      {c.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-white/85 text-[11px] font-semibold drop-shadow">
                      {t.voteDetail.categoryPrefix} {c.field}
                    </div>
                    <div className="text-white text-[17px] font-extrabold tracking-tight drop-shadow truncate">
                      {c.name}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="bg-[#f5f3ff] text-[#5b21b6] text-[11px] font-semibold px-2 py-1 rounded-md">
                      {c.field}
                    </span>
                    {c.score && (
                      <span className="bg-[#f1f5f9] text-[#475569] text-[11px] font-semibold px-2 py-1 rounded-md">
                        {c.score}
                      </span>
                    )}
                    {c.rankLabel && (
                      <span className="bg-[#fde8e8] text-[#b3220f] text-[11px] font-bold px-2 py-1 rounded-md">
                        {c.rankLabel}
                      </span>
                    )}
                  </div>

                  <p className="text-[13px] leading-[20px] text-[#565e74] line-clamp-2 italic">
                    &ldquo;{c.summary}&rdquo;
                  </p>

                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-[#94a3b8]">
                        {t.voteDetail.votesGained}
                      </span>
                      <span className="text-[16px] font-extrabold text-[#dc2626]">
                        {c.votes.toLocaleString(locale)}{' '}
                        <span className="text-[12px] font-semibold text-[#94a3b8]">({percent}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#f1f0f7] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#dc2626] transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCandidate(poll.id, c.id)}
                    className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-full hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    {t.voteDetail.viewAndVote}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length > 6 && !showAll && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-white border border-[#ece9f5] text-[#191c1e] text-[13px] font-semibold px-5 py-2.5 rounded-full hover:border-[#dc2626] transition-colors cursor-pointer"
            >
              {t.voteDetail.viewAllFinalists.replace('{count}', String(filtered.length))}
              <ChevronDown size={15} />
            </button>
          </div>
        )}
      </section>

      {/* Three steps */}
      <section className="bg-[#fbfaff] border-y border-[#f1f0f7] py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white border border-[#f3d5d5] text-[#b3220f] text-[11px] font-bold px-3 py-1.5 rounded-full">
            {t.voteDetail.guideEyebrow}
          </span>
          <h2 className="text-[26px] sm:text-[30px] font-extrabold text-[#191c1e] tracking-tight mt-4">
            {t.voteDetail.guideTitle}
          </h2>
          <p className="text-[14px] text-[#565e74] mt-2">{t.voteDetail.guideSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-9 text-left">
            {t.voteDetail.steps.map((step, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 ${
                  i === 1 ? 'border-[#f3d5d5] shadow-sm' : 'border-[#ece9f5]'
                }`}
              >
                <span className="w-9 h-9 rounded-xl bg-[#fef2f2] text-[#dc2626] text-[15px] font-extrabold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="text-[15px] font-bold text-[#191c1e]">{step.title}</h3>
                <p className="text-[13px] leading-[20px] text-[#565e74]">{step.body}</p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#dc2626] mt-auto pt-1">
                  <CheckCircle2 size={13} />
                  {step.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-start gap-2.5 bg-white border border-[#ece9f5] rounded-xl px-4 py-3 text-left max-w-2xl">
            <Lock size={15} className="text-[#dc2626] mt-0.5 shrink-0" />
            <p className="text-[12px] leading-[19px] text-[#565e74]">{t.voteDetail.privacyNote}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-[24px] bg-gradient-to-br from-[#dc2626] to-[#b3220f] text-white px-6 sm:px-10 py-9 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-full">
              {t.voteDetail.ctaEyebrow}
            </span>
            <h2 className="text-[24px] sm:text-[30px] font-extrabold tracking-tight mt-3 leading-tight">
              {t.voteDetail.ctaTitle}
            </h2>
            <p className="text-[14px] text-white/85 mt-2 max-w-xl leading-[22px]">
              {t.voteDetail.ctaBody}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              className="bg-white text-[#b3220f] text-[14px] font-bold px-5 py-2.5 rounded-full hover:bg-[#fff5f5] active:scale-[0.98] transition-all cursor-pointer"
            >
              {t.voteDetail.ctaPrimary}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
              }}
              className="inline-flex items-center gap-2 bg-white/15 text-white text-[14px] font-semibold px-5 py-2.5 rounded-full hover:bg-white/25 transition-colors cursor-pointer"
            >
              <Share2 size={15} />
              {t.voteDetail.ctaShare}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
