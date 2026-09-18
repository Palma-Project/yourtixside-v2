/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Trash2, Smartphone, LogOut } from 'lucide-react';
import { EOAccount } from '../../store/AppStore';
import { Tabs, SectionCard, StatusBadge } from '../components/ui';

const TABS = [
  { id: 'personal', label: 'Profil Pribadi' },
  { id: 'org', label: 'Data Organisasi & Legal' },
  { id: 'team', label: 'Tim & Akses' },
];

interface CreatorAccountPageProps {
  account: EOAccount;
  onUpdate: (updates: Partial<EOAccount>) => void;
}

export const CreatorAccountPage: React.FC<CreatorAccountPageProps> = ({ account, onUpdate }) => {
  const [active, setActive] = useState('personal');
  const [form, setForm] = useState(account);
  const [team, setTeam] = useState(account.team);
  const [inviteEmail, setInviteEmail] = useState('');
  const [twoFA, setTwoFA] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof EOAccount>(key: K, value: EOAccount[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onUpdate(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const addTeamMember = () => {
    if (!inviteEmail.trim()) return;
    const newTeam = [...team, { id: `tm${Date.now()}`, email: inviteEmail.trim(), role: 'Akses Terbatas' }];
    setTeam(newTeam);
    onUpdate({ team: newTeam });
    setInviteEmail('');
  };

  const removeTeamMember = (id: string) => {
    const newTeam = team.filter((t) => t.id !== id);
    setTeam(newTeam);
    onUpdate({ team: newTeam });
  };

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'personal' && (
        <SectionCard title="Profil Pribadi (Penanggung Jawab)">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Lengkap</label>
              <input value={form.picName} onChange={(e) => set('picName', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nomor WhatsApp/HP</label>
              <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Email</label>
              <input
                value={form.email}
                disabled={form.loginMethod === 'google'}
                onChange={(e) => set('email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] disabled:bg-[#f8fafc]"
              />
            </div>
            {form.loginMethod === 'manual' && (
              <div>
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Ubah Password</label>
                <input type="password" placeholder="Password baru" className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[#e2e8f0] p-4 mb-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#191c1e]">
                <ShieldCheck size={15} className="text-[#dc2626]" />
                Autentikasi 2 Langkah (2FA) — disarankan aktif
              </span>
              <input type="checkbox" checked={twoFA} onChange={(e) => setTwoFA(e.target.checked)} className="w-4 h-4 accent-[#dc2626]" />
            </label>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-bold text-[#191c1e]">Riwayat Login / Device Aktif</span>
              <button className="text-[12px] font-semibold text-[#b3220f] hover:underline cursor-pointer inline-flex items-center gap-1">
                <LogOut size={12} />
                Logout Semua Device
              </button>
            </div>
            <div className="flex items-center gap-3 text-[12.5px] text-[#565e74]">
              <Smartphone size={14} />
              Chrome di macOS — sesi ini · aktif sekarang
            </div>
          </div>

          <button onClick={handleSave} className="mt-5 inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
            {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
          </button>
        </SectionCard>
      )}

      {active === 'org' && (
        <SectionCard title="Data Organisasi & Legal">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[12px] font-semibold text-[#94a3b8]">Status Verifikasi:</span>
            <StatusBadge status={form.verificationStatus === 'verified' ? 'signed' : form.verificationStatus === 'pending' ? 'pending' : 'rejected'} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="sm:col-span-2">
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Organisasi</label>
              <input value={form.orgName} onChange={(e) => set('orgName', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              <p className="text-[11px] text-[#94a3b8] mt-1">Perubahan nama saat ada MOU aktif akan butuh approval Superadmin.</p>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Jenis Badan Usaha</label>
              <select value={form.businessType || ''} onChange={(e) => set('businessType', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]">
                <option value="">Pilih</option>
                <option>Perorangan</option>
                <option>CV</option>
                <option>PT</option>
                <option>Yayasan</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Kategori/Genre Event</label>
              <input value={form.eventCategory || ''} onChange={(e) => set('eventCategory', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Deskripsi / Bio Organisasi</label>
              <textarea value={form.bio || ''} onChange={(e) => set('bio', e.target.value)} rows={2} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Alamat Organisasi</label>
              <input value={form.orgAddress || ''} onChange={(e) => set('orgAddress', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Media Sosial / Website</label>
              <input value={form.socials || ''} onChange={(e) => set('socials', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
          </div>

          <div className="rounded-xl border border-[#e2e8f0] p-4 mb-4 space-y-2.5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#565e74]">KTP Penanggung Jawab</span>
              <span className="font-semibold text-[#191c1e]">{form.ktpFileName || '—'}</span>
            </div>
            <div className="flex items-center justify-between text-[13px]">
              <span className="text-[#565e74]">NPWP</span>
              <span className="font-semibold text-[#191c1e]">{form.npwpFileName || '—'}</span>
            </div>
            <p className="text-[11px] text-[#94a3b8]">Update dokumen ini butuh pengajuan ulang & approval Superadmin.</p>
          </div>

          <div className="rounded-xl border border-[#fde68a] bg-[#fffbeb] p-4">
            <p className="text-[12.5px] font-bold text-[#92400e] mb-2">Data Finansial (paling sensitif)</p>
            <p className="text-[12px] text-[#b45309] mb-3">
              Perubahan rekening wajib lewat E-Signature Hub (Form Pernyataan Rekening), bukan edit langsung di sini.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <span className="text-[#92400e]">Bank: {form.bankName || '—'}</span>
              <span className="text-[#92400e]">No. Rek: {form.bankAccount || '—'}</span>
            </div>
          </div>

          <button onClick={handleSave} className="mt-5 inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
            {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
          </button>
        </SectionCard>
      )}

      {active === 'team' && (
        <SectionCard title="Tim & Akses" description="Kalau EO Anda dikelola lebih dari 1 orang, undang anggota tim di sini.">
          <div className="flex items-center gap-2 mb-5">
            <input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Email anggota baru"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
            />
            <button onClick={addTeamMember} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer shrink-0">
              <UserPlus size={14} />
              Undang
            </button>
          </div>

          {team.length === 0 ? (
            <p className="text-[13px] text-[#94a3b8] text-center py-6">Belum ada anggota tim lain — hanya Anda yang kelola akun ini.</p>
          ) : (
            <div className="space-y-2">
              {team.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                  <span className="text-[13px] font-semibold text-[#191c1e] flex-1 truncate">{t.email}</span>
                  <span className="text-[11.5px] bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-md shrink-0">{t.role}</span>
                  <button onClick={() => removeTeamMember(t.id)} className="text-[#94a3b8] hover:text-[#b3220f] shrink-0 cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}
    </div>
  );
};
