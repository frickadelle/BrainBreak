import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { GeoPoint, Language, RoomView } from "../shared/types";
import type { useRoom } from "./useRoom";

interface MapsListener {
  remove(): void;
}
interface MapsMap {
  addListener(
    name: string,
    callback: (event: { latLng?: { lat(): number; lng(): number } }) => void,
  ): MapsListener;
  getZoom(): number | undefined;
  panTo(point: GeoPoint): void;
}
interface MapsPanorama {
  setVisible(visible: boolean): void;
  getStatus(): string;
  addListener(name: string, callback: () => void): MapsListener;
}
interface MapsCircle {
  setCenter(point: GeoPoint): void;
  setRadius(radius: number): void;
  setMap(map: MapsMap | null): void;
}
interface GoogleMaps {
  Map: new (
    container: HTMLElement,
    options: Record<string, unknown>,
  ) => MapsMap;
  StreetViewPanorama: new (
    container: HTMLElement,
    options: Record<string, unknown>,
  ) => MapsPanorama;
  Circle: new (options: Record<string, unknown>) => MapsCircle;
  event: { clearInstanceListeners(instance: object): void };
}
declare global {
  interface Window {
    google?: { maps: GoogleMaps };
    brainbreakMapsReady?: () => void;
    gm_authFailure?: () => void;
  }
}
const authListeners = new Set<() => void>();
let mapsPromise: Promise<GoogleMaps> | undefined;
let loadedKey: string | undefined;
let authInstalled = false;
let mapsAuthorizationFailed = false;

// One SDK script for the page. Language changes never recreate the panorama.
function loadMaps(browserKey: string, language: Language): Promise<GoogleMaps> {
  if (mapsAuthorizationFailed)
    return Promise.reject(new Error("authorization"));
  if (mapsPromise) {
    return loadedKey === browserKey
      ? mapsPromise
      : Promise.reject(new Error("configuration"));
  }
  if (!browserKey.trim()) return Promise.reject(new Error("configuration"));
  loadedKey = browserKey;
  mapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    let settled = false;
    const timer = window.setTimeout(() => fail("timeout"), 20_000);
    const finish = () => {
      window.clearTimeout(timer);
      script.onerror = null;
      delete window.brainbreakMapsReady;
      authListeners.delete(loaderAuth);
    };
    const fail = (reason: string) => {
      if (settled) return;
      settled = true;
      finish();
      script.remove();
      reject(new Error(reason));
    };
    const loaderAuth = () => fail("authorization");
    authListeners.add(loaderAuth);
    if (!authInstalled) {
      const previous = window.gm_authFailure;
      window.gm_authFailure = () => {
        mapsAuthorizationFailed = true;
        for (const listener of authListeners) listener();
        previous?.();
      };
      authInstalled = true;
    }
    window.brainbreakMapsReady = () => {
      if (settled) return;
      const maps = window.google?.maps;
      if (!maps?.Map || !maps.StreetViewPanorama || !maps.Circle) {
        fail("load");
        return;
      }
      settled = true;
      finish();
      resolve(maps);
    };
    const url = new URL("https://maps.googleapis.com/maps/api/js");
    url.searchParams.set("key", browserKey);
    url.searchParams.set("callback", "brainbreakMapsReady");
    url.searchParams.set("loading", "async");
    url.searchParams.set("v", "quarterly");
    url.searchParams.set("language", language);
    script.src = url.toString();
    script.async = true;
    script.onerror = () => fail("load");
    document.head.appendChild(script);
  });
  return mapsPromise;
}

