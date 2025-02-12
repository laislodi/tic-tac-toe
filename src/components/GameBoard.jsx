export default function GameBoard({ onToggleActivePlayer, board }) {
  // const [ gameBoard, setGameBoard ] = useState(initialGameBoard);

  // function handleClick(rowIndex, colIndex) {
  //   if (gameBoard[rowIndex][colIndex] == null) {
  //     setGameBoard((prevGameBoard) => {
  //       const updatedGameBoard = [...prevGameBoard.map(arr => [...arr])];
  //       updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //       return updatedGameBoard;
  //     });
  //     onToggleActivePlayer();
  //   }
  // };

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onToggleActivePlayer(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}
