/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VoteCard } from './VoteCard';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../store/AppStore';

interface VotingSectionProps {
  onOpenPoll: (id: string) => void;
}

export const VotingSection: React.FC<VotingSectionProps> = ({ onOpenPoll }) => {
  const { t } = useLanguage();
  const { votes } = useAppStore();
  const activePolls = votes.filter((v) => (v.status ?? 'aktif') === 'aktif');

  return (
    <section id="voting" className="py-10 sm:py-12 bg-[#f7f9fb] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-6">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#dc2626]">
            {t.voting.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#191c1e] tracking-tight mt-2">
            {t.voting.title}
          </h2>
          <p className="text-[15px] text-[#565e74] mt-2 leading-[24px]">{t.voting.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activePolls.map((poll) => (
            <VoteCard key={poll.id} poll={poll} onOpen={onOpenPoll} />
          ))}
        </div>
      </div>
    </section>
  );
};
