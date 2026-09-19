/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Copy, Link2, Upload } from 'lucide-react';
import { useAppStore, EOAccount, Minisite, MinisiteLink } from '../../store/AppStore';
import { readAsDataUrl } from '../../lib/fileToDataUrl';
import { SectionCard } from '../components/ui';

interface MinisitePageProps {
  account: EOAccount;
}

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '');
}

export const MinisitePage: React.FC<MinisitePageProps> = ({ account }) => {
  const { minisites, setMinisites } = useAppStore();
  const existing = minisites.find((m) => m.eoId === account.id);

  const [slug, setSlug] = useState(existing?.slug ?? slugify(account.orgName));
  const [title, setTitle] = useState(existing?.title ?? account.orgName);
  const [bio, setBio] = useState(existing?.bio ?? '');
  const [avatar, setAvatar] = useState(existing?.avatar ?? '');
  const [coverImage, setCoverImage] = useState(existing?.coverImage ?? '');
  const [links, setLinks] = useState<MinisiteLink[]>(existing?.links ?? []);
  const [copied, setCopied] = useState(false);

  const addLink = () => setLinks((prev) => [...prev, { id: `l${Date.now()}`, label: '', url: '' }]);
  const updateLink = (id: string, field: 'label' | 'url', value: string) =>
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  const removeLink = (id: string) => setLinks((prev) => prev.filter((l) => l.id !== id));

  const handleSave = () => {
    const cleanSlug = slugify(slug);
    const data: Minisite = {
      id: existing?.id ?? `ms${Date.now()}`,
      eoId: account.id,
      slug: cleanSlug,
      title,
      bio,
      avatar,
      coverImage,
      links: links.filter((l) => l.label.trim() && l.url.trim()),
    };
    if (existing) {
      setMinisites((prev) => prev.map((m) => (m.id === existing.id ? data : m)));
    } else {
      setMinisites((prev) => [...prev, data]);
    }
    setSlug(cleanSlug);
  };

  const publicUrl = `yourtix.web.id/m/${slugify(slug)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${publicUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div>
      <SectionCard
        title="Landing Page / Minisite"
        description="Halaman ringkas ala Linktree — taruh link ini di bio Instagram Anda."
        action={
          <div className="flex items-center gap-2">
            <button onClick={copyLink} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-1.5 rounded-lg hover:bg-[#f2f4f6] cursor-pointer">
              <Copy size={12} />
              {copied ? 'Tersalin!' : publicUrl}
            </button>
            <a href={`/m/${slugify(slug)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer">
              <ExternalLink size={12} />
              Preview
            </a>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div>
            <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Link Slug</label>
            <div className="flex items-center gap-1 text-[13.5px]">
              <span className="text-[#94a3b8] shrink-0">yourtix.web.id/m/</span>
              <input value={slug} onChange={(e) => setSlug(e.target.value)} className="flex-1 px-3 py-2 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none" />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Judul Ditampilkan</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Bio Singkat</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" />
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Foto Profil</label>
            <label className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-dashed border-[#e2e8f0] cursor-pointer hover:border-[#dc2626] transition-colors">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <span className="w-10 h-10 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8]">
                  <Upload size={14} />
                </span>
              )}
              <span className="text-[12.5px] text-[#565e74]">{avatar ? 'Ganti foto' : 'Upload foto'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setAvatar(await readAsDataUrl(f)); }} />
            </label>
          </div>
          <div>
            <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Gambar Cover</label>
            <label className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-dashed border-[#e2e8f0] cursor-pointer hover:border-[#dc2626] transition-colors">
              {coverImage ? (
                <img src={coverImage} alt="Cover" className="w-10 h-10 rounded-lg object-cover" />
              ) : (
                <span className="w-10 h-10 rounded-lg bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8]">
                  <Upload size={14} />
                </span>
              )}
              <span className="text-[12.5px] text-[#565e74]">{coverImage ? 'Ganti cover' : 'Upload cover'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => { const f = e.target.files?.[0]; if (f) setCoverImage(await readAsDataUrl(f)); }} />
            </label>
          </div>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-[12px] font-semibold text-[#191c1e]">Daftar Link</label>
            <button onClick={addLink} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer">
              <Plus size={13} />
              Tambah Link
            </button>
          </div>
          <div className="space-y-2.5">
            {links.map((l) => (
              <div key={l.id} className="flex items-center gap-2.5 rounded-xl border border-[#e2e8f0] p-3">
                <span className="w-9 h-9 rounded-lg bg-[#f1f5f9] flex items-center justify-center shrink-0 text-[#94a3b8]">
                  <Link2 size={15} />
                </span>
                <input value={l.label} onChange={(e) => updateLink(l.id, 'label', e.target.value)} placeholder="Judul link (cth. Tiket Summer Fest)" className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]" />
                <input value={l.url} onChange={(e) => updateLink(l.id, 'url', e.target.value)} placeholder="URL tujuan" className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]" />
                <button onClick={() => removeLink(l.id)} className="text-[#94a3b8] hover:text-[#b3220f] shrink-0 cursor-pointer">
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
            {links.length === 0 && <p className="text-[12.5px] text-[#94a3b8] text-center py-4">Belum ada link.</p>}
          </div>
        </div>

        <button onClick={handleSave} className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
          Simpan Minisite
        </button>
      </SectionCard>
    </div>
  );
};
