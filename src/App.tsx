/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { RoleType } from './types';
import { Navbar } from './components/Navbar';
import { BannerCarousel } from './components/BannerCarousel';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SystemStatusBanner } from './components/SystemStatusBanner';
import { EventsSection } from './components/EventsSection';
import { VotingSection } from './components/VotingSection';
import { Footer } from './components/Footer';
import { PortalModal } from './components/PortalModal';
import { RoleChooserModal } from './components/RoleChooserModal';
import { UnifiedLoginModal } from './components/UnifiedLoginModal';
import { InfoModal, InfoModalType } from './components/InfoModal';
import { SystemStatusModal } from './components/SystemStatusModal';
import { LiveSupportModal } from './components/LiveSupportModal';
import { LocationPrompt } from './components/LocationPrompt';
import { EventDetail } from './pages/EventDetail';
import { VoteDetail } from './pages/VoteDetail';
import { CandidateDetail } from './pages/CandidateDetail';
import { useAppStore } from './store/AppStore';
import { useGeolocation } from './hooks/useGeolocation';
import { useCreatorAuth } from './hooks/useCreatorAuth';
import { useCustomerAuth } from './hooks/useCustomerAuth';
import { CreatorLogin } from './creator/CreatorLogin';
import { CreatorDashboard } from './creator/CreatorDashboard';
import { useSuperadminAuth } from './hooks/useSuperadminAuth';
import { SuperadminLogin } from './superadmin/SuperadminLogin';
import { SuperadminDashboard } from './superadmin/SuperadminDashboard';
import { CustomerPortal } from './customer/CustomerPortal';
import { MinisiteView } from './customer/MinisiteView';
import { LegalPage, LegalPageId } from './components/LegalPage';

