/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin } from 'lucide-react';
import { EventItem } from '../data/events';
import { useLanguage } from '../i18n/LanguageContext';

interface EventCardProps {
  event: EventItem;
  onOpen: (id: string) => void;
}

function formatDate(iso: string, lang: 'en' | 'id') {
  const d = new Date(iso + 'T00:00:00');
  return {
    day: d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { day: '2-digit' }),
    month: d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { weekday: 'long' }),
  };
}

export const EventCard: React.FC<EventCardProps> = ({ event, onOpen }) => {
  const { t, lang } = useLanguage();
  const { day, month, weekday } = formatDate(event.date, lang);
  const lowestPrice = Math.min(...event.tickets.map((tk) => tk.price));
  const isFree = lowestPrice === 0;

  return (
    <button
      onClick={() => onOpen(event.id)}
      className="group text-left bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f4f6]">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center shadow-sm">
          <div className="text-[15px] font-extrabold text-[#dc2626] leading-none">{day}</div>
          <div className="text-[10px] font-bold text-[#565e74] leading-none mt-0.5">{month}</div>
        </div>
        <div className="absolute top-3 right-3 bg-black/55 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-md">
          {event.category}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-wide">{weekday}</span>
        <h3 className="text-[15px] font-bold text-[#191c1e] leading-snug line-clamp-2 group-hover:text-[#dc2626] transition-colors">
          {event.title}
        </h3>
        <p className="text-[13px] text-[#565e74] flex items-center gap-1">
          <MapPin size={13} className="shrink-0" />
          <span className="truncate">
            {event.venue}, {event.city}
          </span>
        </p>
        <div className="mt-auto pt-2 text-[13px] font-semibold text-[#191c1e]">
          {isFree ? (
            <span className="text-[#059669]">{t.events.free}</span>
          ) : (
            <span>
              {t.events.from} Rp{lowestPrice.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
