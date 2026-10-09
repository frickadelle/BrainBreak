# Verification

The checks use the real local Cloudflare `workerd` runtime, local D1 SQLite storage and SQLite-backed Durable Objects. No production timing override, seeded participants, client-side scoring or fabricated results are used.

## Build and rule checks

- TypeScript strict check passed.
- Production Vite build passed; UI fonts are self-hosted assets.
- 40 unit tests passed. They cover Berlin ISO-week boundaries, localized decimal/group separators, scoring, vote ties, duplicate display names, hashed credentials, hidden solutions/answers, stable translation IDs/deadlines, package structure, acknowledged answers across D1 outage and object reconstruction, alarm idempotency, deadline rejection, language changes, result retries, connected-player start permissions and one D1 flush per deadline-sync event. The game expansion adds exact arithmetic scoring, complete-order validation, safe voting/tie resolution for old room snapshots and localized numeric draft conversion.
- Cloudflare deployment dry-run passed: Worker, assets, D1 binding and SQLite Durable Object migration bundle correctly. This did not publish anything.
- Dependency audit reported zero vulnerabilities for both the full dependency tree and production dependencies.
- All 36 original content items received a separate answer and translation review. The final content review uses arithmetic proofs and primary factual sources.

## Browser acceptance, 2026-10-09

The real-duration session `482CSF` completed in three isolated Chrome contexts. Two players used German and one used English. The test created identities through the app and joined through the invitation form. Two players deliberately shared a display name; their identities and scores stayed separate.

Checked:

- Category selection and the 30-second voting deadline.
- Six estimation questions with 45-second answering and 10-second reveal phases.
- Identical question IDs and deadlines across German and English views.
- Hidden other-player answers and solution before reveal.
- German grouped input entered before switching to English retained its numeric meaning.
- Language change after submission kept the locked answer and deadline; a second answer was rejected.
- Reload restored the same identity and locked answer.
- The host left the page through a reveal and the next question; alarms continued and reconnection restored the score.
- Scores were verified after each round. Final scores were 6,000, 5,400 and 3,000 and matched the weekly leaderboard.
- A 390px mobile viewport had no horizontal overflow during reveal and results.
- Supplementary checks covered the final mobile homepage, recovery from an invalid stored token and Escape-key dismissal of the rules dialog.

Screenshots and the detailed report are generated locally under `test-results/`. That directory is ignored because it contains test artifacts. The browser session started during final content editing and retained its original package snapshot. A separate fresh-room check verified that the final package has the correct `2026-W41` metadata and no reuse label.

## Protocol load acceptance

The original three-category transport acceptance ran three rooms concurrently, with 30 real WebSocket clients in each room. It authenticated all 90 clients, joined through the HTTP API, voted, submitted real answers and checked server-generated scores through six full-duration rounds. This is transport load testing, not a claim that 90 human-operated browser windows were tested. The repeatable `scripts/protocol-test.mjs` now supports all six categories and category/player-count filters.

The script checks every category, room capacity, non-host start rejection, vote replacement, host disconnection before voting ends, automatic alarms, matching localized IDs/deadlines, hidden answers, duplicate submissions after language changes, reconnection with a locked answer, results and D1 leaderboards. Reports are generated as `test-results/protocol.json`.

An initial transport run was interrupted by development reloads that closed its raw test sockets. The UI clients reconnected automatically. The interrupted QA sessions were removed from the local D1 database, and the finalized server received a clean transport run.

## Cloudflare deployment, 2026-10-09

The Worker is deployed at https://brainbreak.brainbreak.workers.dev. D1 `brainbreak` was created in EEUR and migration `0001_initial.sql` was applied remotely. Wrangler OAuth was authorized with account/user read, Worker-script write and D1 write permissions, plus required background access. Credentials are stored by Wrangler outside the repository.

The new workers.dev address initially returned TLS handshake failures. HTTPS became available before the live checks ran; no certificate validation was bypassed. Three full-duration production transport sessions passed for trivia (`AWBQPV`), logic (`5C4WWA`) and estimation (`ASSE76`), each with three distinct authenticated clients. Results matched D1 leaderboards, and host disconnection, mixed languages, locked-answer reconnection and automatic deadlines all passed. An earlier run revealed a test race between per-player acknowledgements and the host's broadcast receipt. The assertion now waits for both signals. Only the explicitly generated QA records were removed after verification.

