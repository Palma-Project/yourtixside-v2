import React, { useState } from 'react';
import { Search, MapPin, Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  onOpenHome?: () => void;
  onOpenAbout: () => void;
  onOpenServices: () => void;
  onOpenContact: () => void;
  onOpenHelps: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  locationLabel: string | null;
  locationLoading: boolean;
  onLocationClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHome,
  onOpenAbout,
  onOpenServices,
  onOpenContact,
  onOpenHelps,
  onOpenAuth,
  searchQuery,
  onSearchChange,
  locationLabel,
  locationLoading,
  onLocationClick,
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenHome) {
      onOpenHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 border-b border-[#e2e8f0] shadow-xs backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <a
          href="#"
          onClick={handleHomeClick}
          className="text-[21px] leading-none font-bold tracking-tight flex items-center transition-transform hover:opacity-90 shrink-0"
        >
          <span className="text-[#dc2626]">yourtix</span>
          <span className="text-[#191c1e]">side</span>
        </a>

        {/* Location badge */}
        <button
          onClick={onLocationClick}
          className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer shrink-0"
        >
          <MapPin size={15} className="text-[#dc2626]" />
          <span className="max-w-[110px] truncate">
            {locationLoading ? t.location.detecting : locationLabel || t.location.unknown}
          </span>
        </button>

        {/* Search bar */}
        <div className="hidden sm:flex flex-1 max-w-md">
          <label className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-[#f2f4f6] border border-transparent focus:border-[#dc2626] focus:bg-white text-[13px] text-[#191c1e] placeholder:text-[#94a3b8] outline-none transition-colors"
            />
          </label>
        </div>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          <button
            onClick={handleHomeClick}
            className="text-[#191c1e] hover:text-[#dc2626] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            {t.nav.home}
          </button>
          <button
            onClick={onOpenAbout}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            {t.nav.about}
          </button>
          <button
            onClick={onOpenServices}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            {t.nav.services}
          </button>
          <button
            onClick={onOpenContact}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold cursor-pointer"
          >
            {t.nav.contact}
          </button>
          <button
            onClick={onOpenHelps}
            className="text-[#565e74] hover:text-[#191c1e] transition-colors text-[14px] font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.nav.helps}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
          </button>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto lg:ml-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="sm:hidden p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title="Language"
            className="hidden sm:inline-flex items-center gap-1 text-[#565e74] hover:text-[#191c1e] text-[12px] font-semibold px-2 py-1.5 rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer border border-[#e2e8f0]"
          >
            <Languages size={15} />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Login | Signup */}
          <div className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
            >
              {t.nav.login}
            </button>
            <span className="text-[#cbd5e1]">|</span>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3.5 py-1.5 rounded-xl bg-[#dc2626] text-white hover:bg-[#b91c1c] active:scale-[0.98] transition-all shadow-xs cursor-pointer font-semibold text-[13px]"
            >
              {t.nav.signup}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 border-t border-[#e2e8f0] pt-3">
          <label className="relative w-full block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-[#f2f4f6] border border-transparent focus:border-[#dc2626] text-[13px] text-[#191c1e] placeholder:text-[#94a3b8] outline-none transition-colors"
            />
          </label>
        </div>
      )}

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e2e8f0] bg-white px-5 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2.5">
            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleHomeClick(e);
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#191c1e]"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenServices();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e]"
            >
              {t.nav.contact}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenHelps();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e] flex items-center gap-1.5"
            >
              <span>{t.nav.helps}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLocationClick();
              }}
              className="text-left py-1 text-[14px] font-semibold text-[#565e74] hover:text-[#191c1e] flex items-center gap-1.5"
            >
              <MapPin size={15} className="text-[#dc2626]" />
              <span>{locationLoading ? t.location.detecting : locationLabel || t.location.unknown}</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-[#e2e8f0] flex items-center justify-between gap-3">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-[12px] font-semibold rounded-lg border border-[#e2e8f0] text-[#565e74]"
            >
              {lang.toUpperCase()}
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="px-3.5 py-1.5 rounded-lg border border-[#e2e8f0] text-[13px] font-semibold"
              >
                {t.nav.login}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#dc2626] text-white text-[13px] font-semibold"
              >
                {t.nav.signup}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
