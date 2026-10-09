# Association board content review

Reviewed on 2026-10-09. `worker/content/bank-association.ts` contains 42 authored,
bilingual boards: 22 easy, ten medium, and ten hard. Each board contains two
equally sized, disjoint target groups and an equally sized neutral group.

| Tier   | Cards | Green targets | Purple targets | Neutral cards |
| ------ | ----- | ------------- | -------------- | ------------- |
| Easy   | 6     | 2             | 2              | 2             |
| Medium | 9     | 3             | 3              | 3             |
| Hard   | 12    | 4             | 4              | 4             |

For two or three players, the server uses the green group cooperatively. Purple
and neutral words remain distractors. With at least four players, both target
groups support competing teams. A human clue-giver can replace the reviewed
suggestion with a bilingual one-word clue. The server publishes the reviewed
suggestion after 15 seconds if the human clue is missing. Content does not
implement team assignment, deadlines, role privacy, or scoring; these remain
server responsibilities.

## Structural verification

A separate TypeScript transpilation/import check confirmed all 42 boards, the
22/10/10 tier distribution, the exact card counts, disjoint target sets, and
target membership in the offered options. Each board has distinct German and
English option texts. All hints match the server's one-word format, contain no
more than 30 characters, and are not equal to any word on the same board in
either language. No pair of boards has the same complete set of words.

Public option IDs are assigned after a deterministic shuffle. They encode no
colour. Across the boards, there are 20 distinct easy colour patterns, ten
medium patterns, and ten hard patterns. Opaque board IDs and answer IDs use separately generated tokens unrelated to the private shuffle seeds. They contain
no theme name or target set. Generic prompts and explanations contain neither
team's private clue. The content file is imported by the Worker rather than the
browser bundle.

The temporary structural report is
`/private/tmp/brainbreak-association-bank-proof.json`. The ledger below records
the semantic review independently from the target-ID mapping.

## Semantic and translation review

Both versions use the same concepts. The clues do not require rhymes, spellings,
letter patterns, homophones, or language-specific puns. Neutral words were
chosen separately for every board. They have no intended direct connection to
either reviewed theme. As with ordinary word-association games, a player may
find an imaginative alternative connection; the server's explicit target set
defines the scoring result.

IDs in the tables have the prefix `bank-association-`.

### Easy boards

The two target groups use familiar places, activities, or object categories.
Each clue covers both target concepts directly.

| ID       | Green clue, de/en        | Green words               | Purple clue, de/en       | Purple words              |
| -------- | ------------------------ | ------------------------- | ------------------------ | ------------------------- |
| e419bbd8 | Obst / Fruit             | Apple, pear               | Verkehr / Traffic        | Car, bus                  |
| 25df3423 | Möbel / Furniture        | Table, chair              | Musik / Music            | Drum, guitar              |
| f9ef4964 | Meer / Ocean             | Wave, coral               | Garten / Garden          | Watering can, flowerpot   |
| da067513 | Bäckerei / Bakery        | Bread, croissant          | Schlafen / Sleep         | Pillow, duvet             |
| c6e6d54a | Werkstatt / Workshop     | Hammer, saw               | Kleidung / Clothing      | Scarf, jacket             |
| b4261c51 | Kleidung / Clothing      | Scarf, jacket             | Schule / School          | Chalkboard, exercise book |
| 0b6423bd | Winter / Winter          | Snow, sled                | Küche / Kitchen          | Saucepan, frying pan      |
| 8e286b28 | Verkehr / Traffic        | Car, bus                  | Schlafen / Sleep         | Pillow, duvet             |
| d92e97b2 | Musik / Music            | Drum, guitar              | Haustiere / Pets         | Dog, cat                  |
| 03869805 | Garten / Garden          | Watering can, flowerpot   | Raumfahrt / Spaceflight  | Rocket, astronaut         |
| 25679fcc | Schlafen / Sleep         | Pillow, duvet             | Spielzeug / Toys         | Jigsaw puzzle, yo-yo      |
| 19c402fb | Küche / Kitchen          | Saucepan, frying pan      | Fußball / Soccer         | Soccer goal, soccer boot  |
| f55d7180 | Schule / School          | Chalkboard, exercise book | Baustelle / Construction | Crane, excavator          |
| 25fdbcc6 | Fußball / Soccer         | Soccer goal, soccer boot  | Wald / Forest            | Fir tree, roe deer        |
| 3b3c92b7 | Baustelle / Construction | Crane, excavator          | Frühstück / Breakfast    | Toast, muesli             |
| fb1d1832 | Wald / Forest            | Fir tree, roe deer        | Badezimmer / Bathroom    | Bathtub, toothbrush       |
| 432057e6 | Haustiere / Pets         | Dog, cat                  | Strand / Beach           | Seashell, beach umbrella  |
| 1bf72ba1 | Raumfahrt / Spaceflight  | Rocket, astronaut         | Bäckerei / Bakery        | Bread, croissant          |
| 30be30e2 | Spielzeug / Toys         | Jigsaw puzzle, yo-yo      | Möbel / Furniture        | Table, chair              |
| fcbb17d2 | Frühstück / Breakfast    | Toast, muesli             | Meer / Ocean             | Wave, coral               |
| 8d37a95e | Strand / Beach           | Seashell, beach umbrella  | Werkstatt / Workshop     | Hammer, saw               |
| 9851e771 | Badezimmer / Bathroom    | Bathtub, toothbrush       | Winter / Winter          | Snow, sled                |

