/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export type LegalPageId = 'privacy' | 'terms' | 'security' | 'compliance';

interface LegalContent {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

const CONTENT: Record<LegalPageId, LegalContent> = {
  privacy: {
    title: 'Kebijakan Privasi',
    updated: 'Terakhir diperbarui: 1 September 2026',
    sections: [
      { heading: '1. Data yang Kami Kumpulkan', body: 'Kami mengumpulkan data yang Anda berikan saat membuat akun, membeli tiket, mengisi form pendaftaran, atau berpartisipasi dalam voting — antara lain nama, email, nomor telepon, dan riwayat transaksi.' },
      { heading: '2. Penggunaan Data', body: 'Data digunakan untuk memproses transaksi, verifikasi identitas Event Creator, mengelola sistem voting satu-akun-satu-suara, serta memberikan dukungan pelanggan yang relevan.' },
      { heading: '3. Enkripsi & Penyimpanan', body: 'Seluruh data sensitif (dokumen legal, informasi rekening) dienkripsi saat disimpan maupun dikirim, mengikuti standar industri untuk platform tiket dan event.' },
      { heading: '4. Berbagi Data', body: 'Kami tidak menjual data pribadi ke pihak ketiga. Data hanya dibagikan ke Event Creator terkait sejauh diperlukan untuk keperluan operasional event yang Anda ikuti.' },
      { heading: '5. Hak Anda', body: 'Anda berhak mengunduh salinan data pribadi Anda dan meminta penghapusan akun kapan saja melalui halaman Akun Saya.' },
    ],
  },
  terms: {
    title: 'Syarat & Ketentuan',
    updated: 'Terakhir diperbarui: 1 September 2026',
    sections: [
      { heading: '1. Penggunaan Layanan', body: 'Dengan menggunakan yourtixside, Anda setuju untuk memberikan informasi yang akurat dan bertanggung jawab atas aktivitas yang dilakukan melalui akun Anda.' },
      { heading: '2. Kewajiban Event Creator', body: 'Event Creator wajib melengkapi verifikasi identitas (KTP, NPWP, rekening pencairan) sebelum akun diaktifkan penuh oleh Superadmin, dan bertanggung jawab atas keakuratan informasi event yang dipublikasikan.' },
      { heading: '3. Kebijakan Voting', body: 'Setiap sesi voting tunduk pada prinsip satu akun terverifikasi sama dengan satu suara sah. Kecurangan atau manipulasi suara dapat mengakibatkan pencabutan hak vote atau penangguhan akun.' },
      { heading: '4. Pembatalan & Refund', body: 'Kebijakan refund mengikuti ketentuan masing-masing event yang ditetapkan oleh Event Creator, dan diproses melalui tim Superadmin sesuai SLA yang berlaku.' },
      { heading: '5. Perubahan Ketentuan', body: 'Kami dapat memperbarui syarat dan ketentuan ini sewaktu-waktu; perubahan signifikan akan diinformasikan melalui email atau notifikasi platform.' },
    ],
  },
  security: {
    title: 'Keamanan Data',
    updated: 'Terakhir diperbarui: 1 September 2026',
    sections: [
      { heading: '1. Enkripsi Suara Voting', body: 'Setiap suara yang masuk dienkripsi dan ditautkan ke akun Google terverifikasi untuk mencegah duplikasi dan manipulasi hasil.' },
      { heading: '2. Audit Berkala', body: 'Sistem menjalani audit keamanan berkala oleh tim internal Superadmin, mencakup log aktivitas, akses akun, dan jejak perubahan data sensitif.' },
      { heading: '3. Perlindungan Dokumen Legal', body: 'Dokumen legal Event Creator (KTP, NPWP, rekening) disimpan dengan akses terbatas hanya untuk tim verifikasi yang berwenang.' },
      { heading: '4. Pelaporan Insiden', body: 'Jika Anda menemukan kerentanan keamanan atau aktivitas mencurigakan, segera laporkan melalui Live Chat CS atau Form Komplain di Portal Customer.' },
    ],
  },
  compliance: {
    title: 'Kepatuhan Acara',
    updated: 'Terakhir diperbarui: 1 September 2026',
    sections: [
      { heading: '1. Keselamatan Kerumunan', body: 'Event Creator wajib mematuhi standar keselamatan kerumunan (crowd safety) yang berlaku, termasuk kapasitas venue dan jalur evakuasi darurat.' },
      { heading: '2. Legalitas Tiket', body: 'Setiap tiket yang diterbitkan melalui platform ini dilengkapi kode QR unik untuk mencegah pemalsuan dan penjualan tiket ilegal.' },
      { heading: '3. Perizinan Event', body: 'Event Creator bertanggung jawab memastikan event yang dipublikasikan telah memiliki izin penyelenggaraan yang sah dari otoritas setempat.' },
      { heading: '4. Pelaporan Pelanggaran', body: 'Dugaan pelanggaran kepatuhan acara dapat dilaporkan melalui Form Refund/Komplain kategori "Lapor Penipuan" di Portal Customer.' },
    ],
  },
};

interface LegalPageProps {
  page: LegalPageId;
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page, onBack }) => {
  const content = CONTENT[page];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="text-[#565e74] hover:text-[#191c1e] cursor-pointer" aria-label="Kembali">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[19px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#191c1e] tracking-tight">{content.title}</h1>
        <p className="text-[13px] text-[#94a3b8] mt-2 mb-8">{content.updated}</p>

        <div className="space-y-7">
          {content.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-[15px] font-bold text-[#191c1e] mb-2">{s.heading}</h2>
              <p className="text-[14px] leading-[24px] text-[#565e74]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
