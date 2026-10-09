import {
  CATEGORIES,
  type Localized,
  type Question,
  type WeekPackage,
} from "../../shared/types";
import { extraGames } from "./extra-games";
import { drawingQuestions } from "./drawing";
import { knowledgeBank } from "./bank-knowledge";
import { challengeBank } from "./bank-challenges";
import { associationBank } from "./bank-association";
import { drawingBank } from "./bank-drawing";
import { puzzleBank } from "./bank-puzzles";

// Every user-facing string is written twice (de/en) with the same meaning.
// Question and option IDs are language-neutral and stable, so switching language never changes identity.
const t = (de: string, en: string): Localized<string> => ({ de, en });

// Authoritative, stable reference URLs. Arithmetic items that are fully determined by their own
// prompt need no external source; factual items always cite a primary reference.
const SRC = {
  siBrochure: "https://www.bipm.org/en/publications/si-brochure",
  temperature: "https://www.nist.gov/pml/owm/si-units-temperature",
  iupac: "https://iupac.org/what-we-do/periodic-table-of-elements/",
  nasaMercury: "https://science.nasa.gov/mercury/",
  nasaJupiter: "https://science.nasa.gov/jupiter/",
  nasaJupiterFacts: "https://science.nasa.gov/jupiter/jupiter-facts/",
  worldAthletics: "https://worldathletics.org/disciplines/roadrunning/marathon",
  fide: "https://handbook.fide.com/chapter/e012023",
} as const;

