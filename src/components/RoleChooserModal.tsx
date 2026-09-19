/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, User, Building2, ArrowRight } from 'lucide-react';

interface RoleChooserModalProps {
  onChoose: (role: 'customer' | 'creator') => void;
  onClose: () => void;
}

export const RoleChooserModal: React.FC<RoleChooserModalProps> = ({ onChoose, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[17px] font-extrabold text-[#191c1e]">Daftar sebagai apa?</h3>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <p className="text-[13px] text-[#565e74] mb-5">Pilih jenis akun yang sesuai dengan kebutuhanmu.</p>

        <div className="space-y-2.5">
          <button
            onClick={() => onChoose('customer')}
            className="w-full flex items-center gap-3 rounded-xl border border-[#e2e8f0] p-4 text-left hover:border-[#dc2626] hover:bg-[#fef2f2] transition-colors cursor-pointer group"
          >
            <span className="w-10 h-10 rounded-xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
              <User size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-[#191c1e]">Customer</div>
              <div className="text-[12px] text-[#565e74]">Beli tiket, ikut voting, cari bantuan</div>
            </div>
            <ArrowRight size={16} className="text-[#94a3b8] group-hover:text-[#dc2626] shrink-0" />
          </button>

          <button
            onClick={() => onChoose('creator')}
            className="w-full flex items-center gap-3 rounded-xl border border-[#e2e8f0] p-4 text-left hover:border-[#dc2626] hover:bg-[#fef2f2] transition-colors cursor-pointer group"
          >
            <span className="w-10 h-10 rounded-xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
              <Building2 size={18} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold text-[#191c1e]">Event Creator</div>
              <div className="text-[12px] text-[#565e74]">Kelola event, dokumen, voting, dan tim</div>
            </div>
            <ArrowRight size={16} className="text-[#94a3b8] group-hover:text-[#dc2626] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
