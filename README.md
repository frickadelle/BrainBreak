# Brainbreak

A short browser game for a shared team break, playable with 2–30 people. Players create a room, join without accounts and start a six-round random mix. Every round begins with a short tutorial and a shared Ready step. The mix draws from 15 games, including Wordle, code breaking, visual sets, connections, memory, wavelength and country guessing. The interface and instructions are available in German and English. Wordle deliberately uses the same common five-letter English word for all players. Players can change the interface language at any time.

Production: **https://brainbreak.brainbreak.workers.dev** (Cloudflare Workers, deployed on 2026-10-10). The published version includes 15 playable games, 630 reviewed tasks and adaptive difficulty. Worker version: `1a559035-639b-47ec-923b-8bc46ca1846f`.

## Run locally

Prerequisite: **Node.js 22.14 or newer** and npm. No Cloudflare account, AI key or voice service is needed locally.

```sh
npm ci
npm run db:local
npm run dev
```

Open **http://localhost:8787**. Create a room and share its invitation link. Use three separate browser profiles or private browser windows with separate storage to test a session. Three authenticated, connected players are required to start. A room holds up to 30 players. Multiple tabs within one profile share one player identity.

For frontend development, keep the Worker on port 8787 and run `npm run dev:ui` in another terminal. Open http://localhost:5173. Vite proxies `/api` and WebSocket connections to the Worker. Both ports have separate local browser identities.

The default local server is reachable only from this machine. For another device on a trusted local network, run `npx wrangler dev --ip 0.0.0.0 --port 8787` after building. Open the host machine's LAN address on the phone. Clipboard access requires HTTPS; the UI offers a selectable invitation URL when clipboard access is unavailable. The LAN server is for local testing, not public hosting.

Local D1 and Durable Object data live in `.wrangler/state`. Keep this directory to preserve results across restarts. Local development uses an independent local copy of the configured database; it does not modify production D1.

## Deploy to Cloudflare

This checkout is configured for the deployed Brainbreak Worker and D1 database. The remote `0001_initial.sql` migration has been applied. Deployment requires a Cloudflare account with Workers, SQLite-backed Durable Objects and D1. The Free plan supports these services.

For subsequent deployments to the configured account:

```sh
npx wrangler login --scopes account:read user:read workers_scripts:write d1:write
npx wrangler d1 migrations apply DB --remote
npm run deploy
```

For a separate Cloudflare account, update `account_id` in `wrangler.jsonc`. Create its database:

```sh
npx wrangler d1 create brainbreak
```

Copy the returned `database_id` into the existing `d1_databases[0]` entry. Do not paste tokens into repository files. Then apply the migration and deploy:

```sh
npx wrangler d1 migrations apply DB --remote
npm run typecheck
npm run test
npm run deploy
```

Wrangler uploads the Worker and the built React assets together. The first deployment also registers the `BrainbreakRoom` SQLite Durable Object class through the `v1` migration. Share the HTTPS `workers.dev` URL printed by Wrangler. A custom domain is optional. For CI, supply `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` through the CI secret store, with Worker script, D1 and account resource permissions appropriate to the deployment.

After deployment, repeat a full session with three separate browser profiles. The local acceptance checks do not replace an internet/production smoke test.

## Rules

