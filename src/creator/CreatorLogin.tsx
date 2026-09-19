/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, CheckCircle2 } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { EOSignupInput } from '../hooks/useCreatorAuth';

interface CreatorLoginProps {
  login: (email: string, password: string) => boolean;
  signup: (input: EOSignupInput) => boolean;
  error: string | null;
  onSuccess: () => void;
  onBackHome: () => void;
}

export const CreatorLogin: React.FC<CreatorLoginProps> = ({ login, signup, error, onSuccess, onBackHome }) => {
  const { user, renderButtonInto } = useGoogleAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'manual' | 'google'>('manual');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup fields
  const [picName, setPicName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [ktpFile, setKtpFile] = useState('');
  const [npwpFile, setNpwpFile] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [agreeTnc, setAgreeTnc] = useState(false);
  const [submittedSignup, setSubmittedSignup] = useState(false);

  useEffect(() => {
    if (mode === 'signup' && googleBtnRef.current) renderButtonInto(googleBtnRef.current);
  }, [mode, renderButtonInto]);

  useEffect(() => {
    if (user && mode === 'signup') {
      setSignupEmail(user.email);
      setPicName((prev) => prev || user.name);
      setLoginMethod('google');
    }
  }, [user, mode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) onSuccess();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTnc) return;
    const ok = signup({
      picName,
      orgName,
      email: signupEmail,
      phone,
      password: loginMethod === 'google' ? '' : signupPassword,
      ktpFileName: ktpFile,
      npwpFileName: npwpFile,
      bankName,
      bankAccount,
      loginMethod,
    });
    if (ok) setSubmittedSignup(true);
  };

  if (submittedSignup) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md modal-3d-in bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-7 text-center">
          <CheckCircle2 size={40} className="text-[#059669] mx-auto mb-3" />
          <h1 className="text-[18px] font-extrabold text-[#191c1e]">Pendaftaran Terkirim</h1>
          <p className="text-[13px] text-[#565e74] mt-2 mb-5">
            Akun <span className="font-semibold">{orgName}</span> berstatus <span className="font-semibold text-[#b45309]">Menunggu Verifikasi</span>.
            Tim Superadmin akan meninjau dokumen Anda sebelum akun aktif penuh — Anda tetap bisa masuk untuk melihat dashboard.
          </p>
          <button
            onClick={onSuccess}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold py-3 rounded-xl hover:bg-[#b91c1c] transition-all cursor-pointer"
          >
            Lanjut ke Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <button
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#565e74] hover:text-[#191c1e] mb-6 cursor-pointer"
        >
          <ArrowLeft size={15} />
          Kembali ke Beranda
        </button>

        <div className="modal-3d-in bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-7">
          <span className="text-[21px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
          <h1 className="text-[20px] font-extrabold text-[#191c1e] tracking-tight mt-4">
            {mode === 'login' ? 'Masuk Dashboard Event Creator' : 'Daftar Sebagai Event Creator'}
          </h1>
          <p className="text-[13px] text-[#565e74] mt-1.5">
            {mode === 'login'
              ? 'Login wajib untuk semua fitur EO.'
              : 'Data legal & finansial dibutuhkan karena akun ini bisa menandatangani dokumen dan mencairkan dana.'}
          </p>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-3.5 mt-5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[14px]"
              />
              {error && <p className="text-[12px] text-[#b3220f] font-medium">{error}</p>}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[14px] font-bold py-3 rounded-xl hover:bg-[#b91c1c] active:scale-[0.99] transition-all cursor-pointer"
              >
                Masuk Dashboard
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3.5 mt-5 max-h-[55vh] overflow-y-auto pr-1">
              <div className="mb-1">
                <div ref={googleBtnRef} className="flex justify-center min-h-[44px] mb-2" />
                <p className="text-[11px] text-[#94a3b8] text-center">
                  Google cuma isi nama & email — sisanya tetap wajib manual.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <input value={picName} onChange={(e) => setPicName(e.target.value)} placeholder="Nama Penanggung Jawab" required className="col-span-2 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="Nama Organisasi" required className="col-span-2 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="Email" required disabled={loginMethod === 'google'} className="col-span-2 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] disabled:bg-[#f8fafc]" />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor WhatsApp/HP" required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                {loginMethod === 'manual' && (
                  <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Password" required className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                )}
              </div>

              <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-dashed border-[#e2e8f0] cursor-pointer hover:border-[#dc2626] transition-colors">
                <Upload size={15} className="text-[#94a3b8] shrink-0" />
                <span className="text-[12.5px] text-[#565e74] flex-1 truncate">{ktpFile || 'Upload KTP Penanggung Jawab'}</span>
                <input type="file" className="hidden" onChange={(e) => setKtpFile(e.target.files?.[0]?.name ?? '')} />
              </label>
              <label className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-dashed border-[#e2e8f0] cursor-pointer hover:border-[#dc2626] transition-colors">
                <Upload size={15} className="text-[#94a3b8] shrink-0" />
                <span className="text-[12.5px] text-[#565e74] flex-1 truncate">{npwpFile || 'Upload NPWP'}</span>
                <input type="file" className="hidden" onChange={(e) => setNpwpFile(e.target.files?.[0]?.name ?? '')} />
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Nama Bank" className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} placeholder="Nomor Rekening" className="px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={agreeTnc} onChange={(e) => setAgreeTnc(e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#dc2626]" />
                <span className="text-[12.5px] text-[#565e74]">Saya setuju dengan Terms & Conditions Event Creator YourtixSide.</span>
              </label>

              {error && <p className="text-[12px] text-[#b3220f] font-medium">{error}</p>}

              <button
                type="submit"
                disabled={!agreeTnc}
                className={`w-full inline-flex items-center justify-center gap-2 text-[14px] font-bold py-3 rounded-xl transition-all ${
                  agreeTnc ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c] cursor-pointer' : 'bg-[#e8e6f0] text-[#94a3b8] cursor-not-allowed'
                }`}
              >
                Ajukan Pendaftaran
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p className="text-[12.5px] text-[#565e74] text-center mt-4">
            {mode === 'login' ? 'Belum terdaftar sebagai EO?' : 'Sudah terdaftar?'}{' '}
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
