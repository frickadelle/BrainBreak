import type { Question } from "../../shared/types";

type Tier = "easy" | "medium" | "hard";
type Pair = [string, string];
const t = ([de, en]: Pair) => ({ de, en });
const pair = (value: string): Pair => [value, value];

// The first supplied choice is correct. Use balanced, nonperiodic positions
// so a public question ID does not reveal its answer by a modulo rule.
const triviaPositions = [
  2, 0, 3, 1, 0, 2, 1, 3, 1, 0, 3, 2, 1, 2, 0, 3, 2, 1, 3, 0, 0, 3, 1, 2, 3, 0,
  2, 1, 0, 1,
];
const logicPositions = [
  0, 3, 1, 2, 2, 1, 0, 3, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 1, 2, 3, 0, 2, 1, 3, 0,
  1, 3, 0, 2,
];
function choice(
  category: "trivia" | "logic",
  number: number,
  difficulty: Tier,
  prompt: Pair,
  choices: [Pair, Pair, Pair, Pair],
  explanation: Pair,
  source?: string,
): Question {
  const position = (category === "trivia" ? triviaPositions : logicPositions)[
    number - 1
  ];
  const ordered = choices.slice();
  const correct = ordered.shift()!;
  ordered.splice(position, 0, correct);
  return {
    id: `bank-${category}-${String(number).padStart(2, "0")}`,
    category,
    difficulty,
    prompt: t(prompt),
    options: ordered.map((text, i) => ({ id: "abcd"[i], text: t(text) })),
    answer: "abcd"[position],
    explanation: t(explanation),
    ...(source ? { source } : {}),
  };
}
function estimate(
  number: number,
  difficulty: Tier,
  prompt: Pair,
  answer: number,
  unit: Pair,
  explanation: Pair,
  source?: string,
): Question {
  return {
    id: `bank-estimate-${String(number).padStart(2, "0")}`,
    category: "estimate",
    difficulty,
    prompt: t(prompt),
    answer,
    unit: t(unit),
    explanation: t(explanation),
    ...(source ? { source } : {}),
  };
}
const nasa = (planet: string) =>
  `https://science.nasa.gov/${planet}/${planet === "earth" || planet === "uranus" ? "facts" : `${planet}-facts`}/`;
const unesco = (id: number) => `https://whc.unesco.org/en/list/${id}/`;
const nobel = (discipline: string, year: number, person: string) =>
  `https://www.nobelprize.org/prizes/${discipline}/${year}/${person}/facts/`;

