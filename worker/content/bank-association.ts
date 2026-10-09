import type { Difficulty, Question } from "../../shared/types";

type Word = [string, string];
type Theme = { hint: Word; words: Word[] };
type Board = {
  seed: number;
  difficulty: Difficulty;
  green: Theme;
  purple: Theme;
  neutral: Word[];
};
const t = ([de, en]: Word) => ({ de, en });
const theme = (hint: Word, ...words: Word[]): Theme => ({ hint, words });

const easy: Theme[] = [
  theme(["Obst", "Fruit"], ["Apfel", "apple"], ["Birne", "pear"]),
  theme(["Möbel", "Furniture"], ["Tisch", "table"], ["Stuhl", "chair"]),
  theme(["Meer", "Ocean"], ["Welle", "wave"], ["Koralle", "coral"]),
  theme(["Bäckerei", "Bakery"], ["Brot", "bread"], ["Croissant", "croissant"]),
  theme(["Werkstatt", "Workshop"], ["Hammer", "hammer"], ["Säge", "saw"]),
  theme(["Kleidung", "Clothing"], ["Schal", "scarf"], ["Jacke", "jacket"]),
  theme(["Winter", "Winter"], ["Schnee", "snow"], ["Schlitten", "sled"]),
  theme(["Verkehr", "Traffic"], ["Auto", "car"], ["Bus", "bus"]),
  theme(["Musik", "Music"], ["Trommel", "drum"], ["Gitarre", "guitar"]),
  theme(
    ["Garten", "Garden"],
    ["Gießkanne", "watering can"],
    ["Blumentopf", "flowerpot"],
  ),
  theme(["Schlafen", "Sleep"], ["Kissen", "pillow"], ["Bettdecke", "duvet"]),
  theme(
    ["Küche", "Kitchen"],
    ["Kochtopf", "saucepan"],
    ["Pfanne", "frying pan"],
  ),
  theme(
    ["Schule", "School"],
    ["Schultafel", "chalkboard"],
    ["Schulheft", "exercise book"],
  ),
  theme(
    ["Fußball", "Soccer"],
    ["Fußballtor", "soccer goal"],
    ["Fußballschuh", "soccer boot"],
  ),
  theme(
    ["Baustelle", "Construction"],
    ["Kran", "crane"],
    ["Bagger", "excavator"],
  ),
  theme(["Wald", "Forest"], ["Tanne", "fir tree"], ["Reh", "roe deer"]),
  theme(["Haustiere", "Pets"], ["Hund", "dog"], ["Katze", "cat"]),
  theme(
    ["Raumfahrt", "Spaceflight"],
    ["Rakete", "rocket"],
    ["Astronaut", "astronaut"],
  ),
  theme(["Spielzeug", "Toys"], ["Puzzle", "jigsaw puzzle"], ["Jo-Jo", "yo-yo"]),
  theme(["Frühstück", "Breakfast"], ["Toast", "toast"], ["Müsli", "muesli"]),
  theme(
    ["Strand", "Beach"],
    ["Muschel", "seashell"],
    ["Sonnenschirm", "beach umbrella"],
  ),
  theme(
    ["Badezimmer", "Bathroom"],
    ["Badewanne", "bathtub"],
    ["Zahnbürste", "toothbrush"],
  ),
];

