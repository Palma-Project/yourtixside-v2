import React, { useMemo, useState } from 'react';
import { Search, MapPin, Menu, X, Languages, Compass, Vote as VoteIcon } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppStore } from '../store/AppStore';

interface NavbarProps {
  onOpenHome?: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectSuggestion?: (kind: 'event' | 'vote', id: string) => void;
  locationLabel: string | null;
  locationLoading: boolean;
  onLocationClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHome,
  onOpenAuth,
  searchQuery,
  onSearchChange,
  onSelectSuggestion,
  locationLabel,
  locationLoading,
  onLocationClick,
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const { events, votes } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenHome) onOpenHome();
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { events: [], votes: [] };
    return {
      events: events.filter((e) => e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q)).slice(0, 4),
      votes: votes.filter((v) => v.question.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [searchQuery, events, votes]);

  const showSuggestions = searchFocused && searchQuery.trim().length > 0;

  const SuggestionList = () => (
    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl border border-[#e2e8f0] shadow-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
      {suggestions.events.length === 0 && suggestions.votes.length === 0 ? (
        <p className="text-[12.5px] text-[#94a3b8] px-4 py-3.5">Tidak ada hasil untuk "{searchQuery}"</p>
      ) : (
        <>
          {suggestions.events.length > 0 && (
            <div className="py-1.5">
              <div className="px-4 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#94a3b8]">Event</div>
              {suggestions.events.map((e) => (
                <button
                  key={e.id}
                  onMouseDown={() => onSelectSuggestion?.('event', e.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-left hover:bg-[#f8fafc] cursor-pointer"
                >
                  <Compass size={14} className="text-[#dc2626] shrink-0" />
                  <span className="text-[13px] text-[#191c1e] truncate">{e.title}</span>
                  <span className="text-[11px] text-[#94a3b8] ml-auto shrink-0">{e.city}</span>
                </button>
              ))}
            </div>
          )}
          {suggestions.votes.length > 0 && (
            <div className="py-1.5 border-t border-[#f1f5f9]">
              <div className="px-4 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#94a3b8]">Vote</div>
              {suggestions.votes.map((v) => (
                <button
                  key={v.id}
                  onMouseDown={() => onSelectSuggestion?.('vote', v.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-left hover:bg-[#f8fafc] cursor-pointer"
                >
                  <VoteIcon size={14} className="text-[#dc2626] shrink-0" />
                  <span className="text-[13px] text-[#191c1e] truncate">{v.question}</span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 w-full z-40 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_1px_0_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
        <a
          href="#"
          onClick={handleHomeClick}
          className="text-[21px] leading-none font-bold tracking-tight flex items-center transition-transform hover:opacity-90 shrink-0"
        >
          <span className="text-[#dc2626]">yourtix</span>
          <span className="text-[#191c1e]">side</span>
        </a>

        <button
          onClick={onLocationClick}
          className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-full hover:bg-white/70 transition-colors cursor-pointer shrink-0"
        >
          <MapPin size={15} className="text-[#dc2626]" />
          <span className="max-w-[110px] truncate">
            {locationLoading ? t.location.detecting : locationLabel || t.location.unknown}
          </span>
        </button>

        <div className="hidden sm:flex flex-1 max-w-md relative">
          <label className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white/70 border border-white/60 focus:border-[#dc2626] focus:bg-white text-[13px] text-[#191c1e] placeholder:text-[#94a3b8] outline-none transition-colors"
            />
          </label>
          {showSuggestions && <SuggestionList />}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="sm:hidden p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-white/70 cursor-pointer"
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          <button
            onClick={toggleLang}
            title="Language"
            className="hidden sm:inline-flex items-center gap-1 text-[#565e74] hover:text-[#191c1e] text-[12px] font-semibold px-2 py-1.5 rounded-full hover:bg-white/70 transition-colors cursor-pointer border border-white/60"
          >
            <Languages size={15} />
            <span>{lang.toUpperCase()}</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-[13px] font-semibold">
            <button
              onClick={() => onOpenAuth('login')}
              className="text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-full hover:bg-white/70 transition-colors cursor-pointer"
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="px-3.5 py-1.5 rounded-full bg-[#dc2626] text-white hover:bg-[#b91c1c] active:scale-[0.98] transition-all shadow-sm cursor-pointer font-semibold text-[13px]"
            >
              {t.nav.signup}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-white/70 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="sm:hidden px-4 pb-3 border-t border-white/40 pt-3 relative">
          <label className="relative w-full block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 120)}
              placeholder={t.nav.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-full bg-white border border-[#e2e8f0] focus:border-[#dc2626] text-[13px] text-[#191c1e] placeholder:text-[#94a3b8] outline-none transition-colors"
            />
          </label>
          {showSuggestions && <SuggestionList />}
        </div>
      )}

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/40 bg-white/90 backdrop-blur-xl px-5 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            onClick={onLocationClick}
            className="w-full flex items-center gap-1.5 text-[14px] font-semibold text-[#565e74]"
          >
            <MapPin size={15} className="text-[#dc2626]" />
            <span>{locationLoading ? t.location.detecting : locationLabel || t.location.unknown}</span>
          </button>

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