- The current interface starts the mix directly. Each tutorial has a harmless example, a Ready button and a 45-second fallback. All fixed roster players ready starts immediately; an offline player without readiness retains the fallback. The game gets a fresh deadline after the tutorial. Older room snapshots and clients retain voting.
- Legacy voting lasts up to 30 seconds and ends immediately once every roster player has voted. The first question receives a fresh 45-second deadline. An offline player without a vote retains the voting timeout. Players may replace their vote until voting ends. The server chooses randomly among tied leaders, including when nobody votes.
- There are six different games and a 10-second shared reveal after each. Code breaking, Wordle and connections allow 75 seconds, wavelength 60 seconds, and other games 45 seconds. Memory adds its brief preview before the 45-second recall window. The server reveals early once all eligible participants submit. Drawing waits for all guessers to be correct; timed-out and disconnected participants remain eligible until the deadline. Sessions can finish sooner than six minutes.
- New rooms start at medium difficulty. At least 70% success raises the next question one level; below 30% lowers it one level. Other rates retain the level. Exact correctness counts for choice, maths and ordering; estimation counts at most 10% relative error, before rounding points; drawing counts correct guessers and excludes the artist. The roster is fixed at the start of each question, so missing answers and disconnections count as unsuccessful. The reveal displays the success count and next level. Points are unchanged across levels. Questions do not repeat within a session. Editorial levels are initial classifications, not calibrated measurements.
- Trivia, logic and true or false: 1,000 points for a correct option, otherwise zero. There is no speed bonus.
- Mental maths: enter an exact numeric result; only the exact result earns 1,000 points. A close estimate earns zero in this category.
- Ordering: drag handles or use the up/down arrows to arrange four cards in the direction requested by the question. The complete correct sequence earns 1,000 points; partial orders earn zero. A language change retains the order, and a submitted sequence remains locked after reload.
- Estimation: `max(0, round(1000 × (1 − abs(estimate − answer) / max(abs(answer), 1))))`. Exact answers earn 1,000 points; 10% error earns 900; 50% earns 500; 100% or more earns zero.
- Ordering cards can be dragged by their handles with a mouse or touch pointer; the arrow buttons also support keyboard operation. A drop commits the order, and submitting or changing language preserves the selected option IDs.
- Drawing and guessing: one participant draws each question; the artist rotates in stable join order across six questions. Smaller teams draw more than once; teams larger than six have six artists. Wrong guesses appear in the public chat. Correct guesses publish a status event without the word; a table tracks who solved the word. Artists and solved guessers can send bounded chat messages, but the server blocks the current word and its aliases even inside longer messages. German and English words and reviewed synonyms count. A correct guess earns 1,000 points. The artist earns 1,000 if at least one guesser succeeds. There is no speed bonus. The shared board and correct-answer lock survive reload. Pen and eraser are explicit tools; erasing is shared through durable white strokes on the white board. The public chat and correctness table sit alongside the canvas on wide screens and below it on mobile.
- Start with 2–30 participants. Word association uses one cooperative team with two or three participants, or two balanced teams from four participants. Captains rotate and have 15 seconds to submit one clue word in each language. A reviewed fallback clue appears otherwise. Guessers submit the complete set of 2, 3 or 4 target cards according to difficulty. Each exact set earns 1,000 points; a human clue giver earns 1,000 when at least one teammate succeeds. Team scores normalize successful guessers to 1,000 points per round, so unequal team sizes do not confer an advantage.
- Guided mixed mode chooses six distinct available games, with a mix of deduction, visual, creative and knowledge tasks. Legacy mixed sessions retain their original category selection. The shared difficulty carries forward between games. Future games and questions remain server-only.
- Optional sounds use browser-generated tones for voting/round start, answer confirmation, reveal and results. The header control persists mute on this device. Browser audio starts after a user gesture; reload/reconnect snapshots do not replay cues. No audio downloads, microphone access or new service costs are required.
- Real Street View gameplay is prepared but unavailable until the owner configures Google Maps billing/API access and at least six verified panoramas. See [Street View setup](docs/street-view-setup.md). The current geography bank is empty; there are no fabricated locations or fallback photographs.
- Each game states its allowed attempts in the tutorial. Code and Wordle allow six valid guesses, visual sets four selections, and connections four wrong groups. Memory, countries and wavelength lock one submission. A duplicate attempt does not consume another guess. The server rejects duplicates, wrong question IDs, invalid options and late answers. A language change does not change the deadline or unlock an answer.
- Estimation and mental maths accept German numeric input such as `1.234,5` and English input such as `1,234.5`. Values must be finite and nonnegative. Group separators must use complete groups of three. Signs, exponent notation and unit text are rejected. Zero is allowed.
- Shared names do not merge identities. The browser keeps a random player token in local storage. Clearing browser data or changing devices creates a new identity; there is no account-based recovery or cross-device transfer in this version.
- Session ranks use competition ranking: tied scores receive the same rank. The weekly leaderboard adds completed sessions in the Berlin ISO calendar week. The all-time leaderboard adds scores across weeks. The deployment serves one shared team leaderboard; it has no separate organizations.

## New puzzle rules

- Code breaking and Wordle award 1,000 for solving, with no speed bonus. Feedback counts each repeated symbol once. Wordle accepts a reviewed 513-word English list.
- Visual sets require three cards with each active feature all equal or all different. Connections awards a proportional share of 1,000 for each completed group.
- Memory awards a proportional share of 1,000 for positions recalled correctly. Reload cannot restart or re-expose the preview.
- Wavelength scores `max(0, 1000 - 40 × abs(guess - target))`. The rotating clue-giver sees the target and supplies a bilingual clue. A reviewed fallback appears after 15 seconds. The clue-giver earns 1,000 if any guesser scores at least 600. Only guessers count for adaptation. Scale positions and clues are editorial, not factual measurements.
- Countries uses 22 local schematic flags and 20 country outlines. One correct choice earns 1,000. Opaque filenames and geometric SVG markup contain no answer metadata. [Content and asset provenance](docs/puzzle-content-review.md) records government sources and Natural Earth data.

