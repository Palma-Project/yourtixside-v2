/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ShieldCheck,
  Repeat,
  RotateCcw,
  Send,
  FileSearch,
  Vote,
  Camera,
  Mail,
  Sparkles,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { momentPhotos } from '../data/creatorData';
import { useAppStore } from '../store/AppStore';
import { useCustomerAuth } from '../hooks/useCustomerAuth';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { LiveChatWidget } from './LiveChatWidget';
import { CustomerLogin } from './CustomerLogin';
import { CustomerAccountPage } from './CustomerAccountPage';

const GUIDES = [
  { icon: ShieldCheck, title: 'Verifikasi Tiket Asli', body: 'Setiap tiket punya QR unik yang hanya bisa discan sekali di venue.' },
  { icon: Repeat, title: 'Transfer Tiket', body: 'Pindahkan tiket ke orang lain lewat email konfirmasi pembelian.' },
  { icon: RotateCcw, title: 'Kebijakan Refund per Event', body: 'Setiap event punya kebijakan refund sendiri — cek sebelum membeli.' },
];

function generateTicketNumber() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `YTX-${digits}`;
}

interface CustomerPortalProps {
  onBackHome: () => void;
  onOpenVote: (id: string) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ onBackHome, onOpenVote }) => {
  const [view, setView] = useState<'portal' | 'login' | 'account'>('portal');
  const { votes, complaints, setComplaints, chats, setChats, faq, logActivity } = useAppStore();
  const auth = useCustomerAuth();
  const { user: googleUser, renderButtonInto } = useGoogleAuth();
  const googleBtnRef = useRef<HTMLDivElement>(null);

  const [faqQuery, setFaqQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const [category, setCategory] = useState<'Refund' | 'Komplain Umum' | 'Lapor Penipuan'>('Refund');
  const [orderNumber, setOrderNumber] = useState('');
  const [complaintEmail, setComplaintEmail] = useState('');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const [lookupTicket, setLookupTicket] = useState('');
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.session && !googleUser && googleBtnRef.current) renderButtonInto(googleBtnRef.current);
  }, [auth.session, googleUser, renderButtonInto]);

  // Reconcile a Google sign-in into a customer account automatically
  useEffect(() => {
    if (googleUser && !auth.session) {
      auth.continueWithGoogle(googleUser.email, googleUser.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleUser]);

  const identity = auth.session ?? (googleUser ? { name: googleUser.name, email: googleUser.email } : null);

  const filteredFaq = faq.filter(
    (f) =>
      !faqQuery.trim() ||
      f.question.toLowerCase().includes(faqQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(faqQuery.toLowerCase())
  );

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = generateTicketNumber();
    setComplaints((prev) => [
      {
        id: `cp${Date.now()}`,
        ticketNumber: ticket,
        category,
        reporterName: identity?.name || 'Customer',
        reporterEmail: complaintEmail,
        description,
        status: 'diproses',
        submittedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    logActivity(`Komplain baru masuk dari ${complaintEmail} (${category})`);
    setSubmittedTicket(ticket);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = complaints.find((c) => c.ticketNumber.toLowerCase() === lookupTicket.trim().toLowerCase());
    setLookupResult(
      found
        ? found.status === 'selesai'
          ? 'Selesai'
          : found.status === 'menunggu-dokumen'
          ? 'Menunggu Dokumen'
          : 'Diproses'
        : 'Tidak ditemukan'
    );
  };

  const myMoments = identity ? momentPhotos.filter((p) => p.submitterEmail === identity.email) : [];
  const activeVotes = votes.filter((v) => (v.status ?? 'aktif') === 'aktif').slice(0, 3);

  // My chat conversation (created on first message)
  const myChat = identity ? chats.find((c) => c.customerEmail === identity.email) : null;

  const sendChatMessage = (text: string) => {
    if (!identity) return;
    setChats((prev) => {
      const existing = prev.find((c) => c.customerEmail === identity.email);
      const msg = { id: `m${Date.now()}`, from: 'customer' as const, text, time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) };
      if (existing) {
        return prev.map((c) => (c.id === existing.id ? { ...c, unread: true, messages: [...c.messages, msg] } : c));
      }
      return [
        { id: `chat${Date.now()}`, customerEmail: identity.email, customerName: identity.name, unread: true, messages: [msg] },
        ...prev,
      ];
    });
  };

  if (view === 'login') {
    return (
      <CustomerLogin
        login={auth.login}
        signup={auth.signup}
        continueWithGoogle={auth.continueWithGoogle}
        error={auth.error}
        onSuccess={() => setView('portal')}
        onBackHome={() => setView('portal')}
      />
    );
  }

  if (view === 'account' && auth.session) {
    return (
      <CustomerAccountPage
        account={auth.session}
        votes={votes}
        complaints={complaints}
        onUpdate={auth.updateProfile}
        onLogout={() => {
          auth.logout();
          setView('portal');
        }}
        onDeleteAccount={() => {
          auth.deleteAccount();
          setView('portal');
        }}
        onBack={() => setView('portal')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBackHome} className="text-[#565e74] hover:text-[#191c1e] cursor-pointer" aria-label="Kembali">
            <ArrowLeft size={20} />
          </button>
          <span className="text-[19px] font-bold tracking-tight">
            <span className="text-[#dc2626]">yourtix</span>
            <span className="text-[#191c1e]">side</span>
          </span>
          <span className="text-[13px] font-semibold text-[#94a3b8] ml-1">Portal Customer</span>

          <div className="ml-auto">
            {auth.session ? (
              <button onClick={() => setView('account')} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#191c1e] hover:text-[#dc2626] cursor-pointer">
                <UserCircle size={18} />
                {auth.session.name.split(' ')[0]}
              </button>
            ) : googleUser ? (
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#191c1e]">
                <UserCircle size={18} />
                {googleUser.name.split(' ')[0]}
              </span>
            ) : (
              <button onClick={() => setView('login')} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#dc2626] hover:underline cursor-pointer">
                <UserCircle size={18} />
                Masuk / Akun Saya
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* FAQ */}
        <section>
          <h1 className="text-[24px] font-extrabold text-[#191c1e] tracking-tight mb-1">Pusat Bantuan</h1>
          <p className="text-[13.5px] text-[#565e74] mb-5">Cari jawaban tanpa perlu chat CS.</p>

          <label className="relative block mb-5">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              value={faqQuery}
              onChange={(e) => setFaqQuery(e.target.value)}
              placeholder="Cari pertanyaan (refund, verifikasi tiket, transfer...)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]"
            />
          </label>

          <div className="space-y-2">
            {filteredFaq.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                <button onClick={() => setOpenFaqId(openFaqId === f.id ? null : f.id)} className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left cursor-pointer">
                  <span className="text-[13.5px] font-semibold text-[#191c1e]">{f.question}</span>
                  <ChevronDown size={16} className={`text-[#94a3b8] shrink-0 transition-transform ${openFaqId === f.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaqId === f.id && <div className="px-4 pb-4 text-[13px] text-[#565e74] leading-[20px]">{f.answer}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section>
          <h2 className="text-[19px] font-bold text-[#191c1e] mb-4">Panduan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {GUIDES.map((g, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] p-4">
                <span className="w-9 h-9 rounded-lg bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mb-3">
                  <g.icon size={16} />
                </span>
                <h3 className="text-[13.5px] font-bold text-[#191c1e] mb-1">{g.title}</h3>
                <p className="text-[12px] text-[#565e74] leading-[18px]">{g.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Complaint form + status check */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[15px] font-bold text-[#191c1e] mb-1">Form Refund / Komplain</h2>
            <p className="text-[12.5px] text-[#565e74] mb-4">Tidak perlu punya akun untuk melapor.</p>

            {submittedTicket ? (
              <div className="rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] p-4">
                <p className="text-[13px] font-bold text-[#065f46]">Laporan terkirim!</p>
                <p className="text-[12px] text-[#047857] mt-1">
                  Nomor tiket Anda: <span className="font-mono font-bold">{submittedTicket}</span>. Simpan untuk cek status — laporan ini langsung masuk ke antrian tim kami.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitComplaint} className="space-y-3">
                <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]">
                  <option>Refund</option>
                  <option>Komplain Umum</option>
                  <option>Lapor Penipuan</option>
                </select>
                <input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="Nomor Order" required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <input type="email" value={complaintEmail} onChange={(e) => setComplaintEmail(e.target.value)} placeholder="Email Pembelian" required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px]" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Jelaskan masalah Anda" rows={3} required className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] resize-none" />
                <button className="inline-flex items-center gap-2 bg-[#dc2626] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#b91c1c] transition-colors cursor-pointer">
                  <Send size={14} />
                  Kirim Laporan
                </button>
              </form>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[15px] font-bold text-[#191c1e] mb-1">Cek Status Laporan</h2>
            <p className="text-[12.5px] text-[#565e74] mb-4">Pantau progres tanpa harus tanya CS berulang.</p>
            <form onSubmit={handleLookup} className="flex items-center gap-2 mb-4">
              <input value={lookupTicket} onChange={(e) => setLookupTicket(e.target.value)} placeholder="cth. YTX-482910" className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] focus:border-[#dc2626] outline-none text-[13.5px] font-mono" />
              <button className="w-11 h-11 rounded-xl bg-[#191c1e] text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer shrink-0">
                <FileSearch size={16} />
              </button>
            </form>
            {lookupResult && (
              <div className="rounded-xl bg-[#fbfaff] border border-[#ece9f5] p-3.5 text-center">
                <span className="text-[11.5px] font-semibold text-[#94a3b8]">Status Laporan</span>
                <div className="text-[16px] font-extrabold text-[#dc2626] mt-1">{lookupResult}</div>
              </div>
            )}
          </div>
        </section>

        {/* Voting */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Vote size={18} className="text-[#dc2626]" />
            <h2 className="text-[19px] font-bold text-[#191c1e]">Ikut Voting</h2>
          </div>
          <p className="text-[13px] text-[#565e74] mb-4">
            Vote dibuat oleh Event Creator — butuh login Google, 1 email hanya bisa vote sekali per polling.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {activeVotes.map((p) => (
              <button key={p.id} onClick={() => onOpenVote(p.id)} className="text-left bg-white rounded-xl border border-[#e2e8f0] p-4 hover:border-[#dc2626] hover:shadow-sm transition-all cursor-pointer">
                <h3 className="text-[13px] font-bold text-[#191c1e] leading-snug line-clamp-2 mb-2">{p.question}</h3>
                <p className="text-[11.5px] text-[#94a3b8]">Berakhir dalam {p.closesLabel}</p>
              </button>
            ))}
          </div>
        </section>

        {/* My Moments */}
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Camera size={18} className="text-[#dc2626]" />
            <h2 className="text-[19px] font-bold text-[#191c1e]">Galeri Momen Saya</h2>
          </div>
          <p className="text-[13px] text-[#565e74] mb-4">Foto dari sesi Take a Moment yang tersambung ke email akun Anda.</p>

          {!identity ? (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 text-center">
              <p className="text-[13px] text-[#565e74] mb-4">Masuk dengan Google untuk melihat galeri momen Anda.</p>
              <div ref={googleBtnRef} className="flex justify-center min-h-[44px]" />
            </div>
          ) : myMoments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 text-center">
              <Sparkles size={22} className="text-[#dc2626] mx-auto mb-2" />
              <p className="text-[13px] text-[#565e74]">
                Belum ada foto yang tersambung ke <span className="font-semibold">{identity.email}</span>.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {myMoments.map((p) => (
                <div key={p.id} className="rounded-xl overflow-hidden border border-[#e2e8f0]">
                  <div className="aspect-square bg-[#f1f5f9]">
                    <img src={p.photo} alt={p.caption} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11.5px] text-[#565e74] p-2 truncate flex items-center gap-1">
                    <Mail size={10} />
                    {p.caption}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <LiveChatWidget identityEmail={identity?.email} chat={myChat} onSend={sendChatMessage} />
    </div>
  );
};
