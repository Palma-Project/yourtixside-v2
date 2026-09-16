/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

interface SuperadminLoginProps {
  onLogin: (email: string, password: string) => boolean;
  onBackHome: () => void;
}

export const SuperadminLogin: React.FC<SuperadminLoginProps> = ({ onLogin, onBackHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(email, password);
    if (!ok) setError('Email atau password salah.');
  };

  return (
    <div className="min-h-screen bg-[#191c1e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/60 hover:text-white mb-6 cursor-pointer"
        >
          <ArrowLeft size={15} />
          Kembali ke Beranda
        </button>

        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-7">
          <div className="mb-6">
            <span className="text-[21px] font-bold tracking-tight">
              <span className="text-[#dc2626]">yourtix</span>
              <span className="text-[#191c1e]">side</span>
            </span>
            <div className="inline-flex items-center gap-1.5 bg-[#191c1e] text-white text-[11px] font-bold px-2.5 py-1 rounded-md ml-2 align-middle">
              <ShieldAlert size={11} />
              SUPERADMIN
            </div>
            <h1 className="text-[20px] font-extrabold text-[#191c1e] tracking-tight mt-4">
              Masuk Panel Superadmin
            </h1>
            <p className="text-[13px] text-[#565e74] mt-1.5">
              Akses terbatas — hanya untuk staf internal terverifikasi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Email Internal</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@yourtix.internal"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px] transition-colors"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px] transition-colors"
              />
            </div>

            {error && <p className="text-[12px] text-[#b3220f] font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#191c1e] text-white text-[14px] font-bold py-3 rounded-xl hover:bg-black active:scale-[0.99] transition-all cursor-pointer"
            >
              Masuk Panel
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
