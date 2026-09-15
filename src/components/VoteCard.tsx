/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, BadgeCheck, Timer, Flame, Sparkles, Vote } from 'lucide-react';
import { Poll, totalVotes } from '../data/polls';
import { useLanguage } from '../i18n/LanguageContext';

interface VoteCardProps {
  poll: Poll;
  onOpen: (id: string) => void;
}

function statusIcon(badge: string) {
  const lower = badge.toLowerCase();
  if (lower.includes('trending')) return <Flame size={12} />;
  if (lower.includes('multi')) return <Sparkles size={12} />;
  return <Timer size={12} />;
}

export const VoteCard: React.FC<VoteCardProps> = ({ poll, onOpen }) => {
  const { t, lang } = useLanguage();
  const voters = totalVotes(poll);
  const preview = poll.candidates.slice(0, 3);
  const extra = poll.candidates.length - preview.length;

  return (
    <div className="group bg-white rounded-[20px] border border-[#ece9f5] shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_28px_rgba(16,24,40,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Cover */}
      <div className="p-3 pb-0">
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#191c1e]">
          <img
            src={poll.coverImage}
            alt={poll.question}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />

          {/* Top row */}
          <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-sm shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {t.voting.liveBadge}
            </span>
            <span className="text-white/90 text-[12px] font-semibold truncate drop-shadow">
              {poll.categoryLabel}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 bg-white/95 text-[#191c1e] text-[11px] font-bold px-2.5 py-1.5 rounded-full shadow-sm shrink-0">
              <Timer size={12} className="text-[#dc2626]" />
              {t.voting.remaining} {poll.closesInLabel}
            </span>
          </div>

          {/* Bottom row */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#dc2626] text-white flex items-center justify-center shrink-0">
              <BadgeCheck size={14} />
            </span>
            <span className="text-white text-[13px] font-semibold truncate drop-shadow">
              {poll.organizer}
            </span>
            <span className="ml-auto text-white/80 text-[12px] font-medium shrink-0 drop-shadow">
              {poll.seriesLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-4 pb-4 flex flex-col gap-3 flex-1">
        <h3 className="text-[19px] font-extrabold text-[#191c1e] tracking-tight leading-snug truncate">
          {poll.question}
        </h3>

        {/* Stat bar */}
        <div className="flex items-center gap-3 rounded-xl border border-[#ece9f5] bg-[#fbfaff] px-3.5 py-2.5">
          <span className="flex items-center gap-1.5 text-[14px] font-bold text-[#191c1e] shrink-0">
            <Vote size={15} className="text-[#dc2626]" />
            {voters.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}{' '}
            <span className="font-semibold">{t.voting.votes}</span>
          </span>
          <span className="w-px h-4 bg-[#e2e0ec]" />
          <span className="text-[13px] text-[#565e74] truncate ml-auto">{poll.categoryCountLabel}</span>
        </div>

        {/* Avatars + status */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2.5 shrink-0">
            {preview.map((c) => (
              <span
                key={c.id}
                title={c.name}
                className="w-7 h-7 rounded-full border-2 border-white bg-[#fde8e8] text-[#b3220f] text-[10px] font-bold flex items-center justify-center shadow-sm"
              >
                {c.number}
              </span>
            ))}
            {extra > 0 && (
              <span className="w-7 h-7 rounded-full border-2 border-white bg-[#f2f4f6] text-[#565e74] text-[10px] font-bold flex items-center justify-center shadow-sm">
                +{extra}
              </span>
            )}
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 bg-[#fff5ed] text-[#c2410c] text-[12px] font-bold px-2.5 py-1.5 rounded-full shrink-0">
            {statusIcon(poll.statusBadge)}
            {poll.statusBadge}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3.5 border-t border-[#f1f0f7] flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[#94a3b8]">
              {poll.accessLabel}
            </div>
            <div className="text-[14px] font-bold text-[#191c1e] truncate">{poll.accessValue}</div>
          </div>
          <button
            onClick={() => onOpen(poll.id)}
            className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold pl-5 pr-4 py-2.5 rounded-full hover:bg-[#b91c1c] active:scale-[0.98] transition-all shadow-sm shrink-0 cursor-pointer"
          >
            {t.voting.openBooth}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
