/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock voting/poll data. This is a client-side prototype — the base `votes`
 * counts here are static, and real-time deltas from actual votes cast in
 * this browser are layered on top via src/lib/voteStorage.ts. See
 * docs/VOTING_BACKEND_MIGRATION.md for what changes when a real backend
 * (with a real database and verified identity) is wired up.
 */

export interface Candidate {
  id: string;
  name: string;
  photo: string;
  summary: string;
  votes: number;
}

export type SelectionType = 'single' | 'multi';

export interface Poll {
  id: string;
  eventId?: string;
  question: string;
  description: string;
  closesLabel: string;
  selectionType: SelectionType;
  minSelect: number;
  maxSelect: number;
  candidates: Candidate[];
}

export const polls: Poll[] = [
  {
    id: 'headliner-pick',
    eventId: 'summer-sound-fest',
    question: 'Who should headline the closing set?',
    description:
      'Summer Sound Fest is picking its closing act by public vote this year. Choose one act — voting closes the night before the festival.',
    closesLabel: 'Sep 30',
    selectionType: 'single',
    minSelect: 1,
    maxSelect: 1,
    candidates: [
      {
        id: 'a',
        name: 'Senja Collective',
        photo: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
        summary: 'Six-piece indie outfit known for warm, layered live sets and a devoted local following.',
        votes: 842,
      },
      {
        id: 'b',
        name: 'Kabut Records DJ Set',
        photo: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b31b?w=400&q=80',
        summary: 'A rotating collective of electronic producers, bringing a high-energy closing set.',
        votes: 613,
      },
      {
        id: 'c',
        name: 'A surprise guest act',
        photo: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&q=80',
        summary: 'Kept under wraps by the organizers — vote for the mystery to be revealed on festival day.',
        votes: 1024,
      },
    ],
  },
  {
    id: 'next-city',
    question: 'Which city should we bring Founders Meetup to next?',
    description:
      'We are expanding Founders Meetup to a new city next quarter. Pick up to two cities you would like to see us visit.',
    closesLabel: 'Oct 5',
    selectionType: 'multi',
    minSelect: 1,
    maxSelect: 2,
    candidates: [
      {
        id: 'a',
        name: 'Semarang',
        photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
        summary: 'A growing tech and creative scene with strong demand from past attendees.',
        votes: 301,
      },
      {
        id: 'b',
        name: 'Malang',
        photo: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80',
        summary: 'Cooler climate, close to several university campuses and student founders.',
        votes: 275,
      },
      {
        id: 'c',
        name: 'Makassar',
        photo: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&q=80',
        summary: 'The largest untapped founder community in eastern Indonesia.',
        votes: 198,
      },
      {
        id: 'd',
        name: 'Medan',
        photo: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80',
        summary: 'Strong trade and logistics sector, several requests from local chapters.',
        votes: 164,
      },
    ],
  },
  {
    id: 'run-route',
    eventId: 'night-run-5k',
    question: "Which route should City Night Run take this year?",
    description:
      "Help us finalize the 5K course for this year's night run. Pick the route you would rather run.",
    closesLabel: 'Oct 10',
    selectionType: 'single',
    minSelect: 1,
    maxSelect: 1,
    candidates: [
      {
        id: 'a',
        name: 'Riverside loop',
        photo: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80',
        summary: 'Flat, scenic route following the river — best for first-time 5K runners.',
        votes: 512,
      },
      {
        id: 'b',
        name: 'Old town route',
        photo: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80',
        summary: 'Passes through the historic old town — more turns, slightly hillier.',
        votes: 467,
      },
    ],
  },
];

export function getPollById(id: string): Poll | undefined {
  return polls.find((p) => p.id === id);
}

export function totalVotes(poll: Poll): number {
  return poll.candidates.reduce((sum, c) => sum + c.votes, 0);
}
