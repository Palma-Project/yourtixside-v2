import React from 'react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-white border-y border-[#e2e8f0]" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#dc2626]">
            ARSITEKTUR PLATFORM
          </div>
          <h2 className="text-[26px] sm:text-[34px] font-bold text-[#191c1e] tracking-tight leading-[1.2]">
            yourtix menangani transaksi.{' '}
            <br className="hidden sm:inline" />
            <span className="text-[#dc2626]">yourtixside menangani apa yang terjadi di sekitarnya.</span>
          </h2>
          <p className="text-[16px] text-[#565e74] leading-[26px]">
            Kenapa tidak semuanya di yourtix? Kami memisahkan kecepatan checkout transaksi tiket dengan kedalaman operasional hari-H agar platform checkout tetap ultra-cepat dan tangguh saat war tiket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Column 1: yourtix */}
          <div className="bg-[#f7f9fb] p-8 rounded-xl border border-[#e2e8f0]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-6">
              <div>
                <h3 className="text-[20px] font-bold text-[#191c1e]">yourtix</h3>
                <span className="text-[12px] text-[#565e74] font-medium">
                  Ticketing Engine &amp; Fast Checkout
                </span>
              </div>
              <span className="material-symbols-outlined text-[#565e74] text-2xl">
                shopping_cart
              </span>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-[14px] text-[#565e74]">
                <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                <span>Buy Ticket &amp; War Ticket Engine</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#565e74]">
                <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                <span>Sell Ticket &amp; Inventory Allocation</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#565e74]">
                <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                <span>Payment Gateway &amp; Processing</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#565e74]">
                <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                <span>Payout to Event Organizer</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#565e74]">
                <span className="material-symbols-outlined text-[#565e74] text-lg">check</span>
                <span>Order Invoicing &amp; QR Delivery</span>
              </li>
            </ul>
          </div>

          {/* Column 2: yourtixside (Highlighted) */}
          <div className="bg-white p-8 rounded-xl border-2 border-[#dc2626] shadow-md relative">
            <div className="absolute -top-3 right-6 bg-[#dc2626] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
              Operations &amp; Post-Transaction Hub
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-6">
              <div>
                <h3 className="text-[20px] font-bold text-[#dc2626]">yourtixside</h3>
                <span className="text-[12px] text-[#565e74] font-medium">
                  Field Operations &amp; Engagement
                </span>
              </div>
              <span className="material-symbols-outlined text-[#dc2626] text-2xl">
                hub
              </span>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>Event Operations &amp; On-ground Gate Control</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>Customer Support &amp; SLA Ticket Resolution</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>Custom Form Per Ticket Tier</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>E-Signature Legal Agreements &amp; Waivers</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>Verified Ticket Voting &amp; Stage Polling</span>
              </li>
              <li className="flex items-center gap-3 text-[14px] text-[#191c1e] font-medium">
                <span className="material-symbols-outlined text-[#dc2626] text-lg">check_circle</span>
                <span>Event Photo Cloud &amp; Real-time Analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
