import React, { useState, useEffect, useCallback } from "react"
import Board from "common/components/Board"
import { Container, Row, Col } from "reactstrap"
import Input from "./Input"

const NQueens = () => {
  const [queens, setQueens] = useState([])
  const [number, setNumber] = useState(0)
  const [disabled, setDisabled] = useState(false)

  const safe = useCallback((row, col, board) => {
    const queens = board.map((col, row) => ({ row, col }))
    for (let queen of queens) {
      if (
        queen.row === row ||
        queen.col === col ||
        Math.abs(queen.row - row) === Math.abs(queen.col - col)
      ) {
        return false
      }
    }
    return true
  }, [])

  const solveNQueens = (n) => {
    const solve = (row, board) => {
      if (row === n) {
        setQueens(board.map((col, row) => ({ row, col })))
        setDisabled(false)
        alert("Found Solution!!!")
        return true
      }
      for (let col = 0; col < n; col++) {
        if (safe(row, col, board)) {
          board.push(col)
          if (solve(row + 1, board)) {
            return true
          }
          board.pop()
        }
      }
      return false
    }
    return solve(0, [])
  }

  const handleQueens = (input) => {
    if (input >= 1 && input <= 16 && !disabled) {
      setNumber(input)
      setDisabled(true)
      setQueens([])
    } else {
      alert(
        disabled
          ? "Pending Operations"
          : "Not computable. Input supported 1 to 16"
      )
    }
  }

  useEffect(() => {
    if (disabled && number > 0) {
      if (!solveNQueens(number)) {
        setDisabled(false)
        alert("Did not find solution. Try different input!!!")
      }
    }
  }, [disabled, number, safe])

  return (
    <Container>
      <Row className="text-center">
        <Col xs={12}>
          <Input onQueens={handleQueens} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Board
            size={number}
            queens={queens.map((queen) => queen.row * number + queen.col)}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default NQueens
