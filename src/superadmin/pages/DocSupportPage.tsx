/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Send, Plus, Trash2 } from 'lucide-react';
import {
  docRequests as initialDocRequests,
  documentTypes,
  chatConversations,
  complaints as initialComplaints,
  DocRequest,
  Complaint,
  ComplaintCategory,
} from '../../data/superadminData';
import { Tabs, SectionCard, StatusBadge, EmptyState } from '../../creator/components/ui';

const TOP_TABS = [
  { id: 'signature', label: 'E-Signature' },
  { id: 'chat', label: 'Live Chat CS' },
  { id: 'complaints', label: 'Komplain & Refund' },
];

const ESIGN_SUBTABS = [
  { id: 'requests', label: 'Semua Request' },
  { id: 'types', label: 'Jenis Dokumen' },
];

const COMPLAINT_FILTERS: (ComplaintCategory | 'Semua')[] = ['Semua', 'Refund', 'Komplain Umum', 'Lapor Penipuan'];

const complaintStatusMap: Record<Complaint['status'], string> = {
  diproses: 'diproses',
  'menunggu-dokumen': 'pending',
  selesai: 'selesai',
};

export const DocSupportPage: React.FC = () => {
  const [active, setActive] = useState('signature');
  const [esignTab, setEsignTab] = useState('requests');
  const [docs, setDocs] = useState<DocRequest[]>(initialDocRequests);
  const [activeChatId, setActiveChatId] = useState(chatConversations[0]?.id ?? '');
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [complaintFilter, setComplaintFilter] = useState<ComplaintCategory | 'Semua'>('Semua');
  const [reply, setReply] = useState('');

  const reviewDoc = (id: string, status: 'signed' | 'rejected') => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  const activeChat = chatConversations.find((c) => c.id === activeChatId);

  const advanceComplaint = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'menunggu-dokumen' ? 'diproses' : c.status === 'diproses' ? 'selesai' : c.status }
          : c
      )
    );
  };

  const filteredComplaints =
    complaintFilter === 'Semua' ? complaints : complaints.filter((c) => c.category === complaintFilter);

  return (
    <div>
      <Tabs tabs={TOP_TABS} active={active} onChange={setActive} />

      {active === 'signature' && (
        <>
          <Tabs tabs={ESIGN_SUBTABS} active={esignTab} onChange={setEsignTab} />
          {esignTab === 'requests' && (
            <SectionCard title="Semua Request Dokumen" description="Review dokumen yang diajukan seluruh EO.">
              <div className="space-y-2.5">
                {docs.map((d) => (
                  <div key={d.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-[#e2e8f0] p-3.5">
                    <div className="min-w-0 flex-1">
                      <div className="text-[13.5px] font-semibold text-[#191c1e] truncate">{d.docName}</div>
                      <div className="text-[11.5px] text-[#94a3b8]">
                        {d.eoName} • {d.docType} • diajukan {d.submittedAt}
                      </div>
                    </div>
                    <StatusBadge status={d.status} />
                    {d.status === 'pending' && (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => reviewDoc(d.id, 'signed')}
                          className="text-[#059669] hover:text-[#047857] cursor-pointer"
                          title="Approve"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button
                          onClick={() => reviewDoc(d.id, 'rejected')}
                          className="text-[#b3220f] hover:text-[#991b1b] cursor-pointer"
                          title="Reject"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
          {esignTab === 'types' && (
            <SectionCard
              title="Jenis Dokumen"
              description="Kelola template dokumen yang tersedia untuk EO."
              action={
                <button className="inline-flex items-center gap-1.5 bg-[#dc2626] text-white text-[12.5px] font-bold px-3.5 py-2 rounded-lg hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Plus size={13} />
                  Tambah Jenis
                </button>
              }
            >
              <div className="space-y-2">
                {documentTypes.map((dt) => (
                  <div key={dt.id} className="flex items-center gap-3 rounded-xl border border-[#f1f5f9] px-3.5 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-[#191c1e]">{dt.name}</div>
                      <div className="text-[11.5px] text-[#94a3b8]">Versi {dt.version} • diperbarui {dt.lastUpdated}</div>
                    </div>
                    <button className="text-[12px] font-semibold text-[#dc2626] hover:underline cursor-pointer shrink-0">
                      Edit Template
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}
        </>
      )}

      {active === 'chat' && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden grid grid-cols-1 sm:grid-cols-[240px_1fr] h-[520px]">
          <div className="border-r border-[#e2e8f0] overflow-y-auto">
            {chatConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-[#f1f5f9] transition-colors cursor-pointer ${
                  activeChatId === c.id ? 'bg-[#fef2f2]' : 'hover:bg-[#f8fafc]'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[13px] font-bold text-[#191c1e] truncate">{c.customerName}</span>
                  {c.unread && <span className="w-2 h-2 rounded-full bg-[#dc2626] shrink-0" />}
                </div>
                <p className="text-[11.5px] text-[#94a3b8] truncate">{c.lastMessage}</p>
                <span className="text-[10.5px] text-[#cbd5e1]">{c.lastMessageTime}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            {activeChat ? (
              <>
                <div className="px-4 py-3 border-b border-[#e2e8f0] font-bold text-[13.5px] text-[#191c1e]">
                  {activeChat.customerName}
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                  {activeChat.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.from === 'agent' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-[13px] ${
                          m.from === 'agent' ? 'bg-[#dc2626] text-white' : 'bg-[#f1f5f9] text-[#191c1e]'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-[#e2e8f0] flex items-center gap-2">
                  <input
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Balas pesan..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13px]"
                  />
                  <button
                    onClick={() => setReply('')}
                    className="w-10 h-10 rounded-xl bg-[#dc2626] text-white flex items-center justify-center hover:bg-[#b91c1c] transition-colors cursor-pointer shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </>
            ) : (
              <EmptyState message="Pilih percakapan di sebelah kiri." />
            )}
          </div>
        </div>
      )}

      {active === 'complaints' && (
        <SectionCard title="Komplain & Refund" description="Kelola tiket laporan yang masuk dari customer.">
          <div className="flex flex-wrap gap-2 mb-4">
            {COMPLAINT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setComplaintFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold cursor-pointer ${
                  complaintFilter === f ? 'bg-[#dc2626] text-white' : 'bg-[#f2f4f6] text-[#565e74]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11.5px] font-semibold text-[#94a3b8] uppercase border-b border-[#e2e8f0]">
                  <th className="pb-2.5 pr-4">No. Tiket</th>
                  <th className="pb-2.5 pr-4">Kategori</th>
                  <th className="pb-2.5 pr-4">Pelapor</th>
                  <th className="pb-2.5 pr-4">Status</th>
                  <th className="pb-2.5 pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="border-b border-[#f1f5f9]">
                    <td className="py-3 pr-4 font-mono text-[12px] text-[#191c1e]">{c.ticketNumber}</td>
                    <td className="py-3 pr-4 text-[#565e74]">{c.category}</td>
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-[#191c1e]">{c.reporterName}</div>
                      <div className="text-[11px] text-[#94a3b8]">{c.reporterEmail}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={complaintStatusMap[c.status]} />
                    </td>
                    <td className="py-3 pr-4">
                      {c.status !== 'selesai' && (
                        <button
                          onClick={() => advanceComplaint(c.id)}
                          className="text-[12px] font-bold text-[#dc2626] hover:underline cursor-pointer whitespace-nowrap"
                        >
                          Update Status →
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
};
