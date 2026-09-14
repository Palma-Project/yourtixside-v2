import React from 'react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        '"Form dan dokumen event jadi jauh lebih gampang dikelola tanpa tercecer di spreadsheet."',
      author: 'Rian Pratama',
      role: 'Event Director, Jakarta Soundfest',
    },
    {
      quote:
        '"Fitur voting khusus ticket holder sukses naikin engagement konser kami secara masif."',
      author: 'Sarah Wijaya',
      role: 'Head of Operations, Indie Stage Fest',
    },
    {
      quote:
        '"SLA live chat di bawah 2 menit menyelamatkan customer care kami saat gate open."',
      author: 'Dimas Arya',
      role: 'Superadmin & Ops Lead, Mega Arena',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#f7f9fb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            TESTIMONIALS
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Dipercaya oleh Event Creator terkemuka
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Pengalaman nyata tim promotor dan manajer operasional festival skala nasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-[#e2e8f0] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="text-[#f59e0b] text-[16px] tracking-widest mb-3 select-none">
                  ★★★★★
                </div>
                <p className="text-[14px] text-[#191c1e] italic leading-[22px]">
                  {t.quote}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                <div className="font-bold text-[#191c1e] text-[14px]">{t.author}</div>
                <div className="text-[#565e74] text-[13px]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
