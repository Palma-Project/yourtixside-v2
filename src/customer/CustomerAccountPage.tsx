/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, LogOut, Download, Trash2, Vote, Camera, FileSearch } from 'lucide-react';
import { CustomerAccount, SharedComplaint } from '../store/AppStore';
import { Poll } from '../data/polls';
import { momentPhotos } from '../data/creatorData';
import { SectionCard } from '../creator/components/ui';

interface CustomerAccountPageProps {
  account: CustomerAccount;
  votes: Poll[];
  complaints: SharedComplaint[];
  onUpdate: (updates: Partial<CustomerAccount>) => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
  onBack: () => void;
}

export const CustomerAccountPage: React.FC<CustomerAccountPageProps> = ({
  account,
  votes,
  complaints,
  onUpdate,
  onLogout,
  onDeleteAccount,
  onBack,
}) => {
  const [form, setForm] = useState(account);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof CustomerAccount>(key: K, value: CustomerAccount[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    onUpdate(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const votedPolls = votes.filter((v) => (v.votedEmails ?? []).includes(account.email));

  const downloadMyData = () => {
    const payload = { account, votedPolls: votedPolls.map((v) => v.question), complaints };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yourtixside-data-${account.email}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    const confirmText = window.prompt('Ketik "HAPUS" untuk konfirmasi penghapusan akun permanen:');
    if (confirmText === 'HAPUS') {
      onDeleteAccount();
    }
  };
  const myComplaints = complaints.filter((c) => c.reporterEmail.toLowerCase() === account.email.toLowerCase());
  const myMoments = momentPhotos.filter((p) => p.submitterEmail === account.email);

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="text-[#565e74] hover:text-[#191c1e] cursor-pointer">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[15px] font-bold text-[#191c1e]">Akun Saya</span>
          <button onClick={onLogout} className="ml-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#b3220f] hover:underline cursor-pointer">
            <LogOut size={14} />
            Keluar
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        <SectionCard title="Identitas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Lengkap</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Tanggal Lahir (opsional)</label>
              <input type="date" value={form.birthDate || ''} onChange={(e) => set('birthDate', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Kontak">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Email</label>
              <input value={form.email} disabled={form.loginMethod === 'google'} onChange={(e) => set('email', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] disabled:bg-[#f8fafc]" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nomor WhatsApp/HP (opsional)</label>
              <input value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Alamat (opsional)</label>
              <input value={form.address || ''} onChange={(e) => set('address', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
          </div>
        </SectionCard>

        {form.loginMethod === 'manual' && (
          <SectionCard title="Keamanan">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <input type="password" placeholder="Password baru" className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <ShieldCheck size={15} className="text-[#dc2626]" />
              <span className="text-[13px] text-[#191c1e] flex-1">Autentikasi 2 Langkah (2FA)</span>
              <input type="checkbox" className="w-4 h-4 accent-[#dc2626]" />
            </label>
          </SectionCard>
        )}

        <SectionCard title="Preferensi Notifikasi">
          <div className="space-y-2.5">
            {(['votes', 'complaints', 'promo'] as const).map((key) => (
              <label key={key} className="flex items-center justify-between cursor-pointer">
                <span className="text-[13px] text-[#191c1e]">
                  {key === 'votes' ? 'Hasil vote' : key === 'complaints' ? 'Update komplain' : 'Promo/newsletter'}
                </span>
                <input
                  type="checkbox"
                  checked={form.notifyEmail[key]}
                  onChange={(e) => set('notifyEmail', { ...form.notifyEmail, [key]: e.target.checked })}
                  className="w-4 h-4 accent-[#dc2626]"
                />
              </label>
            ))}
          </div>
          <button onClick={handleSave} className="mt-4 inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
            {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
          </button>
        </SectionCard>

        <SectionCard title="Aktivitas & Riwayat">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#191c1e] mb-2">
                <Vote size={13} className="text-[#dc2626]" />
                Riwayat Vote Diikuti ({votedPolls.length})
              </div>
              {votedPolls.length === 0 ? (
                <p className="text-[12px] text-[#94a3b8]">Belum ada vote yang diikuti.</p>
              ) : (
                votedPolls.map((v) => <p key={v.id} className="text-[12.5px] text-[#565e74]">• {v.title}</p>)
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#191c1e] mb-2">
                <Camera size={13} className="text-[#dc2626]" />
                Galeri Momen Saya ({myMoments.length})
              </div>
              {myMoments.length === 0 && <p className="text-[12px] text-[#94a3b8]">Belum ada foto tersambung.</p>}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-[#191c1e] mb-2">
                <FileSearch size={13} className="text-[#dc2626]" />
                Riwayat Laporan/Komplain ({myComplaints.length})
              </div>
              {myComplaints.length === 0 ? (
                <p className="text-[12px] text-[#94a3b8]">Belum ada laporan yang diajukan.</p>
              ) : (
                myComplaints.map((c) => (
                  <p key={c.id} className="text-[12.5px] text-[#565e74] font-mono">
                    • {c.ticketNumber} — {c.status}
                  </p>
                ))
              )}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Lainnya">
          <div className="flex flex-wrap gap-2.5">
            <button onClick={downloadMyData} className="inline-flex items-center gap-1.5 border border-[#e2e8f0] text-[#191c1e] text-[12.5px] font-semibold px-3.5 py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer">
              <Download size={13} />
              Unduh Data Saya
            </button>
            <button onClick={handleDeleteAccount} className="inline-flex items-center gap-1.5 border border-[#fecaca] text-[#b3220f] text-[12.5px] font-semibold px-3.5 py-2 rounded-lg hover:bg-[#fef2f2] transition-colors cursor-pointer">
              <Trash2 size={13} />
              Hapus Akun
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
