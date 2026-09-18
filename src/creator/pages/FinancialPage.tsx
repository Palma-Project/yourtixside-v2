/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, HandCoins, CalendarClock, Send } from 'lucide-react';
import { sponsorshipSubmissions as seedSponsorship, eventChangeRequests as seedChanges, SponsorshipSubmission, EventChangeRequest } from '../../data/creatorData';
import { Tabs, SectionCard, StatusBadge } from '../components/ui';

const TABS = [
  { id: 'calculator', label: 'Kalkulator Fee' },
  { id: 'sponsorship', label: 'Form Sponsorship' },
  { id: 'change', label: 'Perubahan Data Event' },
];

export const FinancialPage: React.FC = () => {
  const [active, setActive] = useState('calculator');
  const [price, setPrice] = useState(150000);
  const [qty, setQty] = useState(500);
  const [feePercent, setFeePercent] = useState(8);
  const [sponsorships, setSponsorships] = useState<SponsorshipSubmission[]>(seedSponsorship);
  const [changes, setChanges] = useState<EventChangeRequest[]>(seedChanges);
  const [sponsorEvent, setSponsorEvent] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorType, setSponsorType] = useState('');
  const [changeEvent, setChangeEvent] = useState('');
  const [changeType, setChangeType] = useState('Perubahan Tanggal');
  const [changeDetail, setChangeDetail] = useState('');

  const submitSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    setSponsorships((prev) => [
      { id: `sp${Date.now()}`, reportNumber: `SPN-2026-${Math.floor(1000 + Math.random() * 9000)}`, eventName: sponsorEvent, sponsorName, cooperationType: sponsorType, submittedAt: new Date().toISOString().slice(0, 10), status: 'diajukan' },
      ...prev,
    ]);
    setSponsorEvent('');
    setSponsorName('');
    setSponsorType('');
  };

  const submitChange = (e: React.FormEvent) => {
    e.preventDefault();
    setChanges((prev) => [
      { id: `ec${Date.now()}`, eventName: changeEvent, requestedChange: `${changeType}: ${changeDetail}`, submittedAt: new Date().toISOString().slice(0, 10), status: 'diajukan' },
      ...prev,
    ]);
    setChangeEvent('');
    setChangeDetail('');
  };

  const gross = price * qty;
  const fee = Math.round(gross * (feePercent / 100));
  const net = gross - fee;

  const fmt = (n: number) => 'Rp' + n.toLocaleString('id-ID');

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'calculator' && (
        <SectionCard
          title="Kalkulator Fee"
          description="Simulasi pendapatan bersih dari penjualan tiket. Hitungan lokal, tidak tersambung ke server."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Harga Tiket</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13.5px] text-[#94a3b8]">Rp</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value) || 0)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Jumlah Tiket Terjual</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">
                  Fee Platform: {feePercent}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={20}
                  value={feePercent}
                  onChange={(e) => setFeePercent(Number(e.target.value))}
                  className="w-full accent-[#dc2626]"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-[#fbfaff] border border-[#ece9f5] p-5 flex flex-col gap-3.5">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#dc2626]">
                <Calculator size={14} />
                Estimasi Pendapatan
              </span>
              <div className="flex items-center justify-between text-[13.5px]">
                <span className="text-[#565e74]">Pendapatan Kotor</span>
                <span className="font-bold text-[#191c1e]">{fmt(gross)}</span>
              </div>
              <div className="flex items-center justify-between text-[13.5px]">
                <span className="text-[#565e74]">Potongan Fee ({feePercent}%)</span>
                <span className="font-bold text-[#b3220f]">- {fmt(fee)}</span>
              </div>
              <div className="border-t border-[#ece9f5] pt-3.5 flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#191c1e]">Pendapatan Bersih</span>
                <span className="text-[22px] font-extrabold text-[#dc2626]">{fmt(net)}</span>
              </div>
            </div>
          </div>
        </SectionCard>
      )}

      {active === 'sponsorship' && (
        <>
          <SectionCard title="Ajukan Kerjasama Sponsor">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={submitSponsorship}>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Event</label>
                <input value={sponsorEvent} onChange={(e) => setSponsorEvent(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="Pilih event Anda" />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Calon Sponsor</label>
                <input value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="cth. Kabut Records" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Bentuk Kerjasama</label>
                <textarea value={sponsorType} onChange={(e) => setSponsorType(e.target.value)} required rows={3} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" placeholder="Jelaskan bentuk kerjasama yang diajukan" />
              </div>
              <div className="sm:col-span-2">
                <button className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <HandCoins size={15} />
                  Ajukan Sponsorship
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Riwayat Pengajuan Sponsorship">
            <div className="space-y-2">
              {sponsorships.map((s) => (
                <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                  <span className="text-[11px] font-mono text-[#94a3b8] shrink-0">{s.reportNumber}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[#191c1e] truncate">
                      {s.sponsorName} — {s.cooperationType}
                    </div>
                    <div className="text-[11.5px] text-[#94a3b8]">{s.eventName} • diajukan {s.submittedAt}</div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
              ))}
            </div>
          </SectionCard>
        </>
      )}

      {active === 'change' && (
        <>
          <SectionCard title="Form Perubahan Data Event" description="Request perubahan tanggal atau venue perlu approval Superadmin.">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={submitChange}>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Pilih Event</label>
                <input value={changeEvent} onChange={(e) => setChangeEvent(e.target.value)} required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="cth. Jazz Under the Stars" />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Jenis Perubahan</label>
                <select value={changeType} onChange={(e) => setChangeType(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]">
                  <option>Perubahan Tanggal</option>
                  <option>Perubahan Venue</option>
                  <option>Keduanya</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Jelaskan Perubahan yang Diminta</label>
                <textarea value={changeDetail} onChange={(e) => setChangeDetail(e.target.value)} required rows={3} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" placeholder="Jelaskan alasan dan detail perubahan" />
              </div>
              <div className="sm:col-span-2">
                <button className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Send size={15} />
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </SectionCard>

          <SectionCard title="Riwayat Pengajuan Perubahan">
            <div className="space-y-2">
              {changes.map((r) => (
                <div key={r.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                  <span className="w-9 h-9 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                    <CalendarClock size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[#191c1e]">{r.eventName}</div>
                    <div className="text-[11.5px] text-[#94a3b8] truncate">{r.requestedChange}</div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
};
