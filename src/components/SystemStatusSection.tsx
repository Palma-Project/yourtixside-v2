import React from 'react';

interface SystemStatusSectionProps {
  onOpenStatus: () => void;
}

export const SystemStatusSection: React.FC<SystemStatusSectionProps> = ({ onOpenStatus }) => {
  return (
    <section className="py-10 bg-white border-y border-[#e2e8f0]" id="status">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f7f9fb] p-5 rounded-xl border border-[#e2e8f0] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: General Status */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10b981]"></span>
            </span>
            <div>
              <span className="text-[14px] text-[#191c1e] font-bold">
                Semua layanan berjalan normal.
              </span>
              <span className="text-[#565e74] text-[13px] hidden sm:inline ml-2 font-medium">
                Uptime 99.98% 30 hari terakhir.
              </span>
            </div>
          </div>

          {/* Center: Service Health Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-[#191c1e] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              E-Signature: Normal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-[#191c1e] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Live Chat: Normal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-[#191c1e] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Voting: Normal
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#e2e8f0] text-[#191c1e] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              Fotobooth: Normal
            </span>
          </div>

          {/* Right: Link */}
          <button
            onClick={onOpenStatus}
            className="text-[#dc2626] hover:text-[#b91c1c] text-[12px] flex items-center gap-1 font-bold cursor-pointer transition-colors"
          >
            <span>Lihat Status Sistem</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
