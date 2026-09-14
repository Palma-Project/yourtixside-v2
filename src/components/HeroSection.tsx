import React from 'react';
import { RoleType } from '../types';

interface HeroSectionProps {
  onOpenRole: (role: RoleType) => void;
  onOpenSupport: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenRole, onOpenSupport }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-[#f7f9fb] to-[#f7f9fb] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.18] font-extrabold text-[#191c1e] tracking-tight">
            “Semua kebutuhan operasional event,{' '}
            <span className="text-[#dc2626]">dalam satu tempat.</span>”
          </h1>

          <p className="text-[16px] sm:text-[17px] leading-[26px] text-[#565e74] max-w-2xl">
            yourtixside membantu Event Creator mengelola event, Customer mendapatkan bantuan, dan Operations mengontrol seluruh aktivitas platform.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onOpenRole('creator')}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] hover:bg-[#b91c1c] shadow-sm active:scale-[0.98] transition-all gap-2 cursor-pointer"
            >
              <span>Masuk sebagai Event Creator</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

            <button
              onClick={onOpenSupport}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#191c1e] border border-[#e2e8f0] font-semibold text-[14px] hover:bg-[#f2f4f6] active:scale-[0.98] transition-all cursor-pointer shadow-2xs"
            >
              Saya butuh bantuan
            </button>
          </div>
        </div>

        {/* Right Visual: Clean SaaS Dashboard Mockup */}
        <div className="lg:col-span-5">
          <div className="relative bg-white rounded-2xl border border-[#e2e8f0] shadow-xl p-5 sm:p-6 transition-all hover:shadow-2xl">
            {/* Window chrome header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              </div>
              <div className="h-5 w-36 bg-[#f2f4f6] rounded-md border border-[#e2e8f0]"></div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
              </div>
            </div>

            {/* Visual Metric Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">bar_chart</span>
                  </div>
                  <div className="h-3.5 w-10 bg-[#e2e8f0] rounded-full"></div>
                </div>
                <div className="h-5 w-20 bg-[#191c1e]/10 rounded mb-2"></div>
                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#dc2626] h-full rounded-full w-3/4"></div>
                </div>
              </div>

              <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-[#e2e8f0]">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-6 h-6 rounded-lg bg-[#ecfdf5] text-[#059669] flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">show_chart</span>
                  </div>
                  <div className="h-3.5 w-10 bg-[#e2e8f0] rounded-full"></div>
                </div>
                <div className="h-5 w-16 bg-[#191c1e]/10 rounded mb-2"></div>
                <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#059669] h-full rounded-full w-4/5"></div>
                </div>
              </div>
            </div>

            {/* Visual Chart Bars Graphic */}
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0] mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-28 bg-[#191c1e]/15 rounded"></div>
                <div className="h-3 w-14 bg-[#191c1e]/10 rounded"></div>
              </div>
              <div className="flex items-end justify-between gap-2 h-20 pt-2 px-1">
                {[40, 65, 30, 85, 55, 90, 70, 45, 95, 60].map((h, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-md transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 5 || i === 8 ? '#dc2626' : '#cbd5e1',
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Visual Table / List Rows Preview */}
            <div className="space-y-2 border-t border-[#e2e8f0] pt-3">
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#f8fafc] border border-[#f1f5f9]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                    <div
                      className="h-3 rounded bg-[#cbd5e1]"
                      style={{ width: row === 1 ? '110px' : row === 2 ? '135px' : '95px' }}
                    ></div>
                  </div>
                  <div className="h-3 w-12 rounded bg-[#e2e8f0]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
