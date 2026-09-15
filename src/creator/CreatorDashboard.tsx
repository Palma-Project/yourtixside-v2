/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileSignature,
  CalendarDays,
  Wallet,
  Vote,
  Camera,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { DocumentsPage } from './pages/DocumentsPage';
import { OperationalPage } from './pages/OperationalPage';
import { FinancialPage } from './pages/FinancialPage';
import { VotingPage } from './pages/VotingPage';
import { MomentsPage } from './pages/MomentsPage';
import { FormsPage } from './pages/FormsPage';

export type CreatorSection = 'documents' | 'operational' | 'financial' | 'voting' | 'moments' | 'forms';

interface NavItem {
  id: CreatorSection;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'documents', label: 'Dokumen & Legal', icon: <FileSignature size={17} /> },
  { id: 'operational', label: 'Persiapan & Operasional', icon: <CalendarDays size={17} /> },
  { id: 'financial', label: 'Finansial & Kerjasama', icon: <Wallet size={17} /> },
  { id: 'voting', label: 'Voting & Polling', icon: <Vote size={17} /> },
  { id: 'moments', label: 'Take a Moment', icon: <Camera size={17} /> },
  { id: 'forms', label: 'YourTix Form', icon: <ClipboardList size={17} /> },
];

interface CreatorDashboardProps {
  orgName: string;
  contactName: string;
  onLogout: () => void;
  onBackHome: () => void;
}

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  orgName,
  contactName,
  onLogout,
  onBackHome,
}) => {
  const [section, setSection] = useState<CreatorSection>('documents');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeLabel = NAV_ITEMS.find((n) => n.id === section)?.label ?? '';

  const renderSection = () => {
    switch (section) {
      case 'documents':
        return <DocumentsPage />;
      case 'operational':
        return <OperationalPage />;
      case 'financial':
        return <FinancialPage />;
      case 'voting':
        return <VotingPage />;
      case 'moments':
        return <MomentsPage />;
      case 'forms':
        return <FormsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-[#e2e8f0] flex-col">
        <div className="h-16 flex items-center px-5 border-b border-[#e2e8f0]">
          <span className="text-[19px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-colors cursor-pointer ${
                section === item.id
                  ? 'bg-[#fef2f2] text-[#dc2626]'
                  : 'text-[#565e74] hover:bg-[#f2f4f6] hover:text-[#191c1e]'
              }`}
            >
              {item.icon}
              <span className="truncate text-left">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-[#e2e8f0] space-y-1">
          <button
            onClick={onBackHome}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#565e74] hover:bg-[#f2f4f6] hover:text-[#191c1e] transition-colors cursor-pointer"
          >
            <ExternalLink size={16} />
            Lihat Web Utama
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#b3220f] hover:bg-[#fef2f2] transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Mobile nav drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-72 bg-white h-full flex flex-col animate-in slide-in-from-left duration-200">
            <div className="h-16 flex items-center justify-between px-5 border-b border-[#e2e8f0]">
              <span className="text-[19px] font-bold tracking-tight">
                <span className="text-[#dc2626]">yourtix</span>
                <span className="text-[#191c1e]">side</span>
              </span>
              <button onClick={() => setMobileNavOpen(false)} className="text-[#565e74] cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSection(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition-colors cursor-pointer ${
                    section === item.id ? 'bg-[#fef2f2] text-[#dc2626]' : 'text-[#565e74]'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-3 border-t border-[#e2e8f0] space-y-1">
              <button
                onClick={onBackHome}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#565e74] cursor-pointer"
              >
                <ExternalLink size={16} />
                Lihat Web Utama
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#b3220f] cursor-pointer"
              >
                <LogOut size={16} />
                Keluar
              </button>
            </div>
          </div>
          <div className="flex-1 bg-black/30" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="lg:hidden text-[#565e74] cursor-pointer"
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-[15px] sm:text-[17px] font-bold text-[#191c1e] truncate">{activeLabel}</h1>
          <div className="ml-auto flex items-center gap-2.5 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-[12.5px] font-bold text-[#191c1e] leading-tight">{orgName}</div>
              <div className="text-[11px] text-[#94a3b8] leading-tight">{contactName}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#dc2626] text-white flex items-center justify-center text-[13px] font-bold shrink-0">
              {orgName.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">{renderSection()}</main>
      </div>
    </div>
  );
};
