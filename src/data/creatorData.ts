/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock data for the Event Creator dashboard. Nothing here talks to a real
 * backend yet — every "action" (sign, publish, approve) just mutates local
 * React state for the session. Replace with real API calls once the
 * Event Creator backend exists.
 */

export type DocStatus = 'pending' | 'signed' | 'rejected';

export interface LegalDocument {
  id: string;
  name: string;
  type: 'MOU' | 'TNC EO' | 'Form Rekening' | 'Surat Kuasa' | 'NDA Sponsor';
  status: DocStatus;
  updatedAt: string;
  signedAt?: string;
  signedIp?: string;
}

export const legalDocuments: LegalDocument[] = [
  { id: 'doc1', name: 'MOU Kerjasama Musim 2026', type: 'MOU', status: 'signed', updatedAt: '2026-08-02', signedAt: '2026-08-03', signedIp: '114.10.22.8' },
  { id: 'doc2', name: 'TNC Event Organizer v3', type: 'TNC EO', status: 'signed', updatedAt: '2026-07-20', signedAt: '2026-07-21', signedIp: '114.10.22.8' },
  { id: 'doc3', name: 'Form Pernyataan Rekening Pencairan', type: 'Form Rekening', status: 'pending', updatedAt: '2026-09-10' },
  { id: 'doc4', name: 'Surat Kuasa Pencairan Dana', type: 'Surat Kuasa', status: 'pending', updatedAt: '2026-09-12' },
  { id: 'doc5', name: 'NDA Sponsor - Kabut Records', type: 'NDA Sponsor', status: 'rejected', updatedAt: '2026-09-05' },
];

export interface CalendarBooking {
  date: string; // ISO date
  eventName: string;
  venue: string;
}

export const calendarBookings: CalendarBooking[] = [
  { date: '2026-09-20', eventName: 'Weekend Art Market', venue: 'Taman Sari Creative Yard' },
  { date: '2026-09-25', eventName: 'Comedy Night Live', venue: 'Sunset Rooftop Bar' },
  { date: '2026-09-28', eventName: 'Founders Meetup Vol. 9', venue: 'Kolektiv Coworking' },
  { date: '2026-10-02', eventName: 'Jazz Under the Stars', venue: 'Taman Budaya Bandung' },
  { date: '2026-10-18', eventName: 'City Night Run 5K', venue: 'Taman Bungkul' },
  { date: '2026-11-14', eventName: 'Summer Sound Fest', venue: 'Prambanan Open Field' },
];

export interface BrandAsset {
  id: string;
  name: string;
  kind: 'Logo' | 'Banner Promosi' | 'Template Poster' | 'Brand Guideline';
  fileType: string;
  size: string;
}

export const brandAssets: BrandAsset[] = [
  { id: 'a1', name: 'Logo Yourtix (Primary)', kind: 'Logo', fileType: 'SVG', size: '48 KB' },
  { id: 'a2', name: 'Logo Yourtix (Monokrom)', kind: 'Logo', fileType: 'SVG', size: '31 KB' },
  { id: 'a3', name: 'Banner Promosi - Landscape', kind: 'Banner Promosi', fileType: 'PNG', size: '2.1 MB' },
  { id: 'a4', name: 'Banner Promosi - Story', kind: 'Banner Promosi', fileType: 'PNG', size: '1.4 MB' },
  { id: 'a5', name: 'Template Poster A3', kind: 'Template Poster', fileType: 'PSD', size: '18 MB' },
  { id: 'a6', name: 'Brand Guideline 2026', kind: 'Brand Guideline', fileType: 'PDF', size: '4.6 MB' },
];

export type VoteStatus = 'draf' | 'aktif' | 'selesai';

export interface EOVoteCandidate {
  id: string;
  name: string;
  photo: string;
  description: string;
  votes: number;
}

export interface EOVote {
  id: string;
  title: string;
  relatedEvent: string;
  startDate: string;
  endDate: string;
  ruleType: 'single' | 'max-n' | 'min-n' | 'unlimited';
  maxN?: number;
  minN?: number;
  showResultsPublicly: boolean;
  status: VoteStatus;
  candidates: EOVoteCandidate[];
}