const boards: Board[] = [
  {
    seed: 0x84e3a1b7,
    difficulty: "easy",
    green: easy[0],
    purple: easy[7],
    neutral: [
      ["Krone", "crown"],
      ["Magnet", "magnet"],
    ],
  },
  {
    seed: 0xb1c67429,
    difficulty: "easy",
    green: easy[1],
    purple: easy[8],
    neutral: [
      ["Vulkan", "volcano"],
      ["Briefmarke", "postage stamp"],
    ],
  },
  {
    seed: 0x6fa295d3,
    difficulty: "easy",
    green: easy[2],
    purple: easy[9],
    neutral: [
      ["Fernbedienung", "remote control"],
      ["Schachfigur", "chess piece"],
    ],
  },
  {
    seed: 0xd7358bc1,
    difficulty: "easy",
    green: easy[3],
    purple: easy[10],
    neutral: [
      ["Kompass", "compass"],
      ["Diamant", "diamond"],
    ],
  },
  {
    seed: 0x297bc4e5,
    difficulty: "easy",
    green: easy[4],
    purple: easy[5],
    neutral: [
      ["Wolke", "cloud"],
      ["Seestern", "starfish"],
    ],
  },
  {
    seed: 0xea41963d,
    difficulty: "easy",
    green: easy[5],
    purple: easy[12],
    neutral: [
      ["Pyramide", "pyramid"],
      ["Anker", "anchor"],
    ],
  },
  {
    seed: 0x5c9ad721,
    difficulty: "easy",
    green: easy[6],
    purple: easy[11],
    neutral: [
      ["Diamant", "diamond"],
      ["Briefumschlag", "envelope"],
    ],
  },
  {
    seed: 0x93bd6f47,
    difficulty: "easy",
    green: easy[7],
    purple: easy[10],
    neutral: [
      ["Koralle", "coral"],
      ["Mikroskop", "microscope"],
    ],
  },
  {
    seed: 0x4f728ab9,
    difficulty: "easy",
    green: easy[8],
    purple: easy[16],
    neutral: [
      ["Magnet", "magnet"],
      ["Sanduhr", "hourglass"],
    ],
  },
  {
    seed: 0xc83e5197,
    difficulty: "easy",
    green: easy[9],
    purple: easy[17],
    neutral: [
      ["Schachfigur", "chess piece"],
      ["Briefmarke", "postage stamp"],
    ],
  },
  {
    seed: 0x76a8d35b,
    difficulty: "easy",
    green: easy[10],
    purple: easy[18],
    neutral: [
      ["Kompass", "compass"],
      ["Seestern", "starfish"],
    ],
  },
  {
    seed: 0xa9254ec3,
    difficulty: "easy",
    green: easy[11],
    purple: easy[13],
    neutral: [
      ["Krone", "crown"],
      ["Fossil", "fossil"],
    ],
  },
  {
    seed: 0x3db6c879,
    difficulty: "easy",
    green: easy[12],
    purple: easy[14],
    neutral: [
      ["Koralle", "coral"],
      ["Ballettschuh", "ballet shoe"],
    ],
  },
  {
    seed: 0xf2497a65,
    difficulty: "easy",
    green: easy[13],
    purple: easy[15],
    neutral: [
      ["Diamant", "diamond"],
      ["Briefumschlag", "envelope"],
    ],
  },
  {
    seed: 0x68d3b19f,
    difficulty: "easy",
    green: easy[14],
    purple: easy[19],
    neutral: [
      ["Schachfigur", "chess piece"],
      ["Seestern", "starfish"],
    ],
  },
  {
    seed: 0xbd5714e9,
    difficulty: "easy",
    green: easy[15],
    purple: easy[21],
    neutral: [
      ["Satellit", "satellite"],
      ["Magnet", "magnet"],
    ],
  },
  {
    seed: 0x25af9837,
    difficulty: "easy",
    green: easy[16],
    purple: easy[20],
    neutral: [
      ["Sanduhr", "hourglass"],
      ["Briefmarke", "postage stamp"],
    ],
  },
  {
    seed: 0xe6943b8d,
    difficulty: "easy",
    green: easy[17],
    purple: easy[3],
    neutral: [
      ["Zahnbürste", "toothbrush"],
      ["Schachfigur", "chess piece"],
    ],
  },
  {
    seed: 0x79c125ab,
    difficulty: "easy",
    green: easy[18],
    purple: easy[1],
    neutral: [
      ["Koralle", "coral"],
      ["Fossil", "fossil"],
    ],
  },
  {
    seed: 0xa47e6d39,
    difficulty: "easy",
    green: easy[19],
    purple: easy[2],
    neutral: [
      ["Krone", "crown"],
      ["Fernbedienung", "remote control"],
    ],
  },
  {
    seed: 0x51b8e7c5,
    difficulty: "easy",
    green: easy[20],
    purple: easy[4],
    neutral: [
      ["Briefmarke", "postage stamp"],
      ["Sanduhr", "hourglass"],
    ],
  },
  {
    seed: 0xce362d91,
    difficulty: "easy",
    green: easy[21],
    purple: easy[6],
    neutral: [
      ["Kompass", "compass"],
      ["Diamant", "diamond"],
    ],
  },

  {
    seed: 0x9b2c7e45,
    difficulty: "medium",
    green: theme(
      ["Obst", "Fruit"],
      ["Apfel", "apple"],
      ["Birne", "pear"],
      ["Pfirsich", "peach"],
    ),
    purple: theme(
      ["Büro", "Office"],
      ["Drucker", "printer"],
      ["Tastatur", "keyboard"],
      ["Hefter", "stapler"],
    ),
    neutral: [
      ["Anker", "anchor"],
      ["Schlitten", "sled"],
      ["Fossil", "fossil"],
    ],
  },
  {
    seed: 0x4ad961b7,
    difficulty: "medium",
    green: theme(
      ["Meer", "Ocean"],
      ["Hai", "shark"],
      ["Krake", "octopus"],
      ["Delfin", "dolphin"],
    ),
    purple: theme(
      ["Backen", "Baking"],
      ["Mehl", "flour"],
      ["Hefe", "yeast"],
      ["Brot", "bread"],
    ),
    neutral: [
      ["Magnet", "magnet"],
      ["Krone", "crown"],
      ["Kissen", "pillow"],
    ],
  },
  {
    seed: 0xd1825f6b,
    difficulty: "medium",
    green: theme(
      ["Winter", "Winter"],
      ["Eiszapfen", "icicle"],
      ["Schlitten", "sled"],
      ["Fäustling", "mitten"],
    ),
    purple: theme(
      ["Musik", "Music"],
      ["Geige", "violin"],
      ["Trommel", "drum"],
      ["Flöte", "flute"],
    ),
    neutral: [
      ["Briefmarke", "postage stamp"],
      ["Anker", "anchor"],
      ["Mikroskop", "microscope"],
    ],
  },
  {
    seed: 0x37e6a49d,
    difficulty: "medium",
    green: theme(
      ["Baustelle", "Construction"],
      ["Kran", "crane"],
      ["Bagger", "excavator"],
      ["Schutzhelm", "hard hat"],
    ),
    purple: theme(
      ["Schmuck", "Jewellery"],
      ["Ring", "ring"],
      ["Halskette", "necklace"],
      ["Armband", "bracelet"],
    ),
    neutral: [
      ["Zahnbürste", "toothbrush"],
      ["Sanduhr", "hourglass"],
      ["Koralle", "coral"],
    ],
  },
  {
    seed: 0xaf5832c1,
    difficulty: "medium",
    green: theme(
      ["Labor", "Laboratory"],
      ["Mikroskop", "microscope"],
      ["Becherglas", "beaker"],
      ["Pipette", "pipette"],
    ),
    purple: theme(
      ["Post", "Mail"],
      ["Briefmarke", "postage stamp"],
      ["Briefumschlag", "envelope"],
      ["Briefkasten", "mailbox"],
    ),
    neutral: [
      ["Gitarre", "guitar"],
      ["Sattel", "saddle"],
      ["Seestern", "starfish"],
    ],
  },
  {
    seed: 0x628fb75d,
    difficulty: "medium",
    green: theme(
      ["Burg", "Castle"],
      ["Zinne", "battlement"],
      ["Zugbrücke", "drawbridge"],
      ["Ritter", "knight"],
    ),
    purple: theme(
      ["Frühstück", "Breakfast"],
      ["Toast", "toast"],
      ["Frühstücksei", "breakfast egg"],
      ["Müsli", "muesli"],
    ),
    neutral: [
      ["Mikroskop", "microscope"],
      ["Blumentopf", "flowerpot"],
      ["Fernbedienung", "remote control"],
    ],
  },
  {
    seed: 0xc9451ed3,
    difficulty: "medium",
    green: theme(
      ["Schule", "School"],
      ["Schultafel", "chalkboard"],
      ["Schulheft", "exercise book"],
      ["Bleistift", "pencil"],
    ),
    purple: theme(
      ["Reiten", "Riding"],
      ["Sattel", "saddle"],
      ["Zügel", "reins"],
      ["Hufeisen", "horseshoe"],
    ),
    neutral: [
      ["Koralle", "coral"],
      ["Diamant", "diamond"],
      ["Pfanne", "frying pan"],
    ],
  },
  {
    seed: 0x5e17a8f9,
    difficulty: "medium",
    green: theme(
      ["Fliegen", "Flight"],
      ["Flugdrachen", "kite"],
      ["Segelflugzeug", "glider"],
      ["Heißluftballon", "hot air balloon"],
    ),
    purple: theme(
      ["Medizin", "Medicine"],
      ["Verband", "bandage"],
      ["Fieberthermometer", "clinical thermometer"],
      ["Stethoskop", "stethoscope"],
    ),
    neutral: [
      ["Krone", "crown"],
      ["Briefmarke", "postage stamp"],
      ["Kissen", "pillow"],
    ],
  },
  {
    seed: 0xe8b46235,
    difficulty: "medium",
    green: theme(
      ["Reisen", "Travel"],
      ["Koffer", "suitcase"],
      ["Reisepass", "passport"],
      ["Fahrkarte", "travel ticket"],
    ),
    purple: theme(
      ["Garten", "Garden"],
      ["Gießkanne", "watering can"],
      ["Blumentopf", "flowerpot"],
      ["Samen", "seed"],
    ),
    neutral: [
      ["Mikroskop", "microscope"],
      ["Hefter", "stapler"],
      ["Trommel", "drum"],
    ],
  },
  {
    seed: 0x2c9d753b,
    difficulty: "medium",
    green: theme(
      ["Theater", "Theatre"],
      ["Schauspieler", "actor"],
      ["Bühnenvorhang", "stage curtain"],
      ["Scheinwerfer", "spotlight"],
    ),
    purple: theme(
      ["Nähen", "Sewing"],
      ["Nähnadel", "sewing needle"],
      ["Nähgarn", "sewing thread"],
      ["Fingerhut", "thimble"],
    ),
    neutral: [
      ["Anker", "anchor"],
      ["Delfin", "dolphin"],
      ["Magnet", "magnet"],
    ],
  },

  {
    seed: 0xb7349e21,
    difficulty: "hard",
    green: theme(
      ["Navigation", "Navigation"],
      ["Kompass", "compass"],
      ["Landkarte", "map"],
      ["Leuchtturm", "lighthouse"],
      ["Polarstern", "North Star"],
    ),
    purple: theme(
      ["Schutz", "Protection"],
      ["Helm", "helmet"],
      ["Schild", "shield"],
      ["Vorhängeschloss", "padlock"],
      ["Regenschirm", "rain umbrella"],
    ),
    neutral: [
      ["Banane", "banana"],
      ["Klavier", "piano"],
      ["Pipette", "pipette"],
      ["Würfel", "die"],
    ],
  },
  {
    seed: 0x47c2da95,
    difficulty: "hard",
    green: theme(
      ["Drehung", "Rotation"],
      ["Rad", "wheel"],
      ["Windmühle", "windmill"],
      ["Schallplatte", "vinyl record"],
      ["Kreisel", "spinning top"],
    ),
    purple: theme(
      ["Wärme", "Warmth"],
      ["Kamin", "fireplace"],
      ["Schal", "scarf"],
      ["Wärmflasche", "hot-water bottle"],
      ["Wolldecke", "wool blanket"],
    ),
    neutral: [
      ["Diamant", "diamond"],
      ["Briefumschlag", "envelope"],
      ["Koralle", "coral"],
      ["Reisepass", "passport"],
    ],
  },
  {
    seed: 0xda681f37,
    difficulty: "hard",
    green: theme(
      ["Verbindung", "Connection"],
      ["Brücke", "bridge"],
      ["Stecker", "plug"],
      ["Knoten", "knot"],
      ["Reißverschluss", "zipper"],
    ),
    purple: theme(
      ["Zeit", "Time"],
      ["Armbanduhr", "wristwatch"],
      ["Sonnenuhr", "sundial"],
      ["Sanduhr", "hourglass"],
      ["Kalender", "calendar"],
    ),
    neutral: [
      ["Birne", "pear"],
      ["Hai", "shark"],
      ["Pipette", "pipette"],
      ["Schutzhelm", "hard hat"],
    ],
  },
  {
    seed: 0x69b54ca3,
    difficulty: "hard",
    green: theme(
      ["Speicher", "Storage"],
      ["Batterie", "battery"],
      ["Bücherregal", "bookshelf"],
      ["Kühlschrank", "refrigerator"],
      ["Rucksack", "backpack"],
    ),
    purple: theme(
      ["Rhythmus", "Rhythm"],
      ["Metronom", "metronome"],
      ["Trommel", "drum"],
      ["Herzschlag", "heartbeat"],
      ["Pendel", "pendulum"],
    ),
    neutral: [
      ["Koralle", "coral"],
      ["Diamant", "diamond"],
      ["Regenschirm", "rain umbrella"],
      ["Kompass", "compass"],
    ],
  },
  {
    seed: 0xec3718b9,
    difficulty: "hard",
    green: theme(
      ["Grenze", "Boundary"],
      ["Zaun", "fence"],
      ["Küste", "coast"],
      ["Türschwelle", "doorstep"],
      ["Grenzstein", "boundary stone"],
    ),
    purple: theme(
      ["Signal", "Signal"],
      ["Warnleuchte", "warning light"],
      ["Glocke", "bell"],
      ["Flagge", "flag"],
      ["Ampel", "traffic light"],
    ),
    neutral: [
      ["Croissant", "croissant"],
      ["Mikroskop", "microscope"],
      ["Wärmflasche", "hot-water bottle"],
      ["Marionette", "marionette"],
    ],
  },
  {
    seed: 0x356e92d7,
    difficulty: "hard",
    green: theme(
      ["Transport", "Transport"],
      ["Förderband", "conveyor belt"],
      ["Kamel", "camel"],
      ["Boot", "boat"],
      ["Schubkarre", "wheelbarrow"],
    ),
    purple: theme(
      ["Verbergen", "Concealment"],
      ["Tarnmuster", "camouflage pattern"],
      ["Vorhang", "curtain"],
      ["Versteckhöhle", "hideout cave"],
      ["Tresor", "safe"],
    ),
    neutral: [
      ["Metronom", "metronome"],
      ["Geige", "violin"],
      ["Fieberthermometer", "clinical thermometer"],
      ["Zahnbürste", "toothbrush"],
    ],
  },
  {
    seed: 0xa81d674f,
    difficulty: "hard",
    green: theme(
      ["Gleichgewicht", "Balance"],
      ["Wippe", "seesaw"],
      ["Hochseil", "tightrope"],
      ["Waage", "scales"],
      ["Einbeinstand", "one-legged stance"],
    ),
    purple: theme(
      ["Erforschen", "Exploration"],
      ["Teleskop", "telescope"],
      ["Lupe", "magnifying glass"],
      ["Satellit", "satellite"],
      ["Mikroskop", "microscope"],
    ),
    neutral: [
      ["Croissant", "croissant"],
      ["Schal", "scarf"],
      ["Nähgarn", "sewing thread"],
      ["Briefumschlag", "envelope"],
    ],
  },
  {
    seed: 0x72f349ad,
    difficulty: "hard",
    green: theme(
      ["Theater", "Theatre"],
      ["Bühnenvorhang", "stage curtain"],
      ["Theatermaske", "theatre mask"],
      ["Scheinwerfer", "spotlight"],
      ["Marionette", "marionette"],
    ),
    purple: theme(
      ["Rettung", "Rescue"],
      ["Rettungsboot", "lifeboat"],
      ["Rettungsring", "lifebuoy"],
      ["Rettungshubschrauber", "rescue helicopter"],
      ["Rettungsseil", "rescue rope"],
    ),
    neutral: [
      ["Pfirsich", "peach"],
      ["Gießkanne", "watering can"],
      ["Schallplatte", "vinyl record"],
      ["Bleistift", "pencil"],
    ],
  },
  {
    seed: 0xc59a2e63,
    difficulty: "hard",
    green: theme(
      ["Schatz", "Treasure"],
      ["Pirat", "pirate"],
      ["Truhe", "chest"],
      ["Diamant", "diamond"],
      ["Schatzkarte", "treasure map"],
    ),
    purple: theme(
      ["Nacht", "Night"],
      ["Eule", "owl"],
      ["Mond", "moon"],
      ["Fledermaus", "bat"],
      ["Laterne", "lantern"],
    ),
    neutral: [
      ["Hefter", "stapler"],
      ["Schlitten", "sled"],
      ["Fingerhut", "thimble"],
      ["Bratpfanne", "frying pan"],
    ],
  },
  {
    seed: 0x1e8b53c9,
    difficulty: "hard",
    green: theme(
      ["Hülle", "Covering"],
      ["Schneckenhaus", "snail shell"],
      ["Nussschale", "nutshell"],
      ["Haut", "skin"],
      ["Dach", "roof"],
    ),
    purple: theme(
      ["Steuerung", "Control"],
      ["Ruder", "rudder"],
      ["Joystick", "joystick"],
      ["Fernbedienung", "remote control"],
      ["Lenkrad", "steering wheel"],
    ),
    neutral: [
      ["Birne", "pear"],
      ["Sanduhr", "hourglass"],
      ["Geige", "violin"],
      ["Glocke", "bell"],
    ],
  },
];

