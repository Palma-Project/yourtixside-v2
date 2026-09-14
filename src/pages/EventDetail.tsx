/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock } from 'lucide-react';
import { EventItem } from '../data/events';
import { useLanguage } from '../i18n/LanguageContext';

interface EventDetailProps {
  event: EventItem;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const { t, lang } = useLanguage();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(
    event.tickets.find((tk) => tk.available)?.id ?? null
  );

  const dateLabel = new Date(event.date + 'T00:00:00').toLocaleDateString(
    lang === 'id' ? 'id-ID' : 'en-US',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      <div className="relative h-[300px] sm:h-[420px] w-full overflow-hidden bg-[#191c1e]">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-5 left-4 sm:left-6 inline-flex items-center gap-1.5 text-white text-[13px] font-semibold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg hover:bg-black/55 transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          {t.eventDetail.back}
        </button>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 pb-6 w-full">
          <span className="inline-block bg-[#dc2626] text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md mb-3">
            {event.category}
          </span>
          <h1 className="text-[26px] sm:text-[38px] font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {/* Meta row */}
          <div className="flex flex-wrap gap-6 pb-6 border-b border-[#e2e8f0]">
            <div className="flex items-start gap-2.5">
              <Calendar size={18} className="text-[#dc2626] mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase">{t.eventDetail.date}</div>
                <div className="text-[14px] font-semibold text-[#191c1e]">{dateLabel}</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock size={18} className="text-[#dc2626] mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase">{t.eventDetail.time}</div>
                <div className="text-[14px] font-semibold text-[#191c1e]">{event.time}</div>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin size={18} className="text-[#dc2626] mt-0.5" />
              <div>
                <div className="text-[11px] font-semibold text-[#94a3b8] uppercase">{t.eventDetail.venue}</div>
                <div className="text-[14px] font-semibold text-[#191c1e]">
                  {event.venue}, {event.city}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#191c1e] mb-2.5">{t.eventDetail.about}</h2>
            <p className="text-[14px] leading-[23px] text-[#565e74]">{event.description}</p>
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#191c1e] mb-3">{t.eventDetail.lineup}</h2>
            <ul className="space-y-2">
              {event.lineup.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-[#191c1e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ticket panel */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5">
            <h3 className="text-[15px] font-bold text-[#191c1e] mb-1">{t.eventDetail.tickets}</h3>
            <p className="text-[12px] text-[#94a3b8] mb-4">{t.eventDetail.selectTicket}</p>

            <div className="space-y-2 mb-5">
              {event.tickets.map((tk) => (
                <button
                  key={tk.id}
                  disabled={!tk.available}
                  onClick={() => setSelectedTicket(tk.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-left transition-all ${
                    !tk.available
                      ? 'border-[#e2e8f0] bg-[#f8fafc] opacity-50 cursor-not-allowed'
                      : selectedTicket === tk.id
                      ? 'border-[#dc2626] bg-[#fef2f2] cursor-pointer'
                      : 'border-[#e2e8f0] hover:border-[#dc2626] cursor-pointer'
                  }`}
                >
                  <span className="text-[13px] font-semibold text-[#191c1e]">{tk.name}</span>
                  <span className="text-[13px] font-bold text-[#191c1e]">
                    {!tk.available
                      ? t.eventDetail.soldOut
                      : tk.price === 0
                      ? t.events.free
                      : `Rp${tk.price.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')}`}
                  </span>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedTicket}
              className="w-full px-5 py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {t.eventDetail.buyNow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
