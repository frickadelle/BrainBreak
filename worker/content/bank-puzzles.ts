import type { Question } from "../../shared/types";
import type { PuzzleCategory } from "../../shared/puzzles";

// Authored finite dictionary shared by every English-word round.
export const wordleDictionary: string[] = [
  "ABOUT",
  "ABOVE",
  "ACTOR",
  "ADIEU",
  "AFTER",
  "AGAIN",
  "AGENT",
  "AGREE",
  "ALARM",
  "ALBUM",
  "ALERT",
  "ALIEN",
  "ALIVE",
  "ALLOW",
  "ALONE",
  "ALONG",
  "ALTER",
  "AMBER",
  "ANGEL",
  "ANGRY",
  "APART",
  "APPLE",
  "APPLY",
  "ARGUE",
  "ARISE",
  "ARMOR",
  "AROMA",
  "AROSE",
  "ASIDE",
  "AUDIO",
  "AVOID",
  "AWAKE",
  "AWARD",
  "AWARE",
  "BAKER",
  "BASIC",
  "BASIS",
  "BEACH",
  "BEARD",
  "BEAST",
  "BEGIN",
  "BEING",
  "BELOW",
  "BENCH",
  "BERRY",
  "BIRTH",
  "BLACK",
  "BLAME",
  "BLANK",
  "BLAST",
  "BLEND",
  "BLIND",
  "BLOCK",
  "BLOOD",
  "BLOOM",
  "BOARD",
  "BOOST",
  "BOUND",
  "BRAIN",
  "BRAKE",
  "BRAND",
  "BRAVE",
  "BREAD",
  "BRICK",
  "BRIDE",
  "BRIEF",
  "BRING",
  "BROAD",
  "BROKE",
  "BROWN",
  "BRUSH",
  "BUILD",
  "BUILT",
  "BUNCH",
  "BURST",
  "CABLE",
  "CAMEL",
  "CANDY",
  "CARRY",
  "CATCH",
  "CAUSE",
  "CHAIN",
  "CHAIR",
  "CHALK",
  "CHARM",
  "CHASE",
  "CHEAP",
  "CHECK",
  "CHEEK",
  "CHEER",
  "CHESS",
  "CHIEF",
  "CHILD",
  "CHILI",
  "CHINA",
  "CHOSE",
  "CIVIC",
  "CLAIM",
  "CLASS",
  "CLEAN",
  "CLEAR",
  "CLERK",
  "CLICK",
  "CLIMB",
  "CLOCK",
  "CLOSE",
  "CLOTH",
  "CLOUD",
  "COACH",
  "COAST",
  "COCOA",
  "COLOR",
  "COMET",
  "CORAL",
  "COUCH",
  "COULD",
  "COUNT",
  "COURT",
  "COVER",
  "CRANE",
  "CRASH",
  "CRAZY",
  "CREAM",
  "CRIME",
  "CRISP",
  "CROSS",
  "CROWD",
  "CROWN",
  "DAILY",
  "DAIRY",
  "DANCE",
  "DEATH",
  "DELAY",
  "DEPTH",
  "DIARY",
  "DIRTY",
  "DOUBT",
  "DOUGH",
  "DOZEN",
  "DRAIN",
  "DRAMA",
  "DREAM",
  "DRINK",
  "DRIVE",
  "DROVE",
  "EAGER",
  "EAGLE",
  "EARLY",
  "EARTH",
  "EIGHT",
  "ELBOW",
  "EMPTY",
  "ENEMY",
  "ENJOY",
  "ENTER",
  "ENTRY",
  "EQUAL",
  "ERROR",
  "EVENT",
  "EVERY",
  "EXACT",
  "EXIST",
  "EXTRA",
  "FAITH",
  "FALSE",
  "FANCY",
  "FAVOR",
  "FEAST",
  "FENCE",
  "FEVER",
  "FIELD",
  "FIFTY",
  "FIGHT",
  "FINAL",
  "FIRST",
  "FIXED",
  "FLAME",
  "FLOOR",
  "FLOUR",
  "FOCUS",
  "FORCE",
  "FORTH",
  "FOUND",
  "FRAME",
  "FRESH",
  "FRONT",
  "FROST",
  "FRUIT",
  "FUNNY",
  "GHOST",
  "GIANT",
  "GIVEN",
  "GLASS",
  "GLOBE",
  "GLORY",
  "GOING",
  "GOOSE",
  "GRADE",
  "GRAND",
  "GRANT",
  "GRAPE",
  "GRASS",
  "GREAT",
  "GREEN",
  "GROUP",
  "GUARD",
  "GUESS",
  "GUIDE",
  "GUILT",
  "HABIT",
  "HAPPY",
  "HEARD",
  "HEART",
  "HEAVY",
  "HONEY",
  "HORSE",
  "HOTEL",
  "HOUSE",
  "HUMAN",
  "HUMOR",
  "IDEAL",
  "IMAGE",
  "INDEX",
  "INNER",
  "INPUT",
  "IRONY",
  "ISSUE",
  "IVORY",
  "JELLY",
  "JOINT",
  "JUDGE",
  "JUICE",
  "KNIFE",
  "LABEL",
  "LARGE",
  "LATER",
  "LAUGH",
  "LAYER",
  "LEARN",
  "LEAVE",
  "LEGAL",
  "LEMON",
  "LEVEL",
  "LIGHT",
  "LIMIT",
  "LIVER",
  "LOCAL",
  "LOOSE",
  "LOVER",
  "LOWER",
  "LUCKY",
  "LUNCH",
  "MAGIC",
  "MAJOR",
  "MAKER",
  "MANGO",
  "MARCH",
  "MARRY",
  "MATCH",
  "MAYBE",
  "MAYOR",
  "MEDIA",
  "MERCY",
  "METAL",
  "MIGHT",
  "MINOR",
  "MODEL",
  "MONEY",
  "MONTH",
  "MOUSE",
  "MOUTH",
  "MOVIE",
  "MUSIC",
  "NERVE",
  "NEVER",
  "NEWER",
  "NIGHT",
  "NINTH",
  "NOISE",
  "NORTH",
  "NOVEL",
  "NURSE",
  "OCCUR",
  "OCEAN",
  "OFFER",
  "OFTEN",
  "OLIVE",
  "ONION",
  "OPERA",
  "ORDER",
  "OTHER",
  "OUTER",
  "OWNER",
  "PANEL",
  "PAPER",
  "PARTY",
  "PASTA",
  "PATCH",
  "PAUSE",
  "PEACE",
  "PEACH",
  "PEARL",
  "PHONE",
  "PHOTO",
  "PIANO",
  "PIECE",
  "PILOT",
  "PITCH",
  "PIZZA",
  "PLACE",
  "PLAIN",
  "PLANE",
  "PLANT",
  "PLATE",
  "POINT",
  "PORCH",
  "POUND",
  "POWER",
  "PRICE",
  "PRIDE",
  "PRIME",
  "PRINT",
  "PRIZE",
  "PROOF",
  "PROUD",
  "PUPIL",
  "QUEEN",
  "QUICK",
  "QUIET",
  "QUITE",
  "RADIO",
  "RAISE",
  "RANGE",
  "RAPID",
  "REACH",
  "READY",
  "REFER",
  "RELAX",
  "REPLY",
  "RIGHT",
  "RIVAL",
  "RIVER",
  "ROAST",
  "ROBOT",
  "ROUGH",
  "ROUND",
  "ROUTE",
  "ROYAL",
  "RUGBY",
  "RULER",
  "SALAD",
  "SAUCE",
  "SCALE",
  "SCENE",
  "SCENT",
  "SCOPE",
  "SCORE",
  "SCREW",
  "SENSE",
  "SERVE",
  "SEVEN",
  "SHADE",
  "SHAKE",
  "SHAPE",
  "SHARE",
  "SHARP",
  "SHEEP",
  "SHEET",
  "SHELF",
  "SHELL",
  "SHINE",
  "SHIRT",
  "SHOCK",
  "SHORE",
  "SHORT",
  "SHOUT",
  "SIGHT",
  "SINCE",
  "SIXTH",
  "SKILL",
  "SKIRT",
  "SLATE",
  "SLEEP",
  "SLICE",
  "SLIDE",
  "SMALL",
  "SMART",
  "SMELL",
  "SMILE",
  "SMOKE",
  "SNAKE",
  "SOLAR",
  "SOLID",
  "SOLVE",
  "SORRY",
  "SOUND",
  "SOUTH",
  "SPACE",
  "SPARE",
  "SPEAK",
  "SPEED",
  "SPELL",
  "SPEND",
  "SPICE",
  "SPLIT",
  "SPORT",
  "STAGE",
  "STAIR",
  "STAMP",
  "STAND",
  "STARE",
  "START",
  "STATE",
  "STEAM",
  "STEEL",
  "STICK",
  "STILL",
  "STOCK",
  "STONE",
  "STORE",
  "STORM",
  "STORY",
  "STRAW",
  "STUDY",
  "STYLE",
  "SUGAR",
  "SUPER",
  "SWEET",
  "SWIFT",
  "SWING",
  "SWORD",
  "TABLE",
  "TASTE",
  "TEACH",
  "TEETH",
  "THANK",
  "THEIR",
  "THERE",
  "THESE",
  "THICK",
  "THING",
  "THINK",
  "THIRD",
  "THOSE",
  "THREE",
  "THROW",
  "THUMB",
  "TIGER",
  "TIGHT",
  "TITLE",
  "TODAY",
  "TOKEN",
  "TOPIC",
  "TOTAL",
  "TOUCH",
  "TOUGH",
  "TOWER",
  "TRACE",
  "TRACK",
  "TRADE",
  "TRAIL",
  "TRAIN",
  "TREAT",
  "TREND",
  "TRIAL",
  "TRIBE",
  "TRICK",
  "TRIED",
  "TRULY",
  "TRUST",
  "TRUTH",
  "TWICE",
  "UNDER",
  "UNION",
  "UNTIL",
  "UPPER",
  "URBAN",
  "USUAL",
  "VALID",
  "VALUE",
  "VIDEO",
  "VIRUS",
  "VISIT",
  "VITAL",
  "VOICE",
  "WASTE",
  "WATCH",
  "WATER",
  "WEIGH",
  "WHALE",
  "WHEAT",
  "WHEEL",
  "WHERE",
  "WHICH",
  "WHILE",
  "WHITE",
  "WHOLE",
  "WHOSE",
  "WOMAN",
  "WOMEN",
  "WORLD",
  "WORRY",
  "WORTH",
  "WOULD",
  "WRITE",
  "WRONG",
  "WROTE",
  "YACHT",
  "YEAST",
  "YIELD",
  "YOUNG",
  "YOUTH",
  "ZEBRA",
];

