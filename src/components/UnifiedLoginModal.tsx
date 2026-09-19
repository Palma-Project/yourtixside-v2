/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[17px] font-extrabold text-[#191c1e]">Masuk</h3>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <p className="text-[13px] text-[#565e74] mb-5">
          Untuk akun Customer maupun Event Creator — sistem otomatis mendeteksi jenis akunmu.
        </p>

        <div ref={googleBtnRef} className="flex justify-center min-h-[44px] mb-4" />

        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-[#e2e8f0]" />
          <span className="text-[11.5px] text-[#94a3b8] font-semibold">ATAU</span>
          <span className="flex-1 h-px bg-[#e2e8f0]" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
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
            Masuk
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-[12.5px] text-[#565e74] text-center mt-4">
          Belum punya akun?{' '}
          <button onClick={onGoToSignup} className="text-[#dc2626] font-semibold hover:underline cursor-pointer">
            Daftar di sini
          </button>
        </p>
      </div>
    </div>
  );
};