The deployed homepage was verified in the Codex browser. Real phone hardware remains untested; mobile checks use viewport emulation.

## Original V1 acceptance and restart

The clean transport run passed on 2026-10-09 in rooms `88UZDF` (estimation), `LJHL7T` (logic) and `64RPXX` (trivia). Every room contained 30 authenticated transport clients and completed six real-duration questions. Each host earned 6,000 verified points; every other submitted answer and resulting score also matched the server rules.

The final formatted source passed TypeScript, production build and all 17 rule tests. The original Wrangler process was terminated and a new process started against the same `.wrangler/state`. All **93 tested identities** retained their D1 weekly and all-time scores (90 transport players plus three browser players). Each independent browser then reloaded the result room and restored the same identity and 6,000/5,400/3,000 score. The detailed restart report is `test-results/restart.json`.

After the restart evidence was recorded, only the generated QA session records and their player records were removed from local D1. The app therefore opens with a clean leaderboard. Screenshots and verification reports remain in `test-results/`; there are no seeded product participants or fabricated leaderboard entries. The demo room access metadata remains in local Durable Object storage until its access deadline; it does not populate the D1 leaderboard.

## Additional game acceptance, 2026-10-09

Mental maths, true/false and ordering each passed a full-duration production session with 30 authenticated WebSocket clients: `MEPB3A`, `AD6M37` and `X6ABUS`. All six rounds, mixed-language deadlines, answer privacy, host disconnection, duplicate-answer rejection, locked-answer reconnection and D1 score persistence passed. The host earned 6,000 verified points in each room. The report is `test-results/protocol-production-extra-games.json`. The explicitly generated production QA records were removed; the public weekly and all-time leaderboards were empty afterward.

Two weekly packs now provide 72 reviewed questions across six categories. Existing rooms keep their stored category availability; a three-category snapshot cannot select a category without questions.

The ordering UI was checked in local room `TNH96D` with a real browser and two authenticated WebSocket companions. Reordering cards, changing language before and after locking, restoring the locked order after reload and awarding 1,000 points passed. Both locked and editable cards fitted a 390px viewport. The six-category public homepage also fitted that viewport in German and English.

Final review found a numeric draft bug when editing a value after changing language. Shared strict parsing and draft separator conversion now preserve the number, including an unfinished decimal. The regression unit suite has 21 passing tests. In local browser room `CJJ2SN`, German `10,8` became English `10.8`; adding two zeros produced `10.800`, and switching back produced `10,800`. German unfinished `10,` became English `10.`; adding `800` produced `10.800`. The server accepted that answer as 10.8, the locked German display showed `10,8`, and the reveal awarded 1,000 points.

The final numeric-draft correction was deployed as Worker version `e2f41a79-8a15-489e-a614-7528a806b008`, with UI asset `index-B8MHbBnx.js`. TypeScript and the production build passed during deployment.

## Drawing game checks, 2026-10-09

The new drawing category has 12 equivalent German/English words across the two packages, bringing the library to 84 tasks across seven categories. TypeScript, the production build and all 29 unit tests passed. Drawing tests cover artist-only word projection, private repeat guesses, bilingual exact aliases, correct-answer locks after reconstruction, persistent incremental canvas strokes, validation and quotas, clears, deadlines, rotating artists and idempotent artist scoring during D1 failures.

Local room `PRTX47` used one real Codex browser and two authenticated WebSocket companion clients. A pointer drag produced a shared stroke. Language change and reload retained the artist role, word and canvas. In the second question, the browser became a guesser and did not receive the secret word. An incorrect guess stayed private and did not lock the form. An English `tree` guess was accepted in the German UI and remained locked after reload. The browser displayed 2,000 points after the two successful questions. The drawing board and locked guess fitted a 390px viewport without horizontal overflow. The report is `test-results/drawing-ui.json`. This is one browser plus two transport clients, not three independent browser sessions.

Navigable Street View remains pending a Google Maps project and API key; it is not advertised as a playable category. See `docs/street-view-setup.md`. No Google account, billing account or key was created.

Automatic approval review rejected both an Ollama Cloud worker dispatch (explicit source-code transfer consent missing) and production deployment of the new drawing game (the reviewer did not consider previous publishing consent sufficient for this addition). The drawing game was implemented and reviewed locally without external source-code transfer. Its deployment awaits explicit user confirmation.

