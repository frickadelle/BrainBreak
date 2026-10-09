# Drawing word review

Twelve concrete concepts have prewritten equivalent German and English words. The artist sees both translations; guessers can use either language independently of their interface language. No live translation service runs. IDs encode the package and concept index, not the secret word.

| Package    | German      | English  | Extra accepted aliases |
| ---------- | ----------- | -------- | ---------------------- |
| starter-01 | Fahrrad     | bicycle  | Rad, bike              |
| starter-01 | Baum        | tree     | None                   |
| starter-01 | Regenschirm | umbrella | Schirm                 |
| starter-01 | Rakete      | rocket   | None                   |
| starter-01 | Schlüssel   | key      | Schluessel             |
| starter-01 | Haus        | house    | None                   |
| starter-02 | Sonne       | sun      | None                   |
| starter-02 | Katze       | cat      | None                   |
| starter-02 | Fisch       | fish     | None                   |
| starter-02 | Berg        | mountain | None                   |
| starter-02 | Stern       | star     | None                   |
| starter-02 | Auto        | car      | Automobil, automobile  |

The server normalizes Unicode compatibility forms, capitalization, surrounding whitespace and repeated spaces. It matches the complete normalized word against the reviewed alias list. A substring, unrelated word or article-prefixed phrase does not count. Incorrect guesses receive private feedback and do not consume the correct-answer lock. Articles and plural forms are not added implicitly.

The concepts can be depicted without letters, numbers or language-specific wordplay. These are drawing prompts, not externally sourced factual questions. The server reveals the localized word after the deadline. The artist's stored contribution marker is rendered as a translated drawing contribution, rather than as an answer word.
