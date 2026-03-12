import { BarChart3, Target } from 'lucide-react'
import { wordleLeaderboard } from '../../data/mockLeaderboards'
import type { GameStatus } from '../../types/wordle'

type WordleStatsProps = {
  attemptsUsed: number
  maxAttempts: number
  gameStatus: GameStatus
}

export const WordleStats = ({ attemptsUsed, maxAttempts, gameStatus }: WordleStatsProps) => {
  const xpReward = gameStatus === 'won' ? 250 : 0

  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl bg-[#f5f8fb] p-4">
          <div className="mb-1 flex items-center gap-2 text-[#4B92DB]">
            <Target size={16} />
            <span className="text-xs uppercase tracking-wide">Attempts</span>
          </div>
          <p className="text-xl font-bold text-[#002244]">
            {attemptsUsed}/{maxAttempts}
          </p>
        </article>

        <article className="rounded-xl bg-[#f5f8fb] p-4">
          <div className="mb-1 flex items-center gap-2 text-[#4B92DB]">
            <BarChart3 size={16} />
            <span className="text-xs uppercase tracking-wide">XP Earned</span>
          </div>
          <p className="text-xl font-bold text-[#002244]">+{xpReward}</p>
        </article>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[#002244]">Today's Leaderboard</h3>
        <div className="mt-2 space-y-2">
          {wordleLeaderboard.map((entry) => (
            <div
              key={entry.name}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                entry.isCurrentUser ? 'bg-[#002244] text-white' : 'bg-[#f5f8fb] text-[#324252]'
              }`}
            >
              <span>
                #{entry.rank} {entry.name}
              </span>
              <span className="font-semibold">{entry.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