const starter01: WeekPackage = {
  id: "starter-01",
  week: "2026-W41",
  title: t("Startpaket Woche 41", "Starter Pack Week 41"),
  questions: {
    code: [],
    sets: [],
    connections: [],
    wavelength: [],
    memory: [],
    wordle: [],
    countries: [],
    association: [],
    geography: [],
    ...extraGames["starter-01"],
    drawing: drawingQuestions["starter-01"],
    trivia: [
      {
        id: "s1-trivia-01",
        category: "trivia",
        prompt: t(
          "Wie viele Minuten hat ein ganzer Tag?",
          "How many minutes are in one full day?",
        ),
        options: [
          { id: "a", text: t("1.200", "1,200") },
          { id: "b", text: t("1.400", "1,400") },
          { id: "c", text: t("1.440", "1,440") },
          { id: "d", text: t("1.540", "1,540") },
        ],
        answer: "c",
        explanation: t(
          "Ein Tag hat 24 Stunden und eine Stunde hat 60 Minuten. 24 × 60 = 1.440 Minuten.",
          "A day has 24 hours and an hour has 60 minutes. 24 × 60 = 1,440 minutes.",
        ),
        source: SRC.siBrochure,
      },
      {
        id: "s1-trivia-02",
        category: "trivia",
        prompt: t(
          "Wie groß ist die Summe der Innenwinkel eines ebenen Dreiecks in Grad?",
          "What is the sum of the interior angles of a plane triangle, in degrees?",
        ),
        options: [
          { id: "a", text: t("90", "90") },
          { id: "b", text: t("180", "180") },
          { id: "c", text: t("270", "270") },
          { id: "d", text: t("360", "360") },
        ],
        answer: "b",
        explanation: t(
          "Die drei Innenwinkel eines ebenen Dreiecks addieren sich immer zu 180 Grad. Beispiel: 60 + 60 + 60 = 180.",
          "The three interior angles of a plane triangle always add up to 180 degrees. Example: 60 + 60 + 60 = 180.",
        ),
      },
      {
        id: "s1-trivia-03",
        category: "trivia",
        prompt: t(
          "Bei welcher Temperatur siedet reines Wasser unter normalem Luftdruck ungefähr in Grad Celsius?",
          "At approximately what temperature does pure water boil under standard atmospheric pressure, in degrees Celsius?",
        ),
        options: [
          { id: "a", text: t("0", "0") },
          { id: "b", text: t("50", "50") },
          { id: "c", text: t("100", "100") },
          { id: "d", text: t("150", "150") },
        ],
        answer: "c",
        explanation: t(
          "Bei normalem Luftdruck (101,325 kPa) siedet reines Wasser bei ungefähr 100 Grad Celsius. Der Siedepunkt hängt vom Luftdruck ab.",
          "At standard atmospheric pressure (101.325 kPa), pure water boils at approximately 100 degrees Celsius. The boiling point depends on pressure.",
        ),
        source: SRC.temperature,
      },
      {
        id: "s1-trivia-04",
        category: "trivia",
        prompt: t(
          "Welcher Planet ist der Sonne am nächsten?",
          "Which planet is closest to the Sun?",
        ),
        options: [
          { id: "a", text: t("Venus", "Venus") },
          { id: "b", text: t("Erde", "Earth") },
          { id: "c", text: t("Merkur", "Mercury") },
          { id: "d", text: t("Mars", "Mars") },
        ],
        answer: "c",
        explanation: t(
          "Merkur umläuft die Sonne auf der innersten Bahn. Sein mittlerer Abstand zur Sonne beträgt etwa 58 Millionen Kilometer, weniger als bei Venus, Erde und Mars.",
          "Mercury orbits the Sun on the innermost path. Its average distance from the Sun is about 58 million kilometres, less than Venus, Earth and Mars.",
        ),
        source: SRC.nasaMercury,
      },
      {
        id: "s1-trivia-05",
        category: "trivia",
        prompt: t(
          "Welches chemische Symbol hat Gold?",
          "What is the chemical symbol for gold?",
        ),
        options: [
          { id: "a", text: t("Ag", "Ag") },
          { id: "b", text: t("Au", "Au") },
          { id: "c", text: t("Gd", "Gd") },
          { id: "d", text: t("Go", "Go") },
        ],
        answer: "b",
        explanation: t(
          "Das Symbol Au leitet sich vom lateinischen Namen aurum ab. Ag steht für Silber, Gd für Gadolinium, und Go ist kein Elementsymbol.",
          "The symbol Au comes from the Latin name aurum. Ag is silver, Gd is gadolinium, and Go is not an element symbol.",
        ),
        source: SRC.iupac,
      },
      {
        id: "s1-trivia-06",
        category: "trivia",
        prompt: t(
          "Wie viele Seiten hat ein regelmäßiges Sechseck (Hexagon)?",
          "How many sides does a regular hexagon have?",
        ),
        options: [
          { id: "a", text: t("5", "5") },
          { id: "b", text: t("6", "6") },
          { id: "c", text: t("7", "7") },
          { id: "d", text: t("8", "8") },
        ],
        answer: "b",
        explanation: t(
          "Hexagon kommt vom griechischen Wort hex für sechs. Ein regelmäßiges Sechseck hat sechs gleich lange Seiten.",
          "Hexagon comes from the Greek word hex, meaning six. A regular hexagon has six sides of equal length.",
        ),
      },
    ],
    logic: [
      {
        id: "s1-logic-01",
        category: "logic",
        prompt: t(
          "Regel: Jedes Glied ist das vorige Glied plus 2, beginnend bei 2. Folge: 2, 4, 6, 8, ?",
          "Rule: each term is the previous term plus 2, starting at 2. Sequence: 2, 4, 6, 8, ?",
        ),
        options: [
          { id: "a", text: t("9", "9") },
          { id: "b", text: t("10", "10") },
          { id: "c", text: t("11", "11") },
          { id: "d", text: t("12", "12") },
        ],
        answer: "b",
        explanation: t(
          "Die Regel addiert 2: 2 + 2 = 4, 4 + 2 = 6, 6 + 2 = 8, 8 + 2 = 10. Nur 10 folgt der Regel.",
          "The rule adds 2: 2 + 2 = 4, 4 + 2 = 6, 6 + 2 = 8, 8 + 2 = 10. Only 10 follows the rule.",
        ),
      },
      {
        id: "s1-logic-02",
        category: "logic",
        prompt: t(
          "Regel: Wenn alle A B sind und alle B C sind, dann sind alle A C. Alle Bloops sind Razzies. Alle Razzies sind Lazzies. Welche Aussage muss dann wahr sein?",
          "Rule: if all A are B and all B are C, then all A are C. All Bloops are Razzies. All Razzies are Lazzies. Which statement must then be true?",
        ),
        options: [
          {
            id: "a",
            text: t("Alle Bloops sind Lazzies.", "All Bloops are Lazzies."),
          },
          {
            id: "b",
            text: t("Alle Lazzies sind Bloops.", "All Lazzies are Bloops."),
          },
          {
            id: "c",
            text: t("Kein Bloop ist ein Lazzie.", "No Bloop is a Lazzie."),
          },
          {
            id: "d",
            text: t(
              "Einige Bloops sind keine Lazzies.",
              "Some Bloops are not Lazzies.",
            ),
          },
        ],
        answer: "a",
        explanation: t(
          "Jeder Bloop ist ein Razzie, und jeder Razzie ist ein Lazzie. Damit ist jeder Bloop ein Lazzie. Die anderen Aussagen folgen nicht: Lazzies können weitere Nicht-Razzies enthalten, und die Regel schließt keinen Bloop aus.",
          "Every Bloop is a Razzie, and every Razzie is a Lazzie. So every Bloop is a Lazzie. The other statements do not follow: Lazzies may include further non-Razzies, and the rule excludes no Bloop.",
        ),
      },
      {
        id: "s1-logic-03",
        category: "logic",
        prompt: t(
          "Regel: Jedes Glied ist die Summe der beiden vorigen Glieder, beginnend mit 1 und 1. Folge: 1, 1, 2, 3, 5, 8, ?",
          "Rule: each term is the sum of the two previous terms, starting with 1 and 1. Sequence: 1, 1, 2, 3, 5, 8, ?",
        ),
        options: [
          { id: "a", text: t("11", "11") },
          { id: "b", text: t("12", "12") },
          { id: "c", text: t("13", "13") },
          { id: "d", text: t("14", "14") },
        ],
        answer: "c",
        explanation: t(
          "1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13. Nur 13 folgt der Regel.",
          "1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8, 5 + 8 = 13. Only 13 follows the rule.",
        ),
      },
      {
        id: "s1-logic-04",
        category: "logic",
        prompt: t(
          "Regel: Ein Rennen hat genau einen ersten Platz, und jede Person läuft genau einmal. Ada, Bo und Cem laufen ein Rennen. Ada wird nicht Erste. Cem wird nicht Erster. Bo läuft vor Ada ins Ziel. Wer wird Erste(r)?",
          "Rule: a race has exactly one first place, and each person runs exactly once. Ada, Bo and Cem run a race. Ada does not finish first. Cem does not finish first. Bo finishes before Ada. Who finishes first?",
        ),
        options: [
          { id: "a", text: t("Ada", "Ada") },
          { id: "b", text: t("Bo", "Bo") },
          { id: "c", text: t("Cem", "Cem") },
          {
            id: "d",
            text: t(
              "Nicht eindeutig bestimmbar.",
              "Cannot be determined uniquely.",
            ),
          },
        ],
        answer: "b",
        explanation: t(
          "Ada und Cem können nicht Erste werden, also bleibt nur Bo als erste Person. Die Zusatzangabe, dass Bo vor Ada läuft, passt dazu. Damit ist Bo eindeutig Erster.",
          "Ada and Cem cannot finish first, so Bo is the only possible first-place runner. The extra clue that Bo finishes before Ada is consistent with this. Bo is therefore uniquely first.",
        ),
      },
      {
        id: "s1-logic-05",
        category: "logic",
        prompt: t(
          "Regel: Abwechselnd plus 3 und minus 1, beginnend bei 2. Folge: 2, 5, 4, 7, 6, ?",
          "Rule: alternately add 3 and subtract 1, starting at 2. Sequence: 2, 5, 4, 7, 6, ?",
        ),
        options: [
          { id: "a", text: t("7", "7") },
          { id: "b", text: t("8", "8") },
          { id: "c", text: t("9", "9") },
          { id: "d", text: t("10", "10") },
        ],
        answer: "c",
        explanation: t(
          "2 + 3 = 5, 5 - 1 = 4, 4 + 3 = 7, 7 - 1 = 6, 6 + 3 = 9. Nur 9 folgt der Regel.",
          "2 + 3 = 5, 5 - 1 = 4, 4 + 3 = 7, 7 - 1 = 6, 6 + 3 = 9. Only 9 follows the rule.",
        ),
      },
      {
        id: "s1-logic-06",
        category: "logic",
        prompt: t(
          "Regel: Gesucht ist genau eine ganze Zahl, die alle Bedingungen erfüllt: Sie ist gerade, größer als 10, kleiner als 20, durch 3 teilbar und nicht durch 4 teilbar. Welche Zahl ist es?",
          "Rule: exactly one integer satisfies all conditions: it is even, greater than 10, less than 20, divisible by 3, and not divisible by 4. Which number is it?",
        ),
        options: [
          { id: "a", text: t("12", "12") },
          { id: "b", text: t("15", "15") },
          { id: "c", text: t("18", "18") },
          { id: "d", text: t("20", "20") },
        ],
        answer: "c",
        explanation: t(
          "Gerade Vielfache von 3 zwischen 10 und 20 sind 12 und 18. Die 12 ist durch 4 teilbar und fällt weg. Damit bleibt nur 18.",
          "The even multiples of 3 between 10 and 20 are 12 and 18. The number 12 is divisible by 4 and is excluded. Only 18 remains.",
        ),
      },
    ],
    estimate: [
      {
        id: "s1-estimate-01",
        category: "estimate",
        prompt: t(
          "Wie viele Sekunden hat ein ganzer Tag? Antworte in Sekunden.",
          "How many seconds are in one full day? Answer in seconds.",
        ),
        answer: 86400,
        unit: t("Sekunden", "seconds"),
        explanation: t(
          "Ein Tag hat 24 Stunden und eine Stunde hat 3.600 Sekunden. 24 × 3.600 = 86.400 Sekunden.",
          "A day has 24 hours and an hour has 3,600 seconds. 24 × 3,600 = 86,400 seconds.",
        ),
        source: SRC.siBrochure,
      },
      {
        id: "s1-estimate-02",
        category: "estimate",
        prompt: t(
          "Wie lang ist die offizielle Marathonstrecke in Kilometern? Antworte in Kilometern.",
          "How long is the official marathon distance in kilometres? Answer in kilometres.",
        ),
        answer: 42.195,
        unit: t("Kilometer", "kilometres"),
        explanation: t(
          "Die Marathonstrecke wurde 1921 auf 26 Meilen und 385 Yards festgelegt. Umgerechnet sind das 42,195 Kilometer.",
          "The marathon distance was standardised in 1921 at 26 miles and 385 yards. Converted, that is 42.195 kilometres.",
        ),
        source: SRC.worldAthletics,
      },
      {
        id: "s1-estimate-03",
        category: "estimate",
        prompt: t(
          "Wie viele Felder hat ein Schachbrett? Antworte mit der Anzahl der Felder.",
          "How many squares does a chessboard have? Answer with the number of squares.",
        ),
        answer: 64,
        unit: t("Felder", "squares"),
        explanation: t(
          "Die FIDE-Regeln definieren das Schachbrett als 8 × 8 Gitter. 8 × 8 = 64 gleich große Felder.",
          "The FIDE rules define the chessboard as an 8 × 8 grid. 8 × 8 = 64 equal squares.",
        ),
        source: SRC.fide,
      },
      {
        id: "s1-estimate-04",
        category: "estimate",
        prompt: t(
          "Wie viele Diagonalen hat ein regelmäßiges Zehneck (Decagon)? Antworte mit der Anzahl der Diagonalen.",
          "How many diagonals does a regular decagon have? Answer with the number of diagonals.",
        ),
        answer: 35,
        unit: t("Diagonalen", "diagonals"),
        explanation: t(
          "Für ein Vieleck mit n Ecken gilt: Diagonalen = n × (n - 3) / 2. Mit n = 10: 10 × 7 / 2 = 35.",
          "For a polygon with n vertices: diagonals = n × (n - 3) / 2. With n = 10: 10 × 7 / 2 = 35.",
        ),
      },
      {
        id: "s1-estimate-05",
        category: "estimate",
        prompt: t(
          "Wie groß ist die Summe aller ganzen Zahlen von 1 bis 100? Antworte mit der Summe.",
          "What is the sum of all integers from 1 to 100? Answer with the sum.",
        ),
        answer: 5050,
        unit: t("Summe", "sum"),
        explanation: t(
          "Man paart 1 mit 100, 2 mit 99 und so weiter. Das ergibt 50 Paare mit der Summe 101. 50 × 101 = 5.050.",
          "Pair 1 with 100, 2 with 99, and so on. That gives 50 pairs with sum 101. 50 × 101 = 5,050.",
        ),
      },
      {
        id: "s1-estimate-06",
        category: "estimate",
        prompt: t(
          "Wie viele Erdentage braucht der Merkur für einen Umlauf um die Sonne? Antworte in Erdentagen.",
          "How many Earth days does Mercury take to orbit the Sun once? Answer in Earth days.",
        ),
        answer: 88,
        unit: t("Erdentage", "Earth days"),
        explanation: t(
          "Die NASA gibt die Umlaufzeit des Merkur mit 88 Erdentagen an.",
          "NASA states the orbital period of Mercury as 88 Earth days.",
        ),
        source: SRC.nasaMercury,
      },
    ],
  },
};

