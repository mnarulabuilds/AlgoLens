import React from "react"
import "./Square.module.scss"

type SquareProps = {
  value: "X" | "O" | null
  onClick: () => void
}

const Square = React.memo(({ value, onClick }: SquareProps) => {
  return (
    <button className="square" onClick={onClick}>
      <span>{value}</span>
    </button>
  )
})

Square.displayName = "TicTacToe.Square"

export default Square
