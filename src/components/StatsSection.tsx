import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="bg-white border-b border-[#e2e8f0] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#e2e8f0]">
          <div className="pt-4 md:pt-0 md:px-4 first:pl-0 text-center md:text-left">
            <div className="text-[28px] sm:text-[32px] font-bold text-[#dc2626] tracking-tight">238+</div>
            <div className="text-[#191c1e] font-semibold text-[14px] mt-0.5">EO Verified</div>
            <div className="text-[#565e74] text-[13px]">Penyelenggara aktif bersertifikasi</div>
          </div>
          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <div className="text-[28px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">1,900+</div>
            <div className="text-[#191c1e] font-semibold text-[14px] mt-0.5">Docs Signed</div>
            <div className="text-[#565e74] text-[13px]">MoU &amp; legal waiver sah digital</div>
          </div>
          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <div className="text-[28px] sm:text-[32px] font-bold text-[#dc2626] tracking-tight">&lt;2 min</div>
            <div className="text-[#191c1e] font-semibold text-[14px] mt-0.5">Chat Response</div>
            <div className="text-[#565e74] text-[13px]">Rata-rata kecepatan SLA support</div>
          </div>
          <div className="pt-4 md:pt-0 md:px-4 text-center md:text-left">
            <div className="text-[28px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">24/7</div>
            <div className="text-[#191c1e] font-semibold text-[14px] mt-0.5">Help Center</div>
            <div className="text-[#565e74] text-[13px]">Pusat kendali operasional siap siaga</div>
          </div>
        </div>
      </div>
    </section>
  );
};
