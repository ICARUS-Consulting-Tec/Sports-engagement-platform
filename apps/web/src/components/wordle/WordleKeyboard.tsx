import type { KeyboardStatus, LetterStatus } from '../../types/wordle'
import type { CSSProperties } from 'react'

type WordleKeyboardProps = {
  keyboardStatus: KeyboardStatus
  onKeyPress: (key: string) => void
}

const rows = ['QWERTYUIOP', 'ASDFGHJKL', 'ENTERZXCVBNMDEL']

const keyStatusStyles: Record<LetterStatus, CSSProperties> = {
  correct: { backgroundColor: '#31b63f', color: '#fff' },
  present: { backgroundColor: '#d7b728', color: '#fff' },
  absent: { backgroundColor: '#a5acaf', color: '#fff' },
  empty: { backgroundColor: '#e8edf3', color: '#002244' },
}

const normalizeKey = (key: string) => {
  if (key === 'DEL') return 'DEL'
  if (key === 'ENTER') return 'ENTER'
  return key
}

const splitRow = (row: string): string[] => {
  if (row.includes('ENTER')) {
    return ['ENTER', ...'ZXCVBNM'.split(''), 'DEL']
  }
  return row.split('')
}

export const WordleKeyboard = ({ keyboardStatus, onKeyPress }: WordleKeyboardProps) => {
  return (
    <div style={styles.wrapper}>
      {rows.map((row) => (
        <div key={row} style={styles.row}>
          {splitRow(row).map((key) => {
            const status = keyboardStatus[normalizeKey(key)] ?? 'empty'
            const isWide = key === 'ENTER' || key === 'DEL'

            return (
              <button
                key={key}
                type="button"
                onClick={() => onKeyPress(key)}
                style={{
                  ...styles.key,
                  ...(isWide ? styles.wideKey : styles.normalKey),
                  ...keyStatusStyles[status],
                }}
              >
                {key}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: 'grid',
    gap: '8px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    gap: '6px',
  },
  key: {
    height: '36px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 700,
    padding: '0 8px',
    cursor: 'pointer',
  },
  wideKey: {
    minWidth: '56px',
  },
  normalKey: {
    width: '32px',
  },
}
