# Adaptive challenge bank review

Reviewed on 2026-10-09. `worker/content/bank-challenges.ts` adds 90 questions:
30 arithmetic, 30 true/false, and 30 ordering questions. Each category has ten
questions at each of the easy, medium, and hard levels. Both languages contain
the same inputs, assumptions, units, solutions, and explanations.

These questions use self-contained mathematics. No changing real-world figures,
external question service, or runtime AI generation is required. Difficulty is
an editorial starting point; the server adapts the next round to the group's
actual performance. Hard questions involve conditional probability, dependent
draws, combinations, logical guarantees, combined rates, inverses, or multiple
calculation steps. They do not rely solely on larger numbers.

## Verification method

The numerical answers were recomputed in a separate Node script from the
question inputs, without importing any formulas from the content module. The
script compared all 30 arithmetic answers and all 30 ordering sequences with the
exported questions. Every ordering question has four distinct evaluated values
or four uniquely constrained positions. Both languages have four distinct
option labels. The checks passed.

Further exhaustive checks enumerated all 36 ordered dice outcomes, all ten
unordered pairs from a five-ball urn, and all 32,768 possible acquaintance
graphs on six people. A direct search found the smallest remainder solution,
and an integer search recovered both rectangle side lengths. These checks
passed. The temporary numerical report is
`/private/tmp/brainbreak-challenges-proof.json`; the durable proof ledger below
contains the reasoning needed to reproduce the checks.

The truth questions have exactly five true and five false answers per tier.
Their universal statements have a proof; false statements have a concrete
counterexample or a corrected result. Probability questions explicitly state
fair independent tosses or random draws without replacement. Dependent draws
use the updated conditional probability for the second draw.

An independent parent review identified two editorial improvements: the drink
mixture now explicitly specifies volume percentages, and weak hard truth items
were replaced by a conditional urn question and the six-person acquaintance
guarantee. A medium item about multiplying negative numbers was replaced by a
matching-dice calculation to reduce repetition.

## Arithmetic answer ledger

IDs below have the prefix `bank-arithmetic-`.

| ID  | Tier   | Independent calculation                                                 | Answer          |
| --- | ------ | ----------------------------------------------------------------------- | --------------- |
| 01  | Easy   | 60 × 0.15                                                               | 9               |
| 02  | Easy   | 320 × 3/4                                                               | 240 ml          |
| 03  | Easy   | 8 × 0.50 + 6 × 0.20                                                     | 5.20 euros      |
| 04  | Easy   | 60 + 25 minutes between 19:20 and 20:45                                 | 85 minutes      |
| 05  | Easy   | (11 + 14 + 17)/3                                                        | 14              |
| 06  | Easy   | 2(7 + 4)                                                                | 22 m            |
| 07  | Easy   | −6 + 11                                                                 | 5 °C            |
| 08  | Easy   | ceil(43/8)                                                              | 6 packs         |
| 09  | Easy   | 3 even die faces / 6 faces                                              | 50%             |
| 10  | Easy   | (31 − 7)/3                                                              | 8               |
| 11  | Medium | 72/0.80                                                                 | 90 euros        |
| 12  | Medium | 100 × 1.20 × 0.75                                                       | 90 euros        |
| 13  | Medium | 35 × 2/(2 + 3)                                                          | 14 balls        |
| 14  | Medium | (2 × 60 + 3 × 80)/5                                                     | 72 points       |
| 15  | Medium | (2 × 30 + 3 × 10)/(2 + 3); percentages are by volume                    | 18%             |
| 16  | Medium | 120/1.5                                                                 | 80 km/h         |
| 17  | Medium | 84/(6 − 2)                                                              | 21 minutes      |
| 18  | Medium | HT and TH out of HH, HT, TH, TT                                         | 50%             |
| 19  | Medium | Recurrence: 2, 5, 7, 12, 19, 31                                         | 31              |
| 20  | Medium | 6 × 5 / 2 unordered pairs                                               | 15 teams        |
| 21  | Hard   | Total distance 120 / total time (60/40 + 60/60)                         | 48 km/h         |
| 22  | Hard   | (3/5) × (2/4)                                                           | 30%             |
| 23  | Hard   | (2/5)(3/4) + (3/5)(1/3)                                                 | 50%             |
| 24  | Hard   | Minute hand 120°, hour hand 100°                                        | 20°             |
| 25  | Hard   | Multiples of 35: 35, 70, 105, 140, 175; remainders mod 6: 5, 4, 3, 2, 1 | 175             |
| 26  | Hard   | 1 / (1/6 + 1/8 − 1/24)                                                  | 4 hours         |
| 27  | Hard   | 108 / (0.80 × 0.90)                                                     | 150 euros       |
| 28  | Hard   | Ordered sums 10: 3 outcomes; 11: 2; 12: 1                               | 6 outcomes      |
| 29  | Hard   | Fix one person; permute remaining four: 4!                              | 24 arrangements |
| 30  | Hard   | Side sum 15, product 54; roots 6 and 9                                  | 9 cm            |

