/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileSignature, MessageCircle, AlertTriangle, Building2, Clock } from 'lucide-react';
import { docRequests, complaints, chatConversations, eoProfiles, needsAttention, recentActivity } from '../../data/superadminData';
import { SectionCard, StatPill } from '../../creator/components/ui';
import { SuperadminSection } from '../SuperadminDashboard';

interface OverviewPageProps {
  onNavigate: (section: SuperadminSection) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const pendingComplaints = complaints.filter((c) => c.status !== 'selesai').length;
  const pendingDocs = docRequests.filter((d) => d.status === 'pending').length;
  const activeChats = chatConversations.length;
  const verifiedEO = eoProfiles.filter((e) => e.verificationStatus === 'verified').length;

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        <button onClick={() => onNavigate('docsupport')} className="text-left cursor-pointer">
          <StatPill label="Komplain Pending" value={pendingComplaints} icon={<AlertTriangle size={15} />} />
        </button>
        <button onClick={() => onNavigate('docsupport')} className="text-left cursor-pointer">
          <StatPill label="Dokumen Menunggu Approval" value={pendingDocs} icon={<FileSignature size={15} />} />
        </button>
        <button onClick={() => onNavigate('docsupport')} className="text-left cursor-pointer">
          <StatPill label="Chat Aktif" value={activeChats} icon={<MessageCircle size={15} />} />
        </button>
        <button onClick={() => onNavigate('operational')} className="text-left cursor-pointer">
          <StatPill label="EO Terverifikasi" value={verifiedEO} icon={<Building2 size={15} />} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <SectionCard title="Aktivitas Terbaru" description="Kejadian terbaru dari seluruh modul.">
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3 text-[13px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[#191c1e]">{a.text}</p>
                  </div>
                  <span className="text-[11.5px] text-[#94a3b8] shrink-0 flex items-center gap-1">
                    <Clock size={11} />
                    {a.time}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div>
          <SectionCard title="Perlu Perhatian" description="Item yang butuh tindak lanjut segera.">
            <div className="space-y-3">
              {needsAttention.map((n) => (
                <div key={n.id} className="rounded-xl bg-[#fffbeb] border border-[#fde68a] p-3">
                  <div className="text-[12.5px] font-bold text-[#92400e]">{n.label}</div>
                  <p className="text-[11.5px] text-[#b45309] mt-0.5 leading-[16px]">{n.detail}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};
