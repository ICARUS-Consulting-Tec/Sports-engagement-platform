export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty'

export type Tile = {
  letter: string
  status: LetterStatus
}

export type GuessRow = Tile[]

export type GameStatus = 'playing' | 'won' | 'lost'

export type KeyboardStatus = Record<string, LetterStatus>