const text = {
  de: {
    title: "Wo sind wir?",
    panorama: "Navigierbares Straßenpanorama",
    map: "Karte zum Markieren deines Tipps",
    hint: "Erkunde die Straße mit den Pfeilen. Markiere dann den vermuteten Startort auf der Karte.",
    keyboard: "Oder gib Koordinaten ein",
    latitude: "Breitengrad (−90 bis 90)",
    longitude: "Längengrad (−180 bis 180)",
    pin: "Markierung setzen",
    send: "Ort bestätigen",
    sending: "Wird gespeichert …",
    saved: "Dein Ort ist gespeichert.",
    loading: "Street View wird geladen …",
    unavailable: "Street View ist für diese Runde nicht eingerichtet.",
    loadFailed:
      "Street View konnte nicht geladen werden. Prüfe die Verbindung und lade die Seite erneut.",
    authorization:
      "Street View ist momentan nicht freigegeben. Der Host muss die Karten-Konfiguration prüfen.",
    missing:
      "Das Straßenpanorama ist nicht verfügbar. Du kannst für diese Runde keinen Ort bestätigen.",
    coordinates: "Gib gültige Koordinaten in den angegebenen Bereichen ein.",
    selected: "Deine Markierung",
    rule: "Je näher am Startort, desto mehr Punkte. Innerhalb von 100 km zählt der Tipp für die Schwierigkeitsanpassung als richtig.",
  },
  en: {
    title: "Where are we?",
    panorama: "Navigable street panorama",
    map: "Map for placing your guess",
    hint: "Explore the street using the arrows. Then mark where you think the starting location is on the map.",
    keyboard: "Or enter coordinates",
    latitude: "Latitude (−90 to 90)",
    longitude: "Longitude (−180 to 180)",
    pin: "Place marker",
    send: "Confirm location",
    sending: "Saving …",
    saved: "Your location is saved.",
    loading: "Loading Street View …",
    unavailable: "Street View has not been configured for this round.",
    loadFailed:
      "Street View could not load. Check your connection and reload the page.",
    authorization:
      "Street View is currently unavailable. The host needs to check the maps configuration.",
    missing:
      "This street panorama is unavailable. You cannot confirm a location for this round.",
    coordinates: "Enter valid coordinates within the indicated ranges.",
    selected: "Your marker",
    rule: "The closer to the starting location, the more points. Guesses within 100 km count as correct for difficulty adjustment.",
  },
};
export function parseCoordinateInput(
  value: string,
  language: Language,
): number | null {
  const raw = value.trim().replace("−", "-");
  const valid =
    language === "de"
      ? /^[+-]?(?:\d+(?:,\d+)?|,\d+)$/
      : /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/;
  if (raw.length > 20 || !valid.test(raw)) return null;
  const number = Number(raw.replace(",", "."));
  return Number.isFinite(number) ? number : null;
}

function selectedAnswer(answer: string | number | undefined): GeoPoint | null {
  if (typeof answer !== "string") return null;
  try {
    const value: unknown = JSON.parse(answer);
    if (!value || typeof value !== "object") return null;
    const point = value as Partial<GeoPoint>;
    return typeof point.lat === "number" &&
      typeof point.lng === "number" &&
      Number.isFinite(point.lat) &&
      Number.isFinite(point.lng) &&
      Math.abs(point.lat) <= 90 &&
      Math.abs(point.lng) <= 180
      ? { lat: point.lat, lng: point.lng }
      : null;
  } catch {
    return null;
  }
}