## Content and languages

`worker/content/index.ts` exports two weekly packages for `2026-W41` and `2026-W42`, each with the same reviewed pool of **630 unique tasks: 42 per playable game**. The pool retains 84 starter questions and adds 252 questions in `bank-knowledge.ts`, `bank-challenges.ts` `bank-drawing.ts` and `bank-association.ts`. The seven new games add 294 definitions in `bank-puzzles.ts`. Each category has 22 easy, 10 medium and 10 hard questions. The week selects package metadata; the server selects six unseen questions according to the group's difficulty. Sharing the pool between weeks avoids treating repeated content as new content.

Every prompt, option, explanation and unit has a prewritten German and English version. Reviews: [original questions](docs/content-review.md), [original additional games](docs/extra-games-content-review.md), [new knowledge and logic](docs/adaptive-knowledge-review.md), [new maths, truth and ordering](docs/adaptive-challenges-review.md), [new drawing concepts](docs/adaptive-drawing-review.md). No content or translation service runs during play.

See [adaptive selection and compatibility](docs/adaptive-difficulty.md) for the complete rules.

The room selects a package at creation using the ISO calendar week in **Europe/Berlin**. If there is no exact package, it selects the latest earlier package; if all packages are in the future, it uses the first package. The UI labels a reused package. The server snapshots the full selected package into Durable Object storage so an in-flight game survives a content deployment.

Rooms created before a game expansion keep their original category list and snapped content. Existing six-question snapshots without difficulty metadata continue in their original order; new rooms use adaptive selection. Voting and tie resolution use only the categories in that room's stored package. Reload an already-open homepage after a deployment to load the current UI before creating a new room.

To add a week, append a `WeekPackage` with a unique package ID, a `YYYY-Www` week and at least six reviewed questions per category. Adaptive pools need an explicit `difficulty` on every question; provide at least six at each level to support a full session at that level. Use unique question IDs within the package and fixed option IDs; translations must preserve meanings, quantities and order. Run the structural tests and review the new answers manually. Avoid wordplay and ambiguous sequences. A missing English field uses the German text and displays a fallback notice.

UI copy lives in `src/i18n.ts`; shared protocol types live in `shared/types.ts`. The language list is currently the typed union `de | en`. A new language requires a UI catalog, content translations, numeric parsing and locale-format mapping, plus multilingual tests. No translation API runs during a game. Fonts are bundled locally.

## Architecture and persistence

- React and TypeScript render the UI; Vite builds static assets.
- One Cloudflare Durable Object owns each room. All actions and alarm invocations run in an ordered queue. Durable storage commits the room journal and next alarm together.
- WebSockets use the hibernation API and per-connection attachments. A 25-second `ping` receives an automatic `pong` without keeping the object awake. Clients receive personalized views with their own answer; other answers, explanations and solutions are withheld until reveal. Future questions and the full package never reach the client bundle.
- The server sends an absolute deadline and its current time. The browser derives the countdown locally with a clock offset; it does not send one request per second.
- Durable Object alarms advance the game even when the host disconnects. Reconnects use the original device token and restore the same player, answer and score. Browser reconnects use bounded exponential backoff.
- D1 stores players, sessions, participant names, answers and results. Tokens are random 32-byte bearer secrets; D1 stores only SHA-256 hashes. WebSocket authentication sends the token as the first message, never in the URL. Public player IDs are not credentials.
- An accepted answer is committed to the Durable Object journal before acknowledgement. D1 failures do not discard that answer or stop the game. Failed snapshots retry every five seconds; the UI identifies pending saves. Final score upserts and phase changes are idempotent.
- Lobby access expires after 24 hours. Starting renews that deadline. Result-room access expires seven days after completion. These are access deadlines, **not automatic data deletion**. D1 history and expired Durable Object snapshots remain stored. Operators should define a retention/deletion policy for their team before long-term use.
- Limits: 30 participants/room, 90 sockets/room, three sockets/identity and 40 actions/10 seconds/socket. Leaderboards show the top 100 identities. The API checks same-origin requests. This version has no HTTP creation-rate limit or organization access control; share the deployment with your team. For broader public traffic, add ingress rate limits before opening access widely.