The complete local drawing transport session `MVU6K9` passed with 30 distinct authenticated clients and all six real-duration rounds. Each player earned 6,000 verified points through drawing or correct guesses. The run checked artist rotation, artist-only writes and word visibility, private failed guesses, bilingual answer locks, live strokes, board clearing, canvas replay after reconnect, host and artist disconnection, matching deadlines and D1 results. The detailed report is `test-results/protocol-local-drawing.json`. It is local verification, not a production deployment test.

After recording the reports, the five specifically generated local game-expansion sessions (`TNH96D`, `XAVCHR`, `CJJ2SN`, `PRTX47`, `MVU6K9`) were removed using their exact IDs and a completed-phase guard. Player identities and unrelated sessions were preserved. Reloading the local homepage showed an empty leaderboard. Production was unchanged.

## Expanded bank and adaptive difficulty, 2026-10-09

The local build now includes 294 unique bilingual questions (42 in each of seven categories), with 22 easy, ten medium and ten hard questions per category. The two weekly packages share the same identities. The 84 original questions remain in the pool; the 210 new questions have independent answer and translation reviews. Primary sources and proofs are recorded in `docs/adaptive-knowledge-review.md`, `docs/adaptive-challenges-review.md` and `docs/adaptive-drawing-review.md`. The editorial levels are not a claim of population-calibrated difficulty.

The content review corrected ambiguous salt concentration assumptions, an incomplete binary-tree definition, missing exactly-one-of-each box constraints, unclear periodic-table wording and weak hard-level tasks. Independent calculations used exact fractions and enumerations, including all 32,768 six-person acquaintance graphs and shortest-path search for the bridge puzzle.

The server starts at medium and adjusts between rounds using a fixed eligible roster. Exact thresholds, unchanged scoring, unrounded estimation error, decimal-boundary tolerance, drawing artist exclusion, no repeated question IDs, language parity, unused-bank privacy, legacy order and Durable Object reconstruction/D1 retry behavior are covered by the 40 passing tests. Strict typecheck and the production build passed. Wrangler's deployment dry-run passed with the existing bindings; it did not publish.

