/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Pin, CheckCircle2, XCircle, FileImage, Download } from 'lucide-react';
import { faqItems, blogPosts, testimonials as initialTestimonials, Testimonial } from '../../data/superadminData';
import { brandAssets } from '../../data/creatorData';
import { Tabs, SectionCard, StatusBadge } from '../../creator/components/ui';

const TOP_TABS = [
  { id: 'content', label: 'Konten' },
  { id: 'testimonials', label: 'Testimoni & Review' },
];

const CONTENT_SUBTABS = [
  { id: 'faq', label: 'FAQ' },
  { id: 'blog', label: 'Blog/Tips' },
  { id: 'tutorial', label: 'Tutorial & Panduan' },
  { id: 'assets', label: 'Aset Unduhan' },
];

export const ContentPage: React.FC = () => {
  const [active, setActive] = useState('content');
  const [contentTab, setContentTab] = useState('faq');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  const reviewTestimonial = (id: string, status: 'approved' | 'rejected') => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const togglePin = (id: string) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t)));
  };

  return (
    <div>
      <Tabs tabs={TOP_TABS} active={active} onChange={setActive} />

      {active === 'content' && (
        <>
          <Tabs tabs={CONTENT_SUBTABS} active={contentTab} onChange={setContentTab} />

          {contentTab === 'faq' && (
            <SectionCard
              title="FAQ"
              description="Pertanyaan yang tampil di Pusat Bantuan portal Customer."
              action={
                <button className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Plus size={13} />
                  Tambah FAQ
                </button>
              }
            >
              <div className="space-y-2">
                {faqItems.map((f) => (
                  <div key={f.id} className="rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-[#191c1e]">{f.question}</span>
                      <span className="text-[10.5px] font-semibold text-[#94a3b8] bg-[#f1f5f9] px-2 py-0.5 rounded-md shrink-0">
                        {f.category}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#565e74] leading-[18px]">{f.answer}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {contentTab === 'blog' && (
            <SectionCard
              title="Blog / Tips"
              description="Artikel yang tampil di halaman blog publik."
              action={
                <button className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Plus size={13} />
                  Tulis Artikel
                </button>
              }
            >
              <div className="space-y-2">
                {blogPosts.map((b) => (
                  <div key={b.id} className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-[#191c1e] truncate">{b.title}</div>
                      {b.publishedAt && <div className="text-[11.5px] text-[#94a3b8]">Terbit {b.publishedAt}</div>}
                    </div>
                    <StatusBadge status={b.status === 'published' ? 'signed' : 'draf'} />
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {contentTab === 'tutorial' && (
            <SectionCard title="Tutorial & Panduan" description="Panduan yang tampil di dashboard EO dan portal Customer.">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Panduan Scan Tiket di Venue', 'Panduan Pajak & Invoice', 'Panduan Disaster/Contingency', 'Verifikasi Tiket Asli (Customer)'].map(
                  (title) => (
                    <div key={title} className="rounded-xl border border-[#f1f5f9] px-3.5 py-3 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#191c1e]">{title}</span>
                      <button className="text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer shrink-0">
                        Edit
                      </button>
                    </div>
                  )
                )}
              </div>
            </SectionCard>
          )}

          {contentTab === 'assets' && (
            <SectionCard
              title="Aset Unduhan"
              description="Aset resmi yang tersedia di Pusat Unduhan Aset milik EO."
              action={
                <button className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Plus size={13} />
                  Upload Aset
                </button>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {brandAssets.map((asset) => (
                  <div key={asset.id} className="rounded-xl border border-[#e2e8f0] p-3.5 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                      <FileImage size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-[#191c1e] truncate">{asset.name}</div>
                      <div className="text-[11px] text-[#94a3b8]">{asset.fileType} • {asset.size}</div>
                    </div>
                    <button className="text-[#dc2626] hover:text-[#b91c1c] shrink-0 cursor-pointer">
                      <Download size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </>
      )}

      {active === 'testimonials' && (
        <SectionCard title="Testimoni & Review" description="Moderasi testimoni sebelum tayang ke publik.">
          <div className="space-y-2.5">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-xl border border-[#e2e8f0] p-3.5">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-[13px] font-bold text-[#191c1e]">{t.name}</span>
                    <span className="text-[11.5px] text-[#94a3b8] ml-1.5">• {t.role}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {t.pinned && <Pin size={13} className="text-[#dc2626]" />}
                    <StatusBadge status={t.status} />
                  </div>
                </div>
                <p className="text-[12.5px] text-[#565e74] italic leading-[19px] mb-2.5">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  {t.status === 'pending' && (
                    <>
                      <button
                        onClick={() => reviewTestimonial(t.id, 'approved')}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#059669] hover:underline cursor-pointer"
                      >
                        <CheckCircle2 size={13} />
                        Approve
                      </button>
                      <button
                        onClick={() => reviewTestimonial(t.id, 'rejected')}
                        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#b3220f] hover:underline cursor-pointer"
                      >
                        <XCircle size={13} />
                        Reject
                      </button>
                    </>
                  )}
                  {t.status === 'approved' && (
                    <button
                      onClick={() => togglePin(t.id)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] cursor-pointer"
                    >
                      <Pin size={13} />
                      {t.pinned ? 'Lepas Pin' : 'Pin ke Landing'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
};
