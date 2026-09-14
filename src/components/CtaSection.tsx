import React from 'react';
import { RoleType } from '../types';

interface CtaSectionProps {
  onOpenRole: (role: RoleType) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenRole }) => {
  return (
    <section className="py-20 bg-[#2d3133] text-[#eff1f3] relative overflow-hidden">
      {/* Ambient crimson glow */}
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#dc2626]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
        <h2 className="text-[28px] sm:text-[36px] font-extrabold text-white tracking-tight leading-[1.2]">
          Siap mengelola event dengan lebih mudah?
        </h2>
        <p className="text-[16px] text-[#bec6e0] max-w-2xl mx-auto leading-[26px]">
          Masuk ke portal yang sesuai dengan kebutuhan kamu untuk mulai berkolaborasi di dalam infrastruktur yourtixside.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenRole('creator')}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[14px] hover:bg-[#b91c1c] shadow-sm active:scale-[0.98] transition-all gap-2 cursor-pointer"
          >
            <span>Event Creator</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>

          <button
            onClick={() => onOpenRole('customer')}
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-transparent border border-[#bec6e0]/60 text-white font-semibold text-[14px] hover:bg-white/10 active:scale-[0.98] transition-all cursor-pointer"
          >
            Customer Support &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
