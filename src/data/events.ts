/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock event data. Replace with data from the Event Creator portal once
 * that API is wired up — shape is kept close to what that module will emit.
 */

export interface TicketTier {
  id: string;
  name: string;
  price: number; // in IDR, 0 = free
  available: boolean;
}

export interface EventItem {
  id: string;
  eoId?: string;
  eoName?: string;
  title: string;
  category: string;
  city: string;
  venue: string;
  date: string; // ISO date
  time: string;
  image: string;
  description: string;
  lineup: string[];
  tickets: TicketTier[];
}

export const events: EventItem[] = [
  {
    id: 'summer-sound-fest',
    title: 'Summer Sound Fest',
    category: 'Music Festival',
    city: 'Yogyakarta',
    venue: 'Prambanan Open Field',
    date: '2026-11-14',
    time: '16:00',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    description:
      'A day-long outdoor festival bringing together the region\'s best indie and electronic acts on one stage, with local food vendors and craft stalls around the field.',
    lineup: ['Senja Collective', 'Nadin & The Lows', 'Kabut Records DJ Set'],
    tickets: [
      { id: 'presale', name: 'Presale', price: 150000, available: true },
      { id: 'regular', name: 'Regular', price: 225000, available: true },
      { id: 'vip', name: 'VIP', price: 450000, available: false },
    ],
  },
  {
    id: 'jazz-under-stars',
    title: 'Jazz Under the Stars',
    category: 'Concert',
    city: 'Bandung',
    venue: 'Taman Budaya Bandung',
    date: '2026-10-02',
    time: '19:30',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    description:
      'An intimate evening of jazz standards and original compositions performed under the open sky, featuring a rotating lineup of local jazz ensembles.',
    lineup: ['Duta Jazz Quartet', 'Maya Ramlan Trio'],
    tickets: [
      { id: 'regular', name: 'Regular', price: 100000, available: true },
      { id: 'reserved', name: 'Reserved seating', price: 175000, available: true },
    ],
  },
  {
    id: 'startup-founders-meetup',
    title: 'Founders Meetup Vol. 9',
    category: 'Community',
    city: 'Jakarta',
    venue: 'Kolektiv Coworking',
    date: '2026-09-28',
    time: '18:00',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description:
      'A casual evening meetup for early-stage founders to share progress, swap notes on fundraising, and meet potential collaborators over light snacks.',
    lineup: ['Open networking', 'Lightning talks (5 slots)'],
    tickets: [{ id: 'free', name: 'Free entry', price: 0, available: true }],
  },
  {
    id: 'art-market-weekend',
    title: 'Weekend Art Market',
    category: 'Exhibition',
    city: 'Yogyakarta',
    venue: 'Taman Sari Creative Yard',
    date: '2026-09-20',
    time: '10:00',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80',
    description:
      'Browse and buy directly from over 40 local artists and makers, with live mural painting and a small stage for acoustic sets throughout the day.',
    lineup: ['40+ local artist booths', 'Live mural session', 'Acoustic stage'],
    tickets: [{ id: 'free', name: 'Free entry', price: 0, available: true }],
  },
  {
    id: 'night-run-5k',
    title: 'City Night Run 5K',
    category: 'Sports',
    city: 'Surabaya',
    venue: 'Taman Bungkul',
    date: '2026-10-18',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    description:
      'A community 5K run through the city at night, finishing with a small after-party and prize draw for all finishers.',
    lineup: ['5K timed run', 'Post-run after-party'],
    tickets: [
      { id: 'regular', name: 'Regular', price: 90000, available: true },
      { id: 'group', name: 'Group of 4', price: 320000, available: true },
    ],
  },
  {
    id: 'comedy-night-live',
    title: 'Comedy Night Live',
    category: 'Comedy',
    city: 'Bali',
    venue: 'Sunset Rooftop Bar',
    date: '2026-09-25',
    time: '20:30',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80',
    description:
      'A rooftop night of stand-up from five comedians, mixing bilingual sets for a mixed local and international crowd.',
    lineup: ['5 stand-up comedians', 'Open mic warm-up'],
    tickets: [
      { id: 'regular', name: 'Regular', price: 120000, available: true },
      { id: 'frontrow', name: 'Front row', price: 200000, available: true },
    ],
  },
];

export function getEventById(id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}