const starter02: WeekPackage = {
  id: "starter-02",
  week: "2026-W42",
  title: t("Startpaket Woche 42", "Starter Pack Week 42"),
  questions: {
    code: [],
    sets: [],
    connections: [],
    wavelength: [],
    memory: [],
    wordle: [],
    countries: [],
    association: [],
    geography: [],
    ...extraGames["starter-02"],
    drawing: drawingQuestions["starter-02"],
    trivia: [
      {
        id: "s2-trivia-01",
        category: "trivia",
        prompt: t(
          "Wie viele Stunden hat eine Woche?",
          "How many hours are in one week?",
        ),
        options: [
          { id: "a", text: t("144", "144") },
          { id: "b", text: t("168", "168") },
          { id: "c", text: t("180", "180") },
          { id: "d", text: t("196", "196") },
        ],
        answer: "b",
        explanation: t(
          "Eine Woche hat 7 Tage und ein Tag hat 24 Stunden. 7 × 24 = 168 Stunden.",
          "A week has 7 days and a day has 24 hours. 7 × 24 = 168 hours.",
        ),
      },
      {
        id: "s2-trivia-02",
        category: "trivia",
        prompt: t(
          "Wie viele Grad hat ein voller Kreis?",
          "How many degrees are in a full circle?",
        ),
        options: [
          { id: "a", text: t("180", "180") },
          { id: "b", text: t("270", "270") },
          { id: "c", text: t("360", "360") },
          { id: "d", text: t("400", "400") },
        ],
        answer: "c",
        explanation: t(
          "Ein voller Kreis umfasst 360 Grad. Ein halber Kreis sind 180 Grad, ein Viertelkreis 90 Grad.",
          "A full circle measures 360 degrees. A half circle is 180 degrees, and a quarter circle is 90 degrees.",
        ),
      },
      {
        id: "s2-trivia-03",
        category: "trivia",
        prompt: t(
          "Welcher Planet ist der größte in unserem Sonnensystem?",
          "Which planet is the largest in our solar system?",
        ),
        options: [
          { id: "a", text: t("Erde", "Earth") },
          { id: "b", text: t("Mars", "Mars") },
          { id: "c", text: t("Jupiter", "Jupiter") },
          { id: "d", text: t("Saturn", "Saturn") },
        ],
        answer: "c",
        explanation: t(
          "Jupiter ist mit einem Äquatordurchmesser von rund 143.000 Kilometern der größte Planet. Saturn ist kleiner, Erde und Mars sind deutlich kleiner.",
          "With an equatorial diameter of about 143,000 kilometres, Jupiter is the largest planet. Saturn is smaller, and Earth and Mars are much smaller.",
        ),
        source: SRC.nasaJupiter,
      },
      {
        id: "s2-trivia-04",
        category: "trivia",
        prompt: t(
          "Welches chemische Symbol hat Natrium?",
          "What is the chemical symbol for sodium?",
        ),
        options: [
          { id: "a", text: t("N", "N") },
          { id: "b", text: t("Na", "Na") },
          { id: "c", text: t("S", "S") },
          { id: "d", text: t("So", "So") },
        ],
        answer: "b",
        explanation: t(
          "Das Symbol Na leitet sich vom lateinischen Namen natrium ab. N steht für Stickstoff, S für Schwefel, und So ist kein Elementsymbol.",
          "The symbol Na comes from the Latin name natrium. N is nitrogen, S is sulfur, and So is not an element symbol.",
        ),
        source: SRC.iupac,
      },
      {
        id: "s2-trivia-05",
        category: "trivia",
        prompt: t(
          "Wie viele Seiten hat ein regelmäßiges Fünfeck (Pentagon)?",
          "How many sides does a regular pentagon have?",
        ),
        options: [
          { id: "a", text: t("4", "4") },
          { id: "b", text: t("5", "5") },
          { id: "c", text: t("6", "6") },
          { id: "d", text: t("7", "7") },
        ],
        answer: "b",
        explanation: t(
          "Pentagon kommt vom griechischen Wort penta für fünf. Ein regelmäßiges Fünfeck hat fünf gleich lange Seiten.",
          "Pentagon comes from the Greek word penta, meaning five. A regular pentagon has five sides of equal length.",
        ),
      },
      {
        id: "s2-trivia-06",
        category: "trivia",
        prompt: t(
          "Bei welcher Temperatur liegt der Gefrierpunkt von reinem Wasser unter normalem Luftdruck ungefähr in Grad Celsius?",
          "At approximately what temperature is the freezing point of pure water under standard atmospheric pressure, in degrees Celsius?",
        ),
        options: [
          { id: "a", text: t("-10", "-10") },
          { id: "b", text: t("0", "0") },
          { id: "c", text: t("10", "10") },
          { id: "d", text: t("32", "32") },
        ],
        answer: "b",
        explanation: t(
          "Bei normalem Luftdruck (101,325 kPa) liegt der Gefrierpunkt von reinem Wasser bei ungefähr 0 Grad Celsius. Gelöste Stoffe können den Gefrierpunkt verändern.",
          "At standard atmospheric pressure (101.325 kPa), the freezing point of pure water is approximately 0 degrees Celsius. Dissolved substances can change the freezing point.",
        ),
        source: SRC.temperature,
      },
    ],
    logic: [
      {
        id: "s2-logic-01",
        category: "logic",
        prompt: t(
          "Regel: Jedes Glied ist das vorige Glied geteilt durch 3, beginnend bei 81. Folge: 81, 27, 9, 3, ?",
          "Rule: each term is the previous term divided by 3, starting at 81. Sequence: 81, 27, 9, 3, ?",
        ),
        options: [
          { id: "a", text: t("0", "0") },
          { id: "b", text: t("1", "1") },
          { id: "c", text: t("2", "2") },
          { id: "d", text: t("3", "3") },
        ],
        answer: "b",
        explanation: t(
          "81 ÷ 3 = 27, 27 ÷ 3 = 9, 9 ÷ 3 = 3, 3 ÷ 3 = 1. Nur 1 folgt der Regel.",
          "81 ÷ 3 = 27, 27 ÷ 3 = 9, 9 ÷ 3 = 3, 3 ÷ 3 = 1. Only 1 follows the rule.",
        ),
      },
      {
        id: "s2-logic-02",
        category: "logic",
        prompt: t(
          "Regel: Wenn alle A B sind und kein B C ist, dann ist kein A C. Jeder Kip ist ein Lom. Kein Lom ist ein Zor. Welche Aussage muss dann wahr sein?",
          "Rule: if all A are B and no B is C, then no A is C. Every Kip is a Lom. No Lom is a Zor. Which statement must then be true?",
        ),
        options: [
          { id: "a", text: t("Kein Kip ist ein Zor.", "No Kip is a Zor.") },
          { id: "b", text: t("Jeder Zor ist ein Kip.", "Every Zor is a Kip.") },
          { id: "c", text: t("Einige Kips sind Zors.", "Some Kips are Zors.") },
          { id: "d", text: t("Jeder Lom ist ein Kip.", "Every Lom is a Kip.") },
        ],
        answer: "a",
        explanation: t(
          "Jeder Kip ist ein Lom, und kein Lom ist ein Zor. Damit kann kein Kip ein Zor sein. Die anderen Aussagen folgen nicht: Die Regel sagt nichts über Zors, die keine Loms sind, und nichts über Loms, die keine Kips sind.",
          "Every Kip is a Lom, and no Lom is a Zor. So no Kip can be a Zor. The other statements do not follow: the rule says nothing about Zors that are not Loms, and nothing about Loms that are not Kips.",
        ),
      },
      {
        id: "s2-logic-03",
        category: "logic",
        prompt: t(
          "Regel: Die Folge listet die Primzahlen der Größe nach auf. Folge: 2, 3, 5, 7, 11, ?",
          "Rule: the sequence lists the prime numbers in increasing order. Sequence: 2, 3, 5, 7, 11, ?",
        ),
        options: [
          { id: "a", text: t("12", "12") },
          { id: "b", text: t("13", "13") },
          { id: "c", text: t("14", "14") },
          { id: "d", text: t("15", "15") },
        ],
        answer: "b",
        explanation: t(
          "Nach 11 ist 12 durch 3 teilbar, 14 durch 2 und 15 durch 3. Die Zahl 13 hat außer 1 und 13 keinen Teiler und ist die nächste Primzahl.",
          "After 11, the number 12 is divisible by 3, 14 is divisible by 2, and 15 is divisible by 3. The number 13 has no divisor other than 1 and 13, so it is the next prime.",
        ),
      },
      {
        id: "s2-logic-04",
        category: "logic",
        prompt: t(
          "Regel: Gesucht ist genau eine ganze Zahl, die alle Bedingungen erfüllt: Sie liegt zwischen 50 und 60, lässt bei Division durch 5 den Rest 3 und ist gerade. Welche Zahl ist es?",
          "Rule: exactly one integer satisfies all conditions: it lies between 50 and 60, leaves remainder 3 when divided by 5, and is even. Which number is it?",
        ),
        options: [
          { id: "a", text: t("52", "52") },
          { id: "b", text: t("53", "53") },
          { id: "c", text: t("58", "58") },
          { id: "d", text: t("59", "59") },
        ],
        answer: "c",
        explanation: t(
          "Zahlen zwischen 50 und 60 mit Rest 3 bei Division durch 5 sind 53 und 58. Nur 58 ist gerade. Damit ist 58 die einzige Lösung.",
          "The numbers between 50 and 60 that leave remainder 3 when divided by 5 are 53 and 58. Only 58 is even. So 58 is the only solution.",
        ),
      },
      {
        id: "s2-logic-05",
        category: "logic",
        prompt: t(
          "Regel: Das n-te Glied ist die Summe 1 + 2 + ... + n. Folge: 1, 3, 6, 10, 15, ?",
          "Rule: the nth term is the sum 1 + 2 + ... + n. Sequence: 1, 3, 6, 10, 15, ?",
        ),
        options: [
          { id: "a", text: t("18", "18") },
          { id: "b", text: t("20", "20") },
          { id: "c", text: t("21", "21") },
          { id: "d", text: t("24", "24") },
        ],
        answer: "c",
        explanation: t(
          "Die Differenzen sind 2, 3, 4 und 5; die nächste Differenz ist 6. 15 + 6 = 21. Alternativ: 1 + 2 + 3 + 4 + 5 + 6 = 21.",
          "The differences are 2, 3, 4 and 5; the next difference is 6. 15 + 6 = 21. Alternatively: 1 + 2 + 3 + 4 + 5 + 6 = 21.",
        ),
      },
      {
        id: "s2-logic-06",
        category: "logic",
        prompt: t(
          "Regel: Vier Bücher stehen in einer Reihe auf den Plätzen 1 bis 4 von links nach rechts, jedes Buch genau einmal. Das rote Buch steht auf Platz 2. Das blaue Buch steht irgendwo rechts vom roten Buch. Das grüne Buch steht irgendwo rechts vom blauen Buch. Auf welchem Platz steht das grüne Buch?",
          "Rule: four books stand in a row in positions 1 to 4 from left to right, each book exactly once. The red book is in position 2. The blue book is somewhere to the right of the red book. The green book is somewhere to the right of the blue book. In which position is the green book?",
        ),
        options: [
          { id: "a", text: t("1", "1") },
          { id: "b", text: t("2", "2") },
          { id: "c", text: t("3", "3") },
          { id: "d", text: t("4", "4") },
        ],
        answer: "d",
        explanation: t(
          "Das rote Buch ist auf Platz 2. Das blaue Buch muss rechts davon stehen, also auf Platz 3 oder 4. Das grüne Buch muss rechts vom blauen stehen, also muss das blaue Buch auf Platz 3 und das grüne Buch auf Platz 4 stehen.",
          "The red book is in position 2. The blue book must be to its right, so in position 3 or 4. The green book must be to the right of the blue book, so the blue book must be in position 3 and the green book in position 4.",
        ),
      },
    ],
    estimate: [
      {
        id: "s2-estimate-01",
        category: "estimate",
        prompt: t(
          "Wie viele Minuten hat ein Jahr mit 365 Tagen? Antworte in Minuten.",
          "How many minutes are in a year of 365 days? Answer in minutes.",
        ),
        answer: 525600,
        unit: t("Minuten", "minutes"),
        explanation: t(
          "Ein Tag hat 1.440 Minuten. 365 × 1.440 = 525.600 Minuten.",
          "A day has 1,440 minutes. 365 × 1,440 = 525,600 minutes.",
        ),
      },
      {
        id: "s2-estimate-02",
        category: "estimate",
        prompt: t(
          "Wie viele Quadrate gibt es insgesamt auf einem 8 × 8 Schachbrett, wenn man alle Größen zählt? Antworte mit der Anzahl.",
          "How many squares are there in total on an 8 × 8 chessboard when all sizes are counted? Answer with the number.",
        ),
        answer: 204,
        unit: t("Quadrate", "squares"),
        explanation: t(
          "Es gibt 8 × 8 Quadrate der Größe 1, 7 × 7 der Größe 2 und so weiter. Die Summe 64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204.",
          "There are 8 × 8 squares of size 1, 7 × 7 of size 2, and so on. The sum 64 + 49 + 36 + 25 + 16 + 9 + 4 + 1 = 204.",
        ),
        source: SRC.fide,
      },
      {
        id: "s2-estimate-03",
        category: "estimate",
        prompt: t(
          "Wie viele Erdentage braucht Jupiter für einen Umlauf um die Sonne? Antworte in Erdentagen.",
          "How many Earth days does Jupiter take to orbit the Sun once? Answer in Earth days.",
        ),
        answer: 4333,
        unit: t("Erdentage", "Earth days"),
        explanation: t(
          "Die NASA gibt die Umlaufzeit des Jupiter mit etwa 4.333 Erdentagen an, das sind rund 12 Erdjahre.",
          "NASA states the orbital period of Jupiter as about 4,333 Earth days, which is roughly 12 Earth years.",
        ),
        source: SRC.nasaJupiterFacts,
      },
      {
        id: "s2-estimate-04",
        category: "estimate",
        prompt: t(
          "Wie groß ist die Summe der Innenwinkel eines regelmäßigen Sechsecks in Grad? Antworte in Grad.",
          "What is the sum of the interior angles of a regular hexagon, in degrees? Answer in degrees.",
        ),
        answer: 720,
        unit: t("Grad", "degrees"),
        explanation: t(
          "Für ein Vieleck mit n Ecken gilt: Summe = (n - 2) × 180. Mit n = 6: 4 × 180 = 720 Grad.",
          "For a polygon with n vertices: sum = (n - 2) × 180. With n = 6: 4 × 180 = 720 degrees.",
        ),
      },
      {
        id: "s2-estimate-05",
        category: "estimate",
        prompt: t(
          "Wie viele Diagonalen hat ein regelmäßiges Achteck (Oktagon)? Antworte mit der Anzahl der Diagonalen.",
          "How many diagonals does a regular octagon have? Answer with the number of diagonals.",
        ),
        answer: 20,
        unit: t("Diagonalen", "diagonals"),
        explanation: t(
          "Für ein Vieleck mit n Ecken gilt: Diagonalen = n × (n - 3) / 2. Mit n = 8: 8 × 5 / 2 = 20.",
          "For a polygon with n vertices: diagonals = n × (n - 3) / 2. With n = 8: 8 × 5 / 2 = 20.",
        ),
      },
      {
        id: "s2-estimate-06",
        category: "estimate",
        prompt: t(
          "Wie viele Sekunden hat eine Woche? Antworte in Sekunden.",
          "How many seconds are in one week? Answer in seconds.",
        ),
        answer: 604800,
        unit: t("Sekunden", "seconds"),
        explanation: t(
          "Eine Woche hat 7 Tage und ein Tag hat 86.400 Sekunden. 7 × 86.400 = 604.800 Sekunden.",
          "A week has 7 days and a day has 86,400 seconds. 7 × 86,400 = 604,800 seconds.",
        ),
      },
    ],
  },
};

