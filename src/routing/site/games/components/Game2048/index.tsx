import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./Game2048.css"

const Game2048 = () => {
  const [board, setBoard] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)

  // Track this view
  useTrackView({
    id: "games-2048",
    label: "2048 Game",
    category: "Game Zone",
    route: "/games/Game2048",
  })

  useEffect(() => {
    const savedBest = localStorage.getItem("2048-best-score")
    if (savedBest) {
      setBestScore(parseInt(savedBest))
    }
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newBoard = Array(4)
      .fill()
      .map(() => Array(4).fill(0))
    addNewTile(newBoard)
    addNewTile(newBoard)
    setBoard(newBoard)
    setScore(0)
    setGameOver(false)
    setWon(false)
  }

  const addNewTile = (currentBoard) => {
    const emptyTiles = []
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) {
          emptyTiles.push({ row: i, col: j })
        }
      }
    }

    if (emptyTiles.length > 0) {
      const { row, col } = emptyTiles[
        Math.floor(Math.random() * emptyTiles.length)
      ]
      currentBoard[row][col] = Math.random() < 0.9 ? 2 : 4
    }
  }

  const move = useCallback(
    (direction) => {
      if (gameOver || won) return

      const newBoard = JSON.parse(JSON.stringify(board))
      let moved = false
      let newScore = score

      const moveLeft = (row) => {
        const filtered = row.filter((val) => val !== 0)
        const merged = []
        let skip = false

        for (let i = 0; i < filtered.length; i++) {
          if (skip) {
            skip = false
            continue
          }
          if (filtered[i] === filtered[i + 1]) {
            merged.push(filtered[i] * 2)
            newScore += filtered[i] * 2
            skip = true
            if (filtered[i] * 2 === 2048) {
              setWon(true)
            }
          } else {
            merged.push(filtered[i])
          }
        }

        while (merged.length < 4) {
          merged.push(0)
        }
        return merged
      }

      if (direction === "left") {
        for (let i = 0; i < 4; i++) {
          const newRow = moveLeft(newBoard[i])
          if (JSON.stringify(newRow) !== JSON.stringify(board[i])) {
            moved = true
          }
          newBoard[i] = newRow
        }
      } else if (direction === "right") {
        for (let i = 0; i < 4; i++) {
          const reversed = [...newBoard[i]].reverse()
          const newRow = moveLeft(reversed).reverse()
          if (JSON.stringify(newRow) !== JSON.stringify(board[i])) {
            moved = true
          }
          newBoard[i] = newRow
        }
      } else if (direction === "up") {
        for (let j = 0; j < 4; j++) {
          const column = [
            newBoard[0][j],
            newBoard[1][j],
            newBoard[2][j],
            newBoard[3][j],
          ]
          const newColumn = moveLeft(column)
          if (JSON.stringify(newColumn) !== JSON.stringify(column)) {
            moved = true
          }
          for (let i = 0; i < 4; i++) {
            newBoard[i][j] = newColumn[i]
          }
        }
      } else if (direction === "down") {
        for (let j = 0; j < 4; j++) {
          const column = [
            newBoard[0][j],
            newBoard[1][j],
            newBoard[2][j],
            newBoard[3][j],
          ]
          const newColumn = moveLeft(column.reverse()).reverse()
          if (JSON.stringify(newColumn) !== JSON.stringify(column.reverse())) {
            moved = true
          }
          for (let i = 0; i < 4; i++) {
            newBoard[i][j] = newColumn[i]
          }
        }
      }

      if (moved) {
        addNewTile(newBoard)
        setBoard(newBoard)
        setScore(newScore)

        if (newScore > bestScore) {
          setBestScore(newScore)
          localStorage.setItem("2048-best-score", newScore.toString())
        }

        if (isGameOver(newBoard)) {
          setGameOver(true)
        }
      }
    },
    [board, score, gameOver, won, bestScore]
  )

  const isGameOver = (currentBoard) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return false
        if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1]) return false
        if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) return false
      }
    }
    return true
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        const directions = {
          ArrowUp: "up",
          ArrowDown: "down",
          ArrowLeft: "left",
          ArrowRight: "right",
        }
        move(directions[e.key])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [move])

  const getTileColor = (value) => {
    const colors = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    }
    return colors[value] || "#3c3a32"
  }

  return (
    <div className="game2048-container">
      <div className="game2048-header">
        <h1>2048 Game 🔢</h1>
        <p>Use arrow keys to slide tiles. Merge tiles to reach 2048!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-2048",
              label: "2048 Game",
              category: "Game Zone",
              route: "/games/Game2048",
            }}
          />
        </div>
      </div>

      <div className="game2048-content">
        <div className="score-container">
          <div className="score-box">
            <div className="score-label">Score</div>
            <div className="score-value">{score}</div>
          </div>
          <div className="score-box best">
            <div className="score-label">Best</div>
            <div className="score-value">{bestScore}</div>
          </div>
        </div>

        <button className="new-game-btn" onClick={initializeGame}>
          New Game
        </button>

        <div className="game-board">
          {board.map((row, i) =>
            row.map((value, j) => (
              <motion.div
                key={`${i}-${j}`}
                className="tile"
                style={{
                  backgroundColor: getTileColor(value),
                  color: value > 4 ? "#f9f6f2" : "#776e65",
                }}
                initial={{ scale: value === 0 ? 0 : 1 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {value !== 0 && value}
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
              <h2>{won ? "You Win! 🎉" : "Game Over! 😢"}</h2>
              <p>Final Score: {score}</p>
              <button className="try-again-btn" onClick={initializeGame}>
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>
              Use <strong>Arrow Keys</strong> (↑ ↓ ← →) to move tiles
            </li>
            <li>
              Tiles with the same number <strong>merge</strong> into one
            </li>
            <li>
              Create a tile with the number <strong>2048</strong> to win!
            </li>
            <li>Game ends when no moves are possible</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Game2048
