/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, KeyRound } from 'lucide-react';
import { DEMO_CREDENTIAL } from '../hooks/useCreatorAuth';

interface CreatorLoginProps {
  onLogin: (email: string, password: string) => boolean;
  onBackHome: () => void;
}

export const CreatorLogin: React.FC<CreatorLoginProps> = ({ onLogin, onBackHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(email, password);
    if (!ok) setError('Email atau password salah. Gunakan akun demo di bawah.');
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIAL.email);
    setPassword(DEMO_CREDENTIAL.password);
    setError(null);
  };

  const copyDemo = async () => {
    try {
      await navigator.clipboard.writeText(`${DEMO_CREDENTIAL.email} / ${DEMO_CREDENTIAL.password}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#565e74] hover:text-[#191c1e] mb-6 cursor-pointer"
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
            <h1 className="text-[20px] font-extrabold text-[#191c1e] tracking-tight mt-4">
              Masuk Dashboard Event Creator
            </h1>
            <p className="text-[13px] text-[#565e74] mt-1.5">
              Kelola dokumen, event, voting, dan form pendaftaran EO Anda di sini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@organisasi.com"
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
              className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold py-3 rounded-xl hover:bg-[#b91c1c] active:scale-[0.99] transition-all cursor-pointer"
            >
              Masuk Dashboard
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <KeyRound size={14} className="text-[#dc2626]" />
              <span className="text-[12px] font-bold text-[#191c1e]">Akun demo (belum ada API/backend)</span>
            </div>
            <p className="text-[12px] text-[#565e74] font-mono break-all">
              {DEMO_CREDENTIAL.email} / {DEMO_CREDENTIAL.password}
            </p>
            <div className="flex items-center gap-2 mt-2.5">
              <button
                type="button"
                onClick={fillDemo}
                className="text-[11px] font-semibold text-[#dc2626] hover:underline cursor-pointer"
              >
                Isi otomatis
              </button>
              <span className="text-[#cbd5e1]">•</span>
              <button
                type="button"
                onClick={copyDemo}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#565e74] hover:text-[#191c1e] cursor-pointer"
              >
                <Copy size={11} />
                {copied ? 'Tersalin!' : 'Salin'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
