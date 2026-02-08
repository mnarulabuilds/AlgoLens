import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaBomb, FaFlag } from "react-icons/fa"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./Minesweeper.css"

const DIFFICULTY = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
}

const Minesweeper = () => {
  const [difficulty, setDifficulty] = useState("beginner")
  const [board, setBoard] = useState([])
  const [revealed, setRevealed] = useState([])
  const [flagged, setFlagged] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [minesLeft, setMinesLeft] = useState(DIFFICULTY.beginner.mines)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [firstClick, setFirstClick] = useState(true)

  useTrackView({
    id: "games-minesweeper",
    label: "Minesweeper",
    category: "Game Zone",
    route: "/games/Minesweeper",
  })

  useEffect(() => {
    let interval
    if (isRunning && !gameOver && !won) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, gameOver, won])

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  const initializeGame = () => {
    const { rows, cols } = DIFFICULTY[difficulty]
    const newBoard = Array(rows)
      .fill()
      .map(() => Array(cols).fill(0))
    setBoard(newBoard)
    setRevealed(
      Array(rows)
        .fill()
        .map(() => Array(cols).fill(false))
    )
    setFlagged(
      Array(rows)
        .fill()
        .map(() => Array(cols).fill(false))
    )
    setGameOver(false)
    setWon(false)
    setTimer(0)
    setIsRunning(false)
    setFirstClick(true)
    setMinesLeft(DIFFICULTY[difficulty].mines)
  }

  const placeMines = (avoidRow, avoidCol) => {
    const { rows, cols, mines } = DIFFICULTY[difficulty]
    const newBoard = Array(rows)
      .fill()
      .map(() => Array(cols).fill(0))
    let minesPlaced = 0

    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)

      // Don't place mine on first click or adjacent cells
      if (Math.abs(row - avoidRow) <= 1 && Math.abs(col - avoidCol) <= 1) {
        continue
      }

      if (newBoard[row][col] !== -1) {
        newBoard[row][col] = -1
        minesPlaced++
      }
    }

    // Calculate numbers
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (newBoard[i][j] !== -1) {
          let count = 0
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              const ni = i + di
              const nj = j + dj
              if (
                ni >= 0 &&
                ni < rows &&
                nj >= 0 &&
                nj < cols &&
                newBoard[ni][nj] === -1
              ) {
                count++
              }
            }
          }
          newBoard[i][j] = count
        }
      }
    }

    setBoard(newBoard)
  }

  const revealCell = (row, col) => {
    if (gameOver || won || revealed[row][col] || flagged[row][col]) return

    if (firstClick) {
      placeMines(row, col)
      setFirstClick(false)
      setIsRunning(true)
    }

    const newRevealed = revealed.map((r) => [...r])

    if (board[row][col] === -1) {
      newRevealed[row][col] = true
      setRevealed(newRevealed)
      setGameOver(true)
      setIsRunning(false)
      revealAllMines()
      return
    }

    const floodFill = (r, c) => {
      if (
        r < 0 ||
        r >= DIFFICULTY[difficulty].rows ||
        c < 0 ||
        c >= DIFFICULTY[difficulty].cols ||
        newRevealed[r][c] ||
        flagged[r][c]
      ) {
        return
      }

      newRevealed[r][c] = true

      if (board[r][c] === 0) {
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            floodFill(r + di, c + dj)
          }
        }
      }
    }

    floodFill(row, col)
    setRevealed(newRevealed)

    // Check win condition
    checkWin(newRevealed)
  }

  const toggleFlag = (row, col, e) => {
    e.preventDefault()
    if (gameOver || won || revealed[row][col] || firstClick) return

    const newFlagged = flagged.map((r) => [...r])
    newFlagged[row][col] = !newFlagged[row][col]
    setFlagged(newFlagged)

    const flagCount = newFlagged.flat().filter((f) => f).length
    setMinesLeft(DIFFICULTY[difficulty].mines - flagCount)
  }

  const revealAllMines = () => {
    const newRevealed = revealed.map((r) => [...r])
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === -1) {
          newRevealed[i][j] = true
        }
      }
    }
    setRevealed(newRevealed)
  }

  const checkWin = (currentRevealed) => {
    const { rows, cols, mines } = DIFFICULTY[difficulty]
    const revealedCount = currentRevealed.flat().filter((r) => r).length
    if (revealedCount === rows * cols - mines) {
      setWon(true)
      setIsRunning(false)
    }
  }

  const getCellColor = (value) => {
    const colors = {
      1: "#0000ff",
      2: "#008000",
      3: "#ff0000",
      4: "#000080",
      5: "#800000",
      6: "#008080",
      7: "#000000",
      8: "#808080",
    }
    return colors[value] || "#000"
  }

  return (
    <div className="minesweeper-container">
      <div className="minesweeper-header">
        <h1>Minesweeper 💣</h1>
        <p>Find all mines without detonating any!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-minesweeper",
              label: "Minesweeper",
              category: "Game Zone",
              route: "/games/Minesweeper",
            }}
          />
        </div>
      </div>

      <div className="minesweeper-content">
        <div className="game-controls">
          <div className="difficulty-selector">
            {Object.keys(DIFFICULTY).map((diff) => (
              <button
                key={diff}
                className={`diff-btn ${difficulty === diff ? "active" : ""}`}
                onClick={() => setDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)}
              </button>
            ))}
          </div>

          <div className="game-info">
            <div className="info-box">
              <FaBomb />
              <span>{minesLeft}</span>
            </div>
            <button className="new-game-btn" onClick={initializeGame}>
              New Game
            </button>
            <div className="info-box">
              ⏱️ <span>{timer}s</span>
            </div>
          </div>
        </div>

        <div className="board-wrapper">
          <div
            className="minesweeper-board"
            style={{
              gridTemplateColumns: `repeat(${DIFFICULTY[difficulty].cols}, 1fr)`,
            }}
          >
            {board.map((row, i) =>
              row.map((cell, j) => (
                <motion.div
                  key={`${i}-${j}`}
                  className={`cell ${revealed[i][j] ? "revealed" : ""} ${
                    flagged[i][j] ? "flagged" : ""
                  } ${revealed[i][j] && cell === -1 ? "mine" : ""}`}
                  onClick={() => revealCell(i, j)}
                  onContextMenu={(e) => toggleFlag(i, j, e)}
                  whileHover={{ scale: revealed[i][j] ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {flagged[i][j] && !revealed[i][j] && (
                    <FaFlag className="flag-icon" />
                  )}
                  {revealed[i][j] &&
                    (cell === -1 ? (
                      <FaBomb className="bomb-icon" />
                    ) : cell > 0 ? (
                      <span style={{ color: getCellColor(cell) }}>{cell}</span>
                    ) : null)}
                </motion.div>
              ))
            )}
          </div>

          {(gameOver || won) && (
            <motion.div
              className="game-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="overlay-content">
                <h2>{won ? "You Win! 🎉" : "Game Over! 💥"}</h2>
                <p>Time: {timer}s</p>
                <button className="try-again-btn" onClick={initializeGame}>
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>
              <strong>Left Click</strong> to reveal a cell
            </li>
            <li>
              <strong>Right Click</strong> to place/remove a flag
            </li>
            <li>Numbers show how many mines are adjacent to that cell</li>
            <li>First click is always safe</li>
            <li>Find all non-mine cells to win!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Minesweeper
