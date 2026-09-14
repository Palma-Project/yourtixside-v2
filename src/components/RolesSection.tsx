import React from 'react';
import { RoleType } from '../types';

interface RolesSectionProps {
  onSelectRole: (role: RoleType) => void;
}

export const RolesSection: React.FC<RolesSectionProps> = ({ onSelectRole }) => {
  return (
    <section className="py-16 md:py-20 bg-[#f7f9fb]" id="roles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            YOUR ROLE
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Kamu menggunakan yourtixside sebagai apa?
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            yourtixside menghubungkan tiga pilar operasional acara dalam lingkungan kerja terintegrasi dengan akses izin khusus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Event Creator */}
          <div className="bg-white rounded-xl border-2 border-[#dc2626] p-8 shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 bg-[#dc2626] text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg">
              EO PORTAL
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#fef2f2] flex items-center justify-center text-[#dc2626] mb-6">
                <span className="material-symbols-outlined text-2xl">confirmation_number</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#191c1e]">Event Creator</h3>
              <p className="text-[12px] text-[#dc2626] mt-1 font-semibold">Create &amp; Operate</p>
              <p className="text-[14px] text-[#565e74] mt-3 leading-[22px]">
                Kelola event, ticket type, form, seating, voting, dokumen, dan kebutuhan operasional event.
              </p>

              <div className="mt-6 pt-6 border-t border-[#e2e8f0] space-y-2.5">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#006645] text-lg">check</span>
                  <span>Events &amp; Ticket Configuration</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#006645] text-lg">check</span>
                  <span>Forms &amp; Custom Participant Fields</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#006645] text-lg">check</span>
                  <span>Verified Audience Voting</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#006645] text-lg">check</span>
                  <span>Legal Documents &amp; Digital MoU</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectRole('creator')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] hover:bg-[#b91c1c] shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Masuk sebagai Event Creator</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 2: Customer */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 shadow-xs hover:border-[#cbd5e1] hover:shadow-md flex flex-col justify-between relative group transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#565e74] mb-6">
                <span className="material-symbols-outlined text-2xl">support_agent</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#191c1e]">Customer</h3>
              <p className="text-[12px] text-[#565e74] mt-1 font-semibold">Get Help &amp; Participate</p>
              <p className="text-[14px] text-[#565e74] mt-3 leading-[22px]">
                Cari bantuan, ajukan komplain, cek status, chat dengan CS, dan ikut voting event.
              </p>

              <div className="mt-6 pt-6 border-t border-[#e2e8f0] space-y-2.5">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>FAQ &amp; Knowledge Base</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>Complaint &amp; Issue Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>Refund &amp; Ticket Status Check</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>One-Ticket Voting Access</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectRole('customer')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#e2e8f0] text-[#191c1e] font-semibold text-[14px] hover:bg-[#f2f4f6] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
              >
                <span>Butuh Bantuan</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Card 3: Superadmin */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] p-8 shadow-xs hover:border-[#2d3133] hover:shadow-md flex flex-col justify-between relative group transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eceef0] flex items-center justify-center text-[#191c1e] mb-6">
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#191c1e]">Superadmin</h3>
              <p className="text-[12px] text-[#565e74] mt-1 font-semibold">Control &amp; Operate</p>
              <p className="text-[14px] text-[#565e74] mt-3 leading-[22px]">
                Kelola EO, support, voting, fotobooth, konten, user access, sistem, dan audit.
              </p>

              <div className="mt-6 pt-6 border-t border-[#e2e8f0] space-y-2.5">
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>EO Verification &amp; Governance</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>Omnichannel Customer Support</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>Voting &amp; Content Moderation</span>
                </div>
                <div className="flex items-center gap-2 text-[13px] text-[#191c1e]">
                  <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                  <span>System Health &amp; Security Audit</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => onSelectRole('superadmin')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2d3133] text-white font-semibold text-[14px] hover:bg-[#191c1e] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                <span>Admin Portal</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
