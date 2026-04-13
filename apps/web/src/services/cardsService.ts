import { apiFetch } from "./api";
import { resolveHeadshotFromRow } from "../utils/headshotUrl";
import type { RosterCard, AthleteDetail, CollectionStats, PackOpenResult } from "../types";

export async function getRoster(userId?: string): Promise<RosterCard[]> {
  const query = userId != null ? `?user_id=${userId}` : "";
  const rows = await apiFetch<Record<string, unknown>[]>(`/api/cards/roster${query}`);
  return rows.map((row) => ({
    ...(row as unknown as RosterCard),
    headshot_url: resolveHeadshotFromRow(row),
  }));
}

export async function getAthleteDetail(athleteId: number): Promise<AthleteDetail> {
  const row = await apiFetch<Record<string, unknown>>(`/api/cards/roster/${athleteId}`);
  return {
    ...(row as unknown as AthleteDetail),
    headshot_url: resolveHeadshotFromRow(row),
  };
}

export async function getCollectionStats(userId: string): Promise<CollectionStats> {
  return await apiFetch<CollectionStats>(`/api/cards/collection/${userId}`);
}

export async function openPack(userId: string): Promise<PackOpenResult> {
  return await apiFetch<PackOpenResult>("/api/cards/pack/open", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
}
