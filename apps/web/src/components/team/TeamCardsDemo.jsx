import { useMemo, useState } from 'react'
import { LockKeyhole, Sparkles } from 'lucide-react'
import willCardImage from '../../assets/cardsPhotos/Will.png'
import derrickCardImage from '../../assets/cardsPhotos/Derick.png'
import deAndreCardImage from '../../assets/cardsPhotos/Deandre.png'

const players = [
  {
    id: 1,
    name: 'Will Levis',
    position: 'QB',
    rarity: 'Elite',
    image: willCardImage,
  },
  {
    id: 2,
    name: 'Derrick Henry',
    position: 'RB',
    rarity: 'Titans',
    image: derrickCardImage,
  },
  {
    id: 3,
    name: 'DeAndre Hopkins',
    position: 'WR',
    rarity: 'Rare',
    image: deAndreCardImage,
  },
]

const rarityBorderStyles = {
  Elite: 'border-[#c1121f]',
  Titans: 'border-[#001f54]',
  Rare: 'border-[#7cc7ff]',
}

const rarityOuterBorderStyles = {
  Elite: 'border-[#c1121f]/70 hover:border-[#c1121f]',
  Titans: 'border-[#001f54]/70 hover:border-[#001f54]',
  Rare: 'border-[#7cc7ff]/80 hover:border-[#7cc7ff]',
}

const rarityInnerFrameStyles = {
  Elite: 'border-[#c1121f]/45',
  Titans: 'border-[#001f54]/40',
  Rare: 'border-[#7cc7ff]/45',
}

export const TeamCardsDemo = () => {
  const [unlocked, setUnlocked] = useState([])
  const [showStats, setShowStats] = useState([])

  const unlockedSet = useMemo(() => new Set(unlocked), [unlocked])
  const statsSet = useMemo(() => new Set(showStats), [showStats])

  const unlockCard = (id) => {
    setUnlocked((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cardId) => cardId !== id)
      }
      return [...prev, id]
    })
    setShowStats((prev) => prev.filter((cardId) => cardId !== id))
  }

  const toggleStats = (id) => {
    if (!unlockedSet.has(id)) return
    setShowStats((prev) => (prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]))
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <h1 className="text-2xl font-black tracking-tight text-[#002244] sm:text-3xl">Titan Roster Cards</h1>
          <div className="h-[2px] w-16 rounded-full bg-[#c53030]/70" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => {
            const isUnlocked = unlockedSet.has(player.id)
            const isFlipped = statsSet.has(player.id)

            return (
              <article
                key={player.id}
                className={`group relative overflow-hidden rounded-[1.5rem] border-[0.5px] ${rarityOuterBorderStyles[player.rarity]} bg-white transition-all duration-300 ${
                  isUnlocked
                    ? 'shadow-[0_12px_30px_rgba(0,34,68,0.12)] hover:-translate-y-2 hover:shadow-[0_22px_40px_rgba(0,34,68,0.2)]'
                    : 'shadow-[0_8px_20px_rgba(0,34,68,0.08)]'
                }`}
              >
                <div className="absolute inset-0 bg-white" />
                <div className={`absolute inset-[0.5px] rounded-[1.45rem] border-[0.5px] ${rarityInnerFrameStyles[player.rarity]}`} />

                <div className="relative p-2">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#002244]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                      <Sparkles size={12} />
                      {player.rarity}
                    </span>
                  </div>

                  <div className="relative mx-auto w-full max-w-[260px] [perspective:1200px]">
                    <div
                      className={`relative aspect-[3/4] w-full rounded-xl border-[0.5px] ${rarityBorderStyles[player.rarity]} transition-all duration-700 [transform-style:preserve-3d] ${
                        isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
                      } ${isUnlocked ? 'group-hover:scale-[1.05] group-hover:shadow-[0_20px_35px_rgba(0,0,0,0.32)]' : ''}`}
                    >
                      <div className="absolute inset-0 overflow-hidden rounded-[0.68rem] bg-[#0f2138] [backface-visibility:hidden]">
                        <img
                          src={player.image}
                          alt={player.name}
                          className={`h-full w-full object-cover transition duration-500 ${
                            isUnlocked ? 'group-hover:scale-110' : 'scale-[1.02] saturate-0'
                          }`}
                        />

                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{player.position}</p>
                          <p className="text-lg font-black uppercase tracking-wide text-white">{player.name}</p>
                        </div>
                      </div>

                      <div className="absolute inset-0 rounded-[0.68rem] border border-white/50 bg-gradient-to-br from-[#0f3053] via-[#123963] to-[#0d2542] p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">Dummy Stats</p>
                        <h3 className="mt-1 text-lg font-black uppercase tracking-wide">{player.name}</h3>
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5">
                            <span>Overall</span>
                            <span className="font-bold">89</span>
                          </div>
                          <div className="flex items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5">
                            <span>Speed</span>
                            <span className="font-bold">84</span>
                          </div>
                          <div className="flex items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5">
                            <span>Power</span>
                            <span className="font-bold">91</span>
                          </div>
                          <div className="flex items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5">
                            <span>Clutch</span>
                            <span className="font-bold">87</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#081526]/55 backdrop-blur-[2px]">
                        <div className="rounded-xl border border-white/25 bg-[#00152c]/75 px-4 py-3 text-center text-white">
                          <LockKeyhole className="mx-auto mb-2" size={20} />
                          <p className="text-sm font-semibold">Carta bloqueada</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => unlockCard(player.id)}
                      aria-pressed={isUnlocked}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                        isUnlocked
                          ? 'bg-[#0f2f53] text-white hover:scale-[1.03] hover:bg-[#0b2746]'
                          : 'bg-white text-[#0b2c4b] shadow-sm hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-[#002244] hover:text-white'
                      }`}
                    >
                      {isUnlocked ? 'Bloquear' : 'Desbloquear'}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleStats(player.id)}
                      disabled={!isUnlocked}
                      aria-pressed={isFlipped}
                      className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition ${
                        isUnlocked
                          ? 'border-[#1a3f69] bg-[#0f2f53] text-white hover:scale-[1.03] hover:bg-[#123b67]'
                          : 'cursor-not-allowed border-[#b7c4d1] bg-white/60 text-[#6f7d8c]'
                      }`}
                    >
                      {isFlipped ? 'Hide Stats' : 'View Stats'}
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export const TeamCardDemo = TeamCardsDemo