function getEventIdFromPath(): string | null {
  const match = window.location.pathname.match(/^\/events\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getPollIdFromPath(): string | null {
  const match = window.location.pathname.match(/^\/vote\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getCandidateIdFromPath(): string | null {
  const match = window.location.pathname.match(/^\/vote\/[^/]+\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function isCreatorPath(): boolean {
  return window.location.pathname.startsWith('/creator');
}

function isSuperadminPath(): boolean {
  return window.location.pathname.startsWith('/superadmin');
}

function isCustomerPath(): boolean {
  return window.location.pathname.startsWith('/customer');
}

function getMinisiteSlugFromPath(): string | null {
  const match = window.location.pathname.match(/^\/m\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getLegalPageFromPath(): LegalPageId | null {
  const match = window.location.pathname.match(/^\/legal\/([^/]+)/);
  const id = match ? match[1] : null;
  return id === 'privacy' || id === 'terms' || id === 'security' || id === 'compliance' ? id : null;
}

export default function App() {
  // Event Creator dashboard (separate mock-authenticated area)
  const creatorAuth = useCreatorAuth();
  const [onCreatorRoute, setOnCreatorRoute] = useState(() => isCreatorPath());

  // Superadmin dashboard (separate mock-authenticated area)
  const superadminAuth = useSuperadminAuth();
  const [onSuperadminRoute, setOnSuperadminRoute] = useState(() => isSuperadminPath());

  // Customer portal (no login required, single page)
  const [onCustomerRoute, setOnCustomerRoute] = useState(() => isCustomerPath());

  useEffect(() => {
    const onPop = () => {
      setOnCreatorRoute(isCreatorPath());
      setOnSuperadminRoute(isSuperadminPath());
      setOnCustomerRoute(isCustomerPath());
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const openCustomerPortal = useCallback(() => {
    window.history.pushState({}, '', '/customer');
    setOnCustomerRoute(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const exitCustomerPortal = useCallback(() => {
    window.history.pushState({}, '', '/');
    setOnCustomerRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const openCreatorPortal = useCallback(() => {
    window.history.pushState({}, '', '/creator');
    setOnCreatorRoute(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const exitCreatorPortal = useCallback(() => {
    window.history.pushState({}, '', '/');
    setOnCreatorRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const exitSuperadminPortal = useCallback(() => {
    window.history.pushState({}, '', '/');
    setOnSuperadminRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  // Modal states for interactive features
  const [portalModalRole, setPortalModalRole] = useState<RoleType | null>(null);
  const [authIntent, setAuthIntent] = useState<'login' | 'signup' | null>(null);
  const [creatorAuthMode, setCreatorAuthMode] = useState<'login' | 'signup'>('login');
  const [customerPortalInitialView, setCustomerPortalInitialView] = useState<'portal' | 'login'>('portal');
  const [customerAuthMode, setCustomerAuthMode] = useState<'login' | 'signup'>('login');
  const customerAuthCheck = useCustomerAuth();
  const [infoModalType, setInfoModalType] = useState<InfoModalType | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Geolocation
  const geo = useGeolocation();
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);

  useEffect(() => {
    if (!geo.hasStoredChoice()) {
      const timer = setTimeout(() => setShowLocationPrompt(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [geo]);

  const handleAcceptLocation = () => {
    setShowLocationPrompt(false);
    geo.requestLocation();
  };

  const handleDeclineLocation = () => {
    setShowLocationPrompt(false);
    geo.dismiss();
  };

  const handleLocationBadgeClick = () => {
    if (geo.status !== 'granted') {
      geo.requestLocation();
    }
  };

  // Lightweight client-side routing (no router dependency): "/" = home,
  // "/events/:id" = event detail, "/vote/:id" = vote detail
  const [eventId, setEventId] = useState<string | null>(() => getEventIdFromPath());
  const [pollId, setPollId] = useState<string | null>(() => getPollIdFromPath());
  const [candidateId, setCandidateId] = useState<string | null>(() => getCandidateIdFromPath());

  useEffect(() => {
    const onPopState = () => {
      setEventId(getEventIdFromPath());
      setPollId(getPollIdFromPath());
      setCandidateId(getCandidateIdFromPath());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const openEvent = useCallback((id: string) => {
    window.history.pushState({}, '', `/events/${id}`);
    setEventId(id);
    setPollId(null);
    setCandidateId(null);
    setOnCustomerRoute(false);
    setOnCreatorRoute(false);
    setOnSuperadminRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const openPoll = useCallback((id: string) => {
    window.history.pushState({}, '', `/vote/${id}`);
    setPollId(id);
    setEventId(null);
    setCandidateId(null);
    setOnCustomerRoute(false);
    setOnCreatorRoute(false);
    setOnSuperadminRoute(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const openCandidate = useCallback((pid: string, cid: string) => {
    window.history.pushState({}, '', `/vote/${pid}/${cid}`);
    setPollId(pid);
    setCandidateId(cid);
    setEventId(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const backToPoll = useCallback((pid: string) => {
    window.history.pushState({}, '', `/vote/${pid}`);
    setCandidateId(null);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const backToHome = useCallback(() => {
    window.history.pushState({}, '', '/');
    setEventId(null);
    setPollId(null);
    setCandidateId(null);
  }, []);

  const handleOpenPortal = (role?: RoleType) => {
    if (role === 'creator') {
      openCreatorPortal();
      return;
    }
    if (role === 'customer') {
      openCustomerPortal();
      return;
    }
    if (role === 'superadmin') {
      window.history.pushState({}, '', '/superadmin');
      setOnSuperadminRoute(true);
      return;
    }
    setPortalModalRole(role || 'creator');
  };

  const { votes, events } = useAppStore();
  const activeEvent = eventId ? events.find((e) => e.id === eventId) ?? null : null;
  const { minisites, banners } = useAppStore();
  const minisiteSlug = getMinisiteSlugFromPath();
  const activeMinisite = minisiteSlug ? minisites.find((m) => m.slug === minisiteSlug) ?? null : null;
  const activeLegalPage = getLegalPageFromPath();
  const activePoll = pollId ? votes.find((v) => v.id === pollId) ?? null : null;
  const activeCandidate =
    activePoll && candidateId ? activePoll.candidates.find((c) => c.id === candidateId) ?? null : null;

  // Event Creator dashboard is a separate mock-authenticated area — bail out
  // of the public site shell entirely (no Navbar/Footer) when on /creator.
  if (onCreatorRoute) {
    if (!creatorAuth.session) {
      return (
        <CreatorLogin
          login={creatorAuth.login}
          signup={creatorAuth.signup}
          error={creatorAuth.error}
          initialMode={creatorAuthMode}
          onSuccess={() => {}}
          onBackHome={exitCreatorPortal}
        />
      );
    }
    return (
      <CreatorDashboard
        account={creatorAuth.session}
        onUpdateAccount={creatorAuth.updateProfile}
        onLogout={creatorAuth.logout}
        onBackHome={exitCreatorPortal}
      />
    );
  }

  if (onSuperadminRoute) {
    if (!superadminAuth.session) {
      return <SuperadminLogin onLogin={superadminAuth.login} onBackHome={exitSuperadminPortal} />;
    }
    return (
      <SuperadminDashboard
        name={superadminAuth.session.name}
        role={superadminAuth.session.role}
        onLogout={superadminAuth.logout}
        onBackHome={exitSuperadminPortal}
      />
    );
  }

  if (onCustomerRoute) {
    return (
      <CustomerPortal
        onBackHome={exitCustomerPortal}
        onOpenVote={openPoll}
        initialView={customerPortalInitialView}
        initialLoginMode={customerAuthMode}
      />
    );
  }

  if (activeMinisite) {
    return <MinisiteView site={activeMinisite} />;
  }

  if (activeLegalPage) {
    return (
      <LegalPage
        page={activeLegalPage}
        onBack={() => {
          window.history.pushState({}, '', '/');
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#dc2626] selection:text-white">
      {/* ========================================================= */}
      {/* NAVBAR (persistent across home + event detail)            */}
      {/* ========================================================= */}
      <SystemStatusBanner />
      <Navbar
        onOpenHome={backToHome}
        onOpenAuth={(mode) => setAuthIntent(mode)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSuggestion={(kind, id) => (kind === 'event' ? openEvent(id) : openPoll(id))}
        locationLabel={geo.city}
        locationLoading={geo.status === 'detecting'}
        onLocationClick={handleLocationBadgeClick}
      />

      {activeEvent ? (
        <EventDetail event={activeEvent} onBack={backToHome} />
      ) : activePoll && activeCandidate ? (
        <CandidateDetail
          poll={activePoll}
          candidate={activeCandidate}
          onBack={() => backToPoll(activePoll.id)}
          onOpenCandidate={openCandidate}
          onBackHome={backToHome}
        />
      ) : activePoll ? (
        <VoteDetail poll={activePoll} onBack={backToHome} onOpenCandidate={openCandidate} />
      ) : (
        <>
          {/* Banner */}
          <BannerCarousel
            banners={banners}
            onNavigate={(link) => {
              const voteMatch = link.match(/^\/vote\/([^/]+)/);
              const eventMatch = link.match(/^\/events\/([^/]+)/);
              if (voteMatch) openPoll(voteMatch[1]);
              else if (eventMatch) openEvent(eventMatch[1]);
            }}
          />

          {/* Events grid */}
          <EventsSection searchQuery={searchQuery} onOpenEvent={openEvent} />

          {/* Voting / polls */}
          <VotingSection onOpenPoll={openPoll} />

          {/* Testimonials (approved + pinned by Superadmin) */}
          <TestimonialsSection />
        </>
      )}

      {/* ========================================================= */}
      {/* FOOTER                                                     */}
      {/* ========================================================= */}
      <Footer
        onOpenPortal={handleOpenPortal}
        onOpenStatus={() => setIsStatusModalOpen(true)}
        onOpenSupport={() => setIsSupportModalOpen(true)}
        onOpenAbout={() => setInfoModalType('about')}
        onOpenServices={() => setInfoModalType('services')}
        onOpenContact={() => setInfoModalType('contact')}
      />

      {/* ========================================================= */}
      {/* Interactive Modals & Dialogs                              */}
      {/* ========================================================= */}
      {portalModalRole && (
        <PortalModal
          initialRole={portalModalRole}
          onClose={() => setPortalModalRole(null)}
        />
      )}

      {authIntent === 'signup' && (
        <RoleChooserModal
          onClose={() => setAuthIntent(null)}
          onChoose={(role) => {
            setAuthIntent(null);
            if (role === 'creator') {
              creatorAuth.logout();
              setCreatorAuthMode('signup');
              openCreatorPortal();
            } else {
              setCustomerAuthMode('signup');
              setCustomerPortalInitialView('login');
              openCustomerPortal();
            }
          }}
        />
      )}

      {authIntent === 'login' && (
        <UnifiedLoginModal
          onClose={() => setAuthIntent(null)}
          onGoToSignup={() => setAuthIntent('signup')}
          tryCreatorLogin={creatorAuth.login}
          tryCustomerLogin={customerAuthCheck.login}
          onGoogleCustomer={customerAuthCheck.continueWithGoogle}
          onLoggedInAsCreator={() => {
            setAuthIntent(null);
            setCreatorAuthMode('login');
            openCreatorPortal();
          }}
          onLoggedInAsCustomer={() => {
            setAuthIntent(null);
            setCustomerPortalInitialView('portal');
            openCustomerPortal();
          }}
        />
      )}

      {infoModalType && (
        <InfoModal
          type={infoModalType}
          onClose={() => setInfoModalType(null)}
          onOpenSupport={() => {
            setInfoModalType(null);
            setIsSupportModalOpen(true);
          }}
        />
      )}

      {isStatusModalOpen && (
        <SystemStatusModal onClose={() => setIsStatusModalOpen(false)} />
      )}

      {isSupportModalOpen && (
        <LiveSupportModal onClose={() => setIsSupportModalOpen(false)} />
      )}

      {showLocationPrompt && (
        <LocationPrompt onAccept={handleAcceptLocation} onDecline={handleDeclineLocation} />
      )}
    </div>
  );
}
