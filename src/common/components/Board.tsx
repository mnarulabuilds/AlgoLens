import React, { useState, useEffect } from "react"
import { FaChessQueen } from "react-icons/fa"

const Cell = ({ styles, children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingTop: "100%",
        boxSizing: `border-box`,
        ...styles,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  )
}

const Board = React.memo(({ size, queens }) => {
  const [cells, setCells] = useState([])

  useEffect(() => {
    const totalPieces = size * size
    const newCells = []
    let color = "#D3D3D3"

    for (let i = 0; i < totalPieces; i++) {
      color = color === "#D3D3D3" ? "#606060" : "#D3D3D3"
      if (i % size === 0 && i % 2 === 0 && totalPieces % 2 === 0) {
        color = color === "#D3D3D3" ? "#606060" : "#D3D3D3"
      }
      if (queens.includes(i)) {
        newCells.push(
          <Cell key={i} styles={{ backgroundColor: color }}>
            <FaChessQueen
              style={{
                fontSize: "1.5rem",
                color: "rgba(30,190,170,0.8)",
              }}
            />
          </Cell>
        )
      } else {
        newCells.push(<Cell key={i} styles={{ backgroundColor: color }} />)
      }
    }

    setCells(newCells)
  }, [size, queens])

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, minmax(12px, 1fr))`,
    gridTemplateRows: `repeat(${size}, minmax(12px, 1fr))`,
    width: "100%",
    maxWidth: `100vw`,
    padding: "4px",
    gap: "4px",
    margin: "0 auto",
    boxSizing: `border-box`,
  }

  return (
    <div className="ch-board" style={boardStyle}>
      {cells}
    </div>
  )
})

Board.displayName = "NQueens.Board"

export default Board
