/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { EventCard } from './EventCard';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../store/AppStore';

interface EventsSectionProps {
  searchQuery: string;
  onOpenEvent: (id: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ searchQuery, onOpenEvent }) => {
  const { t } = useLanguage();
  const { events } = useAppStore();

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return events;
    return events.filter((e) =>
      [e.title, e.venue, e.city, e.category].some((field) => field.toLowerCase().includes(q))
    );
  }, [searchQuery, events]);

  return (
    <section id="events" className="pt-6 sm:pt-8 pb-10 sm:pb-12 border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-6">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#dc2626]">
            {t.events.eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#191c1e] tracking-tight mt-2">
            {t.events.title}
          </h2>
          <p className="text-[15px] text-[#565e74] mt-2 leading-[24px]">{t.events.subtitle}</p>
        </div>

        {filtered.length === 0 ? (
          <p className="text-[14px] text-[#565e74] py-12 text-center">{t.events.noResults}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onOpen={onOpenEvent} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
