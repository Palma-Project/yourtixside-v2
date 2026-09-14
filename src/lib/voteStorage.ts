/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PROTOTYPE ONLY — see docs/VOTING_BACKEND_MIGRATION.md.
 *
 * This stores "has this email voted on this poll" and per-candidate vote
 * deltas entirely in the browser's localStorage. It is trivially bypassed
 * by clearing site data, using a private/incognito window, or editing
 * localStorage directly — it does NOT enforce "1 person 1 vote" for real.
 * It exists so the UI/UX flow can be built and demoed before the real
 * backend (Cloudflare Pages Functions + D1, verifying the Google ID token
 * server-side) is in place.
 */

const VOTED_KEY_PREFIX = 'yourtixside_voted:';
const DELTA_KEY_PREFIX = 'yourtixside_vote_delta:';

interface VotedRecord {
  email: string;
  candidateIds: string[];
  votedAt: string;
}

export function hasVoted(pollId: string, email: string): VotedRecord | null {
  try {
    const raw = localStorage.getItem(VOTED_KEY_PREFIX + pollId);
    if (!raw) return null;
    const record: VotedRecord = JSON.parse(raw);
    return record.email.toLowerCase() === email.toLowerCase() ? record : null;
  } catch {
    return null;
  }
}

export function recordVote(pollId: string, email: string, candidateIds: string[]): void {
  const record: VotedRecord = { email, candidateIds, votedAt: new Date().toISOString() };
  try {
    localStorage.setItem(VOTED_KEY_PREFIX + pollId, JSON.stringify(record));

    const deltaKey = DELTA_KEY_PREFIX + pollId;
    const existingDeltas: Record<string, number> = JSON.parse(localStorage.getItem(deltaKey) || '{}');
    for (const candidateId of candidateIds) {
      existingDeltas[candidateId] = (existingDeltas[candidateId] || 0) + 1;
    }
    localStorage.setItem(deltaKey, JSON.stringify(existingDeltas));
  } catch {
    /* localStorage unavailable — vote won't persist across reloads, but the UI still updates for this session */
  }
}

export function getVoteDeltas(pollId: string): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(DELTA_KEY_PREFIX + pollId) || '{}');
  } catch {
    return {};
  }
}
