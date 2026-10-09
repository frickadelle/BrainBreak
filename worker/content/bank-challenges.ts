import type { Question } from "../../shared/types";

type Level = "easy" | "medium" | "hard";
type Pair = [string, string];
const t = ([de, en]: Pair) => ({ de, en });
// Stable nonperiodic truth identities prevent ID parity from hinting at correctness.
const truthIds = [
  6, 1, 9, 2, 4, 8, 3, 10, 7, 5, 18, 13, 20, 11, 17, 14, 19, 12, 16, 15, 27, 29,
  21, 24, 22, 30, 26, 23, 28, 25,
];
const id = (category: string, index: number) =>
  `bank-${category}-${String(category === "truth" ? truthIds[index] : index + 1).padStart(2, "0")}`;
const level = (index: number): Level =>
  index < 10 ? "easy" : index < 20 ? "medium" : "hard";

type ArithmeticEntry = [Pair, number, Pair, Pair?];
const arithmetic: ArithmeticEntry[] = [
  [
    ["Wie viel sind 15 Prozent von 60?", "What is 15 percent of 60?"],
    9,
    [
      "10 Prozent sind 6, 5 Prozent sind 3. Zusammen: 9.",
      "10 percent is 6; 5 percent is 3. Together: 9.",
    ],
  ],
  [
    [
      "Eine Flasche enthält 320 Milliliter. Drei Viertel werden ausgegossen. Wie viele Milliliter werden ausgegossen?",
      "A bottle contains 320 millilitres. Three quarters are poured out. How many millilitres are poured out?",
    ],
    240,
    ["320 ÷ 4 × 3 = 240 Milliliter.", "320 ÷ 4 × 3 = 240 millilitres."],
    ["Milliliter", "millilitres"],
  ],
  [
    [
      "Du hast acht 50-Cent-Münzen und sechs 20-Cent-Münzen. Wie viele Euro sind das?",
      "You have eight 50-cent coins and six 20-cent coins. How many euros is that?",
    ],
    5.2,
    [
      "8 × 0,50 + 6 × 0,20 = 4 + 1,20 = 5,20 Euro.",
      "8 × 0.50 + 6 × 0.20 = 4 + 1.20 = 5.20 euros.",
    ],
    ["Euro", "euros"],
  ],
  [
    [
      "Ein Film beginnt um 19:20 Uhr und endet am selben Abend um 20:45 Uhr. Wie viele Minuten dauert er?",
      "A film starts at 19:20 and ends at 20:45 the same evening. How many minutes does it last?",
    ],
    85,
    [
      "Bis 20:20 Uhr sind es 60 Minuten, danach noch 25. Insgesamt 85 Minuten.",
      "It is 60 minutes to 20:20, then another 25. Total: 85 minutes.",
    ],
    ["Minuten", "minutes"],
  ],
  [
    [
      "Was ist der arithmetische Mittelwert von 11, 14 und 17?",
      "What is the arithmetic mean of 11, 14 and 17?",
    ],
    14,
    ["(11 + 14 + 17) ÷ 3 = 42 ÷ 3 = 14.", "(11 + 14 + 17) ÷ 3 = 42 ÷ 3 = 14."],
  ],
  [
    [
      "Ein Rechteck ist 7 Meter lang und 4 Meter breit. Wie lang ist sein Umfang in Metern?",
      "A rectangle is 7 metres long and 4 metres wide. What is its perimeter in metres?",
    ],
    22,
    [
      "Der Umfang ist 2 × (7 + 4) = 22 Meter.",
      "The perimeter is 2 × (7 + 4) = 22 metres.",
    ],
    ["Meter", "metres"],
  ],
  [
    [
      "Die Temperatur beträgt −6 Grad Celsius und steigt um 11 Grad. Wie viele Grad Celsius sind es danach?",
      "The temperature is −6 degrees Celsius and rises by 11 degrees. How many degrees Celsius is it afterwards?",
    ],
    5,
    ["−6 + 11 = 5 Grad Celsius.", "−6 + 11 = 5 degrees Celsius."],
    ["Grad Celsius", "degrees Celsius"],
  ],
  [
    [
      "43 Personen brauchen je einen Stift. Stifte gibt es nur in Packungen mit 8 Stück. Wie viele Packungen musst du mindestens kaufen?",
      "43 people each need one pen. Pens are sold only in packs of 8. What is the minimum number of packs you must buy?",
    ],
    6,
    [
      "5 Packungen enthalten nur 40 Stifte. 6 Packungen enthalten 48 und reichen aus.",
      "5 packs contain only 40 pens. 6 packs contain 48 and are sufficient.",
    ],
    ["Packungen", "packs"],
  ],
  [
    [
      "Ein fairer sechsseitiger Würfel wird einmal geworfen. Wie hoch ist die Wahrscheinlichkeit einer geraden Zahl? Antworte in Prozent.",
      "A fair six-sided die is rolled once. What is the probability of an even number? Answer as a percentage.",
    ],
    50,
    [
      "2, 4 und 6 sind drei günstige Ergebnisse von sechs: 3/6 = 50 Prozent.",
      "2, 4 and 6 are three favourable outcomes out of six: 3/6 = 50 percent.",
    ],
    ["Prozent", "percent"],
  ],
  [
    [
      "Löse 3 × x + 7 = 31. Wie groß ist x?",
      "Solve 3 × x + 7 = 31. What is x?",
    ],
    8,
    ["3 × x = 24, also x = 8.", "3 × x = 24, so x = 8."],
  ],
  [
    [
      "Nach 20 Prozent Rabatt kostet ein Rucksack 72 Euro. Wie viel kostete er vor dem Rabatt?",
      "After a 20 percent discount, a backpack costs 72 euros. How much did it cost before the discount?",
    ],
    90,
    [
      "72 Euro sind 80 Prozent des ursprünglichen Preises: 72 ÷ 0,8 = 90 Euro.",
      "72 euros is 80 percent of the original price: 72 ÷ 0.8 = 90 euros.",
    ],
    ["Euro", "euros"],
  ],
  [
    [
      "Ein Preis von 100 Euro steigt zuerst um 20 Prozent. Der neue Preis sinkt dann um 25 Prozent. Wie hoch ist der Endpreis in Euro?",
      "A price of 100 euros first rises by 20 percent. The new price then falls by 25 percent. What is the final price in euros?",
    ],
    90,
    [
      "100 × 1,20 × 0,75 = 120 × 0,75 = 90 Euro.",
      "100 × 1.20 × 0.75 = 120 × 0.75 = 90 euros.",
    ],
    ["Euro", "euros"],
  ],
  [
    [
      "35 Kugeln sind entweder rot oder blau. Das Verhältnis rot zu blau ist 2 zu 3. Wie viele rote Kugeln gibt es?",
      "35 balls are either red or blue. The ratio of red to blue is 2 to 3. How many red balls are there?",
    ],
    14,
    [
      "5 Verhältnisanteile ergeben 35 Kugeln. Ein Anteil ist 7, zwei rote Anteile sind 14.",
      "5 ratio parts make 35 balls. One part is 7; the two red parts are 14.",
    ],
    ["Kugeln", "balls"],
  ],
  [
    [
      "Zwei Tests ergeben je 60 Punkte, drei weitere je 80 Punkte. Alle fünf Tests zählen gleich. Wie hoch ist der Punktedurchschnitt?",
      "Two tests score 60 points each and three more score 80 points each. All five tests have equal weight. What is the average score?",
    ],
    72,
    [
      "(2 × 60 + 3 × 80) ÷ 5 = 360 ÷ 5 = 72 Punkte.",
      "(2 × 60 + 3 × 80) ÷ 5 = 360 ÷ 5 = 72 points.",
    ],
    ["Punkte", "points"],
  ],
  [
    [
      "2 Liter Getränk mit 30 Prozent Saft-Volumenanteil werden mit 3 Litern Getränk mit 10 Prozent Saft-Volumenanteil gemischt. Die Volumina addieren sich. Wie hoch ist der Saft-Volumenanteil der Mischung in Prozent?",
      "2 litres of a drink with 30 percent juice by volume are mixed with 3 litres of a drink with 10 percent juice by volume. The volumes add together. What is the juice percentage by volume of the mixture?",
    ],
    18,
    [
      "Der Saftanteil beträgt (2 × 30 + 3 × 10) ÷ 5 = 18 Prozent.",
      "The juice percentage is (2 × 30 + 3 × 10) ÷ 5 = 18 percent.",
    ],
    ["Prozent", "percent"],
  ],
  [
    [
      "Ein Fahrzeug fährt 120 Kilometer in 1 Stunde und 30 Minuten. Wie hoch ist die Durchschnittsgeschwindigkeit in Kilometern pro Stunde?",
      "A vehicle travels 120 kilometres in 1 hour and 30 minutes. What is its average speed in kilometres per hour?",
    ],
    80,
    [
      "1 Stunde und 30 Minuten sind 1,5 Stunden. 120 ÷ 1,5 = 80 km/h.",
      "1 hour and 30 minutes is 1.5 hours. 120 ÷ 1.5 = 80 km/h.",
    ],
    ["km/h", "km/h"],
  ],
  [
    [
      "Ein leerer Tank wird mit 6 Litern pro Minute gefüllt. Gleichzeitig fließen konstant 2 Liter pro Minute ab. Nach wie vielen Minuten enthält er 84 Liter?",
      "An empty tank fills at 6 litres per minute. At the same time, a constant 2 litres per minute drain out. After how many minutes does it contain 84 litres?",
    ],
    21,
    [
      "Netto kommen 6 − 2 = 4 Liter pro Minute hinzu. 84 ÷ 4 = 21 Minuten.",
      "The net inflow is 6 − 2 = 4 litres per minute. 84 ÷ 4 = 21 minutes.",
    ],
    ["Minuten", "minutes"],
  ],
  [
    [
      "Zwei faire Münzen werden unabhängig geworfen. Wie hoch ist die Wahrscheinlichkeit, genau einmal Kopf zu erhalten? Antworte in Prozent.",
      "Two fair coins are tossed independently. What is the probability of getting exactly one head? Answer as a percentage.",
    ],
    50,
    [
      "Kopf/Zahl und Zahl/Kopf sind zwei der vier gleich wahrscheinlichen Ergebnisse. 2/4 = 50 Prozent.",
      "Heads/tails and tails/heads are two of the four equally likely outcomes. 2/4 = 50 percent.",
    ],
    ["Prozent", "percent"],
  ],
  [
    [
      "Eine Zahlenfolge beginnt mit 2 und 5. Jeder weitere Wert ist die Summe der beiden vorherigen. Wie lautet der sechste Wert?",
      "A sequence starts with 2 and 5. Each later value is the sum of the previous two. What is the sixth value?",
    ],
    31,
    [
      "Die sechs Werte lauten 2, 5, 7, 12, 19, 31.",
      "The six values are 2, 5, 7, 12, 19, 31.",
    ],
  ],
  [
    [
      "Aus 6 verschiedenen Personen soll ein Zweierteam gewählt werden. Die Reihenfolge ist egal. Wie viele verschiedene Teams sind möglich?",
      "A team of two must be chosen from 6 different people. Order does not matter. How many different teams are possible?",
    ],
    15,
    [
      "6 × 5 zählt jedes Paar doppelt. Daher gibt es 6 × 5 ÷ 2 = 15 Teams.",
      "6 × 5 counts each pair twice. Therefore there are 6 × 5 ÷ 2 = 15 teams.",
    ],
    ["Teams", "teams"],
  ],
  [
    [
      "Du fährst 60 Kilometer mit 40 km/h hin und dieselbe Strecke mit 60 km/h zurück. Es gibt keine Pause. Wie hoch ist die Durchschnittsgeschwindigkeit der gesamten Fahrt in km/h?",
      "You travel 60 kilometres at 40 km/h and return over the same distance at 60 km/h. There are no stops. What is the average speed for the whole trip in km/h?",
    ],
    48,
    [
      "Hin: 1,5 Stunden, zurück: 1 Stunde. 120 Kilometer ÷ 2,5 Stunden = 48 km/h.",
      "Outward: 1.5 hours; return: 1 hour. 120 kilometres ÷ 2.5 hours = 48 km/h.",
    ],
    ["km/h", "km/h"],
  ],
  [
    [
      "Ein Beutel enthält 3 rote und 2 blaue Kugeln. Zwei Kugeln werden zufällig ohne Zurücklegen gezogen. Wie hoch ist die Wahrscheinlichkeit, dass beide rot sind? Antworte in Prozent.",
      "A bag contains 3 red and 2 blue balls. Two balls are drawn randomly without replacement. What is the probability that both are red? Answer as a percentage.",
    ],
    30,
    [
      "Für die erste rote Kugel: 3/5. Danach: 2/4. Das Produkt ist 6/20 = 30 Prozent.",
      "For the first red ball: 3/5. Then: 2/4. Their product is 6/20 = 30 percent.",
    ],
    ["Prozent", "percent"],
  ],
  [
    [
      "In einem Verein sind 2/5 der Mitglieder Frauen. 3/4 der Frauen und 1/3 der Männer fahren Rad. Alle Mitglieder sind entweder Frauen oder Männer. Wie viel Prozent aller Mitglieder fahren Rad?",
      "In a club, 2/5 of the members are women. 3/4 of the women and 1/3 of the men cycle. All members are either women or men. What percentage of all members cycle?",
    ],
    50,
    [
      "Frauen: (2/5) × (3/4) = 3/10 aller Mitglieder. Männer: (3/5) × (1/3) = 1/5. Zusammen: 3/10 + 2/10 = 1/2 = 50 Prozent.",
      "Women: (2/5) × (3/4) = 3/10 of all members. Men: (3/5) × (1/3) = 1/5. Together: 3/10 + 2/10 = 1/2 = 50 percent.",
    ],
    ["Prozent", "percent"],
  ],
  [
    [
      "Auf einer analogen Uhr bewegen sich beide Zeiger gleichmäßig. Wie groß ist der kleinere Winkel zwischen Stunden- und Minutenzeiger um 3:20 Uhr? Antworte in Grad.",
      "On an analogue clock, both hands move continuously. What is the smaller angle between the hour and minute hands at 3:20? Answer in degrees.",
    ],
    20,
    [
      "Der Minutenzeiger steht bei 20 × 6 = 120 Grad. Der Stundenzeiger steht bei 3 × 30 + 20 × 0,5 = 100 Grad. Die Differenz ist 20 Grad.",
      "The minute hand is at 20 × 6 = 120 degrees. The hour hand is at 3 × 30 + 20 × 0.5 = 100 degrees. The difference is 20 degrees.",
    ],
    ["Grad", "degrees"],
  ],
  [
    [
      "Welche kleinste positive ganze Zahl ist durch 5 und durch 7 teilbar und hat bei Division durch 6 den Rest 1?",
      "What is the smallest positive integer divisible by both 5 and 7 that leaves remainder 1 when divided by 6?",
    ],
    175,
    [
      "Die Vielfachen von 35 sind 35, 70, 105, 140, 175. Ihre Reste bei Division durch 6 sind 5, 4, 3, 2, 1. Also ist 175 die kleinste passende Zahl.",
      "The multiples of 35 are 35, 70, 105, 140, 175. Their remainders on division by 6 are 5, 4, 3, 2, 1. Thus 175 is the smallest suitable number.",
    ],
  ],
  [
    [
      "Zwei Pumpen füllen einen Tank allein in 6 beziehungsweise 8 Stunden. Ein Leck würde einen vollen Tank allein in 24 Stunden leeren. Alle Raten sind konstant. Wie viele Stunden brauchen beide Pumpen mit offenem Leck für den leeren Tank?",
      "Two pumps fill a tank alone in 6 and 8 hours respectively. A leak would drain a full tank alone in 24 hours. All rates are constant. How many hours do both pumps need to fill the empty tank with the leak open?",
    ],
    4,
    [
      "Netto werden 1/6 + 1/8 − 1/24 = (4 + 3 − 1)/24 = 1/4 Tank pro Stunde gefüllt. Das dauert 4 Stunden.",
      "The net rate is 1/6 + 1/8 − 1/24 = (4 + 3 − 1)/24 = 1/4 tank per hour. Filling takes 4 hours.",
    ],
    ["Stunden", "hours"],
  ],
  [
    [
      "Ein Artikel kostet nach zwei aufeinanderfolgenden Rabatten von 20 Prozent und 10 Prozent noch 108 Euro. Wie hoch war der ursprüngliche Preis in Euro?",
      "After two successive discounts of 20 percent and 10 percent, an item costs 108 euros. What was its original price in euros?",
    ],
    150,
    [
      "Es bleiben 0,80 × 0,90 = 0,72 des ursprünglichen Preises. 108 ÷ 0,72 = 150 Euro.",
      "0.80 × 0.90 = 0.72 of the original price remains. 108 ÷ 0.72 = 150 euros.",
    ],
    ["Euro", "euros"],
  ],
  [
    [
      "Zwei unterscheidbare sechsseitige Würfel werden geworfen. Wie viele der 36 möglichen geordneten Ergebnisse haben eine Summe von mindestens 10?",
      "Two distinguishable six-sided dice are rolled. How many of the 36 possible ordered outcomes have a sum of at least 10?",
    ],
    6,
    [
      "Summe 10: (4,6), (5,5), (6,4). Summe 11: (5,6), (6,5). Summe 12: (6,6). Insgesamt 6 Ergebnisse.",
      "Sum 10: (4,6), (5,5), (6,4). Sum 11: (5,6), (6,5). Sum 12: (6,6). Total: 6 outcomes.",
    ],
    ["Ergebnisse", "outcomes"],
  ],
  [
    [
      "Fünf verschiedene Personen sitzen im Kreis. Anordnungen, die nur durch Drehen des ganzen Kreises entstehen, zählen als gleich. Spiegelbilder zählen als verschieden. Wie viele Anordnungen gibt es?",
      "Five different people sit in a circle. Arrangements differing only by rotating the whole circle count as identical. Mirror images count as different. How many arrangements are there?",
    ],
    24,
    [
      "Eine Person wird als Bezugspunkt festgehalten. Die übrigen vier können auf 4 × 3 × 2 × 1 = 24 Arten um sie herum sitzen.",
      "Fix one person as a reference point. The other four can sit around them in 4 × 3 × 2 × 1 = 24 ways.",
    ],
  ],
  [
    [
      "Ein Rechteck hat einen Umfang von 30 Zentimetern und eine Fläche von 54 Quadratzentimetern. Wie lang ist die längere Seite in Zentimetern?",
      "A rectangle has a perimeter of 30 centimetres and an area of 54 square centimetres. What is its longer side in centimetres?",
    ],
    9,
    [
      "Die Seiten addieren sich zu 15 und ihr Produkt ist 54. 6 + 9 = 15 und 6 × 9 = 54. Die längere Seite ist 9 Zentimeter.",
      "The sides sum to 15 and their product is 54. 6 + 9 = 15 and 6 × 9 = 54. The longer side is 9 centimetres.",
    ],
    ["Zentimeter", "centimetres"],
  ],
];

