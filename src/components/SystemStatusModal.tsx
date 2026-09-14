import React from 'react';

interface SystemStatusModalProps {
  onClose: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ onClose }) => {
  const services = [
    { name: 'Turnstile Barcode Scanner API', status: 'Operational', latency: '14ms', uptime: '99.99%' },
    { name: 'Verified Voting Engine (One-Ticket-One-Vote)', status: 'Operational', latency: '22ms', uptime: '99.98%' },
    { name: 'Custom Form & Identity Verification Vault', status: 'Operational', latency: '35ms', uptime: '99.95%' },
    { name: 'E-Signature MoU Cryptographic Timestamp', status: 'Operational', latency: '28ms', uptime: '99.99%' },
    { name: 'Live Chat & SLA Queue Dispatcher', status: 'Operational', latency: '18ms', uptime: '99.96%' },
    { name: 'Fotobooth Auto-Watermark Cloud Sync', status: 'Operational', latency: '48ms', uptime: '99.90%' },
    { name: 'WhatsApp Notification Gateway', status: 'Operational', latency: '65ms', uptime: '99.92%' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#e2e8f0] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#565e74] hover:text-[#191c1e] rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10b981]"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#10b981]">
            All Systems Operational
          </span>
        </div>

        <h3 className="text-[22px] font-bold text-[#191c1e]">
          Status Sistem Operasional yourtixside
        </h3>
        <p className="text-[13px] text-[#565e74] mt-1">
          Observabilitas real-time seluruh microservices, turnstile gateway, dan pipeline verifikasi acara.
        </p>

        {/* Uptime Summary Box */}
        <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-xl bg-[#f7f9fb] border border-[#e2e8f0] text-center">
          <div>
            <div className="text-[11px] text-[#565e74] font-semibold">Uptime 30 Hari</div>
            <div className="text-[20px] font-bold text-[#10b981]">99.98%</div>
          </div>
          <div>
            <div className="text-[11px] text-[#565e74] font-semibold">Average Latency</div>
            <div className="text-[20px] font-bold text-[#191c1e]">24ms</div>
          </div>
          <div>
            <div className="text-[11px] text-[#565e74] font-semibold">Incidents Reported</div>
            <div className="text-[20px] font-bold text-[#10b981]">0</div>
          </div>
        </div>

        {/* Detailed Service Table */}
        <div className="border border-[#e2e8f0] rounded-xl overflow-hidden mb-6">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead>
              <tr className="bg-[#f2f4f6] text-[#565e74] text-[11px] uppercase font-bold border-b border-[#e2e8f0]">
                <th className="py-2.5 px-4">Service Component</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Latency</th>
                <th className="py-2.5 px-4 text-right">Uptime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {services.map((svc, idx) => (
                <tr key={idx} className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-2.5 px-4 font-medium text-[#191c1e]">
                    {svc.name}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#006645] bg-[#ecfdf5] border border-[#a7f3d0] px-2 py-0.5 rounded font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                      {svc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-[#565e74]">{svc.latency}</td>
                  <td className="py-2.5 px-4 text-right font-semibold text-[#191c1e]">
                    {svc.uptime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-[#565e74]">
            Pembaruan otomatis via WebSocket telemetry • Terakhir diperiksa: Baru saja
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#dc2626] text-white font-semibold text-[13px] hover:bg-[#b91c1c] cursor-pointer shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
