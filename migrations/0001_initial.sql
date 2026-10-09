PRAGMA foreign_keys = ON;
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  host_id TEXT NOT NULL REFERENCES players(id),
  week TEXT NOT NULL,
  package_id TEXT NOT NULL,
  category TEXT,
  phase TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  completed_at INTEGER
);
CREATE TABLE session_players (
  session_id TEXT NOT NULL REFERENCES sessions(id),
  player_id TEXT NOT NULL REFERENCES players(id),
  name TEXT NOT NULL,
  PRIMARY KEY (session_id, player_id)
);
CREATE TABLE answers (
  session_id TEXT NOT NULL REFERENCES sessions(id),
  player_id TEXT NOT NULL REFERENCES players(id),
  question_id TEXT NOT NULL,
  value_json TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (session_id, player_id, question_id)
);
CREATE TABLE results (
  session_id TEXT NOT NULL REFERENCES sessions(id),
  player_id TEXT NOT NULL REFERENCES players(id),
  score INTEGER NOT NULL CHECK (score >= 0),
  PRIMARY KEY (session_id, player_id)
);
CREATE INDEX sessions_week_completed ON sessions(week, completed_at);
CREATE INDEX results_player ON results(player_id);