The expanded serialized weekly bank is approximately 190 KB. The configured Durable Objects use SQLite storage, whose [key/value combined limit is 2 MB](https://developers.cloudflare.com/durable-objects/platform/limits/). The bank stays server-side; the built frontend contains no question bank. There is no new API service, dependency or D1 migration.

At the time of local acceptance, publication awaited explicit approval after the previously reported automatic deployment rejection. The subsequent publication is recorded below.

The new UI was checked in room `ZKBWRG` with one real browser and two authenticated WebSocket companions. The first question displayed Medium; three correct answers produced “3/3 successful · Next question: Hard”. The next question displayed Hard in English and German. Reload retained its identity and level; language changes retained the locked answer. The difficulty badge and reveal feedback fitted a 390px viewport without horizontal overflow. The browser answered four questions correctly and left two unanswered, finishing on 4,000 points; both companions finished on 6,000. The server kept all three players eligible in the two unanswered rounds and correctly retained Hard at 2/3 success. The report is `test-results/adaptive-ui-companions.json`. This evidence is one browser plus two transport clients, not three isolated browsers.

The first seven-category, three-client protocol run reached five completed rounds, then exposed a test-history bug: a guesser's private error from an earlier artist rotation was mistaken for a new leaked error. The drawing test now compares only errors received during the current wrong-guess action. The eight exact local QA sessions from this run and the UI check were removed after they reached results, using `test-results/cleanup-adaptive-initial.sql`; player identities and unrelated sessions were retained.

A final content audit removed answer hints encoded by predictable choice positions and easy truth-ID parity. Multiple-choice positions are balanced and nonperiodic. Truth identities use a fixed nonperiodic permutation within each level; the review ledger records their actual ID suffixes. Question meaning, translations and solutions remain the reviewed versions. The final bank passed all 40 tests and strict typecheck again; the full transport repeat uses this bank.

The corrected complete local protocol repeat passed all seven categories with three independently authenticated WebSocket clients per room: drawing `67ZZYN`, arithmetic `EXSZN6`, trivia `A27ZAR`, estimation `XK762H`, ordering `H93ZYV`, true/false `88V2NN` and logic `8KCTNE`. The six non-drawing categories alternated all-correct/all-wrong answers and verified Medium → Hard → Medium across all six real-duration questions. All three drawing participants earned 6,000 points; the other categories earned 3,000 points each through three correct questions. Every selected identity was distinct within its session. Matching multilingual deadlines, private answers, duplicate locks, host disconnection, reconnects, drawing stroke replay and D1 results passed. The report is `test-results/protocol-local-adaptive.json`.

After that transport run, the final content-only ordering pass separated the two correct-choice sequences, reduced truth-ID parity correlations and replaced legacy truth IDs in new packages with opaque identities. An independent before/after comparison confirmed all 294 meanings, translations and correct answers were preserved. Correct and incorrect submissions for every choice question were checked in both languages. Fresh server projections for trivia, logic and truth verified Medium selection, privacy, matching languages/deadlines and the next Hard level; these are function-level checks, not additional real-browser sessions. The report is `test-results/adaptive-final-content-audit.json`. The final source passed all 40 tests, strict typecheck, production build and Wrangler dry-run. The bank serializes to 188,853 bytes.

The seven final QA sessions were removed using their exact IDs and a completed-phase guard in `test-results/cleanup-adaptive-final.sql`. Player identities and unrelated data were preserved. Test reports remain local. At that checkpoint, production remained unchanged pending publication approval.

## Publication of drawing and adaptive bank, 2026-10-09

The user explicitly requested publishing the site. `npm run deploy` passed strict typecheck and built the frontend before Wrangler published Worker version `1ecf0870-badb-4ed0-bab4-f19d048170d5` at https://brainbreak.brainbreak.workers.dev. The UI asset is `index-0dy-rqB1.js`. No D1 schema change was required.

The public homepage and leaderboard API returned HTTP 200. The served homepage referenced the expected new asset. A real browser displayed all seven categories and the new adaptive rules. Existing player results remained available; they were not removed or modified. The Decisions API is not integrated into Brainbreak by this deployment.

Production room `L4EZ6R` authenticated one freshly created QA identity through the real WebSocket API. Its lobby advertised all seven categories and the `adaptive-01` package with 294 questions. No solution or question bank was projected to the client. The game was not started, so this check created no leaderboard results. The report is `test-results/publication-smoke.json`. The QA lobby and its single participant row were then removed using their exact IDs, QA host, lobby phase and absence of other participants; real player identities and results were retained. The unused QA identity and Durable Object access snapshot remain until normal retention handling. This is a publication smoke test; the complete seven-category session evidence above is local.

## Mixed rounds, association, public drawing chat and sounds, 2026-10-09

The user requested a more minimal interface that preserves the original brain illustration, early round completion, public drawing chat with redacted correct guesses, mixed games, two-player support and sounds. The interface now uses restrained surfaces and compact game selection. The content pool contains 336 bilingual tasks across eight playable categories, including 42 association boards with 22 easy, ten medium and ten hard boards. Public board identities no longer reveal the deterministic shuffle seed. Geography has no configured Google project/key or verified panorama bank and remains unavailable.

All 74 unit tests and strict TypeScript checks passed. Nine sound tests cover initial/reloaded snapshots, reconnection catch-up, identity changes, repeated language/chat/canvas broadcasts, accepted answers, atomic final-answer/reveal priority, individual reveal scores, new rounds and repeated result-saving states. Sounds use local sine oscillators with short gain envelopes, a persisted mute control and user-gesture AudioContext activation. No speaker recording or subjective loudness measurement was available through the browser tool.

CUA checked the minimal homepage, tone activation, persisted mute after reload and a 390px viewport without horizontal overflow. Association room `CED7TM` completed six rounds with one browser and one independently authenticated WebSocket companion. German/English switching retained the round identity and deadline. A bilingual human clue survived reload. Complete target selection immediately revealed the round. The browser and companion each finished on 4,000 points. An asset rebuild disconnected the raw companion late in the UI session; the browser reconnected, missing hints used the real fallback and missing answers remained unsuccessful. This incidental interruption is not a clean frozen-build transport acceptance run. See `test-results/minimal-ui-check.json`.

CUA checked drawing room `DERHA5` with two participants. A wrong guess appeared in public chat; the artist sent a normal public message. An embedded secret word was rejected and did not appear in chat. The correctness table displayed the guesser's pending status. See `test-results/drawing-chat-ui.json`. The legacy browser-harness script was updated for adaptive question identities and early completion, and Python syntax/content-loader helpers passed; its full browser flow was not rerun in this revision. All UI checks described here used CUA.

The final frozen-build transport run exited successfully at 2026-10-09 15:55 UTC. It completed twelve scenarios and 72 rounds: all eight playable categories with 30 participants each, mixed mode with 30, association with two and four, and drawing with two. All 278 participants' result rows were independently confirmed in local D1; all twelve sessions reached results. Mixed room `TQH8Z2` used six distinct games. The report is `test-results/protocol-local-expanded.json`. During earlier attempts, an asset rebuild closed sockets, a test kept an obsolete numeric language format, and an assertion read another client's aggregate state before the final acknowledgement had arrived. The tests now await aggregate snapshot convergence; no server behavior was weakened to make the assertions pass. Those attempts remain historical partial evidence, not acceptance runs.

After transport acceptance, the drawing chat button was clarified to “Send”, and two-team association now displays the opponent's public clue under its team score. These UI-only changes passed strict typecheck and the production build. All 74 unit tests passed again after the final UI copy/projection polish. The protocol run was not repeated because server rules, task content and transport behavior were unchanged.

`npm run deploy` published version `edb3780c-3cc3-4aac-92c8-72098c1e24d3`. The public homepage serves `index-BbuEbdlS.js` and `index-DNzfEnC7.css`. Homepage, games inventory and leaderboard returned HTTP 200. The inventory contains eight playable categories plus mixed mode and excludes geography. CUA inspected the actual published minimal homepage and preserved brain illustration. Four existing production leaderboard entries were present at the smoke check; this update created no production QA rooms or results and changed no D1 schema. See `test-results/publication-expanded-smoke.json`. Geography provider behavior remains unverified without the owner's Google setup.


## Immediate voting completion and game controls, 2026-10-09

The final roster vote now commits the selected category, first question and a fresh 45-second deadline atomically. Offline players who have not voted retain the 30-second fallback. Five new backend checks cover immediate completion, durable recovery and idempotence; all 79 unit tests passed after the final frontend polish. Strict typecheck and the production build passed.

The focused transport run completed five scenarios, 30 rounds and 122 participants: trivia, ordering, drawing and mixed mode with 30 clients, plus two-player drawing. The host disconnected before the final vote; the final vote still started the first question immediately. Adaptive progression, privacy and result persistence passed. Independent local D1 inspection confirmed five completed sessions and 122 result rows. See `test-results/protocol-local-early-voting.json`.

CUA checked native mouse dragging in ordering room `GYMGVF`. Two drops produced the correct card order; switching English to German retained it, and submitting locked the controls and yielded 1,000 points. Arrow actions and answer submission are blocked during an active drag. The legacy browser-harness script was adjusted for immediate voting and passed Python syntax checks; its full browser flow was not rerun.

In drawing room `7LWA8D`, native pen and eraser drags produced a dark 0.008-width stroke and a durable white 0.014-width stroke. The screenshot visibly showed the erased gap. A real companion WebSocket received both strokes and solved the fifth round; both participants received 1,000 points and the round immediately revealed. At a 1280px viewport, the 630px canvas column and 280px chat column shared the same top edge. At 390px, the chat moved below the 310px canvas and the page had no horizontal overflow. Actual touchscreen hardware input was not tested. Reports: `test-results/controls-ui-check.json` and `test-results/controls-drawing-eraser.json`.

The final published version is `2f7c397c-021c-46ef-8f73-4f86bdcfe463`, serving `index-D5Xm2XgZ.js` and `index-Fij16m6L.css`. The final copy change clarifies immediate voting completion on the landing-page instructions; typecheck and the production build passed during deployment. Homepage, games inventory and leaderboard returned HTTP 200. CUA checked the actual public asset URLs and existing leaderboard. All four previous public leaderboard entries remained present; this revision created no production QA rooms or results and changed no D1 schema. See `test-results/publication-controls-smoke.json`. Country guessing was discussed as a possible next game and was not implemented in this revision.
