/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE DATA LAYER. This is what makes the four portals (Landing,
 * Customer, Event Creator, Superadmin) actually talk to each other in a
 * UI/UX-first prototype with no real backend: every shared collection
 * lives here, in React state persisted to localStorage, instead of each
 * portal reading its own disconnected mock array. When a real backend
 * exists, each collection below becomes an API resource instead.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Poll, polls as seedPollsData } from '../data/polls';
import { EventItem, events as seedEventsData } from '../data/events';

/* ---------------------------------- Types --------------------------------- */

export type DocStatus = 'pending' | 'signed' | 'rejected';

export interface SharedDocument {
  id: string;
  eoId: string;
  eoName: string;
  name: string;
  type: 'MOU' | 'TNC EO' | 'Form Rekening' | 'Surat Kuasa' | 'NDA Sponsor';
  status: DocStatus;
  submittedAt: string;
  signedAt?: string;
  signedIp?: string;
}

export type ComplaintCategory = 'Refund' | 'Komplain Umum' | 'Lapor Penipuan';
export type ComplaintStatus = 'diproses' | 'menunggu-dokumen' | 'selesai';

export interface SharedComplaint {
  id: string;
  ticketNumber: string;
  category: ComplaintCategory;
  reporterName: string;
  reporterEmail: string;
  description: string;
  status: ComplaintStatus;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  from: 'customer' | 'agent';
  text: string;
  time: string;
}

export interface SharedChat {
  id: string;
  customerEmail: string;
  customerName: string;
  unread: boolean;
  messages: ChatMessage[];
}

export type AccountStatus = 'aktif' | 'nonaktif' | 'suspend';
export type EOVerificationStatus = 'verified' | 'pending' | 'rejected';

export interface EOAccount {
  id: string;
  email: string;
  password: string; // prototype only — plaintext local compare, never do this with a real backend
  picName: string; // penanggung jawab
  orgName: string;
  phone: string;
  ktpFileName?: string;
  npwpFileName?: string;
  bankName?: string;
  bankAccount?: string;
  billingEmail?: string;
  businessType?: string;
  eventCategory?: string;
  bio?: string;
  orgAddress?: string;
  socials?: string;
  logo?: string;
  verificationStatus: EOVerificationStatus;
  accountStatus: AccountStatus;
  loginMethod: 'manual' | 'google';
  joinedAt: string;
  activeEvents: number;
  team: { id: string; email: string; role: string }[];
}