const trivia: Question[] = [
  choice(
    "trivia",
    1,
    "easy",
    [
      "Welche Stadt ist die Hauptstadt Australiens?",
      "Which city is Australia's capital?",
    ],
    [pair("Canberra"), pair("Sydney"), pair("Melbourne"), pair("Perth")],
    [
      "Canberra ist Australiens Hauptstadt. Sydney und Melbourne sind größere Städte, aber keine nationale Hauptstadt.",
      "Canberra is Australia's capital. Sydney and Melbourne are larger cities, but neither is the national capital.",
    ],
    "https://www.nca.gov.au/education/canberras-history/canberra-seat-government",
  ),
  choice(
    "trivia",
    2,
    "easy",
    [
      "Welcher Planet hat die heißeste Oberfläche unseres Sonnensystems?",
      "Which planet has the hottest surface in our solar system?",
    ],
    [pair("Venus"), ["Merkur", "Mercury"], pair("Mars"), pair("Jupiter")],
    [
      "Die dichte Atmosphäre der Venus hält Wärme zurück. Dadurch ist ihre Oberfläche heißer als die des sonnennäheren Merkur.",
      "Venus's dense atmosphere traps heat. This makes its surface hotter than Mercury's, despite Mercury being closer to the Sun.",
    ],
    nasa("venus"),
  ),
  choice(
    "trivia",
    3,
    "easy",
    ["Wer malte die Mona Lisa?", "Who painted the Mona Lisa?"],
    [
      pair("Leonardo da Vinci"),
      pair("Michelangelo"),
      ["Raffael", "Raphael"],
      pair("Claude Monet"),
    ],
    [
      "Die Mona Lisa ist ein Gemälde von Leonardo da Vinci.",
      "The Mona Lisa is a painting by Leonardo da Vinci.",
    ],
    "https://www.louvre.fr/decouvrir/le-palais/de-la-joconde-aux-noces-de-cana",
  ),
  choice(
    "trivia",
    4,
    "easy",
    [
      "In welchem Land steht das Taj Mahal?",
      "In which country is the Taj Mahal?",
    ],
    [
      ["Indien", "India"],
      ["Pakistan", "Pakistan"],
      ["Iran", "Iran"],
      ["Nepal", "Nepal"],
    ],
    [
      "Das Taj Mahal steht in Agra in Indien.",
      "The Taj Mahal is in Agra, India.",
    ],
    unesco(252),
  ),
  choice(
    "trivia",
    5,
    "easy",
    [
      "Wer erfand 1989 am CERN das World Wide Web?",
      "Who invented the World Wide Web at CERN in 1989?",
    ],
    [
      pair("Tim Berners-Lee"),
      pair("Alan Turing"),
      pair("Bill Gates"),
      pair("Steve Jobs"),
    ],
    [
      "Tim Berners-Lee entwickelte das World Wide Web am CERN. Das Web nutzt das bereits bestehende Internet.",
      "Tim Berners-Lee developed the World Wide Web at CERN. The Web uses the already existing internet.",
    ],
    "https://home.cern/science/computing/the-birth-of-the-web/where-web-was-born/",
  ),
  choice(
    "trivia",
    6,
    "easy",
    [
      "Welcher Forscher entdeckte 1928 Penicillin?",
      "Which researcher discovered penicillin in 1928?",
    ],
    [
      pair("Alexander Fleming"),
      pair("Louis Pasteur"),
      pair("Robert Koch"),
      pair("Edward Jenner"),
    ],
    [
      "Alexander Fleming entdeckte Penicillin 1928. Chain und Florey entwickelten seine medizinische Anwendung weiter.",
      "Alexander Fleming discovered penicillin in 1928. Chain and Florey further developed its medical application.",
    ],
    "https://www.nobelprize.org/prizes/medicine/1945/fleming/biographical/",
  ),
  choice(
    "trivia",
    7,
    "easy",
    [
      "Welches chemische Element trägt das Symbol Fe?",
      "Which chemical element has the symbol Fe?",
    ],
    [
      ["Eisen", "Iron"],
      ["Fluor", "Fluorine"],
      ["Kupfer", "Copper"],
      ["Blei", "Lead"],
    ],
    [
      "Fe steht für Eisen und leitet sich vom lateinischen Wort ferrum ab.",
      "Fe stands for iron and comes from the Latin word ferrum.",
    ],
    "https://periodic-table.rsc.org/element/26/iron",
  ),
  choice(
    "trivia",
    8,
    "easy",
    [
      "Welches Gas macht den größten Anteil trockener Luft auf der Erde aus?",
      "Which gas makes up the largest share of dry air on Earth?",
    ],
    [
      ["Stickstoff", "Nitrogen"],
      ["Sauerstoff", "Oxygen"],
      ["Kohlendioxid", "Carbon dioxide"],
      ["Wasserstoff", "Hydrogen"],
    ],
    [
      "Stickstoff macht ungefähr 78 Prozent der Luft aus; Sauerstoff etwa 21 Prozent.",
      "Nitrogen makes up about 78 percent of air; oxygen makes up about 21 percent.",
    ],
    nasa("earth"),
  ),
  choice(
    "trivia",
    9,
    "easy",
    [
      "Über welcher griechischen Stadt liegt die berühmte Akropolis mit dem Parthenon?",
      "Above which Greek city is the famous Acropolis with the Parthenon?",
    ],
    [
      ["Athen", "Athens"],
      ["Sparta", "Sparta"],
      ["Korinth", "Corinth"],
      ["Thessaloniki", "Thessaloniki"],
    ],
    [
      "Die Akropolis mit dem Parthenon überragt Athen.",
      "The Acropolis with the Parthenon overlooks Athens.",
    ],
    unesco(404),
  ),
  choice(
    "trivia",
    10,
    "easy",
    [
      "In welchem Jahr verabschiedete der Kontinentalkongress die US-Unabhängigkeitserklärung?",
      "In which year did the Continental Congress adopt the US Declaration of Independence?",
    ],
    [pair("1776"), pair("1789"), pair("1812"), pair("1492")],
    [
      "Der Kontinentalkongress verabschiedete die Erklärung am 4. Juli 1776.",
      "The Continental Congress adopted the declaration on 4 July 1776.",
    ],
    "https://guides.loc.gov/declaration-of-independence",
  ),
  choice(
    "trivia",
    11,
    "medium",
    [
      "Welches historische Reich errichtete die Tempel von Angkor?",
      "Which historical empire built the temples of Angkor?",
    ],
    [
      ["Khmer-Reich", "Khmer Empire"],
      ["Mogulreich", "Mughal Empire"],
      ["Inka-Reich", "Inca Empire"],
      ["Osmanisches Reich", "Ottoman Empire"],
    ],
    [
      "Angkor war über mehrere Jahrhunderte das Zentrum des Khmer-Reichs im heutigen Kambodscha.",
      "For several centuries, Angkor was the centre of the Khmer Empire in present-day Cambodia.",
    ],
    unesco(668),
  ),
  choice(
    "trivia",
    12,
    "medium",
    [
      "Petra war eine bedeutende Hauptstadt welchen antiken Volkes?",
      "Petra was an important capital of which ancient people?",
    ],
    [
      ["Nabatäer", "Nabataeans"],
      ["Etrusker", "Etruscans"],
      ["Wikinger", "Vikings"],
      ["Azteken", "Aztecs"],
    ],
    [
      "Die Nabatäer bauten Petra als Fels- und Handelsstadt im heutigen Jordanien aus.",
      "The Nabataeans developed Petra as a rock-cut trading city in present-day Jordan.",
    ],
    unesco(326),
  ),
  choice(
    "trivia",
    13,
    "medium",
    [
      "Wer malte das Gruppenporträt Die Nachtwache?",
      "Who painted the group portrait The Night Watch?",
    ],
    [
      pair("Rembrandt"),
      pair("Johannes Vermeer"),
      pair("Vincent van Gogh"),
      pair("Pieter Bruegel"),
    ],
    [
      "Die Nachtwache stammt von Rembrandt und wurde 1642 fertiggestellt.",
      "The Night Watch is by Rembrandt and was completed in 1642.",
    ],
    "https://www.rijksmuseum.nl/en/stories/10-things/story/10-things-about-rembrandt-s-night-watch",
  ),
  choice(
    "trivia",
    14,
    "medium",
    [
      "Welcher Maler schuf 1656 Las Meninas?",
      "Which painter created Las Meninas in 1656?",
    ],
    [
      pair("Diego Velázquez"),
      pair("Francisco Goya"),
      pair("El Greco"),
      pair("Pablo Picasso"),
    ],
    [
      "Diego Velázquez malte Las Meninas 1656 am spanischen Hof.",
      "Diego Velázquez painted Las Meninas at the Spanish court in 1656.",
    ],
    "https://www.museodelprado.es/coleccion/obra-de-arte/las-meninas/9fdc7800-9ade-48b0-ab8b-edee94ea877f",
  ),
  choice(
    "trivia",
    15,
    "medium",
    [
      "In welchen beiden Disziplinen erhielt Marie Curie Nobelpreise?",
      "In which two disciplines did Marie Curie receive Nobel Prizes?",
    ],
    [
      ["Physik und Chemie", "Physics and Chemistry"],
      ["Chemie und Medizin", "Chemistry and Medicine"],
      ["Physik und Frieden", "Physics and Peace"],
      ["Medizin und Literatur", "Medicine and Literature"],
    ],
    [
      "Marie Curie erhielt den Physikpreis 1903 und den Chemiepreis 1911.",
      "Marie Curie received the Physics Prize in 1903 and the Chemistry Prize in 1911.",
    ],
    nobel("physics", 1903, "marie-curie"),
  ),
  choice(
    "trivia",
    16,
    "medium",
    [
      "Mit welcher Base paart sich Guanin in gewöhnlicher doppelsträngiger DNA?",
      "Which base pairs with guanine in ordinary double-stranded DNA?",
    ],
    [
      ["Cytosin", "Cytosine"],
      ["Adenin", "Adenine"],
      ["Thymin", "Thymine"],
      ["Uracil", "Uracil"],
    ],
    [
      "Guanin paart sich mit Cytosin. Adenin paart sich mit Thymin.",
      "Guanine pairs with cytosine. Adenine pairs with thymine.",
    ],
    "https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Fact-Sheet",
  ),
  choice(
    "trivia",
    17,
    "medium",
    [
      "Welches Element wird international mit W abgekürzt?",
      "Which element has the international symbol W?",
    ],
    [
      ["Wolfram", "Tungsten"],
      ["Vanadium", "Vanadium"],
      ["Wismut", "Bismuth"],
      ["Quecksilber", "Mercury"],
    ],
    [
      "W ist das Symbol für Wolfram, auf Englisch tungsten.",
      "W is the symbol for tungsten, also known as wolfram.",
    ],
    "https://periodic-table.rsc.org/element/74/tungsten",
  ),
  choice(
    "trivia",
    18,
    "medium",
    [
      "Welcher Planet rotiert wegen seiner fast rechtwinklig geneigten Achse gewissermaßen auf der Seite?",
      "Which planet effectively spins on its side because its axis is tilted almost at a right angle?",
    ],
    [pair("Uranus"), pair("Mars"), pair("Jupiter"), pair("Saturn")],
    [
      "Die Rotationsachse des Uranus ist um etwa 98 Grad geneigt.",
      "Uranus's rotation axis is tilted by about 98 degrees.",
    ],
    nasa("uranus"),
  ),
  choice(
    "trivia",
    19,
    "medium",
    ["Wer schrieb den Roman Don Quijote?", "Who wrote the novel Don Quixote?"],
    [
      pair("Miguel de Cervantes"),
      pair("Lope de Vega"),
      pair("Federico García Lorca"),
      pair("Jorge Luis Borges"),
    ],
    [
      "Miguel de Cervantes schrieb Don Quijote. Der erste Teil erschien 1605.",
      "Miguel de Cervantes wrote Don Quixote. Its first part was published in 1605.",
    ],
    "https://www.bne.es/es/colecciones/cervantes/ingenioso-hidalgo-don-quixote-mancha",
  ),
  choice(
    "trivia",
    20,
    "medium",
    [
      "Unter welchem byzantinischen Kaiser entstand im 6. Jahrhundert die heutige Hagia Sophia?",
      "Under which Byzantine emperor was the present Hagia Sophia built in the sixth century?",
    ],
    [
      ["Justinian I.", "Justinian I"],
      ["Konstantin I.", "Constantine I"],
      ["Basileios II.", "Basil II"],
      ["Alexios I.", "Alexios I"],
    ],
    [
      "Die heutige Hagia Sophia wurde im 6. Jahrhundert unter Justinian I. errichtet.",
      "The present Hagia Sophia was built in the sixth century under Justinian I.",
    ],
    unesco(356),
  ),
  choice(
    "trivia",
    21,
    "hard",
    [
      "Welche Schrift steht neben Hieroglyphen und Griechisch auf dem Stein von Rosette?",
      "Which script appears alongside hieroglyphs and Greek on the Rosetta Stone?",
    ],
    [
      ["Demotisch", "Demotic"],
      ["Keilschrift", "Cuneiform"],
      ["Linear B", "Linear B"],
      ["Glagolitisch", "Glagolitic"],
    ],
    [
      "Der Stein enthält denselben Erlass in Hieroglyphen, demotischer Schrift und Griechisch. Es sind drei Schriften, aber zwei Sprachen.",
      "The stone contains the same decree in hieroglyphs, Demotic script and Greek. These are three scripts but two languages.",
    ],
    "https://www.britishmuseum.org/blog/everything-you-ever-wanted-know-about-rosetta-stone",
  ),
  choice(
    "trivia",
    22,
    "hard",
    [
      "Welches Phänomen nennt die Begründung für Einsteins Physik-Nobelpreis von 1921 ausdrücklich?",
      "Which phenomenon is explicitly named in the motivation for Einstein's 1921 Nobel Prize in Physics?",
    ],
    [
      ["Photoelektrischer Effekt", "Photoelectric effect"],
      ["Gravitationswellen", "Gravitational waves"],
      ["Supraleitung", "Superconductivity"],
      ["Kernspaltung", "Nuclear fission"],
    ],
    [
      "Die Begründung hebt Einsteins Entdeckung des Gesetzes des photoelektrischen Effekts hervor.",
      "The motivation highlights Einstein's discovery of the law of the photoelectric effect.",
    ],
    nobel("physics", 1921, "einstein"),
  ),
  choice(
    "trivia",
    23,
    "hard",
    [
      "Welchen Planeten umkreist der große Mond Triton entgegen der Rotationsrichtung des Planeten?",
      "Which planet does the large moon Triton orbit opposite to the planet's direction of rotation?",
    ],
    [
      ["Neptun", "Neptune"],
      ["Saturn", "Saturn"],
      ["Jupiter", "Jupiter"],
      ["Uranus", "Uranus"],
    ],
    [
      "Triton umkreist Neptun auf einer rückläufigen Bahn. Das deutet darauf hin, dass Neptun ihn einst eingefangen hat.",
      "Triton orbits Neptune in a retrograde direction. This suggests Neptune once captured it.",
    ],
    nasa("neptune"),
  ),
  choice(
    "trivia",
    24,
    "hard",
    [
      "Welche Aussage vergleicht eine vollständige Eigendrehung der Venus mit ihrem Sonnenumlauf korrekt?",
      "Which statement correctly compares a full rotation of Venus with its orbit around the Sun?",
    ],
    [
      [
        "Die Eigendrehung dauert länger als der Umlauf.",
        "The rotation takes longer than the orbit.",
      ],
      [
        "Die Eigendrehung dauert genau halb so lang.",
        "The rotation takes exactly half as long.",
      ],
      ["Beide dauern gleich lang.", "Both take the same time."],
      [
        "Die Venus dreht sich nicht um ihre Achse.",
        "Venus does not rotate on its axis.",
      ],
    ],
    [
      "Eine Eigendrehung dauert etwa 243 Erdentage, ein Umlauf etwa 225. Gemeint ist die Eigendrehung, nicht die Zeit zwischen zwei Sonnenaufgängen.",
      "A rotation takes about 243 Earth days; an orbit takes about 225. This refers to rotation, not the interval between two sunrises.",
    ],
    nasa("venus"),
  ),
  choice(
    "trivia",
    25,
    "hard",
    [
      "Welche Naturkonstante definiert seit 2019 die SI-Einheit Kelvin?",
      "Which physical constant has defined the SI unit kelvin since 2019?",
    ],
    [
      ["Boltzmann-Konstante", "Boltzmann constant"],
      ["Gravitationskonstante", "Gravitational constant"],
      ["Avogadro-Konstante", "Avogadro constant"],
      ["Feinstrukturkonstante", "Fine-structure constant"],
    ],
    [
      "Die Definition des Kelvin legt den Zahlenwert der Boltzmann-Konstante exakt fest.",
      "The definition of the kelvin fixes the numerical value of the Boltzmann constant exactly.",
    ],
    "https://www.bipm.org/en/si-base-units/kelvin",
  ),
  choice(
    "trivia",
    26,
    "hard",
    [
      "Nach welchem Land benannte Marie Curie das Element Polonium?",
      "After which country did Marie Curie name the element polonium?",
    ],
    [
      ["Polen", "Poland"],
      ["Portugal", "Portugal"],
      ["Frankreich", "France"],
      ["Schweden", "Sweden"],
    ],
    [
      "Polonium erhielt seinen Namen nach Polen, dem Geburtsland Marie Curies.",
      "Polonium was named after Poland, Marie Curie's country of birth.",
    ],
    "https://www.nobelprize.org/prizes/chemistry/1911/marie-curie/biographical/",
  ),
  choice(
    "trivia",
    27,
    "hard",
    [
      "Wer schlug 1930 die Existenz eines später Neutrino genannten Teilchens vor?",
      "Who proposed the existence of the particle later called the neutrino in 1930?",
    ],
    [
      pair("Wolfgang Pauli"),
      pair("Niels Bohr"),
      pair("Ernest Rutherford"),
      pair("James Chadwick"),
    ],
    [
      "Wolfgang Pauli schlug das Teilchen vor, um die scheinbar fehlende Energie beim Betazerfall zu erklären.",
      "Wolfgang Pauli proposed the particle to explain the apparently missing energy in beta decay.",
    ],
    "https://www.nobelprize.org/prizes/themes/how-the-sun-shines/",
  ),
  choice(
    "trivia",
    28,
    "hard",
    [
      "Für welche Maschine beschrieb Ada Lovelace 1843 einen Algorithmus zur Berechnung von Bernoulli-Zahlen?",
      "For which machine did Ada Lovelace describe an algorithm for calculating Bernoulli numbers in 1843?",
    ],
    [pair("Analytical Engine"), pair("ENIAC"), pair("Z3"), pair("Colossus")],
    [
      "Lovelaces Algorithmus war für Charles Babbages geplante Analytical Engine bestimmt.",
      "Lovelace's algorithm was intended for Charles Babbage's proposed Analytical Engine.",
    ],
    "https://www.open.edu/openlearn/science-maths-technology/engineering-and-technology/technology/ada-lovelace-day",
  ),
  choice(
    "trivia",
    29,
    "hard",
    [
      "Hokusais Große Welle gehört zu einer Bildserie mit Ansichten welchen Berges?",
      "Hokusai's Great Wave belongs to a series of views of which mountain?",
    ],
    [
      ["Fuji", "Mount Fuji"],
      ["Everest", "Mount Everest"],
      ["Kilimandscharo", "Kilimanjaro"],
      ["Vesuv", "Mount Vesuvius"],
    ],
    [
      "Die Große Welle gehört zu Hokusais Serie 36 Ansichten des Berges Fuji.",
      "The Great Wave belongs to Hokusai's series Thirty-six Views of Mount Fuji.",
    ],
    "https://www.metmuseum.org/art/collection/search/56353",
  ),
  choice(
    "trivia",
    30,
    "hard",
    [
      "Welche beiden europäischen Kronen vereinbarten 1494 im Vertrag von Tordesillas eine neue Demarkationslinie?",
      "Which two European crowns agreed a new demarcation line in the 1494 Treaty of Tordesillas?",
    ],
    [
      ["Spanien und Portugal", "Spain and Portugal"],
      ["England und Frankreich", "England and France"],
      ["Portugal und England", "Portugal and England"],
      ["Spanien und Frankreich", "Spain and France"],
    ],
    [
      "Die Vereinbarung verband die spanischen Herrscher Ferdinand und Isabella mit König Johann II. von Portugal.",
      "The agreement linked Spain's rulers Ferdinand and Isabella with King John II of Portugal.",
    ],
    "https://www.unesco.org/en/memory-world/treaty-tordesillas",
  ),
];

