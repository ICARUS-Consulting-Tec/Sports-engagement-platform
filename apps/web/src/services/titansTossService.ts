import { apiFetch } from "./api";
import type {
  SaveTitansTossSessionPayload,
  SaveTitansTossSessionResponse,
  TitansTossConfig,
  TitansTossLeaderboardResponse,
} from "../types/titansToss";

const TITANS_TOSS_LOAD_ERROR_MESSAGE =
  "A database error occurred while loading Titans Toss.";
const TITANS_TOSS_SAVE_ERROR_MESSAGE =
  "A database error occurred while saving your Titans Toss score.";

function buildAuthHeaders(accessToken?: string) {
  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};
}

function toErrorMessage(error: unknown, fallbackMessage: string): string {
  const message = error instanceof Error ? error.message : String(error ?? "");
  const normalizedMessage = message.trim().toLowerCase();

  if (
    normalizedMessage.includes("<!doctype html") ||
    normalizedMessage.includes("<html") ||
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("networkerror") ||
    normalizedMessage.includes("database permission denied") ||
    normalizedMessage.includes("profile lookup failed with status 404") ||
    normalizedMessage.includes("profile not found") ||
    normalizedMessage.includes("connection failed") ||
    normalizedMessage.includes("connect econnrefused") ||
    normalizedMessage.includes("http error 500") ||
    normalizedMessage.includes("http error 502") ||
    normalizedMessage.includes("http error 503") ||
    normalizedMessage.includes("http error 504")
  ) {
    return fallbackMessage;
  }

  return message || fallbackMessage;
}

function normalizeTitansTossLoadError(error: unknown): never {
  throw new Error(toErrorMessage(error, TITANS_TOSS_LOAD_ERROR_MESSAGE));
}

function normalizeTitansTossSaveError(error: unknown): never {
  throw new Error(toErrorMessage(error, TITANS_TOSS_SAVE_ERROR_MESSAGE));
}

export async function getTitansTossConfig(): Promise<TitansTossConfig> {
  try {
    return await apiFetch<TitansTossConfig>("/offseason/titans-toss/config");
  } catch (error) {
    normalizeTitansTossLoadError(error);
  }
}

export async function getTitansTossLeaderboard(
  date?: string,
): Promise<TitansTossLeaderboardResponse> {
  try {
    if (date) {
      return await apiFetch<TitansTossLeaderboardResponse>(
        `/offseason/titans-toss/leaderboard/${date}`,
      );
    }

    return await apiFetch<TitansTossLeaderboardResponse>(
      "/offseason/titans-toss/leaderboard",
    );
  } catch (error) {
    normalizeTitansTossLoadError(error);
  }
}

export async function saveTitansTossSession(
  payload: SaveTitansTossSessionPayload,
  accessToken?: string,
): Promise<SaveTitansTossSessionResponse> {
  try {
    return await apiFetch<SaveTitansTossSessionResponse>(
      "/offseason/titans-toss/session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...buildAuthHeaders(accessToken),
        },
        body: JSON.stringify(payload),
      },
    );
  } catch (error) {
    normalizeTitansTossSaveError(error);
  }
}

export function formatTitansTossDistance(score: number): string {
  return `${(score / 100).toFixed(2)} yd`;
}
