import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./wining-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: { name: "Player 1", symbol: "X" },
  O: { name: "Player 2", symbol: "O" }
}

function determineWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function setGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { symbol } = player;
    const { row, col } = square;

    gameBoard[row][col] = symbol;
  }
  return gameBoard;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS);
  const [ turns, setTurns ] = useState([]);

  function determineActivePlayer(turns) {
    let activePlayer = players.X;
    if (turns.length > 0 && turns[0].player.symbol === players.X.symbol) {
      activePlayer = players.O;
    }
    return activePlayer;
  }

  function onChangePlayerName(currentPlayer, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [currentPlayer.symbol]: {...currentPlayer, name: newName}
      }
    })
  };

  function handleToggleActivePlayer(rowIndex, colIndex) {
    setTurns(prevTurns => {
      const currentPlayer = determineActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { 
            row: rowIndex, 
            col: colIndex
          },
          player: currentPlayer
        }, ...prevTurns
      ];
      return updatedTurns;
    });
  };

  function resetGame() {
    setTurns([]);
  }

  let gameBoard = setGameBoard(turns);

  const activePlayer = determineActivePlayer(turns);

  const winner = determineWinner(gameBoard, players);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            player={players.X}
            isActive={activePlayer.symbol === players.X.symbol}
            onChangePlayer={onChangePlayerName}
          />
          <Player 
            player={players.O}
            isActive={activePlayer.symbol === players.O.symbol}
            onChangePlayer={onChangePlayerName}
          />
        </ol>
        {(winner || turns.length === 9) && <GameOver winner={winner} resetGame={resetGame}/>}
        <GameBoard
          onToggleActivePlayer={handleToggleActivePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={turns} />
    </main>
  )
}

export default App


