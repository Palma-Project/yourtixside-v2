import React, { useState } from 'react';

interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  detail: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'esign',
    icon: 'draw',
    title: 'E-Signature',
    desc: 'Kelola dokumen, MoU, dan legal waiver digital secara sah dan langsung tersinkronisasi.',
    tag: 'Legal Compliance',
    detail: 'Terintegrasi dengan tanda tangan digital tersertifikasi, audit trail timestamp SHA-256, dan penyimpanan dokumen PDF otomatis ke cloud secure vault.',
  },
  {
    id: 'form',
    icon: 'dynamic_form',
    title: 'Custom Form',
    desc: 'Formulir khusus per ticket tier & data peserta langsung terikat pada database tiket.',
    tag: 'Dynamic Fields',
    detail: 'Buat kolom spesifik (ukuran merchandise, alergi makanan, KTP pass) yang terkunci secara otomatis berdasarkan jenis tiket pembeli.',
  },
  {
    id: 'voting',
    icon: 'how_to_vote',
    title: 'Voting',
    desc: 'Engage audiens dengan mekanisme voting terverifikasi kepemilikan barcode tiket resmi.',
    tag: 'Anti-Bot Engine',
    detail: 'Mencegah spam bot dengan validasi 1 Tiket = 1 Hak Suara. Mendukung sistem voting single choice, ranked choice, dan live realtime stage tally.',
  },
  {
    id: 'fotobooth',
    icon: 'photo_camera',
    title: 'Fotobooth',
    desc: 'Event photo cloud sync & instant branding watermark otomatis untuk para audiens.',
    tag: 'Media Delivery',
    detail: 'Kamera fotobooth otomatis sinkron ke galeri personal peserta via scan QR gelang, dilengkapi frame overlay sponsor resmi.',
  },
  {
    id: 'chat',
    icon: 'chat',
    title: 'Live Chat',
    desc: 'Customer service & resolusi tiket cepat dengan antrean cerdas saat hari-H acara.',
    tag: 'SLA < 2 Min',
    detail: 'Routing tiket komplain otomatis ke kru gate terdekat, pencocokan data pesanan real-time, dan histori interaksi instan.',
  },
  {
    id: 'analytics',
    icon: 'monitoring',
    title: 'Analytics',
    desc: 'Insight kehadiran gate, responses form, retensi peserta, dan distribusi geografi.',
    tag: 'Real-time Telemetry',
    detail: 'Visualisasi laju scan turnstile per menit, bottleneck pintu masuk, rekapitulasi pengisian survei, dan geolokasi peserta.',
  },
  {
    id: 'calendar',
    icon: 'calendar_month',
    title: 'Calendar',
    desc: 'Event tasks schedule, rundown timeline operasional, dan deadline pengumpulan data.',
    tag: 'Ops Rundown',
    detail: 'Manajemen timeline teknis menit demi menit untuk kru panggung, sound engineer, keamanan, dan vendor catering.',
  },
  {
    id: 'whatsapp',
    icon: 'forum',
    title: 'WhatsApp Bot',
    desc: 'Support otomatis dan broadcast notifikasi e-ticket serta rundown langsung ke gawai.',
    tag: 'Omnichannel Bot',
    detail: 'Kirim reminder jadwal tampil artis favorit, push info penukaran wristband, dan auto-reply FAQ tanpa membebani operator manual.',
  },
];

export const FeaturesGrid: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<FeatureItem | null>(null);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            FITUR UTAMA
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Satu hub untuk seluruh aktivitas setelah transaksi.
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Infrastruktur lengkap yang dirancang khusus untuk memastikan kenyamanan audience dan kepatuhan operasional event organizer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              onClick={() => setActiveFeature(feat)}
              className="bg-[#f7f9fb] p-6 rounded-xl border border-[#e2e8f0] hover:border-[#dc2626]/40 hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-xl">{feat.icon}</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#191c1e] flex items-center justify-between">
                  <span>{feat.title}</span>
                  <span className="text-[10px] text-[#dc2626] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Detail &rarr;
                  </span>
                </h3>
                <p className="text-[13px] text-[#565e74] mt-2 leading-[20px]">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e2e8f0]/60 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#565e74] bg-white px-2 py-0.5 rounded border border-[#e2e8f0]">
                  {feat.tag}
                </span>
                <span className="text-[11px] text-[#10b981] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                  Tersedia
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Detail Modal */}
        {activeFeature && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => setActiveFeature(null)}
                className="absolute top-4 right-4 p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#fef2f2] text-[#dc2626] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">{activeFeature.icon}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#dc2626]">
                    {activeFeature.tag}
                  </span>
                  <h3 className="text-[20px] font-bold text-[#191c1e]">{activeFeature.title}</h3>
                </div>
              </div>

              <p className="text-[14px] text-[#191c1e] font-medium leading-[22px] mb-3">
                {activeFeature.desc}
              </p>

              <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#e2e8f0] text-[13px] text-[#565e74] leading-[21px] mb-5">
                <div className="font-semibold text-[#191c1e] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#006645] text-base">verified</span>
                  Kapabilitas Operasional:
                </div>
                {activeFeature.detail}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveFeature(null)}
                  className="px-4 py-2 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] hover:bg-[#b91c1c] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
