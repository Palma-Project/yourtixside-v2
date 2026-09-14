import React, { useState } from 'react';

export type InfoModalType = 'about' | 'services' | 'contact';

interface InfoModalProps {
  type: InfoModalType;
  onClose: () => void;
  onOpenSupport?: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose, onOpenSupport }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2f2] text-[#dc2626] text-[11px] font-bold">
              ABOUT YOURTIXSIDE
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e]">
              Platform Operasional Resmi Ekosistem yourtix
            </h3>
            <p className="text-[14px] text-[#565e74] leading-[24px]">
              <strong>yourtixside</strong> dirancang untuk melengkapi ticketing engine yourtix. Sementara yourtix berfokus pada kecepatan checkout tiket skala masif, yourtixside menangani seluruh dinamika operasional sebelum, selama, dan sesudah hari acara.
            </p>
            <div className="space-y-2 pt-2">
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#dc2626] text-xl mt-0.5">verified_user</span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#191c1e]">Keandalan Lapangan</h4>
                  <p className="text-[12px] text-[#565e74]">Scanner turnstile offline-resilient menjamin antrean tiket tidak pernah macet saat koneksi venue drop.</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-3">
                <span className="material-symbols-outlined text-[#dc2626] text-xl mt-0.5">hub</span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#191c1e]">Satu Ruang Kerja Terpadu</h4>
                  <p className="text-[12px] text-[#565e74]">Menghubungkan Event Creator, tim Gate Lapangan, staf Customer Care, dan Superadmin dalam satu data stream.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'services' && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2f2] text-[#dc2626] text-[11px] font-bold">
              SERVICES &amp; MODULES
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e]">
              Layanan Unggulan yourtixside
            </h3>
            <p className="text-[14px] text-[#565e74] leading-[24px]">
              Modul operasional menyeluruh untuk menjamin kelancaran jalannya setiap festival, konser, dan konferensi Anda:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                <div className="text-[13px] font-bold text-[#191c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dc2626] text-base">qr_code_scanner</span>
                  <span>Turnstile &amp; Gate Access</span>
                </div>
                <p className="text-[12px] text-[#565e74] mt-1">Validasi barcode terenkripsi &amp; telemetri flow penonton real-time.</p>
              </div>
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                <div className="text-[13px] font-bold text-[#191c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dc2626] text-base">ballot</span>
                  <span>Live Audience Voting</span>
                </div>
                <p className="text-[12px] text-[#565e74] mt-1">Sistem voting interaktif berbasis nomor tiket resmi tanpa kecurangan.</p>
              </div>
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                <div className="text-[13px] font-bold text-[#191c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dc2626] text-base">assignment</span>
                  <span>Dynamic Form &amp; Waiver</span>
                </div>
                <p className="text-[12px] text-[#565e74] mt-1">Koleksi data pra-event, ukuran merchandise, dan verifikasi identitas.</p>
              </div>
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc]">
                <div className="text-[13px] font-bold text-[#191c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#dc2626] text-base">history_edu</span>
                  <span>E-Signature MoU</span>
                </div>
                <p className="text-[12px] text-[#565e74] mt-1">Penandatanganan kontrak sponsor dan artis langsung dari platform.</p>
              </div>
            </div>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef2f2] text-[#dc2626] text-[11px] font-bold">
              HUBUNGI KAMI
            </div>
            <h3 className="text-[22px] font-bold text-[#191c1e]">
              Hubungi Tim yourtixside
            </h3>
            <p className="text-[14px] text-[#565e74] leading-[24px]">
              Punya pertanyaan mengenai integrasi gate, kustomisasi form, atau konsultasi kebutuhan festival Anda?
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-center space-y-2">
                <span className="material-symbols-outlined text-[#059669] text-3xl">check_circle</span>
                <h4 className="text-[15px] font-bold text-[#065f46]">Pesan Berhasil Terkirim</h4>
                <p className="text-[13px] text-[#047857]">
                  Tim operasional kami akan membalas pesan Anda dalam kurun waktu kurang dari 24 jam kerja.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 px-4 py-2 bg-[#059669] text-white rounded-lg text-[12px] font-semibold"
                >
                  Tutup
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[12px] font-semibold text-[#191c1e] mb-1">
                    Nama / Penyelenggara
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nama Anda atau Event Organizer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#191c1e] mb-1">
                    Email Kontak
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@eventorganizer.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-[#191c1e] mb-1">
                    Pesan / Kebutuhan Operasional
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Ceritakan event Anda dan perkiraan jumlah pengunjung..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[13px] focus:outline-none focus:border-[#dc2626]"
                  />
                </div>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (onOpenSupport) onOpenSupport();
                    }}
                    className="text-[12px] font-semibold text-[#dc2626] hover:underline"
                  >
                    Butuh respons mendesak? Buka Live Chat
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#dc2626] text-white rounded-xl text-[13px] font-semibold hover:bg-[#b91c1c] transition-colors cursor-pointer"
                  >
                    Kirim Pesan
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
