import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./Puzzle15.css"

const GRID_SIZE = 4
const TILE_COUNT = GRID_SIZE * GRID_SIZE

const Puzzle15 = () => {
  const [tiles, setTiles] = useState([])
  const [emptyIndex, setEmptyIndex] = useState(TILE_COUNT - 1)
  const [moves, setMoves] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isSolved, setIsSolved] = useState(false)
  const [bestScore, setBestScore] = useState(null)

  useTrackView({
    id: "games-puzzle15",
    label: "15-Puzzle Slider",
    category: "Game Zone",
    route: "/games/Puzzle15",
  })

  useEffect(() => {
    const saved = localStorage.getItem("puzzle15-best")
    if (saved) setBestScore(JSON.parse(saved))
    initializePuzzle()
  }, [])

  useEffect(() => {
    let interval
    if (isRunning && !isSolved) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, isSolved])

  useEffect(() => {
    if (tiles.length > 0) {
      checkSolved()
    }
  }, [tiles])

  const initializePuzzle = () => {
    const newTiles = Array.from({ length: TILE_COUNT }, (_, i) => i)
    shuffleTiles(newTiles)
    setTiles(newTiles)
    setEmptyIndex(newTiles.indexOf(0))
    setMoves(0)
    setTimer(0)
    setIsRunning(false)
    setIsSolved(false)
  }

  const shuffleTiles = (arr) => {
    let count = 0
    const maxAttempts = 1000

    // Generate solvable puzzle
    do {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      count++
    } while (!isSolvable(arr) && count < maxAttempts)
  }

  const isSolvable = (arr) => {
    let inversions = 0
    const filtered = arr.filter((num) => num !== 0)

    for (let i = 0; i < filtered.length; i++) {
      for (let j = i + 1; j < filtered.length; j++) {
        if (filtered[i] > filtered[j]) {
          inversions++
        }
      }
    }

    const emptyRow = Math.floor(arr.indexOf(0) / GRID_SIZE)

    // For 4x4 grid, puzzle is solvable if:
    // inversions is even when empty is on odd row (counting from bottom)
    // inversions is odd when empty is on even row
    const emptyRowFromBottom = GRID_SIZE - 1 - emptyRow
    return (emptyRowFromBottom % 2 === 0) === (inversions % 2 === 1)
  }

  const canMove = (index) => {
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE)
    const emptyCol = emptyIndex % GRID_SIZE
    const tileRow = Math.floor(index / GRID_SIZE)
    const tileCol = index % GRID_SIZE

    return (
      (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
      (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow)
    )
  }

  const moveTile = (index) => {
    if (isSolved || !canMove(index)) return

    if (!isRunning) setIsRunning(true)

    const newTiles = [...tiles]
    ;[newTiles[index], newTiles[emptyIndex]] = [
      newTiles[emptyIndex],
      newTiles[index],
    ]
    setTiles(newTiles)
    setEmptyIndex(index)
    setMoves((m) => m + 1)
  }

  const checkSolved = () => {
    const solved = tiles.every((tile, index) => {
      if (index === TILE_COUNT - 1) return tile === 0
      return tile === index + 1
    })

    if (solved && moves > 0) {
      setIsSolved(true)
      setIsRunning(false)

      const currentScore = { moves, time: timer }
      if (
        !bestScore ||
        moves < bestScore.moves ||
        (moves === bestScore.moves && timer < bestScore.time)
      ) {
        setBestScore(currentScore)
        localStorage.setItem("puzzle15-best", JSON.stringify(currentScore))
      }
    }
  }

  const getTilePosition = (index) => {
    const row = Math.floor(index / GRID_SIZE)
    const col = index % GRID_SIZE
    return {
      x: col * 100,
      y: row * 100,
    }
  }

  return (
    <div className="puzzle15-container">
      <div className="puzzle15-header">
        <h1>15-Puzzle Slider 🧩</h1>
        <p>Arrange the tiles in order!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-puzzle15",
              label: "15-Puzzle Slider",
              category: "Game Zone",
              route: "/games/Puzzle15",
            }}
          />
        </div>
      </div>

      <div className="puzzle15-content">
        <div className="game-controls">
          <div className="game-stats">
            <div className="stat-box">
              <div className="stat-label">Moves</div>
              <div className="stat-value">{moves}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Time</div>
              <div className="stat-value">{timer}s</div>
            </div>
            {bestScore && (
              <div className="stat-box best">
                <div>
                  <div className="stat-label">Best</div>
                  <div className="stat-value">
                    {bestScore.moves}m / {bestScore.time}s
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="shuffle-btn" onClick={initializePuzzle}>
            New Puzzle
          </button>
        </div>

        <div className="puzzle-wrapper">
          <div className="puzzle-board">
            {tiles.map((tile, index) =>
              tile !== 0 ? (
                <motion.div
                  key={tile}
                  className={`puzzle-tile ${canMove(index) ? "movable" : ""}`}
                  onClick={() => moveTile(index)}
                  animate={getTilePosition(index)}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  whileHover={canMove(index) ? { scale: 1.05, zIndex: 10 } : {}}
                  whileTap={canMove(index) ? { scale: 0.95 } : {}}
                >
                  {tile}
                </motion.div>
              ) : null
            )}
          </div>

          {isSolved && (
            <motion.div
              className="victory-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="victory-content">
                <h2>Congratulations! 🎉</h2>
                <div className="victory-stats">
                  <p>
                    <strong>Moves:</strong> {moves}
                  </p>
                  <p>
                    <strong>Time:</strong> {timer}s
                  </p>
                  {bestScore &&
                    (moves < bestScore.moves ||
                      (moves === bestScore.moves &&
                        timer < bestScore.time)) && (
                      <p className="new-record">New Record! 🏆</p>
                    )}
                </div>
                <button className="play-again-btn" onClick={initializePuzzle}>
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on a tile adjacent to the empty space to move it</li>
            <li>Arrange tiles in numerical order from 1 to 15</li>
            <li>Complete the puzzle in the fewest moves possible!</li>
            <li>
              <strong>Tip:</strong> Work on rows from top to bottom
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Puzzle15