export const eoVotes: EOVote[] = [
  {
    id: 'ev1',
    title: 'Penampil Penutup Summer Sound Fest',
    relatedEvent: 'Summer Sound Fest',
    startDate: '2026-09-01',
    endDate: '2026-11-13',
    ruleType: 'single',
    showResultsPublicly: true,
    status: 'aktif',
    candidates: [
      { id: 'c1', name: 'Senja Collective', photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80', description: 'Indie folk enam personel', votes: 842 },
      { id: 'c2', name: 'Kabut Records DJ Set', photo: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b31b?w=200&q=80', description: 'Kolektif elektronik', votes: 613 },
    ],
  },
  {
    id: 'ev2',
    title: 'Kota Tujuan Founders Meetup Berikutnya',
    relatedEvent: 'Founders Meetup Vol. 9',
    startDate: '2026-09-15',
    endDate: '2026-10-05',
    ruleType: 'max-n',
    maxN: 2,
    showResultsPublicly: true,
    status: 'aktif',
    candidates: [
      { id: 'c3', name: 'Semarang', photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=200&q=80', description: 'Kota tujuan ekspansi', votes: 301 },
      { id: 'c4', name: 'Malang', photo: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=200&q=80', description: 'Kota tujuan ekspansi', votes: 275 },
    ],
  },
  {
    id: 'ev3',
    title: 'Desain Medali Finisher City Night Run',
    relatedEvent: 'City Night Run 5K',
    startDate: '2026-08-01',
    endDate: '2026-08-20',
    ruleType: 'single',
    showResultsPublicly: false,
    status: 'selesai',
    candidates: [
      { id: 'c5', name: 'Desain A - Minimalis', photo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&q=80', description: 'Konsep minimalis monokrom', votes: 512 },
      { id: 'c6', name: 'Desain B - Neon', photo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&q=80', description: 'Konsep neon malam hari', votes: 467 },
    ],
  },
  {
    id: 'ev4',
    title: 'Rundown Sesi Komedi Tambahan',
    relatedEvent: 'Comedy Night Live',
    startDate: '',
    endDate: '',
    ruleType: 'unlimited',
    showResultsPublicly: false,
    status: 'draf',
    candidates: [],
  },
];

export type FormStatus = 'aktif' | 'tutup';

export interface EOFormField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown' | 'checkbox' | 'radio' | 'upload' | 'date' | 'number' | 'email';
  required: boolean;
}

export interface EOFormSubmission {
  id: string;
  submitterName: string;
  submitterEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface EOForm {
  id: string;
  title: string;
  template: 'Volunteer' | 'Tenant/Bazaar' | 'Media Partner' | 'Kosong';
  status: FormStatus;
  quota?: number;
  openDate: string;
  closeDate: string;
  fields: EOFormField[];
  submissions: EOFormSubmission[];
}

export const eoForms: EOForm[] = [
  {
    id: 'f1',
    title: 'Pendaftaran Volunteer Summer Sound Fest',
    template: 'Volunteer',
    status: 'aktif',
    quota: 60,
    openDate: '2026-09-01',
    closeDate: '2026-11-10',
    fields: [
      { id: 'ff1', label: 'Nama Lengkap', type: 'text', required: true },
      { id: 'ff2', label: 'Email', type: 'email', required: true },
      { id: 'ff3', label: 'Divisi yang Diminati', type: 'dropdown', required: true },
      { id: 'ff4', label: 'Pengalaman Volunteer Sebelumnya', type: 'textarea', required: false },
      { id: 'ff5', label: 'Unggah CV', type: 'upload', required: false },
    ],
    submissions: [
      { id: 's1', submitterName: 'Wulan Sari', submitterEmail: 'wulan.sari@example.com', submittedAt: '2026-09-11', status: 'approved' },
      { id: 's2', submitterName: 'Fadli Rahman', submitterEmail: 'fadli.r@example.com', submittedAt: '2026-09-12', status: 'pending' },
      { id: 's3', submitterName: 'Intan Permata', submitterEmail: 'intan.p@example.com', submittedAt: '2026-09-13', status: 'pending' },
    ],
  },
  {
    id: 'f2',
    title: 'Pendaftaran Tenant Bazaar Weekend Art Market',
    template: 'Tenant/Bazaar',
    status: 'aktif',
    quota: 40,
    openDate: '2026-08-20',
    closeDate: '2026-09-18',
    fields: [
      { id: 'ff6', label: 'Nama Usaha', type: 'text', required: true },
      { id: 'ff7', label: 'Kategori Produk', type: 'radio', required: true },
      { id: 'ff8', label: 'Kebutuhan Listrik', type: 'checkbox', required: false },
      { id: 'ff9', label: 'Nomor WhatsApp', type: 'text', required: true },
    ],
    submissions: [
      { id: 's4', submitterName: 'Kopi Ranting', submitterEmail: 'koperanting@example.com', submittedAt: '2026-09-01', status: 'approved' },
      { id: 's5', submitterName: 'Batik Senja', submitterEmail: 'batiksenja@example.com', submittedAt: '2026-09-03', status: 'rejected' },
    ],
  },
  {
    id: 'f3',
    title: 'Media Partner Founders Meetup Vol. 9',
    template: 'Media Partner',
    status: 'tutup',
    openDate: '2026-08-01',
    closeDate: '2026-09-01',
    fields: [
      { id: 'ff10', label: 'Nama Media', type: 'text', required: true },
      { id: 'ff11', label: 'Jangkauan Audiens', type: 'number', required: false },
    ],
    submissions: [
      { id: 's6', submitterName: 'Kampus Digest', submitterEmail: 'redaksi@kampusdigest.example', submittedAt: '2026-08-15', status: 'approved' },
    ],
  },
];

export interface MomentSession {
  id: string;
  name: string;
  relatedEvent: string;
  rateLimitPerEmail: number;
  photosIn: number;
}

export const momentSessions: MomentSession[] = [
  { id: 'ms1', name: 'Booth Foto Panggung Utama', relatedEvent: 'Summer Sound Fest', rateLimitPerEmail: 5, photosIn: 214 },
  { id: 'ms2', name: 'Booth Foto Area Kuliner', relatedEvent: 'Weekend Art Market', rateLimitPerEmail: 3, photosIn: 87 },
];

export interface MomentPhoto {
  id: string;
  sessionId: string;
  photo: string;
  caption: string;
  linkedAccount: boolean;
  submitterEmail?: string;
}

export const momentPhotos: MomentPhoto[] = [
  { id: 'mp1', sessionId: 'ms1', photo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', caption: 'Keseruan di panggung utama!', linkedAccount: true, submitterEmail: 'wulan.sari@example.com' },
  { id: 'mp2', sessionId: 'ms1', photo: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80', caption: 'Crowd surfing moment', linkedAccount: false },
  { id: 'mp3', sessionId: 'ms1', photo: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80', caption: 'Sunset before the show', linkedAccount: true, submitterEmail: 'fadli.r@example.com' },
  { id: 'mp4', sessionId: 'ms2', photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', caption: 'Jajanan favorit hari ini', linkedAccount: false },
];

export interface SponsorshipSubmission {
  id: string;
  reportNumber: string;
  eventName: string;
  sponsorName: string;
  cooperationType: string;
  submittedAt: string;
  status: 'diajukan' | 'diproses' | 'disetujui' | 'ditolak';
}

export const sponsorshipSubmissions: SponsorshipSubmission[] = [
  { id: 'sp1', reportNumber: 'SPN-2026-0091', eventName: 'Summer Sound Fest', sponsorName: 'Kabut Records', cooperationType: 'Sponsor Panggung Utama', submittedAt: '2026-08-25', status: 'disetujui' },
  { id: 'sp2', reportNumber: 'SPN-2026-0104', eventName: 'Founders Meetup Vol. 9', sponsorName: 'Kolektiv Coworking', cooperationType: 'Sponsor Tempat', submittedAt: '2026-09-08', status: 'diproses' },
];

export interface EventChangeRequest {
  id: string;
  eventName: string;
  requestedChange: string;
  submittedAt: string;
  status: 'diajukan' | 'diproses' | 'disetujui' | 'ditolak';
}

export const eventChangeRequests: EventChangeRequest[] = [
  { id: 'ec1', eventName: 'Jazz Under the Stars', requestedChange: 'Pindah venue dari Taman Budaya ke Gedung Kesenian karena renovasi', submittedAt: '2026-09-10', status: 'diproses' },
];
