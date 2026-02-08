import React from "react"
import "./Square.css"

const Square = React.memo(({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      <span value={value}>{value}</span>
    </button>
  )
})

Square.displayName = "TicTacToe.Square"

export default Square
