import React, { useState } from 'react';
import { RoleType } from '../types';

interface AuthModalProps {
  initialTab?: 'login' | 'signup';
  onClose: () => void;
  onSuccessRole?: (role: RoleType) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialTab = 'login',
  onClose,
  onSuccessRole,
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  const [role, setRole] = useState<RoleType>('creator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        if (onSuccessRole) {
          onSuccessRole(role);
        }
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Brand heading */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            yourtixside Access
          </span>
        </div>

        <h3 className="text-[22px] font-bold text-[#191c1e]">
          {tab === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun yourtixside'}
        </h3>
        <p className="text-[13px] text-[#565e74] mt-1">
          {tab === 'login'
            ? 'Akses portal manajemen operasional, formulir, dan verifikasi event.'
            : 'Mulai kelola operasional event dan koordinasi tim secara terintegrasi.'}
        </p>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-[#f2f4f6] p-1 mt-5 mb-5 border border-[#e2e8f0]">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setIsSuccess(false);
            }}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              tab === 'login'
                ? 'bg-white text-[#dc2626] shadow-xs'
                : 'text-[#565e74] hover:text-[#191c1e]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setIsSuccess(false);
            }}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all cursor-pointer ${
              tab === 'signup'
                ? 'bg-white text-[#dc2626] shadow-xs'
                : 'text-[#565e74] hover:text-[#191c1e]'
            }`}
          >
            Signup
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center mx-auto text-2xl font-bold">
              <span className="material-symbols-outlined">check</span>
            </div>
            <h4 className="text-[16px] font-bold text-[#191c1e]">
              {tab === 'login' ? 'Berhasil Masuk!' : 'Pendaftaran Berhasil!'}
            </h4>
            <p className="text-[13px] text-[#565e74]">
              Mengarahkan Anda ke ruang kerja operasional...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-[12px] font-semibold text-[#191c1e] mb-1">
                  Nama Lengkap / Nama Organisasi
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Nada Festival Organizer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626] bg-[#fcfdfe]"
                />
              </div>
            )}

            <div>
              <label className="block text-[12px] font-semibold text-[#191c1e] mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@organizer.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626] bg-[#fcfdfe]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[12px] font-semibold text-[#191c1e]">
                  Kata Sandi
                </label>
                {tab === 'login' && (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Tautan pemulihan kata sandi telah dikirim ke email Anda.');
                    }}
                    className="text-[11px] font-medium text-[#dc2626] hover:underline"
                  >
                    Lupa sandi?
                  </a>
                )}
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626] bg-[#fcfdfe]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-semibold text-[#191c1e] mb-1.5">
                Peran Utama
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'creator', label: 'Event Creator' },
                  { id: 'superadmin', label: 'Operations' },
                  { id: 'customer', label: 'Customer' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as RoleType)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      role === item.id
                        ? 'border-[#dc2626] bg-[#fef2f2] text-[#dc2626]'
                        : 'border-[#e2e8f0] text-[#565e74] hover:bg-[#f2f4f6]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer shadow-xs disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>{tab === 'login' ? 'Masuk Sekarang' : 'Daftar Akun Baru'}</span>
              )}
            </button>

            <div className="text-center text-[12px] text-[#565e74] pt-2">
              {tab === 'login' ? (
                <span>
                  Belum punya akun?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="text-[#dc2626] font-semibold hover:underline cursor-pointer"
                  >
                    Daftar di sini
                  </button>
                </span>
              ) : (
                <span>
                  Sudah memiliki akun?{' '}
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-[#dc2626] font-semibold hover:underline cursor-pointer"
                  >
                    Login di sini
                  </button>
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
