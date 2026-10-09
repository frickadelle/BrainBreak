import type { ErrorCode } from "../shared/types";
export class ApiError extends Error {
  constructor(public code: ErrorCode) {
    super(code);
  }
}
export interface Identity {
  id: string;
  token: string;
}
const KEY = "brainbreak.identity";
let memoryIdentity: Identity | null = null;
let identityPromise: Promise<Identity> | null = null;
export async function api<T>(
  path: string,
  body?: unknown,
  token?: string,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch {
    throw new ApiError("CONNECTION_ERROR");
  }
  let data: T & { code?: ErrorCode; error?: ErrorCode };
  try {
    data = await response.json();
  } catch {
    throw new ApiError("CONNECTION_ERROR");
  }
  if (!response.ok)
    throw new ApiError(data.code || data.error || "INVALID_REQUEST");
  return data;
}
export function identity(): Promise<Identity> {
  if (identityPromise) return identityPromise;
  identityPromise = (async () => {
    let saved = memoryIdentity;
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) saved = JSON.parse(stored);
    } catch {
      /* Use the in-memory identity. */
    }
    const current = await api<Identity>(
      "/api/identity",
      saved?.token ? { token: saved.token } : {},
    );
    memoryIdentity = current;
    try {
      localStorage.setItem(KEY, JSON.stringify(current));
    } catch {
      /* This session still works without persistent storage. */
    }
    return current;
  })().catch((error) => {
    identityPromise = null;
    throw error;
  });
  return identityPromise;
}
export function errorCode(error: unknown): ErrorCode {
  return error instanceof ApiError ? error.code : "CONNECTION_ERROR";
}

export function resetIdentity() {
  memoryIdentity = null;
  identityPromise = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* A new identity can still be held in memory. */
  }
}
export function persistentStorageAvailable(): boolean {
  try {
    const key = "brainbreak.storage-check";
    localStorage.setItem(key, "1");
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
