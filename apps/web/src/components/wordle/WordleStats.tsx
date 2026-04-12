import { useMemo } from "react";
import type { WordleLeaderboardEntry } from "../../types/wordle";

interface WordleStatsProps {
  entries: WordleLeaderboardEntry[];
  errorMessage: string | null;
  isLoading: boolean;
  puzzleDate: string | null;
}

function formatPlaytime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}

function WordleStats({
  entries,
  errorMessage,
  isLoading,
  puzzleDate,
}: WordleStatsProps) {
  const topEntries = useMemo(() => {
    const seenUsers = new Set<number>();

    return entries.filter((entry) => {
      if (seenUsers.has(entry.userId)) {
        return false;
      }

      seenUsers.add(entry.userId);
      return true;
    }).slice(0, 5);
  }, [entries]);

  return (
    <section className="wordle-leaderboard-box">
      <div className="wordle-leaderboard-header">
        <p className="wordle-leaderboard-kicker">TOP 5</p>
        <h3 className="wordle-leaderboard-title">Leaderboard</h3>
        <p className="wordle-leaderboard-copy">
          {puzzleDate
            ? `Mejores 5 registros del dia ${puzzleDate}.`
            : "Mejores 5 registros del dia por intentos, tiempo y orden de finalizacion."}
        </p>
      </div>

      <div className="wordle-leaderboard-list">
        {isLoading ? <p className="wordle-leaderboard-copy">Cargando leaderboard...</p> : null}
        {errorMessage ? <p className="wordle-leaderboard-copy">{errorMessage}</p> : null}

        {!isLoading && !errorMessage && topEntries.length === 0 ? (
          <p className="wordle-leaderboard-copy">Todavia no hay resultados para este puzzle.</p>
        ) : null}

        {topEntries.map((player) => (
          <article key={`${player.puzzleDate}-${player.userId}`} className="wordle-leaderboard-item">
            <div className="wordle-leaderboard-rank">#{player.rank}</div>

            <div className="wordle-leaderboard-player">
              <p className="wordle-leaderboard-name">{player.playerName}</p>
              <p className="wordle-leaderboard-meta">
                {player.attemptCount} intentos · {formatPlaytime(player.playtimeSeconds)}
              </p>
            </div>

            <div className="wordle-leaderboard-stat">
              <span className="wordle-leaderboard-stat-label">USER</span>
              <strong>{player.userId}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WordleStats;
