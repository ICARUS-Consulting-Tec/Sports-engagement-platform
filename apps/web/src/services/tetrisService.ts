import { apiFetch } from "./api";

const TETRIS_LOAD_ERROR_MESSAGE =
  "A database error occurred while loading Tetris.";
const TETRIS_SAVE_ERROR_MESSAGE =
  "A database error occurred while saving your Tetris score.";

export interface TetrisLeaderboardEntry {
  leaderboardId: number;
  gameId: number;
  userId: number | string;
  playerName: string;
  score: number;
  rank: number;
  playtimeSeconds: number;
  playedAt: string;
  linesCleared: number;
  levelReached: number;
}

export interface TetrisLeaderboardResponse {
  gameId: number;
  entries: TetrisLeaderboardEntry[];
}

export interface SaveTetrisSessionPayload {
  score: number;
  linesCleared: number;
  levelReached: number;
  playtimeSeconds: number;
}

export interface SaveTetrisSessionResponse {
  session: {
    sessionId: number;
    gameId: number;
    userId: number | string;
    score: number;
    playtimeSeconds: number;
    playedAt: string;
    linesCleared: number;
    levelReached: number;
  };
  leaderboard: TetrisLeaderboardResponse;
}

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

function normalizeTetrisLoadError(error: unknown): never {
  throw new Error(toErrorMessage(error, TETRIS_LOAD_ERROR_MESSAGE));
}

function normalizeTetrisSaveError(error: unknown): never {
  throw new Error(toErrorMessage(error, TETRIS_SAVE_ERROR_MESSAGE));
}

export async function getTetrisLeaderboard(): Promise<TetrisLeaderboardResponse> {
  try {
    return await apiFetch<TetrisLeaderboardResponse>("/offseason/tetris/leaderboard");
  } catch (error) {
    normalizeTetrisLoadError(error);
  }
}

export async function saveTetrisSession(
  payload: SaveTetrisSessionPayload,
  accessToken?: string,
): Promise<SaveTetrisSessionResponse> {
  try {
    return await apiFetch<SaveTetrisSessionResponse>("/offseason/tetris/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...buildAuthHeaders(accessToken),
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    normalizeTetrisSaveError(error);
  }
}
