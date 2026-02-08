import React, { useState } from "react"
import Board from "./Board"
import "./Game.css"

const Game = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])
  const [stepNumber, setStepNumber] = useState(0)
  const [isXNext, setIsXNext] = useState(true)

  const handleClick = (index) => {
    const currentHistory = history.slice(0, stepNumber + 1)
    const current = currentHistory[currentHistory.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[index]) {
      return
    }

    squares[index] = isXNext ? "X" : "O"
    setHistory(currentHistory.concat([{ squares }]))
    setStepNumber(currentHistory.length)
    setIsXNext(!isXNext)
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setIsXNext(step % 2 === 0)
  }

  const current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  const moves = history
    .map((step, move) => {
      const desc = move ? `Go to move #${move}` : "Go to game start"
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    .reverse() // Reverse the order of the moves

  const status = winner ? (
    <>
      Winner: <span>{winner}</span>
    </>
  ) : stepNumber === 9 ? (
    <>
      Game is a <span>Tie</span>
    </>
  ) : (
    <>
      Next player: <span>{isXNext ? "X" : "O"}</span>
    </>
  )

  return (
    <div className="game-tic-tac-toe">
      <div className="game-info">
        <div>{status}</div>
      </div>

      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Game
