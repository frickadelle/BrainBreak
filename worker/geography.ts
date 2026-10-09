import type { GeoPoint, Question } from "../shared/types";

const EARTH_RADIUS_KM = 6371.0088;
export const GEOGRAPHY_SUCCESS_KM = 100;
const radians = (degrees: number) => (degrees * Math.PI) / 180;

function boundedPoint(value: unknown): value is GeoPoint {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const point = value as Record<string, unknown>;
  return (
    Object.keys(point).length === 2 &&
    typeof point.lat === "number" &&
    typeof point.lng === "number" &&
    Number.isFinite(point.lat) &&
    Number.isFinite(point.lng) &&
    point.lat >= -90 &&
    point.lat <= 90 &&
    point.lng >= -180 &&
    point.lng <= 180
  );
}

/** Accept only an explicit JSON coordinate pair, never strings or extra fields. */
export function parseGeoGuess(raw: unknown): string | null {
  if (typeof raw !== "string" || raw.length > 128) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!boundedPoint(parsed)) return null;
    return JSON.stringify({
      lat: Math.round(parsed.lat * 1_000_000) / 1_000_000,
      lng: Math.round(parsed.lng * 1_000_000) / 1_000_000,
    });
  } catch {
    return null;
  }
}

export function geoPointFromAnswer(answer: string | number): GeoPoint | null {
  const normalized = parseGeoGuess(answer);
  return normalized ? (JSON.parse(normalized) as GeoPoint) : null;
}

/** Great-circle distance on a mean-radius sphere; robust at poles and antipodes. */
export function distanceKm(from: GeoPoint, to: GeoPoint): number {
  if (!boundedPoint(from) || !boundedPoint(to)) return Number.POSITIVE_INFINITY;
  const latitude = radians(to.lat - from.lat);
  const longitude = radians(to.lng - from.lng);
  const haversine =
    Math.sin(latitude / 2) ** 2 +
    Math.cos(radians(from.lat)) *
      Math.cos(radians(to.lat)) *
      Math.sin(longitude / 2) ** 2;
  const bounded = Math.max(0, Math.min(1, haversine));
  return (
    2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(bounded), Math.sqrt(1 - bounded))
  );
}

/** Draft locations are excluded until the owner verifies real, navigable imagery. */
export function validGeoQuestion(question: Question): boolean {
  const geo = question.geography;
  if (question.category !== "geography" || !geo || !boundedPoint(geo.target))
    return false;
  if (
    typeof geo.panoId !== "string" ||
    !geo.panoId.trim() ||
    geo.panoId.length > 256
  )
    return false;
  if (
    geo.heading !== undefined &&
    (!Number.isFinite(geo.heading) || geo.heading < 0 || geo.heading >= 360)
  )
    return false;
  if (
    geo.pitch !== undefined &&
    (!Number.isFinite(geo.pitch) || geo.pitch < -90 || geo.pitch > 90)
  )
    return false;
  return (
    typeof geo.verifiedAt === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(geo.verifiedAt) &&
    Number.isFinite(Date.parse(geo.verifiedAt)) &&
    new Date(geo.verifiedAt).toISOString().replace(".000Z", "Z") ===
      geo.verifiedAt.replace(".000Z", "Z")
  );
}

export function geographyPoints(
  answer: string | number,
  question: Question,
): number {
  const guess = geoPointFromAnswer(answer);
  if (!guess || !validGeoQuestion(question)) return 0;
  return Math.round(
    1000 * Math.exp(-distanceKm(guess, question.geography!.target) / 1500),
  );
}

export function successfulGeoGuess(
  answer: string | number,
  question: Question,
): boolean {
  const guess = geoPointFromAnswer(answer);
  return Boolean(
    guess &&
    validGeoQuestion(question) &&
    distanceKm(guess, question.geography!.target) <= GEOGRAPHY_SUCCESS_KM,
  );
}
