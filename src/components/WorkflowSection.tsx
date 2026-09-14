import React from 'react';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-[#f7f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            WORKFLOW SEDERHANA
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Tiga langkah mengawal event Anda.
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Mulai dari persiapan pra-acara hingga evaluasi pasca-acara secara terstruktur tanpa hambatan teknis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 01 */}
          <div className="bg-white p-8 rounded-xl border border-[#e2e8f0] shadow-xs relative hover:shadow-md transition-all">
            <div className="text-[36px] font-extrabold text-[#dc2626]/20 mb-3 tracking-tighter">
              01
            </div>
            <h3 className="text-[20px] font-bold text-[#191c1e]">Create</h3>
            <p className="text-[14px] text-[#565e74] mt-2 leading-[22px]">
              Buat dan konfigurasi seluruh instrumen kebutuhan event, sinkronisasi kuota tiket dari yourtix ke dalam hub.
            </p>
          </div>

          {/* Step 02 */}
          <div className="bg-white p-8 rounded-xl border border-[#e2e8f0] shadow-xs relative hover:shadow-md transition-all">
            <div className="text-[36px] font-extrabold text-[#dc2626]/20 mb-3 tracking-tighter">
              02
            </div>
            <h3 className="text-[20px] font-bold text-[#191c1e]">Operate</h3>
            <p className="text-[14px] text-[#565e74] mt-2 leading-[22px]">
              Kelola penandatanganan dokumen legal digital, survei form, seating arrangement, dan live support ticketing.
            </p>
          </div>

          {/* Step 03 */}
          <div className="bg-white p-8 rounded-xl border border-[#e2e8f0] shadow-xs relative hover:shadow-md transition-all">
            <div className="text-[36px] font-extrabold text-[#dc2626]/20 mb-3 tracking-tighter">
              03
            </div>
            <h3 className="text-[20px] font-bold text-[#191c1e]">Engage &amp; Analyze</h3>
            <p className="text-[14px] text-[#565e74] mt-2 leading-[22px]">
              Jalankan polling voting langsung di panggung, monitor response audience, dan unduh data komprehensif pasca event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
