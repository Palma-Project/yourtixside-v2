/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { RoleType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventsSection } from './components/EventsSection';
import { VotingSection } from './components/VotingSection';
import { Footer } from './components/Footer';
import { PortalModal } from './components/PortalModal';
import { AuthModal } from './components/AuthModal';
import { InfoModal, InfoModalType } from './components/InfoModal';
import { SystemStatusModal } from './components/SystemStatusModal';
import { LiveSupportModal } from './components/LiveSupportModal';
import { LocationPrompt } from './components/LocationPrompt';
import { EventDetail } from './pages/EventDetail';
import { VoteDetail } from './pages/VoteDetail';
import { CandidateDetail } from './pages/CandidateDetail';
import { getEventById } from './data/events';
import { getPollById, getCandidateById } from './data/polls';
import { useGeolocation } from './hooks/useGeolocation';

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

export default function App() {
  // Modal states for interactive features
  const [portalModalRole, setPortalModalRole] = useState<RoleType | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null);
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
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const openPoll = useCallback((id: string) => {
    window.history.pushState({}, '', `/vote/${id}`);
    setPollId(id);
    setEventId(null);
    setCandidateId(null);
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
    setPortalModalRole(role || 'creator');
  };

  const activeEvent = eventId ? getEventById(eventId) : null;
  const activePoll = pollId ? getPollById(pollId) : null;
  const activeCandidate =
    activePoll && candidateId ? getCandidateById(activePoll, candidateId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#dc2626] selection:text-white">
      {/* ========================================================= */}
      {/* NAVBAR (persistent across home + event detail)            */}
      {/* ========================================================= */}
      <Navbar
        onOpenHome={backToHome}
        onOpenAbout={() => setInfoModalType('about')}
        onOpenServices={() => setInfoModalType('services')}
        onOpenContact={() => setInfoModalType('contact')}
        onOpenHelps={() => setIsSupportModalOpen(true)}
        onOpenAuth={(mode) => setAuthModalMode(mode)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
          {/* Hero */}
          <HeroSection
            onOpenRole={(role) => handleOpenPortal(role)}
            onOpenSupport={() => setIsSupportModalOpen(true)}
          />

          {/* Events grid */}
          <EventsSection searchQuery={searchQuery} onOpenEvent={openEvent} />

          {/* Voting / polls */}
          <VotingSection onOpenPoll={openPoll} />
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

      {authModalMode && (
        <AuthModal
          initialTab={authModalMode}
          onClose={() => setAuthModalMode(null)}
          onSuccessRole={(role) => {
            setPortalModalRole(role);
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