type TruthEntry = [Pair, boolean, Pair];
const truth: TruthEntry[] = [
  [
    [
      "Das Quadrat jeder negativen reellen Zahl ist positiv.",
      "The square of every negative real number is positive.",
    ],
    true,
    [
      "Für x < 0 ist x × x > 0: Zwei negative Faktoren ergeben ein positives Produkt.",
      "For x < 0, x × x > 0: Two negative factors give a positive product.",
    ],
  ],
  [
    ["Die Zahl 1 ist eine Primzahl.", "The number 1 is prime."],
    false,
    [
      "Eine Primzahl hat genau zwei positive Teiler. 1 hat nur einen: 1 selbst.",
      "A prime number has exactly two positive divisors. 1 has only one: 1 itself.",
    ],
  ],
  [
    ["0,25 ist genau ein Viertel.", "0.25 is exactly one quarter."],
    true,
    ["0,25 = 25/100 = 1/4.", "0.25 = 25/100 = 1/4."],
  ],
  [
    [
      "Wenn man die Seitenlänge eines Quadrats verdoppelt, verdoppelt sich auch seine Fläche.",
      "Doubling a square's side length also doubles its area.",
    ],
    false,
    [
      "Die Fläche ist Seitenlänge mal Seitenlänge. (2s)² = 4s²: Sie vervierfacht sich.",
      "Area is side length times side length. (2s)² = 4s²: It quadruples.",
    ],
  ],
  [
    [
      "Bei unabhängigen Würfen einer fairen Münze ist Kopf beim nächsten Wurf mit Wahrscheinlichkeit 1/2 zu erwarten, auch nach fünfmal Zahl.",
      "With independent tosses of a fair coin, the probability of heads on the next toss is 1/2, even after five tails.",
    ],
    true,
    [
      "Unabhängigkeit bedeutet, dass frühere Ergebnisse die Wahrscheinlichkeit des nächsten Wurfs nicht ändern.",
      "Independence means previous outcomes do not change the probability of the next toss.",
    ],
  ],
  [
    [
      "Der arithmetische Mittelwert von 4 und 10 ist 8.",
      "The arithmetic mean of 4 and 10 is 8.",
    ],
    false,
    ["(4 + 10) ÷ 2 = 7, nicht 8.", "(4 + 10) ÷ 2 = 7, not 8."],
  ],
  [
    ["20 Prozent von 50 sind 10.", "20 percent of 50 is 10."],
    true,
    ["0,20 × 50 = 10.", "0.20 × 50 = 10."],
  ],
  [
    ["0,3 ist größer als 1/3.", "0.3 is greater than 1/3."],
    false,
    [
      "1/3 = 0,333… und ist damit größer als 0,3.",
      "1/3 = 0.333… and is therefore greater than 0.3.",
    ],
  ],
  [
    [
      "1000 Meter sind genau 1 Kilometer.",
      "1000 metres is exactly 1 kilometre.",
    ],
    true,
    [
      "Die Vorsilbe kilo bedeutet 1000. Daher ist 1 Kilometer = 1000 Meter.",
      "The prefix kilo means 1000. Therefore 1 kilometre = 1000 metres.",
    ],
  ],
  [
    [
      "Jede positive ganze Zahl mit der letzten Ziffer 0 ist durch 4 teilbar.",
      "Every positive integer whose last digit is 0 is divisible by 4.",
    ],
    false,
    [
      "Gegenbeispiel: 30 endet auf 0, aber 30 ÷ 4 = 7,5 ist keine ganze Zahl.",
      "Counterexample: 30 ends in 0, but 30 ÷ 4 = 7.5 is not an integer.",
    ],
  ],
  [
    [
      "Eine Erhöhung um 10 Prozent und eine anschließende Senkung um 10 Prozent ergeben wieder den Ausgangswert.",
      "A 10 percent increase followed by a 10 percent decrease returns to the original value.",
    ],
    false,
    [
      "Aus 100 wird erst 110, danach 99. Die Senkung bezieht sich auf den erhöhten Wert.",
      "100 first becomes 110, then 99. The decrease applies to the increased value.",
    ],
  ],
  [
    [
      "Zwei unabhängige faire sechsseitige Würfel zeigen mit Wahrscheinlichkeit 1/6 dieselbe Augenzahl.",
      "Two independent fair six-sided dice show the same number with probability 1/6.",
    ],
    true,
    [
      "Unter den 36 gleich wahrscheinlichen geordneten Ergebnissen haben 6 gleiche Zahlen: (1,1) bis (6,6). 6/36 = 1/6.",
      "Of the 36 equally likely ordered outcomes, 6 have matching numbers: (1,1) to (6,6). 6/36 = 1/6.",
    ],
  ],
  [
    [
      "Ist eine ganze Zahl durch 2 und durch 3 teilbar, ist sie auch durch 6 teilbar.",
      "If an integer is divisible by both 2 and 3, it is also divisible by 6.",
    ],
    true,
    [
      "2 und 3 haben keinen gemeinsamen Primfaktor. Eine Zahl mit beiden Faktoren enthält daher den Faktor 2 × 3 = 6.",
      "2 and 3 share no prime factor. A number with both factors therefore contains the factor 2 × 3 = 6.",
    ],
  ],
  [
    [
      "Bei den Zahlen 0, 1 und 100 sind Median und arithmetischer Mittelwert gleich.",
      "For the numbers 0, 1 and 100, the median and arithmetic mean are equal.",
    ],
    false,
    [
      "Der Median ist die mittlere Zahl 1. Der Mittelwert ist 101/3 ≈ 33,67.",
      "The median is the middle number, 1. The mean is 101/3 ≈ 33.67.",
    ],
  ],
  [
    [
      "Bei einem einzelnen Wurf eines Würfels schließen sich die Ergebnisse 1 und 6 gegenseitig aus.",
      "On a single roll of one die, outcomes 1 and 6 are mutually exclusive.",
    ],
    true,
    [
      "Ein einzelner Würfelwurf zeigt genau eine Zahl. Er kann nicht gleichzeitig 1 und 6 zeigen.",
      "A single die roll shows exactly one number. It cannot show both 1 and 6 at once.",
    ],
  ],
  [
    [
      "Zwei Rechtecke mit gleichem Umfang haben immer die gleiche Fläche.",
      "Two rectangles with the same perimeter always have the same area.",
    ],
    false,
    [
      "1 × 5 und 2 × 4 haben beide Umfang 12, aber Flächen 5 und 8.",
      "1 × 5 and 2 × 4 both have perimeter 12, but areas 5 and 8.",
    ],
  ],
  [
    [
      "Zwei unabhängige Ereignisse mit jeweils 60 Prozent Wahrscheinlichkeit treten beide mit 36 Prozent Wahrscheinlichkeit ein.",
      "Two independent events each with probability 60 percent both occur with probability 36 percent.",
    ],
    true,
    [
      "Bei Unabhängigkeit werden die Wahrscheinlichkeiten multipliziert: 0,6 × 0,6 = 0,36.",
      "Under independence the probabilities multiply: 0.6 × 0.6 = 0.36.",
    ],
  ],
  [
    [
      "Die Summe dreier aufeinanderfolgender ganzer Zahlen ist immer durch 3 teilbar.",
      "The sum of three consecutive integers is always divisible by 3.",
    ],
    true,
    [
      "n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1).",
      "n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1).",
    ],
  ],
  [
    [
      "Bei gleicher Strecke und konstanter Geschwindigkeit verkürzt eine Verdopplung der Geschwindigkeit die Fahrzeit auf ein Viertel.",
      "For the same distance at constant speed, doubling the speed reduces travel time to one quarter.",
    ],
    false,
    [
      "Zeit = Strecke ÷ Geschwindigkeit. Doppelte Geschwindigkeit halbiert die Zeit.",
      "Time = distance ÷ speed. Doubling the speed halves the time.",
    ],
  ],
  [
    [
      "Zwei aufeinanderfolgende Rabatte von 40 Prozent und 20 Prozent entsprechen einem Rabatt von 60 Prozent.",
      "Two successive discounts of 40 percent and 20 percent equal a 60 percent discount.",
    ],
    false,
    [
      "Es bleiben 0,6 × 0,8 = 0,48 des Preises. Der Gesamtrabatt beträgt 52 Prozent.",
      "0.6 × 0.8 = 0.48 of the price remains. The total discount is 52 percent.",
    ],
  ],
  [
    [
      "In einer Gruppe von sechs Personen kennt sich jedes Paar gegenseitig oder gar nicht. Es gibt immer drei Personen, die sich alle gegenseitig kennen, oder drei, von denen kein Paar sich kennt.",
      "In a group of six people, each pair either knows each other or does not. There are always three people who all know one another or three among whom no pair knows each other.",
    ],
    true,
    [
      "Eine Person kennt mindestens drei der anderen oder kennt mindestens drei nicht. Im ersten Fall ergibt ein bekanntes Paar unter diesen drei mit ihr ein bekanntes Dreierteam; sonst sind diese drei untereinander unbekannt. Im zweiten Fall gilt das gleiche Argument mit vertauschten Rollen.",
      "One person knows at least three others or does not know at least three. In the first case, any acquainted pair among those three forms an acquainted trio with that person; otherwise those three are mutually unacquainted. In the second case, use the same argument with the roles reversed.",
    ],
  ],
  [
    [
      "Aus 2 roten und 3 blauen Kugeln werden zufällig zwei ohne Zurücklegen gezogen. Wenn bereits bekannt ist, dass mindestens eine rot ist, beträgt die Wahrscheinlichkeit für zwei rote Kugeln genau 1/7.",
      "Two balls are drawn randomly without replacement from 2 red and 3 blue balls. If it is already known that at least one is red, the probability of two red balls is exactly 1/7.",
    ],
    true,
    [
      "Es gibt 10 gleich wahrscheinliche Kugelpaare. Drei sind rein blau, also bleiben sieben Paare mit mindestens einer roten Kugel. Genau eines davon ist rein rot: 1/7.",
      "There are 10 equally likely pairs of balls. Three are all blue, leaving seven pairs with at least one red ball. Exactly one of those is all red: 1/7.",
    ],
  ],
  [
    [
      "Bei zwei unabhängigen Würfen eines fairen sechsseitigen Würfels beträgt die Wahrscheinlichkeit für mindestens eine 6 genau 1/3.",
      "With two independent rolls of a fair six-sided die, the probability of at least one 6 is exactly 1/3.",
    ],
    false,
    [
      "Die Gegenwahrscheinlichkeit für keine 6 ist (5/6)² = 25/36. Mindestens eine 6 hat daher Wahrscheinlichkeit 1 − 25/36 = 11/36, nicht 12/36 = 1/3.",
      "The complementary probability of no 6 is (5/6)² = 25/36. At least one 6 therefore has probability 1 − 25/36 = 11/36, not 12/36 = 1/3.",
    ],
  ],
  [
    [
      "Eine faire Münze und eine Münze mit Kopf auf beiden Seiten liegen im Beutel. Du wählst zufällig eine davon und wirfst Kopf. Danach ist die Wahrscheinlichkeit, die Münze mit zwei Kopfseiten gewählt zu haben, immer noch 1/2.",
      "A fair coin and a coin with heads on both sides are in a bag. You choose one at random and toss heads. The probability that you chose the double-headed coin is then still 1/2.",
    ],
    false,
    [
      "Kopf mit der fairen Münze hat Wahrscheinlichkeit 1/2 × 1/2 = 1/4. Kopf mit der anderen Münze hat Wahrscheinlichkeit 1/2. Nach Kopf beträgt deren Anteil (1/2) ÷ (1/4 + 1/2) = 2/3.",
      "Heads with the fair coin has probability 1/2 × 1/2 = 1/4. Heads with the other coin has probability 1/2. After heads, the latter's share is (1/2) ÷ (1/4 + 1/2) = 2/3.",
    ],
  ],
  [
    [
      "Bei drei unabhängigen Würfen einer fairen Münze beträgt die Wahrscheinlichkeit für mindestens einmal Kopf genau 7/8.",
      "For three independent tosses of a fair coin, the probability of at least one head is exactly 7/8.",
    ],
    true,
    [
      "Nur Zahl/Zahl/Zahl scheidet aus. Dessen Wahrscheinlichkeit ist (1/2)³ = 1/8. Also bleiben 1 − 1/8 = 7/8.",
      "Only tails/tails/tails fails. Its probability is (1/2)³ = 1/8. Thus 1 − 1/8 = 7/8 remains.",
    ],
  ],
  [
    [
      "Aus einem Beutel mit 3 roten und 2 blauen Kugeln werden zwei zufällig ohne Zurücklegen gezogen. Die Wahrscheinlichkeit für zwei rote Kugeln ist 9/25.",
      "Two balls are drawn randomly without replacement from a bag with 3 red and 2 blue balls. The probability of two red balls is 9/25.",
    ],
    false,
    [
      "Nach einer roten Kugel bleiben 2 rote von 4 Kugeln. Richtig ist (3/5) × (2/4) = 3/10. 9/25 würde Ziehen mit Zurücklegen voraussetzen.",
      "After one red ball, 2 of the 4 remaining balls are red. The correct probability is (3/5) × (2/4) = 3/10. 9/25 would require replacement.",
    ],
  ],
  [
    [
      "Addiert man zu jedem Wert einer Datenreihe 10, steigt ihr arithmetischer Mittelwert um 10, während die Varianz unverändert bleibt.",
      "Adding 10 to every value in a data set increases its arithmetic mean by 10 while leaving the variance unchanged.",
    ],
    true,
    [
      "Jeder Wert und der Mittelwert steigen um 10. Die Abstände zum Mittelwert bleiben gleich, also auch die mittlere quadrierte Abweichung (Varianz).",
      "Every value and the mean rise by 10. Deviations from the mean stay the same, so the mean squared deviation (variance) also stays the same.",
    ],
  ],
  [
    [
      "Wer dieselbe Strecke ohne Pausen einmal mit 40 km/h und einmal mit 60 km/h fährt, hat insgesamt eine Durchschnittsgeschwindigkeit von 50 km/h.",
      "Someone travelling the same distance once at 40 km/h and once at 60 km/h with no stops has an overall average speed of 50 km/h.",
    ],
    false,
    [
      "Für je 60 Kilometer braucht man 1,5 und 1 Stunde. 120 ÷ 2,5 = 48 km/h, nicht 50.",
      "For 60 kilometres each way, the times are 1.5 and 1 hour. 120 ÷ 2.5 = 48 km/h, not 50.",
    ],
  ],
  [
    [
      "Für jede ganze Zahl n ist n³ − n durch 6 teilbar.",
      "For every integer n, n³ − n is divisible by 6.",
    ],
    true,
    [
      "n³ − n = (n − 1)n(n + 1). Unter drei aufeinanderfolgenden Zahlen ist mindestens eine gerade und genau eine durch 3 teilbar. Ihr Produkt ist durch 6 teilbar.",
      "n³ − n = (n − 1)n(n + 1). Among three consecutive integers, at least one is even and exactly one is divisible by 3. Their product is divisible by 6.",
    ],
  ],
  [
    [
      "Haben Ereignisse A und B Wahrscheinlichkeiten von 70 und 60 Prozent, müssen beide zusammen mit 42 Prozent Wahrscheinlichkeit auftreten. Unabhängigkeit ist nicht vorausgesetzt.",
      "If events A and B have probabilities of 70 and 60 percent, they must both occur with probability 42 percent. Independence is not assumed.",
    ],
    false,
    [
      "Das Produkt 0,7 × 0,6 gilt bei Unabhängigkeit. Ohne diese Annahme kann die gemeinsame Wahrscheinlichkeit zum Beispiel 60 Prozent sein, wenn B vollständig in A enthalten ist.",
      "The product 0.7 × 0.6 applies under independence. Without that assumption, the joint probability could be 60 percent, for example if B is entirely contained in A.",
    ],
  ],
];