// Public tokens are independently generated constants, unrelated to the private
// shuffle seeds. Publishing a seed would let a guesser reconstruct the key.
const publicTokens = [
  "e419bbd8",
  "25df3423",
  "f9ef4964",
  "da067513",
  "c6e6d54a",
  "b4261c51",
  "0b6423bd",
  "8e286b28",
  "d92e97b2",
  "03869805",
  "25679fcc",
  "19c402fb",
  "f55d7180",
  "25fdbcc6",
  "3b3c92b7",
  "fb1d1832",
  "432057e6",
  "1bf72ba1",
  "30be30e2",
  "fcbb17d2",
  "8d37a95e",
  "9851e771",
  "400ba7bf",
  "20962ac4",
  "2daf75df",
  "bc161eed",
  "99de0f2f",
  "79c9e1ef",
  "3c1f05ad",
  "f5679d83",
  "a98fc23b",
  "00c73cc1",
  "160b53f3",
  "65c94b6f",
  "c63fda01",
  "911ac1a5",
  "691dd6d2",
  "88629699",
  "16f0593c",
  "7171e872",
  "f81cdd40",
  "4b9c824a",
];

// Assign public option IDs only after shuffling. Neither ID nor position encodes
// a colour, and the opaque board ID does not name either private theme.
function question(board: Board, boardIndex: number): Question {
  let state = board.seed >>> 0;
  const cards = [
    ...board.green.words.map((text) => ({ text, colour: "green" as const })),
    ...board.purple.words.map((text) => ({ text, colour: "purple" as const })),
    ...board.neutral.map((text) => ({ text, colour: "neutral" as const })),
  ];
  for (let index = cards.length - 1; index > 0; index--) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    const other = (state >>> 0) % (index + 1);
    [cards[index], cards[other]] = [cards[other], cards[index]];
  }
  const token = publicTokens[boardIndex];
  const options = cards.map(({ text }, index) => ({
    id: `w${String(index + 1).padStart(2, "0")}`,
    text: t(text),
  }));
  return {
    id: `bank-association-${token}`,
    category: "association",
    difficulty: board.difficulty,
    prompt: {
      de: "Welche Wörter gehören zum Hinweis eures Teams? Wählt genau die angegebene Anzahl.",
      en: "Which words match your team's clue? Select exactly the stated number.",
    },
    options,
    answer: `association-concept-${token}`,
    explanation: {
      de: "Der Hinweis verbindet die markierten Wörter. Der vollständige richtige Satz bringt Punkte; einzelne Treffer reichen nicht.",
      en: "The clue connects the marked words. The complete correct set earns points; individual matches are not enough.",
    },
    association: {
      targets: {
        green: options
          .filter((_, index) => cards[index].colour === "green")
          .map(({ id }) => id),
        purple: options
          .filter((_, index) => cards[index].colour === "purple")
          .map(({ id }) => id),
      },
      hints: { green: t(board.green.hint), purple: t(board.purple.hint) },
    },
  };
}

export const associationBank: Question[] = boards.map(question);
