/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight, Mail, Lock } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface UnifiedLoginModalProps {
  onClose: () => void;
  onGoToSignup: () => void;
  tryCreatorLogin: (email: string, password: string) => boolean;
  tryCustomerLogin: (email: string, password: string) => boolean;
  onGoogleCustomer: (email: string, name: string) => void;
  onLoggedInAsCreator: () => void;
  onLoggedInAsCustomer: () => void;
}

export const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({
  onClose,
  onGoToSignup,
  tryCreatorLogin,
  tryCustomerLogin,
  onGoogleCustomer,
  onLoggedInAsCreator,
  onLoggedInAsCustomer,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { user, renderButtonInto } = useGoogleAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (googleBtnRef.current) renderButtonInto(googleBtnRef.current);
  }, [renderButtonInto]);

  useEffect(() => {
    if (user) {
      onGoogleCustomer(user.email, user.name);
      onLoggedInAsCustomer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tryCreatorLogin(email, password)) {
      onLoggedInAsCreator();
      return;
    }
    if (tryCustomerLogin(email, password)) {
      onLoggedInAsCustomer();
      return;
    }
    setError('Email atau password salah, atau akun tidak ditemukan.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="modal-3d-in bg-white rounded-[28px] w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="relative px-6 pt-6 pb-5 border-b border-[#f1f0f7]">
          <button onClick={onClose} className="absolute top-5 right-5 text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            <X size={18} />
          </button>
          <span className="text-[19px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
          <h3 className="text-[19px] font-extrabold text-[#191c1e] tracking-tight mt-3">Selamat datang kembali</h3>
          <p className="text-[13px] text-[#565e74] mt-1">
            Untuk akun Customer maupun Event Creator — otomatis terdeteksi.
          </p>
        </div>

        <div className="p-6 pt-5">
          <div ref={googleBtnRef} className="flex justify-center min-h-[44px] mb-4" />

          <div className="flex items-center gap-3 my-4">
            <span className="flex-1 h-px bg-[#e2e8f0]" />
            <span className="text-[11px] text-[#94a3b8] font-semibold">ATAU</span>
            <span className="flex-1 h-px bg-[#e2e8f0]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="relative block">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px] transition-colors"
              />
            </label>
            <label className="relative block">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px] transition-colors"
              />
            </label>
            {error && <p className="text-[12px] text-[#b3220f] font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold py-3.5 rounded-2xl hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer shadow-sm"
            >
              Masuk
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-[12.5px] text-[#565e74] text-center mt-5">
            Belum punya akun?{' '}
            <button onClick={onGoToSignup} className="text-[#dc2626] font-semibold hover:underline cursor-pointer">
              Daftar di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