export const puzzleBank: Record<PuzzleCategory, Question[]> = {
  code: [
    {
      id: "bank-code-80a5e1af35",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "455",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-2c2d5d3b89",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "104",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-fcd80a0e61",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "045",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-9fa455e94f",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "021",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-f665f4b8ec",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "055",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-a5060c4336",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "453",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-8d87b6a6e5",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "301",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-df7e67accf",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "151",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-dd98e675c1",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "522",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-366c05f01f",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "310",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-9b0b09f9c4",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "134",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-b4aebd01c7",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "445",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-c3975566fc",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "101",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-d4fe3c181c",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "402",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-56c8d90c1a",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "115",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-c294130b86",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "141",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-7eedb14b25",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "043",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-410436eda1",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "050",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-d923c6f489",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "240",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-a31a6a193a",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "111",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-528fd2879c",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "142",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-069e3b4a52",
      category: "code",
      difficulty: "easy",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "030",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-19cc8a3662",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "4302",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-e363f88d0c",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1120",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-eeb5afcfa1",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1335",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-9c4b6b9182",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1234",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-5d97522bc4",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "3231",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-2c3dd04fa3",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1514",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-eacf9e4e2c",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "0015",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-38e6938339",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1115",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-66ce055c57",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "3505",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-982b850ed1",
      category: "code",
      difficulty: "medium",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "4454",
        symbols: ["0", "1", "2", "3", "4", "5"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-756f16b5e9",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "2700",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-3427537664",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "6623",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-08d0739e51",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1541",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-254cea3369",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "4354",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-bd0867beed",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "1040",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-4964387fce",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "3535",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-389c8e74db",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "6566",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-e4c212d9e7",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "7511",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-33a3f59eef",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "2656",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
    {
      id: "bank-code-222c4b5d3b",
      category: "code",
      difficulty: "hard",
      prompt: {
        de: "Knacke den geheimen Zifferncode. Ziffern dürfen sich wiederholen.",
        en: "Crack the secret digit code. Digits may repeat.",
      },
      answer: "",
      explanation: {
        de: "Grün bedeutet richtige Ziffer am richtigen Platz, Gelb richtige Ziffer an einem anderen Platz. Jede geheime Ziffer wird nur einmal pro Versuch gezählt.",
        en: "Green means the right digit in the right place; yellow means the right digit in another place. Each secret digit counts only once per attempt.",
      },
      puzzle: {
        kind: "code",
        secret: "5477",
        symbols: ["0", "1", "2", "3", "4", "5", "6", "7"],
        maxAttempts: 6,
      },
    },
  ],
  sets: [
    {
      id: "bank-sets-0f9520661a",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "e74a45c4",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "422ec64b",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "e234a882",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "f3fc4f00",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "ff0b9140",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "6ca71cc0",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "bbeb188b",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "69dc5895",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "641ecec6",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "6f7a47d1",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "20adcb81",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "cfff4493",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-8e683ac0fa",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "166f7485",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7d2f0d91",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "57447496",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "2ed473cd",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "3215fbf2",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "e0aad125",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "49118d33",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "58f787ec",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "b9eeeb89",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "a9685b13",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "bbdff829",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "b02db9b2",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-a7ad94b77a",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "de3b0460",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "c5746821",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "81c8e8e3",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "30ff2943",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "8869a2a6",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "0f81abef",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "911931ce",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "523615cf",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "9933699c",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "7e66ae05",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "837c3842",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "25236140",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-f372e8c3e1",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "19cbbaa7",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "376400aa",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "16197d9c",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "4691ee89",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "7abbea42",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "acf0be28",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "426da022",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "c9cc92bb",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "36360467",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "75fe8035",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "878d55aa",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "0354e013",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-2caf859b4f",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "23d0f5a2",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "d0486871",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "c067511f",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "e037e473",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "0f96f20a",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "733b9c43",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "a003ced3",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "6fec422d",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "77c0c476",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "f8c7e334",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "cbcb360d",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "e5933064",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-6f8cec66d4",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "6a1f7b39",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "34ecd70c",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "104817b7",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "1637216c",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "854b955c",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "46b70d25",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "ee05f36f",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "faa4e779",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "b6e11566",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "a0f47087",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "153f074e",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "7f893e9c",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-20f8c4a4d2",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "7f72650d",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "1fe367f5",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "7126f97c",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "cef0d85c",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "252682aa",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "6dbd5a62",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "889e100a",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "05fc444f",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "4c7ffa11",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "05cb6383",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "d1748e0c",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "709b3474",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-8cf4de4a4c",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "09592c3d",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "4ddb7aaf",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "346da1e0",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "9e41c083",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "28e73203",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "3839b035",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "07e39d8f",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "ddef8c8b",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "bc6ef702",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "ebb97117",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "bd58fdc5",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "a0a84804",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-50025ab2fa",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "1e813423",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "792df2a8",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "3bd50594",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "7e383725",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "bf35a788",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "8e64d943",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "a6869672",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "65fd1806",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "51233d5c",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "acec5e23",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "3a58ddf8",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "25fcbabe",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-45e73a004c",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "9e798336",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "c73bd426",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "87634550",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "3757f9c2",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "97543c39",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "22799bda",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "67664276",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "64edade8",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "edb5bc2c",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "dfdc1225",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "f0c9b6ac",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "d9a57e3e",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-bd33c9f121",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "2d9d30b0",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "80d62015",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "21187ad6",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "093192f7",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "0fe4e0df",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "c11ec563",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "6ac8be6a",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "bbffd079",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "ccc47ea0",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "cf586dd6",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "28692b9e",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "131a26c3",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-522d511166",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "e2fbe5db",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "28914402",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "22eeb9d9",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "cdcd28b7",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "f397e151",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "669c3547",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "c0eb5df5",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "26f6305d",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "015fdbc6",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "ae806a8b",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "79b40ae6",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "20817e09",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-f26ed02d0d",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "5e943017",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "d7890df6",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "6b48c2e2",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "d06a76d3",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "6a488379",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "ab8a5301",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "7d2f35f4",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "a9cef79d",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "be6edebb",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "6fad080e",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "ebebf574",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "6593f529",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-951f301baa",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "adc1940b",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "4d9c8a7a",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "e10c8386",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "99ee58f6",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "ff59d1ce",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "2adc0a59",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7d38311c",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "d21463ac",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "2301933c",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "ae2aebbd",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "2d132bcc",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "93b91d22",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-5e4fed3413",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "7f10c5ab",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "28d076a7",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "777900aa",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "a8641307",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "51cd1571",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "9dc2417a",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "7bcb03a7",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "8a2e0712",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "7295624f",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "cd21c98a",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "29c38b72",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "9e8f0285",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-455187e266",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "3280d490",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "149eab3d",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "e624cc47",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "b36c85bb",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "4f6906a6",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "23f946ae",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a2479045",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "92fbe282",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "f5e4f799",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "71c9925e",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "5ec79245",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "c5806dd0",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-7c8088443d",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "eae6d78c",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "9a584344",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "38f4f38a",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7f54be28",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "2da4f113",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "bc5366c3",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "4e1d7199",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "97c2c8c8",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "20484d6e",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "ae97f0ff",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "1df51454",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "5da01ce8",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-d2d3b6822e",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "2dd47443",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "3facf164",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "83864b88",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "56438ae2",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "18a85c4d",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "19629a7e",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "be02d523",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "e18247b6",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "fb7fca46",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "1636065c",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "605cb7b0",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a722f1e0",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-c60f995dc0",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "bc125e90",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "83da0de2",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "fe2dcecb",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "389b07fc",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a5888688",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "1701332c",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "5c824e0f",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "4d198cf3",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "da5d0e81",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "c238a338",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "76df5401",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "f8782867",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-5e63844d69",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "d3385688",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "a94cbbad",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "70cdbb8c",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "bbf6936f",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "deb0dee8",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "8560eb29",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "5b7f9296",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "4521a8dc",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "b4f4aeac",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "258c8c7f",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "a4017801",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "163ce393",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-f66042ac12",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "d70781f3",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "f47e7972",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "60779916",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "1860a5af",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "a6ea899c",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "273b20e4",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "2127be58",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "5c7074a8",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "043b0bc8",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "bce3aad1",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "88738b81",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "368373dd",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-1d16545b96",
      category: "sets",
      difficulty: "easy",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "f591c530",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "e419bc9d",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a3273fb9",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "c22d8db9",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "93376924",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "4f9743d2",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "84579ba6",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "f2a6cbb4",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "396e286e",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "0c7fa6ac",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "53c1775a",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "5076ed5e",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-1697281521",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "20da0ae5",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "f118949a",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "365df069",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "c003587c",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "49f06d09",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "f1ad2c71",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "ea29596c",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "de507257",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7f8fd3e9",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "b3821565",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "d266ac56",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "c2f922f5",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-ee34659c95",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "30518423",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "847d4aa7",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "a9e3103f",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "67e258cd",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "cb181238",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "1031b654",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "0f7e1fb4",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "000f298a",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "2ff326fe",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "0125aa23",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "7438048e",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "2b9022c8",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-d8d76d5f25",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "2db3273a",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "8ef76909",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "151dcd58",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "6f80e910",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "b8c654e6",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "afb25031",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "e8679169",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "6eb9c543",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "ea839f6e",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "41201d96",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "cd721b21",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "eb71596c",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-44825ac9fe",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "a8972a91",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "e160a0d3",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "d3e27a72",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "da7bade6",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "c3228245",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "6922768c",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "f62ceb7f",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "8bb068eb",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "6dd3abea",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "cd031621",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "8f8a9592",
            shape: 2,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "ec55f7d7",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-a1a785c48b",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "26157987",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "5e45f83f",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "251a5f7b",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "54adcfb0",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "2027ca42",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "7edcab0d",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "674b4c2e",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "c457a177",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "8c089604",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "18c5f704",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "3f1a6ec0",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "f8a52a81",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-01b60e9a78",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "aafb94c9",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "4bafc403",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "cabe730f",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "279ee6ab",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "c1e1d946",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "c9322b58",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "73196c3f",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "84eb4e52",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "4f2c5052",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "e1292c81",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "7fcd80da",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a19a6cd5",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-5ac9591d20",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "eb3dcb0b",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a37f9a1a",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "9987e342",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "5e5e1f94",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "c35672a4",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "708cb533",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "77a8e921",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "400121cb",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "a2c1fa80",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "8f035271",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7cf7650a",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "7130ca85",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-920a88d6b4",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "c40569b8",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "efcf9702",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "0cce4a7e",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "28c59e15",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "58ca5077",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "b10cf2ef",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "d8d655ba",
            shape: 0,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "1611947e",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "892f375e",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "9d4c4c71",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "f9f7d634",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "a8f8b878",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-a15fc10d74",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "ec840a9d",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "498c308a",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "517d1d41",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "63df9372",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "7a32263a",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "3c24228c",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "19d18dbd",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "4f2a8ba1",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "7847a504",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "47fc26fa",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "ec9ebf7c",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "8c39d8e6",
            shape: 0,
            color: 2,
            count: 1,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-d7346e4e61",
      category: "sets",
      difficulty: "medium",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "d8c07311",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "680b62b5",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "f8a914cf",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "38911e57",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "ce38b11d",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "cd6ab6d0",
            shape: 2,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "e1d128ab",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "36541a74",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "2b523931",
            shape: 0,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "965c915e",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "13cd2567",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "679fd3a6",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
        ],
        features: 3,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-8a83000ae0",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "fa6a3f9b",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "af4bd526",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "bb288bd2",
            shape: 2,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "b8a14ce0",
            shape: 1,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "38305887",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "bb4c0912",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "266744cb",
            shape: 1,
            color: 2,
            count: 2,
            fill: 1,
          },
          {
            id: "0078eeae",
            shape: 1,
            color: 1,
            count: 1,
            fill: 2,
          },
          {
            id: "360f4158",
            shape: 0,
            color: 2,
            count: 2,
            fill: 1,
          },
          {
            id: "5b01e435",
            shape: 0,
            color: 1,
            count: 3,
            fill: 2,
          },
          {
            id: "ee0f1e17",
            shape: 1,
            color: 1,
            count: 1,
            fill: 1,
          },
          {
            id: "d300d4c2",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-a2cc5de176",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "c70afd87",
            shape: 1,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "cf04d793",
            shape: 0,
            color: 1,
            count: 1,
            fill: 1,
          },
          {
            id: "a9e29326",
            shape: 2,
            color: 2,
            count: 1,
            fill: 1,
          },
          {
            id: "a0b69714",
            shape: 1,
            color: 1,
            count: 3,
            fill: 2,
          },
          {
            id: "22c4e0e3",
            shape: 0,
            color: 1,
            count: 3,
            fill: 1,
          },
          {
            id: "80f76ebf",
            shape: 1,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "90d175dd",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "0985cf66",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "f9e3ac97",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "840eff92",
            shape: 2,
            color: 0,
            count: 1,
            fill: 1,
          },
          {
            id: "71d1d3e9",
            shape: 1,
            color: 0,
            count: 3,
            fill: 2,
          },
          {
            id: "0a632513",
            shape: 0,
            color: 0,
            count: 2,
            fill: 2,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-d7c44d7806",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "507281d4",
            shape: 0,
            color: 0,
            count: 3,
            fill: 2,
          },
          {
            id: "9495c404",
            shape: 0,
            color: 1,
            count: 3,
            fill: 1,
          },
          {
            id: "df8a3de5",
            shape: 2,
            color: 1,
            count: 2,
            fill: 1,
          },
          {
            id: "3339067b",
            shape: 2,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "68c28105",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "de57d12d",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "bd027107",
            shape: 2,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "285be404",
            shape: 1,
            color: 1,
            count: 1,
            fill: 2,
          },
          {
            id: "5ba1e969",
            shape: 1,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "a35cac27",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "f874cab9",
            shape: 0,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "00c9b757",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-a83103bb57",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "27a8920d",
            shape: 0,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "2c3101b1",
            shape: 1,
            color: 1,
            count: 3,
            fill: 1,
          },
          {
            id: "1f81e311",
            shape: 0,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "87a8a80a",
            shape: 1,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "ad6b900b",
            shape: 2,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "1d3cca9b",
            shape: 2,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "d2fa1838",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "0be29415",
            shape: 1,
            color: 1,
            count: 1,
            fill: 2,
          },
          {
            id: "b9352c11",
            shape: 1,
            color: 2,
            count: 2,
            fill: 2,
          },
          {
            id: "bd59aa22",
            shape: 2,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "b3bb4d78",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "2e19598f",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-cc47cef596",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "b223b782",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "ebc1e65b",
            shape: 1,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "f75db02f",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "edba1d18",
            shape: 1,
            color: 0,
            count: 3,
            fill: 0,
          },
          {
            id: "a7a2260b",
            shape: 0,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "6841864b",
            shape: 1,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "0705171b",
            shape: 2,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "4b48d81d",
            shape: 0,
            color: 0,
            count: 1,
            fill: 1,
          },
          {
            id: "90208867",
            shape: 0,
            color: 1,
            count: 2,
            fill: 1,
          },
          {
            id: "28ee182f",
            shape: 1,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "8b39c174",
            shape: 2,
            color: 1,
            count: 2,
            fill: 0,
          },
          {
            id: "252a1378",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-3e87a312b3",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "f78bc3d0",
            shape: 1,
            color: 2,
            count: 1,
            fill: 0,
          },
          {
            id: "aca6f600",
            shape: 0,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "64b99bc5",
            shape: 2,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "1663731e",
            shape: 2,
            color: 2,
            count: 2,
            fill: 2,
          },
          {
            id: "88d1b4cd",
            shape: 1,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "dd0e838e",
            shape: 1,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "0ca8fda8",
            shape: 0,
            color: 2,
            count: 2,
            fill: 2,
          },
          {
            id: "774fb0c6",
            shape: 0,
            color: 0,
            count: 3,
            fill: 2,
          },
          {
            id: "b6ce5dd0",
            shape: 0,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "6db99113",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "d09cd164",
            shape: 1,
            color: 0,
            count: 1,
            fill: 1,
          },
          {
            id: "1be1879a",
            shape: 2,
            color: 0,
            count: 1,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-31dcd2d1e4",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "031379a8",
            shape: 1,
            color: 2,
            count: 2,
            fill: 0,
          },
          {
            id: "027ba810",
            shape: 0,
            color: 0,
            count: 3,
            fill: 1,
          },
          {
            id: "9ed73170",
            shape: 2,
            color: 2,
            count: 3,
            fill: 2,
          },
          {
            id: "2c04c099",
            shape: 0,
            color: 2,
            count: 1,
            fill: 1,
          },
          {
            id: "640eaf52",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "9519d690",
            shape: 0,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "c3a47b00",
            shape: 2,
            color: 1,
            count: 3,
            fill: 1,
          },
          {
            id: "e5989cc5",
            shape: 0,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "c6e6b77a",
            shape: 2,
            color: 1,
            count: 1,
            fill: 1,
          },
          {
            id: "d366bacf",
            shape: 1,
            color: 2,
            count: 3,
            fill: 1,
          },
          {
            id: "9cb949e3",
            shape: 1,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "21320274",
            shape: 0,
            color: 0,
            count: 3,
            fill: 2,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-6a4cb24716",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "794ce557",
            shape: 1,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "193f2a5c",
            shape: 0,
            color: 1,
            count: 2,
            fill: 1,
          },
          {
            id: "a239ecef",
            shape: 2,
            color: 1,
            count: 1,
            fill: 2,
          },
          {
            id: "995f6357",
            shape: 1,
            color: 1,
            count: 1,
            fill: 1,
          },
          {
            id: "62e30fad",
            shape: 0,
            color: 0,
            count: 1,
            fill: 1,
          },
          {
            id: "1bda3c86",
            shape: 1,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "b8e232bf",
            shape: 1,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "eef810e4",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "9f545a89",
            shape: 1,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "21e9405f",
            shape: 2,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "6dcdc5a5",
            shape: 2,
            color: 0,
            count: 3,
            fill: 1,
          },
          {
            id: "50f22f0d",
            shape: 2,
            color: 2,
            count: 3,
            fill: 2,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-8558749aad",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "7566ebba",
            shape: 0,
            color: 1,
            count: 3,
            fill: 0,
          },
          {
            id: "cd034c05",
            shape: 2,
            color: 0,
            count: 3,
            fill: 2,
          },
          {
            id: "31438f71",
            shape: 1,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "3de92853",
            shape: 1,
            color: 0,
            count: 3,
            fill: 2,
          },
          {
            id: "144978ee",
            shape: 1,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "8a7ff188",
            shape: 2,
            color: 1,
            count: 3,
            fill: 2,
          },
          {
            id: "4adf18db",
            shape: 0,
            color: 0,
            count: 2,
            fill: 2,
          },
          {
            id: "e1754447",
            shape: 0,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "f2410394",
            shape: 1,
            color: 2,
            count: 1,
            fill: 2,
          },
          {
            id: "ba7bef20",
            shape: 0,
            color: 2,
            count: 3,
            fill: 0,
          },
          {
            id: "87cc0141",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "1ed5bc3f",
            shape: 2,
            color: 1,
            count: 3,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
    {
      id: "bank-sets-82be514606",
      category: "sets",
      difficulty: "hard",
      prompt: {
        de: "Finde drei Karten: Jedes aktive Merkmal muss auf allen drei Karten gleich oder auf allen drei verschieden sein.",
        en: "Find three cards: each active feature must be the same on all three cards or different on all three.",
      },
      answer: "",
      explanation: {
        de: "Prüfe jedes aktive Merkmal unabhängig. Zwei gleiche Werte und ein anderer bilden kein Set. Die zwölf Karten sind alle verschieden.",
        en: "Check each active feature independently. Two matching values and one different value do not form a set. All twelve cards are different.",
      },
      puzzle: {
        kind: "sets",
        cards: [
          {
            id: "fb862171",
            shape: 1,
            color: 1,
            count: 3,
            fill: 2,
          },
          {
            id: "440aee34",
            shape: 0,
            color: 1,
            count: 3,
            fill: 1,
          },
          {
            id: "a8eaeaa3",
            shape: 1,
            color: 1,
            count: 1,
            fill: 0,
          },
          {
            id: "676f6138",
            shape: 0,
            color: 0,
            count: 2,
            fill: 1,
          },
          {
            id: "f30fe295",
            shape: 2,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "db592e77",
            shape: 0,
            color: 2,
            count: 1,
            fill: 1,
          },
          {
            id: "494def5b",
            shape: 1,
            color: 0,
            count: 1,
            fill: 0,
          },
          {
            id: "63598c09",
            shape: 1,
            color: 0,
            count: 2,
            fill: 0,
          },
          {
            id: "c61b8e1a",
            shape: 2,
            color: 0,
            count: 3,
            fill: 1,
          },
          {
            id: "94b850e1",
            shape: 0,
            color: 0,
            count: 1,
            fill: 2,
          },
          {
            id: "4b78a6b2",
            shape: 2,
            color: 1,
            count: 2,
            fill: 2,
          },
          {
            id: "71d9fe29",
            shape: 0,
            color: 0,
            count: 2,
            fill: 0,
          },
        ],
        features: 4,
        maxAttempts: 4,
      },
    },
  ],
  connections: [
    {
      id: "bank-connections-ab618668bb",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "f97e094c",
          text: {
            de: "Tisch",
            en: "Table",
          },
        },
        {
          id: "94e98e73",
          text: {
            de: "Sofa",
            en: "Sofa",
          },
        },
        {
          id: "b1560da1",
          text: {
            de: "Birne",
            en: "Pear",
          },
        },
        {
          id: "16310650",
          text: {
            de: "Stuhl",
            en: "Chair",
          },
        },
        {
          id: "af8686a4",
          text: {
            de: "Pflaume",
            en: "Plum",
          },
        },
        {
          id: "e3f2160c",
          text: {
            de: "Pfirsich",
            en: "Peach",
          },
        },
        {
          id: "dde88e92",
          text: {
            de: "Apfel",
            en: "Apple",
          },
        },
        {
          id: "0293afb2",
          text: {
            de: "Kleiderschrank",
            en: "Wardrobe",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "c9864381",
            title: {
              de: "Obst",
              en: "Fruit",
            },
            ids: ["dde88e92", "b1560da1", "e3f2160c", "af8686a4"],
          },
          {
            id: "56816b0c",
            title: {
              de: "Möbelstücke",
              en: "Furniture",
            },
            ids: ["94e98e73", "f97e094c", "16310650", "0293afb2"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-28a6eeb8d0",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "90086398",
          text: {
            de: "Wohnzimmer",
            en: "Living room",
          },
        },
        {
          id: "423d2134",
          text: {
            de: "Zwiebel",
            en: "Onion",
          },
        },
        {
          id: "06e1f69a",
          text: {
            de: "Karotte",
            en: "Carrot",
          },
        },
        {
          id: "a00b3b4a",
          text: {
            de: "Schlafzimmer",
            en: "Bedroom",
          },
        },
        {
          id: "cfb31f1a",
          text: {
            de: "Küche",
            en: "Kitchen",
          },
        },
        {
          id: "82bce652",
          text: {
            de: "Kartoffel",
            en: "Potato",
          },
        },
        {
          id: "2de33420",
          text: {
            de: "Badezimmer",
            en: "Bathroom",
          },
        },
        {
          id: "196cb14e",
          text: {
            de: "Kopfsalat",
            en: "Lettuce",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "30a0429b",
            title: {
              de: "Küchengemüse",
              en: "Kitchen vegetables",
            },
            ids: ["06e1f69a", "82bce652", "423d2134", "196cb14e"],
          },
          {
            id: "6e8e46a3",
            title: {
              de: "Wohnräume",
              en: "Rooms in a home",
            },
            ids: ["2de33420", "cfb31f1a", "a00b3b4a", "90086398"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-cf8f7d5436",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "b0d2e77c",
          text: {
            de: "Schwan",
            en: "Swan",
          },
        },
        {
          id: "212225d9",
          text: {
            de: "Pinguin",
            en: "Penguin",
          },
        },
        {
          id: "a2d4ff8b",
          text: {
            de: "Frühling",
            en: "Spring",
          },
        },
        {
          id: "023c9ad8",
          text: {
            de: "Herbst",
            en: "Autumn",
          },
        },
        {
          id: "a6eaffa7",
          text: {
            de: "Sommer",
            en: "Summer",
          },
        },
        {
          id: "0b4d0488",
          text: {
            de: "Winter",
            en: "Winter",
          },
        },
        {
          id: "8a4dc6bf",
          text: {
            de: "Eule",
            en: "Owl",
          },
        },
        {
          id: "cf021819",
          text: {
            de: "Adler",
            en: "Eagle",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "48c662b9",
            title: {
              de: "Vögel",
              en: "Birds",
            },
            ids: ["cf021819", "8a4dc6bf", "b0d2e77c", "212225d9"],
          },
          {
            id: "ef21e71c",
            title: {
              de: "Jahreszeiten",
              en: "Seasons",
            },
            ids: ["a2d4ff8b", "a6eaffa7", "023c9ad8", "0b4d0488"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-bb499fd5f7",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "4d5777ec",
          text: {
            de: "Hund",
            en: "Dog",
          },
        },
        {
          id: "32343b84",
          text: {
            de: "Kaninchen",
            en: "Rabbit",
          },
        },
        {
          id: "986a5458",
          text: {
            de: "Westen",
            en: "West",
          },
        },
        {
          id: "27624a33",
          text: {
            de: "Hamster",
            en: "Hamster",
          },
        },
        {
          id: "7c7930c4",
          text: {
            de: "Katze",
            en: "Cat",
          },
        },
        {
          id: "5797b9fd",
          text: {
            de: "Osten",
            en: "East",
          },
        },
        {
          id: "fc0ae977",
          text: {
            de: "Süden",
            en: "South",
          },
        },
        {
          id: "d6355c71",
          text: {
            de: "Norden",
            en: "North",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "95a40acd",
            title: {
              de: "Haustiere",
              en: "Pets",
            },
            ids: ["4d5777ec", "7c7930c4", "27624a33", "32343b84"],
          },
          {
            id: "787c1a67",
            title: {
              de: "Himmelsrichtungen",
              en: "Compass directions",
            },
            ids: ["d6355c71", "fc0ae977", "5797b9fd", "986a5458"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-63ebe4104e",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "e9ef8201",
          text: {
            de: "Montag",
            en: "Monday",
          },
        },
        {
          id: "3046b757",
          text: {
            de: "Dienstag",
            en: "Tuesday",
          },
        },
        {
          id: "361d1e6d",
          text: {
            de: "Donnerstag",
            en: "Thursday",
          },
        },
        {
          id: "f2e86835",
          text: {
            de: "Leopard",
            en: "Leopard",
          },
        },
        {
          id: "10cfcc7d",
          text: {
            de: "Puma",
            en: "Cougar",
          },
        },
        {
          id: "abacf1e1",
          text: {
            de: "Löwe",
            en: "Lion",
          },
        },
        {
          id: "b6efb925",
          text: {
            de: "Mittwoch",
            en: "Wednesday",
          },
        },
        {
          id: "0818d783",
          text: {
            de: "Tiger",
            en: "Tiger",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "ba4698ff",
            title: {
              de: "Wildkatzen",
              en: "Wild cats",
            },
            ids: ["abacf1e1", "0818d783", "10cfcc7d", "f2e86835"],
          },
          {
            id: "38e4353c",
            title: {
              de: "Wochentage",
              en: "Days of the week",
            },
            ids: ["e9ef8201", "3046b757", "b6efb925", "361d1e6d"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-0c6ac90285",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "202580bd",
          text: {
            de: "Juli",
            en: "July",
          },
        },
        {
          id: "a2649055",
          text: {
            de: "März",
            en: "March",
          },
        },
        {
          id: "338042b8",
          text: {
            de: "Seehund",
            en: "Seal",
          },
        },
        {
          id: "092da81a",
          text: {
            de: "Januar",
            en: "January",
          },
        },
        {
          id: "36bbfe70",
          text: {
            de: "November",
            en: "November",
          },
        },
        {
          id: "be715620",
          text: {
            de: "Delfin",
            en: "Dolphin",
          },
        },
        {
          id: "5ce20859",
          text: {
            de: "Wal",
            en: "Whale",
          },
        },
        {
          id: "280a36d0",
          text: {
            de: "Walross",
            en: "Walrus",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "8af86d78",
            title: {
              de: "Meeressäuger",
              en: "Marine mammals",
            },
            ids: ["be715620", "5ce20859", "338042b8", "280a36d0"],
          },
          {
            id: "588ce34e",
            title: {
              de: "Monate",
              en: "Months",
            },
            ids: ["092da81a", "a2649055", "202580bd", "36bbfe70"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-9aa56421f8",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "de4caedc",
          text: {
            de: "Eisen",
            en: "Iron",
          },
        },
        {
          id: "ad71d258",
          text: {
            de: "Mücke",
            en: "Mosquito",
          },
        },
        {
          id: "b760cda6",
          text: {
            de: "Silber",
            en: "Silver",
          },
        },
        {
          id: "99745b25",
          text: {
            de: "Ameise",
            en: "Ant",
          },
        },
        {
          id: "cf85bef0",
          text: {
            de: "Kupfer",
            en: "Copper",
          },
        },
        {
          id: "083fc530",
          text: {
            de: "Biene",
            en: "Bee",
          },
        },
        {
          id: "225503a5",
          text: {
            de: "Gold",
            en: "Gold",
          },
        },
        {
          id: "e463d46c",
          text: {
            de: "Wespe",
            en: "Wasp",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "6803fc3b",
            title: {
              de: "Insekten",
              en: "Insects",
            },
            ids: ["99745b25", "083fc530", "e463d46c", "ad71d258"],
          },
          {
            id: "e359ec57",
            title: {
              de: "Metalle",
              en: "Metals",
            },
            ids: ["de4caedc", "cf85bef0", "b760cda6", "225503a5"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-991f714b33",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "34bf7e22",
          text: {
            de: "Smaragd",
            en: "Emerald",
          },
        },
        {
          id: "0030b52d",
          text: {
            de: "Schneebesen",
            en: "Whisk",
          },
        },
        {
          id: "1ea8ccbc",
          text: {
            de: "Suppenkelle",
            en: "Ladle",
          },
        },
        {
          id: "9c946a5b",
          text: {
            de: "Saphir",
            en: "Sapphire",
          },
        },
        {
          id: "19bcee57",
          text: {
            de: "Rubin",
            en: "Ruby",
          },
        },
        {
          id: "bb89acbe",
          text: {
            de: "Pfanne",
            en: "Pan",
          },
        },
        {
          id: "05eac65a",
          text: {
            de: "Topf",
            en: "Pot",
          },
        },
        {
          id: "5ef76575",
          text: {
            de: "Diamant",
            en: "Diamond",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "c66a2541",
            title: {
              de: "Küchenutensilien",
              en: "Kitchen utensils",
            },
            ids: ["05eac65a", "bb89acbe", "0030b52d", "1ea8ccbc"],
          },
          {
            id: "04ec8c0b",
            title: {
              de: "Edelsteine",
              en: "Gemstones",
            },
            ids: ["19bcee57", "34bf7e22", "9c946a5b", "5ef76575"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-fa54489ae2",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "29943e21",
          text: {
            de: "Kiefer",
            en: "Pine",
          },
        },
        {
          id: "a14f31f1",
          text: {
            de: "Gabel",
            en: "Fork",
          },
        },
        {
          id: "ad7fef14",
          text: {
            de: "Buche",
            en: "Beech",
          },
        },
        {
          id: "54e181ee",
          text: {
            de: "Messer",
            en: "Knife",
          },
        },
        {
          id: "53738826",
          text: {
            de: "Birke",
            en: "Birch",
          },
        },
        {
          id: "3a169310",
          text: {
            de: "Löffel",
            en: "Spoon",
          },
        },
        {
          id: "644f9244",
          text: {
            de: "Essstäbchen",
            en: "Chopsticks",
          },
        },
        {
          id: "8c918d27",
          text: {
            de: "Eiche",
            en: "Oak",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "e1e896ec",
            title: {
              de: "Essbesteck",
              en: "Eating utensils",
            },
            ids: ["54e181ee", "a14f31f1", "3a169310", "644f9244"],
          },
          {
            id: "9bd5b1da",
            title: {
              de: "Baumarten",
              en: "Types of trees",
            },
            ids: ["8c918d27", "53738826", "29943e21", "ad7fef14"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-cd86382177",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "be03e36c",
          text: {
            de: "Hose",
            en: "Trousers",
          },
        },
        {
          id: "ce5d1dae",
          text: {
            de: "Mantel",
            en: "Coat",
          },
        },
        {
          id: "00198cd2",
          text: {
            de: "Hemd",
            en: "Shirt",
          },
        },
        {
          id: "c9bee91c",
          text: {
            de: "Gänseblümchen",
            en: "Daisy",
          },
        },
        {
          id: "8954e1d4",
          text: {
            de: "Narzisse",
            en: "Daffodil",
          },
        },
        {
          id: "18dd3b16",
          text: {
            de: "Tulpe",
            en: "Tulip",
          },
        },
        {
          id: "b4e2ccf6",
          text: {
            de: "Kleid",
            en: "Dress",
          },
        },
        {
          id: "3399ace8",
          text: {
            de: "Rose",
            en: "Rose",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "68d20ac5",
            title: {
              de: "Kleidungsstücke",
              en: "Garments",
            },
            ids: ["be03e36c", "00198cd2", "ce5d1dae", "b4e2ccf6"],
          },
          {
            id: "cb50d34b",
            title: {
              de: "Blumen",
              en: "Flowers",
            },
            ids: ["3399ace8", "18dd3b16", "c9bee91c", "8954e1d4"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-675a45cb74",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "370ee465",
          text: {
            de: "Auto",
            en: "Car",
          },
        },
        {
          id: "e76dab34",
          text: {
            de: "Zug",
            en: "Train",
          },
        },
        {
          id: "60010b79",
          text: {
            de: "Turnschuh",
            en: "Trainer",
          },
        },
        {
          id: "d2b6e3b2",
          text: {
            de: "Straßenbahn",
            en: "Tram",
          },
        },
        {
          id: "5dd1d43c",
          text: {
            de: "Bus",
            en: "Bus",
          },
        },
        {
          id: "0f53e6eb",
          text: {
            de: "Hausschuh",
            en: "Slipper",
          },
        },
        {
          id: "3200bb9e",
          text: {
            de: "Stiefel",
            en: "Boot",
          },
        },
        {
          id: "4a8afd68",
          text: {
            de: "Sandale",
            en: "Sandal",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "23674d9a",
            title: {
              de: "Schuharten",
              en: "Types of footwear",
            },
            ids: ["3200bb9e", "4a8afd68", "60010b79", "0f53e6eb"],
          },
          {
            id: "1ceacb23",
            title: {
              de: "Landverkehrsmittel",
              en: "Land transport",
            },
            ids: ["5dd1d43c", "370ee465", "d2b6e3b2", "e76dab34"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-1552eb1742",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "fe962c5c",
          text: {
            de: "Fähre",
            en: "Ferry",
          },
        },
        {
          id: "3cb8f4fa",
          text: {
            de: "Jacht",
            en: "Yacht",
          },
        },
        {
          id: "fcb824c0",
          text: {
            de: "Kajak",
            en: "Kayak",
          },
        },
        {
          id: "c72a882e",
          text: {
            de: "Säge",
            en: "Saw",
          },
        },
        {
          id: "c36e4f94",
          text: {
            de: "Bohrer",
            en: "Drill",
          },
        },
        {
          id: "94e24386",
          text: {
            de: "Zange",
            en: "Pliers",
          },
        },
        {
          id: "3fd18be9",
          text: {
            de: "Hammer",
            en: "Hammer",
          },
        },
        {
          id: "7ce7183c",
          text: {
            de: "Kanu",
            en: "Canoe",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "adda56ef",
            title: {
              de: "Werkzeuge",
              en: "Tools",
            },
            ids: ["3fd18be9", "c72a882e", "c36e4f94", "94e24386"],
          },
          {
            id: "75ed56d3",
            title: {
              de: "Wasserfahrzeuge",
              en: "Watercraft",
            },
            ids: ["fcb824c0", "7ce7183c", "3cb8f4fa", "fe962c5c"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-00031b7b91",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "97896de2",
          text: {
            de: "Neptun",
            en: "Neptune",
          },
        },
        {
          id: "f6038023",
          text: {
            de: "Saturn",
            en: "Saturn",
          },
        },
        {
          id: "b295399b",
          text: {
            de: "Cello",
            en: "Cello",
          },
        },
        {
          id: "4816797e",
          text: {
            de: "Geige",
            en: "Violin",
          },
        },
        {
          id: "5dbbad43",
          text: {
            de: "Gitarre",
            en: "Guitar",
          },
        },
        {
          id: "326fc0ef",
          text: {
            de: "Venus",
            en: "Venus",
          },
        },
        {
          id: "b27d536b",
          text: {
            de: "Mars",
            en: "Mars",
          },
        },
        {
          id: "f0a60e7c",
          text: {
            de: "Harfe",
            en: "Harp",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "85919d9b",
            title: {
              de: "Saiteninstrumente",
              en: "String instruments",
            },
            ids: ["4816797e", "b295399b", "f0a60e7c", "5dbbad43"],
          },
          {
            id: "8257763c",
            title: {
              de: "Planeten",
              en: "Planets",
            },
            ids: ["b27d536b", "326fc0ef", "f6038023", "97896de2"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-b9f71b7921",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "ac183598",
          text: {
            de: "Tuba",
            en: "Tuba",
          },
        },
        {
          id: "64860420",
          text: {
            de: "Bildschirm",
            en: "Monitor",
          },
        },
        {
          id: "e9e28fa4",
          text: {
            de: "Trompete",
            en: "Trumpet",
          },
        },
        {
          id: "a8adc775",
          text: {
            de: "Computermaus",
            en: "Computer mouse",
          },
        },
        {
          id: "ccb199a1",
          text: {
            de: "Horn",
            en: "Horn",
          },
        },
        {
          id: "800b46c3",
          text: {
            de: "Tastatur",
            en: "Keyboard",
          },
        },
        {
          id: "e39e9128",
          text: {
            de: "Drucker",
            en: "Printer",
          },
        },
        {
          id: "92f74863",
          text: {
            de: "Posaune",
            en: "Trombone",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "8f51dc22",
            title: {
              de: "Blechblasinstrumente",
              en: "Brass instruments",
            },
            ids: ["e9e28fa4", "92f74863", "ac183598", "ccb199a1"],
          },
          {
            id: "4dad1470",
            title: {
              de: "Computerzubehör",
              en: "Computer peripherals",
            },
            ids: ["800b46c3", "a8adc775", "64860420", "e39e9128"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-f04181eef4",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "4c65ba3c",
          text: {
            de: "JPEG",
            en: "JPEG",
          },
        },
        {
          id: "17bd7907",
          text: {
            de: "TXT",
            en: "TXT",
          },
        },
        {
          id: "6477e12a",
          text: {
            de: "Klarinette",
            en: "Clarinet",
          },
        },
        {
          id: "e5964a6e",
          text: {
            de: "PDF",
            en: "PDF",
          },
        },
        {
          id: "d283cc73",
          text: {
            de: "Oboe",
            en: "Oboe",
          },
        },
        {
          id: "5f0b0f06",
          text: {
            de: "MP3",
            en: "MP3",
          },
        },
        {
          id: "261b383d",
          text: {
            de: "Saxophon",
            en: "Saxophone",
          },
        },
        {
          id: "7b3f70d5",
          text: {
            de: "Querflöte",
            en: "Flute",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "acf7717f",
            title: {
              de: "Holzblasinstrumente",
              en: "Woodwind instruments",
            },
            ids: ["7b3f70d5", "6477e12a", "d283cc73", "261b383d"],
          },
          {
            id: "6c53d66f",
            title: {
              de: "Dateiformate",
              en: "File formats",
            },
            ids: ["e5964a6e", "4c65ba3c", "5f0b0f06", "17bd7907"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-e3010c55e3",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "5fbe72fb",
          text: {
            de: "Riesenrad",
            en: "Ferris wheel",
          },
        },
        {
          id: "dc36ebd8",
          text: {
            de: "Karussell",
            en: "Carousel",
          },
        },
        {
          id: "2608b8b8",
          text: {
            de: "Trommel",
            en: "Drum",
          },
        },
        {
          id: "b4e29c34",
          text: {
            de: "Autoscooter",
            en: "Bumper cars",
          },
        },
        {
          id: "b5f714ab",
          text: {
            de: "Triangel",
            en: "Triangle",
          },
        },
        {
          id: "36951bd2",
          text: {
            de: "Becken",
            en: "Cymbal",
          },
        },
        {
          id: "0c998054",
          text: {
            de: "Tamburin",
            en: "Tambourine",
          },
        },
        {
          id: "aa8ffedc",
          text: {
            de: "Achterbahn",
            en: "Roller coaster",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "c16bdf92",
            title: {
              de: "Schlaginstrumente",
              en: "Percussion instruments",
            },
            ids: ["2608b8b8", "36951bd2", "b5f714ab", "0c998054"],
          },
          {
            id: "2a86f739",
            title: {
              de: "Fahrgeschäfte",
              en: "Amusement rides",
            },
            ids: ["aa8ffedc", "dc36ebd8", "5fbe72fb", "b4e29c34"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-df1690c560",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "4a84bf6e",
          text: {
            de: "Kochen in Wasser",
            en: "Boiling",
          },
        },
        {
          id: "c90d7e31",
          text: {
            de: "Rugby",
            en: "Rugby",
          },
        },
        {
          id: "56569eda",
          text: {
            de: "Fußball",
            en: "Football",
          },
        },
        {
          id: "9e23148e",
          text: {
            de: "Braten in der Pfanne",
            en: "Frying",
          },
        },
        {
          id: "79d09cad",
          text: {
            de: "Dämpfen",
            en: "Steaming",
          },
        },
        {
          id: "b5d45f1c",
          text: {
            de: "Rösten im Ofen",
            en: "Roasting",
          },
        },
        {
          id: "0b66ab33",
          text: {
            de: "Basketball",
            en: "Basketball",
          },
        },
        {
          id: "93b17b50",
          text: {
            de: "Tennis",
            en: "Tennis",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "6bbe401a",
            title: {
              de: "Ballsportarten",
              en: "Ball sports",
            },
            ids: ["56569eda", "93b17b50", "c90d7e31", "0b66ab33"],
          },
          {
            id: "a3249756",
            title: {
              de: "Garmethoden",
              en: "Cooking methods",
            },
            ids: ["4a84bf6e", "9e23148e", "b5d45f1c", "79d09cad"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-bd83786e2f",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "9fee9ac1",
          text: {
            de: "Ludo",
            en: "Ludo",
          },
        },
        {
          id: "02a93fc0",
          text: {
            de: "Wachsmalstift",
            en: "Crayon",
          },
        },
        {
          id: "63a6a5ac",
          text: {
            de: "Backgammon",
            en: "Backgammon",
          },
        },
        {
          id: "d26cda60",
          text: {
            de: "Filzstift",
            en: "Marker pen",
          },
        },
        {
          id: "05610361",
          text: {
            de: "Füller",
            en: "Fountain pen",
          },
        },
        {
          id: "f8ffb7fb",
          text: {
            de: "Dame",
            en: "Checkers",
          },
        },
        {
          id: "b5de9de3",
          text: {
            de: "Bleistift",
            en: "Pencil",
          },
        },
        {
          id: "33dc9fb9",
          text: {
            de: "Schach",
            en: "Chess",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "f7ba870d",
            title: {
              de: "Brettspiele",
              en: "Board games",
            },
            ids: ["33dc9fb9", "f8ffb7fb", "63a6a5ac", "9fee9ac1"],
          },
          {
            id: "0c687352",
            title: {
              de: "Schreib- und Zeichenstifte",
              en: "Writing and drawing tools",
            },
            ids: ["b5de9de3", "05610361", "d26cda60", "02a93fc0"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-febc6e0712",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "5a76e813",
          text: {
            de: "Dreieck",
            en: "Triangle shape",
          },
        },
        {
          id: "f9dd7b1b",
          text: {
            de: "Meter",
            en: "Metre",
          },
        },
        {
          id: "e604fae8",
          text: {
            de: "Liter",
            en: "Litre",
          },
        },
        {
          id: "74aea03e",
          text: {
            de: "Quadrat",
            en: "Square",
          },
        },
        {
          id: "16c2cefd",
          text: {
            de: "Kreis",
            en: "Circle",
          },
        },
        {
          id: "851f8059",
          text: {
            de: "Gramm",
            en: "Gram",
          },
        },
        {
          id: "281aa6e3",
          text: {
            de: "Sechseck",
            en: "Hexagon",
          },
        },
        {
          id: "35872fac",
          text: {
            de: "Sekunde",
            en: "Second",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "fa910305",
            title: {
              de: "Ebene geometrische Formen",
              en: "Plane geometric shapes",
            },
            ids: ["16c2cefd", "5a76e813", "74aea03e", "281aa6e3"],
          },
          {
            id: "015b613e",
            title: {
              de: "Maßeinheiten",
              en: "Measurement units",
            },
            ids: ["f9dd7b1b", "35872fac", "851f8059", "e604fae8"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-d9dd234717",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "b7f4fee9",
          text: {
            de: "Hagel",
            en: "Hail",
          },
        },
        {
          id: "e81bb8d1",
          text: {
            de: "Regen",
            en: "Rain",
          },
        },
        {
          id: "bb12ed79",
          text: {
            de: "Schnee",
            en: "Snow",
          },
        },
        {
          id: "199b986b",
          text: {
            de: "Nebel",
            en: "Fog",
          },
        },
        {
          id: "146ae3ca",
          text: {
            de: "Knöchel",
            en: "Ankle",
          },
        },
        {
          id: "115c0e71",
          text: {
            de: "Knie",
            en: "Knee",
          },
        },
        {
          id: "aa4075a7",
          text: {
            de: "Schulter",
            en: "Shoulder",
          },
        },
        {
          id: "8242c630",
          text: {
            de: "Ellbogen",
            en: "Elbow",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "0812f1e9",
            title: {
              de: "Körpergelenke",
              en: "Body joints",
            },
            ids: ["8242c630", "115c0e71", "aa4075a7", "146ae3ca"],
          },
          {
            id: "7860010b",
            title: {
              de: "Wettererscheinungen",
              en: "Weather phenomena",
            },
            ids: ["bb12ed79", "e81bb8d1", "b7f4fee9", "199b986b"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-799f45e5b1",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "cef661a1",
          text: {
            de: "Grün",
            en: "Green",
          },
        },
        {
          id: "5154cf69",
          text: {
            de: "Mund",
            en: "Mouth",
          },
        },
        {
          id: "51a4922e",
          text: {
            de: "Auge",
            en: "Eye",
          },
        },
        {
          id: "84437b00",
          text: {
            de: "Gelb",
            en: "Yellow",
          },
        },
        {
          id: "9b845a47",
          text: {
            de: "Rot",
            en: "Red",
          },
        },
        {
          id: "18a25a33",
          text: {
            de: "Nase",
            en: "Nose",
          },
        },
        {
          id: "8044dd9f",
          text: {
            de: "Blau",
            en: "Blue",
          },
        },
        {
          id: "b1d272bd",
          text: {
            de: "Ohr",
            en: "Ear",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "7747f5db",
            title: {
              de: "Teile des Kopfes",
              en: "Parts of the head",
            },
            ids: ["51a4922e", "b1d272bd", "18a25a33", "5154cf69"],
          },
          {
            id: "36c20b0a",
            title: {
              de: "Farben",
              en: "Colours",
            },
            ids: ["9b845a47", "8044dd9f", "cef661a1", "84437b00"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-e6399d1ee6",
      category: "connections",
      difficulty: "easy",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "f992fc72",
          text: {
            de: "Apfel",
            en: "Apple",
          },
        },
        {
          id: "18ef2ec1",
          text: {
            de: "Pfirsich",
            en: "Peach",
          },
        },
        {
          id: "ca186e7f",
          text: {
            de: "Wohnzimmer",
            en: "Living room",
          },
        },
        {
          id: "b9c2dc04",
          text: {
            de: "Badezimmer",
            en: "Bathroom",
          },
        },
        {
          id: "99954dd7",
          text: {
            de: "Birne",
            en: "Pear",
          },
        },
        {
          id: "1dfc6977",
          text: {
            de: "Küche",
            en: "Kitchen",
          },
        },
        {
          id: "139eab2b",
          text: {
            de: "Schlafzimmer",
            en: "Bedroom",
          },
        },
        {
          id: "7a9a4a5d",
          text: {
            de: "Pflaume",
            en: "Plum",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "a4ddb18a",
            title: {
              de: "Obst",
              en: "Fruit",
            },
            ids: ["f992fc72", "99954dd7", "18ef2ec1", "7a9a4a5d"],
          },
          {
            id: "c81b6f74",
            title: {
              de: "Wohnräume",
              en: "Rooms in a home",
            },
            ids: ["b9c2dc04", "1dfc6977", "139eab2b", "ca186e7f"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-e46e32831d",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "a9b8a69c",
          text: {
            de: "Becken",
            en: "Cymbal",
          },
        },
        {
          id: "bb877e8b",
          text: {
            de: "Rubin",
            en: "Ruby",
          },
        },
        {
          id: "50c4dda2",
          text: {
            de: "Kopfsalat",
            en: "Lettuce",
          },
        },
        {
          id: "6438e969",
          text: {
            de: "Diamant",
            en: "Diamond",
          },
        },
        {
          id: "c90faf9b",
          text: {
            de: "Zwiebel",
            en: "Onion",
          },
        },
        {
          id: "bd3db39a",
          text: {
            de: "Karotte",
            en: "Carrot",
          },
        },
        {
          id: "8d22b641",
          text: {
            de: "Trommel",
            en: "Drum",
          },
        },
        {
          id: "d9d8128d",
          text: {
            de: "Smaragd",
            en: "Emerald",
          },
        },
        {
          id: "f7d5efab",
          text: {
            de: "Triangel",
            en: "Triangle",
          },
        },
        {
          id: "9acbc62d",
          text: {
            de: "Kartoffel",
            en: "Potato",
          },
        },
        {
          id: "10226a2e",
          text: {
            de: "Saphir",
            en: "Sapphire",
          },
        },
        {
          id: "78fe421d",
          text: {
            de: "Tamburin",
            en: "Tambourine",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "ea5186ac",
            title: {
              de: "Küchengemüse",
              en: "Kitchen vegetables",
            },
            ids: ["bd3db39a", "9acbc62d", "c90faf9b", "50c4dda2"],
          },
          {
            id: "aa5ada7d",
            title: {
              de: "Schlaginstrumente",
              en: "Percussion instruments",
            },
            ids: ["8d22b641", "a9b8a69c", "f7d5efab", "78fe421d"],
          },
          {
            id: "8e34aaaf",
            title: {
              de: "Edelsteine",
              en: "Gemstones",
            },
            ids: ["bb877e8b", "d9d8128d", "10226a2e", "6438e969"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-54bb204f53",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "420dc0ab",
          text: {
            de: "Adler",
            en: "Eagle",
          },
        },
        {
          id: "af55f3d5",
          text: {
            de: "Fußball",
            en: "Football",
          },
        },
        {
          id: "43b09249",
          text: {
            de: "Eiche",
            en: "Oak",
          },
        },
        {
          id: "20ac8a9d",
          text: {
            de: "Pinguin",
            en: "Penguin",
          },
        },
        {
          id: "1eb89a31",
          text: {
            de: "Rugby",
            en: "Rugby",
          },
        },
        {
          id: "0744b3d7",
          text: {
            de: "Basketball",
            en: "Basketball",
          },
        },
        {
          id: "ebd6884d",
          text: {
            de: "Birke",
            en: "Birch",
          },
        },
        {
          id: "d0de7c31",
          text: {
            de: "Buche",
            en: "Beech",
          },
        },
        {
          id: "6d6c8839",
          text: {
            de: "Tennis",
            en: "Tennis",
          },
        },
        {
          id: "8359c716",
          text: {
            de: "Eule",
            en: "Owl",
          },
        },
        {
          id: "f90e135a",
          text: {
            de: "Kiefer",
            en: "Pine",
          },
        },
        {
          id: "5f755363",
          text: {
            de: "Schwan",
            en: "Swan",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "e2ff2d61",
            title: {
              de: "Vögel",
              en: "Birds",
            },
            ids: ["420dc0ab", "8359c716", "5f755363", "20ac8a9d"],
          },
          {
            id: "2a276919",
            title: {
              de: "Ballsportarten",
              en: "Ball sports",
            },
            ids: ["af55f3d5", "6d6c8839", "1eb89a31", "0744b3d7"],
          },
          {
            id: "ae662699",
            title: {
              de: "Baumarten",
              en: "Types of trees",
            },
            ids: ["43b09249", "ebd6884d", "f90e135a", "d0de7c31"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-119f937606",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "2ce07385",
          text: {
            de: "Katze",
            en: "Cat",
          },
        },
        {
          id: "41edb1b7",
          text: {
            de: "Tulpe",
            en: "Tulip",
          },
        },
        {
          id: "b91a2385",
          text: {
            de: "Kaninchen",
            en: "Rabbit",
          },
        },
        {
          id: "414a8410",
          text: {
            de: "Schach",
            en: "Chess",
          },
        },
        {
          id: "f6c01842",
          text: {
            de: "Hamster",
            en: "Hamster",
          },
        },
        {
          id: "24986e69",
          text: {
            de: "Narzisse",
            en: "Daffodil",
          },
        },
        {
          id: "6af3062f",
          text: {
            de: "Gänseblümchen",
            en: "Daisy",
          },
        },
        {
          id: "f5e3efb4",
          text: {
            de: "Dame",
            en: "Checkers",
          },
        },
        {
          id: "314120c5",
          text: {
            de: "Hund",
            en: "Dog",
          },
        },
        {
          id: "b13e51a5",
          text: {
            de: "Backgammon",
            en: "Backgammon",
          },
        },
        {
          id: "7ee923a3",
          text: {
            de: "Rose",
            en: "Rose",
          },
        },
        {
          id: "b2092c2b",
          text: {
            de: "Ludo",
            en: "Ludo",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "5fd12d7d",
            title: {
              de: "Haustiere",
              en: "Pets",
            },
            ids: ["314120c5", "2ce07385", "f6c01842", "b91a2385"],
          },
          {
            id: "19f8f9b6",
            title: {
              de: "Brettspiele",
              en: "Board games",
            },
            ids: ["414a8410", "f5e3efb4", "b13e51a5", "b2092c2b"],
          },
          {
            id: "1fd5f7ee",
            title: {
              de: "Blumen",
              en: "Flowers",
            },
            ids: ["7ee923a3", "41edb1b7", "6af3062f", "24986e69"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-440d220b33",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "43a79ef3",
          text: {
            de: "Zug",
            en: "Train",
          },
        },
        {
          id: "efc0c0ab",
          text: {
            de: "Tiger",
            en: "Tiger",
          },
        },
        {
          id: "6ca10a5c",
          text: {
            de: "Bus",
            en: "Bus",
          },
        },
        {
          id: "57b82945",
          text: {
            de: "Sechseck",
            en: "Hexagon",
          },
        },
        {
          id: "0c38721a",
          text: {
            de: "Löwe",
            en: "Lion",
          },
        },
        {
          id: "fa4ea705",
          text: {
            de: "Leopard",
            en: "Leopard",
          },
        },
        {
          id: "10bcd982",
          text: {
            de: "Straßenbahn",
            en: "Tram",
          },
        },
        {
          id: "b276b64b",
          text: {
            de: "Kreis",
            en: "Circle",
          },
        },
        {
          id: "263adcde",
          text: {
            de: "Auto",
            en: "Car",
          },
        },
        {
          id: "4111a987",
          text: {
            de: "Quadrat",
            en: "Square",
          },
        },
        {
          id: "5bcd4cfe",
          text: {
            de: "Puma",
            en: "Cougar",
          },
        },
        {
          id: "448343f0",
          text: {
            de: "Dreieck",
            en: "Triangle shape",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "12daf182",
            title: {
              de: "Wildkatzen",
              en: "Wild cats",
            },
            ids: ["0c38721a", "efc0c0ab", "5bcd4cfe", "fa4ea705"],
          },
          {
            id: "5116ab41",
            title: {
              de: "Ebene geometrische Formen",
              en: "Plane geometric shapes",
            },
            ids: ["b276b64b", "448343f0", "4111a987", "57b82945"],
          },
          {
            id: "f9547ec5",
            title: {
              de: "Landverkehrsmittel",
              en: "Land transport",
            },
            ids: ["6ca10a5c", "263adcde", "10bcd982", "43a79ef3"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-65ce859728",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "4b516f18",
          text: {
            de: "Seehund",
            en: "Seal",
          },
        },
        {
          id: "737d04d7",
          text: {
            de: "Fähre",
            en: "Ferry",
          },
        },
        {
          id: "58ebf49e",
          text: {
            de: "Knöchel",
            en: "Ankle",
          },
        },
        {
          id: "ab4b4260",
          text: {
            de: "Knie",
            en: "Knee",
          },
        },
        {
          id: "66cd8100",
          text: {
            de: "Kanu",
            en: "Canoe",
          },
        },
        {
          id: "3558b579",
          text: {
            de: "Delfin",
            en: "Dolphin",
          },
        },
        {
          id: "daa48e72",
          text: {
            de: "Kajak",
            en: "Kayak",
          },
        },
        {
          id: "d997c751",
          text: {
            de: "Jacht",
            en: "Yacht",
          },
        },
        {
          id: "19dd41fd",
          text: {
            de: "Schulter",
            en: "Shoulder",
          },
        },
        {
          id: "bd44a786",
          text: {
            de: "Walross",
            en: "Walrus",
          },
        },
        {
          id: "116cada1",
          text: {
            de: "Wal",
            en: "Whale",
          },
        },
        {
          id: "e3d228bf",
          text: {
            de: "Ellbogen",
            en: "Elbow",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "fd34b8cd",
            title: {
              de: "Meeressäuger",
              en: "Marine mammals",
            },
            ids: ["3558b579", "116cada1", "4b516f18", "bd44a786"],
          },
          {
            id: "aba9dd92",
            title: {
              de: "Körpergelenke",
              en: "Body joints",
            },
            ids: ["e3d228bf", "ab4b4260", "19dd41fd", "58ebf49e"],
          },
          {
            id: "94a9689c",
            title: {
              de: "Wasserfahrzeuge",
              en: "Watercraft",
            },
            ids: ["daa48e72", "66cd8100", "d997c751", "737d04d7"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-d99547307a",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "eed74dd8",
          text: {
            de: "Neptun",
            en: "Neptune",
          },
        },
        {
          id: "9b6eadf9",
          text: {
            de: "Auge",
            en: "Eye",
          },
        },
        {
          id: "0fd6f1e7",
          text: {
            de: "Mücke",
            en: "Mosquito",
          },
        },
        {
          id: "aa35148d",
          text: {
            de: "Venus",
            en: "Venus",
          },
        },
        {
          id: "69d4ac6b",
          text: {
            de: "Mars",
            en: "Mars",
          },
        },
        {
          id: "c9b92101",
          text: {
            de: "Nase",
            en: "Nose",
          },
        },
        {
          id: "c011d105",
          text: {
            de: "Saturn",
            en: "Saturn",
          },
        },
        {
          id: "acf9b980",
          text: {
            de: "Wespe",
            en: "Wasp",
          },
        },
        {
          id: "e2f9c6de",
          text: {
            de: "Ohr",
            en: "Ear",
          },
        },
        {
          id: "c74c9874",
          text: {
            de: "Biene",
            en: "Bee",
          },
        },
        {
          id: "94de690b",
          text: {
            de: "Mund",
            en: "Mouth",
          },
        },
        {
          id: "aea15141",
          text: {
            de: "Ameise",
            en: "Ant",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "2c672d65",
            title: {
              de: "Insekten",
              en: "Insects",
            },
            ids: ["aea15141", "c74c9874", "acf9b980", "0fd6f1e7"],
          },
          {
            id: "65dbb3e2",
            title: {
              de: "Teile des Kopfes",
              en: "Parts of the head",
            },
            ids: ["9b6eadf9", "e2f9c6de", "c9b92101", "94de690b"],
          },
          {
            id: "3e2f3665",
            title: {
              de: "Planeten",
              en: "Planets",
            },
            ids: ["69d4ac6b", "aa35148d", "c011d105", "eed74dd8"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-8e18c299ee",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "9d2b04c3",
          text: {
            de: "Tisch",
            en: "Table",
          },
        },
        {
          id: "71278f56",
          text: {
            de: "Tastatur",
            en: "Keyboard",
          },
        },
        {
          id: "983ea320",
          text: {
            de: "Pfanne",
            en: "Pan",
          },
        },
        {
          id: "9f4851bc",
          text: {
            de: "Drucker",
            en: "Printer",
          },
        },
        {
          id: "e4488144",
          text: {
            de: "Schneebesen",
            en: "Whisk",
          },
        },
        {
          id: "5cffc279",
          text: {
            de: "Bildschirm",
            en: "Monitor",
          },
        },
        {
          id: "71f35426",
          text: {
            de: "Kleiderschrank",
            en: "Wardrobe",
          },
        },
        {
          id: "2e7f984e",
          text: {
            de: "Suppenkelle",
            en: "Ladle",
          },
        },
        {
          id: "cd386d47",
          text: {
            de: "Computermaus",
            en: "Computer mouse",
          },
        },
        {
          id: "1350bf14",
          text: {
            de: "Topf",
            en: "Pot",
          },
        },
        {
          id: "07edaf60",
          text: {
            de: "Stuhl",
            en: "Chair",
          },
        },
        {
          id: "397e1ae3",
          text: {
            de: "Sofa",
            en: "Sofa",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "3712e44e",
            title: {
              de: "Küchenutensilien",
              en: "Kitchen utensils",
            },
            ids: ["1350bf14", "983ea320", "e4488144", "2e7f984e"],
          },
          {
            id: "2cc64c81",
            title: {
              de: "Möbelstücke",
              en: "Furniture",
            },
            ids: ["397e1ae3", "9d2b04c3", "07edaf60", "71f35426"],
          },
          {
            id: "743e44e8",
            title: {
              de: "Computerzubehör",
              en: "Computer peripherals",
            },
            ids: ["71278f56", "cd386d47", "5cffc279", "9f4851bc"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-238ef69355",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "15c831ac",
          text: {
            de: "Löffel",
            en: "Spoon",
          },
        },
        {
          id: "1fb02bae",
          text: {
            de: "Wohnzimmer",
            en: "Living room",
          },
        },
        {
          id: "c4c39dd1",
          text: {
            de: "Essstäbchen",
            en: "Chopsticks",
          },
        },
        {
          id: "dd7b32f1",
          text: {
            de: "JPEG",
            en: "JPEG",
          },
        },
        {
          id: "3e4b684b",
          text: {
            de: "Gabel",
            en: "Fork",
          },
        },
        {
          id: "47fb7146",
          text: {
            de: "PDF",
            en: "PDF",
          },
        },
        {
          id: "7f97fbb7",
          text: {
            de: "Küche",
            en: "Kitchen",
          },
        },
        {
          id: "ad24961c",
          text: {
            de: "Messer",
            en: "Knife",
          },
        },
        {
          id: "ccf8df58",
          text: {
            de: "Schlafzimmer",
            en: "Bedroom",
          },
        },
        {
          id: "633e8b4a",
          text: {
            de: "TXT",
            en: "TXT",
          },
        },
        {
          id: "514675ff",
          text: {
            de: "MP3",
            en: "MP3",
          },
        },
        {
          id: "3d4e1fea",
          text: {
            de: "Badezimmer",
            en: "Bathroom",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "0d774988",
            title: {
              de: "Essbesteck",
              en: "Eating utensils",
            },
            ids: ["ad24961c", "3e4b684b", "15c831ac", "c4c39dd1"],
          },
          {
            id: "70eb87e4",
            title: {
              de: "Wohnräume",
              en: "Rooms in a home",
            },
            ids: ["3d4e1fea", "7f97fbb7", "ccf8df58", "1fb02bae"],
          },
          {
            id: "e01b851c",
            title: {
              de: "Dateiformate",
              en: "File formats",
            },
            ids: ["47fb7146", "dd7b32f1", "514675ff", "633e8b4a"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-2ffe2f5200",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "5b7a93ba",
          text: {
            de: "Frühling",
            en: "Spring",
          },
        },
        {
          id: "87aa29a7",
          text: {
            de: "Hemd",
            en: "Shirt",
          },
        },
        {
          id: "b702316f",
          text: {
            de: "Hose",
            en: "Trousers",
          },
        },
        {
          id: "9f90f7f5",
          text: {
            de: "Sommer",
            en: "Summer",
          },
        },
        {
          id: "e0ed1001",
          text: {
            de: "Riesenrad",
            en: "Ferris wheel",
          },
        },
        {
          id: "44307007",
          text: {
            de: "Herbst",
            en: "Autumn",
          },
        },
        {
          id: "daf92d6d",
          text: {
            de: "Karussell",
            en: "Carousel",
          },
        },
        {
          id: "70e0c714",
          text: {
            de: "Autoscooter",
            en: "Bumper cars",
          },
        },
        {
          id: "9f22f74a",
          text: {
            de: "Winter",
            en: "Winter",
          },
        },
        {
          id: "c1a158e1",
          text: {
            de: "Achterbahn",
            en: "Roller coaster",
          },
        },
        {
          id: "1b2a7b7c",
          text: {
            de: "Mantel",
            en: "Coat",
          },
        },
        {
          id: "50ae9745",
          text: {
            de: "Kleid",
            en: "Dress",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "6582c29b",
            title: {
              de: "Kleidungsstücke",
              en: "Garments",
            },
            ids: ["b702316f", "87aa29a7", "1b2a7b7c", "50ae9745"],
          },
          {
            id: "df9c1305",
            title: {
              de: "Jahreszeiten",
              en: "Seasons",
            },
            ids: ["5b7a93ba", "9f90f7f5", "44307007", "9f22f74a"],
          },
          {
            id: "212a1eb1",
            title: {
              de: "Fahrgeschäfte",
              en: "Amusement rides",
            },
            ids: ["c1a158e1", "daf92d6d", "e0ed1001", "70e0c714"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-ec96a04f7a",
      category: "connections",
      difficulty: "medium",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "509b221e",
          text: {
            de: "Stiefel",
            en: "Boot",
          },
        },
        {
          id: "774123a9",
          text: {
            de: "Kochen in Wasser",
            en: "Boiling",
          },
        },
        {
          id: "68dbb901",
          text: {
            de: "Hausschuh",
            en: "Slipper",
          },
        },
        {
          id: "86f7e0ce",
          text: {
            de: "Osten",
            en: "East",
          },
        },
        {
          id: "0759f4ad",
          text: {
            de: "Westen",
            en: "West",
          },
        },
        {
          id: "eb1d5cce",
          text: {
            de: "Sandale",
            en: "Sandal",
          },
        },
        {
          id: "763b6557",
          text: {
            de: "Dämpfen",
            en: "Steaming",
          },
        },
        {
          id: "9a7837ab",
          text: {
            de: "Rösten im Ofen",
            en: "Roasting",
          },
        },
        {
          id: "ee6f5c55",
          text: {
            de: "Braten in der Pfanne",
            en: "Frying",
          },
        },
        {
          id: "463f53ce",
          text: {
            de: "Norden",
            en: "North",
          },
        },
        {
          id: "2b3932fc",
          text: {
            de: "Süden",
            en: "South",
          },
        },
        {
          id: "f0ab56db",
          text: {
            de: "Turnschuh",
            en: "Trainer",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "47e62aa6",
            title: {
              de: "Schuharten",
              en: "Types of footwear",
            },
            ids: ["509b221e", "eb1d5cce", "f0ab56db", "68dbb901"],
          },
          {
            id: "59bc320d",
            title: {
              de: "Himmelsrichtungen",
              en: "Compass directions",
            },
            ids: ["463f53ce", "2b3932fc", "86f7e0ce", "0759f4ad"],
          },
          {
            id: "0feceac5",
            title: {
              de: "Garmethoden",
              en: "Cooking methods",
            },
            ids: ["774123a9", "ee6f5c55", "9a7837ab", "763b6557"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-8970dc1b45",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "abcf9ebc",
          text: {
            de: "Klarinette",
            en: "Clarinet",
          },
        },
        {
          id: "21bc8666",
          text: {
            de: "Süden",
            en: "South",
          },
        },
        {
          id: "981f4af6",
          text: {
            de: "Osten",
            en: "East",
          },
        },
        {
          id: "2de15ad2",
          text: {
            de: "Puma",
            en: "Cougar",
          },
        },
        {
          id: "c2a4abf7",
          text: {
            de: "Löwe",
            en: "Lion",
          },
        },
        {
          id: "866fdd88",
          text: {
            de: "Tastatur",
            en: "Keyboard",
          },
        },
        {
          id: "a3023e08",
          text: {
            de: "Norden",
            en: "North",
          },
        },
        {
          id: "951daa98",
          text: {
            de: "Westen",
            en: "West",
          },
        },
        {
          id: "11d3506e",
          text: {
            de: "Leopard",
            en: "Leopard",
          },
        },
        {
          id: "0ebb9a3d",
          text: {
            de: "Computermaus",
            en: "Computer mouse",
          },
        },
        {
          id: "e6d19f26",
          text: {
            de: "Drucker",
            en: "Printer",
          },
        },
        {
          id: "9c8ded3f",
          text: {
            de: "Tiger",
            en: "Tiger",
          },
        },
        {
          id: "58b36924",
          text: {
            de: "Querflöte",
            en: "Flute",
          },
        },
        {
          id: "5c2368a0",
          text: {
            de: "Saxophon",
            en: "Saxophone",
          },
        },
        {
          id: "1b3fb240",
          text: {
            de: "Oboe",
            en: "Oboe",
          },
        },
        {
          id: "3b9b89e7",
          text: {
            de: "Bildschirm",
            en: "Monitor",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "65674199",
            title: {
              de: "Wildkatzen",
              en: "Wild cats",
            },
            ids: ["c2a4abf7", "9c8ded3f", "2de15ad2", "11d3506e"],
          },
          {
            id: "4ff88427",
            title: {
              de: "Holzblasinstrumente",
              en: "Woodwind instruments",
            },
            ids: ["58b36924", "abcf9ebc", "1b3fb240", "5c2368a0"],
          },
          {
            id: "2682417e",
            title: {
              de: "Himmelsrichtungen",
              en: "Compass directions",
            },
            ids: ["a3023e08", "21bc8666", "981f4af6", "951daa98"],
          },
          {
            id: "ad07fc60",
            title: {
              de: "Computerzubehör",
              en: "Computer peripherals",
            },
            ids: ["866fdd88", "0ebb9a3d", "3b9b89e7", "e6d19f26"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-c913499f51",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "a2a98fa5",
          text: {
            de: "Dienstag",
            en: "Tuesday",
          },
        },
        {
          id: "0f4fceda",
          text: {
            de: "Tamburin",
            en: "Tambourine",
          },
        },
        {
          id: "2545ad08",
          text: {
            de: "JPEG",
            en: "JPEG",
          },
        },
        {
          id: "1c28832e",
          text: {
            de: "Montag",
            en: "Monday",
          },
        },
        {
          id: "6e8dba0f",
          text: {
            de: "Delfin",
            en: "Dolphin",
          },
        },
        {
          id: "baadc69c",
          text: {
            de: "PDF",
            en: "PDF",
          },
        },
        {
          id: "2f1d2e83",
          text: {
            de: "Wal",
            en: "Whale",
          },
        },
        {
          id: "7788e2bd",
          text: {
            de: "Becken",
            en: "Cymbal",
          },
        },
        {
          id: "33ce61bd",
          text: {
            de: "Seehund",
            en: "Seal",
          },
        },
        {
          id: "05cca414",
          text: {
            de: "TXT",
            en: "TXT",
          },
        },
        {
          id: "a568e59c",
          text: {
            de: "Trommel",
            en: "Drum",
          },
        },
        {
          id: "b000b2dd",
          text: {
            de: "Walross",
            en: "Walrus",
          },
        },
        {
          id: "fb0c00c6",
          text: {
            de: "Triangel",
            en: "Triangle",
          },
        },
        {
          id: "52d2dd75",
          text: {
            de: "Donnerstag",
            en: "Thursday",
          },
        },
        {
          id: "88f6be16",
          text: {
            de: "MP3",
            en: "MP3",
          },
        },
        {
          id: "42def696",
          text: {
            de: "Mittwoch",
            en: "Wednesday",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "b466cf21",
            title: {
              de: "Meeressäuger",
              en: "Marine mammals",
            },
            ids: ["6e8dba0f", "2f1d2e83", "33ce61bd", "b000b2dd"],
          },
          {
            id: "5a2a12c6",
            title: {
              de: "Schlaginstrumente",
              en: "Percussion instruments",
            },
            ids: ["a568e59c", "7788e2bd", "fb0c00c6", "0f4fceda"],
          },
          {
            id: "54610eb0",
            title: {
              de: "Wochentage",
              en: "Days of the week",
            },
            ids: ["1c28832e", "a2a98fa5", "42def696", "52d2dd75"],
          },
          {
            id: "dfbcd4fe",
            title: {
              de: "Dateiformate",
              en: "File formats",
            },
            ids: ["baadc69c", "2545ad08", "88f6be16", "05cca414"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-7de3686238",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "b417d82c",
          text: {
            de: "Fußball",
            en: "Football",
          },
        },
        {
          id: "71bbef02",
          text: {
            de: "Ameise",
            en: "Ant",
          },
        },
        {
          id: "8138cabb",
          text: {
            de: "Riesenrad",
            en: "Ferris wheel",
          },
        },
        {
          id: "6af9f3db",
          text: {
            de: "November",
            en: "November",
          },
        },
        {
          id: "c1ae2c23",
          text: {
            de: "Biene",
            en: "Bee",
          },
        },
        {
          id: "baeac7dc",
          text: {
            de: "Juli",
            en: "July",
          },
        },
        {
          id: "c16debd2",
          text: {
            de: "Wespe",
            en: "Wasp",
          },
        },
        {
          id: "cce79aba",
          text: {
            de: "Mücke",
            en: "Mosquito",
          },
        },
        {
          id: "d4e691e9",
          text: {
            de: "Januar",
            en: "January",
          },
        },
        {
          id: "0fe08a3c",
          text: {
            de: "Karussell",
            en: "Carousel",
          },
        },
        {
          id: "e3be1307",
          text: {
            de: "Rugby",
            en: "Rugby",
          },
        },
        {
          id: "85f4fa45",
          text: {
            de: "Autoscooter",
            en: "Bumper cars",
          },
        },
        {
          id: "421c77c4",
          text: {
            de: "Basketball",
            en: "Basketball",
          },
        },
        {
          id: "e24249e9",
          text: {
            de: "Tennis",
            en: "Tennis",
          },
        },
        {
          id: "e5e8c5d6",
          text: {
            de: "März",
            en: "March",
          },
        },
        {
          id: "3373fc04",
          text: {
            de: "Achterbahn",
            en: "Roller coaster",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "64a50e64",
            title: {
              de: "Insekten",
              en: "Insects",
            },
            ids: ["71bbef02", "c1ae2c23", "c16debd2", "cce79aba"],
          },
          {
            id: "4cd8946d",
            title: {
              de: "Ballsportarten",
              en: "Ball sports",
            },
            ids: ["b417d82c", "e24249e9", "e3be1307", "421c77c4"],
          },
          {
            id: "2b550d6c",
            title: {
              de: "Monate",
              en: "Months",
            },
            ids: ["d4e691e9", "e5e8c5d6", "baeac7dc", "6af9f3db"],
          },
          {
            id: "faf438c3",
            title: {
              de: "Fahrgeschäfte",
              en: "Amusement rides",
            },
            ids: ["3373fc04", "0fe08a3c", "8138cabb", "85f4fa45"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-f72134845a",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "71f6eaab",
          text: {
            de: "Dame",
            en: "Checkers",
          },
        },
        {
          id: "3e6030d9",
          text: {
            de: "Topf",
            en: "Pot",
          },
        },
        {
          id: "401b12e3",
          text: {
            de: "Kochen in Wasser",
            en: "Boiling",
          },
        },
        {
          id: "4706db44",
          text: {
            de: "Dämpfen",
            en: "Steaming",
          },
        },
        {
          id: "b4fa9bd8",
          text: {
            de: "Braten in der Pfanne",
            en: "Frying",
          },
        },
        {
          id: "8f12aabe",
          text: {
            de: "Schach",
            en: "Chess",
          },
        },
        {
          id: "a3fa653b",
          text: {
            de: "Suppenkelle",
            en: "Ladle",
          },
        },
        {
          id: "98e57927",
          text: {
            de: "Schneebesen",
            en: "Whisk",
          },
        },
        {
          id: "0d08c4f1",
          text: {
            de: "Silber",
            en: "Silver",
          },
        },
        {
          id: "17e69983",
          text: {
            de: "Rösten im Ofen",
            en: "Roasting",
          },
        },
        {
          id: "d9f8e06c",
          text: {
            de: "Pfanne",
            en: "Pan",
          },
        },
        {
          id: "cf142c4c",
          text: {
            de: "Eisen",
            en: "Iron",
          },
        },
        {
          id: "c610e51d",
          text: {
            de: "Backgammon",
            en: "Backgammon",
          },
        },
        {
          id: "b5894190",
          text: {
            de: "Ludo",
            en: "Ludo",
          },
        },
        {
          id: "d78b1626",
          text: {
            de: "Kupfer",
            en: "Copper",
          },
        },
        {
          id: "3daec038",
          text: {
            de: "Gold",
            en: "Gold",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "ad839c9c",
            title: {
              de: "Küchenutensilien",
              en: "Kitchen utensils",
            },
            ids: ["3e6030d9", "d9f8e06c", "98e57927", "a3fa653b"],
          },
          {
            id: "c971ef68",
            title: {
              de: "Brettspiele",
              en: "Board games",
            },
            ids: ["8f12aabe", "71f6eaab", "c610e51d", "b5894190"],
          },
          {
            id: "a1489c12",
            title: {
              de: "Metalle",
              en: "Metals",
            },
            ids: ["cf142c4c", "d78b1626", "0d08c4f1", "3daec038"],
          },
          {
            id: "e18cad6e",
            title: {
              de: "Garmethoden",
              en: "Cooking methods",
            },
            ids: ["401b12e3", "b4fa9bd8", "17e69983", "4706db44"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-08bf95792c",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "2be44109",
          text: {
            de: "Smaragd",
            en: "Emerald",
          },
        },
        {
          id: "45202b4f",
          text: {
            de: "Löffel",
            en: "Spoon",
          },
        },
        {
          id: "b46d0e63",
          text: {
            de: "Diamant",
            en: "Diamond",
          },
        },
        {
          id: "6326c483",
          text: {
            de: "Füller",
            en: "Fountain pen",
          },
        },
        {
          id: "bf9ae7db",
          text: {
            de: "Quadrat",
            en: "Square",
          },
        },
        {
          id: "3bea7c4c",
          text: {
            de: "Sechseck",
            en: "Hexagon",
          },
        },
        {
          id: "ff664034",
          text: {
            de: "Essstäbchen",
            en: "Chopsticks",
          },
        },
        {
          id: "1363fe14",
          text: {
            de: "Bleistift",
            en: "Pencil",
          },
        },
        {
          id: "f800c171",
          text: {
            de: "Filzstift",
            en: "Marker pen",
          },
        },
        {
          id: "060e7ef4",
          text: {
            de: "Gabel",
            en: "Fork",
          },
        },
        {
          id: "240b152b",
          text: {
            de: "Rubin",
            en: "Ruby",
          },
        },
        {
          id: "6738a540",
          text: {
            de: "Saphir",
            en: "Sapphire",
          },
        },
        {
          id: "dd783ddc",
          text: {
            de: "Dreieck",
            en: "Triangle shape",
          },
        },
        {
          id: "e84e1819",
          text: {
            de: "Messer",
            en: "Knife",
          },
        },
        {
          id: "440fcbb3",
          text: {
            de: "Kreis",
            en: "Circle",
          },
        },
        {
          id: "dd21dc4d",
          text: {
            de: "Wachsmalstift",
            en: "Crayon",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "dc7269ae",
            title: {
              de: "Essbesteck",
              en: "Eating utensils",
            },
            ids: ["e84e1819", "060e7ef4", "45202b4f", "ff664034"],
          },
          {
            id: "a574ff45",
            title: {
              de: "Ebene geometrische Formen",
              en: "Plane geometric shapes",
            },
            ids: ["440fcbb3", "dd783ddc", "bf9ae7db", "3bea7c4c"],
          },
          {
            id: "8544b954",
            title: {
              de: "Edelsteine",
              en: "Gemstones",
            },
            ids: ["240b152b", "2be44109", "6738a540", "b46d0e63"],
          },
          {
            id: "ce591bc2",
            title: {
              de: "Schreib- und Zeichenstifte",
              en: "Writing and drawing tools",
            },
            ids: ["1363fe14", "6326c483", "f800c171", "dd21dc4d"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-2f03166d61",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "5ae68a2b",
          text: {
            de: "Kleid",
            en: "Dress",
          },
        },
        {
          id: "2e011eba",
          text: {
            de: "Hemd",
            en: "Shirt",
          },
        },
        {
          id: "6de0c68b",
          text: {
            de: "Knie",
            en: "Knee",
          },
        },
        {
          id: "6eb019db",
          text: {
            de: "Sekunde",
            en: "Second",
          },
        },
        {
          id: "11495e7a",
          text: {
            de: "Eiche",
            en: "Oak",
          },
        },
        {
          id: "976f423d",
          text: {
            de: "Meter",
            en: "Metre",
          },
        },
        {
          id: "f47294fe",
          text: {
            de: "Liter",
            en: "Litre",
          },
        },
        {
          id: "8db2dfab",
          text: {
            de: "Schulter",
            en: "Shoulder",
          },
        },
        {
          id: "48d279e7",
          text: {
            de: "Ellbogen",
            en: "Elbow",
          },
        },
        {
          id: "12262f2a",
          text: {
            de: "Kiefer",
            en: "Pine",
          },
        },
        {
          id: "505f5b92",
          text: {
            de: "Buche",
            en: "Beech",
          },
        },
        {
          id: "07bbcbb6",
          text: {
            de: "Birke",
            en: "Birch",
          },
        },
        {
          id: "6a35088c",
          text: {
            de: "Knöchel",
            en: "Ankle",
          },
        },
        {
          id: "e161f5c6",
          text: {
            de: "Hose",
            en: "Trousers",
          },
        },
        {
          id: "3db67d5c",
          text: {
            de: "Mantel",
            en: "Coat",
          },
        },
        {
          id: "5af1acd6",
          text: {
            de: "Gramm",
            en: "Gram",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "8105b381",
            title: {
              de: "Kleidungsstücke",
              en: "Garments",
            },
            ids: ["e161f5c6", "2e011eba", "3db67d5c", "5ae68a2b"],
          },
          {
            id: "107bddce",
            title: {
              de: "Körpergelenke",
              en: "Body joints",
            },
            ids: ["48d279e7", "6de0c68b", "8db2dfab", "6a35088c"],
          },
          {
            id: "4060c15a",
            title: {
              de: "Baumarten",
              en: "Types of trees",
            },
            ids: ["11495e7a", "07bbcbb6", "12262f2a", "505f5b92"],
          },
          {
            id: "666e77ea",
            title: {
              de: "Maßeinheiten",
              en: "Measurement units",
            },
            ids: ["976f423d", "6eb019db", "5af1acd6", "f47294fe"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-f097f172b5",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "4cf2f9d4",
          text: {
            de: "Narzisse",
            en: "Daffodil",
          },
        },
        {
          id: "21f43346",
          text: {
            de: "Rose",
            en: "Rose",
          },
        },
        {
          id: "d42a3591",
          text: {
            de: "Regen",
            en: "Rain",
          },
        },
        {
          id: "9f4bc9d2",
          text: {
            de: "Ohr",
            en: "Ear",
          },
        },
        {
          id: "ae592aed",
          text: {
            de: "Schnee",
            en: "Snow",
          },
        },
        {
          id: "867cc2f4",
          text: {
            de: "Auge",
            en: "Eye",
          },
        },
        {
          id: "2376c9cb",
          text: {
            de: "Hausschuh",
            en: "Slipper",
          },
        },
        {
          id: "a1518595",
          text: {
            de: "Nase",
            en: "Nose",
          },
        },
        {
          id: "3d0ecbb4",
          text: {
            de: "Stiefel",
            en: "Boot",
          },
        },
        {
          id: "97ffd27c",
          text: {
            de: "Turnschuh",
            en: "Trainer",
          },
        },
        {
          id: "dc7212cd",
          text: {
            de: "Gänseblümchen",
            en: "Daisy",
          },
        },
        {
          id: "39a4486f",
          text: {
            de: "Tulpe",
            en: "Tulip",
          },
        },
        {
          id: "e55c9249",
          text: {
            de: "Mund",
            en: "Mouth",
          },
        },
        {
          id: "1bfd8103",
          text: {
            de: "Sandale",
            en: "Sandal",
          },
        },
        {
          id: "d6a8e580",
          text: {
            de: "Nebel",
            en: "Fog",
          },
        },
        {
          id: "a9a38445",
          text: {
            de: "Hagel",
            en: "Hail",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "86e8c80a",
            title: {
              de: "Schuharten",
              en: "Types of footwear",
            },
            ids: ["3d0ecbb4", "1bfd8103", "97ffd27c", "2376c9cb"],
          },
          {
            id: "ffe841c8",
            title: {
              de: "Teile des Kopfes",
              en: "Parts of the head",
            },
            ids: ["867cc2f4", "9f4bc9d2", "a1518595", "e55c9249"],
          },
          {
            id: "b35d3b82",
            title: {
              de: "Blumen",
              en: "Flowers",
            },
            ids: ["21f43346", "39a4486f", "dc7212cd", "4cf2f9d4"],
          },
          {
            id: "d7038d4d",
            title: {
              de: "Wettererscheinungen",
              en: "Weather phenomena",
            },
            ids: ["ae592aed", "d42a3591", "a9a38445", "d6a8e580"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-cceb919576",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "3a1d808b",
          text: {
            de: "Bohrer",
            en: "Drill",
          },
        },
        {
          id: "fbc5b61e",
          text: {
            de: "Straßenbahn",
            en: "Tram",
          },
        },
        {
          id: "13cb4480",
          text: {
            de: "Kleiderschrank",
            en: "Wardrobe",
          },
        },
        {
          id: "fe9e95bb",
          text: {
            de: "Blau",
            en: "Blue",
          },
        },
        {
          id: "87b0185c",
          text: {
            de: "Sofa",
            en: "Sofa",
          },
        },
        {
          id: "62081e2f",
          text: {
            de: "Grün",
            en: "Green",
          },
        },
        {
          id: "c424e655",
          text: {
            de: "Stuhl",
            en: "Chair",
          },
        },
        {
          id: "ca2f3670",
          text: {
            de: "Tisch",
            en: "Table",
          },
        },
        {
          id: "95455314",
          text: {
            de: "Zange",
            en: "Pliers",
          },
        },
        {
          id: "52dae5d7",
          text: {
            de: "Hammer",
            en: "Hammer",
          },
        },
        {
          id: "2584a0d3",
          text: {
            de: "Rot",
            en: "Red",
          },
        },
        {
          id: "9e938c72",
          text: {
            de: "Bus",
            en: "Bus",
          },
        },
        {
          id: "12288018",
          text: {
            de: "Zug",
            en: "Train",
          },
        },
        {
          id: "986681cc",
          text: {
            de: "Gelb",
            en: "Yellow",
          },
        },
        {
          id: "d77cf764",
          text: {
            de: "Säge",
            en: "Saw",
          },
        },
        {
          id: "d99f8cdc",
          text: {
            de: "Auto",
            en: "Car",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "e81a86ea",
            title: {
              de: "Werkzeuge",
              en: "Tools",
            },
            ids: ["52dae5d7", "d77cf764", "3a1d808b", "95455314"],
          },
          {
            id: "ca735a14",
            title: {
              de: "Möbelstücke",
              en: "Furniture",
            },
            ids: ["87b0185c", "ca2f3670", "c424e655", "13cb4480"],
          },
          {
            id: "54f1302a",
            title: {
              de: "Landverkehrsmittel",
              en: "Land transport",
            },
            ids: ["9e938c72", "d99f8cdc", "fbc5b61e", "12288018"],
          },
          {
            id: "7bafd0ec",
            title: {
              de: "Farben",
              en: "Colours",
            },
            ids: ["2584a0d3", "fe9e95bb", "62081e2f", "986681cc"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-b48ece286f",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "39571334",
          text: {
            de: "Jacht",
            en: "Yacht",
          },
        },
        {
          id: "d8bd94fe",
          text: {
            de: "Kanu",
            en: "Canoe",
          },
        },
        {
          id: "645532c9",
          text: {
            de: "Geige",
            en: "Violin",
          },
        },
        {
          id: "d21ebed3",
          text: {
            de: "Gitarre",
            en: "Guitar",
          },
        },
        {
          id: "b1f1030e",
          text: {
            de: "Schlafzimmer",
            en: "Bedroom",
          },
        },
        {
          id: "4ccef067",
          text: {
            de: "Wohnzimmer",
            en: "Living room",
          },
        },
        {
          id: "e152cb4c",
          text: {
            de: "Kajak",
            en: "Kayak",
          },
        },
        {
          id: "7033d988",
          text: {
            de: "Pfirsich",
            en: "Peach",
          },
        },
        {
          id: "001ead5a",
          text: {
            de: "Pflaume",
            en: "Plum",
          },
        },
        {
          id: "2ee0b325",
          text: {
            de: "Badezimmer",
            en: "Bathroom",
          },
        },
        {
          id: "97ed94da",
          text: {
            de: "Küche",
            en: "Kitchen",
          },
        },
        {
          id: "86844265",
          text: {
            de: "Birne",
            en: "Pear",
          },
        },
        {
          id: "968bcea5",
          text: {
            de: "Fähre",
            en: "Ferry",
          },
        },
        {
          id: "dd071b21",
          text: {
            de: "Apfel",
            en: "Apple",
          },
        },
        {
          id: "618ce7d1",
          text: {
            de: "Cello",
            en: "Cello",
          },
        },
        {
          id: "cfca64b9",
          text: {
            de: "Harfe",
            en: "Harp",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "44b4c65e",
            title: {
              de: "Saiteninstrumente",
              en: "String instruments",
            },
            ids: ["645532c9", "618ce7d1", "cfca64b9", "d21ebed3"],
          },
          {
            id: "dfdac11f",
            title: {
              de: "Wohnräume",
              en: "Rooms in a home",
            },
            ids: ["2ee0b325", "97ed94da", "b1f1030e", "4ccef067"],
          },
          {
            id: "624fef9d",
            title: {
              de: "Wasserfahrzeuge",
              en: "Watercraft",
            },
            ids: ["e152cb4c", "d8bd94fe", "39571334", "968bcea5"],
          },
          {
            id: "bafd874e",
            title: {
              de: "Obst",
              en: "Fruit",
            },
            ids: ["dd071b21", "86844265", "7033d988", "001ead5a"],
          },
        ],
        maxAttempts: 4,
      },
    },
    {
      id: "bank-connections-f3a3ca2d88",
      category: "connections",
      difficulty: "hard",
      prompt: {
        de: "Finde Gruppen aus jeweils vier Wörtern, die zusammengehören.",
        en: "Find groups of four words that belong together.",
      },
      answer: "",
      explanation: {
        de: "Jede Gruppe hat ein gemeinsames Thema. Jedes Wort gehört genau zu einer Gruppe.",
        en: "Each group has a shared theme. Every word belongs to exactly one group.",
      },
      options: [
        {
          id: "c13ae306",
          text: {
            de: "Posaune",
            en: "Trombone",
          },
        },
        {
          id: "1bbb550e",
          text: {
            de: "Mars",
            en: "Mars",
          },
        },
        {
          id: "dceeb3cf",
          text: {
            de: "Kartoffel",
            en: "Potato",
          },
        },
        {
          id: "c10d2cfe",
          text: {
            de: "Winter",
            en: "Winter",
          },
        },
        {
          id: "2aff817e",
          text: {
            de: "Horn",
            en: "Horn",
          },
        },
        {
          id: "9144866c",
          text: {
            de: "Karotte",
            en: "Carrot",
          },
        },
        {
          id: "edd9f10d",
          text: {
            de: "Tuba",
            en: "Tuba",
          },
        },
        {
          id: "c23abfe1",
          text: {
            de: "Herbst",
            en: "Autumn",
          },
        },
        {
          id: "981e11be",
          text: {
            de: "Frühling",
            en: "Spring",
          },
        },
        {
          id: "99a2762b",
          text: {
            de: "Sommer",
            en: "Summer",
          },
        },
        {
          id: "91cc7198",
          text: {
            de: "Zwiebel",
            en: "Onion",
          },
        },
        {
          id: "0dc84100",
          text: {
            de: "Venus",
            en: "Venus",
          },
        },
        {
          id: "90aa7a4a",
          text: {
            de: "Neptun",
            en: "Neptune",
          },
        },
        {
          id: "b20e87a5",
          text: {
            de: "Saturn",
            en: "Saturn",
          },
        },
        {
          id: "3dbf7c3c",
          text: {
            de: "Kopfsalat",
            en: "Lettuce",
          },
        },
        {
          id: "146c55bc",
          text: {
            de: "Trompete",
            en: "Trumpet",
          },
        },
      ],
      puzzle: {
        kind: "connections",
        groups: [
          {
            id: "fa67cfc6",
            title: {
              de: "Blechblasinstrumente",
              en: "Brass instruments",
            },
            ids: ["146c55bc", "c13ae306", "edd9f10d", "2aff817e"],
          },
          {
            id: "60f46e46",
            title: {
              de: "Jahreszeiten",
              en: "Seasons",
            },
            ids: ["981e11be", "99a2762b", "c23abfe1", "c10d2cfe"],
          },
          {
            id: "02dc8821",
            title: {
              de: "Planeten",
              en: "Planets",
            },
            ids: ["1bbb550e", "0dc84100", "b20e87a5", "90aa7a4a"],
          },
          {
            id: "89902f89",
            title: {
              de: "Küchengemüse",
              en: "Kitchen vegetables",
            },
            ids: ["9144866c", "dceeb3cf", "91cc7198", "3dbf7c3c"],
          },
        ],
        maxAttempts: 4,
      },
    },
  ],
  wavelength: [
    {
      id: "bank-wavelength-b2398bb891",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Kalt",
          en: "Cold",
        },
        right: {
          de: "Heiß",
          en: "Hot",
        },
        target: 75,
        fallbackClue: {
          de: "Frisch aufgebrühter Tee",
          en: "Freshly brewed tea",
        },
      },
    },
    {
      id: "bank-wavelength-5effbe42e6",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Leise",
          en: "Quiet",
        },
        right: {
          de: "Laut",
          en: "Loud",
        },
        target: 22,
        fallbackClue: {
          de: "Ein Flüstern in einer Bibliothek",
          en: "A whisper in a library",
        },
      },
    },
    {
      id: "bank-wavelength-00ea534080",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Klein",
          en: "Small",
        },
        right: {
          de: "Groß",
          en: "Large",
        },
        target: 24,
        fallbackClue: {
          de: "Eine Ameise neben einem Menschen",
          en: "An ant beside a person",
        },
      },
    },
    {
      id: "bank-wavelength-a2049bca72",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Langsam",
          en: "Slow",
        },
        right: {
          de: "Schnell",
          en: "Fast",
        },
        target: 77,
        fallbackClue: {
          de: "Ein vorbeifahrender Rennwagen",
          en: "A racing car going past",
        },
      },
    },
    {
      id: "bank-wavelength-08b804bac0",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Leicht",
          en: "Light",
        },
        right: {
          de: "Schwer",
          en: "Heavy",
        },
        target: 76,
        fallbackClue: {
          de: "Ein voll beladener Umzugskarton",
          en: "A fully loaded moving box",
        },
      },
    },
    {
      id: "bank-wavelength-bde40ed07c",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Hell",
          en: "Bright",
        },
        right: {
          de: "Dunkel",
          en: "Dark",
        },
        target: 24,
        fallbackClue: {
          de: "Eine sonnige Terrasse am Mittag",
          en: "A sunny terrace at noon",
        },
      },
    },
    {
      id: "bank-wavelength-2bc1833fb7",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Glatt",
          en: "Smooth",
        },
        right: {
          de: "Rau",
          en: "Rough",
        },
        target: 74,
        fallbackClue: {
          de: "Grobes Schleifpapier",
          en: "Coarse sandpaper",
        },
      },
    },
    {
      id: "bank-wavelength-024eca2237",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Trocken",
          en: "Dry",
        },
        right: {
          de: "Nass",
          en: "Wet",
        },
        target: 78,
        fallbackClue: {
          de: "Ein frisch aus dem Wasser gehobener Schwamm",
          en: "A sponge just lifted out of water",
        },
      },
    },
    {
      id: "bank-wavelength-3f392dc987",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Weich",
          en: "Soft",
        },
        right: {
          de: "Hart",
          en: "Hard",
        },
        target: 23,
        fallbackClue: {
          de: "Ein flauschiges Sofakissen",
          en: "A fluffy sofa cushion",
        },
      },
    },
    {
      id: "bank-wavelength-f6de2cfbfd",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Süß",
          en: "Sweet",
        },
        right: {
          de: "Sauer",
          en: "Sour",
        },
        target: 77,
        fallbackClue: {
          de: "Ein Bissen in eine frische Zitrone",
          en: "A bite of a fresh lemon",
        },
      },
    },
    {
      id: "bank-wavelength-e6725bd94b",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Bitter",
          en: "Bitter",
        },
        right: {
          de: "Süß",
          en: "Sweet",
        },
        target: 75,
        fallbackClue: {
          de: "Ein Löffel Honig",
          en: "A spoonful of honey",
        },
      },
    },
    {
      id: "bank-wavelength-6337cdcb23",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Natürlich",
          en: "Natural",
        },
        right: {
          de: "Künstlich",
          en: "Artificial",
        },
        target: 24,
        fallbackClue: {
          de: "Ein vom Baum gefallener Apfel",
          en: "An apple fallen from a tree",
        },
      },
    },
    {
      id: "bank-wavelength-dc86ec8ee9",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Billig",
          en: "Inexpensive",
        },
        right: {
          de: "Teuer",
          en: "Expensive",
        },
        target: 78,
        fallbackClue: {
          de: "Ein neues Luxusauto",
          en: "A new luxury car",
        },
      },
    },
    {
      id: "bank-wavelength-140ccd9db3",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Einfach",
          en: "Simple",
        },
        right: {
          de: "Komplex",
          en: "Complex",
        },
        target: 23,
        fallbackClue: {
          de: "Ein Lichtschalter mit zwei Stellungen",
          en: "A light switch with two positions",
        },
      },
    },
    {
      id: "bank-wavelength-c476b881ea",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Altmodisch",
          en: "Old-fashioned",
        },
        right: {
          de: "Modern",
          en: "Modern",
        },
        target: 75,
        fallbackClue: {
          de: "Ein kontaktloses Smartphone-Ticket",
          en: "A contactless smartphone ticket",
        },
      },
    },
    {
      id: "bank-wavelength-372fc170a8",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Alltäglich",
          en: "Everyday",
        },
        right: {
          de: "Selten",
          en: "Rare",
        },
        target: 25,
        fallbackClue: {
          de: "Morgens die Zähne putzen",
          en: "Brushing your teeth in the morning",
        },
      },
    },
    {
      id: "bank-wavelength-699efe87be",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Nah",
          en: "Near",
        },
        right: {
          de: "Fern",
          en: "Far",
        },
        target: 79,
        fallbackClue: {
          de: "Eine andere Galaxie",
          en: "Another galaxy",
        },
      },
    },
    {
      id: "bank-wavelength-e66d943b51",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Kurz",
          en: "Short",
        },
        right: {
          de: "Lang",
          en: "Long",
        },
        target: 23,
        fallbackClue: {
          de: "Eine einzelne Textnachricht",
          en: "A single text message",
        },
      },
    },
    {
      id: "bank-wavelength-b8cedfcb8f",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Rund",
          en: "Round",
        },
        right: {
          de: "Eckig",
          en: "Angular",
        },
        target: 78,
        fallbackClue: {
          de: "Ein Würfel aus Holz",
          en: "A wooden cube",
        },
      },
    },
    {
      id: "bank-wavelength-63246e52d0",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Leer",
          en: "Empty",
        },
        right: {
          de: "Voll",
          en: "Full",
        },
        target: 76,
        fallbackClue: {
          de: "Ein zu drei Vierteln gefülltes Glas",
          en: "A glass three-quarters full",
        },
      },
    },
    {
      id: "bank-wavelength-04fc844b16",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Privat",
          en: "Private",
        },
        right: {
          de: "Öffentlich",
          en: "Public",
        },
        target: 77,
        fallbackClue: {
          de: "Eine Ankündigung am Bahnhof",
          en: "An announcement at a railway station",
        },
      },
    },
    {
      id: "bank-wavelength-b7f307f8d3",
      category: "wavelength",
      difficulty: "easy",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Einfarbig",
          en: "One colour",
        },
        right: {
          de: "Bunt",
          en: "Colourful",
        },
        target: 79,
        fallbackClue: {
          de: "Eine Schachtel mit vielen Buntstiften",
          en: "A box of many coloured pencils",
        },
      },
    },
    {
      id: "bank-wavelength-b7b2d99780",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Geplant",
          en: "Planned",
        },
        right: {
          de: "Spontan",
          en: "Spontaneous",
        },
        target: 60,
        fallbackClue: {
          de: "Ein Ausflug, den man am Frühstückstisch beschließt",
          en: "A trip decided over breakfast",
        },
      },
    },
    {
      id: "bank-wavelength-6e715c824c",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Praktisch",
          en: "Practical",
        },
        right: {
          de: "Dekorativ",
          en: "Decorative",
        },
        target: 68,
        fallbackClue: {
          de: "Eine kleine Vase mit Trockenblumen",
          en: "A small vase of dried flowers",
        },
      },
    },
    {
      id: "bank-wavelength-753149c2b4",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Robust",
          en: "Robust",
        },
        right: {
          de: "Zerbrechlich",
          en: "Fragile",
        },
        target: 70,
        fallbackClue: {
          de: "Ein dünnes Weinglas",
          en: "A thin wine glass",
        },
      },
    },
    {
      id: "bank-wavelength-b517be7114",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Traditionell",
          en: "Traditional",
        },
        right: {
          de: "Experimentell",
          en: "Experimental",
        },
        target: 62,
        fallbackClue: {
          de: "Pizza mit ungewöhnlichen neuen Zutaten",
          en: "Pizza with unusual new ingredients",
        },
      },
    },
    {
      id: "bank-wavelength-dbfa157ce8",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Ordentlich",
          en: "Tidy",
        },
        right: {
          de: "Chaotisch",
          en: "Chaotic",
        },
        target: 65,
        fallbackClue: {
          de: "Ein Basteltisch mitten im Projekt",
          en: "A craft table halfway through a project",
        },
      },
    },
    {
      id: "bank-wavelength-d41ba6ca34",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Bequem",
          en: "Comfortable",
        },
        right: {
          de: "Unbequem",
          en: "Uncomfortable",
        },
        target: 33,
        fallbackClue: {
          de: "Ein gut eingestellter Bürostuhl",
          en: "A well-adjusted office chair",
        },
      },
    },
    {
      id: "bank-wavelength-697c30d40e",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Erfrischend",
          en: "Refreshing",
        },
        right: {
          de: "Sättigend",
          en: "Filling",
        },
        target: 67,
        fallbackClue: {
          de: "Eine warme Schüssel Kartoffelsuppe",
          en: "A warm bowl of potato soup",
        },
      },
    },
    {
      id: "bank-wavelength-3054e0ae75",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Persönlich",
          en: "Personal",
        },
        right: {
          de: "Unpersönlich",
          en: "Impersonal",
        },
        target: 39,
        fallbackClue: {
          de: "Eine Geburtstagskarte für einen Kollegen",
          en: "A birthday card for a colleague",
        },
      },
    },
    {
      id: "bank-wavelength-945f888ecd",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Statisch",
          en: "Static",
        },
        right: {
          de: "Beweglich",
          en: "Mobile",
        },
        target: 64,
        fallbackClue: {
          de: "Ein Bürostuhl auf Rollen",
          en: "An office chair on wheels",
        },
      },
    },
    {
      id: "bank-wavelength-11f9ccc600",
      category: "wavelength",
      difficulty: "medium",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Vertraut",
          en: "Familiar",
        },
        right: {
          de: "Ungewöhnlich",
          en: "Unusual",
        },
        target: 61,
        fallbackClue: {
          de: "Ein vertrautes Lied auf einem neuen Instrument",
          en: "A familiar song on a new instrument",
        },
      },
    },
    {
      id: "bank-wavelength-f4844f868b",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Wörtlich",
          en: "Literal",
        },
        right: {
          de: "Bildlich",
          en: "Figurative",
        },
        target: 70,
        fallbackClue: {
          de: "„Ich habe Schmetterlinge im Bauch“",
          en: "“I have butterflies in my stomach”",
        },
      },
    },
    {
      id: "bank-wavelength-bcfb47e10a",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Nützlich",
          en: "Useful",
        },
        right: {
          de: "Unterhaltsam",
          en: "Entertaining",
        },
        target: 57,
        fallbackClue: {
          de: "Ein Quiz während einer kurzen Pause",
          en: "A quiz during a short break",
        },
      },
    },
    {
      id: "bank-wavelength-4ff3fb7474",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Sachbuch",
          en: "Non-fiction",
        },
        right: {
          de: "Fantasie",
          en: "Fantasy",
        },
        target: 58,
        fallbackClue: {
          de: "Eine Geschichte mit echten Orten und erfundenen Drachen",
          en: "A story with real places and invented dragons",
        },
      },
    },
    {
      id: "bank-wavelength-4d4078f758",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Minimalistisch",
          en: "Minimalist",
        },
        right: {
          de: "Detailreich",
          en: "Detailed",
        },
        target: 65,
        fallbackClue: {
          de: "Eine handgezeichnete Stadtkarte mit kleinen Symbolen",
          en: "A hand-drawn city map with small symbols",
        },
      },
    },
    {
      id: "bank-wavelength-ac01a8a460",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Vorhersehbar",
          en: "Predictable",
        },
        right: {
          de: "Überraschend",
          en: "Surprising",
        },
        target: 69,
        fallbackClue: {
          de: "Ein kleines unerwartetes Geschenk an einem normalen Tag",
          en: "A small unexpected gift on an ordinary day",
        },
      },
    },
    {
      id: "bank-wavelength-ff60d59b38",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Direkt",
          en: "Direct",
        },
        right: {
          de: "Indirekt",
          en: "Indirect",
        },
        target: 63,
        fallbackClue: {
          de: "„Vielleicht könnten wir das Fenster öffnen?“",
          en: "“Perhaps we could open the window?”",
        },
      },
    },
    {
      id: "bank-wavelength-4bd34fffde",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Individuell",
          en: "Individual",
        },
        right: {
          de: "Gemeinschaftlich",
          en: "Shared",
        },
        target: 67,
        fallbackClue: {
          de: "Eine Playlist, zu der jeder einen Titel beiträgt",
          en: "A playlist to which everyone adds a track",
        },
      },
    },
    {
      id: "bank-wavelength-fdf47bd428",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Formell",
          en: "Formal",
        },
        right: {
          de: "Locker",
          en: "Casual",
        },
        target: 58,
        fallbackClue: {
          de: "Ein freundliches Gespräch nach der Arbeit",
          en: "A friendly conversation after work",
        },
      },
    },
    {
      id: "bank-wavelength-edc0e24aba",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Handgemacht",
          en: "Handmade",
        },
        right: {
          de: "Maschinell",
          en: "Machine-made",
        },
        target: 38,
        fallbackClue: {
          de: "Eine mit der Maschine genähte und von Hand bestickte Tasche",
          en: "A machine-sewn bag embroidered by hand",
        },
      },
    },
    {
      id: "bank-wavelength-7084b565f5",
      category: "wavelength",
      difficulty: "hard",
      prompt: {
        de: "Wo liegt der Hinweis auf der Skala?",
        en: "Where does the clue belong on the scale?",
      },
      answer: "",
      explanation: {
        de: "Die Zielposition wurde für diese Runde festgelegt. Hinweise sind bildhaft und können unterschiedlich interpretiert werden; die Entfernung zum Ziel entscheidet.",
        en: "The target position was fixed for this round. Clues are illustrative and may be interpreted differently; distance from the target determines the score.",
      },
      puzzle: {
        kind: "wavelength",
        left: {
          de: "Ausdauer",
          en: "Endurance",
        },
        right: {
          de: "Geschick",
          en: "Dexterity",
        },
        target: 67,
        fallbackClue: {
          de: "Jonglieren für ein paar Minuten",
          en: "Juggling for a few minutes",
        },
      },
    },
  ],
  memory: [
    {
      id: "bank-memory-a606fefe52",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "▲", "●", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-3da53a1b5c",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "●", "◆", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-38d7c9a499",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "◆", "■", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-cbb3a10715",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "▲", "■", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-5faa4d4823",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "◆", "■", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-935a5cf654",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "▲", "▲", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-aed5ecbdd9",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "◆", "■", "◆"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-cb5ec778d9",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "●", "◆", "▲"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-99c88cee1b",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "■", "▲"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-44ccacb4d9",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "◆", "▲", "▲"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-7743a05a75",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "●", "■", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-7955b5d0d4",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "▲", "◆"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-ef015cb09a",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "●", "▲", "◆"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-4210f8d21b",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "●", "●", "▲"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-50d6eab21b",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "●", "▲", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-01889b9801",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "▲", "■", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-cd730bd81d",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "▲", "●", "◆"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-6529d1e1e6",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "■", "■", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-b6da1c2d80",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "■", "▲", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-7a1d599283",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "▲", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-6f2b020636",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "▲", "●", "■"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-af7fcba618",
      category: "memory",
      difficulty: "easy",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["■", "●", "◆", "●"],
        symbols: ["●", "▲", "■", "◆"],
        previewMs: 4000,
      },
    },
    {
      id: "bank-memory-bebf5d9e30",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "◆", "■", "★", "★"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-a8f343acc4",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "⬟", "★", "⬟", "◆"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-e7b8e9793b",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "●", "■", "★", "⬟"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-0d6fd6498f",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "▲", "■", "★", "★"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-6d8f63409e",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["◆", "■", "▲", "▲", "●"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-03e5a9eee8",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["⬟", "◆", "●", "⬟", "●"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-b7651d510b",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["★", "⬟", "■", "★", "⬟"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-c3fea3e29d",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "▲", "⬟", "★"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-b0bdcb5008",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["★", "★", "▲", "★", "⬟"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-221313d28d",
      category: "memory",
      difficulty: "medium",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "◆", "●", "⬟"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟"],
        previewMs: 3500,
      },
    },
    {
      id: "bank-memory-3ca09bcc79",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["⬢", "◆", "✚", "✚", "▲", "★"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-be4285c3a3",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["⬟", "●", "◆", "●", "⬢", "◆"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-9c849ff813",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "■", "⬢", "■", "■", "⬢"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-5b86aa9ebd",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["⬟", "✚", "✚", "⬟", "■", "▲"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-b6968a5234",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["▲", "●", "⬢", "⬢", "⬟", "▲"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-5fe7831c49",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "★", "⬟", "★", "✚", "★"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-7c8e06b641",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "⬟", "⬟", "■", "◆", "▲"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-0ec52165b5",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["⬢", "■", "▲", "◆", "▲", "✚"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-eeef747eac",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "●", "●", "●", "✚", "⬢"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
    {
      id: "bank-memory-f3b4a29050",
      category: "memory",
      difficulty: "hard",
      prompt: {
        de: "Merke dir die Symbolfolge. Gib sie nach dem Ausblenden in derselben Reihenfolge ein.",
        en: "Memorize the symbol sequence. Enter it in the same order after it disappears.",
      },
      answer: "",
      explanation: {
        de: "Die Reihenfolge und jedes wiederholte Symbol zählen. Die Vorschau wird beim Neuladen nicht verlängert.",
        en: "Order and every repeated symbol matter. Reloading does not extend the preview.",
      },
      puzzle: {
        kind: "memory",
        sequence: ["●", "●", "■", "⬟", "⬟", "⬟"],
        symbols: ["●", "▲", "■", "◆", "★", "⬟", "✚", "⬢"],
        previewMs: 3000,
      },
    },
  ],
  wordle: [
    {
      id: "bank-wordle-2eeb3a11ce",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "APPLE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-3c7871ba58",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "BREAD",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-a7329cccb4",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "CHAIR",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-ca0ca3e5f4",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "DANCE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-31a1cb3e5f",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "EARTH",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-c735058374",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "FRUIT",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-cb69b2f1e6",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "GRAPE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-51437cbb61",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "HOUSE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-55a81d8e14",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "JUICE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-dbad6c7c3d",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "KNIFE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-9bb0e5beed",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "LEMON",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-b46323265e",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "MUSIC",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-2da0cdcf70",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "NIGHT",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-808c4f88b8",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "OCEAN",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-b5d4e15987",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "PAPER",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-87f859d306",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "QUEEN",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-ab27039294",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "RIVER",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-36d96e8d98",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "SMILE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-c946025070",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "TABLE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-68fc969ab6",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "TRAIN",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-1fc82967ef",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "WATER",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-3c3a3e1906",
      category: "wordle",
      difficulty: "easy",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "ZEBRA",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-28415793be",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "BEACH",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-96dd70d749",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "CROWN",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-048b3424b2",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "DREAM",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-6e195732e5",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "FLAME",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-5dfd643884",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "GLASS",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-3b36b471d7",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "LIGHT",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-75c49bfdd9",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "PLANT",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-cb7a615897",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "SHIRT",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-536c30528a",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "STONE",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-52fb9d8a25",
      category: "wordle",
      difficulty: "medium",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "TIGER",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-54fb3e1e65",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "BLOOM",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-67d0f76a22",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "BRUSH",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-882656d9e6",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "CHESS",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-78dd3ddfc6",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "CLOUD",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-9ad97d1c2c",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "FROST",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-1682b00eae",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "GHOST",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-f382f5317e",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "HONEY",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-98fa238adb",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "PEARL",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-674a935f85",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "SHEEP",
        maxAttempts: 6,
      },
    },
    {
      id: "bank-wordle-6182ec7910",
      category: "wordle",
      difficulty: "hard",
      prompt: {
        de: "Finde das englische Wort mit fünf Buchstaben. Das Wort ist für alle Sprachen gleich.",
        en: "Find the five-letter English word. The word is the same in every language.",
      },
      answer: "",
      explanation: {
        de: "Grün: richtiger Platz. Gelb: anderer Platz. Grau: kein weiterer Treffer. Wiederholte Buchstaben werden nur so oft markiert, wie sie im Wort vorkommen.",
        en: "Green: correct position. Yellow: another position. Grey: no further match. Repeated letters are marked only as often as they occur in the word.",
      },
      puzzle: {
        kind: "wordle",
        allowed: wordleDictionary,
        word: "WHEEL",
        maxAttempts: 6,
      },
    },
  ],
  countries: [
    {
      id: "bank-countries-6ec416ec59",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "31a04c7f",
      explanation: {
        de: "Dargestellt ist Deutschland. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Germany. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "c919a643",
          text: {
            de: "Südafrika",
            en: "South Africa",
          },
        },
        {
          id: "85f23009",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
        {
          id: "6bf4fa7f",
          text: {
            de: "Polen",
            en: "Poland",
          },
        },
        {
          id: "31a04c7f",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
      ],
      source: "https://www.gesetze-im-internet.de/englisch_gg/englisch_gg.html",
      puzzle: {
        kind: "countries",
        image: "/countries/7a1e8a84af4ae5.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-104c484246",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "159cdd38",
      explanation: {
        de: "Dargestellt ist Frankreich. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is France. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "0102a15c",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
        {
          id: "159cdd38",
          text: {
            de: "Frankreich",
            en: "France",
          },
        },
        {
          id: "f00203b2",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "16fcc8e2",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
      ],
      source: "https://www.elysee.fr/en/french-presidency/the-french-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/33590585ff43d0.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-1f49356c6e",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "e0a7715c",
      explanation: {
        de: "Dargestellt ist Italien. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Italy. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "2dcf2422",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
        {
          id: "4612253b",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "e0a7715c",
          text: {
            de: "Italien",
            en: "Italy",
          },
        },
        {
          id: "a59aed78",
          text: {
            de: "Tschechien",
            en: "Czechia",
          },
        },
      ],
      source:
        "https://www.senato.it/istituzione/la-costituzione/principi-fondamentali/articolo-12",
      puzzle: {
        kind: "countries",
        image: "/countries/c55e1ac48c2139.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-fc042e9d3b",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "a8eb55a0",
      explanation: {
        de: "Dargestellt ist Japan. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Japan. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "a00bacca",
          text: {
            de: "Tschechien",
            en: "Czechia",
          },
        },
        {
          id: "a8eb55a0",
          text: {
            de: "Japan",
            en: "Japan",
          },
        },
        {
          id: "ac56e95f",
          text: {
            de: "Italien",
            en: "Italy",
          },
        },
        {
          id: "7eb6fcf5",
          text: {
            de: "Brasilien",
            en: "Brazil",
          },
        },
      ],
      source: "https://www.japan.go.jp/japan/flagandanthem/index.html",
      puzzle: {
        kind: "countries",
        image: "/countries/459d05082b2b57.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-7a93df6f5c",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "97002818",
      explanation: {
        de: "Dargestellt ist Österreich. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Austria. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "7781983d",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "dbfca251",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
        {
          id: "0cb53e72",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "97002818",
          text: {
            de: "Österreich",
            en: "Austria",
          },
        },
      ],
      source: "https://www.ris.bka.gv.at/eli/bgbl/1930/1/A8a/NOR40045733",
      puzzle: {
        kind: "countries",
        image: "/countries/60f14b688f6ca8.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-97491ce40b",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "dd1fd9a2",
      explanation: {
        de: "Dargestellt ist Polen. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Poland. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "dd1fd9a2",
          text: {
            de: "Polen",
            en: "Poland",
          },
        },
        {
          id: "5ce62c01",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
        {
          id: "588196da",
          text: {
            de: "Island",
            en: "Iceland",
          },
        },
        {
          id: "18bfa1bd",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
      ],
      source: "https://www.gov.pl/web/diplomacy/polands-day-of-the-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/323373f9fff172.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-e39cc1df38",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "ad30d2ee",
      explanation: {
        de: "Dargestellt ist Ukraine. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Ukraine. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "686b34a4",
          text: {
            de: "Brasilien",
            en: "Brazil",
          },
        },
        {
          id: "ffd84849",
          text: {
            de: "Portugal",
            en: "Portugal",
          },
        },
        {
          id: "1a9250fb",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "ad30d2ee",
          text: {
            de: "Ukraine",
            en: "Ukraine",
          },
        },
      ],
      source:
        "https://www.president.gov.ua/ua/documents/constitution/konstituciya-ukrayini-rozdil-i",
      puzzle: {
        kind: "countries",
        image: "/countries/c774acace86886.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-38be16e1a5",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "893e186e",
      explanation: {
        de: "Dargestellt ist Schweiz. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Switzerland. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "c3a5d2e6",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
        {
          id: "5fc79918",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
        {
          id: "a4a10398",
          text: {
            de: "Madagaskar",
            en: "Madagascar",
          },
        },
        {
          id: "893e186e",
          text: {
            de: "Schweiz",
            en: "Switzerland",
          },
        },
      ],
      source: "https://www.aboutswitzerland.eda.admin.ch/en/swiss-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/4b2d676a91c854.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-329a383634",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "cb1e46ef",
      explanation: {
        de: "Dargestellt ist Dänemark. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Denmark. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "cb1e46ef",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "742e8821",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
        {
          id: "aa5cd8d8",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "58dddd0e",
          text: {
            de: "Finnland",
            en: "Finland",
          },
        },
      ],
      source: "https://www.norden.org/en/information/danish-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/62b635fdf5a805.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-596b0cbbb0",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "19ae508f",
      explanation: {
        de: "Dargestellt ist Schweden. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Sweden. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "19ae508f",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "131555d3",
          text: {
            de: "Finnland",
            en: "Finland",
          },
        },
        {
          id: "df12b70f",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
        {
          id: "d70dc054",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
      ],
      source: "https://www.norden.org/en/information/swedish-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/a78a9a336ad62d.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-1cd14c600a",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "3d82394d",
      explanation: {
        de: "Dargestellt ist Finnland. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Finland. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "3d82394d",
          text: {
            de: "Finnland",
            en: "Finland",
          },
        },
        {
          id: "4a145285",
          text: {
            de: "Thailand",
            en: "Thailand",
          },
        },
        {
          id: "7d39765d",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
        {
          id: "69dab0d2",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
      ],
      source: "https://www.norden.org/en/information/finnish-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/4057f775582034.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-0085823856",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "9d01cf83",
      explanation: {
        de: "Dargestellt ist Norwegen. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Norway. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "bc6a6a42",
          text: {
            de: "Portugal",
            en: "Portugal",
          },
        },
        {
          id: "9d01cf83",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
        {
          id: "0cd4d13f",
          text: {
            de: "Ungarn",
            en: "Hungary",
          },
        },
        {
          id: "ea94b75d",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
      ],
      source: "https://www.norden.org/en/information/norwegian-flag",
      puzzle: {
        kind: "countries",
        image: "/countries/fb96ca8624fab5.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-4a8a3a34b7",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "d9206904",
      explanation: {
        de: "Dargestellt ist Island. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Iceland. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "a908fb0e",
          text: {
            de: "Kuba",
            en: "Cuba",
          },
        },
        {
          id: "a2fac1cd",
          text: {
            de: "Italien",
            en: "Italy",
          },
        },
        {
          id: "c8fd313b",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "d9206904",
          text: {
            de: "Island",
            en: "Iceland",
          },
        },
      ],
      source:
        "https://www.stjornarradid.is/verkefni/stjornskipan-og-thjodartakn/thjodartakn/fani-islands/",
      puzzle: {
        kind: "countries",
        image: "/countries/dc2c813684100a.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-2d1d024e35",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "b9a77685",
      explanation: {
        de: "Dargestellt ist Niederlande. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Netherlands. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "229f4691",
          text: {
            de: "Vereinigtes Königreich",
            en: "United Kingdom",
          },
        },
        {
          id: "8fad8a0a",
          text: {
            de: "Italien",
            en: "Italy",
          },
        },
        {
          id: "846804df",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
        {
          id: "b9a77685",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
      ],
      source:
        "https://www.koninklijkhuis.nl/onderwerpen/koninklijk-huis/vlaggen-en-vlaginstructie/nederlandse-vlag",
      puzzle: {
        kind: "countries",
        image: "/countries/5d2121b5ee165a.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-612c2b28e4",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "8d1bfee4",
      explanation: {
        de: "Dargestellt ist Belgien. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Belgium. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "74d90a06",
          text: {
            de: "Ungarn",
            en: "Hungary",
          },
        },
        {
          id: "2e8edf9d",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "7c383c67",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "8d1bfee4",
          text: {
            de: "Belgien",
            en: "Belgium",
          },
        },
      ],
      source:
        "https://www.belgium.be/en/about_belgium/country/belgium_in_nutshell/symbols/flags",
      puzzle: {
        kind: "countries",
        image: "/countries/285463a2c9e162.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-da6546d262",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "7eae9e1e",
      explanation: {
        de: "Dargestellt ist Irland. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Ireland. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "e70c8d20",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "7eae9e1e",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
        {
          id: "5c9c21fc",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
        {
          id: "6ace48e3",
          text: {
            de: "Belgien",
            en: "Belgium",
          },
        },
      ],
      source:
        "https://www.military.ie/en/public-information/defence-forces-museums/defence-forces-history/the-national-flag/",
      puzzle: {
        kind: "countries",
        image: "/countries/4f802eca8cc6ae.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-dd1a5a4e60",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "6bea06f5",
      explanation: {
        de: "Dargestellt ist Ungarn. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Hungary. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "ea8dcc83",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "5f3f7484",
          text: {
            de: "Schweiz",
            en: "Switzerland",
          },
        },
        {
          id: "c41a0f01",
          text: {
            de: "Polen",
            en: "Poland",
          },
        },
        {
          id: "6bea06f5",
          text: {
            de: "Ungarn",
            en: "Hungary",
          },
        },
      ],
      source: "https://njt.jog.gov.hu/jogszabaly/en/2011-4301-02-00",
      puzzle: {
        kind: "countries",
        image: "/countries/826e5c73a3cddf.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-17b2845ef2",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "e7c255d8",
      explanation: {
        de: "Dargestellt ist Rumänien. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Romania. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "e7c255d8",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "8ac98b7e",
          text: {
            de: "Ukraine",
            en: "Ukraine",
          },
        },
        {
          id: "3f193b39",
          text: {
            de: "Ungarn",
            en: "Hungary",
          },
        },
        {
          id: "8ae2ba7b",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
      ],
      source: "https://www.cdep.ro/ords/pls/dic/site.page?id=256&idl=2&par1=1",
      puzzle: {
        kind: "countries",
        image: "/countries/ba54d3606cac5b.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-0c4395cc66",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "cc6daec0",
      explanation: {
        de: "Dargestellt ist Luxemburg. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Luxembourg. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "242c551b",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
        {
          id: "bced4886",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
        {
          id: "37b8f51b",
          text: {
            de: "Frankreich",
            en: "France",
          },
        },
        {
          id: "cc6daec0",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
      ],
      source:
        "https://luxembourg.public.lu/en/societe-et-culture/systeme-politique/symboles-nationaux.html",
      puzzle: {
        kind: "countries",
        image: "/countries/04c2f5c0bd079a.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-7a3bc13465",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "b60e7b16",
      explanation: {
        de: "Dargestellt ist Estland. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Estonia. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "d09bbfdf",
          text: {
            de: "Griechenland",
            en: "Greece",
          },
        },
        {
          id: "7ff3c156",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
        {
          id: "b60e7b16",
          text: {
            de: "Estland",
            en: "Estonia",
          },
        },
        {
          id: "d0d52b8b",
          text: {
            de: "Portugal",
            en: "Portugal",
          },
        },
      ],
      source:
        "https://www.riigikogu.ee/en/pressiteated/100-years-ago-blue-black-white-flag-raised-first-time-national-flag/",
      puzzle: {
        kind: "countries",
        image: "/countries/bd1faf30f6a0b4.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-348a8a394d",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "63bafbeb",
      explanation: {
        de: "Dargestellt ist Litauen. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Lithuania. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "1678f203",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "650b9e8d",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
        {
          id: "63bafbeb",
          text: {
            de: "Litauen",
            en: "Lithuania",
          },
        },
        {
          id: "c4c9b11f",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
      ],
      source:
        "https://www.lrs.lt/sip/portal.show?p_a=1710&p_k=2&p_kade_id=9&p_r=35580",
      puzzle: {
        kind: "countries",
        image: "/countries/0b8500aff8efe5.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-04662f10db",
      category: "countries",
      difficulty: "easy",
      prompt: {
        de: "Welches Land zeigt diese Flagge?",
        en: "Which country does this flag represent?",
      },
      answer: "d47410b9",
      explanation: {
        de: "Dargestellt ist Tschechien. Die Flagge wurde anhand einer amtlichen Referenz gezeichnet.",
        en: "This is Czechia. The flag was drawn using an official reference.",
      },
      options: [
        {
          id: "d47410b9",
          text: {
            de: "Tschechien",
            en: "Czechia",
          },
        },
        {
          id: "db2b6c15",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
        {
          id: "a739f25b",
          text: {
            de: "Neuseeland",
            en: "New Zealand",
          },
        },
        {
          id: "dc9f94c5",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
      ],
      source:
        "https://vlada.gov.cz/en/clenove-vlady/historie-minulych-vlad/historie-statni-vlajky/the-czech-republics-national-flag-19198/",
      puzzle: {
        kind: "countries",
        image: "/countries/f584cbe3bea2f8.svg",
        imageKind: "flag",
      },
    },
    {
      id: "bank-countries-fd67638bb4",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "3891384b",
      explanation: {
        de: "Dargestellt ist Italien. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Italy. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "27f5fe01",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
        {
          id: "aa6cdf5d",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "f9e13154",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "3891384b",
          text: {
            de: "Italien",
            en: "Italy",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/8d1258e32409f5.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-d8890ee79e",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "de5cd76f",
      explanation: {
        de: "Dargestellt ist Japan. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Japan. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "0c17cad5",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
        {
          id: "7e9d3770",
          text: {
            de: "Litauen",
            en: "Lithuania",
          },
        },
        {
          id: "de5cd76f",
          text: {
            de: "Japan",
            en: "Japan",
          },
        },
        {
          id: "486d745d",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/eb9096208c2767.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-f4ec1f0a11",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "2d8a5985",
      explanation: {
        de: "Dargestellt ist Chile. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Chile. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "f4fdbcc5",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
        {
          id: "01d4f09b",
          text: {
            de: "Südafrika",
            en: "South Africa",
          },
        },
        {
          id: "bd45f0a8",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "2d8a5985",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/c80080e3e2839c.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-1ae143502d",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "540386a8",
      explanation: {
        de: "Dargestellt ist Brasilien. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Brazil. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "970168a2",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "472c034f",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
        {
          id: "5a3b3193",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "540386a8",
          text: {
            de: "Brasilien",
            en: "Brazil",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/fde1c1b5f34105.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-d4f5cfbfab",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "b1a4252d",
      explanation: {
        de: "Dargestellt ist Australien. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Australia. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "b1a4252d",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
        {
          id: "0fa6a734",
          text: {
            de: "Spanien",
            en: "Spain",
          },
        },
        {
          id: "05d9821e",
          text: {
            de: "Island",
            en: "Iceland",
          },
        },
        {
          id: "b989f744",
          text: {
            de: "Schweiz",
            en: "Switzerland",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/e230943798d000.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-72aaa4e253",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "ef65eba9",
      explanation: {
        de: "Dargestellt ist Vereinigtes Königreich. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is United Kingdom. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "ef65eba9",
          text: {
            de: "Vereinigtes Königreich",
            en: "United Kingdom",
          },
        },
        {
          id: "340aec01",
          text: {
            de: "Island",
            en: "Iceland",
          },
        },
        {
          id: "f0a52c5a",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
        {
          id: "b4bd94c4",
          text: {
            de: "Österreich",
            en: "Austria",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/2d29481fb7a2e0.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-9b8923bdd0",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "bc82478c",
      explanation: {
        de: "Dargestellt ist Argentinien. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Argentina. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "b036615e",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
        {
          id: "bc82478c",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "0c83c7a8",
          text: {
            de: "Belgien",
            en: "Belgium",
          },
        },
        {
          id: "7abd47a5",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/2c0d9aa367b283.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-32072da75f",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "b736c361",
      explanation: {
        de: "Dargestellt ist Neuseeland. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is New Zealand. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "d6b50f64",
          text: {
            de: "Vereinigtes Königreich",
            en: "United Kingdom",
          },
        },
        {
          id: "aa4adbb5",
          text: {
            de: "Argentinien",
            en: "Argentina",
          },
        },
        {
          id: "34740dd6",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
        {
          id: "b736c361",
          text: {
            de: "Neuseeland",
            en: "New Zealand",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/3dc92c774d7cb3.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-35fdd4cf1f",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "00bdecd2",
      explanation: {
        de: "Dargestellt ist Südafrika. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is South Africa. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "321a4c2a",
          text: {
            de: "Thailand",
            en: "Thailand",
          },
        },
        {
          id: "00bdecd2",
          text: {
            de: "Südafrika",
            en: "South Africa",
          },
        },
        {
          id: "b86892d3",
          text: {
            de: "Tschechien",
            en: "Czechia",
          },
        },
        {
          id: "c3f79e22",
          text: {
            de: "Ungarn",
            en: "Hungary",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/fa41573ec770ae.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-45e61d1fe4",
      category: "countries",
      difficulty: "medium",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "8b7c00ec",
      explanation: {
        de: "Dargestellt ist Spanien. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Spain. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "8b7c00ec",
          text: {
            de: "Spanien",
            en: "Spain",
          },
        },
        {
          id: "45be95fe",
          text: {
            de: "Neuseeland",
            en: "New Zealand",
          },
        },
        {
          id: "8a392a99",
          text: {
            de: "Österreich",
            en: "Austria",
          },
        },
        {
          id: "852ab0fb",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/b2e50c77e70371.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-9443ea33e4",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "b82d1b1b",
      explanation: {
        de: "Dargestellt ist Portugal. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Portugal. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "59e00976",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "6bc3f824",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "b82d1b1b",
          text: {
            de: "Portugal",
            en: "Portugal",
          },
        },
        {
          id: "2aaa3539",
          text: {
            de: "Irland",
            en: "Ireland",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/c4b2a08f4ab60a.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-79b43be551",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "a56c4b49",
      explanation: {
        de: "Dargestellt ist Deutschland. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Germany. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "6dd8b81c",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
        {
          id: "03ad0c50",
          text: {
            de: "Schweiz",
            en: "Switzerland",
          },
        },
        {
          id: "a56c4b49",
          text: {
            de: "Deutschland",
            en: "Germany",
          },
        },
        {
          id: "6d4d598d",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/aedf6020847348.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-93dda58168",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "d45386af",
      explanation: {
        de: "Dargestellt ist Schweden. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Sweden. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "d45386af",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "998fd8ca",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "c5b2f8aa",
          text: {
            de: "Tschechien",
            en: "Czechia",
          },
        },
        {
          id: "c26ee9a0",
          text: {
            de: "Frankreich",
            en: "France",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/cb4239b67d51da.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-f52d936d3d",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "36646fa8",
      explanation: {
        de: "Dargestellt ist Madagaskar. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Madagascar. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "8fb54153",
          text: {
            de: "Brasilien",
            en: "Brazil",
          },
        },
        {
          id: "cab735fa",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "5852b533",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "36646fa8",
          text: {
            de: "Madagaskar",
            en: "Madagascar",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/28d7dbe223d647.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-e90d0a069c",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "0fc33d2d",
      explanation: {
        de: "Dargestellt ist Kuba. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Cuba. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "e8fe20b1",
          text: {
            de: "Neuseeland",
            en: "New Zealand",
          },
        },
        {
          id: "e816835c",
          text: {
            de: "Chile",
            en: "Chile",
          },
        },
        {
          id: "78dc29f9",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
        {
          id: "0fc33d2d",
          text: {
            de: "Kuba",
            en: "Cuba",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/30f1b6d16ee261.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-71dc075907",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "0080b93e",
      explanation: {
        de: "Dargestellt ist Vietnam. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Vietnam. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "0080b93e",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
        {
          id: "3a03528b",
          text: {
            de: "Polen",
            en: "Poland",
          },
        },
        {
          id: "2e2efc4a",
          text: {
            de: "Madagaskar",
            en: "Madagascar",
          },
        },
        {
          id: "359cc811",
          text: {
            de: "Südafrika",
            en: "South Africa",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/af299f58eaf9a5.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-a7bad32599",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "ea68c7b5",
      explanation: {
        de: "Dargestellt ist Thailand. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Thailand. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "ea68c7b5",
          text: {
            de: "Thailand",
            en: "Thailand",
          },
        },
        {
          id: "95671840",
          text: {
            de: "Niederlande",
            en: "Netherlands",
          },
        },
        {
          id: "5dea40fe",
          text: {
            de: "Litauen",
            en: "Lithuania",
          },
        },
        {
          id: "87eb6fac",
          text: {
            de: "Luxemburg",
            en: "Luxembourg",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/abeaed35da2b62.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-d4efd38c7e",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "494aee21",
      explanation: {
        de: "Dargestellt ist Finnland. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Finland. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "a396933f",
          text: {
            de: "Dänemark",
            en: "Denmark",
          },
        },
        {
          id: "494aee21",
          text: {
            de: "Finnland",
            en: "Finland",
          },
        },
        {
          id: "b0dbaf8e",
          text: {
            de: "Brasilien",
            en: "Brazil",
          },
        },
        {
          id: "b58da59a",
          text: {
            de: "Rumänien",
            en: "Romania",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/e2556aa4896c7e.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-4ea8df288c",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss?",
        en: "Which country does this simplified outline show?",
      },
      answer: "477be501",
      explanation: {
        de: "Dargestellt ist Griechenland. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Greece. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "dec13128",
          text: {
            de: "Kuba",
            en: "Cuba",
          },
        },
        {
          id: "477be501",
          text: {
            de: "Griechenland",
            en: "Greece",
          },
        },
        {
          id: "7c896b70",
          text: {
            de: "Schweden",
            en: "Sweden",
          },
        },
        {
          id: "2b911d89",
          text: {
            de: "Australien",
            en: "Australia",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/aac38e7ef54624.svg",
        imageKind: "outline",
      },
    },
    {
      id: "bank-countries-38add2af60",
      category: "countries",
      difficulty: "hard",
      prompt: {
        de: "Welches Land zeigt dieser vereinfachte Umriss ohne arktische Außengebiete?",
        en: "Which country does this simplified outline show, excluding Arctic outlying territories?",
      },
      answer: "9f8ae586",
      explanation: {
        de: "Dargestellt ist Norwegen. Der Umriss basiert auf Natural Earth und ist zur besseren Darstellung vereinfacht.",
        en: "This is Norway. The outline is based on Natural Earth and simplified for display.",
      },
      options: [
        {
          id: "9f8ae586",
          text: {
            de: "Norwegen",
            en: "Norway",
          },
        },
        {
          id: "504c5c80",
          text: {
            de: "Ukraine",
            en: "Ukraine",
          },
        },
        {
          id: "5f96fffa",
          text: {
            de: "Japan",
            en: "Japan",
          },
        },
        {
          id: "c5faa8a0",
          text: {
            de: "Vietnam",
            en: "Vietnam",
          },
        },
      ],
      source:
        "https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/",
      puzzle: {
        kind: "countries",
        image: "/countries/fc695da4044926.svg",
        imageKind: "outline",
      },
    },
  ],
};
