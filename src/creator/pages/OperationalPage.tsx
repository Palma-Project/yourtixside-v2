/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, ScanLine, Receipt, LifeBuoy, MessageSquare, FileImage } from 'lucide-react';
import { calendarBookings, brandAssets } from '../../data/creatorData';
import { Tabs, SectionCard } from '../components/ui';

const TABS = [
  { id: 'calendar', label: 'Kalender Event' },
  { id: 'assets', label: 'Pusat Unduhan Aset' },
  { id: 'guides', label: 'Panduan & Forum' },
];

const MONTH_LABEL = 'September 2026';
const DAYS_IN_MONTH = 30;
const START_WEEKDAY = 2; // Sept 1, 2026 is a Tuesday (0=Sun)

const GUIDES = [
  { icon: ScanLine, title: 'Panduan Scan Tiket di Venue', body: 'Cara pakai app scanner dan menangani error saat hari-H.' },
  { icon: Receipt, title: 'Panduan Pajak & Invoice', body: 'Cara membuat invoice, potongan pajak, dan kewajiban lapor.' },
  { icon: LifeBuoy, title: 'Panduan Disaster / Contingency', body: 'SOP saat ada masalah hari-H — sistem down atau gangguan venue.' },
  { icon: MessageSquare, title: 'Forum Komunitas EO', body: 'Wadah diskusi antar Event Organizer untuk berbagi pengalaman.' },
];

export const OperationalPage: React.FC = () => {
  const [active, setActive] = useState('calendar');

  const bookedDates = new Set(calendarBookings.filter((b) => b.date.startsWith('2026-09')).map((b) => Number(b.date.slice(-2))));

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'calendar' && (
        <SectionCard
          title="Kalender Event"
          description="Cek tanggal yang sudah terpakai sebelum mengajukan event baru."
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[14px] font-bold text-[#191c1e]">{MONTH_LABEL}</span>
            <span className="inline-flex items-center gap-1.5 text-[11.5px] text-[#565e74]">
              <span className="w-2.5 h-2.5 rounded bg-[#fde8e8]" /> Tanggal terpakai
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] font-semibold text-[#94a3b8] mb-1.5">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: START_WEEKDAY }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: DAYS_IN_MONTH }).map((_, i) => {
              const day = i + 1;
              const isBooked = bookedDates.has(day);
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-[12.5px] font-semibold ${
                    isBooked ? 'bg-[#fde8e8] text-[#b3220f]' : 'bg-[#f8fafc] text-[#565e74]'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#f1f5f9] space-y-2">
            {calendarBookings.map((b, i) => (
              <div key={i} className="flex items-center gap-3 text-[13px]">
                <span className="w-14 shrink-0 font-bold text-[#dc2626]">{b.date.slice(-2)} {b.date.slice(5, 7) === '09' ? 'Sep' : b.date.slice(5, 7) === '10' ? 'Okt' : 'Nov'}</span>
                <span className="font-semibold text-[#191c1e]">{b.eventName}</span>
                <span className="text-[#94a3b8]">— {b.venue}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {active === 'assets' && (
        <SectionCard title="Pusat Unduhan Aset" description="Galeri aset resmi YourTix — logo, banner, template, dan brand guideline.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {brandAssets.map((asset) => (
              <div key={asset.id} className="rounded-xl border border-[#e2e8f0] p-3.5 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                  <FileImage size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold text-[#191c1e] truncate">{asset.name}</div>
                  <div className="text-[11px] text-[#94a3b8]">{asset.fileType} • {asset.size}</div>
                </div>
                <button className="text-[#dc2626] hover:text-[#b91c1c] shrink-0 cursor-pointer">
                  <Download size={17} />
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {active === 'guides' && (
        <SectionCard title="Panduan & Forum Komunitas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {GUIDES.map((guide, i) => (
              <button
                key={i}
                className="text-left rounded-xl border border-[#e2e8f0] p-4 hover:border-[#dc2626] hover:shadow-sm transition-all cursor-pointer"
              >
                <span className="w-9 h-9 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mb-3">
                  <guide.icon size={16} />
                </span>
                <div className="text-[13.5px] font-bold text-[#191c1e] mb-1">{guide.title}</div>
                <p className="text-[12px] text-[#565e74] leading-[18px]">{guide.body}</p>
              </button>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
};
