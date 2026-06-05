export type TitansTossGrade = "Perfect" | "Good" | "Miss";

export interface TitansTossCompletePayload {
  distanceYards: number;
  grade: TitansTossGrade;
}

export interface TitansTossConfig {
  gameId: number;
  gameName: string;
  puzzleDate: string;
}

export interface TitansTossLeaderboardEntry {
  leaderboardId: number;
  gameId: number;
  userId: number | string;
  playerName: string;
  score: number;
  rank: number;
  attemptCount: number;
  playtimeSeconds: number;
  puzzleDate: string;
}

export interface TitansTossLeaderboardResponse {
  gameId: number;
  puzzleDate: string;
  entries: TitansTossLeaderboardEntry[];
}

export interface TitansTossSession {
  sessionId: number;
  gameId: number;
  userId: number | string;
  score: number;
  playtimeSeconds: number;
  playedAt: string;
  attemptCount: number;
  puzzleDate: string;
}

export interface SaveTitansTossSessionPayload {
  user_id?: number | string;
  distance_yards: number;
  playtime_seconds?: number;
  played_at?: string;
  puzzle_date?: string;
}

export interface SaveTitansTossSessionResponse {
  session: TitansTossSession;
  leaderboard: TitansTossLeaderboardResponse;
}

declare global {
  interface Window {
    __titansTossOnComplete?: (payload: TitansTossCompletePayload) => void;
  }
}

export {};
