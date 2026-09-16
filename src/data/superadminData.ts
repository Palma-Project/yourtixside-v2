/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock data for the Superadmin dashboard. Prototype only — actions mutate
 * local state for the session, nothing persists to a real backend yet.
 */

export interface DocRequest {
  id: string;
  eoName: string;
  docName: string;
  docType: string;
  status: 'pending' | 'signed' | 'rejected';
  submittedAt: string;
}

export const docRequests: DocRequest[] = [
  { id: 'dr1', eoName: 'Kolektif Nada Kampus', docName: 'Form Pernyataan Rekening Pencairan', docType: 'Form Rekening', status: 'pending', submittedAt: '2026-09-10' },
  { id: 'dr2', eoName: 'Kolektif Nada Kampus', docName: 'Surat Kuasa Pencairan Dana', docType: 'Surat Kuasa', status: 'pending', submittedAt: '2026-09-12' },
  { id: 'dr3', eoName: 'Bandung Youth Collective', docName: 'MOU Kerjasama Musim 2026', docType: 'MOU', status: 'signed', submittedAt: '2026-08-30' },
  { id: 'dr4', eoName: 'Surabaya Run Community', docName: 'NDA Sponsor - Local Bank', docType: 'NDA Sponsor', status: 'rejected', submittedAt: '2026-09-05' },
];

export interface DocumentType {
  id: string;
  name: string;
  version: string;
  lastUpdated: string;
}

export const documentTypes: DocumentType[] = [
  { id: 'dt1', name: 'MOU Kerjasama EO', version: 'v3', lastUpdated: '2026-07-01' },
  { id: 'dt2', name: 'TNC Event Organizer', version: 'v3', lastUpdated: '2026-07-01' },
  { id: 'dt3', name: 'Surat Kuasa Pencairan Dana', version: 'v1', lastUpdated: '2026-05-10' },
  { id: 'dt4', name: 'NDA Sponsor', version: 'v2', lastUpdated: '2026-06-18' },
];

export interface ChatMessage {
  id: string;
  from: 'customer' | 'agent';
  text: string;
  time: string;
}

export interface ChatConversation {
  id: string;
  customerName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: ChatMessage[];
}

export const chatConversations: ChatConversation[] = [
  {
    id: 'chat1',
    customerName: 'Dewi Anggraini',
    lastMessage: 'Tiket saya belum masuk email, gimana ya?',
    lastMessageTime: '2m',
    unread: true,
    messages: [
      { id: 'm1', from: 'customer', text: 'Halo, tiket saya belum masuk email, gimana ya?', time: '10:02' },
      { id: 'm2', from: 'agent', text: 'Halo Kak Dewi, boleh minta nomor order-nya?', time: '10:03' },
      { id: 'm3', from: 'customer', text: 'YTX-department-8827', time: '10:05' },
    ],
  },
  {
    id: 'chat2',
    customerName: 'Farhan Idris',
    lastMessage: 'Terima kasih banyak infonya!',
    lastMessageTime: '25m',
    unread: false,
    messages: [
      { id: 'm4', from: 'customer', text: 'Cara refund gimana ya kak?', time: '09:40' },
      { id: 'm5', from: 'agent', text: 'Bisa isi form refund di portal customer ya kak.', time: '09:42' },
      { id: 'm6', from: 'customer', text: 'Terima kasih banyak infonya!', time: '09:45' },
    ],
  },
  {
    id: 'chat3',
    customerName: 'Rangga Saputra',
    lastMessage: 'Venue-nya di mana persisnya?',
    lastMessageTime: '1j',
    unread: true,
    messages: [{ id: 'm7', from: 'customer', text: 'Venue-nya di mana persisnya?', time: '08:50' }],
  },
];

export type ComplaintCategory = 'Refund' | 'Komplain Umum' | 'Lapor Penipuan';
export type ComplaintStatus = 'diproses' | 'menunggu-dokumen' | 'selesai';

export interface Complaint {
  id: string;
  ticketNumber: string;
  category: ComplaintCategory;
  reporterName: string;
  reporterEmail: string;
  description: string;
  status: ComplaintStatus;
  submittedAt: string;
}

export const complaints: Complaint[] = [
  { id: 'cp1', ticketNumber: 'YTX-482910', category: 'Refund', reporterName: 'Melati Ayu', reporterEmail: 'melati.ayu@example.com', description: 'Event dibatalkan, minta refund penuh', status: 'menunggu-dokumen', submittedAt: '2026-09-08' },
  { id: 'cp2', ticketNumber: 'YTX-482911', category: 'Komplain Umum', reporterName: 'Bagas Wicaksono', reporterEmail: 'bagas.w@example.com', description: 'Antrian masuk venue terlalu lama', status: 'diproses', submittedAt: '2026-09-11' },
  { id: 'cp3', ticketNumber: 'YTX-482912', category: 'Lapor Penipuan', reporterName: 'Siti Rahma', reporterEmail: 'siti.rahma@example.com', description: 'Ada akun jual tiket palsu mengatasnamakan event ini', status: 'diproses', submittedAt: '2026-09-13' },
  { id: 'cp4', ticketNumber: 'YTX-482900', category: 'Refund', reporterName: 'Andi Pratama', reporterEmail: 'andi.p@example.com', description: 'Salah beli kategori tiket', status: 'selesai', submittedAt: '2026-08-29' },
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  { id: 'faq1', question: 'Bagaimana cara mengajukan refund?', answer: 'Isi form Refund/Komplain di portal Customer dengan nomor order dan email pembelian, lalu pantau statusnya lewat Cek Status Laporan.', category: 'Refund' },
  { id: 'faq2', question: 'Bagaimana cara verifikasi tiket asli?', answer: 'Setiap tiket punya QR unik yang hanya bisa discan sekali di venue — cek juga watermark nama pembeli pada e-ticket.', category: 'Verifikasi Tiket' },
  { id: 'faq3', question: 'Bisakah tiket ditransfer ke orang lain?', answer: 'Bisa, lewat menu transfer tiket di email konfirmasi pembelian, maksimal 24 jam sebelum event dimulai.', category: 'Transfer Tiket' },
  { id: 'faq4', question: 'Bagaimana melaporkan penjual tiket palsu?', answer: 'Gunakan Form Refund/Komplain, pilih kategori "Lapor Penipuan", sertakan bukti tangkapan layar percakapan.', category: 'Laporan' },
];

