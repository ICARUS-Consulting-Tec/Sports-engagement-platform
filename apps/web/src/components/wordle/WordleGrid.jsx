const statusStyles = {
  correct: "wordle-tile-correct",
  present: "wordle-tile-present",
  absent: "wordle-tile-absent",
  empty: "wordle-tile-empty",
};

function WordleGrid({ board }) {
  return (
    <div className="wordle-grid">
      {board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="wordle-grid-row">
          {row.map((tile, tileIndex) => (
            <div
              key={`tile-${rowIndex}-${tileIndex}`}
              className={`wordle-tile ${statusStyles[tile.status]}`}
            >
              {tile.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default WordleGrid;
