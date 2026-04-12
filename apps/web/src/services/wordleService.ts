import { apiFetch } from "./api";
import type {
  SaveWordleSessionPayload,
  SaveWordleSessionResponse,
  WordleConfig,
  WordleHistoryResponse,
  WordleLeaderboardResponse,
} from "../types/wordle";

export async function getWordleConfig(): Promise<WordleConfig> {
  return await apiFetch<WordleConfig>("/offseason/wordle/config");
}

export async function getWordleLeaderboard(date?: string): Promise<WordleLeaderboardResponse> {
  if (date) {
    return await apiFetch<WordleLeaderboardResponse>(`/offseason/wordle/leaderboard/${date}`);
  }

  return await apiFetch<WordleLeaderboardResponse>("/offseason/wordle/leaderboard");
}

export async function getWordleHistory(userId = 1): Promise<WordleHistoryResponse> {
  return await apiFetch<WordleHistoryResponse>(`/offseason/wordle/history/${userId}`);
}

export async function saveWordleSession(
  payload: SaveWordleSessionPayload,
): Promise<SaveWordleSessionResponse> {
  return await apiFetch<SaveWordleSessionResponse>("/offseason/wordle/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