export interface CustomerAccount {
  id: string;
  email: string;
  password: string; // prototype only
  name: string;
  phone?: string;
  address?: string;
  birthDate?: string;
  gender?: string;
  photo?: string;
  accountStatus: AccountStatus;
  loginMethod: 'manual' | 'google';
  joinedAt: string;
  notifyEmail: { votes: boolean; complaints: boolean; promo: boolean };
  notifyWhatsapp: boolean;
  language: 'id' | 'en';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  pinned: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface MinisiteLink {
  id: string;
  label: string;
  url: string;
}

export interface Minisite {
  id: string;
  eoId: string;
  slug: string;
  title: string;
  bio: string;
  avatar: string;
  coverImage: string;
  links: MinisiteLink[];
}

export interface Banner {
  id: string;
  imageUrl?: string;
  videoUrl?: string;
  title: string;
  subtitle?: string;
  link?: string;
  order: number;
}

export interface SystemStatus {
  status: 'normal' | 'maintenance' | 'gangguan';
  message: string;
}

export interface ActivityLogEntry {
  id: string;
  text: string;
  time: string;
}

export interface AccountAuditEntry {
  id: string;
  accountId: string;
  accountKind: 'eo' | 'customer';
  action: string;
  reason?: string;
  by: string;
  at: string;
}

/* ------------------------------- Seed data -------------------------------- */

const seedDocuments: SharedDocument[] = [
  { id: 'doc1', eoId: 'eo-seed-1', eoName: 'Kolektif Nada Kampus', name: 'MOU Kerjasama Musim 2026', type: 'MOU', status: 'signed', submittedAt: '2026-08-02', signedAt: '2026-08-03', signedIp: '114.10.22.8' },
  { id: 'doc2', eoId: 'eo-seed-1', eoName: 'Kolektif Nada Kampus', name: 'TNC Event Organizer v3', type: 'TNC EO', status: 'signed', submittedAt: '2026-07-20', signedAt: '2026-07-21', signedIp: '114.10.22.8' },
  { id: 'doc3', eoId: 'eo-seed-1', eoName: 'Kolektif Nada Kampus', name: 'Form Pernyataan Rekening Pencairan', type: 'Form Rekening', status: 'pending', submittedAt: '2026-09-10' },
  { id: 'doc4', eoId: 'eo-seed-1', eoName: 'Kolektif Nada Kampus', name: 'Surat Kuasa Pencairan Dana', type: 'Surat Kuasa', status: 'pending', submittedAt: '2026-09-12' },
  { id: 'doc5', eoId: 'eo-seed-2', eoName: 'Surabaya Run Community', name: 'NDA Sponsor - Local Bank', type: 'NDA Sponsor', status: 'rejected', submittedAt: '2026-09-05' },
];

const seedComplaints: SharedComplaint[] = [
  { id: 'cp1', ticketNumber: 'YTX-482910', category: 'Refund', reporterName: 'Melati Ayu', reporterEmail: 'melati.ayu@example.com', description: 'Event dibatalkan, minta refund penuh', status: 'menunggu-dokumen', submittedAt: '2026-09-08' },
  { id: 'cp2', ticketNumber: 'YTX-482911', category: 'Komplain Umum', reporterName: 'Bagas Wicaksono', reporterEmail: 'bagas.w@example.com', description: 'Antrian masuk venue terlalu lama', status: 'diproses', submittedAt: '2026-09-11' },
  { id: 'cp3', ticketNumber: 'YTX-482912', category: 'Lapor Penipuan', reporterName: 'Siti Rahma', reporterEmail: 'siti.rahma@example.com', description: 'Ada akun jual tiket palsu mengatasnamakan event ini', status: 'diproses', submittedAt: '2026-09-13' },
];

const seedChats: SharedChat[] = [
  {
    id: 'chat1',
    customerEmail: 'dewi.a@example.com',
    customerName: 'Dewi Anggraini',
    unread: true,
    messages: [
      { id: 'm1', from: 'customer', text: 'Halo, tiket saya belum masuk email, gimana ya?', time: '10:02' },
      { id: 'm2', from: 'agent', text: 'Halo Kak Dewi, boleh minta nomor order-nya?', time: '10:03' },
    ],
  },
];

const seedEOAccounts: EOAccount[] = [
  {
    id: 'eo-seed-1',
    email: 'eo.demo@yourtix.internal',
    password: 'Nt7-vQe2-kzR',
    picName: 'Sarah Amelia',
    orgName: 'Kolektif Nada Kampus',
    phone: '0812-3456-7890',
    ktpFileName: 'ktp_sarah_amelia.jpg',
    npwpFileName: 'npwp_kolektif_nada.pdf',
    bankName: 'BCA',
    bankAccount: '1234567890',
    billingEmail: 'finance@kolektifnadakampus.example',
    businessType: 'CV',
    eventCategory: 'Musik & Komunitas',
    bio: 'Kolektif event musik kampus yang berdiri sejak 2023.',
    orgAddress: 'Jl. Kaliurang KM 7, Yogyakarta',
    socials: '@kolektifnadakampus',
    verificationStatus: 'verified',
    accountStatus: 'aktif',
    loginMethod: 'manual',
    joinedAt: '2026-06-01',
    activeEvents: 2,
    team: [],
  },
  {
    id: 'eo-seed-2',
    email: 'contact@surabayarun.example',
    password: 'demo-pass',
    picName: 'Bagas Wicaksono',
    orgName: 'Surabaya Run Community',
    phone: '0813-1111-2222',
    verificationStatus: 'pending',
    accountStatus: 'aktif',
    loginMethod: 'manual',
    joinedAt: '2026-09-01',
    activeEvents: 1,
    team: [],
  },
];

const seedCustomerAccounts: CustomerAccount[] = [
  {
    id: 'cust-seed-1',
    email: 'melati.ayu@example.com',
    password: 'demo-pass',
    name: 'Melati Ayu',
    accountStatus: 'aktif',
    loginMethod: 'manual',
    joinedAt: '2026-08-01',
    notifyEmail: { votes: true, complaints: true, promo: false },
    notifyWhatsapp: false,
    language: 'id',
  },
];

const seedTestimonials: Testimonial[] = [
  { id: 't1', name: 'Reza Firmansyah', role: 'Event Creator', content: 'Proses approval dokumen jadi jauh lebih cepat sejak pakai E-Signature Hub.', status: 'approved', pinned: true },
  { id: 't2', name: 'Nadia Kusuma', role: 'Customer', content: 'Refund saya diproses dalam 3 hari, respon CS juga cepat.', status: 'pending', pinned: false },
  { id: 't3', name: 'Yoga Pratama', role: 'Event Creator', content: 'Fitur votingnya bikin engagement komunitas kami naik drastis.', status: 'approved', pinned: true },
];

const seedFaq: FAQItem[] = [
  { id: 'faq1', question: 'Bagaimana cara mengajukan refund?', answer: 'Isi form Refund/Komplain di portal Customer dengan nomor order dan email pembelian, lalu pantau statusnya lewat Cek Status Laporan.', category: 'Refund' },
  { id: 'faq2', question: 'Bagaimana cara verifikasi tiket asli?', answer: 'Setiap tiket punya QR unik yang hanya bisa discan sekali di venue — cek juga watermark nama pembeli pada e-ticket.', category: 'Verifikasi Tiket' },
  { id: 'faq3', question: 'Bisakah tiket ditransfer ke orang lain?', answer: 'Bisa, lewat menu transfer tiket di email konfirmasi pembelian, maksimal 24 jam sebelum event dimulai.', category: 'Transfer Tiket' },
  { id: 'faq4', question: 'Bagaimana melaporkan penjual tiket palsu?', answer: 'Gunakan Form Refund/Komplain, pilih kategori "Lapor Penipuan", sertakan bukti tangkapan layar percakapan.', category: 'Laporan' },
];

const seedBanners: Banner[] = [
  {
    id: 'ban-test',
    title: 'TEST BANNER — Carousel Berfungsi ✅',
    subtitle: 'Kalau kamu lihat ini, komponen BannerCarousel jalan normal. Cek banner berikutnya untuk versi bergambar.',
    link: '',
    order: 0,
  },
  {
    id: 'ban1',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80',
    title: 'Semua Operasional Event, Satu Tempat',
    subtitle: 'Event Creator kelola event, Customer dapat bantuan cepat, Operasional tetap lancar.',
    link: '',
    order: 1,
  },
  {
    id: 'ban2',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80',
    title: 'Summer Sound Fest 2026',
    subtitle: 'Vote penampil favoritmu sekarang.',
    link: '/vote/v-headliner',
    order: 2,
  },
];

const seedMinisites: Minisite[] = [
  {
    id: 'ms-seed-1',
    eoId: 'eo-seed-1',
    slug: 'kolektifnadakampus',
    title: 'Kolektif Nada Kampus',
    bio: 'Event musik & komunitas kampus. Cek jadwal terbaru kami di bawah ini!',
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    links: [
      { id: 'l1', label: 'Tiket Summer Sound Fest', url: '/events/summer-sound-fest' },
      { id: 'l2', label: 'Vote Penampil Penutup', url: '/vote/campus-music-fest' },
      { id: 'l3', label: 'Instagram', url: 'https://instagram.com' },
    ],
  },
];

const seedActivity: ActivityLogEntry[] = [
  { id: 'ra1', text: 'Kolektif Nada Kampus mengajukan Form Pernyataan Rekening Pencairan', time: '10 menit lalu' },
  { id: 'ra2', text: 'Komplain baru masuk dari Siti Rahma (Lapor Penipuan)', time: '35 menit lalu' },
  { id: 'ra3', text: 'Surabaya Run Community mendaftar sebagai EO baru', time: '2 jam lalu' },
];

/* --------------------------------- Store ----------------------------------- */

interface AppStoreValue {
  votes: Poll[];
  setVotes: React.Dispatch<React.SetStateAction<Poll[]>>;
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  minisites: Minisite[];
  setMinisites: React.Dispatch<React.SetStateAction<Minisite[]>>;
  documents: SharedDocument[];
  setDocuments: React.Dispatch<React.SetStateAction<SharedDocument[]>>;
  complaints: SharedComplaint[];
  setComplaints: React.Dispatch<React.SetStateAction<SharedComplaint[]>>;
  chats: SharedChat[];
  setChats: React.Dispatch<React.SetStateAction<SharedChat[]>>;
  eoAccounts: EOAccount[];
  setEoAccounts: React.Dispatch<React.SetStateAction<EOAccount[]>>;
  customerAccounts: CustomerAccount[];
  setCustomerAccounts: React.Dispatch<React.SetStateAction<CustomerAccount[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  faq: FAQItem[];
  setFaq: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  banners: Banner[];
  setBanners: React.Dispatch<React.SetStateAction<Banner[]>>;
  systemStatus: SystemStatus;
  setSystemStatus: React.Dispatch<React.SetStateAction<SystemStatus>>;
  activityLog: ActivityLogEntry[];
  logActivity: (text: string) => void;
  accountAudit: AccountAuditEntry[];
  logAudit: (entry: Omit<AccountAuditEntry, 'id' | 'at'>) => void;
}

const AppStoreContext = createContext<AppStoreValue | null>(null);

function usePersistedState<T>(key: string, seed: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : seed;
    } catch {
      return seed;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* storage full or unavailable — prototype keeps running in-memory */
    }
  }, [key, state]);

  return [state, setState];
}

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [votes, setVotes] = usePersistedState<Poll[]>('ytx_store_votes', seedPollsData);
  const [events, setEvents] = usePersistedState<EventItem[]>('ytx_store_events', seedEventsData);
  const [minisites, setMinisites] = usePersistedState<Minisite[]>('ytx_store_minisites', seedMinisites);
  const [documents, setDocuments] = usePersistedState('ytx_store_documents', seedDocuments);
  const [complaints, setComplaints] = usePersistedState('ytx_store_complaints', seedComplaints);
  const [chats, setChats] = usePersistedState('ytx_store_chats', seedChats);
  const [eoAccounts, setEoAccounts] = usePersistedState('ytx_store_eo_accounts', seedEOAccounts);
  const [customerAccounts, setCustomerAccounts] = usePersistedState('ytx_store_customer_accounts', seedCustomerAccounts);
  const [testimonials, setTestimonials] = usePersistedState('ytx_store_testimonials', seedTestimonials);
  const [faq, setFaq] = usePersistedState('ytx_store_faq', seedFaq);
  const [banners, setBanners] = usePersistedState('ytx_store_banners_v2', seedBanners);
  const [systemStatus, setSystemStatus] = usePersistedState<SystemStatus>('ytx_store_system_status', {
    status: 'normal',
    message: '',
  });
  const [activityLog, setActivityLog] = usePersistedState('ytx_store_activity', seedActivity);
  const [accountAudit, setAccountAudit] = usePersistedState<AccountAuditEntry[]>('ytx_store_account_audit', []);

  const logActivity = useCallback(
    (text: string) => {
      setActivityLog((prev) => [{ id: `act${Date.now()}`, text, time: 'baru saja' }, ...prev].slice(0, 30));
    },
    [setActivityLog]
  );

  const logAudit = useCallback(
    (entry: Omit<AccountAuditEntry, 'id' | 'at'>) => {
      setAccountAudit((prev) =>
        [{ ...entry, id: `aud${Date.now()}`, at: new Date().toISOString().slice(0, 16).replace('T', ' ') }, ...prev].slice(0, 100)
      );
    },
    [setAccountAudit]
  );

  return (
    <AppStoreContext.Provider
      value={{
        votes,
        setVotes,
        events,
        setEvents,
        minisites,
        setMinisites,
        documents,
        setDocuments,
        complaints,
        setComplaints,
        chats,
        setChats,
        eoAccounts,
        setEoAccounts,
        customerAccounts,
        setCustomerAccounts,
        testimonials,
        setTestimonials,
        faq,
        setFaq,
        banners,
        setBanners,
        systemStatus,
        setSystemStatus,
        activityLog,
        logActivity,
        accountAudit,
        logAudit,
      }}
    >
      {children}
    </AppStoreContext.Provider>
  );
};

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within an AppStoreProvider');
  return ctx;
}