Specific translations prevent mismatched senses: `Muschel` is presented as
`seashell`; `Fußballtor` and `Fußballschuh` become `soccer goal` and `soccer boot`;
`Reh` becomes `roe deer`; and `Schulheft` becomes `exercise book`.

### Medium boards

Each clue covers three cards. The extra card and larger board increase the
selection burden without requiring obscure vocabulary.

| ID       | Green clue, de/en        | Green words                       | Purple clue, de/en    | Purple words                               |
| -------- | ------------------------ | --------------------------------- | --------------------- | ------------------------------------------ |
| 400ba7bf | Obst / Fruit             | Apple, pear, peach                | Büro / Office         | Printer, keyboard, stapler                 |
| 20962ac4 | Meer / Ocean             | Shark, octopus, dolphin           | Backen / Baking       | Flour, yeast, bread                        |
| 2daf75df | Winter / Winter          | Icicle, sled, mitten              | Musik / Music         | Violin, drum, flute                        |
| bc161eed | Baustelle / Construction | Crane, excavator, hard hat        | Schmuck / Jewellery   | Ring, necklace, bracelet                   |
| 99de0f2f | Labor / Laboratory       | Microscope, beaker, pipette       | Post / Mail           | Postage stamp, envelope, mailbox           |
| 79c9e1ef | Burg / Castle            | Battlement, drawbridge, knight    | Frühstück / Breakfast | Toast, breakfast egg, muesli               |
| 3c1f05ad | Schule / School          | Chalkboard, exercise book, pencil | Reiten / Riding       | Saddle, reins, horseshoe                   |
| f5679d83 | Fliegen / Flight         | Kite, glider, hot air balloon     | Medizin / Medicine    | Bandage, clinical thermometer, stethoscope |
| a98fc23b | Reisen / Travel          | Suitcase, passport, travel ticket | Garten / Garden       | Watering can, flowerpot, seed              |
| 00c73cc1 | Theater / Theatre        | Actor, stage curtain, spotlight   | Nähen / Sewing        | Sewing needle, sewing thread, thimble      |

`Flugdrachen` means a flying kite, rather than a mythical dragon. Medical,
sewing, and theatrical objects are qualified in both languages where a more
general word would invite an unrelated sense.

### Hard boards

Hard boards have four targets per team and twelve cards. Many clues combine
different kinds of objects through a common function or relationship.

| ID       | Green clue, de/en       | Green relationship                                                                           | Purple clue, de/en       | Purple relationship                                                                                   |
| -------- | ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| 160b53f3 | Navigation / Navigation | Compass, map, lighthouse and North Star guide orientation or a route.                        | Schutz / Protection      | Helmet and shield protect a person; padlock protects access; rain umbrella protects against rain.     |
| 65c94b6f | Drehung / Rotation      | Wheel, windmill, vinyl record and spinning top operate through rotation.                     | Wärme / Warmth           | Fireplace and hot-water bottle supply warmth; scarf and wool blanket retain it.                       |
| c63fda01 | Verbindung / Connection | Bridge connects places, plug connects a circuit, knot joins cord, zipper joins fabric edges. | Zeit / Time              | Wristwatch, sundial, hourglass and calendar track time at different scales.                           |
| 911ac1a5 | Speicher / Storage      | Battery stores energy, bookshelf books, refrigerator food, backpack belongings.              | Rhythmus / Rhythm        | Metronome, drum, heartbeat and pendulum provide or exhibit recurring beats or motion.                 |
| 691dd6d2 | Grenze / Boundary       | Fence, coast, doorstep and boundary stone mark or separate spaces.                           | Signal / Signal          | Warning light, bell, flag and traffic light communicate a message or state.                           |
| 88629699 | Transport / Transport   | Conveyor belt, camel, boat and wheelbarrow carry loads or passengers.                        | Verbergen / Concealment  | Camouflage pattern, curtain, hideout cave and safe conceal a person or object from view.              |
| 16f0593c | Gleichgewicht / Balance | Seesaw, tightrope, scales and a one-legged stance involve physical balance.                  | Erforschen / Exploration | Telescope, magnifying glass, satellite and microscope reveal or investigate distant or small objects. |
| 7171e872 | Theater / Theatre       | Stage curtain, theatre mask, spotlight and marionette belong to theatrical performance.      | Rettung / Rescue         | Lifeboat, lifebuoy, rescue helicopter and rescue rope help recover a person from danger.              |
| f81cdd40 | Schatz / Treasure       | Pirate, chest, diamond and treasure map connect to finding, holding or seeking treasure.     | Nacht / Night            | Owl, moon, bat and lantern connect to nocturnal activity, the night sky or light in darkness.         |
| 4b9c824a | Hülle / Covering        | Snail shell, nutshell, skin and roof enclose or cover something.                             | Steuerung / Control      | Rudder, joystick, remote control and steering wheel control direction or operation.                   |

The hard clues apply in both languages without relying on a secondary sense
available in only one language. English `scales` means a weighing device here;
`chest` means a storage chest. `Polarstern` and `North Star` denote the same
navigation concept. More specific rescue and theatrical nouns preserve the
intended relationship.

## Score interpretation

The reviewed key is a set, not an ordering. A guesser must select exactly two,
three, or four cards for their team, depending on the board. Only the complete
correct set earns 1,000 individual points; partial matches earn zero. A human
clue-giver receives their contribution points only under the server's successful
manual-clue rule. An automatic fallback does not count as a human contribution.
Team scoring, reconnect behavior, and key privacy require backend tests and are
not claimed as verified by this content-only review.
