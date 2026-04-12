export interface WordleConfig {
  gameId: number;
  gameName: string;
  userId: number;
  puzzleDate: string;
  maxAttempts: number;
  wordLength: number;
}

export interface WordleLeaderboardEntry {
  leaderboardId: number;
  gameId: number;
  userId: number;
  playerName: string;
  score: number;
  rank: number;
  attemptCount: number;
  playtimeSeconds: number;
  puzzleDate: string;
}

export interface WordleLeaderboardResponse {
  gameId: number;
  puzzleDate: string;
  entries: WordleLeaderboardEntry[];
}

export interface WordleSession {
  sessionId: number;
  gameId: number;
  userId: number;
  score: number;
  playtimeSeconds: number;
  playedAt: string;
  attemptCount: number;
  puzzleDate: string;
}

export interface WordleHistoryResponse {
  gameId: number;
  userId: number;
  sessions: WordleSession[];
}

export interface SaveWordleSessionPayload {
  user_id?: number;
  attempt_count: number;
  playtime_seconds: number;
  played_at?: string;
  puzzle_date?: string;
}

export interface SaveWordleSessionResponse {
  session: WordleSession;
  leaderboard: WordleLeaderboardResponse;
}
