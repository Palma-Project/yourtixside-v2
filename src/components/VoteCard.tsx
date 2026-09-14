/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Users } from 'lucide-react';
import { Poll, totalVotes } from '../data/polls';
import { useLanguage } from '../i18n/LanguageContext';

interface VoteCardProps {
  poll: Poll;
  onOpen: (id: string) => void;
}

export const VoteCard: React.FC<VoteCardProps> = ({ poll, onOpen }) => {
  const { t, lang } = useLanguage();
  const voters = totalVotes(poll);
  const previewCandidates = poll.candidates.slice(0, 3);

  return (
    <button
      onClick={() => onOpen(poll.id)}
      className="group text-left bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col p-4"
    >
      <div className="flex -space-x-3 mb-3.5">
        {previewCandidates.map((c) => (
          <img
            key={c.id}
            src={c.photo}
            alt={c.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm"
          />
        ))}
        {poll.candidates.length > 3 && (
          <div className="w-11 h-11 rounded-full bg-[#f2f4f6] border-2 border-white shadow-sm flex items-center justify-center text-[11px] font-bold text-[#565e74]">
            +{poll.candidates.length - 3}
          </div>
        )}
      </div>

      <h3 className="text-[15px] font-bold text-[#191c1e] leading-snug line-clamp-2 group-hover:text-[#dc2626] transition-colors mb-1.5">
        {poll.question}
      </h3>

      <p className="text-[13px] text-[#565e74] line-clamp-2 mb-3">{poll.description}</p>

      <div className="mt-auto pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-[12px] text-[#94a3b8]">
        <span className="flex items-center gap-1.5">
          <Users size={13} />
          {voters.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')} {t.voting.voters}
        </span>
        <span>
          {t.voting.closes} {poll.closesLabel}
        </span>
      </div>
    </button>
  );
};
