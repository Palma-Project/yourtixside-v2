/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { CustomerSignupInput } from '../hooks/useCustomerAuth';

interface CustomerLoginProps {
  login: (email: string, password: string) => boolean;
  signup: (input: CustomerSignupInput) => boolean;
  continueWithGoogle: (email: string, name: string) => void;
  error: string | null;
  onSuccess: () => void;
  onBackHome: () => void;
}

export const CustomerLogin: React.FC<CustomerLoginProps> = ({ login, signup, continueWithGoogle, error, onSuccess, onBackHome }) => {
  const { user, renderButtonInto } = useGoogleAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (googleBtnRef.current) renderButtonInto(googleBtnRef.current);
  }, [renderButtonInto]);

  useEffect(() => {
    if (user) {
      continueWithGoogle(user.email, user.name);
      onSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = mode === 'login' ? login(email, password) : signup({ name, email, password, loginMethod: 'manual' });
    if (ok) onSuccess();
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
          <span className="text-[21px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
          <h1 className="text-[20px] font-extrabold text-[#191c1e] tracking-tight mt-4">
            {mode === 'login' ? 'Masuk Portal Customer' : 'Buat Akun Customer'}
          </h1>
          <p className="text-[13px] text-[#565e74] mt-1.5">
            {mode === 'login'
              ? 'Login opsional — cuma dibutuhkan untuk ikut Voting & Take a Moment.'
              : 'Isi 3 data ini aja, langsung aktif tanpa perlu approval.'}
          </p>

          <div className="mt-5 mb-4">
            <div ref={googleBtnRef} className="flex justify-center min-h-[44px]" />
          </div>

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-[#e2e8f0]" />
            <span className="text-[11.5px] text-[#94a3b8] font-semibold">ATAU</span>
            <span className="flex-1 h-px bg-[#e2e8f0]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Lengkap"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
            />

            {error && <p className="text-[12px] text-[#b3220f] font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold py-3 rounded-xl hover:bg-[#b91c1c] active:scale-[0.99] transition-all cursor-pointer"
            >
              {mode === 'login' ? 'Masuk' : 'Daftar'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-[12.5px] text-[#565e74] text-center mt-4">
            {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[#dc2626] font-semibold hover:underline cursor-pointer"
            >
              {mode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
