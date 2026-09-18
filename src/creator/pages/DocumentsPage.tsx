/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileSignature, Download, CheckCircle2, Eraser, X, BookOpen, UserPlus, Clock } from 'lucide-react';
import { useAppStore, SharedDocument } from '../../store/AppStore';
import { EOAccount } from '../../store/AppStore';
import { Tabs, StatusBadge, SectionCard, EmptyState } from '../components/ui';

const TABS = [
  { id: 'signature', label: 'E-Signature Hub' },
  { id: 'history', label: 'Riwayat Dokumen' },
  { id: 'tutorial', label: 'Tutorial Pengisian' },
  { id: 'verification', label: 'Verifikasi EO Baru' },
];

const TUTORIAL_STEPS = [
  { title: 'Siapkan Dokumen Legal', body: 'Kumpulkan data organisasi: akta, NPWP, dan rekening pencairan sebelum mulai.' },
  { title: 'Isi Data Event', body: 'Lengkapi nama event, tanggal, dan venue pada form MOU yang tersedia.' },
  { title: 'Periksa Draf MOU', body: 'Baca ulang draf yang digenerate sistem sebelum lanjut ke tanda tangan.' },
  { title: 'Tanda Tangan Digital', body: 'Bubuhkan tanda tangan lewat kanvas digital — dokumen langsung masuk antrian approval.' },
];

