import { apiFetch } from "./api";
import type {
  SaveWordleSessionPayload,
  SaveWordleSessionResponse,
  WordleConfig,
  WordleHistoryResponse,
  WordleLeaderboardResponse,
} from "../types/wordle";

function buildAuthHeaders(accessToken?: string) {
  return accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};
}

export async function getWordleConfig(): Promise<WordleConfig> {
  return await apiFetch<WordleConfig>("/offseason/wordle/config");
}

export async function getWordleLeaderboard(date?: string): Promise<WordleLeaderboardResponse> {
  if (date) {
    return await apiFetch<WordleLeaderboardResponse>(`/offseason/wordle/leaderboard/${date}`);
  }

  return await apiFetch<WordleLeaderboardResponse>("/offseason/wordle/leaderboard");
}

export async function getWordleHistory(
  userId?: number | string,
  accessToken?: string,
): Promise<WordleHistoryResponse> {
  if (userId !== undefined && userId !== null) {
    return await apiFetch<WordleHistoryResponse>(`/offseason/wordle/history/${userId}`);
  }

  return await apiFetch<WordleHistoryResponse>("/offseason/wordle/history", {
    headers: buildAuthHeaders(accessToken),
  });
}

export async function saveWordleSession(
  payload: SaveWordleSessionPayload,
  accessToken?: string,
): Promise<SaveWordleSessionResponse> {
  return await apiFetch<SaveWordleSessionResponse>("/offseason/wordle/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...buildAuthHeaders(accessToken),
    },
    body: JSON.stringify(payload),
  });
}
