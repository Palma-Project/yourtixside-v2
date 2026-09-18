/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock voting/poll data. Client-side prototype — the base `votes` counts
 * here are static; real-time deltas from votes cast in this browser are
 * layered on top via src/lib/voteStorage.ts. See
 * docs/VOTING_BACKEND_MIGRATION.md for the real-backend migration path.
 */

export interface ProgramItem {
  title: string;
  detail: string;
}

export interface RegionStat {
  region: string;
  votes: number;
}

export interface AgeStat {
  label: string;
  percent: number;
}

export interface Candidate {
  id: string;
  number: string;
  name: string;
  partnerName?: string;
  photo: string;
  tagline?: string;
  badge?: string;
  category?: string;
  region?: string;
  field?: string;
  score?: string;
  rankLabel?: string;
  summary: string;
  vision?: string;
  programs?: ProgramItem[];
  videoTitle?: string;
  videoDuration?: string;
  videoThumb?: string;
  videoCaption?: string;
  verified?: boolean;
  verifiedNote?: string;
  ageStats?: AgeStat[];
  regionStats?: RegionStat[];
  trendLabel?: string;
  votes: number;
}

export type SelectionType = 'single' | 'multi';

export interface PollCategory {
  id: string;
  label: string;
}

export interface TickerItem {
  name: string;
  city?: string;
  message: string;
  time: string;
  kind: 'vote' | 'system';
}

export interface Poll {
  id: string;
  eventId?: string;
  /* Cross-portal connection fields — which EO owns this vote, its
     draf/aktif/selesai lifecycle, and who has already cast a vote here. */
  eoId?: string;
  eoName?: string;
  status?: 'draf' | 'aktif' | 'selesai';
  votedEmails?: string[];

  /* Landing card */
  coverImage: string;
  categoryLabel: string;
  organizer: string;
  organizerVerified: boolean;
  seriesLabel: string;
  closesInLabel: string;
  statusBadge: string;
  accessLabel: string;
  accessValue: string;
  categoryCountLabel: string;

  /* Detail page */
  question: string;
  headlineLead: string;
  headlineAccent: string;
  headlineTail: string;
  description: string;
  eyebrow: string;
  periodLabel: string;
  closesLabel: string;
  finalistCount: number;
  ratioLabel: string;

  selectionType: SelectionType;
  minSelect: number;
  maxSelect: number;

  categories: PollCategory[];
  ticker: TickerItem[];
  candidates: Candidate[];
}

