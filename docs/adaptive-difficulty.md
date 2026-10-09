# Adaptive difficulty

New rooms use a 294-question bank: 42 questions in each of seven categories. Every category has 22 easy, 10 medium and 10 hard questions. The two weekly packages share these identities. A session still selects one category and plays six questions with the existing deadlines and scoring.

## Selection and feedback

The Durable Object starts at medium. It randomly chooses an unused question at the current level. If that level has no unused questions, it uses the nearest available level. The current shipped pools have enough questions for any six-round path, so this fallback is for future smaller banks. Every selection is committed with the room snapshot before personalized state is broadcast.

At reveal, the server evaluates the fixed eligible roster from the start of the question. Missing answers count as unsuccessful; disconnecting cannot remove an identity from the denominator. All joined participants are eligible except the current artist in drawing. With at least two eligible participants:

- Success rate at least 70%: increase by one level, up to hard.
- Success rate below 30%: decrease by one level, down to easy.
- Otherwise: retain the level. Exactly 30% does not decrease.

Correct choice answers, exact arithmetic and fully correct orders count as success. Estimation uses the unrounded error threshold `abs(value - answer) <= max(abs(answer), 1) / 10`; a score rounded to 900 is not sufficient if the actual error exceeds that threshold. Correct drawing guesses count; the artist's contribution points do not enter the rate.

The current question and its points never change because of feedback. The reveal shows success/eligibility and the target level for the next question. The next identity is selected only when the next question begins. Unused content, solutions, private answers and the server selection history are withheld from clients. Language changes do not affect selection or deadlines.

## Compatibility and persistence

The full bank, selected identities, eligible rosters and feedback history are stored in the room's Durable Object journal. A reconnect, instance reconstruction or D1 retry does not reroll a question or score a reveal twice. D1 keeps the existing question-ID keyed answer records and final results; no database migration is required.

Old room snapshots with six ordered questions and no difficulty metadata continue using their original order and rules. New weekly packages require at least six unique questions per category and all-or-none valid difficulty metadata. New adaptive content should provide at least six questions at every level. The levels are editorial initial classifications; group feedback chooses among them during a session. There are no live AI calls or external content services.
