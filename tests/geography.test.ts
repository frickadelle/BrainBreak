import { describe, expect, it } from "vitest";
import type { GeoPoint, Question } from "../shared/types";
import {
  distanceKm,
  geoPointFromAnswer,
  geographyPoints,
  parseGeoGuess,
  successfulGeoGuess,
  validGeoQuestion,
} from "../worker/geography";
import { parseCoordinateInput } from "../src/GeoGame";

const origin = { lat: 0, lng: 0 };
const question: Question = {
  id: "geography-test",
  category: "geography",
  difficulty: "medium",
  prompt: { de: "Finde den Startort.", en: "Find the starting location." },
  answer: "",
  explanation: { de: "Startort", en: "Starting location" },
  geography: {
    panoId: "test-geometry-only-not-a-live-panorama",
    target: origin,
    heading: 0,
    pitch: 0,
    verifiedAt: "2026-10-09T08:00:00.000Z",
  },
};
const payload = (point: GeoPoint) => JSON.stringify(point);
const northAtKm = (km: number) => ({
  lat: ((km / 6371.0088) * 180) / Math.PI,
  lng: 0,
});

describe("geography guesses", () => {
  it("accepts coordinate boundaries and canonicalizes six decimal places", () => {
    expect(parseGeoGuess('{ "lng": -180, "lat": 90 }')).toBe(
      '{"lat":90,"lng":-180}',
    );
    expect(parseGeoGuess('{"lat":-33.123456789,"lng":151.987654321}')).toBe(
      '{"lat":-33.123457,"lng":151.987654}',
    );
    expect(parseGeoGuess('{"lat":-0.0000001,"lng":0}')).toBe(
      '{"lat":0,"lng":0}',
    );
    expect(geoPointFromAnswer('{"lat":1.25,"lng":-2.5}')).toEqual({
      lat: 1.25,
      lng: -2.5,
    });
  });
  it("rejects coercion, malformed JSON, extra fields and out-of-bounds coordinates", () => {
    for (const raw of [
      null,
      1,
      origin,
      "",
      "1,2",
      "[]",
      "null",
      '{"lat":"1","lng":2}',
      '{"lat":true,"lng":2}',
      '{"lat":1}',
      '{"lat":1,"lng":2,"target":3}',
      '{"lat":90.000001,"lng":0}',
      '{"lat":0,"lng":-180.000001}',
      '{"lat":1e999,"lng":0}',
      " ".repeat(129),
    ]) {
      expect(parseGeoGuess(raw), String(raw)).toBeNull();
    }
    expect(geoPointFromAnswer(0)).toBeNull();
  });
  it("parses signed coordinate drafts with strict locale decimal separators", () => {
    expect(parseCoordinateInput("-33,12345", "de")).toBe(-33.12345);
    expect(parseCoordinateInput("−33.12345", "en")).toBe(-33.12345);
    expect(parseCoordinateInput("+.5", "en")).toBe(0.5);
    expect(parseCoordinateInput("-,5", "de")).toBe(-0.5);
    for (const value of [
      "",
      "1e2",
      "1,000.5",
      "12 km",
      "--1",
      "1.",
      "Infinity",
    ])
      expect(parseCoordinateInput(value, "en")).toBeNull();
    expect(parseCoordinateInput("1.25", "de")).toBeNull();
    expect(parseCoordinateInput("1,25", "en")).toBeNull();
  });
});

describe("geography distance and scoring", () => {
  it("computes zero, quarter-earth and antipodal distances symmetrically", () => {
    expect(distanceKm(origin, origin)).toBe(0);
    expect(distanceKm(origin, { lat: 0, lng: 90 })).toBeCloseTo(
      10007.557221,
      5,
    );
    expect(distanceKm(origin, { lat: 0, lng: 180 })).toBeCloseTo(
      20015.114442,
      5,
    );
    const berlin = { lat: 52.52, lng: 13.405 };
    const paris = { lat: 48.8566, lng: 2.3522 };
    expect(distanceKm(berlin, paris)).toBeCloseTo(877.4645, 3);
    expect(distanceKm(berlin, paris)).toBe(distanceKm(paris, berlin));
  });
  it("handles the antimeridian, poles and invalid points", () => {
    expect(
      distanceKm({ lat: 0, lng: 179.9 }, { lat: 0, lng: -179.9 }),
    ).toBeCloseTo(22.239016, 5);
    expect(
      distanceKm({ lat: 90, lng: -180 }, { lat: 90, lng: 180 }),
    ).toBeCloseTo(0, 10);
    expect(distanceKm(origin, { lat: Number.NaN, lng: 0 })).toBe(
      Number.POSITIVE_INFINITY,
    );
    expect(distanceKm(origin, { lat: 91, lng: 0 })).toBe(
      Number.POSITIVE_INFINITY,
    );
  });
  it("rewards distance continuously without changing the scoring target", () => {
    expect(geographyPoints(payload(origin), question)).toBe(1000);
    expect(geographyPoints(payload(northAtKm(1500)), question)).toBe(368);
    expect(geographyPoints(payload(northAtKm(3000)), question)).toBe(135);
    expect(geographyPoints(payload({ lat: 0, lng: 180 }), question)).toBe(0);
    expect(question.geography?.target).toEqual(origin);
  });
  it("counts guesses within 100 km as successful and rejects invalid guesses", () => {
    expect(successfulGeoGuess(payload(northAtKm(99.9)), question)).toBe(true);
    expect(successfulGeoGuess(payload(northAtKm(100.1)), question)).toBe(false);
    expect(successfulGeoGuess("not-json", question)).toBe(false);
    expect(geographyPoints("not-json", question)).toBe(0);
  });
  it("keeps unverified and invalid locations unavailable", () => {
    expect(validGeoQuestion(question)).toBe(true);
    for (const geography of [
      { ...question.geography!, verifiedAt: undefined },
      { ...question.geography!, verifiedAt: "not-a-date" },
      { ...question.geography!, verifiedAt: "2026-02-30T08:00:00.000Z" },
      { ...question.geography!, panoId: " " },
      { ...question.geography!, panoId: "x".repeat(257) },
      { ...question.geography!, heading: 360 },
      { ...question.geography!, pitch: -91 },
      { ...question.geography!, target: { lat: 90.1, lng: 0 } },
    ]) {
      const draft: Question = { ...question, geography };
      expect(validGeoQuestion(draft)).toBe(false);
      expect(geographyPoints(payload(origin), draft)).toBe(0);
    }
    expect(validGeoQuestion({ ...question, category: "trivia" })).toBe(false);
    expect(validGeoQuestion({ ...question, geography: undefined })).toBe(false);
  });
});