export const polls: Poll[] = [
  {
    id: 'youth-ambassador-2024',
    eoId: 'eo-seed-3',
    eoName: 'Kemenparekraf Hub',
    status: 'aktif',
    votedEmails: [],
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    categoryLabel: 'Award & Pageant',
    organizer: 'Kemenparekraf Hub',
    organizerVerified: true,
    seriesLabel: 'Grand Final',
    closesInLabel: '12 Jam',
    statusBadge: 'Fase Penentuan!',
    accessLabel: 'AKSES VOTE',
    accessValue: 'Gratis via Google',
    categoryCountLabel: '12 Finalis Terpilih',

    question: 'Youth Ambassador Awards 2024',
    headlineLead: 'Pilih Ambassador Favoritmu,',
    headlineAccent: 'Suaramu Menentukan',
    headlineTail: 'Pemenang!',
    description:
      'Berikan aspirasi terbaikmu dalam People\u2019s Choice Youth Ambassador 2024. Sistem voting aman, transparan, dan terverifikasi dengan prinsip 1 Akun Google = 1 Suara Sah.',
    eyebrow: 'Pemilihan Resmi Brand Ambassador 2024',
    periodLabel: 'Periode voting dibuka',
    closesLabel: '18 Jam',
    finalistCount: 12,
    ratioLabel: '1 Akun = 1 Suara Sah',

    selectionType: 'single',
    minSelect: 1,
    maxSelect: 1,

    categories: [
      { id: 'all', label: 'Semua Kandidat' },
      { id: 'utama', label: 'Duta Utama' },
      { id: 'favorit', label: 'Duta Favorit' },
      { id: 'lingkungan', label: 'Duta Lingkungan' },
      { id: 'inteligensia', label: 'Duta Inteligensia' },
    ],

    ticker: [
      { name: 'Andi Pratama', city: 'Jakarta', message: 'baru saja memberikan suara', time: '1m', kind: 'vote' },
      { name: 'Sistem Verifikasi Akun Google', message: 'Aktif \u2014 100% aman', time: '', kind: 'system' },
      { name: 'Siti Rahma', city: 'Bandung', message: 'telah memilih Kandidat #01', time: '3m', kind: 'vote' },
      { name: 'Bagas Wicaksono', city: 'Surabaya', message: 'baru saja memberikan suara', time: '5m', kind: 'vote' },
    ],

    candidates: [
      {
        id: 'c01',
        number: '01',
        name: 'Nadia Rahmawati',
        partnerName: 'M. Rafli Al-Farizi',
        photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        tagline: 'Siap Mengabdi',
        badge: 'Finalis Terpopuler',
        category: 'utama',
        region: 'Perwakilan DKI Jakarta & Jawa Barat',
        field: 'Creative & Social Impact',
        score: 'IPK 3.92',
        rankLabel: 'Top 1',
        summary:
          'Membangun ruang inklusif untuk literasi digital pemuda lintas jurusan demi pemberdayaan komunitas desa binaan.',
        vision:
          'Mendorong Generasi Kreatif Berdaya: Kolaborasi Ekosistem Digital Berkelanjutan, Inklusif, dan Memberikan Dampak Nyata bagi Masyarakat.',
        programs: [
          {
            title: 'Program Unggulan: Ruang Aman Berkarya (Satgas PPKS 2.0)',
            detail:
              'Penguatan posko pendampingan psikologis gratis 24 jam, perlindungan saksi berbasis transparansi data anonim, serta sosialisasi SOP etik organisasi mahasiswa bebas intimidasi dan perpeloncoan.',
          },
          {
            title: 'Program Unggulan: Dana Hibah Kreatif & Riset Kolaboratif',
            detail:
              'Skema pendanaan mikro untuk proyek riset lintas kampus, dengan kurasi terbuka dan laporan penggunaan dana yang bisa diakses publik.',
          },
          {
            title: 'Aspirasi Cepat Tanggap: Bot & Forum Terbuka 48 Jam',
            detail:
              'Kanal aspirasi berbasis bot dengan jaminan respons maksimal 48 jam, ditambah forum terbuka bulanan bersama perwakilan panitia.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
        videoCaption:
          'Dengarkan komitmen kami dalam mewujudkan kampus yang bebas kekerasan seksual, pendanaan riset transparan, dan ruang ekspresi inklusif.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 68 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 32 },
        ],
        regionStats: [
          { region: 'Jabodetabek', votes: 6450 },
          { region: 'Surabaya & Sekitarnya', votes: 4210 },
          { region: 'Bandung Raya', votes: 2870 },
        ],
        trendLabel: '+5.2% 2 jam terakhir',
        votes: 14820,
      },
      {
        id: 'c02',
        number: '02',
        name: 'Dimas Arya Pratama',
        partnerName: 'Aulia Kusuma',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        tagline: 'Inovator Hijau',
        badge: 'Inovator Hijau',
        category: 'lingkungan',
        region: 'Perwakilan Jawa Timur',
        field: 'Business & Health Advocate',
        score: 'IPK 3.88',
        rankLabel: 'Top 2',
        summary:
          'Menggagas transisi energi bersih di lingkungan asrama mahasiswa dan pengelolaan limbah plastik berbasis sensor.',
        vision:
          'Kampus Netral Karbon 2030: Transisi Energi Bersih, Pengelolaan Limbah Cerdas, dan Budaya Konsumsi Bertanggung Jawab.',
        programs: [
          {
            title: 'Program Unggulan: Campus Solar Project',
            detail:
              'Pemasangan panel surya bertahap di gedung fakultas dengan dasbor konsumsi energi yang terbuka untuk seluruh sivitas akademika.',
          },
          {
            title: 'Program Unggulan: Bank Sampah Digital',
            detail:
              'Sistem penukaran sampah terpilah berbasis poin, terintegrasi dengan koperasi mahasiswa dan mitra daur ulang lokal.',
          },
          {
            title: 'Edukasi Iklim Lintas Fakultas',
            detail:
              'Kurikulum pendamping dan lokakarya rutin mengenai jejak karbon pribadi, konsumsi bertanggung jawab, dan advokasi kebijakan hijau.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
        videoCaption:
          'Paparan singkat mengenai peta jalan kampus netral karbon dan pendanaan mandiri proyek energi terbarukan.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 72 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 28 },
        ],
        regionStats: [
          { region: 'Surabaya & Sekitarnya', votes: 5120 },
          { region: 'Malang Raya', votes: 3480 },
          { region: 'Jabodetabek', votes: 1960 },
        ],
        trendLabel: '+3.8% 2 jam terakhir',
        votes: 11230,
      },
      {
        id: 'c03',
        number: '03',
        name: 'Clara Aurelia',
        partnerName: 'Fauzan Arya',
        photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80',
        tagline: 'Duta Kesehatan',
        badge: 'Duta Kesehatan',
        category: 'utama',
        region: 'Perwakilan Bali & Nusa Tenggara',
        field: 'Mental Health Youth',
        score: 'IPK 3.95',
        rankLabel: 'Top 3',
        summary:
          'Gerakan konseling sebaya gratis dan kampanye kesadaran kesehatan mental komprehensif bagi seluruh mahasiswa.',
        vision:
          'Kesehatan Mental Bukan Privilese: Layanan Konseling Terjangkau, Literasi Psikologis, dan Ruang Aman untuk Semua.',
        programs: [
          {
            title: 'Program Unggulan: Konseling Sebaya Bersertifikat',
            detail:
              'Pelatihan konselor sebaya bersertifikasi psikolog profesional, tersedia di setiap fakultas dengan jadwal terbuka.',
          },
          {
            title: 'Program Unggulan: Skrining Mental Berkala',
            detail:
              'Skrining kesehatan mental gratis tiap semester, hasil bersifat rahasia dan disertai rujukan profesional bila diperlukan.',
          },
          {
            title: 'Kampanye Anti-Stigma Berkelanjutan',
            detail:
              'Serial diskusi publik dan konten edukasi untuk menekan stigma terhadap mahasiswa yang menjalani terapi atau pengobatan.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
        videoCaption:
          'Penjelasan mengenai skema layanan konseling gratis dan rencana kerja sama dengan rumah sakit pendidikan.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 75 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 25 },
        ],
        regionStats: [
          { region: 'Bali & Nusa Tenggara', votes: 3890 },
          { region: 'Jabodetabek', votes: 2740 },
          { region: 'Makassar Raya', votes: 1780 },
        ],
        trendLabel: '+2.1% 2 jam terakhir',
        votes: 8410,
      },
      {
        id: 'c04',
        number: '04',
        name: 'Reyhan Al-Farizi',
        partnerName: 'Tiara Salsabila',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
        tagline: 'Duta Wirausaha',
        badge: 'Duta Wirausaha',
        category: 'favorit',
        region: 'Perwakilan Sumatera',
        field: 'UMKM Digital Incubator',
        score: 'IPK 3.84',
        summary:
          'Fasilitasi modal ventura mini bagi usaha rintisan mahasiswa kreatif untuk meningkatkan kemandirian ekonomi kampus.',
        vision:
          'Kemandirian Ekonomi Mahasiswa: Inkubasi Usaha Rintisan, Akses Permodalan Terbuka, dan Jejaring Mentor Lintas Industri.',
        programs: [
          {
            title: 'Program Unggulan: Inkubator UMKM Digital',
            detail:
              'Pendampingan intensif enam bulan bagi usaha rintisan mahasiswa, mencakup legalitas, pembukuan, dan strategi pemasaran digital.',
          },
          {
            title: 'Program Unggulan: Dana Ventura Mikro',
            detail:
              'Skema permodalan awal dengan kurasi terbuka, disertai pelaporan berkala yang dapat diakses seluruh mahasiswa.',
          },
          {
            title: 'Jejaring Mentor Lintas Industri',
            detail:
              'Program mentoring rutin bersama alumni dan praktisi industri, dibuka untuk seluruh fakultas tanpa seleksi tertutup.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
        videoCaption:
          'Gambaran mekanisme pendanaan mikro dan target jumlah usaha rintisan yang akan didampingi tahun pertama.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 70 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 30 },
        ],
        regionStats: [
          { region: 'Medan & Sekitarnya', votes: 2740 },
          { region: 'Palembang Raya', votes: 1980 },
          { region: 'Jabodetabek', votes: 1400 },
        ],
        trendLabel: '+1.6% 2 jam terakhir',
        votes: 6120,
      },
      {
        id: 'c05',
        number: '05',
        name: 'Talitha Zahra',
        partnerName: 'Keisha Amanda',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        tagline: 'Duta Advokasi',
        badge: 'Duta Advokasi',
        category: 'inteligensia',
        region: 'Perwakilan Jawa Tengah & DIY',
        field: 'Bantuan Hukum Mahasiswa',
        score: 'IPK 3.91',
        summary:
          'Penguatan payung hukum anti-perundungan dan keterbukaan informasi publik dalam pengambilan kebijakan kampus.',
        vision:
          'Kampus Berkeadilan: Bantuan Hukum Gratis, Keterbukaan Informasi Publik, dan Partisipasi Mahasiswa dalam Setiap Kebijakan.',
        programs: [
          {
            title: 'Program Unggulan: Klinik Bantuan Hukum Mahasiswa',
            detail:
              'Layanan konsultasi hukum gratis bagi mahasiswa, didampingi dosen fakultas hukum dan advokat mitra.',
          },
          {
            title: 'Program Unggulan: Portal Keterbukaan Anggaran',
            detail:
              'Publikasi anggaran organisasi kemahasiswaan secara berkala dalam format yang mudah dibaca dan dapat diaudit publik.',
          },
          {
            title: 'Satgas Anti-Perundungan',
            detail:
              'Mekanisme pelaporan terlindungi disertai pendampingan hukum dan psikologis bagi pelapor dan saksi.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=800&q=80',
        videoCaption:
          'Penjelasan mekanisme klinik bantuan hukum dan komitmen keterbukaan anggaran organisasi kemahasiswaan.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 66 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 34 },
        ],
        regionStats: [
          { region: 'Yogyakarta & Solo', votes: 2210 },
          { region: 'Semarang Raya', votes: 1580 },
          { region: 'Jabodetabek', votes: 1100 },
        ],
        trendLabel: '+1.2% 2 jam terakhir',
        votes: 4890,
      },
      {
        id: 'c06',
        number: '06',
        name: 'Kevin Sanjaya',
        partnerName: 'Bagas Wicaksono',
        photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80',
        tagline: 'Duta Olahraga & Seni',
        badge: 'Duta Olahraga & Seni',
        category: 'favorit',
        region: 'Perwakilan Kalimantan',
        field: 'Esports & Atletik',
        score: 'IPK 3.82',
        summary:
          'Integrasi fasilitas olahraga berstandar nasional dan pengembangan talenta esports mahasiswa dikancah nasional.',
        vision:
          'Prestasi Tanpa Sekat: Fasilitas Olahraga Layak, Dukungan Talenta Esports, dan Panggung Terbuka bagi Seni Mahasiswa.',
        programs: [
          {
            title: 'Program Unggulan: Revitalisasi Fasilitas Olahraga',
            detail:
              'Perbaikan bertahap lapangan dan gelanggang kampus, dengan jadwal pemakaian terbuka dan gratis bagi seluruh mahasiswa.',
          },
          {
            title: 'Program Unggulan: Pembinaan Talenta Esports',
            detail:
              'Pembentukan tim resmi kampus, pendanaan turnamen, serta pelatihan manajemen karier atlet esports.',
          },
          {
            title: 'Panggung Seni Bulanan',
            detail:
              'Ruang tampil rutin bagi unit kegiatan seni, lengkap dengan dukungan produksi dan publikasi resmi kampus.',
          },
        ],
        videoTitle: 'Tonton Visi & Misi 60 Detik',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
        videoCaption:
          'Rencana revitalisasi fasilitas olahraga dan skema pembinaan atlet serta talenta esports kampus.',
        verified: true,
        verifiedNote: 'Lolos skrining integritas dan berkas akademik',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 78 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 22 },
        ],
        regionStats: [
          { region: 'Balikpapan & Samarinda', votes: 1240 },
          { region: 'Banjarmasin Raya', votes: 890 },
          { region: 'Jabodetabek', votes: 650 },
        ],
        trendLabel: '+0.9% 2 jam terakhir',
        votes: 2780,
      },
    ],
  },

  {
    id: 'digital-creator-awards',
    eoId: 'eo-seed-4',
    eoName: 'Youth Creator Hub ID',
    status: 'aktif',
    votedEmails: [],
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    categoryLabel: 'Creator & Media',
    organizer: 'Youth Creator Hub ID',
    organizerVerified: true,
    seriesLabel: 'Official Vote',
    closesInLabel: '5 Hari',
    statusBadge: 'Multi-Vote Aktif',
    accessLabel: 'METODE TIKET',
    accessValue: 'Paket Vote & Free Token',
    categoryCountLabel: '12 Kategori Penghargaan',

    question: 'Digital Content Creator Awards 2024',
    headlineLead: 'Dukung Kreator Favoritmu,',
    headlineAccent: 'Karya Terbaik Layak',
    headlineTail: 'Diapresiasi!',
    description:
      'Pilih hingga dua kreator yang menurutmu paling berdampak sepanjang tahun ini. Setiap akun Google terverifikasi berhak memberikan suara satu kali.',
    eyebrow: 'Ajang Penghargaan Kreator Digital 2024',
    periodLabel: 'Periode voting dibuka',
    closesLabel: '5 Hari',
    finalistCount: 4,
    ratioLabel: '1 Akun = 2 Pilihan',

    selectionType: 'multi',
    minSelect: 1,
    maxSelect: 2,

    categories: [
      { id: 'all', label: 'Semua Kandidat' },
      { id: 'edukasi', label: 'Kreator Edukasi' },
      { id: 'hiburan', label: 'Kreator Hiburan' },
    ],

    ticker: [
      { name: 'Rizky Maulana', city: 'Depok', message: 'baru saja memberikan suara', time: '2m', kind: 'vote' },
      { name: 'Sistem Verifikasi Akun Google', message: 'Aktif \u2014 100% aman', time: '', kind: 'system' },
      { name: 'Melati Ayu', city: 'Semarang', message: 'telah memilih 2 kandidat', time: '6m', kind: 'vote' },
    ],

    candidates: [
      {
        id: 'd01',
        number: '01',
        name: 'Rangga Saputra',
        photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=800&q=80',
        tagline: 'Kreator Edukasi',
        badge: 'Paling Konsisten',
        category: 'edukasi',
        region: 'Jakarta',
        field: 'Sains Populer',
        summary:
          'Menyederhanakan topik sains dan teknologi menjadi konten harian yang mudah dicerna pelajar sekolah menengah.',
        vision:
          'Sains untuk Semua: Konten Edukasi Gratis, Akurat, dan Dapat Diakses Siapa Saja Tanpa Hambatan Biaya.',
        programs: [
          {
            title: 'Kelas Daring Gratis Tiap Bulan',
            detail: 'Sesi belajar terbuka bersama guru dan praktisi, lengkap dengan materi yang bisa diunduh ulang.',
          },
          {
            title: 'Perpustakaan Konten Terbuka',
            detail: 'Arsip seluruh materi edukasi dalam lisensi terbuka, bebas digunakan ulang oleh pengajar mana pun.',
          },
        ],
        videoTitle: 'Tonton Profil Kreator',
        videoDuration: '00:45 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
        videoCaption: 'Sekilas proses produksi konten edukasi harian dan dampaknya bagi komunitas pelajar.',
        verified: true,
        verifiedNote: 'Terverifikasi tim kurasi penghargaan',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 64 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 36 },
        ],
        regionStats: [
          { region: 'Jabodetabek', votes: 14200 },
          { region: 'Bandung Raya', votes: 9800 },
          { region: 'Surabaya & Sekitarnya', votes: 7400 },
        ],
        trendLabel: '+4.1% 2 jam terakhir',
        votes: 38400,
      },
      {
        id: 'd02',
        number: '02',
        name: 'Alya Kusnadi',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
        tagline: 'Kreator Hiburan',
        badge: 'Trending',
        category: 'hiburan',
        region: 'Bandung',
        field: 'Komedi Situasi',
        summary:
          'Sketsa komedi pendek bertema keseharian keluarga Indonesia yang konsisten tayang tiga kali sepekan.',
        vision:
          'Hiburan yang Menyatukan: Konten Ringan, Bebas Perundungan, dan Ramah untuk Ditonton Sekeluarga.',
        programs: [
          {
            title: 'Produksi Ramah Keluarga',
            detail: 'Komitmen konten tanpa perundungan, ujaran kebencian, maupun eksploitasi isu sensitif.',
          },
          {
            title: 'Kolaborasi Kreator Daerah',
            detail: 'Membuka slot kolaborasi rutin bagi kreator dari luar kota besar untuk memperluas jangkauan mereka.',
          },
        ],
        videoTitle: 'Tonton Profil Kreator',
        videoDuration: '00:45 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80',
        videoCaption: 'Cuplikan sketsa terpopuler dan proses penulisan naskah bersama tim kecil.',
        verified: true,
        verifiedNote: 'Terverifikasi tim kurasi penghargaan',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 71 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 29 },
        ],
        regionStats: [
          { region: 'Bandung Raya', votes: 11300 },
          { region: 'Jabodetabek', votes: 9600 },
          { region: 'Yogyakarta & Solo', votes: 5200 },
        ],
        trendLabel: '+3.4% 2 jam terakhir',
        votes: 31600,
      },
      {
        id: 'd03',
        number: '03',
        name: 'Bimo Prasetyo',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        tagline: 'Kreator Edukasi',
        category: 'edukasi',
        region: 'Yogyakarta',
        field: 'Literasi Keuangan',
        summary:
          'Membahas pengelolaan keuangan pribadi untuk pekerja muda dengan bahasa sederhana dan studi kasus nyata.',
        vision:
          'Melek Keuangan Sejak Muda: Edukasi Bebas Iklan Menyesatkan dan Berpihak pada Kepentingan Penonton.',
        programs: [
          {
            title: 'Konten Tanpa Endorse Investasi Bodong',
            detail: 'Penyaringan ketat terhadap setiap tawaran kerja sama, dengan pengungkapan terbuka tiap sponsor.',
          },
          {
            title: 'Kalkulator Keuangan Terbuka',
            detail: 'Perangkat bantu perencanaan keuangan gratis yang bisa dipakai siapa saja tanpa perlu mendaftar.',
          },
        ],
        videoTitle: 'Tonton Profil Kreator',
        videoDuration: '00:45 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        videoCaption: 'Penjelasan prinsip editorial dan alasan menolak sponsor produk keuangan berisiko tinggi.',
        verified: true,
        verifiedNote: 'Terverifikasi tim kurasi penghargaan',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 58 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 42 },
        ],
        regionStats: [
          { region: 'Yogyakarta & Solo', votes: 7800 },
          { region: 'Jabodetabek', votes: 6400 },
          { region: 'Semarang Raya', votes: 3900 },
        ],
        trendLabel: '+2.2% 2 jam terakhir',
        votes: 19800,
      },
      {
        id: 'd04',
        number: '04',
        name: 'Sekar Anindya',
        photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80',
        tagline: 'Kreator Hiburan',
        category: 'hiburan',
        region: 'Surabaya',
        field: 'Musik & Pertunjukan',
        summary:
          'Menghidupkan kembali lagu daerah lewat aransemen modern yang digemari pendengar lintas generasi.',
        vision:
          'Musik Daerah Naik Panggung: Aransemen Segar, Royalti Adil, dan Ruang Tampil bagi Musisi Lokal.',
        programs: [
          {
            title: 'Arsip Lagu Daerah Terbuka',
            detail: 'Dokumentasi dan publikasi ulang lagu daerah beserta kredit pencipta aslinya secara lengkap.',
          },
          {
            title: 'Panggung Musisi Lokal',
            detail: 'Kolaborasi rutin dengan musisi daerah, disertai pembagian royalti yang transparan.',
          },
        ],
        videoTitle: 'Tonton Profil Kreator',
        videoDuration: '00:45 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
        videoCaption: 'Proses aransemen lagu daerah dan kolaborasi bersama musisi tradisional setempat.',
        verified: true,
        verifiedNote: 'Terverifikasi tim kurasi penghargaan',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 61 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 39 },
        ],
        regionStats: [
          { region: 'Surabaya & Sekitarnya', votes: 3600 },
          { region: 'Malang Raya', votes: 2800 },
          { region: 'Jabodetabek', votes: 2140 },
        ],
        trendLabel: '+1.5% 2 jam terakhir',
        votes: 8540,
      },
    ],
  },

  {
    id: 'campus-music-fest',
    eoId: 'eo-seed-1',
    eoName: 'Kolektif Nada Kampus',
    status: 'aktif',
    votedEmails: [],
    eventId: 'summer-sound-fest',
    coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    categoryLabel: 'Music & Arts',
    organizer: 'Grammy Indo Foundation',
    organizerVerified: true,
    seriesLabel: 'Series #4',
    closesInLabel: '2 Hari',
    statusBadge: 'Trending #1',
    accessLabel: 'AKSES VOTE',
    accessValue: 'Gratis via Google',
    categoryCountLabel: '3 Kategori Nominasi',

    question: 'Indonesian Youth Music Awards 2024',
    headlineLead: 'Tentukan Penampil Penutup,',
    headlineAccent: 'Pilihanmu yang Naik',
    headlineTail: 'Panggung!',
    description:
      'Festival musik kampus tahun ini menyerahkan penentuan penampil penutup kepada publik. Pilih satu penampil favoritmu sebelum masa voting berakhir.',
    eyebrow: 'Nominasi Resmi Festival Musik Kampus',
    periodLabel: 'Periode voting dibuka',
    closesLabel: '2 Hari',
    finalistCount: 3,
    ratioLabel: '1 Akun = 1 Suara Sah',

    selectionType: 'single',
    minSelect: 1,
    maxSelect: 1,

    categories: [{ id: 'all', label: 'Semua Kandidat' }],

    ticker: [
      { name: 'Dewi Anggraini', city: 'Yogyakarta', message: 'baru saja memberikan suara', time: '1m', kind: 'vote' },
      { name: 'Sistem Verifikasi Akun Google', message: 'Aktif \u2014 100% aman', time: '', kind: 'system' },
      { name: 'Farhan Idris', city: 'Malang', message: 'telah memilih Kandidat #03', time: '4m', kind: 'vote' },
    ],

    candidates: [
      {
        id: 'm01',
        number: '01',
        name: 'Senja Collective',
        photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
        tagline: 'Indie Enam Personel',
        badge: 'Favorit Publik',
        category: 'all',
        region: 'Yogyakarta',
        field: 'Indie Folk',
        summary:
          'Kelompok indie enam personel yang dikenal lewat aransemen hangat dan penampilan panggung yang intim.',
        vision:
          'Panggung yang Hangat dan Dekat: Musik Live Tanpa Jarak antara Penampil dan Penonton.',
        programs: [
          {
            title: 'Set Akustik Penutup',
            detail: 'Rangkaian lagu akustik yang disusun khusus untuk sesi penutupan festival.',
          },
          {
            title: 'Kolaborasi Musisi Kampus',
            detail: 'Mengajak unit musik kampus tampil bersama dalam dua lagu terakhir.',
          },
        ],
        videoTitle: 'Tonton Cuplikan Penampilan',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
        videoCaption: 'Cuplikan penampilan panggung terakhir beserta rencana aransemen untuk set penutup.',
        verified: true,
        verifiedNote: 'Terverifikasi panitia festival',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 69 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 31 },
        ],
        regionStats: [
          { region: 'Yogyakarta & Solo', votes: 420 },
          { region: 'Jabodetabek', votes: 260 },
          { region: 'Semarang Raya', votes: 162 },
        ],
        trendLabel: '+2.8% 2 jam terakhir',
        votes: 842,
      },
      {
        id: 'm02',
        number: '02',
        name: 'Kabut Records DJ Set',
        photo: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b31b?w=800&q=80',
        tagline: 'Kolektif Elektronik',
        category: 'all',
        region: 'Jakarta',
        field: 'Elektronik',
        summary:
          'Kolektif produser elektronik yang membawakan set penutup berenergi tinggi dengan rotasi penampil.',
        vision:
          'Energi Sampai Lagu Terakhir: Set Elektronik yang Menjaga Penonton Tetap di Depan Panggung.',
        programs: [
          {
            title: 'Set Rotasi Tiga Produser',
            detail: 'Tiga produser tampil bergantian dalam satu set berdurasi sembilan puluh menit.',
          },
          {
            title: 'Visual Panggung Kolaboratif',
            detail: 'Tata visual digarap bersama kolektif seni digital kampus penyelenggara.',
          },
        ],
        videoTitle: 'Tonton Cuplikan Penampilan',
        videoDuration: '01:00 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
        videoCaption: 'Rekaman set terakhir di festival sebelumnya, lengkap dengan tata visual panggung.',
        verified: true,
        verifiedNote: 'Terverifikasi panitia festival',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 74 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 26 },
        ],
        regionStats: [
          { region: 'Jabodetabek', votes: 310 },
          { region: 'Bandung Raya', votes: 190 },
          { region: 'Surabaya & Sekitarnya', votes: 113 },
        ],
        trendLabel: '+2.0% 2 jam terakhir',
        votes: 613,
      },
      {
        id: 'm03',
        number: '03',
        name: 'Penampil Kejutan',
        photo: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
        tagline: 'Dirahasiakan Panitia',
        badge: 'Paling Banyak Dipilih',
        category: 'all',
        region: 'Dirahasiakan',
        field: 'Kejutan Panitia',
        summary:
          'Identitas penampil dirahasiakan panitia dan baru diumumkan pada hari pelaksanaan festival.',
        vision:
          'Kejutan yang Layak Ditunggu: Penampil Dirahasiakan hingga Detik Terakhir.',
        programs: [
          {
            title: 'Pengumuman di Hari-H',
            detail: 'Identitas penampil diumumkan langsung di atas panggung pada hari pelaksanaan.',
          },
          {
            title: 'Jaminan Skala Penampil',
            detail: 'Panitia menjamin penampil kejutan berasal dari papan atas kancah musik nasional.',
          },
        ],
        videoTitle: 'Tonton Teaser Panitia',
        videoDuration: '00:30 MIN',
        videoThumb: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
        videoCaption: 'Teaser resmi dari panitia mengenai skala penampil kejutan yang telah disiapkan.',
        verified: true,
        verifiedNote: 'Terverifikasi panitia festival',
        ageStats: [
          { label: 'Gen Z (17\u201325 Tahun)', percent: 80 },
          { label: 'Millennial & Publik (26+ Tahun)', percent: 20 },
        ],
        regionStats: [
          { region: 'Jabodetabek', votes: 520 },
          { region: 'Yogyakarta & Solo', votes: 304 },
          { region: 'Bandung Raya', votes: 200 },
        ],
        trendLabel: '+6.4% 2 jam terakhir',
        votes: 1024,
      },
    ],
  },
];

export function getPollById(id: string): Poll | undefined {
  return polls.find((p) => p.id === id);
}

export function getCandidateById(poll: Poll, candidateId: string): Candidate | undefined {
  return poll.candidates.find((c) => c.id === candidateId);
}

export function totalVotes(poll: Poll): number {
  return poll.candidates.reduce((sum, c) => sum + c.votes, 0);
}