type OrderEntry = [Pair, [Pair, Pair, Pair, Pair], string, Pair];
const ascending: Pair = [
  "Ordne die Werte vom kleinsten zum größten.",
  "Arrange the values from smallest to largest.",
];
const order: OrderEntry[] = [
  [
    ascending,
    [
      ["−2", "−2"],
      ["5", "5"],
      ["−8", "−8"],
      ["0", "0"],
    ],
    "c,a,d,b",
    ["−8 < −2 < 0 < 5.", "−8 < −2 < 0 < 5."],
  ],
  [
    ascending,
    [
      ["1/2", "1/2"],
      ["1/4", "1/4"],
      ["3/4", "3/4"],
      ["1", "1"],
    ],
    "b,a,c,d",
    [
      "1/4 = 0,25; 1/2 = 0,5; 3/4 = 0,75; 1 = 1.",
      "1/4 = 0.25; 1/2 = 0.5; 3/4 = 0.75; 1 = 1.",
    ],
  ],
  [
    [
      "Ordne die Zeitspannen von der kürzesten zur längsten.",
      "Arrange the durations from shortest to longest.",
    ],
    [
      ["90 Sekunden", "90 seconds"],
      ["2 Minuten", "2 minutes"],
      ["45 Sekunden", "45 seconds"],
      ["0,5 Minuten", "0.5 minutes"],
    ],
    "d,c,a,b",
    [
      "In Sekunden: d = 30, c = 45, a = 90, b = 120.",
      "In seconds: d = 30, c = 45, a = 90, b = 120.",
    ],
  ],
  [
    [
      "Ordne die Längen von der kürzesten zur längsten.",
      "Arrange the lengths from shortest to longest.",
    ],
    [
      ["1,2 Meter", "1.2 metres"],
      ["90 Zentimeter", "90 centimetres"],
      ["1500 Millimeter", "1500 millimetres"],
      ["1 Meter", "1 metre"],
    ],
    "b,d,a,c",
    [
      "In Metern: b = 0,9; d = 1; a = 1,2; c = 1,5.",
      "In metres: b = 0.9; d = 1; a = 1.2; c = 1.5.",
    ],
  ],
  [
    ascending,
    [
      ["3 × 4", "3 × 4"],
      ["20 − 5", "20 − 5"],
      ["2⁴", "2⁴"],
      ["9 + 2", "9 + 2"],
    ],
    "d,a,b,c",
    ["d = 11, a = 12, b = 15, c = 16.", "d = 11, a = 12, b = 15, c = 16."],
  ],
  [
    ascending,
    [
      ["20 Prozent", "20 percent"],
      ["1/3", "1/3"],
      ["0,25", "0.25"],
      ["40 Prozent", "40 percent"],
    ],
    "a,c,b,d",
    [
      "a = 0,2; c = 0,25; b ≈ 0,333; d = 0,4.",
      "a = 0.2; c = 0.25; b ≈ 0.333; d = 0.4.",
    ],
  ],
  [
    [
      "Ordne die Einkäufe nach ihrem Gesamtpreis vom günstigsten zum teuersten.",
      "Arrange the purchases by total price from cheapest to most expensive.",
    ],
    [
      ["3 Artikel zu je 2 Euro", "3 items at 2 euros each"],
      ["2 Artikel zu je 4 Euro", "2 items at 4 euros each"],
      ["5 Artikel zu je 1 Euro", "5 items at 1 euro each"],
      ["1 Artikel zu 7 Euro", "1 item at 7 euros"],
    ],
    "c,a,d,b",
    [
      "c kostet 5 Euro, a 6 Euro, d 7 Euro und b 8 Euro.",
      "c costs 5 euros, a 6 euros, d 7 euros and b 8 euros.",
    ],
  ],
  [
    [
      "Ordne die Massen von der kleinsten zur größten.",
      "Arrange the masses from smallest to largest.",
    ],
    [
      ["0,4 Kilogramm", "0.4 kilograms"],
      ["450 Gramm", "450 grams"],
      ["0,35 Kilogramm", "0.35 kilograms"],
      ["500 Gramm", "500 grams"],
    ],
    "c,a,b,d",
    [
      "In Gramm: c = 350, a = 400, b = 450, d = 500.",
      "In grams: c = 350, a = 400, b = 450, d = 500.",
    ],
  ],
  [
    ascending,
    [
      ["2³", "2³"],
      ["3²", "3²"],
      ["2²", "2²"],
      ["4²", "4²"],
    ],
    "c,a,b,d",
    ["c = 4, a = 8, b = 9, d = 16.", "c = 4, a = 8, b = 9, d = 16."],
  ],
  [
    [
      "Ordne die Winkel vom kleinsten zum größten.",
      "Arrange the angles from smallest to largest.",
    ],
    [
      ["30 Grad", "30 degrees"],
      ["Ein rechter Winkel", "A right angle"],
      ["Ein gestreckter Winkel", "A straight angle"],
      ["60 Grad", "60 degrees"],
    ],
    "a,d,b,c",
    [
      "a = 30 Grad, d = 60 Grad, b = 90 Grad, c = 180 Grad.",
      "a = 30 degrees, d = 60 degrees, b = 90 degrees, c = 180 degrees.",
    ],
  ],
  [
    [
      "Ordne die Wahrscheinlichkeiten von der kleinsten zur größten. Alle Münzen und Würfel sind fair; die Münzwürfe sind unabhängig.",
      "Arrange the probabilities from smallest to largest. All coins and dice are fair; coin tosses are independent.",
    ],
    [
      ["Kopf bei einem Münzwurf", "Heads on one coin toss"],
      ["Zweimal Kopf bei zwei Münzwürfen", "Two heads on two coin tosses"],
      ["Eine 6 bei einem Würfelwurf", "A 6 on one die roll"],
      ["Keine 6 bei einem Würfelwurf", "Not a 6 on one die roll"],
    ],
    "c,b,a,d",
    [
      "c = 1/6, b = 1/4, a = 1/2, d = 5/6.",
      "c = 1/6, b = 1/4, a = 1/2, d = 5/6.",
    ],
  ],
  [
    [
      "Ordne die Körper nach ihrer Dichte (Masse ÷ Volumen) von der kleinsten zur größten.",
      "Arrange the objects by density (mass ÷ volume) from lowest to highest.",
    ],
    [
      ["100 Gramm, 50 cm³", "100 grams, 50 cm³"],
      ["120 Gramm, 40 cm³", "120 grams, 40 cm³"],
      ["90 Gramm, 60 cm³", "90 grams, 60 cm³"],
      ["80 Gramm, 20 cm³", "80 grams, 20 cm³"],
    ],
    "c,a,b,d",
    [
      "In g/cm³: c = 1,5; a = 2; b = 3; d = 4.",
      "In g/cm³: c = 1.5; a = 2; b = 3; d = 4.",
    ],
  ],
  [
    [
      "Ordne die Fahrten nach ihrer Durchschnittsgeschwindigkeit von der langsamsten zur schnellsten.",
      "Arrange the trips by average speed from slowest to fastest.",
    ],
    [
      ["60 Kilometer in 2 Stunden", "60 kilometres in 2 hours"],
      ["72 Kilometer in 1,5 Stunden", "72 kilometres in 1.5 hours"],
      ["40 Kilometer in 1 Stunde", "40 kilometres in 1 hour"],
      ["90 Kilometer in 2 Stunden", "90 kilometres in 2 hours"],
    ],
    "a,c,d,b",
    [
      "In km/h: a = 30, c = 40, d = 45, b = 48.",
      "In km/h: a = 30, c = 40, d = 45, b = 48.",
    ],
  ],
  [
    [
      "Ordne die Preisänderungen nach ihrem prozentualen Anstieg vom kleinsten zum größten.",
      "Arrange the price changes by percentage increase from smallest to largest.",
    ],
    [
      ["50 → 60 Euro", "50 → 60 euros"],
      ["80 → 100 Euro", "80 → 100 euros"],
      ["200 → 220 Euro", "200 → 220 euros"],
      ["40 → 52 Euro", "40 → 52 euros"],
    ],
    "c,a,b,d",
    [
      "c: 20/200 = 10 Prozent; a: 10/50 = 20 Prozent; b: 20/80 = 25 Prozent; d: 12/40 = 30 Prozent.",
      "c: 20/200 = 10 percent; a: 10/50 = 20 percent; b: 20/80 = 25 percent; d: 12/40 = 30 percent.",
    ],
  ],
  [
    ascending,
    [
      ["4/7", "4/7"],
      ["5/9", "5/9"],
      ["3/5", "3/5"],
      ["7/12", "7/12"],
    ],
    "b,a,d,c",
    [
      "b ≈ 0,556; a ≈ 0,571; d ≈ 0,583; c = 0,6.",
      "b ≈ 0.556; a ≈ 0.571; d ≈ 0.583; c = 0.6.",
    ],
  ],
  [
    [
      "Ordne die Zahlenpaare nach ihrem arithmetischen Mittelwert vom kleinsten zum größten.",
      "Arrange the pairs by their arithmetic mean from smallest to largest.",
    ],
    [
      ["2 und 8", "2 and 8"],
      ["1 und 11", "1 and 11"],
      ["4 und 5", "4 and 5"],
      ["3 und 4", "3 and 4"],
    ],
    "d,c,a,b",
    ["d = 3,5; c = 4,5; a = 5; b = 6.", "d = 3.5; c = 4.5; a = 5; b = 6."],
  ],
  [
    [
      "Ordne die Wege nach ihrer Dauer von der kürzesten zur längsten. Die Geschwindigkeiten bleiben konstant.",
      "Arrange the journeys by duration from shortest to longest. Speeds stay constant.",
    ],
    [
      ["2 Kilometer mit 5 km/h", "2 kilometres at 5 km/h"],
      ["3 Kilometer mit 15 km/h", "3 kilometres at 15 km/h"],
      ["6 Kilometer mit 10 km/h", "6 kilometres at 10 km/h"],
      ["4 Kilometer mit 8 km/h", "4 kilometres at 8 km/h"],
    ],
    "b,a,d,c",
    [
      "Zeit = Strecke ÷ Geschwindigkeit. In Minuten: b = 12, a = 24, d = 30, c = 36.",
      "Time = distance ÷ speed. In minutes: b = 12, a = 24, d = 30, c = 36.",
    ],
  ],
  [
    [
      "Ordne die Angebote nach dem Preis nach Rabatt vom günstigsten zum teuersten.",
      "Arrange the offers by price after discount from cheapest to most expensive.",
    ],
    [
      ["80 Euro mit 25 Prozent Rabatt", "80 euros with 25 percent off"],
      ["90 Euro mit 20 Prozent Rabatt", "90 euros with 20 percent off"],
      ["100 Euro mit 35 Prozent Rabatt", "100 euros with 35 percent off"],
      ["75 Euro mit 10 Prozent Rabatt", "75 euros with 10 percent off"],
    ],
    "a,c,d,b",
    [
      "a = 60 Euro; c = 65 Euro; d = 67,50 Euro; b = 72 Euro.",
      "a = 60 euros; c = 65 euros; d = 67.50 euros; b = 72 euros.",
    ],
  ],
  [
    [
      "Ordne die ebenen Figuren nach ihrer Fläche von der kleinsten zur größten. Alle Längen sind in Zentimetern.",
      "Arrange the plane shapes by area from smallest to largest. All lengths are in centimetres.",
    ],
    [
      ["Quadrat mit Seite 3", "Square with side 3"],
      ["Quadrat mit Seite 4", "Square with side 4"],
      ["Rechteck mit Seiten 2 und 5", "Rectangle with sides 2 and 5"],
      [
        "Dreieck mit Grundseite 6 und Höhe 4",
        "Triangle with base 6 and height 4",
      ],
    ],
    "a,c,d,b",
    [
      "In cm²: a = 9, c = 10, d = 6 × 4 ÷ 2 = 12, b = 16.",
      "In cm²: a = 9, c = 10, d = 6 × 4 ÷ 2 = 12, b = 16.",
    ],
  ],
  [
    [
      "Vier Personen A, B, C und D stehen in einer Reihe. D steht ganz vorn. A steht hinter B und vor C. Ordne sie von vorn nach hinten.",
      "Four people A, B, C and D stand in a line. D is at the front. A is behind B and ahead of C. Arrange them from front to back.",
    ],
    [
      ["A", "A"],
      ["B", "B"],
      ["C", "C"],
      ["D", "D"],
    ],
    "d,b,a,c",
    [
      "D steht zuerst. Die restlichen Bedingungen ergeben B vor A vor C. Einzige Reihenfolge: D, B, A, C.",
      "D comes first. The remaining conditions put B before A before C. The only order is D, B, A, C.",
    ],
  ],
  [
    [
      "Je zwei Pumpen füllen denselben leeren Tank gemeinsam. Die angegebenen Zeiten gelten für jede Pumpe allein bei konstanter Rate. Ordne die Paare nach gemeinsamer Füllzeit von der kürzesten zur längsten.",
      "Each pair of pumps fills the same empty tank together. The stated times are for each pump alone at a constant rate. Arrange pairs by their combined filling time from shortest to longest.",
    ],
    [
      ["4 Stunden und 12 Stunden", "4 hours and 12 hours"],
      ["6 Stunden und 12 Stunden", "6 hours and 12 hours"],
      ["3 Stunden und 6 Stunden", "3 hours and 6 hours"],
      ["8 Stunden und 24 Stunden", "8 hours and 24 hours"],
    ],
    "c,a,b,d",
    [
      "Gemeinsame Zeit = 1 ÷ (1/x + 1/y). c = 2 Stunden, a = 3, b = 4, d = 6.",
      "Combined time = 1 ÷ (1/x + 1/y). c = 2 hours, a = 3, b = 4, d = 6.",
    ],
  ],
  [
    [
      "Jede Fahrt besteht aus zwei gleich langen Teilstrecken ohne Pause. Die Werte sind deren konstante Geschwindigkeiten in km/h. Ordne die Fahrten nach ihrer Gesamt-Durchschnittsgeschwindigkeit von der kleinsten zur größten.",
      "Each trip consists of two equally long legs with no stops. Values are the constant speeds of those legs in km/h. Arrange trips by their overall average speed from lowest to highest.",
    ],
    [
      ["30 und 60", "30 and 60"],
      ["40 und 60", "40 and 60"],
      ["20 und 80", "20 and 80"],
      ["50 und 50", "50 and 50"],
    ],
    "c,a,b,d",
    [
      "Für gleich lange Strecken gilt 2xy/(x + y). c = 32, a = 40, b = 48, d = 50 km/h.",
      "For equally long legs the average is 2xy/(x + y). c = 32, a = 40, b = 48, d = 50 km/h.",
    ],
  ],
  [
    [
      "Ordne die Wahrscheinlichkeiten von der kleinsten zur größten. Münzen sind fair und unabhängig; Kugeln werden zufällig gezogen.",
      "Arrange the probabilities from smallest to largest. Coins are fair and independent; balls are drawn randomly.",
    ],
    [
      ["Zweimal Kopf bei zwei Münzwürfen", "Two heads in two coin tosses"],
      [
        "Mindestens einmal Kopf bei drei Münzwürfen",
        "At least one head in three coin tosses",
      ],
      [
        "Genau einmal Kopf bei drei Münzwürfen",
        "Exactly one head in three coin tosses",
      ],
      [
        "Zwei rote Kugeln ohne Zurücklegen aus 3 roten und 2 blauen",
        "Two red balls without replacement from 3 red and 2 blue",
      ],
    ],
    "a,d,c,b",
    [
      "a = 1/4 = 0,25; d = (3/5)(2/4) = 0,30; c = 3/8 = 0,375; b = 7/8 = 0,875.",
      "a = 1/4 = 0.25; d = (3/5)(2/4) = 0.30; c = 3/8 = 0.375; b = 7/8 = 0.875.",
    ],
  ],
  [
    [
      "Alle Ausgangswerte sind 100. Zuerst steigt der Wert, danach sinkt der aktuelle Wert jeweils um den genannten Prozentsatz. Ordne die Endwerte vom kleinsten zum größten.",
      "All starting values are 100. Each value first rises, then its current value falls by the stated percentage. Arrange final values from smallest to largest.",
    ],
    [
      ["+20 Prozent, dann −20 Prozent", "+20 percent, then −20 percent"],
      ["+10 Prozent, dann −10 Prozent", "+10 percent, then −10 percent"],
      ["+25 Prozent, dann −25 Prozent", "+25 percent, then −25 percent"],
      ["+5 Prozent, dann −5 Prozent", "+5 percent, then −5 percent"],
    ],
    "c,a,b,d",
    [
      "c = 93,75; a = 96; b = 99; d = 99,75. Jeweils: 100 × (1 + p) × (1 − p).",
      "c = 93.75; a = 96; b = 99; d = 99.75. Each is 100 × (1 + p) × (1 − p).",
    ],
  ],
  [
    ascending,
    [
      ["(−5)²", "(−5)²"],
      ["(−3)³", "(−3)³"],
      ["(−2)⁴", "(−2)⁴"],
      ["−(4²)", "−(4²)"],
    ],
    "b,d,c,a",
    [
      "b = −27; d = −16; c = 16; a = 25. Bei d wird erst quadriert, dann das Minus angewendet.",
      "b = −27; d = −16; c = 16; a = 25. In d, square first, then apply the minus sign.",
    ],
  ],
  [
    ascending,
    [
      ["1/2 + 1/3", "1/2 + 1/3"],
      ["0,8", "0.8"],
      ["3/4 + 1/10", "3/4 + 1/10"],
      ["7/8", "7/8"],
    ],
    "b,a,c,d",
    [
      "b = 0,8; a = 5/6 ≈ 0,8333; c = 0,85; d = 0,875.",
      "b = 0.8; a = 5/6 ≈ 0.8333; c = 0.85; d = 0.875.",
    ],
  ],
  [
    [
      "In jeder Gruppe schüttelt jede Person jeder anderen genau einmal die Hand. Ordne die Gruppen nach der Zahl der Händedrücke von der kleinsten zur größten.",
      "In each group, every person shakes hands with every other person exactly once. Arrange groups by number of handshakes from smallest to largest.",
    ],
    [
      ["5 Personen", "5 people"],
      ["7 Personen", "7 people"],
      ["6 Personen", "6 people"],
      ["4 Personen", "4 people"],
    ],
    "d,a,c,b",
    [
      "Bei n Personen gibt es n(n − 1)/2 Händedrücke. d = 6, a = 10, c = 15, b = 21.",
      "With n people there are n(n − 1)/2 handshakes. d = 6, a = 10, c = 15, b = 21.",
    ],
  ],
  [
    [
      "Alle Tests zählen gleich. Ordne die Testserien nach ihrem Punktedurchschnitt vom kleinsten zum größten.",
      "All tests have equal weight. Arrange the test series by average score from smallest to largest.",
    ],
    [
      [
        "1 Test mit 50, 3 Tests mit je 90 Punkten",
        "1 test at 50, 3 tests at 90 points each",
      ],
      [
        "2 Tests mit je 60, 2 Tests mit je 80 Punkten",
        "2 tests at 60, 2 tests at 80 points each",
      ],
      [
        "3 Tests mit je 70, 1 Test mit 90 Punkten",
        "3 tests at 70, 1 test at 90 points",
      ],
      [
        "1 Test mit 80, 3 Tests mit je 100 Punkten",
        "1 test at 80, 3 tests at 100 points each",
      ],
    ],
    "b,c,a,d",
    [
      "b = 70; c = 75; a = 80; d = 95 Punkte. Für jede Serie: Punktesumme ÷ 4.",
      "b = 70; c = 75; a = 80; d = 95 points. For each series: total score ÷ 4.",
    ],
  ],
  [
    [
      "Alle Rechtecke haben eine Fläche von 36 cm². Ordne sie nach ihrem Umfang vom kleinsten zum größten.",
      "All rectangles have an area of 36 cm². Arrange them by perimeter from smallest to largest.",
    ],
    [
      ["Seiten 4 cm und 9 cm", "Sides 4 cm and 9 cm"],
      ["Seiten 2 cm und 18 cm", "Sides 2 cm and 18 cm"],
      ["Seiten 6 cm und 6 cm", "Sides 6 cm and 6 cm"],
      ["Seiten 3 cm und 12 cm", "Sides 3 cm and 12 cm"],
    ],
    "c,a,d,b",
    [
      "Umfang = 2 × (Länge + Breite). c = 24 cm; a = 26 cm; d = 30 cm; b = 40 cm.",
      "Perimeter = 2 × (length + width). c = 24 cm; a = 26 cm; d = 30 cm; b = 40 cm.",
    ],
  ],
  [
    [
      "Ordne die positiven Werte vom kleinsten zum größten. √ bezeichnet die positive Quadratwurzel.",
      "Arrange the positive values from smallest to largest. √ denotes the positive square root.",
    ],
    [
      ["√50", "√50"],
      ["7", "7"],
      ["2 × √13", "2 × √13"],
      ["√(49 + 9)", "√(49 + 9)"],
    ],
    "b,a,c,d",
    [
      "Alle Werte sind positiv. Ihre Quadrate sind b = 49, a = 50, c = 4 × 13 = 52 und d = 58. Die Quadrate und die Werte haben dieselbe Reihenfolge.",
      "All values are positive. Their squares are b = 49, a = 50, c = 4 × 13 = 52 and d = 58. The squares and the values have the same order.",
    ],
  ],
];

export const challengeBank: Record<
  "arithmetic" | "truth" | "order",
  Question[]
> = {
  arithmetic: arithmetic.map(([prompt, answer, explanation, unit], index) => ({
    id: id("arithmetic", index),
    category: "arithmetic",
    difficulty: level(index),
    prompt: t(prompt),
    answer,
    explanation: t(explanation),
    ...(unit ? { unit: t(unit) } : {}),
  })),
  truth: truth.map(([prompt, answer, explanation], index) => ({
    id: id("truth", index),
    category: "truth",
    difficulty: level(index),
    prompt: t(prompt),
    answer: answer ? "true" : "false",
    explanation: t(explanation),
    options: [
      { id: "true", text: t(["Wahr", "True"]) },
      { id: "false", text: t(["Falsch", "False"]) },
    ],
  })),
  order: order.map(([prompt, options, answer, explanation], index) => ({
    id: id("order", index),
    category: "order",
    difficulty: level(index),
    prompt: t(prompt),
    answer,
    explanation: t(explanation),
    options: options.map((text, optionIndex) => ({
      id: "abcd"[optionIndex],
      text: t(text),
    })),
  })),
};
