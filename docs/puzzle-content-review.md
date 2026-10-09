# New puzzle content review

Reviewed on 2026-10-10. The bank adds 42 rounds for each of seven games (294 new rounds). Together with the 336 existing rounds, the current library has 630 tasks across 15 playable categories. Every category has 22 easy, 10 medium and 10 hard tasks. The unconfigured Google geography category remains empty.

## Authorship and secret identities

The finite definitions were authored locally. No AI service, third-party runtime content API, account or key is used. New question IDs, option IDs, group IDs and country asset filenames are opaque random identifiers fixed in source. They contain no secret words, country names, ISO codes, code solutions or generation seeds. Every player-facing prompt, explanation, scale, clue, option and group title has reviewed German and English text. Wordle deliberately uses the same five English letters and dictionary for all languages.

## Code breaking

All 42 secret codes are different. Easy codes have three positions drawn from 0–5. Medium codes have four positions drawn from 0–5. Hard codes have four positions drawn from 0–7 and deliberately contain repeated digits. Six attempts apply throughout. Correct-position and misplaced-symbol feedback must consume repeated symbols once; engine tests cover this behavior. The code definitions are server-only.

## Visual SET

Every board has twelve different visible cards and at least one valid set. Shape, colour and count are active in easy and medium boards; fill adds a fourth feature in hard boards. Card counts are 1–3; shape, colour and fill indices are 0–2. Every card triple was independently enumerated. The 22 easy boards have 9–14 valid sets, the ten medium boards 5–6, and the ten hard boards 1–4. All 42 boards differ in visible designs, not merely IDs. Difficulty therefore changes actual visual feature count or solution density. Four incorrect selections are allowed.