// Newly composed packages remove parity hints from legacy truth identities.
// Existing room snapshots keep their stored identities and answer mappings.
const legacyTruthIds = [
  "vk7q",
  "ds9m",
  "jx4r",
  "pn2c",
  "hf8t",
  "bw5z",
  "rq3n",
  "tm6d",
  "xc2v",
  "gz8p",
  "nf4s",
  "kd9b",
];
const legacyTruthMap = Object.fromEntries(
  [...starter01.questions.truth, ...starter02.questions.truth].map(
    (q, index) => [q.id, `bank-truth-legacy-${legacyTruthIds[index]}`],
  ),
);
const additions = {
  ...puzzleBank,
  ...knowledgeBank,
  ...challengeBank,
  drawing: drawingBank,
  association: associationBank,
  geography: [],
};
// Weekly packages snapshot a shared reviewed bank. The week chooses presentation,
// while the server chooses an unseen question for the group's current level.
const questions = Object.fromEntries(
  CATEGORIES.map((category) => [
    category,
    [
      ...[
        ...starter01.questions[category],
        ...starter02.questions[category],
      ].map(
        (question): Question => ({
          ...question,
          id: category === "truth" ? legacyTruthMap[question.id] : question.id,
          difficulty: "easy",
        }),
      ),
      ...additions[category],
    ],
  ]),
) as WeekPackage["questions"];

export const packages: WeekPackage[] = [starter01, starter02].map(
  (starter) => ({
    ...starter,
    id: starter.id.replace("starter", "adaptive"),
    title: t(
      `Team-Challenge · ${Object.values(questions).flat().length} Aufgaben`,
      `Team Challenge · ${Object.values(questions).flat().length} questions`,
    ),
    questions,
  }),
);