const logic: Question[] = [
  choice(
    "logic",
    1,
    "easy",
    [
      "Heute ist Dienstag. Welcher Wochentag ist in drei Tagen?",
      "Today is Tuesday. What day of the week is it in three days?",
    ],
    [
      ["Freitag", "Friday"],
      ["Donnerstag", "Thursday"],
      ["Samstag", "Saturday"],
      ["Sonntag", "Sunday"],
    ],
    [
      "Ein Tag später ist Mittwoch, zwei Tage später Donnerstag, drei Tage später Freitag.",
      "One day later is Wednesday, two days later Thursday, three days later Friday.",
    ],
  ),
  choice(
    "logic",
    2,
    "easy",
    [
      "Regel: Wenn es regnet, nimmt Ada einen Schirm. Ada nimmt keinen Schirm. Was folgt zwingend?",
      "Rule: if it rains, Ada takes an umbrella. Ada does not take an umbrella. What necessarily follows?",
    ],
    [
      ["Es regnet nicht.", "It is not raining."],
      ["Es regnet.", "It is raining."],
      ["Ada hat keinen Schirm.", "Ada owns no umbrella."],
      ["Es schneit.", "It is snowing."],
    ],
    [
      "Würde es regnen, müsste Ada laut Regel einen Schirm nehmen. Daher kann es nicht regnen.",
      "If it were raining, Ada would have to take an umbrella under the rule. It therefore cannot be raining.",
    ],
  ),
  choice(
    "logic",
    3,
    "easy",
    [
      "Zwei unabhängige Schalter können jeweils an oder aus sein. Wie viele verschiedene Zustände sind möglich?",
      "Two independent switches can each be on or off. How many different states are possible?",
    ],
    [pair("4"), pair("2"), pair("3"), pair("8")],
    [
      "Möglich sind aus/aus, aus/an, an/aus und an/an: vier Zustände.",
      "The possibilities are off/off, off/on, on/off and on/on: four states.",
    ],
  ),
  choice(
    "logic",
    4,
    "easy",
    [
      "Wege sind in beide Richtungen nutzbar: A–B kostet 2 Minuten, B–C kostet 3, A–C kostet 8. Wie schnell kommt man mindestens von A nach C?",
      "Paths work both ways: A–B takes 2 minutes, B–C takes 3, A–C takes 8. What is the shortest travel time from A to C?",
    ],
    [pair("5"), pair("3"), pair("8"), pair("10")],
    [
      "Über B dauert es 2 + 3 = 5 Minuten. Der direkte Weg dauert 8 Minuten.",
      "Via B takes 2 + 3 = 5 minutes. The direct path takes 8 minutes.",
    ],
  ),
  choice(
    "logic",
    5,
    "easy",
    [
      "Auf einen leeren Stapel werden zuerst A, dann B, dann C gelegt. Man entfernt stets das oberste Element. Welches wird zuerst entfernt?",
      "A, then B, then C are placed on an empty stack. Removal always takes the top item. Which item is removed first?",
    ],
    [pair("C"), pair("A"), pair("B"), ["Alle gleichzeitig", "All at once"]],
    [
      "C wurde zuletzt oben auf den Stapel gelegt und wird zuerst entfernt.",
      "C was placed on top last and is removed first.",
    ],
  ),
  choice(
    "logic",
    6,
    "easy",
    [
      "Zwei faire Münzen werden unabhängig geworfen. Wie groß ist die Wahrscheinlichkeit für mindestens einmal Kopf?",
      "Two fair coins are tossed independently. What is the probability of at least one head?",
    ],
    [pair("3/4"), pair("1/4"), pair("1/2"), pair("1")],
    [
      "Von KK, KZ, ZK und ZZ enthalten drei Ergebnisse mindestens einmal Kopf.",
      "Of HH, HT, TH and TT, three outcomes contain at least one head.",
    ],
  ),
  choice(
    "logic",
    7,
    "easy",
    [
      "Drei Tiere haben unterschiedliche Gewichte. Die Katze ist schwerer als der Hund, der Fuchs schwerer als die Katze. Welches Tier ist am leichtesten?",
      "Three animals have different weights. The cat is heavier than the dog, and the fox is heavier than the cat. Which animal is lightest?",
    ],
    [
      ["Hund", "Dog"],
      ["Katze", "Cat"],
      ["Fuchs", "Fox"],
      ["Nicht bestimmbar", "Cannot be determined"],
    ],
    [
      "Die Gewichte steigen in der Reihenfolge Hund, Katze, Fuchs.",
      "The weights increase in the order dog, cat, fox.",
    ],
  ),
  choice(
    "logic",
    8,
    "easy",
    [
      "Alle Gedichtbände in einer Bibliothek haben einen blauen Einband. Dieses Buch hat einen roten Einband. Was folgt sicher?",
      "All poetry books in a library have blue covers. This book has a red cover. What follows with certainty?",
    ],
    [
      [
        "Es ist kein Gedichtband dieser Bibliothek.",
        "It is not a poetry book from this library.",
      ],
      ["Es ist ein Roman.", "It is a novel."],
      [
        "Alle blauen Bücher sind Gedichtbände.",
        "All blue books are poetry books.",
      ],
      ["Es enthält keine Gedichte.", "It contains no poems."],
    ],
    [
      "Ein Gedichtband der Bibliothek müsste blau sein. Die Regel sagt nichts über andere Bücher oder einzelne Gedichte aus.",
      "A poetry book from the library would have to be blue. The rule says nothing about other books or individual poems.",
    ],
  ),
  choice(
    "logic",
    9,
    "easy",
    [
      "In einem Beutel liegen beliebig viele rote, blaue und grüne Kugeln. Wie viele muss man blind höchstens ziehen, um sicher zwei derselben Farbe zu haben?",
      "A bag contains arbitrarily many red, blue and green balls. How many blind draws guarantee at least two of the same colour?",
    ],
    [pair("4"), pair("2"), pair("3"), pair("6")],
    [
      "Die ersten drei könnten je eine andere Farbe haben. Die vierte muss eine bereits gezogene Farbe wiederholen.",
      "The first three could all have different colours. The fourth must repeat a colour already drawn.",
    ],
  ),
  choice(
    "logic",
    10,
    "easy",
    [
      "Acht Personen spielen Tennis, fünf schwimmen, zwei tun beides. Wie viele verschiedene Personen tun mindestens eines davon?",
      "Eight people play tennis, five swim, and two do both. How many different people do at least one of these activities?",
    ],
    [pair("11"), pair("13"), pair("15"), pair("10")],
    [
      "8 + 5 zählt die zwei Personen in beiden Gruppen doppelt. 8 + 5 − 2 = 11.",
      "8 + 5 counts the two people in both groups twice. 8 + 5 − 2 = 11.",
    ],
  ),
  choice(
    "logic",
    11,
    "medium",
    [
      "Drei Türen: Eine zufällig und gleichverteilt gewählte Tür gewinnt. Du wählst eine. Der wissende Moderator öffnet immer eine andere Niete und bietet immer den Wechsel zur letzten Tür an. Gewinnchance beim Wechsel?",
      "Three doors: one wins, chosen uniformly at random. You pick one. The knowledgeable host always opens another losing door and always offers a switch to the last door. Chance of winning by switching?",
    ],
    [pair("2/3"), pair("1/3"), pair("1/2"), pair("1")],
    [
      "Die erste Wahl gewinnt mit 1/3. In den übrigen 2/3 öffnet der Moderator die einzige andere Niete; der Wechsel gewinnt.",
      "The first choice wins with probability 1/3. In the remaining 2/3, the host opens the only other losing door; switching wins.",
    ],
  ),
  choice(
    "logic",
    12,
    "medium",
    [
      "Drei faire Münzen werden unabhängig geworfen. Wie groß ist die Wahrscheinlichkeit für genau zweimal Kopf?",
      "Three fair coins are tossed independently. What is the probability of exactly two heads?",
    ],
    [pair("3/8"), pair("1/8"), pair("1/2"), pair("3/4")],
    [
      "Von acht gleich wahrscheinlichen Folgen passen KKZ, KZK und ZKK: 3/8.",
      "Of eight equally likely sequences, HHT, HTH and THH qualify: 3/8.",
    ],
  ),
  choice(
    "logic",
    13,
    "medium",
    [
      "Ein Beutel enthält drei rote und zwei blaue Kugeln. Zwei werden ohne Zurücklegen zufällig gezogen. Wie wahrscheinlich sind zwei rote?",
      "A bag contains three red and two blue balls. Two are drawn randomly without replacement. What is the probability both are red?",
    ],
    [pair("3/10"), pair("9/25"), pair("2/5"), pair("1/5")],
    [
      "Die erste ist mit 3/5 rot, die zweite danach mit 2/4. 3/5 × 2/4 = 3/10.",
      "The first is red with probability 3/5, then the second with 2/4. 3/5 × 2/4 = 3/10.",
    ],
  ),
  choice(
    "logic",
    14,
    "medium",
    [
      "Ada und Bo sind jeweils entweder immer ehrlich oder lügen immer. Ada: „Bo lügt immer.“ Bo: „Wir sind vom gleichen Typ.“ Wer ist ehrlich?",
      "Ada and Bo each either always tell the truth or always lie. Ada: “Bo always lies.” Bo: “We are the same type.” Who tells the truth?",
    ],
    [
      ["Nur Ada", "Only Ada"],
      ["Nur Bo", "Only Bo"],
      ["Beide", "Both"],
      ["Keiner", "Neither"],
    ],
    [
      "Ada ehrlich und Bo lügend erfüllt beide Aussagen. Wäre Ada lügend, wäre Bo ehrlich, doch Bos Aussage über den gleichen Typ wäre falsch.",
      "Ada truthful and Bo lying satisfies both statements. If Ada were lying, Bo would be truthful, but Bo's statement about the same type would be false.",
    ],
  ),
  choice(
    "logic",
    15,
    "medium",
    [
      "Genau eine von drei Kisten enthält nur rote Kugeln, genau eine nur blaue, genau eine beide Farben. Alle Aufschriften sind falsch. Aus der Kiste „gemischt“ ziehst du eine rote Kugel. Was enthält die Kiste „blau“?",
      "Exactly one of three boxes contains only red balls, one only blue, and one both colours. Every label is wrong. You draw a red ball from the box labelled “mixed”. What is in the box labelled “blue”?",
    ],
    [
      ["Gemischte Kugeln", "Mixed balls"],
      ["Nur rote Kugeln", "Only red balls"],
      ["Nur blaue Kugeln", "Only blue balls"],
      ["Nicht bestimmbar", "Cannot be determined"],
    ],
    [
      "„Gemischt“ kann nicht gemischt sein und enthält daher nur Rot. „Blau“ darf weder Blau sein noch die schon vergebene rote Kiste: also gemischt.",
      "“Mixed” cannot be mixed, so contains only red. “Blue” can be neither blue nor the already identified red box: it must be mixed.",
    ],
  ),
  choice(
    "logic",
    16,
    "medium",
    [
      "Vier Personen brauchen 1, 2, 7 und 10 Minuten über eine Brücke. Maximal zwei gehen zusammen, so langsam wie die langsamere Person. Die einzige Lampe muss stets mit. Alle starten auf derselben Seite. Minimale Zeit, bis alle auf der anderen Seite sind?",
      "Four people take 1, 2, 7 and 10 minutes to cross a bridge. At most two cross together at the slower person's speed. The only lamp must always travel with them. All start on the same bank. Minimum time until all are across?",
    ],
    [pair("17"), pair("19"), pair("20"), pair("14")],
    [
      "1+2 hin: 2; 1 zurück: 1; 7+10 hin: 10; 2 zurück: 2; 1+2 hin: 2. Summe 17. Die Alternative mit 1 als ständigem Begleiter benötigt 20.",
      "1+2 cross: 2; 1 returns: 1; 7+10 cross: 10; 2 returns: 2; 1+2 cross: 2. Total 17. The alternative using 1 as the constant escort takes 20.",
    ],
  ),
  choice(
    "logic",
    17,
    "medium",
    [
      "Zwei faire Würfel werden unabhängig geworfen. Du weißt nur, dass mindestens einer eine 6 zeigt. Wie wahrscheinlich zeigen beide eine 6?",
      "Two fair dice are rolled independently. You know only that at least one shows 6. What is the probability both show 6?",
    ],
    [pair("1/11"), pair("1/6"), pair("1/12"), pair("1/36")],
    [
      "Es gibt 6 Ergebnisse mit erster 6 und 6 mit zweiter 6; (6,6) ist doppelt gezählt: 11. Nur eines zeigt zwei Sechsen.",
      "There are 6 outcomes with the first die 6 and 6 with the second die 6; (6,6) was counted twice: 11. Only one has two sixes.",
    ],
  ),
  choice(
    "logic",
    18,
    "medium",
    [
      "Vier unterschiedliche Personen sitzen an einem runden Tisch. Drehungen zählen als gleich, Spiegelungen als verschieden. Wie viele Sitzordnungen gibt es?",
      "Four different people sit around a round table. Rotations count as the same, reflections as different. How many seating arrangements are there?",
    ],
    [pair("6"), pair("24"), pair("12"), pair("3")],
    [
      "Eine Person wird als Bezugspunkt festgehalten. Die übrigen drei können in 3 × 2 × 1 = 6 Reihenfolgen sitzen.",
      "Fix one person as the reference point. The remaining three can sit in 3 × 2 × 1 = 6 orders.",
    ],
  ),
  choice(
    "logic",
    19,
    "medium",
    [
      "Ein zusammenhängendes Wegenetz hat genau zwei Knoten mit ungerader Anzahl angrenzender Wege. Kann man jeden Weg genau einmal gehen, ohne zum Start zurückzukehren?",
      "A connected path network has exactly two vertices with an odd number of incident edges. Can you traverse every edge exactly once without returning to the start?",
    ],
    [
      [
        "Ja, von einem ungeraden Knoten zum anderen.",
        "Yes, from one odd vertex to the other.",
      ],
      ["Ja, von jedem beliebigen Knoten.", "Yes, from any vertex."],
      [
        "Nein, dafür müssen alle Knoten gerade sein.",
        "No, every vertex must have even degree.",
      ],
      [
        "Nur wenn es insgesamt zwei Wege gibt.",
        "Only if there are two edges in total.",
      ],
    ],
    [
      "Ein offener Eulerweg existiert bei genau zwei ungeraden Knoten. Diese sind Start und Ende; alle übrigen Besuche verwenden Wegpaare.",
      "An open Euler trail exists with exactly two odd vertices. They are the start and end; all other visits pair incoming and outgoing edges.",
    ],
  ),
  choice(
    "logic",
    20,
    "medium",
    [
      "Aufgabe A dauert 4 Minuten. Danach dürfen B (3 Minuten) und C (5 Minuten) parallel starten. D dauert 2 Minuten und beginnt erst nach B und C. Frühester Abschluss aller Aufgaben?",
      "Task A takes 4 minutes. Then B (3 minutes) and C (5 minutes) may start in parallel. D takes 2 minutes and starts only after both B and C. Earliest completion of all tasks?",
    ],
    [pair("11"), pair("14"), pair("9"), pair("7")],
    [
      "A endet bei Minute 4, B bei 7 und C bei 9. D beginnt bei 9 und endet bei 11.",
      "A ends at minute 4, B at 7 and C at 9. D starts at 9 and ends at 11.",
    ],
  ),
  choice(
    "logic",
    21,
    "hard",
    [
      "1000 Teile: zehn sind defekt. Ein Prüfer markiert alle defekten und genau 10 Prozent der 990 guten Teile. Ein markiertes Teil wird gleichverteilt ausgewählt. Wahrscheinlichkeit, dass es defekt ist?",
      "1000 parts: ten are defective. An inspector flags all defective parts and exactly 10 percent of the 990 good parts. A flagged part is selected uniformly at random. Probability it is defective?",
    ],
    [pair("10/109"), pair("1/10"), pair("1/100"), pair("9/10")],
    [
      "Markiert sind zehn defekte und 0,10×990=99 gute Teile. Von 109 markierten sind zehn defekt: 10/109, also ungefähr 9,17 Prozent.",
      "Ten defective and 0.10×990=99 good parts are flagged. Of 109 flagged parts, ten are defective: 10/109, or about 9.17 percent.",
    ],
  ),
  choice(
    "logic",
    22,
    "hard",
    [
      "100 Schalter sind aus. In Durchgang k wird jeder k-te Schalter umgelegt, für k = 1 bis 100. Wie viele Schalter sind danach an?",
      "100 switches are off. On pass k, every kth switch is toggled, for k = 1 to 100. How many switches are on at the end?",
    ],
    [pair("10"), pair("50"), pair("25"), pair("100")],
    [
      "Schalter n wird einmal je Teiler von n umgelegt. Nur Quadratzahlen haben ungerade viele Teiler. Von 1² bis 10² sind es zehn.",
      "Switch n is toggled once for each divisor of n. Only perfect squares have an odd number of divisors. From 1² to 10² there are ten.",
    ],
  ),
  choice(
    "logic",
    23,
    "hard",
    [
      "Welche Zahl teilt das Produkt n(n+1)(n+2) für jede positive ganze Zahl n sicher?",
      "Which number necessarily divides n(n+1)(n+2) for every positive integer n?",
    ],
    [pair("6"), pair("4"), pair("8"), pair("9")],
    [
      "Unter drei aufeinanderfolgenden Zahlen ist mindestens eine gerade und eine durch 3 teilbar. Also teilt 6 das Produkt. n=1 ergibt 6 und widerlegt 4, 8 und 9.",
      "Among three consecutive integers, at least one is even and one is divisible by 3. Hence 6 divides the product. n=1 gives 6, disproving 4, 8 and 9.",
    ],
  ),
  choice(
    "logic",
    24,
    "hard",
    [
      "In einer Gruppe sind 15 in A, 12 in B, 10 in C. In A∩B sind 6, A∩C 5, B∩C 4, in allen drei 2. Die Paarzahlen enthalten die Dreifachmitglieder. Wie viele sind in mindestens einer Gruppe?",
      "There are 15 members of A, 12 of B and 10 of C. A∩B has 6, A∩C 5, B∩C 4, and all three 2. Pair counts include triple members. How many belong to at least one group?",
    ],
    [pair("24"), pair("22"), pair("26"), pair("37")],
    [
      "Inklusion und Exklusion: 15 + 12 + 10 − 6 − 5 − 4 + 2 = 24.",
      "Inclusion and exclusion: 15 + 12 + 10 − 6 − 5 − 4 + 2 = 24.",
    ],
  ),
  choice(
    "logic",
    25,
    "hard",
    [
      "Vier Briefe werden auf vier unterschiedliche zugehörige Umschläge verteilt, einer pro Umschlag. In wie vielen Verteilungen landet kein Brief im richtigen Umschlag?",
      "Four letters are distributed among their four different matching envelopes, one per envelope. In how many distributions is no letter in the correct envelope?",
    ],
    [pair("9"), pair("6"), pair("12"), pair("8")],
    [
      "24 − 4×6 + 6×2 − 4×1 + 1 = 9. Man zieht Verteilungen mit richtigen Briefen ab und korrigiert die Mehrfachzählungen.",
      "24 − 4×6 + 6×2 − 4×1 + 1 = 9. Subtract arrangements with correct letters and correct the multiple counts.",
    ],
  ),
  choice(
    "logic",
    26,
    "hard",
    [
      "Drei faire sechsseitige Würfel werden unabhängig geworfen. Wie wahrscheinlich ist die Summe 7?",
      "Three fair six-sided dice are rolled independently. What is the probability of a total of 7?",
    ],
    [pair("5/72"), pair("1/12"), pair("1/18"), pair("7/216")],
    [
      "Die positiven Dreiergruppen mit Summe 7 sind Permutationen von (1,1,5), (1,2,4), (1,3,3), (2,2,3): 3+6+3+3=15. 15/216 = 5/72.",
      "Positive triples totalling 7 are permutations of (1,1,5), (1,2,4), (1,3,3), (2,2,3): 3+6+3+3=15. 15/216 = 5/72.",
    ],
  ),
  choice(
    "logic",
    27,
    "hard",
    [
      "Wie viele vierstellige Zahlen verwenden die Ziffern 1, 2, 3, 4 jeweils genau einmal und sind durch 4 teilbar?",
      "How many four-digit numbers use digits 1, 2, 3 and 4 exactly once each and are divisible by 4?",
    ],
    [pair("6"), pair("4"), pair("8"), pair("12")],
    [
      "Die letzten beiden Ziffern müssen 12, 24 oder 32 sein. Die übrigen zwei lassen sich jeweils in zwei Reihenfolgen anordnen: 3×2=6.",
      "The last two digits must be 12, 24 or 32. The remaining two have two orders each: 3×2=6.",
    ],
  ),
  choice(
    "logic",
    28,
    "hard",
    [
      "Ein Schlüssel liegt in genau einer Kiste A, B oder C. Genau eine Aufschrift stimmt. A: „In B“. B: „Nicht in B“. C: „Nicht in A“. Wo liegt der Schlüssel?",
      "A key is in exactly one box A, B or C. Exactly one label is true. A: “In B”. B: “Not in B”. C: “Not in A”. Where is the key?",
    ],
    [
      pair("A"),
      pair("B"),
      pair("C"),
      ["Nicht bestimmbar", "Cannot be determined"],
    ],
    [
      "Von A und B ist immer genau eine Aussage wahr. Also muss C falsch sein. „Nicht in A“ ist falsch, daher liegt der Schlüssel in A.",
      "Exactly one of A and B's statements is always true. Therefore C must be false. “Not in A” is false, so the key is in A.",
    ],
  ),
  choice(
    "logic",
    29,
    "hard",
    [
      "Von (0,0) nach (3,3) gehst du auf einem Gitter nur einen Schritt rechts oder oben. Wie viele kürzeste Wege vermeiden den Punkt (1,1)?",
      "From (0,0) to (3,3) you move on a grid only one step right or up. How many shortest paths avoid the point (1,1)?",
    ],
    [pair("8"), pair("12"), pair("14"), pair("16")],
    [
      "Es gibt 6 über 3 = 20 Wege insgesamt. Über (1,1) führen 2 Wege dorthin × 4 über 2 = 6 Wege weiter, also 12. 20−12=8.",
      "There are 6 choose 3 = 20 total paths. Through (1,1): 2 ways there × 4 choose 2 = 6 ways onward, giving 12. 20−12=8.",
    ],
  ),
  choice(
    "logic",
    30,
    "hard",
    [
      "Zufällig wird einer von zwei Beuteln gewählt. A enthält zwei rote Kugeln; B eine rote und eine blaue. Eine zufällig gezogene Kugel ist rot. Wie wahrscheinlich wurde A gewählt?",
      "One of two bags is chosen at random. A contains two red balls; B one red and one blue. A randomly drawn ball is red. What is the probability A was chosen?",
    ],
    [pair("2/3"), pair("1/2"), pair("1/3"), pair("3/4")],
    [
      "Die vier gleich wahrscheinlichen Möglichkeiten sind A-rot1, A-rot2, B-rot und B-blau. Von den drei roten Möglichkeiten gehören zwei zu A.",
      "The four equally likely possibilities are A-red1, A-red2, B-red and B-blue. Of the three red possibilities, two belong to A.",
    ],
  ),
];

