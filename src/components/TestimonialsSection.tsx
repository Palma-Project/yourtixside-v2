/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppStore } from '../store/AppStore';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useAppStore();
  const approved = testimonials
    .filter((t) => t.status === 'approved')
    .sort((a, b) => Number(b.pinned) - Number(a.pinned))
    .slice(0, 6);

  if (approved.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[#f7f9fb] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">TESTIMONIALS</div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Dipercaya oleh Event Creator & Customer
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Pengalaman nyata dari pengguna platform ini — dimoderasi oleh tim Superadmin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approved.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="text-[#f59e0b] text-[16px] tracking-widest mb-3 select-none">★★★★★</div>
                <p className="text-[14px] text-[#191c1e] italic leading-[22px]">&ldquo;{t.content}&rdquo;</p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                <div className="font-bold text-[#191c1e] text-[14px]">{t.name}</div>
                <div className="text-[#565e74] text-[13px]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
