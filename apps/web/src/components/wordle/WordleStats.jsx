const leaderboard = [
  { rank: 1, name: "Maya", points: "540 XP" },
  { rank: 2, name: "Jules", points: "510 XP" },
  { rank: 3, name: "You", points: "480 XP", isCurrentUser: true },
  { rank: 4, name: "Noah", points: "430 XP" },
];

function WordleStats({ attemptsUsed, maxAttempts, gameStatus }) {
  const xpReward = gameStatus === "won" ? 250 : 0;

  return (
    <div className="wordle-stats">
      <div className="wordle-stats-grid">
        <article className="wordle-stat-card">
          <div className="wordle-stat-label">Attempts</div>
          <p className="wordle-stat-value">
            {attemptsUsed}/{maxAttempts}
          </p>
        </article>

        <article className="wordle-stat-card">
          <div className="wordle-stat-label">XP Earned</div>
          <p className="wordle-stat-value">+{xpReward}</p>
        </article>
      </div>

      <div>
        <h3 className="wordle-leaderboard-title">Today's Leaderboard</h3>
        <div className="wordle-leaderboard">
          {leaderboard.map((entry) => (
            <div
              key={entry.name}
              className={`wordle-leaderboard-row ${
                entry.isCurrentUser ? "wordle-leaderboard-row-active" : ""
              }`}
            >
              <span>
                #{entry.rank} {entry.name}
              </span>
              <span className="wordle-leaderboard-points">{entry.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WordleStats;
