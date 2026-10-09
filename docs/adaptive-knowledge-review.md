# Adaptive knowledge bank review

Reviewed on 2026-10-09. `worker/content/bank-knowledge.ts` adds 90 bilingual questions: 30 trivia, 30 logic and 30 estimation questions. Each category contains ten easy, ten medium and ten hard items. These are authored content; no runtime AI generation or external content service is required.

Every item has equivalent German and English prompts and explanations. Multiple-choice items have four distinct choices in both languages. Correct IDs are distributed a=8, b=8, c=7, d=7 within each of trivia and logic. Correct-choice positions are balanced and nonperiodic, with independently arranged sequences for trivia and logic, so the question number does not encode the correct option. IDs remain stable. The renderer receives the ordinary `Question` shape, with an explicit difficulty on every new item.

## Factual provenance

The source field on each trivia item points to its supporting institution, museum, publisher or standards organization. Verification used primary institutional pages. General web summaries were not used as authorities. The historical statements avoid changing officeholders, current records or rankings.

| Trivia IDs | Verified subject                                             | Authority                                                                                                                                                      |
| ---------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01         | Canberra is Australia's capital                              | [National Capital Authority](https://www.nca.gov.au/education/canberras-history/canberra-seat-government)                                                      |
| 02, 24     | Venus surface heat; rotation versus orbital period           | [NASA Venus facts](https://science.nasa.gov/venus/venus-facts/)                                                                                                |
| 03         | Leonardo painted the Mona Lisa                               | [Louvre collection](https://www.louvre.fr/decouvrir/le-palais/de-la-joconde-aux-noces-de-cana)                                                                 |
| 04         | Taj Mahal is in Agra, India                                  | [UNESCO](https://whc.unesco.org/en/list/252/)                                                                                                                  |
| 05         | Berners-Lee invented the Web at CERN in 1989                 | [CERN](https://home.cern/science/computing/the-birth-of-the-web/where-web-was-born/)                                                                           |
| 06         | Fleming discovered penicillin in 1928                        | [Nobel biography](https://www.nobelprize.org/prizes/medicine/1945/fleming/biographical/)                                                                       |
| 07, 17     | Fe is iron; W is tungsten                                    | [Royal Society of Chemistry iron](https://periodic-table.rsc.org/element/26/iron), [tungsten](https://periodic-table.rsc.org/element/74/tungsten)              |
| 08         | Nitrogen dominates Earth's air                               | [NASA Earth facts](https://science.nasa.gov/earth/facts/)                                                                                                      |
| 09         | Acropolis and Parthenon are in Athens                        | [UNESCO](https://whc.unesco.org/en/list/404/)                                                                                                                  |
| 10         | Declaration adopted on 4 July 1776                           | [Library of Congress](https://guides.loc.gov/declaration-of-independence)                                                                                      |
| 11         | Angkor was a Khmer centre                                    | [UNESCO](https://whc.unesco.org/en/list/668/)                                                                                                                  |
| 12         | Petra was the Nabataean capital                              | [UNESCO](https://whc.unesco.org/en/list/326/)                                                                                                                  |
| 13         | Rembrandt's Night Watch, 1642                                | [Rijksmuseum](https://www.rijksmuseum.nl/en/stories/10-things/story/10-things-about-rembrandt-s-night-watch)                                                   |
| 14         | Velázquez's Las Meninas, 1656                                | [Prado collection](https://www.museodelprado.es/coleccion/obra-de-arte/las-meninas/9fdc7800-9ade-48b0-ab8b-edee94ea877f)                                       |
| 15         | Curie's Physics and Chemistry awards                         | [Nobel facts](https://www.nobelprize.org/prizes/physics/1903/marie-curie/facts/)                                                                               |
| 16         | Ordinary DNA guanine pairs with cytosine                     | [NHGRI](https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Fact-Sheet)                                                                           |
| 18         | Uranus has a roughly 98-degree axial tilt                    | [NASA Uranus facts](https://science.nasa.gov/uranus/facts/)                                                                                                    |
| 19         | Cervantes's Don Quixote; first part in 1605                  | [National Library of Spain](https://www.bne.es/es/colecciones/cervantes/ingenioso-hidalgo-don-quixote-mancha)                                                  |
| 20         | Sixth-century Hagia Sophia under Justinian                   | [UNESCO Istanbul](https://whc.unesco.org/en/list/356/)                                                                                                         |
| 21         | Rosetta Stone uses Demotic alongside hieroglyphs and Greek   | [British Museum](https://www.britishmuseum.org/blog/everything-you-ever-wanted-know-about-rosetta-stone)                                                       |
| 22         | Einstein's prize motivation names the photoelectric effect   | [Nobel facts](https://www.nobelprize.org/prizes/physics/1921/einstein/facts/)                                                                                  |
| 23         | Triton orbits Neptune retrograde                             | [NASA Neptune facts](https://science.nasa.gov/neptune/neptune-facts/)                                                                                          |
| 25         | Kelvin definition fixes the Boltzmann constant               | [BIPM](https://www.bipm.org/en/si-base-units/kelvin)                                                                                                           |
| 26         | Polonium named for Poland                                    | [Nobel Curie biography](https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/biographical/)                                                            |
| 27         | Pauli proposed the neutrino in 1930                          | [Nobel historical review](https://www.nobelprize.org/prizes/themes/how-the-sun-shines/)                                                                        |
| 28         | Lovelace's Bernoulli algorithm was for the Analytical Engine | [Open University, including Babbage's account](https://www.open.edu/openlearn/science-maths-technology/engineering-and-technology/technology/ada-lovelace-day) |
| 29         | Great Wave belongs to the Mount Fuji series                  | [Metropolitan Museum object record](https://www.metmuseum.org/art/collection/search/56353)                                                                     |
| 30         | Tordesillas agreement between Spanish and Portuguese crowns  | [UNESCO Memory of the World](https://www.unesco.org/en/memory-world/treaty-tordesillas)                                                                        |

Estimation IDs 01–04 use the [Steinway buyer's guide](https://www.steinway.com/dam/jcr%3Ac94babcc-fa76-4b8c-b1a6-8e8dac935aac/Steinway%20%26%20Sons%20Buyers%20Guide.pdf), [IUPAC's dated 2016 naming decision](https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/), [NHGRI's typical chromosome complement](https://www.genome.gov/about-genomics/fact-sheets/Chromosome-Abnormalities-Fact-Sheet), and [the Football Association's Law 3](https://www.thefa.com/football-rules-governance/lawsandrules/laws/football-11-11/law-3---the-players). The chromosome question explicitly asks about a typical complete body-cell complement rather than every cell or person.

Estimation 11 and 12 use exact SI definitions from [BIPM metre](https://www.bipm.org/en/si-base-units/metre) and [second](https://www.bipm.org/en/si-base-units/second). Estimation 16 uses the exact 2012 astronomical-unit definition from the [IAU](https://iauarchive.eso.org/public/themes/measuring/). Estimation 17 uses the volumetric mean lunar radius, 1737.4 km, in the [NASA fact sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html). The lunar prompt explicitly says approximately; the answer is a stable rounded reference rather than a falsely exact physical measurement. All other estimation prompts state their own complete scenario or mathematical assumptions.

## Logic answer review

| IDs   | Proof or enumeration                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------- |
| 01–05 | Day-count, contrapositive, four switch states, path costs 5 versus 8, last-in-first-out                 |
| 06    | Three qualifying results among four independent coin outcomes                                           |
| 07–08 | Strict weight chain; contrapositive of a library's cover rule                                           |
| 09    | Three possible colours force a repeat on draw four                                                      |
| 10    | Union size 8+5−2=11                                                                                     |
| 11    | Uniform winning door and mandatory informed host behavior make switching win in 2/3 of cases            |
| 12    | Three sequences with exactly two heads among eight                                                      |
| 13    | Without replacement: (3/5)(2/4)=3/10                                                                    |
| 14    | Ada truthful and Bo lying is the only consistent assignment                                             |
| 15    | All labels are wrong; the drawn red makes the “mixed” box all red and forces the “blue” box to be mixed |
| 16    | Optimal bridge schedule totals 17; all people and the lamp start on the same bank                       |
| 17    | Eleven ordered die outcomes contain at least one six, of which one contains two                         |
| 18    | Fix one position under rotational equivalence; 3!=6                                                     |
| 19    | Connected graph with exactly two odd vertices has an open Euler trail between them                      |
| 20    | Critical path A–C–D takes 4+5+2=11                                                                      |
| 21    | Ten defective plus 99 good flagged parts give posterior 10/109                                          |
| 22    | Only squares have odd divisor counts; exactly ten squares through 100                                   |
| 23    | Three consecutive integers contain factors 2 and 3; n=1 rejects the other choices                       |
| 24    | Inclusion–exclusion: 37−15+2=24; pair counts include the triple intersection                            |
| 25    | Four-item derangements: 24−24+12−4+1=9                                                                  |
| 26    | Fifteen ordered triples sum to 7; 15/216=5/72                                                           |
| 27    | Valid final pairs 12,24,32; two orders for the remaining digits each, total 6                           |
| 28    | First two labels are complements; the third must be false, forcing A                                    |
| 29    | 20 paths minus 2×6 paths through (1,1), leaving 8                                                       |
| 30    | Four equal bag-and-ball outcomes; three are red and two of those came from A                            |

## Estimation answer review

The non-factual answers were independently recalculated: 52, 24, 40, 48, 15, 1000; then 435, 36000000, 380, 1024, 8000 and 96. The hard answers use combinations, permutations, constrained codes, a completely populated binary tree and line arrangements:

| ID  | Independent calculation           | Answer  |
| --- | --------------------------------- | ------- |
| 21  | C(52,5)                           | 2598960 |
| 22  | C(20,10)                          | 184756  |
| 23  | 2^20                              | 1048576 |
| 24  | 6! × 2                            | 1440    |
| 25  | 6!/(3!×2!)                        | 60      |
| 26  | C(12,6)/2, unlabelled teams       | 462     |
| 27  | 4×9×8×7                           | 2016    |
| 28  | Sum of 2^i for i=0…10             | 2047    |
| 29  | 1+1+2+3+4+5+6                     | 22      |
| 30  | C(8,3) after fixed endpoint steps | 56      |

The binary-tree prompt explicitly places every leaf at depth ten. A merely full tree would not give a unique node count. Pizza cuts all cross inside and no three meet, so the maximum-region formula applies. All numeric answers are positive and finite; the largest is below JavaScript's exact-integer limit.

## Verification performed

A TypeScript transpilation and direct import confirmed 30 items per category and exactly ten items per tier. Every item had both translations. Every trivia item had an HTTPS source. Choice texts were distinct and the answer matched an offered ID. Numeric answers and units passed structural checks. Python independently enumerated three-die sums, divisible-by-four digit permutations, four-letter derangements, BANANA permutations and codes containing 7; it also checked combination formulas, binary-tree totals and the 100-switch simulation.

Difficulty is editorial, not calibrated from real-player telemetry. Hard questions require deeper deduction or specialized knowledge; the room's adaptive selection should adjust their use according to actual group results. This review does not claim a production deployment or human playtest of all 90 questions.

A separate shortest-path search enumerated all valid one- and two-person bridge crossings, including lamp location and return crossings. It independently confirmed that 17 minutes is the minimum for logic 16.

An independent read-only review of `bank-challenges.ts` checked all 90 final answers and the strict ordering of every ordering task. Exact rational arithmetic separately verified the ten hard ordering tasks, including combined pump rates, harmonic mean travel speeds, conditional draws, successive percentages, fractional comparisons and squared positive roots. Every hard ordering task had four distinct values. Arithmetic pump, travel-average and population-mixture calculations also passed independent fraction checks. The reviewer found no incorrect final answer or non-unique ordering. The probability wording of truth 26 originally omitted an explicit random-draw assumption; this minor clarification was reported to its owner before runtime testing.
