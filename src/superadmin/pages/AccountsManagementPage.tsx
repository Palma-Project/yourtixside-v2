/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, KeyRound, LogOut, Ban, CheckCircle2, Trash2, X, ShieldAlert, History } from 'lucide-react';
import { useAppStore, EOAccount, CustomerAccount, AccountStatus } from '../../store/AppStore';
import { Tabs, SectionCard, StatusBadge } from '../../creator/components/ui';

const TABS = [
  { id: 'eo', label: 'Akun Event Creator' },
  { id: 'customer', label: 'Akun Customer' },
  { id: 'log', label: 'Log Aktivitas' },
];

const statusMap: Record<AccountStatus, string> = { aktif: 'signed', nonaktif: 'draf', suspend: 'rejected' };

export const AccountsManagementPage: React.FC = () => {
  const { eoAccounts, setEoAccounts, customerAccounts, setCustomerAccounts, logAudit, logActivity, accountAudit } = useAppStore();
  const [active, setActive] = useState('eo');
  const [query, setQuery] = useState('');
  const [detailEO, setDetailEO] = useState<EOAccount | null>(null);
  const [detailCustomer, setDetailCustomer] = useState<CustomerAccount | null>(null);
  const [selectedEO, setSelectedEO] = useState<Set<string>>(new Set());
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());

  const toggleSelect = (set: Set<string>, setFn: (s: Set<string>) => void, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFn(next);
  };

  const bulkSetEOStatus = (status: AccountStatus) => {
    setEoAccounts((prev) => prev.map((e) => (selectedEO.has(e.id) ? { ...e, accountStatus: status } : e)));
    logAudit({ accountId: 'bulk', accountKind: 'eo', action: `bulk set status: ${status} (${selectedEO.size} akun)`, by: 'Superadmin' });
    setSelectedEO(new Set());
  };

  const bulkSetCustomerStatus = (status: AccountStatus) => {
    setCustomerAccounts((prev) => prev.map((c) => (selectedCustomers.has(c.id) ? { ...c, accountStatus: status } : c)));
    logAudit({ accountId: 'bulk', accountKind: 'customer', action: `bulk set status: ${status} (${selectedCustomers.size} akun)`, by: 'Superadmin' });
    setSelectedCustomers(new Set());
  };

  const filteredEO = eoAccounts.filter(
    (e) => !query.trim() || e.orgName.toLowerCase().includes(query.toLowerCase()) || e.email.toLowerCase().includes(query.toLowerCase())
  );
  const filteredCustomers = customerAccounts.filter(
    (c) => !query.trim() || c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
  );

  const setEOStatus = (id: string, status: AccountStatus) => {
    setEoAccounts((prev) => prev.map((e) => (e.id === id ? { ...e, accountStatus: status } : e)));
    logAudit({ accountId: id, accountKind: 'eo', action: `set status: ${status}`, by: 'Superadmin' });
    logActivity(`Status akun EO diubah menjadi "${status}"`);
    setDetailEO((prev) => (prev && prev.id === id ? { ...prev, accountStatus: status } : prev));
  };

  const setCustomerStatus = (id: string, status: AccountStatus) => {
    setCustomerAccounts((prev) => prev.map((c) => (c.id === id ? { ...c, accountStatus: status } : c)));
    logAudit({ accountId: id, accountKind: 'customer', action: `set status: ${status}`, by: 'Superadmin' });
    setDetailCustomer((prev) => (prev && prev.id === id ? { ...prev, accountStatus: status } : prev));
  };

  const deleteEO = (id: string) => {
    setEoAccounts((prev) => prev.filter((e) => e.id !== id));
    logAudit({ accountId: id, accountKind: 'eo', action: 'delete account', by: 'Superadmin' });
    setDetailEO(null);
  };

  const deleteCustomer = (id: string) => {
    setCustomerAccounts((prev) => prev.filter((c) => c.id !== id));
    logAudit({ accountId: id, accountKind: 'customer', action: 'delete account', by: 'Superadmin' });
    setDetailCustomer(null);
  };

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      <label className="relative block mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama atau email..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
      </label>

      {active === 'eo' && (
        <SectionCard title="Daftar Akun Event Creator" description="Superadmin dapat lihat, edit, dan kontrol penuh akun EO.">
          {selectedEO.size > 0 && (
            <div className="flex items-center gap-2 mb-3 bg-[#fbfaff] border border-[#ece9f5] rounded-lg px-3 py-2">
              <span className="text-[12.5px] font-semibold text-[#191c1e]">{selectedEO.size} dipilih</span>
              <button onClick={() => bulkSetEOStatus('nonaktif')} className="ml-auto text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] cursor-pointer">Nonaktifkan</button>
              <button onClick={() => bulkSetEOStatus('suspend')} className="text-[12px] font-semibold text-[#b45309] hover:underline cursor-pointer">Suspend</button>
              <button onClick={() => bulkSetEOStatus('aktif')} className="text-[12px] font-semibold text-[#059669] hover:underline cursor-pointer">Aktifkan</button>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                  <th className="pb-2.5 pr-3 w-6"></th>
                  <th className="pb-2.5 pr-4">Organisasi</th>
                  <th className="pb-2.5 pr-4">Verifikasi</th>
                  <th className="pb-2.5 pr-4">Status Akun</th>
                  <th className="pb-2.5 pr-4">Event Aktif</th>
                  <th className="pb-2.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredEO.map((e) => (
                  <tr key={e.id} className="border-b border-[#f1f5f9]">
                    <td className="py-3 pr-3">
                      <input type="checkbox" checked={selectedEO.has(e.id)} onChange={() => toggleSelect(selectedEO, setSelectedEO, e.id)} className="w-4 h-4 accent-[#dc2626]" />
                    </td>
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-[#191c1e]">{e.orgName}</div>
                      <div className="text-[11px] text-[#94a3b8]">{e.picName} • {e.email}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={e.verificationStatus === 'verified' ? 'signed' : e.verificationStatus === 'pending' ? 'pending' : 'rejected'} />
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={statusMap[e.accountStatus]} />
                    </td>
                    <td className="py-3 pr-4 text-[#565e74]">{e.activeEvents}</td>
                    <td className="py-3 pr-4">
                      <button onClick={() => setDetailEO(e)} className="text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer">Kelola</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === 'customer' && (
        <SectionCard title="Daftar Akun Customer" description="Superadmin dapat lihat, edit, dan kontrol penuh akun Customer.">
          {selectedCustomers.size > 0 && (
            <div className="flex items-center gap-2 mb-3 bg-[#fbfaff] border border-[#ece9f5] rounded-lg px-3 py-2">
              <span className="text-[12.5px] font-semibold text-[#191c1e]">{selectedCustomers.size} dipilih</span>
              <button onClick={() => bulkSetCustomerStatus('nonaktif')} className="ml-auto text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] cursor-pointer">Nonaktifkan</button>
              <button onClick={() => bulkSetCustomerStatus('suspend')} className="text-[12px] font-semibold text-[#b45309] hover:underline cursor-pointer">Suspend</button>
              <button onClick={() => bulkSetCustomerStatus('aktif')} className="text-[12px] font-semibold text-[#059669] hover:underline cursor-pointer">Aktifkan</button>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                  <th className="pb-2.5 pr-3 w-6"></th>
                  <th className="pb-2.5 pr-4">Nama</th>
                  <th className="pb-2.5 pr-4">Email</th>
                  <th className="pb-2.5 pr-4">Metode Login</th>
                  <th className="pb-2.5 pr-4">Status</th>
                  <th className="pb-2.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="border-b border-[#f1f5f9]">
                    <td className="py-3 pr-3">
                      <input type="checkbox" checked={selectedCustomers.has(c.id)} onChange={() => toggleSelect(selectedCustomers, setSelectedCustomers, c.id)} className="w-4 h-4 accent-[#dc2626]" />
                    </td>
                    <td className="py-3 pr-4 font-semibold text-[#191c1e]">{c.name}</td>
                    <td className="py-3 pr-4 text-[#565e74]">{c.email}</td>
                    <td className="py-3 pr-4 text-[#565e74] capitalize">{c.loginMethod}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={statusMap[c.accountStatus]} />
                    </td>
                    <td className="py-3 pr-4">
                      <button onClick={() => setDetailCustomer(c)} className="text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer">Kelola</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === 'log' && (
        <SectionCard title="Log Aktivitas Superadmin" description="Jejak audit setiap aksi kelola akun — siapa, apa, dan kapan.">
          {accountAudit.length === 0 ? (
            <p className="text-[13px] text-[#94a3b8] text-center py-6">Belum ada aktivitas tercatat.</p>
          ) : (
            <div className="space-y-2">
              {accountAudit.map((a) => (
                <div key={a.id} className="flex items-start gap-3 text-[13px] border-b border-[#f1f5f9] pb-2.5">
                  <History size={14} className="text-[#dc2626] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[#191c1e]">{a.by}</span>{' '}
                    <span className="text-[#565e74]">{a.action}</span>{' '}
                    <span className="text-[11px] text-[#94a3b8]">({a.accountKind} • {a.accountId})</span>
                  </div>
                  <span className="text-[11px] text-[#94a3b8] shrink-0">{a.at}</span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* EO detail panel */}
      {detailEO && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#191c1e]">{detailEO.orgName}</h3>
              <button onClick={() => setDetailEO(null)} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-1.5 text-[13px] mb-4">
              <p><span className="text-[#94a3b8]">Penanggung Jawab:</span> {detailEO.picName}</p>
              <p><span className="text-[#94a3b8]">Email:</span> {detailEO.email}</p>
              <p><span className="text-[#94a3b8]">Telepon:</span> {detailEO.phone}</p>
              <p><span className="text-[#94a3b8]">KTP:</span> {detailEO.ktpFileName || '—'}</p>
              <p><span className="text-[#94a3b8]">NPWP:</span> {detailEO.npwpFileName || '—'}</p>
              <p><span className="text-[#94a3b8]">Rekening:</span> {detailEO.bankName ? `${detailEO.bankName} — ${detailEO.bankAccount}` : '—'}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => setEOStatus(detailEO.id, 'aktif')} className="inline-flex items-center justify-center gap-1.5 border border-[#a7f3d0] bg-[#ecfdf5] text-[#059669] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><CheckCircle2 size={13} />Aktifkan</button>
              <button onClick={() => setEOStatus(detailEO.id, 'nonaktif')} className="inline-flex items-center justify-center gap-1.5 border border-[#e2e8f0] text-[#565e74] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer">Nonaktifkan</button>
              <button onClick={() => setEOStatus(detailEO.id, 'suspend')} className="inline-flex items-center justify-center gap-1.5 border border-[#fde68a] bg-[#fffbeb] text-[#b45309] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><ShieldAlert size={13} />Suspend</button>
              <button onClick={() => deleteEO(detailEO.id)} className="inline-flex items-center justify-center gap-1.5 border border-[#fecaca] bg-[#fef2f2] text-[#b3220f] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><Trash2 size={13} />Hapus Akun</button>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-[#f1f5f9]">
              <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"><KeyRound size={12} />Reset Password</button>
              <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"><LogOut size={12} />Force Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Customer detail panel */}
      {detailCustomer && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#191c1e]">{detailCustomer.name}</h3>
              <button onClick={() => setDetailCustomer(null)} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer"><X size={18} /></button>
            </div>
            <div className="space-y-1.5 text-[13px] mb-4">
              <p><span className="text-[#94a3b8]">Email:</span> {detailCustomer.email}</p>
              <p><span className="text-[#94a3b8]">Telepon:</span> {detailCustomer.phone || '—'}</p>
              <p><span className="text-[#94a3b8]">Metode Login:</span> {detailCustomer.loginMethod}</p>
              <p><span className="text-[#94a3b8]">Bergabung:</span> {detailCustomer.joinedAt}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => setCustomerStatus(detailCustomer.id, 'aktif')} className="inline-flex items-center justify-center gap-1.5 border border-[#a7f3d0] bg-[#ecfdf5] text-[#059669] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><CheckCircle2 size={13} />Aktifkan</button>
              <button onClick={() => setCustomerStatus(detailCustomer.id, 'nonaktif')} className="inline-flex items-center justify-center gap-1.5 border border-[#e2e8f0] text-[#565e74] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer">Nonaktifkan</button>
              <button onClick={() => setCustomerStatus(detailCustomer.id, 'suspend')} className="inline-flex items-center justify-center gap-1.5 border border-[#fde68a] bg-[#fffbeb] text-[#b45309] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><Ban size={13} />Suspend</button>
              <button onClick={() => deleteCustomer(detailCustomer.id)} className="inline-flex items-center justify-center gap-1.5 border border-[#fecaca] bg-[#fef2f2] text-[#b3220f] text-[12.5px] font-semibold px-3 py-2 rounded-lg cursor-pointer"><Trash2 size={13} />Hapus Akun</button>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-[#f1f5f9]">
              <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"><KeyRound size={12} />Reset Password</button>
              <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"><LogOut size={12} />Force Logout</button>
              <button className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"><Ban size={12} />Cabut Hak Vote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
