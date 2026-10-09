import type { Category, Language } from "../shared/types";

type Guide = {
  goal: string;
  steps: string[];
  example: string;
  scoring: string;
};
export const gameGuides: Record<Language, Record<Category, Guide>> = {
  de: {
    trivia: {
      goal: "Finde die richtige Antwort.",
      steps: [
        "Lies die Frage und die vier Möglichkeiten.",
        "Wähle eine Antwort und logge sie ein.",
      ],
      example: "Wie viele Seiten hat ein Dreieck? → Drei",
      scoring: "Richtig: 1.000 Punkte. Du hast einen Versuch.",
    },
    logic: {
      goal: "Kombiniere die Hinweise.",
      steps: [
        "Alle Informationen, die du brauchst, stehen im Rätsel.",
        "Wähle die Lösung, die alle Bedingungen erfüllt.",
      ],
      example: "A ist vor B, B vor C. Wer ist zuerst? → A",
      scoring: "Richtig: 1.000 Punkte. Die Auflösung erklärt den Lösungsweg.",
    },
    estimate: {
      goal: "Komme der richtigen Zahl möglichst nahe.",
      steps: [
        "Achte auf die Einheit.",
        "Gib deine Schätzung ein und bestätige sie.",
      ],
      example: "Lösung 100, Schätzung 90 → 900 Punkte",
      scoring: "Bis zu 1.000 Punkte, je näher deine Schätzung ist.",
    },
    arithmetic: {
      goal: "Rechne im Kopf.",
      steps: [
        "Beachte Klammern und Punkt vor Strich.",
        "Gib das Ergebnis ein. Ein Versuch.",
      ],
      example: "3 + 4 × 2 = 11",
      scoring: "Genau richtig: 1.000 Punkte.",
    },
    truth: {
      goal: "Prüfe eine Behauptung.",
      steps: [
        "Entscheide dich für wahr oder falsch.",
        "Bestätige deine Auswahl.",
      ],
      example: "Ein Dreieck hat vier Seiten. → Falsch",
      scoring: "Richtig: 1.000 Punkte.",
    },
    order: {
      goal: "Bringe die Karten in die gefragte Reihenfolge.",
      steps: [
        "Ziehe die Karten am Griff. Die Pfeile funktionieren auch.",
        "Erst deine bestätigte Reihenfolge zählt.",
      ],
      example: "Aufsteigend: 9, 2, 5 → 2, 5, 9",
      scoring: "Die komplette Reihenfolge richtig: 1.000 Punkte.",
    },
    drawing: {
      goal: "Eine Person zeichnet, die anderen erraten den Begriff.",
      steps: [
        "Am Stift: zeichne ohne Buchstaben oder Zahlen. Du hast einen Radiergummi.",
        "Beim Raten: gib Tipps ein. Falsche Tipps stehen im Chat, richtige Wörter bleiben geheim.",
      ],
      example: "Ein Kreis mit Sonnenstrahlen → Sonne / sun",
      scoring:
        "Richtig geraten: 1.000 Punkte. Die zeichnende Person erhält 1.000, sobald jemand richtig liegt.",
    },
    association: {
      goal: "Finde die Wörter deines Teams anhand eines Hinweises.",
      steps: [
        "Hinweisgeber sehen die Zielwörter und geben ein Wort auf Deutsch und Englisch.",
        "Die anderen wählen die gesuchte Anzahl Wörter. Zu zweit oder dritt spielt ihr gemeinsam.",
      ],
      example: "Hinweis: Meer / sea → Welle, Strand, Schiff",
      scoring:
        "Alle Zielwörter getroffen: 1.000 Punkte. Ein vorbereiteter Hinweis hilft, falls keiner eingegeben wird.",
    },
    geography: {
      goal: "Finde den Ort in Street View.",
      steps: [
        "Sieh dich um und suche geografische Hinweise.",
        "Setze deine Vermutung auf die Karte und bestätige sie.",
      ],
      example: "Straßenschilder, Vegetation und Architektur helfen.",
      scoring: "Bis zu 1.000 Punkte, je näher du am echten Ort liegst.",
    },
    code: {
      goal: "Knacke den geheimen Zahlencode.",
      steps: [
        "Wähle die Ziffern für deinen Versuch und prüfe ihn.",
        "Das Feedback nennt richtige Positionen und richtige Ziffern an einer anderen Position.",
      ],
      example:
        "1 an richtiger Stelle · 2 an anderer Stelle → Nutze beides für deinen nächsten Versuch.",
      scoring:
        "Code geknackt: 1.000 Punkte. Bis zu sechs Versuche, Ziffern können sich wiederholen.",
    },
    sets: {
      goal: "Finde drei Karten, die zusammenpassen.",
      steps: [
        "Für jedes Merkmal müssen die drei Karten alle gleich oder alle unterschiedlich sein.",
        "Wähle drei Karten und prüfe die Gruppe.",
      ],
      example:
        "Ein Kreis, zwei Quadrate, drei Dreiecke: Form und Anzahl sind jeweils alle verschieden.",
      scoring:
        "Eine gültige Gruppe: 1.000 Punkte. Zwei gleiche und eine andere Eigenschaft passen nicht.",
    },
    connections: {
      goal: "Entdecke die versteckten Gruppen.",
      steps: [
        "Wähle vier Wörter mit einer gemeinsamen Eigenschaft.",
        "Nach einer richtigen Gruppe kannst du die nächste finden. Du hast vier Fehlversuche.",
      ],
      example: "Rot, Blau, Grün, Gelb → Farben",
      scoring: "Jede gefundene Gruppe bringt einen Anteil der 1.000 Punkte.",
    },
    wavelength: {
      goal: "Trefft die gleiche Stelle auf einer Skala.",
      steps: [
        "Eine Person sieht das geheime Ziel und gibt einen Hinweis auf Deutsch und Englisch.",
        "Die anderen platzieren den Hinweis zwischen den beiden Polen. Nach 15 Sekunden hilft ein vorbereiteter Hinweis.",
      ],
      example: "Kalt ↔ heiß, Hinweis: Kaffee. Wo würdest du ihn einordnen?",
      scoring:
        "Je näher am Ziel, desto mehr Punkte, maximal 1.000. Der Hinweisgeber punktet bei einer guten Schätzung.",
    },
    memory: {
      goal: "Merke dir eine Folge von Symbolen.",
      steps: [
        "Schau genau hin, während die Folge sichtbar ist.",
        "Danach klicke die Symbole in derselben Reihenfolge. Du kannst deine Eingabe vor dem Bestätigen korrigieren.",
      ],
      example: "★ ● ◆ → erst Stern, dann Kreis, dann Raute",
      scoring: "Jede richtige Position zählt. Alle richtig: 1.000 Punkte.",
    },
    wordle: {
      goal: "Finde ein englisches Wort mit fünf Buchstaben.",
      steps: [
        "Alle spielen dasselbe englische Wort, auch bei deutscher Oberfläche.",
        "Grün ✓ heißt richtiger Platz. Gelb • heißt anderer Platz. Grau × heißt fehlt. Nutze das Feedback für deinen nächsten Versuch.",
      ],
      example:
        "Beispielwort TIGER, Tipp TIMER: T, I, E und R sitzen richtig. M fehlt.",
      scoring:
        "Wort gefunden: 1.000 Punkte. Sechs Versuche. Nur Wörter aus der geprüften Wortliste zählen.",
    },
    countries: {
      goal: "Erkenne das Land.",
      steps: [
        "Du siehst eine Flagge oder einen Länderumriss.",
        "Wähle das passende Land und bestätige deine Antwort.",
      ],
      example: "Beispiel: 🇫🇷 → Frankreich",
      scoring: "Richtig: 1.000 Punkte. Ein Versuch.",
    },
  },
  en: {
    trivia: {
      goal: "Find the correct answer.",
      steps: [
        "Read the question and its four options.",
        "Choose one answer and lock it in.",
      ],
      example: "How many sides does a triangle have? → Three",
      scoring: "Correct: 1,000 points. One attempt.",
    },
    logic: {
      goal: "Combine the clues.",
      steps: [
        "The puzzle includes everything you need.",
        "Choose the solution that meets every condition.",
      ],
      example: "A is before B, B before C. Who is first? → A",
      scoring: "Correct: 1,000 points. The reveal explains the reasoning.",
    },
    estimate: {
      goal: "Get as close as possible to the correct number.",
      steps: ["Check the unit.", "Enter your estimate and confirm it."],
      example: "Answer 100, estimate 90 → 900 points",
      scoring: "Up to 1,000 points, depending on how close you are.",
    },
    arithmetic: {
      goal: "Calculate in your head.",
      steps: [
        "Respect brackets and the order of operations.",
        "Enter the result. One attempt.",
      ],
      example: "3 + 4 × 2 = 11",
      scoring: "Exactly correct: 1,000 points.",
    },
    truth: {
      goal: "Check a statement.",
      steps: ["Decide whether it is true or false.", "Confirm your choice."],
      example: "A triangle has four sides. → False",
      scoring: "Correct: 1,000 points.",
    },
    order: {
      goal: "Arrange the cards in the requested order.",
      steps: [
        "Drag cards by their handles, or use the arrows.",
        "Only your confirmed order counts.",
      ],
      example: "Ascending: 9, 2, 5 → 2, 5, 9",
      scoring: "Entire order correct: 1,000 points.",
    },
    drawing: {
      goal: "One person draws. Everyone else guesses the word.",
      steps: [
        "Artist: draw without letters or numbers. An eraser is available.",
        "Guessers: submit guesses. Wrong guesses appear in chat; correct words stay hidden.",
      ],
      example: "A circle with rays → sun / Sonne",
      scoring:
        "Correct guess: 1,000 points. The artist earns 1,000 once someone succeeds.",
    },
    association: {
      goal: "Find your team's words from a clue.",
      steps: [
        "Clue givers see the targets and provide one word in German and English.",
        "Everyone else selects the required number of words. Two or three people play cooperatively.",
      ],
      example: "Clue: sea / Meer → wave, beach, ship",
      scoring:
        "All targets correct: 1,000 points. A prepared clue helps if none is entered.",
    },
    geography: {
      goal: "Locate the place in Street View.",
      steps: [
        "Explore and look for geographic clues.",
        "Place your guess on the map and confirm it.",
      ],
      example: "Road signs, vegetation and architecture can help.",
      scoring:
        "Up to 1,000 points, depending on your distance from the actual location.",
    },
    code: {
      goal: "Crack the secret number code.",
      steps: [
        "Choose the digits for your attempt and check it.",
        "Feedback counts correct positions and correct digits in a different position.",
      ],
      example:
        "1 in the right place · 2 in another place → Use both clues for your next attempt.",
      scoring:
        "Code cracked: 1,000 points. Up to six attempts. Digits may repeat.",
    },
    sets: {
      goal: "Find three matching cards.",
      steps: [
        "For each feature, the three cards must be all the same or all different.",
        "Choose three cards and check the group.",
      ],
      example:
        "One circle, two squares, three triangles: shape and count are each all different.",
      scoring:
        "A valid group: 1,000 points. Two the same and one different does not work.",
    },
    connections: {
      goal: "Discover the hidden groups.",
      steps: [
        "Choose four words with something in common.",
        "After a correct group, find the next. You have four wrong attempts.",
      ],
      example: "Red, blue, green, yellow → Colours",
      scoring: "Each group earns a share of the 1,000 points.",
    },
    wavelength: {
      goal: "Find the same position on a scale.",
      steps: [
        "One person sees the secret target and gives a clue in German and English.",
        "Everyone else places the clue between the two extremes. After 15 seconds a prepared clue helps.",
      ],
      example: "Cold ↔ hot, clue: coffee. Where would you place it?",
      scoring:
        "Closer means more points, up to 1,000. The clue giver scores when someone makes a good guess.",
    },
    memory: {
      goal: "Remember a sequence of symbols.",
      steps: [
        "Look closely while the sequence is visible.",
        "Then click the symbols in the same order. Correct your entry before confirming.",
      ],
      example: "★ ● ◆ → star, then circle, then diamond",
      scoring: "Each correct position counts. All correct: 1,000 points.",
    },
    wordle: {
      goal: "Find a five-letter English word.",
      steps: [
        "Everyone plays the same English word in either interface language.",
        "Correct means the right position, present another position, absent no match. Use the feedback for your next attempt.",
      ],
      example:
        "Example word TIGER, guess TIMER: T, I, E and R are correctly placed. M is absent.",
      scoring:
        "Word found: 1,000 points. Six attempts. Only words from the reviewed word list count.",
    },
    countries: {
      goal: "Identify the country.",
      steps: [
        "You will see a flag or a country outline.",
        "Choose the country and confirm your answer.",
      ],
      example: "Example: 🇫🇷 → France",
      scoring: "Correct: 1,000 points. One attempt.",
    },
  },
};
