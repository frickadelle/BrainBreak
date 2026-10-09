# Navigable Street View setup

The geography game uses genuine navigable Google Street View panoramas and a separate world map for private guesses. The local integration is prepared, but the geography content pool is empty. The owner has confirmed that no Google Cloud project or billing account is configured. Geography must remain hidden from voting and mixed play until a restricted browser key and at least six verified panorama questions are available.

No Google account, project, API key or billing account was created. No live Google SDK request was made during implementation. No demo key, borrowed key or substitute photo quiz is used.

## Owner setup

1. Create or select a Google Cloud project. The owner must accept the relevant agreements and configure billing personally.
2. Enable the Maps JavaScript API.
3. Create a browser key with API restrictions permitting only the Maps JavaScript API.
4. Add HTTP website-referrer restrictions for `https://brainbreak.brainbreak.workers.dev/*`. Add `http://127.0.0.1:8787/*` and `http://localhost:8787/*` only if local provider testing is required. Include other actual development origins explicitly rather than permitting all websites.
5. Configure practical API quotas and billing alerts before activation.
6. Set the key through the Cloudflare CLI. In the project directory, run `npx wrangler secret put GOOGLE_MAPS_BROWSER_KEY` and enter the key at its prompt. Do not paste it into chat, commit it, or include it in a command-line argument. For local development, the owner can put the same configuration name in the ignored `.dev.vars` file.

A Maps browser key is intentionally sent to browsers and to Google's SDK endpoint. Storing it as a Wrangler secret keeps it out of source files; it does not make the browser-visible value confidential. The API and HTTP-referrer restrictions are essential. Deployment and activation still require the user's publication authorization.

Primary setup sources: [Google API setup and key restrictions](https://developers.google.com/maps/documentation/javascript/get-api-key), [API security guidance](https://developers.google.com/maps/api-security-best-practices), [usage and billing](https://developers.google.com/maps/documentation/javascript/usage-and-billing).

## Curate and verify real starting locations

Use the enabled owner's project to obtain real `StreetViewService` panorama results. Select locations with functioning navigation links, not static indoor or isolated images. For each question, record the returned panorama ID and the panorama's actual coordinates. The requested search coordinate is not necessarily the camera position and must not become the scoring target by assumption.

Each server-only `Question.geography` entry contains:

- `panoId`: the real, verified provider ID;
- `target`: the returned camera position `{ lat, lng }`;
- optional initial `heading` from 0 through less than 360 and `pitch` from −90 through 90;
- `verifiedAt`: a valid UTC ISO timestamp from the successful verification.

Provide a bilingual prompt and explanation, a stable question ID and an editorial difficulty. Do not copy answer coordinates into the public prompt or options. The content pool is currently empty; there are no invented IDs or placeholder locations to enable accidentally.

Google documents panorama IDs as stable only within the current browser session. Re-verify IDs and navigation immediately before activation and after provider imagery changes. A saved verification timestamp does not guarantee that an ID continues to work. The current client reports unavailable imagery and prevents confirming a guess when the panorama fails; it does not silently change the target or substitute another location. Future automated refresh needs a separately reviewed provider lookup mechanism that retains server ownership of the target.

Before exposing geography, verify real navigation, initial-view consistency and private guesses in three independent browsers. Include both languages, a same-question language change, connection loss and reconnection, mobile layout, keyboard coordinate entry, deadline locking and distance scoring. Moving through Street View must not change the starting target. Confirm that the public question includes only `panoId`, `heading` and `pitch`; reveal coordinates only after the round deadline.

Primary provider sources: [Street View service and standalone panoramas](https://developers.google.com/maps/documentation/javascript/streetview), [panorama methods, status events and ID lifetime](https://developers.google.com/maps/documentation/javascript/reference/street-view).

## Local implementation

`src/GeoGame.tsx` loads one Google SDK script per page only when a room supplies both a configured browser key and a public panorama. It creates a standalone panorama with navigation enabled. Address and road labels, fullscreen, motion tracking and the close button are disabled. Google's attribution remains intact. The guess map is independent and starts at a neutral world view; it is never centred on the hidden answer. A circle marks the selected guess without needing a map ID or deprecated marker API.

Players can click the map or enter signed latitude and longitude through a labelled keyboard form. Drafts use the active language's decimal separator. Switching languages preserves the current panorama, guess and unfinished coordinate drafts. Connection updates preserve the panorama and guess. Confirmation uses the ordinary authoritative answer protocol and respects the server-adjusted deadline. The SDK load timeout is 20 seconds and panorama readiness timeout is 15 seconds. Authentication errors and unavailable imagery have German and English feedback. Listeners, circles, panorama visibility and component timers are cleaned up on question changes or unmount.

`worker/geography.ts` accepts a strict JSON pair with exactly numeric `lat` and `lng` fields. It rejects non-finite values, extra fields and coordinates outside ±90/±180, then normalizes to six decimal places. Distance uses a haversine great-circle calculation on the mean-radius sphere. Points are `round(1000 × exp(−distanceKm / 1500))`. A guess within 100 km counts as successful for adaptive difficulty. Invalid or unverified questions cannot award geography points.

The server hides geography when the key is absent or there are fewer than six verified questions. It preserves the existing room identity, private answer locking, reconnection and D1 answer storage; no database schema is added.

## Verification and limits

Eight local unit tests pass for strict payload validation, signed localized coordinate input, coordinate normalization, known great-circle distances, antimeridian and polar cases, score decay, the success threshold and verification metadata. Backend tests separately cover availability gating, answer privacy and reveal behavior. These tests use explicit geometry fixtures and do not pretend to verify a Google panorama.

Real SDK loading, project authorization, imagery navigation and provider billing remain unverified because the owner has not configured a project, billing and a restricted key. Geography is prepared and disabled, not a playable production feature.

## Provider costs

Pricing recorded on 2026-10-09: Dynamic Street View includes a 5,000-event monthly free cap, then $14 per 1,000 events in the first paid tier. Dynamic Maps has a separate 10,000-event cap, then $7 per 1,000 in the first paid tier. Both require billing configuration. Other applications using the same account may consume the caps. Measure the actual panorama and map lifecycle before forecasting game costs; no zero-cost guarantee is made.

The [Google pricing table](https://developers.google.com/maps/billing-and-pricing/pricing) governs current rates. The [Maps Embed API](https://developers.google.com/maps/documentation/embed/embedding-map) is a different integration and does not provide the event/control interface used here.
