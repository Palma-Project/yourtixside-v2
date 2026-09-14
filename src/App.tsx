/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RoleType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Footer } from './components/Footer';
import { PortalModal } from './components/PortalModal';
import { AuthModal } from './components/AuthModal';
import { InfoModal, InfoModalType } from './components/InfoModal';
import { SystemStatusModal } from './components/SystemStatusModal';
import { LiveSupportModal } from './components/LiveSupportModal';

export default function App() {
  // Modal states for interactive features
  const [portalModalRole, setPortalModalRole] = useState<RoleType | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null);
  const [infoModalType, setInfoModalType] = useState<InfoModalType | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const handleOpenPortal = (role?: RoleType) => {
    setPortalModalRole(role || 'creator');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#dc2626] selection:text-white">
      {/* ========================================================= */}
      {/* 1. HEADER (Navbar + Hero)                                 */}
      {/* ========================================================= */}
      <header className="w-full">
        {/* Navbar */}
        <Navbar
          onOpenHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onOpenAbout={() => setInfoModalType('about')}
          onOpenServices={() => setInfoModalType('services')}
          onOpenContact={() => setInfoModalType('contact')}
          onOpenHelps={() => setIsSupportModalOpen(true)}
          onOpenAuth={(mode) => setAuthModalMode(mode)}
        />

        {/* Hero */}
        <HeroSection
          onOpenRole={(role) => handleOpenPortal(role)}
          onOpenSupport={() => setIsSupportModalOpen(true)}
        />
      </header>

      {/* ========================================================= */}
      {/* 2. FOOTER (Product, Support, Company, Legal, Newsletter,  */}
      {/*           Copyright)                                      */}
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
    </div>
  );
}
