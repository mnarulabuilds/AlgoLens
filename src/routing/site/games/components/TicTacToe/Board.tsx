import React from "react"
import Square from "./Square"
import "./Board.css"

const Board = React.memo(({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => onClick(index)} />
      ))}
    </div>
  )
})

Board.displayName = "TicTacToe.Board"

export default Board
