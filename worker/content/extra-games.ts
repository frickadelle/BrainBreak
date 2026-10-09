import type { Question } from "../../shared/types";

// Every user-facing string is written twice (de/en) with the same meaning.
const t = (de: string, en: string) => ({ de, en });

// Truth statements always offer exactly two options with stable IDs.
const truthOptions = () => [
  { id: "true", text: t("Wahr", "True") },
  { id: "false", text: t("Falsch", "False") },
];

export const extraGames: Record<
  string,
  { arithmetic: Question[]; truth: Question[]; order: Question[] }
> = {
  "starter-01": {
    arithmetic: [
      {
        id: "s1-arithmetic-01",
        category: "arithmetic",
        prompt: t(
          "Ein Café verkauft Espresso für 2,40 Euro und ein Croissant für 1,80 Euro. Wie viel kosten drei Espressos und zwei Croissants zusammen? Antworte in Euro.",
          "A café sells an espresso for 2.40 euros and a croissant for 1.80 euros. How much do three espressos and two croissants cost together? Answer in euros.",
        ),
        answer: 10.8,
        unit: t("Euro", "euros"),
        explanation: t(
          "Drei Espressos kosten 3 × 2,40 = 7,20 Euro. Zwei Croissants kosten 2 × 1,80 = 3,60 Euro. Zusammen sind das 7,20 + 3,60 = 10,80 Euro.",
          "Three espressos cost 3 × 2.40 = 7.20 euros. Two croissants cost 2 × 1.80 = 3.60 euros. Together that is 7.20 + 3.60 = 10.80 euros.",
        ),
      },
      {
        id: "s1-arithmetic-02",
        category: "arithmetic",
        prompt: t(
          "Ein rechteckiger Raum ist 6 Meter lang und 8 Meter breit. Fliesen werden in Packungen verkauft; eine Packung bedeckt 2 Quadratmeter. Wie viele Packungen werden für den Boden benötigt?",
          "A rectangular room is 6 metres long and 8 metres wide. Tiles are sold in packs; one pack covers 2 square metres. How many packs are needed for the floor?",
        ),
        answer: 24,
        unit: t("Packungen", "packs"),
        explanation: t(
          "Die Bodenfläche ist 6 × 8 = 48 Quadratmeter. Pro Packung werden 2 Quadratmeter bedeckt. 48 ÷ 2 = 24 Packungen.",
          "The floor area is 6 × 8 = 48 square metres. Each pack covers 2 square metres. 48 ÷ 2 = 24 packs.",
        ),
      },
      {
        id: "s1-arithmetic-03",
        category: "arithmetic",
        prompt: t(
          "Ein Zug fährt 2 Stunden und 20 Minuten lang mit 75 Kilometern pro Stunde. Welche Strecke legt er zurück? Antworte in Kilometern.",
          "A train travels for 2 hours and 20 minutes at 75 kilometres per hour. What distance does it cover? Answer in kilometres.",
        ),
        answer: 175,
        unit: t("Kilometer", "kilometres"),
        explanation: t(
          "20 Minuten sind ein Drittel einer Stunde. 2 Stunden und 20 Minuten sind also 7/3 Stunden. 75 × 7/3 = 175 Kilometer.",
          "20 minutes are one third of an hour. So 2 hours and 20 minutes is 7/3 hours. 75 × 7/3 = 175 kilometres.",
        ),
      },
      {
        id: "s1-arithmetic-04",
        category: "arithmetic",
        prompt: t(
          "Eine Jacke kostet 80 Euro. Der Preis wird um 25 Prozent gesenkt. Auf den reduzierten Preis kommen noch 10 Prozent Steuer. Wie viel kostet die Jacke am Ende? Antworte in Euro.",
          "A jacket costs 80 euros. The price is reduced by 25 percent. A 10 percent tax is added to the reduced price. How much does the jacket cost in the end? Answer in euros.",
        ),
        answer: 66,
        unit: t("Euro", "euros"),
        explanation: t(
          "Nach 25 Prozent Rabatt bleiben 75 Prozent: 80 × 0,75 = 60 Euro. Danach kommen 10 Prozent Steuer dazu: 60 × 1,10 = 66 Euro.",
          "After a 25 percent discount, 75 percent remains: 80 × 0.75 = 60 euros. Then 10 percent tax is added: 60 × 1.10 = 66 euros.",
        ),
      },
      {
        id: "s1-arithmetic-05",
        category: "arithmetic",
        prompt: t(
          "Vier Läufer erzielen folgende Zeiten über 100 Meter: 12,4 Sekunden, 11,8 Sekunden, 13,2 Sekunden und 12,6 Sekunden. Wie hoch ist die durchschnittliche Zeit? Antworte in Sekunden.",
          "Four runners record the following times over 100 metres: 12.4 seconds, 11.8 seconds, 13.2 seconds and 12.6 seconds. What is the average time? Answer in seconds.",
        ),
        answer: 12.5,
        unit: t("Sekunden", "seconds"),
        explanation: t(
          "Die Summe ist 12,4 + 11,8 + 13,2 + 12,6 = 50,0 Sekunden. 50,0 ÷ 4 = 12,5 Sekunden.",
          "The sum is 12.4 + 11.8 + 13.2 + 12.6 = 50.0 seconds. 50.0 ÷ 4 = 12.5 seconds.",
        ),
      },
      {
        id: "s1-arithmetic-06",
        category: "arithmetic",
        prompt: t(
          "Eine Maschine füllt einen Tank allein in 6 Stunden, eine zweite Maschine allein in 3 Stunden. Beide starten gleichzeitig am leeren Tank und behalten ihre konstanten Füllraten. Wie lange brauchen sie zusammen? Antworte in Stunden.",
          "One machine fills a tank alone in 6 hours, a second machine alone in 3 hours. Both start simultaneously with the empty tank and keep their constant individual filling rates. How long do they take together? Answer in hours.",
        ),
        answer: 2,
        unit: t("Stunden", "hours"),
        explanation: t(
          "Die erste Maschine schafft 1/6 Tank pro Stunde, die zweite 1/3. Zusammen sind das 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 Tank pro Stunde. Der volle Tank dauert 1 ÷ 1/2 = 2 Stunden.",
          "The first machine fills 1/6 of the tank per hour, the second 1/3. Together that is 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 tank per hour. The full tank takes 1 ÷ 1/2 = 2 hours.",
        ),
      },
    ],
    truth: [
      {
        id: "s1-truth-01",
        category: "truth",
        prompt: t(
          "Jedes Quadrat ist auch ein Rechteck.",
          "Every square is also a rectangle.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Ein Rechteck hat vier rechte Winkel und gegenüberliegende Seiten, die parallel und gleich lang sind. Ein Quadrat erfüllt das: Es hat vier rechte Winkel und gleiche Seiten. Ein Quadrat ist ein Rechteck mit vier gleich langen Seiten. Die Aussage ist wahr.",
          "A rectangle has four right angles and opposite sides that are parallel and equal in length. A square satisfies this: it has four right angles and equal sides. A square is a rectangle with four sides of equal length. The statement is true.",
        ),
      },
      {
        id: "s1-truth-02",
        category: "truth",
        prompt: t(
          "Die Zahl 91 ist eine Primzahl.",
          "The number 91 is a prime number.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Eine Primzahl hat genau zwei Teiler, 1 und sich selbst. Es gilt 91 = 7 × 13. Damit hat 91 die Teiler 1, 7, 13 und 91 und ist keine Primzahl. Die Aussage ist falsch.",
          "A prime number has exactly two divisors, 1 and itself. Since 91 = 7 × 13, the number 91 has the divisors 1, 7, 13 and 91 and is not prime. The statement is false.",
        ),
      },
      {
        id: "s1-truth-03",
        category: "truth",
        prompt: t(
          "Wenn eine ganze Zahl durch 6 teilbar ist, dann ist sie auch durch 3 teilbar.",
          "If a integer is divisible by 6, then it is also divisible by 3.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Eine durch 6 teilbare Zahl hat die Form 6k mit einer ganzen Zahl k. Wegen 6k = 3 × (2k) ist sie auch durch 3 teilbar. Die Aussage ist wahr.",
          "A number divisible by 6 has the form 6k for some integer k. Because 6k = 3 × (2k), it is also divisible by 3. The statement is true.",
        ),
      },
      {
        id: "s1-truth-04",
        category: "truth",
        prompt: t(
          "Die Summe zweier ungerader ganzer Zahlen ist immer ungerade.",
          "The sum of two odd integers is always odd.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Seien 2m + 1 und 2n + 1 zwei ungerade Zahlen. Ihre Summe ist (2m + 1) + (2n + 1) = 2m + 2n + 2 = 2 × (m + n + 1). Das ist eine gerade Zahl. Beispiel: 3 + 5 = 8. Die Aussage ist falsch.",
          "Let 2m + 1 and 2n + 1 be two odd numbers. Their sum is (2m + 1) + (2n + 1) = 2m + 2n + 2 = 2 × (m + n + 1). That is an even number. Example: 3 + 5 = 8. The statement is false.",
        ),
      },
      {
        id: "s1-truth-05",
        category: "truth",
        prompt: t(
          "Wenn n eine gerade ganze Zahl ist, dann ist n im Quadrat durch 4 teilbar.",
          "If n is an even integer, then n squared is divisible by 4.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Eine gerade Zahl hat die Form n = 2k. Dann ist n² = (2k)² = 4k², also durch 4 teilbar. Beispiel: 6² = 36 = 4 × 9. Die Aussage ist wahr.",
          "An even number has the form n = 2k. Then n² = (2k)² = 4k², which is divisible by 4. Example: 6² = 36 = 4 × 9. The statement is true.",
        ),
      },
      {
        id: "s1-truth-06",
        category: "truth",
        prompt: t(
          "Ein ebenes Dreieck kann zwei rechte Winkel haben.",
          "A plane triangle can have two right angles.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Die Innenwinkel eines ebenen Dreiecks addieren sich zu 180 Grad. Zwei rechte Winkel ergeben bereits 90 + 90 = 180 Grad, sodass für den dritten Winkel 0 Grad übrig bliebe. Ein Dreieck braucht aber drei positive Winkel. Die Aussage ist falsch.",
          "The interior angles of a plane triangle add up to 180 degrees. Two right angles already amount to 90 + 90 = 180 degrees, leaving 0 degrees for the third angle. A triangle needs three positive angles. The statement is false.",
        ),
      },
    ],
    order: [
      {
        id: "s1-order-01",
        category: "order",
        prompt: t(
          "Ordne die vier Zahlen von der kleinsten zur größten.",
          "Arrange the four numbers from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("3/4", "3/4") },
          { id: "b", text: t("0,7", "0.7") },
          { id: "c", text: t("2/3", "2/3") },
          { id: "d", text: t("0,78", "0.78") },
        ],
        answer: "c,b,a,d",
        explanation: t(
          "Als Dezimalzahlen: 2/3 ≈ 0,667, 0,7, 3/4 = 0,75, 0,78.",
          "As decimals: 2/3 ≈ 0.667, 0.7, 3/4 = 0.75, 0.78.",
        ),
      },
      {
        id: "s1-order-02",
        category: "order",
        prompt: t(
          "Ordne die vier Zeitspannen von der kürzesten zur längsten. Ein Tag hat 24 Stunden.",
          "Arrange the four time spans from shortest to longest. One day has 24 hours.",
        ),
        options: [
          { id: "a", text: t("0,75 Stunden", "0.75 hours") },
          { id: "b", text: t("2000 Sekunden", "2000 seconds") },
          { id: "c", text: t("1/30 Tag", "1/30 day") },
          { id: "d", text: t("35 Minuten", "35 minutes") },
        ],
        answer: "b,d,a,c",
        explanation: t(
          "Alles in Sekunden: 2000 s, 35 × 60 = 2100 s, 0,75 × 3600 = 2700 s, 86400 ÷ 30 = 2880 s.",
          "Converted to seconds: 2000 s, 35 × 60 = 2100 s, 0.75 × 3600 = 2700 s, 86400 ÷ 30 = 2880 s.",
        ),
      },
      {
        id: "s1-order-03",
        category: "order",
        prompt: t(
          "Ordne die vier Längen von der kürzesten zur längsten.",
          "Arrange the four lengths from shortest to longest.",
        ),
        options: [
          { id: "a", text: t("0,45 Kilometer", "0.45 kilometres") },
          { id: "b", text: t("420 Meter", "420 metres") },
          { id: "c", text: t("44000 Zentimeter", "44000 centimetres") },
          { id: "d", text: t("0,4 Kilometer", "0.4 kilometres") },
        ],
        answer: "d,b,c,a",
        explanation: t(
          "Alles in Metern: 400 m, 420 m, 44000 ÷ 100 = 440 m, 450 m.",
          "Converted to metres: 400 m, 420 m, 44000 ÷ 100 = 440 m, 450 m.",
        ),
      },
      {
        id: "s1-order-04",
        category: "order",
        prompt: t(
          "Ordne die vier Rechenausdrücke nach ihrem Ergebnis: vom kleinsten zum größten.",
          "Arrange the four expressions by their result, from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("2⁵", "2⁵") },
          { id: "b", text: t("3³", "3³") },
          { id: "c", text: t("5²", "5²") },
          { id: "d", text: t("2³ × 3", "2³ × 3") },
        ],
        answer: "d,c,b,a",
        explanation: t(
          "Ausgerechnet: 2³ × 3 = 8 × 3 = 24, 5² = 25, 3³ = 27, 2⁵ = 32.",
          "Evaluated: 2³ × 3 = 8 × 3 = 24, 5² = 25, 3³ = 27, 2⁵ = 32.",
        ),
      },
      {
        id: "s1-order-05",
        category: "order",
        prompt: t(
          "Ordne die vier Brüche von der kleinsten zur größten.",
          "Arrange the four fractions from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("5/8", "5/8") },
          { id: "b", text: t("3/5", "3/5") },
          { id: "c", text: t("7/10", "7/10") },
          { id: "d", text: t("4/7", "4/7") },
        ],
        answer: "d,b,a,c",
        explanation: t(
          "Als Dezimalzahlen: 4/7 ≈ 0,571, 3/5 = 0,6, 5/8 = 0,625, 7/10 = 0,7.",
          "As decimals: 4/7 ≈ 0.571, 3/5 = 0.6, 5/8 = 0.625, 7/10 = 0.7.",
        ),
      },
      {
        id: "s1-order-06",
        category: "order",
        prompt: t(
          "Vier Kisten stehen übereinander auf den Plätzen 1 (unten) bis 4 (oben). Die grüne Kiste steht über der roten Kiste. Die blaue Kiste steht direkt unter der roten Kiste. Die gelbe Kiste steht unter der blauen Kiste. Ordne die Kisten von unten nach oben.",
          "Four boxes stand stacked on positions 1 (bottom) to 4 (top). The green box is above the red box. The blue box is directly below the red box. The yellow box is below the blue box. Arrange the boxes from bottom to top.",
        ),
        options: [
          { id: "a", text: t("grün", "green") },
          { id: "b", text: t("blau", "blue") },
          { id: "c", text: t("gelb", "yellow") },
          { id: "d", text: t("rot", "red") },
        ],
        answer: "c,b,d,a",
        explanation: t(
          "Gelb steht unter blau, blau direkt unter rot und rot unter grün. Von unten nach oben ist die einzige Reihenfolge: gelb, blau, rot, grün.",
          "Yellow is below blue, blue is directly below red, and red is below green. From bottom to top the only order is: yellow, blue, red, green.",
        ),
      },
    ],
  },
  "starter-02": {
    arithmetic: [
      {
        id: "s2-arithmetic-01",
        category: "arithmetic",
        prompt: t(
          "In einem Restaurant kosten vier Gerichte je 14,50 Euro und drei Getränke je 3,20 Euro. Wie hoch ist die Rechnung insgesamt? Antworte in Euro.",
          "In a restaurant, four dishes cost 14.50 euros each and three drinks cost 3.20 euros each. What is the total bill? Answer in euros.",
        ),
        answer: 67.6,
        unit: t("Euro", "euros"),
        explanation: t(
          "Vier Gerichte kosten 4 × 14,50 = 58,00 Euro. Drei Getränke kosten 3 × 3,20 = 9,60 Euro. Zusammen sind das 58,00 + 9,60 = 67,60 Euro.",
          "Four dishes cost 4 × 14.50 = 58.00 euros. Three drinks cost 3 × 3.20 = 9.60 euros. Together that is 58.00 + 9.60 = 67.60 euros.",
        ),
      },
      {
        id: "s2-arithmetic-02",
        category: "arithmetic",
        prompt: t(
          "Eine Radfahrerin fährt 1 Stunde und 40 Minuten lang mit 18 Kilometern pro Stunde. Welche Strecke legt sie zurück? Antworte in Kilometern.",
          "A cyclist rides for 1 hour and 40 minutes at 18 kilometres per hour. What distance does she cover? Answer in kilometres.",
        ),
        answer: 30,
        unit: t("Kilometer", "kilometres"),
        explanation: t(
          "40 Minuten sind zwei Drittel einer Stunde. 1 Stunde und 40 Minuten sind also 5/3 Stunden. 18 × 5/3 = 30 Kilometer.",
          "40 minutes are two thirds of an hour. So 1 hour and 40 minutes is 5/3 hours. 18 × 5/3 = 30 kilometres.",
        ),
      },
      {
        id: "s2-arithmetic-03",
        category: "arithmetic",
        prompt: t(
          "Der Preis eines Produkts steigt von 250 Euro auf 300 Euro. Um wie viel Prozent ist der Preis gestiegen? Antworte mit der Prozentzahl.",
          "The price of a product rises from 250 euros to 300 euros. By what percentage did the price rise? Answer with the percentage.",
        ),
        answer: 20,
        unit: t("Prozent", "percent"),
        explanation: t(
          "Die Erhöhung beträgt 300 minus 250 = 50 Euro. Bezogen auf den Ausgangspreis sind das 50 ÷ 250 = 0,2 = 20 Prozent.",
          "The increase is 300 minus 250 = 50 euros. Relative to the original price that is 50 ÷ 250 = 0.2 = 20 percent.",
        ),
      },
      {
        id: "s2-arithmetic-04",
        category: "arithmetic",
        prompt: t(
          "Fünf Messwerte lauten 8, 12, 15, 11 und 9. Wie hoch ist ihr Durchschnitt? Antworte mit der Zahl.",
          "Five measurements are 8, 12, 15, 11 and 9. What is their average? Answer with the number.",
        ),
        answer: 11,
        explanation: t(
          "Die Summe ist 8 + 12 + 15 + 11 + 9 = 55. 55 ÷ 5 = 11.",
          "The sum is 8 + 12 + 15 + 11 + 9 = 55. 55 ÷ 5 = 11.",
        ),
      },
      {
        id: "s2-arithmetic-05",
        category: "arithmetic",
        prompt: t(
          "Ein Rezept für 4 Personen benötigt 300 Gramm Reis. Wie viele Gramm Reis braucht ein Rezept für 10 Personen bei gleichem Verhältnis? Antworte in Gramm.",
          "A recipe for 4 people needs 300 grams of rice. How many grams of rice does a recipe for 10 people need at the same ratio? Answer in grams.",
        ),
        answer: 750,
        unit: t("Gramm", "grams"),
        explanation: t(
          "Pro Person sind es 300 ÷ 4 = 75 Gramm. Für 10 Personen: 75 × 10 = 750 Gramm.",
          "Per person that is 300 ÷ 4 = 75 grams. For 10 people: 75 × 10 = 750 grams.",
        ),
      },
      {
        id: "s2-arithmetic-06",
        category: "arithmetic",
        prompt: t(
          "Ein Rohr füllt ein Becken allein in 12 Stunden, ein zweites Rohr allein in 4 Stunden. Beide starten gleichzeitig am leeren Becken und behalten ihre konstanten Füllraten. Wie lange dauert das Füllen zusammen? Antworte in Stunden.",
          "One pipe fills a pool alone in 12 hours, a second pipe alone in 4 hours. Both start simultaneously with the empty pool and keep their constant individual filling rates. How long does filling take together? Answer in hours.",
        ),
        answer: 3,
        unit: t("Stunden", "hours"),
        explanation: t(
          "Das erste Rohr schafft 1/12 Becken pro Stunde, das zweite 1/4. Zusammen: 1/12 + 1/4 = 1/12 + 3/12 = 4/12 = 1/3 Becken pro Stunde. Das volle Becken dauert 1 ÷ 1/3 = 3 Stunden.",
          "The first pipe fills 1/12 of the pool per hour, the second 1/4. Together: 1/12 + 1/4 = 1/12 + 3/12 = 4/12 = 1/3 pool per hour. The full pool takes 1 ÷ 1/3 = 3 hours.",
        ),
      },
    ],
    truth: [
      {
        id: "s2-truth-01",
        category: "truth",
        prompt: t(
          "Jedes Rechteck ist auch ein Quadrat.",
          "Every rectangle is also a square.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Ein Quadrat ist ein Rechteck mit vier gleich langen Seiten, aber nicht jedes Rechteck hat gleich lange Seiten. Ein Rechteck mit den Seitenlängen 2 und 3 ist kein Quadrat. Die Aussage ist falsch.",
          "A square is a rectangle with four sides of equal length, but not every rectangle has sides of equal length. A rectangle with side lengths 2 and 3 is not a square. The statement is false.",
        ),
      },
      {
        id: "s2-truth-02",
        category: "truth",
        prompt: t(
          "Die Zahl 57 ist eine Primzahl.",
          "The number 57 is a prime number.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Es gilt 57 = 3 × 19. Damit hat 57 außer 1 und 57 noch die Teiler 3 und 19 und ist keine Primzahl. Die Aussage ist falsch.",
          "Since 57 = 3 × 19, the number 57 has the divisors 3 and 19 in addition to 1 and 57, so it is not prime. The statement is false.",
        ),
      },
      {
        id: "s2-truth-03",
        category: "truth",
        prompt: t(
          "Wenn eine ganze Zahl durch 3 teilbar ist, dann ist sie auch durch 9 teilbar.",
          "If a integer is divisible by 3, then it is also divisible by 9.",
        ),
        options: truthOptions(),
        answer: "false",
        explanation: t(
          "Die Zahl 6 ist durch 3, aber nicht durch 9 teilbar: 6 = 3 × 2, jedoch ist 6 ÷ 9 keine ganze Zahl. Die Aussage ist falsch.",
          "The number 6 is divisible by 3 but not by 9: 6 = 3 × 2, yet 6 ÷ 9 is not a integer. The statement is false.",
        ),
      },
      {
        id: "s2-truth-04",
        category: "truth",
        prompt: t(
          "Die Zahl 51 ist durch 3 teilbar.",
          "The number 51 is divisible by 3.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Es gilt 51 = 3 × 17. Damit ist 51 durch 3 teilbar. Die Aussage ist wahr.",
          "Since 51 = 3 × 17, the number 51 is divisible by 3. The statement is true.",
        ),
      },
      {
        id: "s2-truth-05",
        category: "truth",
        prompt: t(
          "Wenn eine ganze Zahl durch 4 teilbar ist, dann ist sie auch durch 2 teilbar.",
          "If a integer is divisible by 4, then it is also divisible by 2.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Eine durch 4 teilbare Zahl hat die Form 4k. Wegen 4k = 2 × (2k) ist sie auch durch 2 teilbar. Die Aussage ist wahr.",
          "A number divisible by 4 has the form 4k. Because 4k = 2 × (2k), it is also divisible by 2. The statement is true.",
        ),
      },
      {
        id: "s2-truth-06",
        category: "truth",
        prompt: t(
          "Das Produkt zweier ungerader ganzer Zahlen ist immer ungerade.",
          "The product of two odd integers is always odd.",
        ),
        options: truthOptions(),
        answer: "true",
        explanation: t(
          "Seien 2m + 1 und 2n + 1 zwei ungerade Zahlen. Ihr Produkt ist (2m + 1)(2n + 1) = 4mn + 2m + 2n + 1 = 2 × (2mn + m + n) + 1, also ungerade. Beispiel: 3 × 5 = 15. Die Aussage ist wahr.",
          "Let 2m + 1 and 2n + 1 be two odd numbers. Their product is (2m + 1)(2n + 1) = 4mn + 2m + 2n + 1 = 2 × (2mn + m + n) + 1, which is odd. Example: 3 × 5 = 15. The statement is true.",
        ),
      },
    ],
    order: [
      {
        id: "s2-order-01",
        category: "order",
        prompt: t(
          "Ordne die vier Zahlen von der kleinsten zur größten.",
          "Arrange the four numbers from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("1/2", "1/2") },
          { id: "b", text: t("0,45", "0.45") },
          { id: "c", text: t("3/5", "3/5") },
          { id: "d", text: t("0,55", "0.55") },
        ],
        answer: "b,a,d,c",
        explanation: t(
          "Als Dezimalzahlen: 0,45, 1/2 = 0,5, 0,55, 3/5 = 0,6.",
          "As decimals: 0.45, 1/2 = 0.5, 0.55, 3/5 = 0.6.",
        ),
      },
      {
        id: "s2-order-02",
        category: "order",
        prompt: t(
          "Ordne die vier Zeitspannen von der kürzesten zur längsten. Ein Tag hat 24 Stunden.",
          "Arrange the four time spans from shortest to longest. One day has 24 hours.",
        ),
        options: [
          { id: "a", text: t("45 Minuten", "45 minutes") },
          { id: "b", text: t("0,9 Stunden", "0.9 hours") },
          { id: "c", text: t("3000 Sekunden", "3000 seconds") },
          { id: "d", text: t("1/24 Tag", "1/24 day") },
        ],
        answer: "a,c,b,d",
        explanation: t(
          "Alles in Minuten: 45 min, 3000 ÷ 60 = 50 min, 0,9 × 60 = 54 min, 1440 ÷ 24 = 60 min.",
          "Converted to minutes: 45 min, 3000 ÷ 60 = 50 min, 0.9 × 60 = 54 min, 1440 ÷ 24 = 60 min.",
        ),
      },
      {
        id: "s2-order-03",
        category: "order",
        prompt: t(
          "Ordne die vier Massen von der kleinsten zur größten.",
          "Arrange the four masses from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("0,75 Kilogramm", "0.75 kilograms") },
          { id: "b", text: t("700 Gramm", "700 grams") },
          { id: "c", text: t("0,8 Kilogramm", "0.8 kilograms") },
          { id: "d", text: t("0,72 Kilogramm", "0.72 kilograms") },
        ],
        answer: "b,d,a,c",
        explanation: t(
          "Alles in Gramm: 700 g, 720 g, 750 g, 800 g.",
          "Converted to grams: 700 g, 720 g, 750 g, 800 g.",
        ),
      },
      {
        id: "s2-order-04",
        category: "order",
        prompt: t(
          "Ordne die vier Rechenausdrücke nach ihrem Ergebnis: vom kleinsten zum größten.",
          "Arrange the four expressions by their result, from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("2³", "2³") },
          { id: "b", text: t("3³", "3³") },
          { id: "c", text: t("2⁵", "2⁵") },
          { id: "d", text: t("4²", "4²") },
        ],
        answer: "a,d,b,c",
        explanation: t(
          "Ausgerechnet: 2³ = 8, 4² = 16, 3³ = 27, 2⁵ = 32.",
          "Evaluated: 2³ = 8, 4² = 16, 3³ = 27, 2⁵ = 32.",
        ),
      },
      {
        id: "s2-order-05",
        category: "order",
        prompt: t(
          "Ordne die vier Brüche von der kleinsten zur größten.",
          "Arrange the four fractions from smallest to largest.",
        ),
        options: [
          { id: "a", text: t("2/3", "2/3") },
          { id: "b", text: t("3/4", "3/4") },
          { id: "c", text: t("5/8", "5/8") },
          { id: "d", text: t("7/10", "7/10") },
        ],
        answer: "c,a,d,b",
        explanation: t(
          "Als Dezimalzahlen: 5/8 = 0,625, 2/3 ≈ 0,667, 7/10 = 0,7, 3/4 = 0,75.",
          "As decimals: 5/8 = 0.625, 2/3 ≈ 0.667, 7/10 = 0.7, 3/4 = 0.75.",
        ),
      },
      {
        id: "s2-order-06",
        category: "order",
        prompt: t(
          "Vier Regale stehen untereinander auf den Plätzen 1 (oben) bis 4 (unten). Das gelbe Regal steht über dem roten Regal. Das rote Regal steht über dem blauen Regal. Das grüne Regal steht direkt unter dem blauen Regal. Ordne die Regale von oben nach unten.",
          "Four shelves are stacked on positions 1 (top) to 4 (bottom). The yellow shelf is above the red shelf. The red shelf is above the blue shelf. The green shelf is directly below the blue shelf. Arrange the shelves from top to bottom.",
        ),
        options: [
          { id: "a", text: t("blau", "blue") },
          { id: "b", text: t("grün", "green") },
          { id: "c", text: t("rot", "red") },
          { id: "d", text: t("gelb", "yellow") },
        ],
        answer: "d,c,a,b",
        explanation: t(
          "Gelb steht über rot, rot über blau und grün direkt unter blau. Von oben nach unten ist die einzige Reihenfolge: gelb, rot, blau, grün.",
          "Yellow is above red, red is above blue, and green is directly below blue. From top to bottom the only order is: yellow, red, blue, green.",
        ),
      },
    ],
  },
};
