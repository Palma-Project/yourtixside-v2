import React, { useState } from 'react';
import { RoleType } from '../types';

interface PortalModalProps {
  initialRole: RoleType;
  onClose: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({ initialRole, onClose }) => {
  const [activeRole, setActiveRole] = useState<RoleType>(initialRole);
  const [ticketQuery, setTicketQuery] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);

  // EO simulator states
  const [eventName, setEventName] = useState('Soundfest Jakarta 2026');
  const [tierName, setTierName] = useState('VIP Backstage Pass');
  const [quota, setQuota] = useState('500');
  const [eoSubmitted, setEoSubmitted] = useState(false);

  const handleCheckTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    setQueryResult(
      `Tiket #${ticketQuery.toUpperCase()} valid! Status: Terverifikasi (Kategori VIP). Form identitas & waiver telah ditandatangani digital.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            yourtixside Portal Access
          </span>
        </div>
        <h3 className="text-[22px] font-bold text-[#191c1e]">
          Masuk ke Ruang Kerja Operasional
        </h3>
        <p className="text-[13px] text-[#565e74] mt-1">
          Pilih role akses untuk menguji simulasi portal yourtixside.
        </p>

        {/* Role Switcher Tabs */}
        <div className="flex rounded-xl bg-[#f2f4f6] p-1 mt-5 mb-6 border border-[#e2e8f0]">
          <button
            onClick={() => setActiveRole('creator')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRole === 'creator'
                ? 'bg-white text-[#dc2626] shadow-xs'
                : 'text-[#565e74] hover:text-[#191c1e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">confirmation_number</span>
            Event Creator
          </button>
          <button
            onClick={() => setActiveRole('customer')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRole === 'customer'
                ? 'bg-white text-[#191c1e] shadow-xs'
                : 'text-[#565e74] hover:text-[#191c1e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">support_agent</span>
            Customer
          </button>
          <button
            onClick={() => setActiveRole('superadmin')}
            className={`flex-1 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRole === 'superadmin'
                ? 'bg-[#2d3133] text-white shadow-xs'
                : 'text-[#565e74] hover:text-[#191c1e]'
            }`}
          >
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            Superadmin
          </button>
        </div>

        {/* Role Content 1: Event Creator */}
        {activeRole === 'creator' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#fef2f2] border border-[#fecdd3] text-[#b91c1c] text-[13px]">
              <span className="font-bold">EO Environment Active:</span> Anda memiliki izin untuk mengonfigurasi formulir registrasi kustom, penugasan tiket, dan verifikasi dokumen legal.
            </div>

            <div className="space-y-3 bg-[#f7f9fb] p-4 rounded-xl border border-[#e2e8f0]">
              <h4 className="text-[14px] font-bold text-[#191c1e] flex items-center justify-between">
                <span>Konfigurasi Cepat Kebutuhan Event</span>
                <span className="text-[11px] text-[#006645] bg-[#ecfdf5] px-2 py-0.5 rounded font-bold">
                  Online
                </span>
              </h4>

              <div>
                <label className="block text-[11px] font-bold text-[#565e74] mb-1">
                  Nama Acara
                </label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-hidden focus:border-[#dc2626]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#565e74] mb-1">
                    Tier Tiket Terkait
                  </label>
                  <input
                    type="text"
                    value={tierName}
                    onChange={(e) => setTierName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-hidden focus:border-[#dc2626]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#565e74] mb-1">
                    Alokasi Kuota
                  </label>
                  <input
                    type="number"
                    value={quota}
                    onChange={(e) => setQuota(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-hidden focus:border-[#dc2626]"
                  />
                </div>
              </div>

              {eoSubmitted && (
                <div className="p-2.5 rounded-lg bg-[#ecfdf5] text-[#065f46] text-[12px] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Instrumen formulir berhasil disinkronkan ke gate yourtix!</span>
                </div>
              )}

              <button
                onClick={() => setEoSubmitted(true)}
                className="w-full py-2.5 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] hover:bg-[#b91c1c] active:scale-[0.98] transition-all cursor-pointer shadow-xs"
              >
                Sinkronkan ke yourtix Hub
              </button>
            </div>
          </div>
        )}

        {/* Role Content 2: Customer */}
        {activeRole === 'customer' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#f2f4f6] border border-[#e2e8f0] text-[#191c1e] text-[13px]">
              <span className="font-bold">Customer Self-Service:</span> Cek status tiket, pengisian formulir biodata, status verifikasi tanda pengenal KTP, atau ajukan tiket bantuan.
            </div>

            <form onSubmit={handleCheckTicket} className="space-y-3 bg-[#f7f9fb] p-4 rounded-xl border border-[#e2e8f0]">
              <label className="block text-[12px] font-bold text-[#191c1e]">
                Cek Status Tiket / Validasi Dokumen
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Contoh: TIX-8842-VJ"
                  value={ticketQuery}
                  onChange={(e) => setTicketQuery(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-hidden focus:border-[#dc2626]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#191c1e] text-white font-semibold rounded-lg text-[13px] hover:bg-black cursor-pointer shadow-xs"
                >
                  Cek Tiket
                </button>
              </div>

              {queryResult ? (
                <div className="p-3 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-[12px] leading-[18px]">
                  {queryResult}
                </div>
              ) : (
                <p className="text-[11px] text-[#565e74]">
                  Tip: Coba ketik kode tiket apa pun seperti <strong>TIX-8842-VJ</strong> untuk menguji validasi barcode.
                </p>
              )}
            </form>
          </div>
        )}

        {/* Role Content 3: Superadmin */}
        {activeRole === 'superadmin' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#2d3133] text-white text-[13px] flex items-center justify-between">
              <div>
                <span className="font-bold block">Ops Center Master Governance</span>
                <span className="text-[11px] text-[#bec6e0]">Cluster: asia-southeast1-k8s • Latency 14ms</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#10b981] text-white text-[10px] font-bold">
                HEALTHY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[12px]">
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f7f9fb]">
                <span className="text-[#565e74] text-[11px] block">Turnstile Ingress</span>
                <span className="font-bold text-[16px] text-[#191c1e]">94.2% Passed</span>
                <span className="text-[10px] text-[#10b981] block mt-0.5">0 anomalous scans</span>
              </div>
              <div className="p-3 rounded-xl border border-[#e2e8f0] bg-[#f7f9fb]">
                <span className="text-[#565e74] text-[11px] block">MoU Cryptographic Hash</span>
                <span className="font-bold text-[16px] text-[#191c1e]">SHA-256 Valid</span>
                <span className="text-[10px] text-[#10b981] block mt-0.5">Vault tamper-proof</span>
              </div>
            </div>

            <div className="p-3 bg-[#f7f9fb] rounded-xl border border-[#e2e8f0] space-y-2">
              <span className="text-[11px] font-bold text-[#565e74] uppercase tracking-wider block">
                Emergency Controls
              </span>
              <div className="flex items-center justify-between py-1 border-b border-[#e2e8f0] text-[12px]">
                <span>Rate-limiting Anti-bot Gate</span>
                <span className="text-[#10b981] font-bold">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between py-1 text-[12px]">
                <span>Automated Turnstile Bypass Mode</span>
                <span className="text-[#565e74] font-medium">STANDBY</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#e2e8f0] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#f2f4f6] text-[#191c1e] font-semibold text-[13px] hover:bg-[#e6e8ea] cursor-pointer"
          >
            Tutup Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