The mathematical rule requires each active feature to be all the same or all different. Two equal values and one different value fail. This is also the standard rule described by the [SET publisher](https://www.playmonster.com/wp-content/uploads/2020/01/SETRules.pdf).

## Connections

The 42 boards use 42 reviewed themes. Easy boards contain two groups (eight words), medium three (twelve words) and hard four (sixteen words). Each group contains exactly four options. Every option belongs to one group. All 42 boards contain different combinations of themes and different full word sets. There are no homophones, English-only puns or answer-revealing option IDs. Four wrong selections are allowed.

The themes cover ordinary fruit, vegetables, animals, household objects, clothing, tools, musical instruments, sports, games, shapes, body parts, furniture, rooms, calendar terms, materials, plants, transport, computers, cooking and weather. Culinary vegetables use carrot, potato, onion and lettuce to avoid botanical-fruit ambiguity. Triangle shape is distinguished from the percussion instrument in English. Ludo uses the same game name in both languages. Instrument-family memberships follow conventional orchestral classification, including the saxophone as woodwind; see [Philharmonia instruments](https://philharmonia.co.uk/resources/instruments/).

A semantic review checked each board for plausible cross-group alternatives and untranslated wordplay. Group titles describe narrow conventional categories. Free word association cannot prove that nobody will invent a broader connection; the defined partition is the intended conventional partition. Metadata tests prove that the partition is complete and disjoint, and that words are distinct in both languages.

## Wavelength

All 42 scales have different endpoints. Targets lie from 20 through 80. The 22 easy fallback clues describe familiar examples near an endpoint; the ten medium and ten hard scales introduce more nuanced contexts and intermediate positions. The supplied bilingual fallback is editorially plausible for its fixed target. It is not an objective factual measurement. Human clue-givers can use different examples. The target is server-owned and must never appear before reveal in a guesser view. The engine supplies fallback clues after 15 seconds and rotates the clue-giver.

## Memory

The 42 sequences are different and contain at least three distinct symbols. Easy rounds use four positions and a 4000ms preview. Medium rounds use five positions and 3500ms. Hard rounds use six positions and 3000ms. Sequences use distinct abstract Unicode shapes, not colour alone, and may contain repeats. Preview timing and the hidden sequence belong to the server. Reload must not extend the preview.

## Wordle

All 42 solution words are different common English words with five ASCII letters. The 513-word allowed list is authored as a finite ordinary-English dictionary and includes all secrets, common opening guesses and inflected words. It is not copied from the New York Times or advertised as accepting every English word. It includes repeated-letter secrets such as APPLE, GLASS, CHESS, SHEEP and WHEEL to exercise the correct counting rule. Six guesses apply. Dictionary and feedback are identical for German and English players. The allowed list stays server-side; clients learn whether a submitted word is accepted.

## Country asset provenance

The 42 bundled SVG illustrations are 22 flags and 20 outlines. Every asset was rendered together on a contact sheet and visually inspected. The outlines are genuine Natural Earth 5.1.1 Admin 0 country geometry downloaded from the [official dataset page](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/) through its NACIS-hosted archive. [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/) place these map data in the public domain and permit modification and redistribution. Archive SHA-256: `0f243aeac8ac6cf26f0417285b0bd33ac47f1b5bdb719fd3e0df37d03ea37110`.

A small local decoder read the matching DBF and polygon shapefile records. Country rings were projected using longitude scaled by the cosine of the mean latitude and preserved north-up. Their own bounds were fitted into a 300×240 viewport. Coordinates were rounded to two SVG decimal places. No hand-invented country silhouettes were used. All country components in each record are retained, except Norwegian Arctic outlying polygons north of 72°N; the Norwegian prompt explicitly states this exception. Lesotho remains a hole inside the South African outline. Natural Earth uses de facto boundaries; these coarse recognition illustrations are not legal boundary maps.

Flags were newly drawn as geometric SVG shapes. Their identifying colour order, cross, disc or triangle is verified against the primary sources below. Danish, Finnish, Swedish and Norwegian proportions and approximate digital colours follow the Nordic Council reference pages. Iceland follows its own government diagram and flag statute: 25×18, white cross width 4 at x/y 7, red cross width 2 at x/y 8. The Nordic Council page currently gives incorrect Finnish-like dimensions for Iceland, so it is not used for Icelandic proportions. Japan follows its government’s 2:3 rectangle and centred disc diameter three-fifths of the height. The remaining illustrations are recognizable schematic national flags, not official print or manufacturing templates. Netherlands and Luxembourg are never offered as distractors for each other. There are four distinct country options per task.

All flag references now come from the country's own government, legislature, defence force or the Nordic governmental cooperation site. The older UK-hosted historical anthology was removed as a flag authority after a closer publication-context review. National constitutional provisions and current government flag guidance provide direct support for the current colour patterns. Iceland also cites its [flag statute](https://www.althingi.is/lagas/138a/1944034.html).

Assets contain only geometric drawing elements. They contain no country titles, descriptions, metadata, comments, external resources, scripts or identifying filenames. Country source URLs and provenance remain in server content and this review.

| Asset                | Kind    | Reviewed country | Primary reference                                                                                                                      |
| -------------------- | ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `7a1e8a84af4ae5.svg` | flag    | Germany          | [Source](https://www.gesetze-im-internet.de/englisch_gg/englisch_gg.html)                                                              |
| `33590585ff43d0.svg` | flag    | France           | [Source](https://www.elysee.fr/en/french-presidency/the-french-flag)                                                                   |
| `c55e1ac48c2139.svg` | flag    | Italy            | [Source](https://www.senato.it/istituzione/la-costituzione/principi-fondamentali/articolo-12)                                          |
| `459d05082b2b57.svg` | flag    | Japan            | [Source](https://www.japan.go.jp/japan/flagandanthem/index.html)                                                                       |
| `60f14b688f6ca8.svg` | flag    | Austria          | [Source](https://www.ris.bka.gv.at/eli/bgbl/1930/1/A8a/NOR40045733)                                                                    |
| `323373f9fff172.svg` | flag    | Poland           | [Source](https://www.gov.pl/web/diplomacy/polands-day-of-the-flag)                                                                     |
| `c774acace86886.svg` | flag    | Ukraine          | [Source](https://www.president.gov.ua/ua/documents/constitution/konstituciya-ukrayini-rozdil-i)                                        |
| `4b2d676a91c854.svg` | flag    | Switzerland      | [Source](https://www.aboutswitzerland.eda.admin.ch/en/swiss-flag)                                                                      |
| `62b635fdf5a805.svg` | flag    | Denmark          | [Source](https://www.norden.org/en/information/danish-flag)                                                                            |
| `a78a9a336ad62d.svg` | flag    | Sweden           | [Source](https://www.norden.org/en/information/swedish-flag)                                                                           |
| `4057f775582034.svg` | flag    | Finland          | [Source](https://www.norden.org/en/information/finnish-flag)                                                                           |
| `fb96ca8624fab5.svg` | flag    | Norway           | [Source](https://www.norden.org/en/information/norwegian-flag)                                                                         |
| `dc2c813684100a.svg` | flag    | Iceland          | [Source](https://www.stjornarradid.is/verkefni/stjornskipan-og-thjodartakn/thjodartakn/fani-islands/)                                  |
| `5d2121b5ee165a.svg` | flag    | Netherlands      | [Source](https://www.koninklijkhuis.nl/onderwerpen/koninklijk-huis/vlaggen-en-vlaginstructie/nederlandse-vlag)                         |
| `285463a2c9e162.svg` | flag    | Belgium          | [Source](https://www.belgium.be/en/about_belgium/country/belgium_in_nutshell/symbols/flags)                                            |
| `4f802eca8cc6ae.svg` | flag    | Ireland          | [Source](https://www.military.ie/en/public-information/defence-forces-museums/defence-forces-history/the-national-flag/)               |
| `826e5c73a3cddf.svg` | flag    | Hungary          | [Source](https://njt.jog.gov.hu/jogszabaly/en/2011-4301-02-00)                                                                         |
| `ba54d3606cac5b.svg` | flag    | Romania          | [Source](https://www.cdep.ro/ords/pls/dic/site.page?id=256&idl=2&par1=1)                                                               |
| `04c2f5c0bd079a.svg` | flag    | Luxembourg       | [Source](https://luxembourg.public.lu/en/societe-et-culture/systeme-politique/symboles-nationaux.html)                                 |
| `bd1faf30f6a0b4.svg` | flag    | Estonia          | [Source](https://www.riigikogu.ee/en/pressiteated/100-years-ago-blue-black-white-flag-raised-first-time-national-flag/)                |
| `0b8500aff8efe5.svg` | flag    | Lithuania        | [Source](https://www.lrs.lt/sip/portal.show?p_a=1710&p_k=2&p_kade_id=9&p_r=35580)                                                      |
| `f584cbe3bea2f8.svg` | flag    | Czechia          | [Source](https://vlada.gov.cz/en/clenove-vlady/historie-minulych-vlad/historie-statni-vlajky/the-czech-republics-national-flag-19198/) |
| `8d1258e32409f5.svg` | outline | Italy            | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `eb9096208c2767.svg` | outline | Japan            | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `c80080e3e2839c.svg` | outline | Chile            | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `fde1c1b5f34105.svg` | outline | Brazil           | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `e230943798d000.svg` | outline | Australia        | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `2d29481fb7a2e0.svg` | outline | United Kingdom   | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `2c0d9aa367b283.svg` | outline | Argentina        | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `3dc92c774d7cb3.svg` | outline | New Zealand      | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `fa41573ec770ae.svg` | outline | South Africa     | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `b2e50c77e70371.svg` | outline | Spain            | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `c4b2a08f4ab60a.svg` | outline | Portugal         | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `aedf6020847348.svg` | outline | Germany          | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `cb4239b67d51da.svg` | outline | Sweden           | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `28d7dbe223d647.svg` | outline | Madagascar       | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `30f1b6d16ee261.svg` | outline | Cuba             | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `af299f58eaf9a5.svg` | outline | Vietnam          | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `abeaed35da2b62.svg` | outline | Thailand         | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `e2556aa4896c7e.svg` | outline | Finland          | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `aac38e7ef54624.svg` | outline | Greece           | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |
| `fc695da4044926.svg` | outline | Norway           | [Source](https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/)                                     |

## Verification

Content-bank tests validate 630 unique question IDs, 42 tasks per playable category and the 22/10/10 split. They check bilingual strings, engine validity, all SET solution counts, unique sequence/board/secret definitions, complete connection partitions, dictionary membership, and all 42 local country assets. Country filenames are opaque; all SVG bodies are different, safe geometric markup and contain no readable answer metadata. The tests explicitly distinguish engine-owned multi-answer puzzles from simple option-answer questions.

This review verifies authored content and assets. It does not replace browser controls, multiplayer transport, tutorial readiness, persistence or production deployment acceptance. The root task owns those checks.

Independent semantic review corrected the Empty–Full fallback to a glass three-quarters full for target 76. It also aligned the German pole Unpersönlich with English Impersonal.

The corrected Iceland asset `dc2c813684100a.svg` has SHA-256 `000213d0e2b8c72d3f654014dd6da19a9def74693378bfdc3700dff24d77d1d6`. Its 25×18 geometry was rendered and visually verified after correction.