All numerical answers have a finite decimal representation. The numeric answer
field does not require a fraction or a rounded irrational result. Probability
questions state whether to enter a percentage or an outcome count. Clock
questions explicitly state continuous hand motion. Combined-rate questions
explicitly state constant rates. Circular seating treats rotations as identical
and reflections as distinct.

## Truth answer ledger

IDs below have the prefix `bank-truth-`. T means true; F means false.

| ID  | Tier   | Answer | Proof or counterexample                                                                                                                                                                                                                                                      |
| --- | ------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 06  | Easy   | T      | x < 0 implies x × x > 0.                                                                                                                                                                                                                                                     |
| 01  | Easy   | F      | 1 has one positive divisor, not two.                                                                                                                                                                                                                                         |
| 09  | Easy   | T      | 0.25 = 25/100 = 1/4.                                                                                                                                                                                                                                                         |
| 02  | Easy   | F      | (2s)² = 4s², not 2s².                                                                                                                                                                                                                                                        |
| 04  | Easy   | T      | Independent fair tosses retain probability 1/2 after any history.                                                                                                                                                                                                            |
| 08  | Easy   | F      | (4 + 10)/2 = 7, not 8.                                                                                                                                                                                                                                                       |
| 03  | Easy   | T      | 0.20 × 50 = 10.                                                                                                                                                                                                                                                              |
| 10  | Easy   | F      | 0.3 < 0.333… = 1/3.                                                                                                                                                                                                                                                          |
| 07  | Easy   | T      | The prefix kilo denotes a factor of 1000.                                                                                                                                                                                                                                    |
| 05  | Easy   | F      | 30 ends in 0 but is not divisible by 4.                                                                                                                                                                                                                                      |
| 18  | Medium | F      | 100 × 1.10 × 0.90 = 99.                                                                                                                                                                                                                                                      |
| 13  | Medium | T      | Six matching pairs among 36 ordered die outcomes: 1/6.                                                                                                                                                                                                                       |
| 20  | Medium | T      | Coprime factors 2 and 3 together imply factor 6.                                                                                                                                                                                                                             |
| 11  | Medium | F      | Median of 0, 1, 100 is 1; mean is 101/3.                                                                                                                                                                                                                                     |
| 17  | Medium | T      | One die cannot show 1 and 6 in the same roll.                                                                                                                                                                                                                                |
| 14  | Medium | F      | Rectangles 1 × 5 and 2 × 4 have perimeter 12 but areas 5 and 8.                                                                                                                                                                                                              |
| 19  | Medium | T      | Independent joint probability 0.60² = 0.36.                                                                                                                                                                                                                                  |
| 12  | Medium | T      | n + (n + 1) + (n + 2) = 3(n + 1).                                                                                                                                                                                                                                            |
| 16  | Medium | F      | Time = distance/speed, so doubling speed halves time.                                                                                                                                                                                                                        |
| 15  | Medium | F      | Remaining fraction 0.60 × 0.80 = 0.48: discount 52%, not 60%.                                                                                                                                                                                                                |
| 27  | Hard   | T      | A person has at least three acquaintances or three non-acquaintances. In that trio, a pair with the first relation completes a matching triangle with that person; otherwise the trio forms a triangle of the opposite relation. Exhaustively verified on all 32,768 graphs. |
| 29  | Hard   | T      | Of ten urn pairs, three are all blue. Seven have at least one red and one of those is all red: conditional probability 1/7.                                                                                                                                                  |
| 21  | Hard   | F      | Two rolls have 11 outcomes with at least one 6, so probability 11/36 rather than 1/3.                                                                                                                                                                                        |
| 24  | Hard   | F      | Joint probabilities for heads are 1/4 from the fair coin and 1/2 from the double-headed coin. Conditional share of the latter is (1/2)/(3/4) = 2/3.                                                                                                                          |
| 22  | Hard   | T      | Complement of at least one head in three tosses is TTT: 1 − 1/8 = 7/8.                                                                                                                                                                                                       |
| 30  | Hard   | F      | Without replacement, two red has probability (3/5)(2/4) = 3/10; 9/25 would require replacement.                                                                                                                                                                              |
| 26  | Hard   | T      | Adding 10 shifts each value and its mean by 10; deviations and variance stay unchanged.                                                                                                                                                                                      |
| 23  | Hard   | F      | Equal distances at 40 and 60 km/h have harmonic mean 48 km/h.                                                                                                                                                                                                                |
| 28  | Hard   | T      | n³ − n = (n − 1)n(n + 1), containing a factor 2 and a factor 3.                                                                                                                                                                                                              |
| 25  | Hard   | F      | If B is a subset of A, P(A) = 0.7 and P(B) = 0.6 can have P(A∩B) = 0.6. Independence is needed for 0.42.                                                                                                                                                                     |

