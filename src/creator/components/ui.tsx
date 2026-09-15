/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Tabs: React.FC<{
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}> = ({ tabs, active, onChange }) => (
  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#e2e8f0] mb-5">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`px-4 py-2.5 text-[13.5px] font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors cursor-pointer ${
          active === tab.id
            ? 'border-[#dc2626] text-[#dc2626]'
            : 'border-transparent text-[#565e74] hover:text-[#191c1e]'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const STATUS_STYLES: Record<string, string> = {
  signed: 'bg-[#ecfdf5] text-[#059669]',
  disetujui: 'bg-[#ecfdf5] text-[#059669]',
  approved: 'bg-[#ecfdf5] text-[#059669]',
  aktif: 'bg-[#eff6ff] text-[#1d4ed8]',
  diproses: 'bg-[#eff6ff] text-[#1d4ed8]',
  pending: 'bg-[#fffbeb] text-[#b45309]',
  diajukan: 'bg-[#fffbeb] text-[#b45309]',
  draf: 'bg-[#f1f5f9] text-[#475569]',
  tutup: 'bg-[#f1f5f9] text-[#475569]',
  selesai: 'bg-[#f1f5f9] text-[#475569]',
  rejected: 'bg-[#fef2f2] text-[#b3220f]',
  ditolak: 'bg-[#fef2f2] text-[#b3220f]',
};

const STATUS_LABELS: Record<string, string> = {
  signed: 'Ditandatangani',
  pending: 'Menunggu',
  rejected: 'Ditolak',
  aktif: 'Aktif',
  draf: 'Draf',
  selesai: 'Selesai',
  diajukan: 'Diajukan',
  diproses: 'Diproses',
  disetujui: 'Disetujui',
  ditolak: 'Ditolak',
  approved: 'Disetujui',
  rejected_form: 'Ditolak',
  tutup: 'Tutup',
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold ${
      STATUS_STYLES[status] || 'bg-[#f1f5f9] text-[#475569]'
    }`}
  >
    {STATUS_LABELS[status] || status}
  </span>
);

export const SectionCard: React.FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, description, action, children }) => (
  <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5 mb-5">
    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
      <div>
        <h2 className="text-[15px] font-bold text-[#191c1e]">{title}</h2>
        {description && <p className="text-[12.5px] text-[#565e74] mt-0.5">{description}</p>}
      </div>
      {action}
    </div>
    {children}
  </div>
);

export const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-10 text-[13px] text-[#94a3b8]">{message}</div>
);

export const StatPill: React.FC<{ label: string; value: string | number; icon?: React.ReactNode }> = ({
  label,
  value,
  icon,
}) => (
  <div className="flex items-center gap-3 rounded-xl border border-[#ece9f5] bg-[#fbfaff] px-4 py-3">
    {icon && <span className="w-8 h-8 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">{icon}</span>}
    <div>
      <div className="text-[18px] font-extrabold text-[#191c1e] leading-none">{value}</div>
      <div className="text-[11px] text-[#94a3b8] font-semibold mt-1">{label}</div>
    </div>
  </div>
);
