# Extra games content review

Reviewed on 2026-10-09. `worker/content/extra-games.ts` adds 36 questions for the
`starter-01` and `starter-02` packages: six arithmetic, six truth and six order
questions per package. Every answer below was recomputed independently of the
content draft, and every prompt, option and explanation has an equivalent German
and English version.

Conventions:

- **Arithmetic** answers are exact, nonnegative numbers with no options and no
  speed bonus (exact-answer scoring).
- **Truth** answers are option IDs. Each question has exactly two options with
  the IDs `true` and `false`, shown as Wahr/Falsch and True/False.
- **Order** answers are a comma-separated permutation of the option IDs `a`,
  `b`, `c`, `d`, in the direction specified by the prompt. The listed `a, b, c, d` order never
  equals the answer, and every order is strict and unique.

## starter-01

| ID               | Answer  | Calculation / order proof                                                                |
| ---------------- | ------- | ---------------------------------------------------------------------------------------- |
| s1-arithmetic-01 | 10.8    | 3 × 2.40 = 7.20; 2 × 1.80 = 3.60; 7.20 + 3.60 = 10.80                                    |
| s1-arithmetic-02 | 24      | Floor 6 × 8 = 48 m²; 48 ÷ 2 = 24 packs                                                   |
| s1-arithmetic-03 | 175     | 2 h 20 min = 7/3 h; 75 × 7/3 = 175 km                                                    |
| s1-arithmetic-04 | 66      | 80 × 0.75 = 60 after 25% off; 60 × 1.10 = 66 with 10% tax                                |
| s1-arithmetic-05 | 12.5    | 12.4 + 11.8 + 13.2 + 12.6 = 50.0 s; 50.0 ÷ 4 = 12.5 s                                    |
| s1-arithmetic-06 | 2       | 1/6 + 1/3 = 1/2 tank per hour; 1 ÷ 1/2 = 2 h                                             |
| s1-truth-01      | true    | A square has four right angles and parallel, equal opposite sides, so it is a rectangle. |
| s1-truth-02      | false   | 91 = 7 × 13, so 91 has divisors 1, 7, 13 and 91 and is not prime.                        |
| s1-truth-03      | true    | 6k = 3 × (2k), so a multiple of 6 is a multiple of 3.                                    |
| s1-truth-04      | false   | (2m+1) + (2n+1) = 2(m+n+1) is even; example 3 + 5 = 8.                                   |
| s1-truth-05      | true    | n = 2k gives n² = 4k², divisible by 4; example 6² = 36 = 4 × 9.                          |
| s1-truth-06      | false   | Angles of a plane triangle sum to 180°; two right angles leave 0° for the third.         |
| s1-order-01      | c,b,a,d | c = 2/3 ≈ 0.667 < b = 0.7 < a = 3/4 = 0.75 < d = 0.78                                    |
| s1-order-02      | b,d,a,c | b = 2000 s < d = 35 × 60 = 2100 s < a = 0.75 × 3600 = 2700 s < c = 86400 ÷ 30 = 2880 s   |
| s1-order-03      | d,b,c,a | d = 400 m < b = 420 m < c = 44000 ÷ 100 = 440 m < a = 450 m                              |
| s1-order-04      | d,c,b,a | d = 2³ × 3 = 24 < c = 5² = 25 < b = 3³ = 27 < a = 2⁵ = 32                                |
| s1-order-05      | d,b,a,c | d = 4/7 ≈ 0.571 < b = 3/5 = 0.6 < a = 5/8 = 0.625 < c = 7/10 = 0.7                       |
| s1-order-06      | c,b,d,a | yellow < blue < red < green (bottom to top) forces positions 1–4; labels c, b, d, a.     |

## starter-02

| ID               | Answer  | Calculation / order proof                                                            |
| ---------------- | ------- | ------------------------------------------------------------------------------------ |
| s2-arithmetic-01 | 67.6    | 4 × 14.50 = 58.00; 3 × 3.20 = 9.60; 58.00 + 9.60 = 67.60                             |
| s2-arithmetic-02 | 30      | 1 h 40 min = 5/3 h; 18 × 5/3 = 30 km                                                 |
| s2-arithmetic-03 | 20      | (300 − 250) ÷ 250 = 0.2 = 20%                                                        |
| s2-arithmetic-04 | 11      | 8 + 12 + 15 + 11 + 9 = 55; 55 ÷ 5 = 11                                               |
| s2-arithmetic-05 | 750     | 300 ÷ 4 = 75 g per person; 75 × 10 = 750 g                                           |
| s2-arithmetic-06 | 3       | 1/12 + 1/4 = 1/3 pool per hour; 1 ÷ 1/3 = 3 h                                        |
| s2-truth-01      | false   | Not every rectangle has equal sides; a 2 × 3 rectangle is not a square.              |
| s2-truth-02      | false   | 57 = 3 × 19, so 57 is not prime.                                                     |
| s2-truth-03      | false   | 6 is divisible by 3 but not by 9, so the implication fails.                          |
| s2-truth-04      | true    | 51 = 3 × 17, so 51 is divisible by 3.                                                |
| s2-truth-05      | true    | 4k = 2 × (2k), so a multiple of 4 is a multiple of 2.                                |
| s2-truth-06      | true    | (2m+1)(2n+1) = 2(2mn+m+n) + 1 is odd; example 3 × 5 = 15.                            |
| s2-order-01      | b,a,d,c | b = 0.45 < a = 1/2 = 0.5 < d = 0.55 < c = 3/5 = 0.6                                  |
| s2-order-02      | a,c,b,d | a = 45 min < c = 3000 ÷ 60 = 50 min < b = 0.9 × 60 = 54 min < d = 1440 ÷ 24 = 60 min |
| s2-order-03      | b,d,a,c | b = 700 g < d = 0.72 kg = 720 g < a = 0.75 kg = 750 g < c = 0.8 kg = 800 g           |
| s2-order-04      | a,d,b,c | a = 2³ = 8 < d = 4² = 16 < b = 3³ = 27 < c = 2⁵ = 32                                 |
| s2-order-05      | c,a,d,b | c = 5/8 = 0.625 < a = 2/3 ≈ 0.667 < d = 7/10 = 0.7 < b = 3/4 = 0.75                  |
| s2-order-06      | d,c,a,b | yellow < red < blue < green (top to bottom) forces positions 1–4; labels d, c, a, b. |

## Verification

- Independent recomputation of all 12 arithmetic answers, all 12 truth values and
  all 12 order permutations passed.
- Every order answer is a strict permutation of `a, b, c, d`, and no listed order
  already equals its answer.
- Every prompt and explanation has a non-empty German and English string with
  matching quantities; no negative number appears in any text.
- `tsc --noEmit` reports no error in `worker/content/extra-games.ts`.