const estimateQuestions: Question[] = [
  estimate(
    1,
    "easy",
    [
      "Wie viele Tasten hat ein Standardklavier mit vollständiger moderner Tastatur?",
      "How many keys does a standard piano with a full modern keyboard have?",
    ],
    88,
    ["Tasten", "keys"],
    [
      "Die Standardtastatur hat 52 weiße und 36 schwarze Tasten: 88 insgesamt.",
      "The standard keyboard has 52 white and 36 black keys: 88 in total.",
    ],
    "https://www.steinway.com/dam/jcr%3Ac94babcc-fa76-4b8c-b1a6-8e8dac935aac/Steinway%20%26%20Sons%20Buyers%20Guide.pdf",
  ),
  estimate(
    2,
    "easy",
    [
      "Wie viele Elemente umfasst das Periodensystem bis einschließlich der 2016 von der IUPAC vervollständigten siebten Periode?",
      "How many elements are in the periodic table up to and including its seventh period, completed by IUPAC in 2016?",
    ],
    118,
    ["Elemente", "elements"],
    [
      "2016 wurden die Namen der Elemente 113, 115, 117 und 118 bestätigt. Damit umfasst die Tabelle bis zum Ende der siebten Periode 118 Elemente.",
      "In 2016 the names of elements 113, 115, 117 and 118 were confirmed. The table through the end of the seventh period therefore contains 118 elements.",
    ],
    "https://iupac.org/iupac-announces-the-names-of-the-elements-113-115-117-and-118/",
  ),
  estimate(
    3,
    "easy",
    [
      "Wie viele Chromosomen enthält eine typische menschliche Körperzelle mit vollständigem Chromosomensatz?",
      "How many chromosomes does a typical human body cell with a full chromosome complement contain?",
    ],
    46,
    ["Chromosomen", "chromosomes"],
    [
      "Der typische vollständige Satz besteht aus 23 Paaren, also 46 Chromosomen.",
      "The typical full complement consists of 23 pairs, or 46 chromosomes.",
    ],
    "https://www.genome.gov/about-genomics/fact-sheets/Chromosome-Abnormalities-Fact-Sheet",
  ),
  estimate(
    4,
    "easy",
    [
      "Wie viele Spieler darf eine Fußballmannschaft nach Regel 3 maximal gleichzeitig auf dem Feld haben, einschließlich Torwart?",
      "Under association football Law 3, how many players may one team have on the pitch at once, including the goalkeeper?",
    ],
    11,
    ["Spieler", "players"],
    [
      "Eine Mannschaft darf höchstens elf Spieler haben, darunter einen Torwart.",
      "A team may have at most eleven players, one of whom must be the goalkeeper.",
    ],
    "https://www.thefa.com/football-rules-governance/lawsandrules/laws/football-11-11/law-3---the-players",
  ),
  estimate(
    5,
    "easy",
    [
      "Ein Kartenset enthält vier Farben mit je 13 Karten und keine Joker. Wie viele Karten sind das?",
      "A card deck contains four suits of 13 cards each and no jokers. How many cards is that?",
    ],
    52,
    ["Karten", "cards"],
    [
      "Vier Farben mal 13 Karten ergeben 52 Karten.",
      "Four suits times 13 cards equals 52 cards.",
    ],
  ),
  estimate(
    6,
    "easy",
    [
      "Ein Würfel besitzt sechs Flächen. Jede wird in einem eigenen Schritt in vier gleich große Quadrate geteilt. Wie viele kleine Quadrate entstehen auf der Oberfläche?",
      "A cube has six faces. Each face is divided into four equal squares. How many small squares are on the surface?",
    ],
    24,
    ["Quadrate", "squares"],
    [
      "Sechs Flächen mit jeweils vier Quadraten ergeben 6×4=24.",
      "Six faces with four squares each give 6×4=24.",
    ],
  ),
  estimate(
    7,
    "easy",
    [
      "Ein Park hat ein Raster von fünf Reihen und acht Spalten mit je einem Baum pro Platz. Wie viele Bäume stehen dort?",
      "A park has a grid of five rows and eight columns, with one tree at each position. How many trees are there?",
    ],
    40,
    ["Bäume", "trees"],
    [
      "Jede der fünf Reihen enthält acht Bäume: 5×8=40.",
      "Each of five rows contains eight trees: 5×8=40.",
    ],
  ),
  estimate(
    8,
    "easy",
    [
      "Eine Gruppe bestellt sechs Pizzen. Jede wird in acht Stücke geteilt. Wie viele Stücke gibt es insgesamt?",
      "A group orders six pizzas. Each is cut into eight slices. How many slices are there in total?",
    ],
    48,
    ["Stücke", "slices"],
    ["6×8=48 Stücke.", "6×8=48 slices."],
  ),
  estimate(
    9,
    "easy",
    [
      "Ein Turnier mit 16 Mannschaften ist ein einfaches K.-o.-Turnier ohne Spiel um Platz drei. Wie viele Spiele braucht es bis zum Sieger?",
      "A tournament with 16 teams uses single elimination with no third-place match. How many matches are needed to find the winner?",
    ],
    15,
    ["Spiele", "matches"],
    [
      "Jedes Spiel scheidet genau eine Mannschaft aus. Für einen Sieger müssen 15 der 16 Mannschaften ausscheiden.",
      "Each match eliminates exactly one team. To leave one winner, 15 of the 16 teams must be eliminated.",
    ],
  ),
  estimate(
    10,
    "easy",
    [
      "Ein Schloss hat drei unabhängige Räder mit den Ziffern 0 bis 9. Führende Nullen sind erlaubt. Wie viele Codes gibt es?",
      "A lock has three independent wheels with digits 0 to 9. Leading zeros are allowed. How many codes are there?",
    ],
    1000,
    ["Codes", "codes"],
    [
      "Für jedes Rad gibt es zehn Möglichkeiten: 10³=1000.",
      "Each wheel has ten possibilities: 10³=1000.",
    ],
  ),
  estimate(
    11,
    "medium",
    [
      "Wie viele Kilometer legt Licht im Vakuum in genau einer Sekunde zurück?",
      "How many kilometres does light in a vacuum travel in exactly one second?",
    ],
    299792.458,
    ["Kilometer", "kilometres"],
    [
      "Die definierte Geschwindigkeit beträgt 299792458 Meter pro Sekunde. Durch 1000 geteilt sind das 299792,458 Kilometer.",
      "The defined speed is 299792458 metres per second. Dividing by 1000 gives 299792.458 kilometres.",
    ],
    "https://www.bipm.org/en/si-base-units/metre",
  ),
  estimate(
    12,
    "medium",
    [
      "Wie viele Strahlungsperioden des definierten Cäsium-133-Übergangs entsprechen exakt einer SI-Sekunde?",
      "How many radiation periods of the defined caesium-133 transition correspond to exactly one SI second?",
    ],
    9192631770,
    ["Perioden", "periods"],
    [
      "Die SI-Definition legt die Frequenz dieses Übergangs auf exakt 9192631770 Hertz fest.",
      "The SI definition fixes the frequency of this transition at exactly 9192631770 hertz.",
    ],
    "https://www.bipm.org/en/si-base-units/second",
  ),
  estimate(
    13,
    "medium",
    [
      "30 Personen begrüßen sich. Jede begrüßt jede andere genau einmal per Handschlag. Wie viele Handschläge gibt es?",
      "30 people greet each other. Every person shakes every other person's hand exactly once. How many handshakes are there?",
    ],
    435,
    ["Handschläge", "handshakes"],
    [
      "30×29 zählt jedes Paar zweimal. 30×29/2=435.",
      "30×29 counts every pair twice. 30×29/2=435.",
    ],
  ),
  estimate(
    14,
    "medium",
    [
      "Ein digitales Foto ist 4000×3000 Pixel groß. Für jedes Pixel werden exakt drei Bytes gespeichert, ohne Kompression oder weitere Daten. Wie viele Bytes benötigt es?",
      "A digital image is 4000×3000 pixels. Exactly three bytes are stored per pixel, with no compression or other data. How many bytes does it require?",
    ],
    36000000,
    ["Bytes", "bytes"],
    [
      "4000×3000=12000000 Pixel. Mal drei Bytes ergibt 36000000 Bytes.",
      "4000×3000=12000000 pixels. Times three bytes gives 36000000 bytes.",
    ],
  ),
  estimate(
    15,
    "medium",
    [
      "20 Mannschaften spielen eine Liga. Jede spielt gegen jede andere einmal zu Hause und einmal auswärts. Wie viele Spiele umfasst die Saison?",
      "20 teams play a league. Each plays every other team once at home and once away. How many matches are in the season?",
    ],
    380,
    ["Spiele", "matches"],
    [
      "20×19/2=190 Paarungen. Jede Paarung wird zweimal gespielt: 380 Spiele.",
      "20×19/2=190 pairings. Each pairing plays twice: 380 matches.",
    ],
  ),
  estimate(
    16,
    "medium",
    [
      "Wie lang ist eine Astronomische Einheit (AE) nach der exakten Definition von 2012 in Kilometern?",
      "How long is one astronomical unit (au) in kilometres under its exact 2012 definition?",
    ],
    149597870.7,
    ["Kilometer", "kilometres"],
    [
      "Die IAU definiert eine AE als exakt 149597870700 Meter. Das sind 149597870,7 Kilometer.",
      "The IAU defines one au as exactly 149597870700 metres. That is 149597870.7 kilometres.",
    ],
    "https://iauarchive.eso.org/public/themes/measuring/",
  ),
  estimate(
    17,
    "medium",
    [
      "Wie groß ist der mittlere Radius des Erdmondes laut NASA ungefähr in Kilometern?",
      "According to NASA, approximately how large is the mean radius of Earth's Moon in kilometres?",
    ],
    1737.4,
    ["Kilometer", "kilometres"],
    [
      "Die NASA nennt einen mittleren Radius von 1737,4 Kilometern. Gefragt ist der Radius, nicht der etwa doppelt so große Durchmesser.",
      "NASA lists a mean radius of 1737.4 kilometres. The question asks for the radius, not the diameter, which is about twice as large.",
    ],
    "https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html",
  ),
  estimate(
    18,
    "medium",
    [
      "Ein Rätsel erlaubt jedes Teilset von zehn verschiedenen Hinweiskarten, einschließlich des leeren Sets. Wie viele unterschiedliche Teilsets gibt es?",
      "A puzzle allows every subset of ten different clue cards, including the empty subset. How many different subsets are there?",
    ],
    1024,
    ["Teilsets", "subsets"],
    [
      "Jede Karte kann dabei sein oder fehlen. Zehn unabhängige Entscheidungen ergeben 2¹⁰=1024.",
      "Each card can be included or omitted. Ten independent decisions give 2¹⁰=1024.",
    ],
  ),
  estimate(
    19,
    "medium",
    [
      "Ein Spaziergang legt exakt 1,25 Meter pro Schritt zurück. Wie viele Schritte ergeben zehn Kilometer?",
      "A walk covers exactly 1.25 metres per step. How many steps make ten kilometres?",
    ],
    8000,
    ["Schritte", "steps"],
    [
      "Zehn Kilometer sind 10000 Meter. 10000/1,25=8000 Schritte.",
      "Ten kilometres is 10000 metres. 10000/1.25=8000 steps.",
    ],
  ),
  estimate(
    20,
    "medium",
    [
      "Eine Werkstatt verbraucht konstant 2,4 Kilowatt. Wie viele Kilowattstunden Energie braucht sie in fünf Tagen mit jeweils acht Betriebsstunden?",
      "A workshop draws a constant 2.4 kilowatts. How many kilowatt-hours of energy does it use over five days of eight operating hours each?",
    ],
    96,
    ["Kilowattstunden", "kilowatt-hours"],
    [
      "Fünfmal acht sind 40 Stunden. 2,4 Kilowatt×40 Stunden=96 Kilowattstunden.",
      "Five times eight is 40 hours. 2.4 kilowatts×40 hours=96 kilowatt-hours.",
    ],
  ),
  estimate(
    21,
    "hard",
    [
      "Aus 52 verschiedenen Karten werden fünf ausgewählt. Die Reihenfolge zählt nicht. Wie viele verschiedene Fünferhände gibt es?",
      "Five cards are selected from 52 different cards. Order does not matter. How many different five-card hands are there?",
    ],
    2598960,
    ["Hände", "hands"],
    [
      "52 über 5 = (52×51×50×49×48)/(5×4×3×2×1)=2598960.",
      "52 choose 5 = (52×51×50×49×48)/(5×4×3×2×1)=2598960.",
    ],
  ),
  estimate(
    22,
    "hard",
    [
      "Auf einem Gitter geht man von (0,0) nach (10,10) nur rechts oder oben, jeweils einen Schritt. Wie viele kürzeste Wege gibt es?",
      "On a grid, travel from (0,0) to (10,10) using only one-step moves right or up. How many shortest paths are there?",
    ],
    184756,
    ["Wege", "paths"],
    [
      "Jeder Weg hat 20 Schritte, davon zehn nach rechts. Die zehn Positionen werden aus 20 gewählt: 20 über 10 = 184756.",
      "Each path has 20 steps, ten of them right. Choose the ten positions out of 20: 20 choose 10 = 184756.",
    ],
  ),
  estimate(
    23,
    "hard",
    [
      "Ein binärer Nachrichtenblock hat genau 20 Stellen. Jede ist unabhängig 0 oder 1. Wie viele verschiedene Blöcke sind möglich?",
      "A binary message block has exactly 20 positions. Each is independently 0 or 1. How many different blocks are possible?",
    ],
    1048576,
    ["Blöcke", "blocks"],
    [
      "Zwei Möglichkeiten pro Stelle ergeben 2²⁰=1048576.",
      "Two possibilities per position give 2²⁰=1048576.",
    ],
  ),
  estimate(
    24,
    "hard",
    [
      "Sieben unterschiedliche Bücher sollen in einer Reihe stehen. Zwei bestimmte Bücher müssen direkt nebeneinander stehen, in beliebiger Reihenfolge. Wie viele Anordnungen gibt es?",
      "Seven different books stand in a row. Two specified books must be adjacent, in either order. How many arrangements are there?",
    ],
    1440,
    ["Anordnungen", "arrangements"],
    [
      "Die zwei Bücher bilden einen Block. Sechs Objekte lassen sich in 6!=720 Reihenfolgen stellen; der Block hat zwei Reihenfolgen. 720×2=1440.",
      "The two books form a block. Six objects have 6!=720 orders; the block has two internal orders. 720×2=1440.",
    ],
  ),
  estimate(
    25,
    "hard",
    [
      "Wie viele unterschiedliche Buchstabenfolgen lassen sich durch Umordnen aller sechs Buchstaben von BANANA bilden? Gleiche Buchstaben sind ununterscheidbar.",
      "How many different letter sequences can be formed by rearranging all six letters of BANANA? Identical letters are indistinguishable.",
    ],
    60,
    ["Folgen", "sequences"],
    [
      "Es gibt drei A und zwei N. 6!/(3!×2!)=720/12=60.",
      "There are three As and two Ns. 6!/(3!×2!)=720/12=60.",
    ],
  ),
  estimate(
    26,
    "hard",
    [
      "Zwölf verschiedene Personen werden in zwei unbenannte Teams mit je sechs Personen aufgeteilt. Wie viele Aufteilungen gibt es?",
      "Twelve different people are divided into two unlabelled teams of six. How many divisions are there?",
    ],
    462,
    ["Aufteilungen", "divisions"],
    [
      "12 über 6 = 924 wählt ein Team. Da beide Teams unbenannt sind, wird jede Aufteilung doppelt gezählt: 924/2=462.",
      "12 choose 6 = 924 selects one team. Since the teams are unlabelled, every division was counted twice: 924/2=462.",
    ],
  ),
  estimate(
    27,
    "hard",
    [
      "Ein vierstelliger Code verwendet Ziffern von 0 bis 9 ohne Wiederholung; führende Nullen sind erlaubt. Wie viele Codes enthalten die Ziffer 7?",
      "A four-digit code uses digits 0 to 9 without repetition; leading zeros are allowed. How many codes contain digit 7?",
    ],
    2016,
    ["Codes", "codes"],
    [
      "Die 7 hat vier mögliche Plätze. Die anderen Plätze erhalten 9×8×7 Möglichkeiten: 4×9×8×7=2016.",
      "Digit 7 has four possible positions. The others have 9×8×7 possibilities: 4×9×8×7=2016.",
    ],
  ),
  estimate(
    28,
    "hard",
    [
      "Ein Binärbaum hat zehn Ebenen unter seiner Wurzel. Jeder innere Knoten hat genau zwei Kinder, und alle Blätter liegen auf der zehnten Ebene. Wie viele Knoten enthält er einschließlich der Wurzel?",
      "A binary tree has ten levels below its root. Every internal node has exactly two children, and every leaf is on the tenth level. How many nodes does it contain including the root?",
    ],
    2047,
    ["Knoten", "nodes"],
    [
      "Die Ebenen enthalten 1,2,4,…,1024 Knoten. Die Summe ist 2¹¹−1=2047.",
      "The levels contain 1,2,4,…,1024 nodes. Their sum is 2¹¹−1=2047.",
    ],
  ),
  estimate(
    29,
    "hard",
    [
      "Eine Pizza wird mit sechs geraden Schnitten zerteilt. Jeder neue Schnitt kreuzt alle vorherigen im Inneren, und nie treffen sich drei Schnitte in einem Punkt. Wie viele Stücke entstehen?",
      "A pizza is cut with six straight cuts. Each new cut intersects all previous cuts inside, and no three meet at a point. How many pieces result?",
    ],
    22,
    ["Stücke", "pieces"],
    [
      "Die Schnitte fügen 1,2,3,4,5 und 6 Stücke hinzu. Zum ursprünglichen Stück kommen 21: insgesamt 22.",
      "The cuts add 1,2,3,4,5 and 6 pieces. Add 21 to the original piece: 22 total.",
    ],
  ),
  estimate(
    30,
    "hard",
    [
      "In einer Stadt sind Straßen ein Raster. Zwischen zwei Ecken braucht jeder kürzeste Weg genau sechs Ost- und vier Nordschritte. Wie viele davon beginnen mit einem Ostschritt und enden mit einem Nordschritt?",
      "A city's streets form a grid. Every shortest route between two corners takes exactly six east and four north steps. How many begin east and end north?",
    ],
    56,
    ["Wege", "paths"],
    [
      "Nach Festlegen des ersten und letzten Schritts bleiben fünf Ost- und drei Nordschritte. Ihre Reihenfolge hat 8 über 3 = 56 Möglichkeiten.",
      "After fixing the first and last steps, five east and three north steps remain. Their order has 8 choose 3 = 56 possibilities.",
    ],
  ),
];

export const knowledgeBank: Record<
  "trivia" | "logic" | "estimate",
  Question[]
> = {
  trivia,
  logic,
  estimate: estimateQuestions,
};
