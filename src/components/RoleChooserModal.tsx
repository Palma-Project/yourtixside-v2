/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, User, Building2, ArrowRight, Sparkles } from 'lucide-react';

interface RoleChooserModalProps {
  onChoose: (role: 'customer' | 'creator') => void;
  onClose: () => void;
}

export const RoleChooserModal: React.FC<RoleChooserModalProps> = ({ onChoose, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="modal-3d-in bg-white rounded-[28px] w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-br from-[#dc2626] to-[#7f1d1d] px-6 pt-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
          <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-bold px-2.5 py-1 rounded-full mb-3">
            <Sparkles size={11} />
            BUAT AKUN BARU
          </span>
          <h3 className="text-[20px] font-extrabold text-white tracking-tight">Daftar sebagai apa?</h3>
          <p className="text-[13px] text-white/80 mt-1">Pilih jenis akun yang sesuai kebutuhanmu.</p>
        </div>

        <div className="p-5 space-y-2.5 -mt-4">
          <button
            onClick={() => onChoose('customer')}
            className="w-full flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4 text-left hover:border-[#dc2626] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group shadow-sm"
          >
            <span className="w-11 h-11 rounded-2xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <User size={19} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14.5px] font-bold text-[#191c1e]">Customer</div>
              <div className="text-[12px] text-[#565e74]">Beli tiket, ikut voting, cari bantuan</div>
            </div>
            <ArrowRight size={16} className="text-[#94a3b8] group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>

          <button
            onClick={() => onChoose('creator')}
            className="w-full flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4 text-left hover:border-[#dc2626] hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group shadow-sm"
          >
            <span className="w-11 h-11 rounded-2xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 size={19} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14.5px] font-bold text-[#191c1e]">Event Creator</div>
              <div className="text-[12px] text-[#565e74]">Kelola event, dokumen, voting, dan tim</div>
            </div>
            <ArrowRight size={16} className="text-[#94a3b8] group-hover:text-[#dc2626] group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