The acquaintance question defines a symmetric relation for every pair and does
not require familiarity with a named theorem. Its explanation supplies the
complete argument. The conditional urn question states the observation exactly;
it does not depend on an unspecified information-selection procedure.

## Ordering answer ledger

IDs below have the prefix `bank-order-`. Each row lists values in published
option order a, b, c, d. Repeated numeric values are forbidden within a question.

| ID  | Tier   | Evaluated values a; b; c; d                             | Ascending answer |
| --- | ------ | ------------------------------------------------------- | ---------------- |
| 01  | Easy   | −2; 5; −8; 0                                            | c,a,d,b          |
| 02  | Easy   | 0.5; 0.25; 0.75; 1                                      | b,a,c,d          |
| 03  | Easy   | 90; 120; 45; 30 seconds                                 | d,c,a,b          |
| 04  | Easy   | 1.2; 0.9; 1.5; 1 metres                                 | b,d,a,c          |
| 05  | Easy   | 12; 15; 16; 11                                          | d,a,b,c          |
| 06  | Easy   | 0.2; 1/3; 0.25; 0.4                                     | a,c,b,d          |
| 07  | Easy   | 6; 8; 5; 7 euros                                        | c,a,d,b          |
| 08  | Easy   | 400; 450; 350; 500 grams                                | c,a,b,d          |
| 09  | Easy   | 8; 9; 4; 16                                             | c,a,b,d          |
| 10  | Easy   | 30; 90; 180; 60 degrees                                 | a,d,b,c          |
| 11  | Medium | 1/2; 1/4; 1/6; 5/6                                      | c,b,a,d          |
| 12  | Medium | 2; 3; 1.5; 4 g/cm³                                      | c,a,b,d          |
| 13  | Medium | 30; 48; 40; 45 km/h                                     | a,c,d,b          |
| 14  | Medium | 20; 25; 10; 30 percent increase                         | c,a,b,d          |
| 15  | Medium | 4/7; 5/9; 3/5; 7/12                                     | b,a,d,c          |
| 16  | Medium | 5; 6; 4.5; 3.5                                          | d,c,a,b          |
| 17  | Medium | 24; 12; 36; 30 minutes                                  | b,a,d,c          |
| 18  | Medium | 60; 72; 65; 67.5 euros                                  | a,c,d,b          |
| 19  | Medium | 9; 16; 10; 12 cm²                                       | a,c,d,b          |
| 20  | Medium | Positions A = 3; B = 2; C = 4; D = 1                    | d,b,a,c          |
| 21  | Hard   | 3; 4; 2; 6 hours                                        | c,a,b,d          |
| 22  | Hard   | 40; 48; 32; 50 km/h                                     | c,a,b,d          |
| 23  | Hard   | 1/4; 7/8; 3/8; 3/10                                     | a,d,c,b          |
| 24  | Hard   | 96; 99; 93.75; 99.75                                    | c,a,b,d          |
| 25  | Hard   | 25; −27; 16; −16                                        | b,d,c,a          |
| 26  | Hard   | 5/6; 0.8; 0.85; 0.875                                   | b,a,c,d          |
| 27  | Hard   | 10; 21; 15; 6 handshakes                                | d,a,c,b          |
| 28  | Hard   | 80; 70; 75; 95 points                                   | b,c,a,d          |
| 29  | Hard   | 26; 40; 24; 30 cm                                       | c,a,d,b          |
| 30  | Hard   | √50; 7; √52; √58, compared using squares 50; 49; 52; 58 | b,a,c,d          |

Question 20 has a unique solution: D is first and B precedes A, which precedes
C. The probability questions state fair/independent experiments or sampling
without replacement. Rate questions state constant rates. The negative-power
question includes parentheses to separate a negative base from negation of a
square. The radical question explicitly defines the positive square root.

Truth question identities use a fixed nonperiodic permutation within each tier. The source entry order is not exposed as an ID parity hint. The proof table uses the actual public question-ID suffixes.

New packages replace the original 12 starter truth IDs with fixed opaque `bank-truth-legacy-*` identities. The original proofs in the extra-games review still apply. Existing stored packages retain their previous identities.
