/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, Eye, Ban, Camera, Radio, Mail, Briefcase } from 'lucide-react';
import { useAppStore, EOAccount } from '../../store/AppStore';
import { Tabs, SectionCard, StatusBadge, StatPill } from '../../creator/components/ui';

const TOP_TABS = [
  { id: 'eo', label: 'Portal EO' },
  { id: 'voting', label: 'Voting & Polling' },
  { id: 'fotobooth', label: 'Fotobooth' },
  { id: 'program', label: 'Program' },
  { id: 'sistem', label: 'Sistem' },
];

const PROGRAM_SUBTABS = [
  { id: 'loyalty', label: 'Loyalty/Rewards' },
  { id: 'affiliate', label: 'Affiliate/Referral' },
];

const verifStatusMap: Record<EOAccount['verificationStatus'], string> = {
  verified: 'signed',
  pending: 'pending',
  rejected: 'rejected',
};

export const OperationalPage: React.FC = () => {
  const [active, setActive] = useState('eo');
  const [programTab, setProgramTab] = useState('loyalty');
  const { eoAccounts, setEoAccounts, votes, setVotes, logActivity, systemStatus, setSystemStatus } = useAppStore();
  const [statusDraft, setStatusDraft] = useState<'normal' | 'maintenance' | 'gangguan'>(systemStatus.status);
  const [statusMessageDraft, setStatusMessageDraft] = useState(systemStatus.message);

  const publishStatus = () => {
    setSystemStatus({ status: statusDraft, message: statusMessageDraft });
    logActivity(`Superadmin mempublikasikan status sistem: ${statusDraft}`);
  };
  const eoList = eoAccounts;
  const [votingEnabled, setVotingEnabled] = useState(true);
  const [maxOptions, setMaxOptions] = useState(10);
  const [rateLimit, setRateLimit] = useState(1);

  const verifyEO = (id: string) => {
    setEoAccounts((prev) => prev.map((e) => (e.id === id ? { ...e, verificationStatus: 'verified' } : e)));
    logActivity('Superadmin memverifikasi akun EO baru');
  };

  const toggleVoteStatus = (id: string) => {
    setVotes((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: v.status === 'aktif' ? 'selesai' : v.status } : v))
    );
  };

  return (
    <div>
      <Tabs tabs={TOP_TABS} active={active} onChange={setActive} />

      {active === 'eo' && (
        <SectionCard title="Direktori Event Creator" description="Verifikasi EO baru dan pantau status mereka.">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                  <th className="pb-2.5 pr-4">Nama EO</th>
                  <th className="pb-2.5 pr-4">Status</th>
                  <th className="pb-2.5 pr-4">Event Aktif</th>
                  <th className="pb-2.5 pr-4">Bergabung</th>
                  <th className="pb-2.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {eoList.map((eo) => (
                  <tr key={eo.id} className="border-b border-[#f1f5f9]">
                    <td className="py-3 pr-4 font-semibold text-[#191c1e]">{eo.orgName}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={verifStatusMap[eo.verificationStatus]} />
                    </td>
                    <td className="py-3 pr-4 text-[#565e74]">{eo.activeEvents}</td>
                    <td className="py-3 pr-4 text-[#94a3b8]">{eo.joinedAt}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <button className="text-[#565e74] hover:text-[#191c1e] cursor-pointer" title="Lihat Detail">
                          <Eye size={15} />
                        </button>
                        {eo.verificationStatus === 'pending' && (
                          <button
                            onClick={() => verifyEO(eo.id)}
                            className="text-[#059669] hover:text-[#047857] cursor-pointer"
                            title="Verifikasi"
                          >
                            <CheckCircle2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === 'voting' && (
        <>
          <SectionCard title="Pengaturan Global">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center justify-between rounded-xl border border-[#e2e8f0] px-3.5 py-3 cursor-pointer">
                <span className="text-[13px] font-semibold text-[#191c1e]">Fitur Voting Aktif</span>
                <input
                  type="checkbox"
                  checked={votingEnabled}
                  onChange={(e) => setVotingEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#dc2626]"
                />
              </label>
              <div className="rounded-xl border border-[#e2e8f0] px-3.5 py-3">
                <label className="text-[11.5px] font-semibold text-[#94a3b8] block mb-1">Maks Opsi per Vote</label>
                <input
                  type="number"
                  value={maxOptions}
                  onChange={(e) => setMaxOptions(Number(e.target.value) || 1)}
                  className="w-full text-[14px] font-bold text-[#191c1e] outline-none"
                />
              </div>
              <div className="rounded-xl border border-[#e2e8f0] px-3.5 py-3">
                <label className="text-[11.5px] font-semibold text-[#94a3b8] block mb-1">Rate Limit (vote/menit)</label>
                <input
                  type="number"
                  value={rateLimit}
                  onChange={(e) => setRateLimit(Number(e.target.value) || 1)}
                  className="w-full text-[14px] font-bold text-[#191c1e] outline-none"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Semua Vote dari Seluruh EO">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                    <th className="pb-2.5 pr-4">Judul Vote</th>
                    <th className="pb-2.5 pr-4">EO</th>
                    <th className="pb-2.5 pr-4">Status</th>
                    <th className="pb-2.5 pr-4">Total Suara</th>
                    <th className="pb-2.5 pr-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {votes.map((v) => (
                    <tr key={v.id} className="border-b border-[#f1f5f9]">
                      <td className="py-3 pr-4 font-semibold text-[#191c1e]">{v.question}</td>
                      <td className="py-3 pr-4 text-[#565e74]">{v.eoName}</td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={v.status} />
                      </td>
                      <td className="py-3 pr-4 text-[#565e74]">{v.candidates.reduce((sum, c) => sum + c.votes, 0).toLocaleString('id-ID')}</td>
                      <td className="py-3 pr-4">
                        {v.status === 'aktif' && (
                          <button
                            onClick={() => toggleVoteStatus(v.id)}
                            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#b3220f] hover:underline cursor-pointer"
                          >
                            <Ban size={12} />
                            Nonaktifkan
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </>
      )}

      {active === 'fotobooth' && (
        <SectionCard title="Fotobooth" description="Manajemen frame & moderasi galeri fotobooth (beda dari 'Take a Moment' milik EO).">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-5">
            <StatPill label="Frame Aktif" value={6} icon={<Camera size={15} />} />
            <StatPill label="Foto Bulan Ini" value="1.284" icon={<Camera size={15} />} />
            <StatPill label="Menunggu Moderasi" value={12} icon={<Camera size={15} />} />
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button onClick={() => window.alert('Membuka pengaturan frame fotobooth... (simulasi — modul ini belum terhubung ke data live)')} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
              Kelola Frame
            </button>
            <button onClick={() => window.alert('Membuka galeri moderasi fotobooth... (simulasi — modul ini belum terhubung ke data live)')} className="inline-flex items-center gap-1.5 border border-[#e2e8f0] text-[#191c1e] text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer">
              Moderasi Galeri
            </button>
          </div>
        </SectionCard>
      )}

      {active === 'program' && (
        <>
          <Tabs tabs={PROGRAM_SUBTABS} active={programTab} onChange={setProgramTab} />
          {programTab === 'loyalty' && (
            <SectionCard title="Loyalty / Rewards">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Poin per Rp10.000 Transaksi</label>
                  <input type="number" defaultValue={1} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Minimum Poin untuk Redeem</label>
                  <input type="number" defaultValue={500} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                </div>
              </div>
            </SectionCard>
          )}
          {programTab === 'affiliate' && (
            <SectionCard title="Affiliate / Referral">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                      <th className="pb-2.5 pr-4">Affiliate</th>
                      <th className="pb-2.5 pr-4">Komisi</th>
                      <th className="pb-2.5 pr-4">Total Referral</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#f1f5f9]">
                      <td className="py-3 pr-4 font-semibold text-[#191c1e]">@kampusdigest</td>
                      <td className="py-3 pr-4 text-[#565e74]">5%</td>
                      <td className="py-3 pr-4 text-[#565e74]">42 tiket</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}
        </>
      )}

      {active === 'sistem' && (
        <>
          <SectionCard title="Status Sistem" description="Publikasikan info maintenance/gangguan ke Landing Page.">
            <div className="flex flex-wrap items-center gap-3">
              <select value={statusDraft} onChange={(e) => setStatusDraft(e.target.value as typeof statusDraft)} className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] font-semibold">
                <option value="normal">Normal</option>
                <option value="maintenance">Maintenance Terjadwal</option>
                <option value="gangguan">Gangguan Sebagian</option>
              </select>
              <input
                value={statusMessageDraft}
                onChange={(e) => setStatusMessageDraft(e.target.value)}
                placeholder="Pesan status (opsional)"
                className="flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
              />
              <button onClick={publishStatus} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
                <Radio size={13} />
                Publikasikan
              </button>
            </div>
          </SectionCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <SectionCard title="Newsletter">
              <p className="text-[12.5px] text-[#565e74] mb-3">2.480 subscriber aktif.</p>
              <button className="inline-flex items-center gap-1.5 border border-[#e2e8f0] text-[#191c1e] text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer">
                <Mail size={13} />
                Compose Newsletter
              </button>
            </SectionCard>
            <SectionCard title="Career Page">
              <p className="text-[12.5px] text-[#565e74] mb-3">3 lowongan sedang tayang.</p>
              <button className="inline-flex items-center gap-1.5 border border-[#e2e8f0] text-[#191c1e] text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer">
                <Briefcase size={13} />
                Kelola Lowongan
              </button>
            </SectionCard>
          </div>
        </>
      )}
    </div>
  );
};
