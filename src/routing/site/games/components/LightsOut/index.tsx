import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaLightbulb, FaRedo } from "react-icons/fa"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./LightsOut.css"

const GRID_SIZES = {
  easy: 3,
  medium: 4,
  hard: 5,
}

const LightsOut = () => {
  const [difficulty, setDifficulty] = useState("medium")
  const [grid, setGrid] = useState([])
  const [moves, setMoves] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [bestScores, setBestScores] = useState({
    easy: null,
    medium: null,
    hard: null,
  })

  useTrackView({
    id: "games-lights-out",
    label: "Lights Out",
    category: "Game Zone",
    route: "/games/LightsOut",
  })

  useEffect(() => {
    const saved = localStorage.getItem("lightsout-best")
    if (saved) {
      setBestScores(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    if (grid.length > 0) {
      checkSolved()
    }
  }, [grid])

  const initializeGame = () => {
    const size = GRID_SIZES[difficulty]
    const newGrid = Array(size)
      .fill()
      .map(() => Array(size).fill(false))

    // Generate solvable puzzle with random moves
    const randomMoves = Math.floor(Math.random() * 10) + 5
    const positions = []

    for (let i = 0; i < randomMoves; i++) {
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      positions.push([row, col])
    }

    // Apply moves to generate puzzle
    positions.forEach(([row, col]) => {
      toggleLights(newGrid, row, col, size)
    })

    setGrid(newGrid)
    setMoves(0)
    setIsSolved(false)
  }

  const toggleLights = (currentGrid, row, col, size) => {
    const directions = [
      [0, 0], // center
      [-1, 0], // up
      [1, 0], // down
      [0, -1], // left
      [0, 1], // right
    ]

    directions.forEach(([dr, dc]) => {
      const newRow = row + dr
      const newCol = col + dc

      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        currentGrid[newRow][newCol] = !currentGrid[newRow][newCol]
      }
    })
  }

  const handleCellClick = (row, col) => {
    if (isSolved) return

    const size = GRID_SIZES[difficulty]
    const newGrid = grid.map((r) => [...r])
    toggleLights(newGrid, row, col, size)
    setGrid(newGrid)
    setMoves(moves + 1)
  }

  const checkSolved = () => {
    const solved = grid.every((row) => row.every((cell) => !cell))

    if (solved && moves > 0) {
      setIsSolved(true)

      const currentBest = bestScores[difficulty]
      if (!currentBest || moves < currentBest) {
        const newBestScores = { ...bestScores, [difficulty]: moves }
        setBestScores(newBestScores)
        localStorage.setItem("lightsout-best", JSON.stringify(newBestScores))
      }
    }
  }

  return (
    <div className="lights-out-container">
      <div className="lights-out-header">
        <h1>Lights Out 💡</h1>
        <p>Turn off all the lights!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-lights-out",
              label: "Lights Out",
              category: "Game Zone",
              route: "/games/LightsOut",
            }}
          />
        </div>
      </div>

      <div className="lights-out-content">
        <div className="game-controls">
          <div className="difficulty-selector">
            {Object.keys(GRID_SIZES).map((diff) => (
              <button
                key={diff}
                className={`diff-btn ${difficulty === diff ? "active" : ""}`}
                onClick={() => setDifficulty(diff)}
              >
                {diff.charAt(0).toUpperCase() + diff.slice(1)} (
                {GRID_SIZES[diff]}x{GRID_SIZES[diff]})
              </button>
            ))}
          </div>

          <div className="game-info">
            <div className="info-box">
              <FaLightbulb />
              <div>
                <div className="info-label">Moves</div>
                <div className="info-value">{moves}</div>
              </div>
            </div>
            {bestScores[difficulty] && (
              <div className="info-box best">
                <div className="info-label">Best</div>
                <div className="info-value">{bestScores[difficulty]}</div>
              </div>
            )}
          </div>

          <button className="reset-btn" onClick={initializeGame}>
            <FaRedo /> New Puzzle
          </button>
        </div>

        <div className="game-wrapper">
          <div className={`lights-grid grid-${GRID_SIZES[difficulty]}`}>
            {grid.map((row, rowIndex) =>
              row.map((isOn, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  className={`light-cell ${isOn ? "on" : "off"}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: isOn
                      ? "0 0 30px rgba(255, 215, 0, 0.8), inset 0 0 20px rgba(255, 215, 0, 0.5)"
                      : "0 2px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <FaLightbulb
                    className="bulb-icon"
                    style={{
                      color: isOn ? "#ffd700" : "#555",
                      filter: isOn
                        ? "drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))"
                        : "none",
                    }}
                  />
                </motion.div>
              ))
            )}
          </div>

          {isSolved && (
            <motion.div
              className="victory-overlay"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="victory-content">
                <h2>Perfect! 🎉</h2>
                <p>You solved it in {moves} moves!</p>
                {bestScores[difficulty] === moves && (
                  <p className="new-record">New Best Score! 🏆</p>
                )}
                <button className="play-again-btn" onClick={initializeGame}>
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on any light to toggle it and its neighbors</li>
            <li>
              Each click toggles the clicked light and the lights{" "}
              <strong>above, below, left, and right</strong>
            </li>
            <li>Turn off all lights to win!</li>
            <li>
              <strong>Strategy:</strong> Work systematically from top to bottom
            </li>
          </ul>

          <div className="hint-box">
            <h4>💡 Pro Tip:</h4>
            <p>
              In Lights Out, clicking the same light twice cancels out. Try to
              find the minimal number of moves needed!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LightsOut
