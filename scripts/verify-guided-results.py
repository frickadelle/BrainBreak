"""Verify the exact guided protocol report against a local SQLite D1 database."""
import argparse
import json
import sqlite3
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("database", type=Path)
parser.add_argument("--report", type=Path, default=Path("test-results/guided-protocol.json"))
args = parser.parse_args()
report = json.loads(args.report.read_text())
connection = sqlite3.connect(f"file:{args.database.resolve()}?mode=ro", uri=True)
verified = []
for item in report["reports"]:
    session = connection.execute(
        "SELECT id, phase, completed_at, category FROM sessions WHERE code = ?",
        (item["code"],),
    ).fetchone()
    assert session and session[1] == "results" and session[2] is not None, item["code"]
    assert session[3] == item["mode"], item["code"]
    results = dict(connection.execute(
        "SELECT player_id, score FROM results WHERE session_id = ?", (session[0],)
    ).fetchall())
    assert set(results) == set(item["players"]), item["code"]
    assert all(score == 6000 for score in results.values()), item["code"]
    answers = connection.execute(
        "SELECT player_id, question_id, points FROM answers WHERE session_id = ?",
        (session[0],),
    ).fetchall()
    expected_questions = {check["questionId"] for check in item["checks"]}
    assert len(answers) == item["count"] * 6, item["code"]
    assert {row[1] for row in answers} == expected_questions, item["code"]
    assert all(row[2] == 1000 for row in answers), item["code"]
    verified.append({"code": item["code"], "mode": item["mode"], "participants": len(results), "answers": len(answers)})
output = {"protocolTime": report["time"], "sessions": verified,
          "participants": sum(row["participants"] for row in verified),
          "answers": sum(row["answers"] for row in verified)}
Path("test-results/guided-d1-check.json").write_text(json.dumps(output, indent=2) + "\n")
print(f"Verified {len(verified)} completed sessions, {output['participants']} results and {output['answers']} answers.")
