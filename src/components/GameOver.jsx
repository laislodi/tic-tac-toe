export default function GameOver({winner, resetGame}) {
  return (
    <div id="game-over">
    <h2>Game Over!</h2>
    <p>{winner ? `${winner.name} won!` : "It was a draw!"}</p>
    <p>
      <button onClick={resetGame}>Rematch!</button>
    </p>
    </div>
  )
}