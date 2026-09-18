/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Plus, Trash2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import { Banner } from '../../store/AppStore';
import { SectionCard } from '../../creator/components/ui';

interface BannerManagerProps {
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const BannerManager: React.FC<BannerManagerProps> = ({ banners, setBanners }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sorted = [...banners].sort((a, b) => a.order - b.order);

  const handleMultiUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const maxOrder = banners.reduce((m, b) => Math.max(m, b.order), -1);
    const newBanners: Banner[] = [];
    for (let i = 0; i < files.length; i++) {
      const dataUrl = await readAsDataUrl(files[i]);
      newBanners.push({
        id: `ban${Date.now()}-${i}`,
        imageUrl: dataUrl,
        title: files[i].name.replace(/\.[^.]+$/, ''),
        subtitle: '',
        link: '',
        order: maxOrder + 1 + i,
      });
    }
    setBanners((prev) => [...prev, ...newBanners]);
  };

  const update = <K extends keyof Banner>(id: string, key: K, value: Banner[K]) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)));
  };

  const remove = (id: string) => setBanners((prev) => prev.filter((b) => b.id !== id));

  const move = (id: string, dir: -1 | 1) => {
    const idx = sorted.findIndex((b) => b.id === id);
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const a = sorted[idx];
    const b = sorted[swapIdx];
    setBanners((prev) => prev.map((x) => (x.id === a.id ? { ...x, order: b.order } : x.id === b.id ? { ...x, order: a.order } : x)));
  };

  const addVideoBanner = () => {
    const maxOrder = banners.reduce((m, b) => Math.max(m, b.order), -1);
    setBanners((prev) => [
      ...prev,
      { id: `ban${Date.now()}`, videoUrl: '', title: 'Banner Video Baru', subtitle: '', link: '', order: maxOrder + 1 },
    ]);
  };

  return (
    <SectionCard
      title="Banner Utama Landing Page"
      description="Carousel otomatis jalan tiap 15 detik. Bisa gambar (upload banyak sekaligus) atau video (via URL), plus hyperlink opsional."
      action={
        <div className="flex items-center gap-2">
          <button onClick={() => fileInputRef.current?.click()} className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
            <Upload size={13} />
            Upload Gambar (Multi)
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleMultiUpload(e.target.files)} />
          <button onClick={addVideoBanner} className="inline-flex items-center gap-1.5 border border-[#e2e8f0] text-[#191c1e] text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer">
            <Plus size={13} />
            Banner Video
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {sorted.map((b, i) => (
          <div key={b.id} className="flex flex-col sm:flex-row gap-3 rounded-xl border border-[#e2e8f0] p-3.5">
            <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden bg-[#f1f5f9] shrink-0">
              {b.videoUrl ? (
                <video src={b.videoUrl} muted className="w-full h-full object-cover" />
              ) : (
                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <input value={b.title} onChange={(e) => update(b.id, 'title', e.target.value)} placeholder="Judul banner" className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px] font-semibold" />
              <input value={b.subtitle || ''} onChange={(e) => update(b.id, 'subtitle', e.target.value)} placeholder="Subjudul (opsional)" className="w-full px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[12.5px]" />
              <div className="flex flex-col sm:flex-row gap-2">
                {b.videoUrl !== undefined && (
                  <input value={b.videoUrl} onChange={(e) => update(b.id, 'videoUrl', e.target.value)} placeholder="URL video (mp4)" className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[12px] font-mono" />
                )}
                <input value={b.link || ''} onChange={(e) => update(b.id, 'link', e.target.value)} placeholder="Hyperlink (cth. /vote/id atau https://...)" className="flex-1 px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[12px] font-mono" />
              </div>
            </div>
            <div className="flex sm:flex-col items-center gap-1.5 shrink-0">
              <button onClick={() => move(b.id, -1)} disabled={i === 0} className="text-[#94a3b8] hover:text-[#191c1e] disabled:opacity-30 cursor-pointer"><ArrowUp size={15} /></button>
              <button onClick={() => move(b.id, 1)} disabled={i === sorted.length - 1} className="text-[#94a3b8] hover:text-[#191c1e] disabled:opacity-30 cursor-pointer"><ArrowDown size={15} /></button>
              <button onClick={() => remove(b.id)} className="text-[#94a3b8] hover:text-[#b3220f] cursor-pointer"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="text-[13px] text-[#94a3b8] text-center py-6">Belum ada banner. Upload gambar atau tambah banner video.</p>}
      </div>
    </SectionCard>
  );
};
