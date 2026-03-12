import { useCallback, useMemo, useState } from 'react'
import { wordleWords } from '../data/wordleWords'
import type { GameStatus, GuessRow, KeyboardStatus, LetterStatus, Tile } from '../types'

const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

const emptyTile = (): Tile => ({ letter: '', status: 'empty' })

const buildEmptyBoard = (): GuessRow[] =>
  Array.from({ length: MAX_ATTEMPTS }, () =>
    Array.from({ length: WORD_LENGTH }, () => emptyTile()),
  )

const pickRandomWord = (): string => {
  const index = Math.floor(Math.random() * wordleWords.length)
  return wordleWords[index]
}

const statusPriority: Record<LetterStatus, number> = {
  empty: 0,
  absent: 1,
  present: 2,
  correct: 3,
}

const evaluateGuess = (guess: string, targetWord: string): GuessRow => {
  const row: GuessRow = guess.split('').map((letter) => ({ letter, status: 'absent' }))
  const remainingLetters: Record<string, number> = {}

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    const targetLetter = targetWord[i]
    const guessLetter = guess[i]

    if (guessLetter === targetLetter) {
      row[i].status = 'correct'
    } else {
      remainingLetters[targetLetter] = (remainingLetters[targetLetter] ?? 0) + 1
    }
  }

  for (let i = 0; i < WORD_LENGTH; i += 1) {
    if (row[i].status === 'correct') {
      continue
    }

    const guessLetter = guess[i]
    const count = remainingLetters[guessLetter] ?? 0
    if (count > 0) {
      row[i].status = 'present'
      remainingLetters[guessLetter] = count - 1
    }
  }

  return row
}

export const useWordle = () => {
  const [targetWord, setTargetWord] = useState<string>(() => pickRandomWord())
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [board, setBoard] = useState<GuessRow[]>(() => buildEmptyBoard())
  const [attempt, setAttempt] = useState<number>(0)
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [message, setMessage] = useState<string>('Adivina la palabra de 5 letras')

  const keyboardStatus = useMemo<KeyboardStatus>(() => {
    const map: KeyboardStatus = {}

    for (const row of board) {
      for (const tile of row) {
        if (!tile.letter || tile.status === 'empty') {
          continue
        }

        const previous = map[tile.letter]
        if (!previous || statusPriority[tile.status] > statusPriority[previous]) {
          map[tile.letter] = tile.status
        }
      }
    }

    return map
  }, [board])

  const handleInput = useCallback(
    (key: string) => {
      if (gameStatus !== 'playing') {
        return
      }

      if (key === 'BACKSPACE' || key === 'DEL') {
        setCurrentGuess((prev) => prev.slice(0, -1))
        return
      }

      if (key === 'ENTER') {
        if (currentGuess.length !== WORD_LENGTH) {
          setMessage('Necesitas 5 letras para enviar')
          return
        }

        if (!wordleWords.includes(currentGuess)) {
          setMessage('Palabra no permitida en este prototipo')
          return
        }

        const evaluatedRow = evaluateGuess(currentGuess, targetWord)

        setBoard((prev) => {
          const next = [...prev]
          next[attempt] = evaluatedRow
          return next
        })

        if (currentGuess === targetWord) {
          setGameStatus('won')
          setMessage('Ganaste. Excelente jugada.')
          return
        }

        if (attempt + 1 >= MAX_ATTEMPTS) {
          setGameStatus('lost')
          setMessage(`Perdiste. La palabra era ${targetWord}.`)
          return
        }

        setAttempt((prev) => prev + 1)
        setCurrentGuess('')
        setMessage('Sigue intentando')
        return
      }

      if (!/^[A-Z]$/.test(key)) {
        return
      }

      setCurrentGuess((prev) => {
        if (prev.length >= WORD_LENGTH) {
          return prev
        }
        return `${prev}${key}`
      })
      setMessage('')
    },
    [attempt, currentGuess, gameStatus, targetWord],
  )

  const resetGame = useCallback(() => {
    setTargetWord(pickRandomWord())
    setCurrentGuess('')
    setBoard(buildEmptyBoard())
    setAttempt(0)
    setGameStatus('playing')
    setMessage('Nueva partida iniciada')
  }, [])

  const visibleBoard = useMemo<GuessRow[]>(() => {
    return board.map((row, index) => {
      if (index !== attempt || gameStatus !== 'playing') {
        return row
      }

      return row.map((tile, tileIndex) => {
        if (tileIndex < currentGuess.length) {
          return { letter: currentGuess[tileIndex], status: 'empty' }
        }
        return tile
      })
    })
  }, [attempt, board, currentGuess, gameStatus])

  return {
    attempt,
    board: visibleBoard,
    currentGuess,
    gameStatus,
    handleInput,
    keyboardStatus,
    maxAttempts: MAX_ATTEMPTS,
    message,
    resetGame,
    targetWord,
    wordLength: WORD_LENGTH,
  }
}