const SignatureModal: React.FC<{ doc: SharedDocument; onClose: () => void; onSign: () => void }> = ({
  doc,
  onClose,
  onSign,
}) => {
  const [hasDrawn, setHasDrawn] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[15px] font-bold text-[#191c1e]">Tanda Tangani Dokumen</h3>
          <button onClick={onClose} className="text-[#94a3b8] hover:text-[#191c1e] cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <p className="text-[12.5px] text-[#565e74] mb-4">{doc.name}</p>

        <button
          onClick={() => setHasDrawn(true)}
          className={`w-full aspect-[3/1] rounded-xl border-2 border-dashed flex items-center justify-center text-[13px] font-medium transition-colors cursor-pointer ${
            hasDrawn
              ? 'border-[#dc2626] text-[#dc2626] bg-[#fef2f2]'
              : 'border-[#e2e8f0] text-[#94a3b8] hover:border-[#dc2626]'
          }`}
        >
          {hasDrawn ? (
            <span className="italic text-[19px]" style={{ fontFamily: 'cursive' }}>
              {doc.name.split(' ')[0]}, EO
            </span>
          ) : (
            'Ketuk untuk menandatangani (simulasi kanvas)'
          )}
        </button>

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setHasDrawn(false)}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#565e74] hover:text-[#191c1e] px-3 py-2 rounded-lg hover:bg-[#f2f4f6] cursor-pointer"
          >
            <Eraser size={13} />
            Hapus
          </button>
          <button
            onClick={onSign}
            disabled={!hasDrawn}
            className={`ml-auto inline-flex items-center gap-2 text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all ${
              hasDrawn
                ? 'bg-[#dc2626] text-white hover:bg-[#b91c1c] cursor-pointer'
                : 'bg-[#e8e6f0] text-[#94a3b8] cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={15} />
            Konfirmasi Tanda Tangan
          </button>
        </div>
      </div>
    </div>
  );
};

interface DocumentsPageProps {
  account: EOAccount;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({ account }) => {
  const [active, setActive] = useState('signature');
  const { documents, setDocuments, logActivity } = useAppStore();
  const docs = documents.filter((d) => d.eoId === account.id);
  const setDocs = setDocuments;
  const [signingDoc, setSigningDoc] = useState<SharedDocument | null>(null);

  const handleSign = () => {
    if (!signingDoc) return;
    setDocs((prev) =>
      prev.map((d) =>
        d.id === signingDoc.id
          ? { ...d, status: 'signed', signedAt: new Date().toISOString().slice(0, 10), signedIp: '127.0.0.1 (simulasi)' }
          : d
      )
    );
    logActivity(`${account.orgName} menandatangani dokumen "${signingDoc.name}"`);
    setSigningDoc(null);
  };

  const pending = docs.filter((d) => d.status === 'pending');
  const done = docs.filter((d) => d.status !== 'pending');

  return (
    <div>
      <Tabs tabs={TABS} active={active} onChange={setActive} />

      {active === 'signature' && (
        <>
          <SectionCard
            title="Menunggu Tanda Tangan"
            description="Dokumen yang butuh tanda tangan Anda sebelum masuk antrian approval Superadmin."
          >
            {pending.length === 0 ? (
              <EmptyState message="Tidak ada dokumen yang menunggu tanda tangan." />
            ) : (
              <div className="space-y-2.5">
                {pending.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2e8f0] p-3.5"
                  >
                    <span className="w-9 h-9 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center shrink-0">
                      <FileSignature size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-semibold text-[#191c1e] truncate">{doc.name}</div>
                      <div className="text-[11.5px] text-[#94a3b8]">{doc.type} • diperbarui {doc.updatedAt}</div>
                    </div>
                    <StatusBadge status={doc.status} />
                    <button
                      onClick={() => setSigningDoc(doc)}
                      className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer shrink-0"
                    >
                      <FileSignature size={13} />
                      Tanda Tangani
                    </button>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Semua Dokumen" description="Seluruh dokumen legal terkait kerjasama EO-YourTix.">
            <div className="space-y-2">
              {done.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                  <span className="w-8 h-8 rounded-lg bg-[#f8fafc] text-[#565e74] flex items-center justify-center shrink-0">
                    <FileSignature size={14} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-[#191c1e] truncate">{doc.name}</div>
                    <div className="text-[11.5px] text-[#94a3b8]">{doc.type}</div>
                  </div>
                  <StatusBadge status={doc.status} />
                </div>
              ))}
            </div>
          </SectionCard>
        </>
      )}

      {active === 'history' && (
        <SectionCard
          title="Riwayat Dokumen"
          description="Arsip dokumen yang sudah selesai ditandatangani, lengkap dengan jejak audit."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                  <th className="pb-2.5 pr-4">Dokumen</th>
                  <th className="pb-2.5 pr-4">Tanggal TTD</th>
                  <th className="pb-2.5 pr-4">IP Device</th>
                  <th className="pb-2.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {docs
                  .filter((d) => d.status === 'signed')
                  .map((doc) => (
                    <tr key={doc.id} className="border-b border-[#f1f5f9]">
                      <td className="py-3 pr-4 font-semibold text-[#191c1e]">{doc.name}</td>
                      <td className="py-3 pr-4 text-[#565e74]">{doc.signedAt}</td>
                      <td className="py-3 pr-4 text-[#94a3b8] font-mono text-[12px]">{doc.signedIp}</td>
                      <td className="py-3 pr-4">
                        <button className="inline-flex items-center gap-1.5 text-[#dc2626] font-semibold hover:underline cursor-pointer">
                          <Download size={13} />
                          Unduh PDF
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}

      {active === 'tutorial' && (
        <SectionCard title="Tutorial Pengisian Data" description="Ikuti empat langkah ini sebelum mengajukan MOU baru.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {TUTORIAL_STEPS.map((step, i) => (
              <div key={i} className="rounded-xl border border-[#ece9f5] p-4">
                <span className="w-8 h-8 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center font-bold text-[13px] mb-3">
                  {i + 1}
                </span>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#191c1e] mb-1.5">
                  <BookOpen size={13} className="text-[#dc2626]" />
                  {step.title}
                </div>
                <p className="text-[12px] text-[#565e74] leading-[18px]">{step.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {active === 'verification' && (
        <SectionCard
          title="Form Verifikasi EO Baru"
          description="Lengkapi data ini untuk proses onboarding organisasi Anda."
        >
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nama Organisasi</label>
              <input className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="cth. Kolektif Nada Kampus" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nomor KTP Penanggung Jawab</label>
              <input className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="16 digit" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">NPWP</label>
              <input className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="cth. 01.234.567.8-901.000" />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#191c1e] mb-1.5 block">Nomor Rekening Pencairan</label>
              <input className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" placeholder="Bank & nomor rekening" />
            </div>
            <div className="sm:col-span-2 flex items-center justify-between rounded-xl bg-[#fbfaff] border border-[#ece9f5] px-4 py-3 text-[12.5px] text-[#565e74]">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                Setelah submit, status akan tampil di "Tracking Status Pengajuan MOU" di bawah.
              </span>
              <button className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-4 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer shrink-0">
                <UserPlus size={13} />
                Ajukan Verifikasi
              </button>
            </div>
          </form>

          <div className="mt-5 pt-5 border-t border-[#f1f5f9]">
            <h3 className="text-[13px] font-bold text-[#191c1e] mb-3">Tracking Status Pengajuan MOU</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {['Diajukan', 'Ditinjau', 'Disetujui'].map((step, i) => (
                <React.Fragment key={step}>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold ${
                      i === 0 ? 'bg-[#fffbeb] text-[#b45309]' : 'bg-[#f1f5f9] text-[#94a3b8]'
                    }`}
                  >
                    {step}
                  </span>
                  {i < 2 && <span className="text-[#cbd5e1]">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </SectionCard>
      )}

      {signingDoc && (
        <SignatureModal doc={signingDoc} onClose={() => setSigningDoc(null)} onSign={handleSign} />
      )}
    </div>
  );
};