export function GeoGame({
  state,
  language,
  online,
  offset,
  send,
}: {
  state: RoomView;
  language: Language;
  online: boolean;
  offset: number;
  send: ReturnType<typeof useRoom>["send"];
}) {
  const t = text[language];
  const questionId = state.question?.id;
  const geo = state.question?.geography;
  const browserKey = state.geography?.browserKey;
  const panoramaElement = useRef<HTMLDivElement>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const instances = useRef<{
    map: MapsMap;
    panorama: MapsPanorama;
    circle: MapsCircle;
  } | null>(null);
  const [selected, setSelected] = useState<GeoPoint | null>(() =>
    selectedAnswer(state.me.answer),
  );
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [coordinateError, setCoordinateError] = useState(false);
  const [status, setStatus] = useState<
    | "loading"
    | "ready"
    | "loadFailed"
    | "authorization"
    | "missing"
    | "unavailable"
  >("loading");
  const [pending, setPending] = useState(false);
  const [now, setNow] = useState(Date.now());
  const locked = state.me.answer !== undefined;
  const ended = state.endsAt !== null && now + offset >= state.endsAt;
  const editable =
    state.phase === "question" &&
    online &&
    !ended &&
    !locked &&
    !pending &&
    status === "ready";
  const controls = useRef({ editable, language });
  controls.current = { editable, language };
  const currentSelection = useRef(selected);
  currentSelection.current = selected;

  const previousLanguage = useRef(language);
  useEffect(() => {
    if (previousLanguage.current === language) return;
    const from = previousLanguage.current;
    previousLanguage.current = language;
    const convert = (draft: string) => {
      const valid =
        from === "de" ? /^[+−-]?\d*(?:,\d*)?$/ : /^[+−-]?\d*(?:\.\d*)?$/;
      return valid.test(draft)
        ? draft.replace(
            from === "de" ? "," : ".",
            language === "de" ? "," : ".",
          )
        : draft;
    };
    setLatitude(convert);
    setLongitude(convert);
  }, [language]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    setSelected(selectedAnswer(state.me.answer));
    setLatitude("");
    setLongitude("");
    setCoordinateError(false);
    setPending(false);
  }, [questionId]);
  useEffect(() => {
    const saved = selectedAnswer(state.me.answer);
    if (saved) setSelected(saved);
    setPending(false);
  }, [state.me.answer, online]);
  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => setPending(false), 4000);
    return () => window.clearTimeout(timer);
  }, [pending]);

  useEffect(() => {
    if (
      !geo ||
      !browserKey ||
      !panoramaElement.current ||
      !mapElement.current
    ) {
      setStatus("unavailable");
      return;
    }
    let cancelled = false;
    let cleanup = () => {};
    const authFailed = () => {
      if (!cancelled) setStatus("authorization");
    };
    authListeners.add(authFailed);
    setStatus("loading");
    loadMaps(browserKey, controls.current.language)
      .then((maps) => {
        if (cancelled || !panoramaElement.current || !mapElement.current)
          return;
        const panorama = new maps.StreetViewPanorama(panoramaElement.current, {
          pano: geo.panoId,
          pov: { heading: geo.heading, pitch: geo.pitch },
          visible: true,
          linksControl: true,
          panControl: true,
          zoomControl: true,
          clickToGo: true,
          addressControl: false,
          fullscreenControl: false,
          enableCloseButton: false,
          showRoadLabels: false,
          motionTracking: false,
          motionTrackingControl: false,
        });
        const map = new maps.Map(mapElement.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          keyboardShortcuts: true,
          clickableIcons: false,
          gestureHandling: "cooperative",
          minZoom: 1,
        });
        const circle = new maps.Circle({
          map: currentSelection.current ? map : null,
          center: currentSelection.current ?? { lat: 0, lng: 0 },
          radius: 300000,
          strokeColor: "#e76b53",
          strokeOpacity: 1,
          strokeWeight: 3,
          fillColor: "#e76b53",
          fillOpacity: 0.5,
          clickable: false,
        });
        instances.current = { map, panorama, circle };
        const readinessTimer = window.setTimeout(() => {
          if (
            !cancelled &&
            !mapsAuthorizationFailed &&
            panorama.getStatus() !== "OK"
          )
            setStatus("missing");
        }, 15000);
        const listeners = [
          map.addListener("click", (event) => {
            if (!controls.current.editable || !event.latLng) return;
            const point = {
              lat: Math.round(event.latLng.lat() * 1e6) / 1e6,
              lng: Math.round(event.latLng.lng() * 1e6) / 1e6,
            };
            setSelected(point);
            setCoordinateError(false);
            const separator = controls.current.language === "de" ? "," : ".";
            setLatitude(String(point.lat).replace(".", separator));
            setLongitude(String(point.lng).replace(".", separator));
          }),
          map.addListener("zoom_changed", () =>
            circle.setRadius(300000 / 2 ** ((map.getZoom() ?? 2) - 2)),
          ),
          panorama.addListener("status_changed", () => {
            if (!cancelled && !mapsAuthorizationFailed) {
              window.clearTimeout(readinessTimer);
              setStatus(panorama.getStatus() === "OK" ? "ready" : "missing");
            }
          }),
        ];
        if (panorama.getStatus() === "OK" && !mapsAuthorizationFailed) {
          window.clearTimeout(readinessTimer);
          setStatus("ready");
        }
        cleanup = () => {
          window.clearTimeout(readinessTimer);
          listeners.forEach((listener) => listener.remove());
          circle.setMap(null);
          panorama.setVisible(false);
          maps.event.clearInstanceListeners(map);
          maps.event.clearInstanceListeners(panorama);
          maps.event.clearInstanceListeners(circle);
          instances.current = null;
        };
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setStatus(
            error instanceof Error && error.message === "authorization"
              ? "authorization"
              : "loadFailed",
          );
      });
    return () => {
      cancelled = true;
      authListeners.delete(authFailed);
      cleanup();
    };
    // Panoramas and guesses survive language changes and connection updates.
  }, [questionId, geo?.panoId, browserKey]);

  useEffect(() => {
    const objects = instances.current;
    if (!objects) return;
    if (selected) {
      objects.circle.setCenter(selected);
      objects.circle.setMap(objects.map);
    } else objects.circle.setMap(null);
  }, [selected, status]);

  function placeCoordinates(event: FormEvent) {
    event.preventDefault();
    if (!editable) return;
    const lat = parseCoordinateInput(latitude, language);
    const lng = parseCoordinateInput(longitude, language);
    if (
      lat === null ||
      lng === null ||
      Math.abs(lat) > 90 ||
      Math.abs(lng) > 180
    ) {
      setCoordinateError(true);
      return;
    }
    const point = {
      lat: Math.round(lat * 1e6) / 1e6,
      lng: Math.round(lng * 1e6) / 1e6,
    };
    setSelected(point);
    instances.current?.map.panTo(point);
    setCoordinateError(false);
  }
  function confirm() {
    if (!editable || !selected || !questionId) return;
    if (send({ type: "answer", questionId, value: JSON.stringify(selected) }))
      setPending(true);
  }
  const describe = (point: GeoPoint) =>
    `${point.lat.toLocaleString(language, { maximumFractionDigits: 6 })}, ${point.lng.toLocaleString(language, { maximumFractionDigits: 6 })}`;
  return (
    <section className="geo-game">
      <p className="small">{t.hint}</p>
      {status !== "ready" && (
        <p role="status" className="small">
          {t[status]}
        </p>
      )}
      <div
        ref={panoramaElement}
        role="region"
        aria-label={t.panorama}
        style={{
          height: "min(44vh, 360px)",
          minHeight: 220,
          width: "100%",
          borderRadius: 12,
          overflow: "hidden",
        }}
      />
      <div
        ref={mapElement}
        role="region"
        aria-label={t.map}
        style={{
          height: 240,
          width: "100%",
          marginTop: 12,
          borderRadius: 12,
          overflow: "hidden",
        }}
      />
      {locked ? (
        <p role="status" className="answer-confirmation">
          {t.saved}
          {selected ? ` ${describe(selected)}` : ""}
        </p>
      ) : (
        <>
          <form onSubmit={placeCoordinates}>
            <fieldset
              disabled={!editable}
              style={{ border: 0, margin: "12px 0", padding: 0 }}
            >
              <legend className="small">{t.keyboard}</legend>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 8,
                }}
              >
                <label style={{ flex: "1 1 160px" }}>
                  {t.latitude}
                  <input
                    aria-label={t.latitude}
                    value={latitude}
                    inputMode="decimal"
                    maxLength={20}
                    onChange={(event) => {
                      setLatitude(event.target.value);
                      setCoordinateError(false);
                    }}
                    style={{ width: "100%" }}
                  />
                </label>
                <label style={{ flex: "1 1 160px" }}>
                  {t.longitude}
                  <input
                    aria-label={t.longitude}
                    value={longitude}
                    inputMode="decimal"
                    maxLength={20}
                    onChange={(event) => {
                      setLongitude(event.target.value);
                      setCoordinateError(false);
                    }}
                    style={{ width: "100%" }}
                  />
                </label>
                <button type="submit" className="button secondary">
                  {t.pin}
                </button>
              </div>
            </fieldset>
            {coordinateError && (
              <p role="alert" className="small">
                {t.coordinates}
              </p>
            )}
          </form>
          {selected && (
            <p role="status" className="small">
              {t.selected}: {describe(selected)}
            </p>
          )}
          <button
            type="button"
            className="button primary"
            disabled={!editable || !selected}
            onClick={confirm}
          >
            {pending ? t.sending : t.send}
          </button>
        </>
      )}
      <p className="small muted">{t.rule}</p>
    </section>
  );
}