export interface BlogPost {
  id: string;
  title: string;
  status: 'published' | 'draft';
  publishedAt?: string;
}

export const blogPosts: BlogPost[] = [
  { id: 'bp1', title: '5 Tips Menghindari Tiket Palsu', status: 'published', publishedAt: '2026-08-20' },
  { id: 'bp2', title: 'Cara Kerja Sistem Voting di YourtixSide', status: 'published', publishedAt: '2026-09-01' },
  { id: 'bp3', title: 'Panduan EO Baru: Dari Nol ke Event Pertama', status: 'draft' },
];

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  pinned: boolean;
}

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Reza Firmansyah', role: 'Event Creator', content: 'Proses approval dokumen jadi jauh lebih cepat sejak pakai E-Signature Hub.', status: 'approved', pinned: true },
  { id: 't2', name: 'Nadia Kusuma', role: 'Customer', content: 'Refund saya diproses dalam 3 hari, respon CS juga cepat.', status: 'pending', pinned: false },
  { id: 't3', name: 'Yoga Pratama', role: 'Event Creator', content: 'Fitur votingnya bikin engagement komunitas kami naik drastis.', status: 'pending', pinned: false },
];

export interface EOProfile {
  id: string;
  name: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  activeEvents: number;
  joinedAt: string;
}

export const eoProfiles: EOProfile[] = [
  { id: 'eo1', name: 'Kolektif Nada Kampus', verificationStatus: 'verified', activeEvents: 2, joinedAt: '2026-06-01' },
  { id: 'eo2', name: 'Bandung Youth Collective', verificationStatus: 'verified', activeEvents: 1, joinedAt: '2026-05-14' },
  { id: 'eo3', name: 'Surabaya Run Community', verificationStatus: 'pending', activeEvents: 1, joinedAt: '2026-09-01' },
  { id: 'eo4', name: 'Kemenparekraf Hub', verificationStatus: 'verified', activeEvents: 3, joinedAt: '2026-03-20' },
];

export interface GlobalVoteRow {
  id: string;
  title: string;
  eoName: string;
  status: 'draf' | 'aktif' | 'selesai';
  totalVotes: number;
}

export const globalVotes: GlobalVoteRow[] = [
  { id: 'gv1', title: 'Penampil Penutup Summer Sound Fest', eoName: 'Kolektif Nada Kampus', status: 'aktif', totalVotes: 1455 },
  { id: 'gv2', title: 'Kota Tujuan Founders Meetup Berikutnya', eoName: 'Kolektif Nada Kampus', status: 'aktif', totalVotes: 576 },
  { id: 'gv3', title: 'Desain Medali Finisher City Night Run', eoName: 'Surabaya Run Community', status: 'selesai', totalVotes: 979 },
  { id: 'gv4', title: 'Youth Ambassador Awards 2024', eoName: 'Kemenparekraf Hub', status: 'aktif', totalVotes: 48250 },
];

export interface StaffMember {
  id: string;
  name: string;
  role: 'Superadmin' | 'CS Staff' | 'Content Staff' | 'Finance Staff';
  modules: string[];
}

export const staffMembers: StaffMember[] = [
  { id: 'st1', name: 'Bimo Setiawan', role: 'Superadmin', modules: ['Semua modul'] },
  { id: 'st2', name: 'Anisa Putri', role: 'CS Staff', modules: ['Live Chat CS', 'Komplain & Refund'] },
  { id: 'st3', name: 'Doni Wijaya', role: 'Content Staff', modules: ['Konten', 'Testimoni & Review'] },
  { id: 'st4', name: 'Lestari Handayani', role: 'Finance Staff', modules: ['E-Signature', 'Portal EO'] },
];

export interface NeedsAttentionItem {
  id: string;
  label: string;
  detail: string;
}

export const needsAttention: NeedsAttentionItem[] = [
  { id: 'na1', label: 'Dokumen kedaluwarsa', detail: 'NDA Sponsor - Surabaya Run Community sudah 30 hari tanpa tindak lanjut' },
  { id: 'na2', label: 'Komplain lama', detail: 'Tiket YTX-482911 sudah 2 hari belum ada update status' },
  { id: 'na3', label: 'Testimoni pending', detail: '2 testimoni menunggu moderasi lebih dari seminggu' },
];

export interface RecentActivity {
  id: string;
  text: string;
  time: string;
}

export const recentActivity: RecentActivity[] = [
  { id: 'ra1', text: 'Kolektif Nada Kampus mengajukan Form Pernyataan Rekening Pencairan', time: '10 menit lalu' },
  { id: 'ra2', text: 'Komplain baru masuk dari Siti Rahma (Lapor Penipuan)', time: '35 menit lalu' },
  { id: 'ra3', text: 'Surabaya Run Community mendaftar sebagai EO baru', time: '2 jam lalu' },
  { id: 'ra4', text: 'Testimoni dari Yoga Pratama menunggu moderasi', time: '3 jam lalu' },
];
