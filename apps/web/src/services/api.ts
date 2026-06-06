import { supabase } from "../supabaseClient";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function normalizeEndpoint(endpoint: string): string {
  if (endpoint === "/matches" || endpoint.startsWith("/matches?")) {
    return endpoint.replace(/^\/matches(?=\?|$)/, "/matches/");
  }

  return endpoint;
}

function resolveApiUrl(endpoint: string): string {
  const normalizedEndpoint = normalizeEndpoint(endpoint);

  if (API_BASE_URL && normalizedEndpoint.startsWith("/api/")) {
    return `${API_BASE_URL}${normalizedEndpoint.slice(4)}`;
  }

  if (API_BASE_URL) {
    return `${API_BASE_URL}${normalizedEndpoint}`;
  }

  if (normalizedEndpoint.startsWith("/api/")) {
    return normalizedEndpoint;
  }

  return `/api${normalizedEndpoint.startsWith("/") ? normalizedEndpoint : `/${normalizedEndpoint}`}`;
}

function formatHttpErrorBody(data: unknown, status: number): string {
  if (typeof data === "string") {
    const trimmed = data.trim();
    if (!trimmed) return `HTTP error ${status}`;
    if (trimmed.includes("<html") || trimmed.includes("Bad Gateway")) {
      if (status === 502) {
        return "Backend unavailable (502). Start gateway and war-room/profile services.";
      }
      return `Server error (${status}). Check Docker services.`;
    }
    if (trimmed.length > 240) return `HTTP error ${status}`;
    return trimmed;
  }
  return `HTTP error ${status}`;
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = resolveApiUrl(endpoint);
  const headers = { ...((options.headers as Record<string, string>) || {}) };

  if (!headers.Authorization && !headers.authorization) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token;
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson) {
      const body = data as { error?: string; message?: string };
      throw new Error(
        body.message || body.error || `HTTP error ${response.status}`,
      );
    }

    throw new Error(formatHttpErrorBody(data, response.status));
  }

  return data as T;
}
