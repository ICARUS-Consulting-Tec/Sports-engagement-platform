export type MatchStatus = "LIVE" | "FINISHED" | "UPCOMING";

export interface Match {
  id: number;
  status: MatchStatus;
  opponent: string;
  date: string;
  venue: string;
  resultLabel: string;
  resultValue: string;
}

export interface ApiMatch {
  match_id: number;
  status?: string;
  home_team?: string;
  away_team?: string;
  start_time?: string;
  venue_name?: string;
  venue_city?: string;
  home_score?: number;
  away_score?: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  description?: string;
  default_price: string;
  images?: string[];
}
