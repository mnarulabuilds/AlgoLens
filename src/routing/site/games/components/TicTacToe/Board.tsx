import React from "react"
import Square from "./Square"
import "./Board.module.scss"

type SquareValue = "X" | "O" | null
type BoardProps = {
  squares: SquareValue[]
  onClick: (index: number) => void
}

const Board = React.memo(({ squares, onClick }: BoardProps) => {
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
