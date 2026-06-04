import type { WarRoomPlayer } from "../../services/warRoomService";

export function warRoomPlayerLabel(
  player: Pick<WarRoomPlayer, "seat" | "username">,
  youSeat?: number,
): string {
  const base = player.username?.trim() || `Game Manager ${player.seat}`;
  return youSeat !== undefined && player.seat === youSeat ? `${base} (You)` : base;
}

export function warRoomSeatLabel(
  seat: number,
  players: WarRoomPlayer[],
  youSeat?: number,
): string {
  const p = players.find((x) => x.seat === seat);
  return p ? warRoomPlayerLabel(p, youSeat) : `Game Manager ${seat}`;
}
