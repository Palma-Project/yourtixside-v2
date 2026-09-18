/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileSignature,
  MessageCircle,
  AlertTriangle,
  BookOpen,
  Star,
  Building2,
  Vote,
  Camera,
  Gift,
  Settings2,
  Users,
  SlidersHorizontal,
  UserCog,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { OverviewPage } from './pages/OverviewPage';
import { DocSupportPage } from './pages/DocSupportPage';
import { ContentPage } from './pages/ContentPage';
import { OperationalPage } from './pages/OperationalPage';
import { AdminPage } from './pages/AdminPage';
import { AccountsManagementPage } from './pages/AccountsManagementPage';

export type SuperadminSection = 'overview' | 'docsupport' | 'content' | 'operational' | 'admin' | 'accounts';

interface NavGroup {
  label: string;
  items: { id: SuperadminSection; label: string; icon: React.ReactNode }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Utama',
    items: [{ id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={17} /> }],
  },
  {
    label: 'Dokumen & Support',
    items: [
      { id: 'docsupport', label: 'E-Signature / Chat / Komplain', icon: <FileSignature size={17} /> },
    ],
  },
  {
    label: 'Konten',
    items: [{ id: 'content', label: 'Konten & Testimoni', icon: <BookOpen size={17} /> }],
  },
  {
    label: 'Operasional',
    items: [
      { id: 'operational', label: 'EO / Voting / Fotobooth / Program / Sistem', icon: <Building2 size={17} /> },
    ],
  },
  {
    label: 'Administrasi',
    items: [
      { id: 'admin', label: 'User & Akses / Pengaturan', icon: <Users size={17} /> },
      { id: 'accounts', label: 'Manajemen Akun (EO & Customer)', icon: <UserCog size={17} /> },
    ],
  },
];

interface SuperadminDashboardProps {
  name: string;
  role: string;
  onLogout: () => void;
  onBackHome: () => void;
}

export const SuperadminDashboard: React.FC<SuperadminDashboardProps> = ({
  name,
  role,
  onLogout,
  onBackHome,
}) => {
  const [section, setSection] = useState<SuperadminSection>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const allItems = NAV_GROUPS.flatMap((g) => g.items);
  const activeLabel = allItems.find((n) => n.id === section)?.label ?? '';

  const renderSection = () => {
    switch (section) {
      case 'overview':
        return <OverviewPage onNavigate={setSection} />;
      case 'docsupport':
        return <DocSupportPage />;
      case 'content':
        return <ContentPage />;
      case 'operational':
        return <OperationalPage />;
      case 'admin':
        return <AdminPage />;
      case 'accounts':
        return <AccountsManagementPage />;
      default:
        return null;
    }
  };

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <div className="px-3 mb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#94a3b8]">
            {group.label}
          </div>
          <div className="space-y-1">
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSection(item.id);
                  onNavigate?.();
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-colors cursor-pointer ${
                  section === item.id
                    ? 'bg-[#fef2f2] text-[#dc2626]'
                    : 'text-[#565e74] hover:bg-[#f2f4f6] hover:text-[#191c1e]'
                }`}
              >
                {item.icon}
                <span className="truncate text-left">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-72 shrink-0 bg-white border-r border-[#e2e8f0] flex-col">
        <div className="h-16 flex items-center px-5 border-b border-[#e2e8f0] gap-2">
          <span className="text-[19px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
          <span className="inline-flex items-center gap-1 bg-[#191c1e] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-md">
            <ShieldAlert size={9} />
            ADMIN
          </span>
        </div>
        <NavList />
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
            <NavList onNavigate={() => setMobileNavOpen(false)} />
            <div className="p-3 border-t border-[#e2e8f0] space-y-1">
              <button onClick={onBackHome} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#565e74] cursor-pointer">
                <ExternalLink size={16} />
                Lihat Web Utama
              </button>
              <button onClick={onLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-[#b3220f] cursor-pointer">
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
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center px-4 sm:px-6 gap-3 sticky top-0 z-30">
          <button onClick={() => setMobileNavOpen(true)} className="lg:hidden text-[#565e74] cursor-pointer" aria-label="Menu">
            <Menu size={22} />
          </button>
          <h1 className="text-[14px] sm:text-[17px] font-bold text-[#191c1e] truncate">{activeLabel}</h1>
          <div className="ml-auto flex items-center gap-2.5 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-[12.5px] font-bold text-[#191c1e] leading-tight">{name}</div>
              <div className="text-[11px] text-[#94a3b8] leading-tight">{role}</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#191c1e] text-white flex items-center justify-center text-[13px] font-bold shrink-0">
              {name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">{renderSection()}</main>
      </div>
    </div>
  );
};
