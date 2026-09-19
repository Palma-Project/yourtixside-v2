import React, { useState } from 'react';
import { RoleType } from '../types';

interface FooterProps {
  onOpenPortal: (role?: RoleType) => void;
  onOpenStatus: () => void;
  onOpenSupport: () => void;
  onOpenAbout: () => void;
  onOpenServices: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPortal,
  onOpenStatus,
  onOpenSupport,
  onOpenAbout,
  onOpenServices,
  onOpenContact,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#f2f4f6] border-t border-[#e2e8f0] text-[#191c1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Main 5 Categories Grid + Newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4 pr-0 lg:pr-4">
            <div className="text-[22px] font-bold tracking-tight">
              <span className="text-[#dc2626]">yourtix</span>
              <span className="text-[#191c1e]">side</span>
            </div>
            <p className="text-[13px] text-[#565e74] max-w-sm leading-[22px]">
              Platform operasional dan pendukung resmi ekosistem acara yourtix. Menghubungkan manajemen gate, voting tiket, custom formulir, dan dukungan pelanggan.
            </p>
          </div>

          {/* 1. Product */}
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#191c1e] mb-4">
              Product
            </div>
            <ul className="space-y-2.5 text-[13px] text-[#565e74]">
              <li>
                <button
                  onClick={() => onOpenPortal('creator')}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Event Creator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenServices}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Turnstile &amp; Gate
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenServices}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Custom Forms
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenServices}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Live Voting Engine
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenServices}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  E-Signature MoU
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Support */}
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#191c1e] mb-4">
              Support
            </div>
            <ul className="space-y-2.5 text-[13px] text-[#565e74]">
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Live Chat Support
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStatus}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Status Sistem
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Panduan Event
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Hubungi Dukungan
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Company */}
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#191c1e] mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-[13px] text-[#565e74]">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Tentang yourtixside
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Ekosistem yourtix
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Partner Promotor
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#dc2626] transition-colors cursor-pointer text-left"
                >
                  Hubungi Tim
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Legal */}
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#191c1e] mb-4">
              Legal
            </div>
            <ul className="space-y-2.5 text-[13px] text-[#565e74]">
              <li>
                <a href="/legal/privacy" className="hover:text-[#dc2626] transition-colors text-left">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="/legal/terms" className="hover:text-[#dc2626] transition-colors text-left">
                  Syarat &amp; Ketentuan
                </a>
              </li>
              <li>
                <a href="/legal/security" className="hover:text-[#dc2626] transition-colors text-left">
                  Keamanan Data
                </a>
              </li>
              <li>
                <a href="/legal/compliance" className="hover:text-[#dc2626] transition-colors text-left">
                  Kepatuhan Acara
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Newsletter Section */}
        <div className="p-6 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#dc2626] text-xl">mail</span>
              <h4 className="text-[15px] font-bold text-[#191c1e]">Newsletter</h4>
            </div>
            <p className="text-[13px] text-[#565e74] leading-[20px]">
              Dapatkan update fitur operasional terbaru, panduan kelancaran turnstile gate, dan wawasan penyelenggaraan event langsung ke inbox Anda.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] text-[13px] font-semibold">
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>Terima kasih! Anda telah terdaftar dalam newsletter kami.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Masukkan alamat email..."
                  className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] text-[13px] text-[#191c1e] focus:outline-none focus:border-[#dc2626] min-w-[260px] bg-[#f8fafc]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer shadow-xs whitespace-nowrap"
                >
                  Langganan
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 6. Copyright */}
        <div className="pt-6 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#565e74] gap-4">
          <div>
            © 2026 yourtixside. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-[12px]">
            <button
              onClick={onOpenAbout}
              className="hover:text-[#dc2626] transition-colors cursor-pointer"
            >
              Tentang
            </button>
            <span className="text-[#cbd5e1]">•</span>
            <button
              onClick={onOpenContact}
              className="hover:text-[#dc2626] transition-colors cursor-pointer"
            >
              Kontak
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
