/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserPlus, ShieldCheck } from 'lucide-react';
import { staffMembers as seedStaff, StaffMember } from '../../data/superadminData';
import { Tabs, SectionCard } from '../../creator/components/ui';

const TABS = [
  { id: 'staff', label: 'User & Akses' },
  { id: 'settings', label: 'Pengaturan Umum' },
];

export const AdminPage: React.FC = () => {
  const [active, setActive] = useState('staff');
  const [staff, setStaff] = useState<StaffMember[]>(seedStaff);

  const inviteStaff = () => {
    const email = window.prompt('Email staff yang diundang:');
    if (!email) return;
    const role = window.prompt('Role (CS Staff / Content Staff / Finance Staff):', 'CS Staff') || 'CS Staff';
    setStaff((prev) => [
      ...prev,
      { id: `st${Date.now()}`, name: email.split('@')[0], role: role as StaffMember['role'], modules: ['Belum diatur'] },
    ]);
    window.alert(`Undangan telah dikirim ke ${email}. (simulasi — akun aktif langsung setelah "diterima")`);
  };

  const manageStaff = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'staff' && (
        <SectionCard
          title="User & Akses"
          description="Delegasikan kerja ke staff tanpa memberi akses penuh ke semua modul."
          action={
            <button onClick={inviteStaff} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
              <UserPlus size={13} />
              Undang Staff
            </button>
          }
        >
          <div className="space-y-2.5">
            {staff.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2e8f0] p-3.5">
                <span className="w-9 h-9 rounded-full bg-[#191c1e] text-white flex items-center justify-center text-[13px] font-bold shrink-0">
                  {s.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-[#191c1e]">{s.name}</div>
                  <div className="text-[11.5px] text-[#94a3b8] flex items-center gap-1">
                    <ShieldCheck size={11} />
                    {s.role}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 shrink-0 max-w-[240px]">
                  {s.modules.map((m) => (
                    <span key={m} className="text-[10.5px] font-semibold bg-[#f1f5f9] text-[#475569] px-2 py-0.5 rounded-md">
                      {m}
                    </span>
                  ))}
                </div>
                <button onClick={() => manageStaff(s.id)} className="text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer shrink-0">
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {active === 'settings' && (
        <SectionCard title="Pengaturan Umum" description="Konfigurasi teknis yang berlaku di seluruh platform.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Bahasa Default</label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nomor WhatsApp Bot</label>
              <input
                placeholder="+62 8xx-xxxx-xxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Template Notifikasi Email</label>
              <textarea
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none"
                placeholder="Dipakai lintas fitur — approval dokumen, komplain, dst."
              />
            </div>
          </div>
          <button className="mt-4 inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
            Simpan Pengaturan
          </button>
        </SectionCard>
      )}
    </div>
  );
};
