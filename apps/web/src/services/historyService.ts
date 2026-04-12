import { apiFetch } from "./api";
import { historyPageMockData } from "../data/HistoryMockData";
import type {
  ClassicMatch,
  HistoryPageData,
  HistoryStat,
  LegendaryPlayer,
  TimelineEvent,
} from "../types/history";

async function fetchHistoryResource<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    return await apiFetch<T>(endpoint);
  } catch (error) {
    console.warn(`History API unavailable for ${endpoint}. Using mock data.`, error);
    return fallback;
  }
}

export async function getHistoryPageData(): Promise<HistoryPageData> {
  return fetchHistoryResource<HistoryPageData>("/history/overview", historyPageMockData);
}

export async function getHistoryStats(): Promise<HistoryStat[]> {
  return fetchHistoryResource<HistoryStat[]>(
    "/history/stats",
    historyPageMockData.historyStats,
  );
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  return fetchHistoryResource<TimelineEvent[]>(
    "/history/timeline",
    historyPageMockData.timelineEvents,
  );
}

export async function getLegendaryPlayers(): Promise<LegendaryPlayer[]> {
  return fetchHistoryResource<LegendaryPlayer[]>(
    "/history/players",
    historyPageMockData.legendaryPlayers,
  );
}

export async function getClassicMatches(): Promise<ClassicMatch[]> {
  return fetchHistoryResource<ClassicMatch[]>(
    "/history/matches",
    historyPageMockData.classicMatches,
  );
}
