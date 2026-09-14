# Voting system — migrating from prototype to real backend

## Current state (prototype)

The vote feature currently works fully in the browser, no backend:

- **Data**: `src/data/polls.ts` — hardcoded polls & candidates, in-memory.
- **"Already voted" check**: `src/lib/voteStorage.ts` — reads/writes
  `localStorage` on the visitor's own device.
- **Vote tally**: also `localStorage` (`yourtixside_vote_delta:<pollId>`),
  added on top of the hardcoded base `votes` count in `polls.ts`, client-side
  only, never shared between visitors or devices.
- **Identity**: `src/hooks/useGoogleAuth.ts` — Google Identity Services
  (`accounts.google.com/gsi/client`), returns a Google ID token whose
  payload is **decoded but never signature-verified**. Nothing here proves
  the token is real — it just reads whatever `email`/`name`/`picture`
  claims are inside it.

### Why this is not real "1 person 1 vote"

Anyone can bypass it by:
- Clearing site data / using a private window → `hasVoted()` finds nothing.
- Editing `localStorage` directly via DevTools → same effect, or can forge
  an "already voted" state for someone else to grief them.
- The tally itself lives only in the visitor's own browser — two different
  people voting don't affect each other's view of the results at all
  (each browser tracks its own delta on top of the same hardcoded base).
- The Google sign-in step proves nothing server-side; a modified `google`
  object in the browser console could hand the app a fake email that was
  never actually authenticated by Google.

This is intentional for now — it lets the full UI/UX flow (candidate
browsing → sign-in gate → selection rules → submit → results) be built and
demoed before investing in backend work. **Do not treat the vote counts
shown in this prototype as real data.**

## What "real" requires

1. **A backend to own the data** — polls, candidates, and votes need to
   live in a database the client can't write to directly.
2. **Server-side verification of the Google ID token** — the token from
   Google Identity Services must be verified against Google's public keys
   (or via Google's `tokeninfo` endpoint) *on the server*, not decoded
   client-side. Only a verified token's `email` claim can be trusted.
3. **A uniqueness constraint** — `(poll_id, email)` must be enforced at the
   database level (not just checked-then-inserted in application code,
   which has a race condition), so double-voting fails even under
   concurrent requests.
4. **A vote-submission endpoint** that:
   - Verifies the Google ID token server-side.
   - Checks the poll is still open (not past its close date).
   - Validates the submitted candidate IDs against the poll's
     `selectionType`/`minSelect`/`maxSelect` rules server-side too (never
     trust the client to have enforced this correctly).
   - Inserts the vote(s), relying on the DB uniqueness constraint to
     reject a second attempt from the same email.
   - Returns updated tallies (or the client refetches them).

## Suggested implementation (fits the current Cloudflare Pages setup)

Since this project already deploys to **Cloudflare Pages**, the natural
next step — no new hosting provider needed — is:

- **Cloudflare Pages Functions** (`/functions` directory) for the API
  routes, e.g.:
  - `functions/api/polls/[id].ts` — GET poll + live tallies.
  - `functions/api/polls/[id]/vote.ts` — POST a vote (body: Google ID
    token + selected candidate IDs).
- **Cloudflare D1** (SQLite-based, serverless) for storage. Rough schema:

  ```sql
  CREATE TABLE polls (
    id TEXT PRIMARY KEY,
    question TEXT NOT NULL,
    description TEXT NOT NULL,
    selection_type TEXT NOT NULL CHECK (selection_type IN ('single','multi')),
    min_select INTEGER,
    max_select INTEGER,
    closes_at TEXT
  );

  CREATE TABLE candidates (
    id TEXT PRIMARY KEY,
    poll_id TEXT NOT NULL REFERENCES polls(id),
    name TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    summary TEXT NOT NULL
  );

  CREATE TABLE votes (
    poll_id TEXT NOT NULL REFERENCES polls(id),
    candidate_id TEXT NOT NULL REFERENCES candidates(id),
    voter_email TEXT NOT NULL,
    voted_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (poll_id, voter_email) -- the actual "1 person 1 vote" enforcement
  );
  ```

  Note the `UNIQUE (poll_id, voter_email)` constraint — that's what makes
  double-voting fail at the database level regardless of anything the
  client does.

- **Verifying the Google ID token server-side**, inside the Pages
  Function, e.g. via Google's tokeninfo endpoint:

  ```ts
  const res = await fetch(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
  );
  if (!res.ok) return new Response('Invalid token', { status: 401 });
  const payload = await res.json();
  if (payload.aud !== GOOGLE_CLIENT_ID) return new Response('Invalid audience', { status: 401 });
  const email = payload.email as string;
  ```

  (For high-volume production use, verifying the JWT signature locally
  against Google's public JWKS is faster than calling `tokeninfo` on every
  request — but `tokeninfo` is the simplest correct starting point.)

## What changes in the frontend when this migration happens

- `src/lib/voteStorage.ts` gets replaced with real `fetch()` calls to the
  new API routes instead of `localStorage`.
- `src/data/polls.ts` becomes a fallback/seed for the database rather than
  the live source of truth — the app fetches poll + tally data from the
  API on `VoteDetail` mount instead of importing the static array.
- `src/pages/VoteDetail.tsx`'s `handleSubmit` posts the Google ID token +
  selected candidate IDs to the vote endpoint, and shows the "already
  voted" state based on the API's response (e.g. a `409 Conflict`) instead
  of a local `hasVoted()` check.
- Everything else (candidate cards, selection UI, results bars, i18n
  copy) stays the same — this is purely a data-layer swap.