## Verify

```sh
npm run typecheck
npm run build
npm run test
npm run test:protocol
```

The 131-test unit suite checks deadlines, tie selection, score rules, Berlin weeks, locale parsing, translation structure, privacy, duplicate-answer prevention, durable reconstruction and D1 failure/retry behavior. Adaptive checks cover threshold boundaries, decimal error precision, a fixed eligible roster, artist exclusion, unseen tier selection, legacy snapshots, reconstruction, translation equivalence and all 630 content identities. Added checks also cover exact numeric scoring, malformed order submissions, locked answers after language changes, old room snapshots during category expansion, numeric draft editing, drawing-role privacy, private repeated guesses, canvas bounds/rate limits, durable stroke replay and idempotent artist scoring.

`test:protocol` requires the local server. It runs all 15 games and mixed mode with both **two and 30 real authenticated WebSocket clients**, for 32 sessions and 192 rounds. It checks tutorial readiness, secret-free explanations, fresh deadlines, reconnects, private attempts, language changes, early completion and saved results. The leaderboard is capped at 100 entries; confirm every reported result independently in D1. It writes `test-results/guided-protocol.json`. Run `python3 scripts/verify-guided-results.py PATH_TO_LOCAL_D1.sqlite` to independently verify its exact sessions and players. These are automated transport clients, not a claim of 30 human-operated browsers. Local QA records use actual joins and submitted answers. `test:protocol:legacy` retains the previous voting checks for the eight original games.

For guided tests, set `BRAINBREAK_CATEGORIES` to a comma-separated subset and `BRAINBREAK_PLAYER_COUNTS` to `2`, `30` or `2,30`. `BRAINBREAK_URL` defaults to localhost. Remote tests create production QA records; retain their exact session/player IDs and never delete unrelated records. Prefer an isolated local state directory using Wrangler's `--persist-to` option.

Current browser verification uses CUA. It checks the actual mix entry, tutorial language/reload behavior and the seven new controls. See [verification notes](docs/verification.md) and `test-results/guided-ui-check.json` for the executed checks and their limits. `scripts/multiplayer-test.py` is retained as historical evidence for the previous voting interface; it does not test the current guided flow.

## Expected running costs

For one team of 10–30 people playing once per week, **$0/month is the expected Cloudflare cost while usage remains inside the Free plan**. Static assets are free and unlimited. The design uses hibernating WebSockets and sends state changes rather than countdown ticks. A 30-player session writes 180 answers and 30 final scores; drawing adds bounded Durable Object stroke commits while keeping D1 writes at phase/answer boundaries. Snapshot retries and indexed upserts add some row writes, but one weekly game is far below daily quotas. No AI, voice, translation or external application service is billed.

Pricing checked on **2026-10-09**:

| Service                | Relevant Free-plan allowance                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Workers                | 100,000 requests/day                                                                                               |
| SQLite Durable Objects | 100,000 requests/day; 13,000 GB-seconds/day; 5 million rows read/day; 100,000 rows written/day; 5 GB total storage |
| D1                     | 5 million rows read/day; 100,000 rows written/day; 5 GB total storage                                              |
| Worker static assets   | Free, unlimited requests                                                                                           |

The Paid Workers plan starts at **$5/month** with additional metered usage. A custom domain has separate registration costs. Exceeding a Free-plan quota causes operations to fail, so the $0 estimate is conditional on actual traffic, shared account usage and retained data. Check the dashboard rather than treating this estimate as a bill guarantee.

Sources: [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [Durable Objects pricing](https://developers.cloudflare.com/durable-objects/platform/pricing/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), [static assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).

## Drawing content and Street View

`worker/content/drawing.ts` supplies the 12 original drawing words; `bank-drawing.ts` adds 30 at three difficulty levels. All 42 have German and English aliases. [Drawing content review](docs/drawing-content-review.md) explains the accepted words. Stroke batches are limited to 32 normalized points, 135 unique batches and 2,400 points per question. Clearing the board retains these limits. Only the artist can write, and each accepted batch commits durably before its incremental broadcast. Stroke updates do not write D1.

The requested navigable Street View geography game needs a Google Maps project and browser API key. It is not yet an enabled game category. [Street View setup](docs/street-view-setup.md) records the required access, planned integration and current provider pricing. The app does not substitute a photo quiz for this request.
