import { RefreshCw } from 'lucide-react'
import { useEffect } from 'react'
import { useWordle } from '../../hooks/useWordle'
import { WordleGrid } from './WordleGrid'
import { WordleKeyboard } from './WordleKeyboard'
import type { CSSProperties } from 'react'

export const WordleGame = () => {
  const { board, gameStatus, handleInput, keyboardStatus, message, resetGame, targetWord } = useWordle()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace') {
        handleInput('BACKSPACE')
        return
      }

      if (event.key === 'Enter') {
        handleInput('ENTER')
        return
      }

      if (/^[a-zA-Z]$/.test(event.key)) {
        handleInput(event.key.toUpperCase())
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleInput])

  return (
    <section style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>WORDLE</h2>
      </header>

      <WordleGrid board={board} />
      <p style={styles.message}>{message}</p>

      <div style={styles.keyboardWrap}>
        <WordleKeyboard keyboardStatus={keyboardStatus} onKeyPress={handleInput} />
      </div>

      <div style={styles.resetWrap}>
        <button
          type="button"
          onClick={resetGame}
          style={styles.resetButton}
        >
          <RefreshCw size={14} />
          Reiniciar
        </button>
      </div>

      {gameStatus !== 'playing' && <p style={styles.targetWord}>Palabra: {targetWord}</p>}
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  container: {
    borderRadius: "16px",
    border: "1px solid #d8dee5",
    backgroundColor: "#fff",
    padding: "16px 20px 20px 20px",
    width: "100%",
    maxWidth: "560px",
  },
  header: {
    marginBottom: "16px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: 900,
    color: "#002244",
    margin: 0,
    letterSpacing: "0.04em",
  },
  message: {
    marginTop: "14px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 600,
    color: "#2f4053",
    minHeight: "20px",
  },
  keyboardWrap: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "center",
  },
  resetWrap: {
    marginTop: "16px",
    display: "flex",
    justifyContent: "center",
  },
  resetButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    borderRadius: "999px",
    border: "1px solid #d8dee5",
    backgroundColor: "#fff",
    color: "#002244",
    fontSize: "12px",
    fontWeight: 700,
    padding: "8px 14px",
    cursor: "pointer",
  },
  targetWord: {
    marginTop: "12px",
    textAlign: "center",
    fontSize: "12px",
    color: "#6f7d8c",
  },
}
