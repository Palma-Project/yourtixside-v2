import React, { useState } from 'react';

interface NavbarProps {
  onOpenHome?: () => void;
  onOpenAbout: () => void;
  onOpenServices: () => void;
  onOpenContact: () => void;
  onOpenHelps: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHome,
  onOpenAbout,
  onOpenServices,
  onOpenContact,
  onOpenHelps,
  onOpenAuth,
}) => {
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenHome) {
      onOpenHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white border-b border-[#e2e8f0] shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Kiri: Logo YourtixSide */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={handleHomeClick}
            className="text-[21px] leading-none font-bold tracking-tight flex items-center transition-transform hover:opacity-90"
          >
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </a>
        </div>

        {/* Tengah: Home, About, Services, Contact, Helps */}
        <nav className="hidden md:flex items-center space-x-7">
          <button
            onClick={handleHomeClick}
            className="text-[#191c1e] hover:text-[#dc2626] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={onOpenAbout}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            About
          </button>
          <button
            onClick={onOpenServices}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={onOpenContact}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={onOpenHelps}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Helps</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
          </button>
        </nav>

        {/* Kanan: ID / EN & Login | Signup */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* ID / EN toggle */}
          <button
            onClick={() => setLang(lang === 'ID' ? 'EN' : 'ID')}
            title="Ganti Bahasa (Language)"
            className="inline-flex items-center gap-1 text-[#565e74] hover:text-[#191c1e] text-[12px] font-semibold px-2 py-1.5 rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer border border-[#e2e8f0]"
          >
            <span className="material-symbols-outlined text-base">language</span>
            <span>{lang === 'ID' ? 'ID' : 'EN'}</span>
            <span className="text-[#94a3b8]">/</span>
            <span className="text-[#94a3b8]">{lang === 'ID' ? 'EN' : 'ID'}</span>
          </button>

          {/* Login | Signup */}
          <div className="flex items-center gap-1.5 text-[13px] font-semibold">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
            >
              Login
            </button>
            <span className="text-[#cbd5e1]">|</span>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3.5 py-1.5 rounded-xl bg-[#dc2626] text-white hover:bg-[#b91c1c] active:scale-[0.98] transition-all shadow-xs cursor-pointer font-semibold text-[13px]"
            >
              Signup
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0]"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white px-5 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2.5">
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleHomeClick(e);
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#191c1e]"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              About
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServices();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              Services
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              Contact
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelps();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e] flex items-center gap-1.5"
            >
              <span>Helps</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            </button>
          </nav>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setLang(lang === 'ID' ? 'EN' : 'ID');
              }}
              className="px-3 py-1.5 text-[12px] font-semibold rounded-lg border border-[#e2e8f0] text-[#565e74]"
            >
              Bahasa: {lang}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="px-3.5 py-1.5 rounded-lg border border-[#e2e8f0] text-[13px] font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#dc2626] text-white text-[13px] font-semibold"
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
