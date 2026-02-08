import React, { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./SnakeGame.css"

const GRID_SIZE = 20
const CELL_SIZE = 25
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
]
const INITIAL_DIRECTION = { x: 1, y: 0 }

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(150)

  const directionRef = useRef(direction)

  // Track this view
  useTrackView({
    id: "games-snake",
    label: "Snake Game",
    category: "Game Zone",
    route: "/games/SnakeGame",
  })

  useEffect(() => {
    const savedBest = localStorage.getItem("snake-best-score")
    if (savedBest) {
      setBestScore(parseInt(savedBest))
    }
  }, [])

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  const generateFood = useCallback((currentSnake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (
      currentSnake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y
      )
    )
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood(INITIAL_SNAKE))
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake((prevSnake) => {
      const head = prevSnake[0]
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true)
        return prevSnake
      }

      // Check self collision
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        )
      ) {
        setGameOver(true)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => {
          const newScore = prev + 10
          if (newScore > bestScore) {
            setBestScore(newScore)
            localStorage.setItem("snake-best-score", newScore.toString())
          }
          return newScore
        })
        setFood(generateFood(newSnake))
        return newSnake
      }

      newSnake.pop()
      return newSnake
    })
  }, [gameOver, isPaused, food, generateFood, bestScore])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed)
    return () => clearInterval(gameLoop)
  }, [moveSnake, speed])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return

      const { x, y } = directionRef.current

      switch (e.key) {
        case "ArrowUp":
          if (y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (x === 0) setDirection({ x: 1, y: 0 })
          break
        case " ":
          e.preventDefault()
          setIsPaused((prev) => !prev)
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameOver])

  return (
    <div className="snake-game-container">
      <div className="snake-game-header">
        <h1>Snake Game 🐍</h1>
        <p>Use arrow keys to control the snake. Eat food to grow!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-snake",
              label: "Snake Game",
              category: "Game Zone",
              route: "/games/SnakeGame",
            }}
          />
        </div>
      </div>

      <div className="snake-game-content">
        <div className="game-controls">
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

          <div className="control-buttons">
            <button className="new-game-btn" onClick={resetGame}>
              New Game
            </button>
            <button
              className="pause-btn"
              onClick={() => setIsPaused(!isPaused)}
              disabled={gameOver}
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>

          <div className="speed-control">
            <label>
              Speed:
              <select
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              >
                <option value="200">Slow</option>
                <option value="150">Medium</option>
                <option value="100">Fast</option>
                <option value="50">Very Fast</option>
              </select>
            </label>
          </div>
        </div>

        <div className="game-board-wrapper">
          <div
            className="snake-game-board"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {/* Grid background */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
              <div
                key={index}
                className="grid-cell"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            ))}

            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={`${segment.x}-${segment.y}-${index}`}
                className={`snake-segment ${index === 0 ? "head" : ""}`}
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}

            {/* Food */}
            <motion.div
              className="food"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
              }}
            />

            {/* Game Over Overlay */}
            {gameOver && (
              <motion.div
                className="game-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="overlay-content">
                  <h2>Game Over! 🐍</h2>
                  <p>Final Score: {score}</p>
                  <button className="try-again-btn" onClick={resetGame}>
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}

            {/* Pause Overlay */}
            {isPaused && !gameOver && (
              <div className="pause-overlay">
                <h2>Paused ⏸️</h2>
                <p>Press Space or Resume to continue</p>
              </div>
            )}
          </div>
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>
              Use <strong>Arrow Keys</strong> (↑ ↓ ← →) to control the snake
            </li>
            <li>
              Press <strong>Space</strong> to pause/resume
            </li>
            <li>
              Eat the <span className="food-icon">🍎</span> to grow and earn
              points
            </li>
            <li>Don&apos;t hit the walls or yourself!</li>
            <li>Adjust speed for different difficulty levels</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SnakeGame
