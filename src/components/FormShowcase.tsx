import React, { useState } from 'react';

export const FormShowcase: React.FC = () => {
  const [dietaryPref, setDietaryPref] = useState<string>('Vegetarian');
  const [fullName, setFullName] = useState<string>('Ahmad Fauzan Pratama');
  const [uploadedFile, setUploadedFile] = useState<string>('ktp_fauzan_verified.pdf');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const name = e.target.files[0].name;
      setTimeout(() => {
        setUploadedFile(name);
        setIsUploading(false);
      }, 700);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            FORM BUILDER &amp; SURVEY
          </div>
          <h2 className="text-[26px] sm:text-[32px] font-bold text-[#191c1e] tracking-tight">
            Data event yang lebih terstruktur.
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Formulir cerdas yang terikat langsung ke tipe tiket pembeli untuk mengumpulkan ukuran kaos, preferensi makanan, hingga dokumen legal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Form Builder Mockup */}
          <div className="lg:col-span-7 bg-[#f7f9fb] rounded-xl border border-[#e2e8f0] p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#dc2626]">table_chart</span>
                <span className="text-[16px] font-bold text-[#191c1e]">
                  Formulir Peserta VIP Workshop
                </span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#fef2f2] text-[#dc2626] text-[11px] font-bold">
                Tier: VIP Pass Only
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#191c1e] mb-1">
                  Nama Lengkap Sesuai KTP <span className="text-[#dc2626]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] text-[#191c1e] focus:outline-hidden focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#191c1e] mb-1">
                  Kategori Tiket
                </label>
                <div className="w-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] text-[#191c1e] flex justify-between items-center shadow-2xs">
                  <span>VIP Access + Backstage Lounge</span>
                  <span className="material-symbols-outlined text-[#565e74] text-sm">lock</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#191c1e] mb-1">
                  Upload Identitas (KTP / Passport) <span className="text-[#dc2626]">*</span>
                </label>
                <label className="border-2 border-dashed border-[#cbd5e1] hover:border-[#dc2626] bg-white rounded-lg p-3 text-center block cursor-pointer transition-colors">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleSimulateUpload}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <span className="material-symbols-outlined text-[#565e74] text-2xl">
                    cloud_upload
                  </span>
                  {isUploading ? (
                    <p className="text-[13px] text-[#dc2626] font-medium mt-1">Mengunggah file...</p>
                  ) : (
                    <p className="text-[13px] text-[#565e74] mt-1">
                      {uploadedFile} <span className="text-[#10b981] font-semibold">(Verified)</span>
                    </p>
                  )}
                  <p className="text-[10px] text-[#565e74] mt-0.5">
                    Klik untuk mengganti dokumen
                  </p>
                </label>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#191c1e] mb-1">
                  Pertanyaan Khusus: Preferensi Makanan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Vegetarian', 'Halal', 'Bebas Gluten'].map((opt) => {
                    const isSelected = dietaryPref === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setDietaryPref(opt)}
                        className={`p-2 text-center rounded text-[11px] font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'border border-[#dc2626] bg-[#fef2f2] text-[#dc2626]'
                            : 'border border-[#e2e8f0] bg-white text-[#565e74] hover:bg-[#f2f4f6]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Feature Bullets */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e2e8f0] flex items-start gap-3 hover:border-[#dc2626]/30 transition-colors">
              <span className="material-symbols-outlined text-[#dc2626] mt-0.5 text-xl">tune</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#191c1e]">Form Berdasarkan Ticket Type</h4>
                <p className="text-[13px] text-[#565e74] leading-[20px] mt-0.5">
                  Formulir hanya tampil untuk pembeli tiket kategori tertentu yang telah Anda atur.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e2e8f0] flex items-start gap-3 hover:border-[#dc2626]/30 transition-colors">
              <span className="material-symbols-outlined text-[#dc2626] mt-0.5 text-xl">alt_route</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#191c1e]">Conditional Logic &amp; Multi-step</h4>
                <p className="text-[13px] text-[#565e74] leading-[20px] mt-0.5">
                  Pertanyaan dinamis yang beradaptasi dengan jawaban pembeli sebelumnya.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#e2e8f0] flex items-start gap-3 hover:border-[#dc2626]/30 transition-colors">
              <span className="material-symbols-outlined text-[#dc2626] mt-0.5 text-xl">file_download</span>
              <div>
                <h4 className="text-[14px] font-bold text-[#191c1e]">Response Management &amp; Export</h4>
                <p className="text-[13px] text-[#565e74] leading-[20px] mt-0.5">
                  Unduh dataset lengkap dalam format CSV/Excel atau sinkronkan via Webhook.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Linear Micro-flow under custom form */}
        <div className="mt-12 pt-8 border-t border-[#e2e8f0]">
          <div className="text-center text-[11px] font-bold text-[#565e74] mb-4 uppercase tracking-wider">
            Alur Terintegrasi Otomatis
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[12px] font-semibold">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#f7f9fb] border border-[#e2e8f0] text-[#191c1e]">
              Event
            </span>
            <span className="material-symbols-outlined text-[#565e74] text-sm">arrow_forward</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#f7f9fb] border border-[#e2e8f0] text-[#191c1e]">
              Ticket Type
            </span>
            <span className="material-symbols-outlined text-[#565e74] text-sm">arrow_forward</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#fef2f2] border border-[#fecdd3] text-[#dc2626] font-bold shadow-2xs">
              Custom Form
            </span>
            <span className="material-symbols-outlined text-[#565e74] text-sm">arrow_forward</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#f7f9fb] border border-[#e2e8f0] text-[#191c1e]">
              Responses
            </span>
            <span className="material-symbols-outlined text-[#565e74] text-sm">arrow_forward</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] font-bold shadow-2xs">
              Analytics
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
