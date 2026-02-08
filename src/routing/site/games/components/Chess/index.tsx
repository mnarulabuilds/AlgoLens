import React, { useState } from "react"
import { Chess } from "chess.js"
import "./styles.css"

const PIECE_UNICODE = {
  w: {
    p: "♙",
    r: "♖",
    n: "♘",
    b: "♗",
    q: "♕",
    k: "♔",
  },
  b: {
    p: "♟",
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
  },
}

export default function App() {
  const [game] = useState(new Chess())

  const [selected, setSelected] = useState(null)
  const [fenBoard, setFenBoard] = useState(game.board())

  const handleClick = (row, col) => {
    const square = String.fromCharCode(97 + col) + (8 - row)

    if (selected) {
      try {
        const move = game.move({ from: selected, to: square, promotion: "q" })
        if (move) {
          setFenBoard(game.board())
        }
      } catch (e) {
        // Invalid move
      }
      setSelected(null)
    } else {
      const piece = game.get(square)
      if (piece && piece.color === game.turn()) {
        setSelected(square)
      }
    }
  }

  const getSquareColor = (row, col) => {
    return (row + col) % 2 === 0 ? "light" : "dark"
  }

  const isGameOver = game.isGameOver()

  return (
    <div className="container">
      <h2>Let&apos;s Play Chess</h2>
      <div className="board-container">
        <div className="board">
          {fenBoard.map((row, rowIdx) =>
            row.map((piece, colIdx) => {
              const square = String.fromCharCode(97 + colIdx) + (8 - rowIdx)
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`square ${getSquareColor(rowIdx, colIdx)} ${
                    selected === square ? "selected" : ""
                  }`}
                  onClick={() => handleClick(rowIdx, colIdx)}
                >
                  {colIdx === 0 && (
                    <span className="coordinate rank">{8 - rowIdx}</span>
                  )}
                  {rowIdx === 7 && (
                    <span className="coordinate file">
                      {String.fromCharCode(97 + colIdx)}
                    </span>
                  )}
                  {piece && (
                    <span
                      className={`piece ${
                        piece.color === "w" ? "white" : "black"
                      }`}
                    >
                      {PIECE_UNICODE[piece.color][piece.type]}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
      <div className="status">
        {isGameOver ? (
          <div className="game-over">
            {game.isCheckmate() && (
              <p>Checkmate! {game.turn() === "w" ? "Black" : "White"} wins!</p>
            )}
            {game.isDraw() && <p>Game Over - Draw!</p>}
            {game.isStalemate() && <p>Game Over - Stalemate!</p>}
            {game.isThreefoldRepetition() && (
              <p>Game Over - Threefold Repetition!</p>
            )}
          </div>
        ) : (
          <div className="turn-indicator">
            <div
              className={`color-dot ${game.turn() === "w" ? "white" : "black"}`}
            ></div>
            <span>Turn: {game.turn() === "w" ? "White" : "Black"}</span>
            {game.inCheck() && <span className="check"> - Check!</span>}
          </div>
        )}
      </div>
      <button
        className="reset-button"
        onClick={() => {
          game.reset()
          setFenBoard(game.board())
          setSelected(null)
        }}
      >
        Reset Game
      </button>
    </div>
  )
}
