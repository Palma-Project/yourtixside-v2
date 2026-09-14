/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Mock voting/poll data tied to live or upcoming events.
 */

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  eventId?: string;
  question: string;
  closesLabel: string;
  options: PollOption[];
}

export const polls: Poll[] = [
  {
    id: 'headliner-pick',
    eventId: 'summer-sound-fest',
    question: 'Who should headline the closing set at Summer Sound Fest?',
    closesLabel: 'Sep 30',
    options: [
      { id: 'a', label: 'Senja Collective', votes: 842 },
      { id: 'b', label: 'Kabut Records DJ Set', votes: 613 },
      { id: 'c', label: 'A surprise guest act', votes: 1024 },
    ],
  },
  {
    id: 'next-city',
    question: 'Which city should we bring Founders Meetup to next?',
    closesLabel: 'Oct 5',
    options: [
      { id: 'a', label: 'Semarang', votes: 301 },
      { id: 'b', label: 'Malang', votes: 275 },
      { id: 'c', label: 'Makassar', votes: 198 },
      { id: 'd', label: 'Medan', votes: 164 },
    ],
  },
  {
    id: 'run-route',
    eventId: 'night-run-5k',
    question: 'Which route should City Night Run take this year?',
    closesLabel: 'Oct 10',
    options: [
      { id: 'a', label: 'Riverside loop', votes: 512 },
      { id: 'b', label: 'Old town route', votes: 467 },
    ],
  },
];
