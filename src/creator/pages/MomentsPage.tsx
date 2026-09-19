/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, QrCode, Link2, Plus, Download, X, Mail } from 'lucide-react';
import { momentSessions, momentPhotos, MomentSession } from '../../data/creatorData';
import { Tabs, SectionCard, EmptyState } from '../components/ui';

const TABS = [
  { id: 'setup', label: 'Setup Sesi' },
  { id: 'gallery', label: 'Galeri Momen' },
];

const ShareModal: React.FC<{ session: MomentSession; onClose: () => void }> = ({ session, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-center">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#191c1e]">Link Sesi Foto</h3>
        <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
          <X size={18} />
        </button>
      </div>
      <div className="w-40 h-40 mx-auto bg-[#f1f5f9] rounded-xl flex items-center justify-center mb-3.5">
        <QrCode size={72} className="text-[#191c1e]" />
      </div>
      <p className="text-[13px] font-semibold text-[#191c1e] mb-1">{session.name}</p>
      <p className="text-[11.5px] text-[#94a3b8] font-mono truncate mb-4">
        yourtix.web.id/moment/{session.id}
      </p>
      <button onClick={async () => {
        try {
          await navigator.clipboard.writeText(`https://yourtix.web.id/moment/${session.id}`);
          window.alert('Link disalin!');
        } catch { /* clipboard unavailable */ }
      }} className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
        <Link2 size={14} />
        Salin Link
      </button>
    </div>
  </div>
);

export const MomentsPage: React.FC = () => {
  const [active, setActive] = useState('setup');
  const [sessions, setSessions] = useState<MomentSession[]>(momentSessions);
  const [sharingSession, setSharingSession] = useState<MomentSession | null>(null);
  const [galleryFilter, setGalleryFilter] = useState('all');

  const [name, setName] = useState('');
  const [relatedEvent, setRelatedEvent] = useState('');
  const [rateLimit, setRateLimit] = useState(5);

  const handleCreate = () => {
    if (!name.trim()) return;
    setSessions((prev) => [
      { id: `ms${prev.length + 1}`, name, relatedEvent: relatedEvent || '-', rateLimitPerEmail: rateLimit, photosIn: 0 },
      ...prev,
    ]);
    setName('');
    setRelatedEvent('');
    setRateLimit(5);
  };

  const filteredPhotos =
    galleryFilter === 'all' ? momentPhotos : momentPhotos.filter((p) => p.sessionId === galleryFilter);

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'setup' && (
        <>
          <SectionCard
            title="Setup Sesi Foto Baru"
            description="Buat 'fotobooth digital' agar pengunjung bisa foto sendiri lewat HP mereka di lokasi."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-1">
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Sesi</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                  placeholder="cth. Booth Foto Panggung Utama"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Event Terkait</label>
                <input
                  value={relatedEvent}
                  onChange={(e) => setRelatedEvent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                  placeholder="Pilih event Anda"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">
                  Rate Limit (foto/email)
                </label>
                <input
                  type="number"
                  min={1}
                  value={rateLimit}
                  onChange={(e) => setRateLimit(Number(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
                />
              </div>
            </div>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13.5px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer"
            >
              <Plus size={16} />
              Buat Sesi & Generate Link
            </button>
          </SectionCard>

          <SectionCard title="Sesi Aktif">
            {sessions.length === 0 ? (
              <EmptyState message="Belum ada sesi foto." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {sessions.map((s) => (
                  <div key={s.id} className="rounded-xl border border-[#e2e8f0] p-4">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-9 h-9 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                        <Camera size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13.5px] font-bold text-[#191c1e] truncate">{s.name}</div>
                        <div className="text-[11.5px] text-[#94a3b8]">{s.relatedEvent}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-[#565e74] mb-3">
                      <span>{s.photosIn.toLocaleString('id-ID')} foto masuk</span>
                      <span>Maks {s.rateLimitPerEmail}/email</span>
                    </div>
                    <button
                      onClick={() => setSharingSession(s)}
                      className="w-full inline-flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-[#565e74] hover:text-[#191c1e] px-2.5 py-2 rounded-lg hover:bg-[#f2f4f6] cursor-pointer border border-[#e2e8f0]"
                    >
                      <QrCode size={13} />
                      Lihat QR & Link
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </>
      )}

      {active === 'gallery' && (
        <SectionCard title="Galeri Momen" description="Foto yang masuk dari pengunjung di lokasi.">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setGalleryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer ${
                galleryFilter === 'all' ? 'bg-[#dc2626] text-white' : 'bg-[#f2f4f6] text-[#565e74]'
              }`}
            >
              Semua Sesi
            </button>
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setGalleryFilter(s.id)}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer ${
                  galleryFilter === s.id ? 'bg-[#dc2626] text-white' : 'bg-[#f2f4f6] text-[#565e74]'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          {filteredPhotos.length === 0 ? (
            <EmptyState message="Belum ada foto masuk untuk sesi ini." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {filteredPhotos.map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-[#e2e8f0]">
                  <div className="relative aspect-square bg-[#f1f5f9]">
                    <img src={p.photo} alt={p.caption} className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-md ${
                        p.linkedAccount ? 'bg-[#ecfdf5] text-[#059669]' : 'bg-white/90 text-[#94a3b8]'
                      }`}
                    >
                      {p.linkedAccount ? 'Tersambung akun' : 'Tanpa akun'}
                    </span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11.5px] text-[#565e74] truncate">{p.caption}</p>
                    {p.submitterEmail && (
                      <p className="text-[10.5px] text-[#94a3b8] flex items-center gap-1 mt-1 truncate">
                        <Mail size={10} />
                        {p.submitterEmail}
                      </p>
                    )}
                    <button onClick={() => window.alert(`Mengunduh foto: ${p.caption}... (simulasi)`)} className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#dc2626] hover:underline cursor-pointer">
                      <Download size={11} />
                      Unduh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {sharingSession && <ShareModal session={sharingSession} onClose={() => setSharingSession(null)} />}
    </div>
  );
};
