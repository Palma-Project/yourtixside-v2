/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Lang = 'en' | 'id';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      helps: 'Help',
      login: 'Log in',
      signup: 'Sign up',
      searchPlaceholder: 'Search anything',
    },
    location: {
      promptTitle: 'Use your location?',
      promptBody: "Allow yourtixside to use your device's location so we can show events happening near you.",
      accept: 'Allow location',
      decline: 'Not now',
      detecting: 'Detecting…',
      unknown: 'Set location',
    },
    hero: {
      title: 'All your event operations,',
      titleHighlight: 'in one place.',
      subtitle: 'yourtixside helps Event Creators manage their events, Customers get support fast, and Operations keep the whole platform running smoothly.',
      ctaPrimary: 'Continue as Event Creator',
      ctaSecondary: 'I need help',
    },
    events: {
      eyebrow: "What's on",
      title: 'Upcoming events',
      subtitle: 'Handpicked events from creators on the platform, happening near you and beyond.',
      noResults: 'No events match your search.',
      free: 'Free',
      from: 'From',
      viewAll: 'View all events',
      buyTickets: 'Buy tickets',
    },
    eventDetail: {
      back: 'Back to events',
      about: 'About this event',
      lineup: 'Line-up',
      venue: 'Venue',
      date: 'Date',
      time: 'Time',
      tickets: 'Tickets',
      selectTicket: 'Select a ticket type to continue',
      buyNow: 'Buy now',
      soldOut: 'Sold out',
    },
    voting: {
      eyebrow: 'Have your say',
      title: 'Vote for what happens next',
      subtitle: 'Fan and community polls tied to live events — cast your vote and watch results move in real time.',
      votes: 'votes',
      vote: 'Vote',
      voted: 'Voted',
      closes: 'Closes',
    },
    footer: {
      tagline: 'The operations hub for events — creators, customers, and staff, all in one place.',
    },
  },
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      services: 'Layanan',
      contact: 'Kontak',
      helps: 'Bantuan',
      login: 'Masuk',
      signup: 'Daftar',
      searchPlaceholder: 'Cari apa saja',
    },
    location: {
      promptTitle: 'Izinkan akses lokasi?',
      promptBody: 'Izinkan yourtixside menggunakan lokasi perangkat Anda agar kami bisa menampilkan event di sekitar Anda.',
      accept: 'Izinkan lokasi',
      decline: 'Nanti saja',
      detecting: 'Mendeteksi lokasi…',
      unknown: 'Atur lokasi',
    },
    hero: {
      title: 'Seluruh kebutuhan operasional event,',
      titleHighlight: 'dalam satu tempat.',
      subtitle: 'yourtixside membantu Event Creator mengelola event, Customer mendapatkan bantuan dengan cepat, dan tim Operasional menjaga seluruh platform berjalan lancar.',
      ctaPrimary: 'Lanjutkan sebagai Event Creator',
      ctaSecondary: 'Saya butuh bantuan',
    },
    events: {
      eyebrow: 'Sedang berlangsung',
      title: 'Event mendatang',
      subtitle: 'Pilihan event dari para creator di platform ini, mulai dari yang terdekat hingga yang jauh dari lokasi Anda.',
      noResults: 'Tidak ada event yang sesuai dengan pencarian Anda.',
      free: 'Gratis',
      from: 'Mulai dari',
      viewAll: 'Lihat semua event',
      buyTickets: 'Beli tiket',
    },
    eventDetail: {
      back: 'Kembali ke daftar event',
      about: 'Tentang event ini',
      lineup: 'Pengisi acara',
      venue: 'Lokasi',
      date: 'Tanggal',
      time: 'Waktu',
      tickets: 'Tiket',
      selectTicket: 'Pilih jenis tiket untuk melanjutkan',
      buyNow: 'Beli sekarang',
      soldOut: 'Tiket habis',
    },
    voting: {
      eyebrow: 'Sampaikan pendapat Anda',
      title: 'Vote untuk yang berikutnya',
      subtitle: 'Polling dari komunitas dan penggemar terkait event yang sedang berjalan — beri suara Anda dan pantau hasilnya secara langsung.',
      votes: 'suara',
      vote: 'Vote',
      voted: 'Sudah vote',
      closes: 'Ditutup',
    },
    footer: {
      tagline: 'Pusat operasional untuk event — creator, customer, dan staf, semua dalam satu tempat.',
    },
  },
} as const;

export type TranslationShape = typeof translations.en;
