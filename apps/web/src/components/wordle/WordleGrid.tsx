import type { GuessRow, LetterStatus } from '../../types/wordle'
import type { CSSProperties } from 'react'

type WordleGridProps = {
  board: GuessRow[]
}

const statusStyles: Record<LetterStatus, CSSProperties> = {
  correct: { borderColor: '#31b63f', backgroundColor: '#31b63f', color: '#fff' },
  present: { borderColor: '#d7b728', backgroundColor: '#d7b728', color: '#fff' },
  absent: { borderColor: '#a5acaf', backgroundColor: '#a5acaf', color: '#fff' },
  empty: { borderColor: '#d4dbe3', backgroundColor: '#fff', color: '#002244' },
}

export const WordleGrid = ({ board }: WordleGridProps) => {
  return (
    <div style={styles.wrapper}>
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} style={styles.row}>
          {row.map((tile, tileIndex) => (
            <div
              key={`tile-${rowIndex}-${tileIndex}`}
              style={{ ...styles.tile, ...statusStyles[tile.status] }}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    margin: '0 auto',
    width: 'fit-content',
    display: 'grid',
    gap: '8px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: '8px',
  },
  tile: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: 1,
    textTransform: 'uppercase',
  },
}
