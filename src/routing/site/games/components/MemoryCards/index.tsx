import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./MemoryCards.css"

const CARD_SETS = {
  easy: 8, // 4x4 grid
  medium: 18, // 6x6 grid
  hard: 32, // 8x8 grid
}

const EMOJIS = [
  "🎮",
  "🎯",
  "🎲",
  "🎨",
  "🎭",
  "🎪",
  "🎬",
  "🎤",
  "🎧",
  "🎼",
  "🎹",
  "🎺",
  "🎸",
  "🎻",
  "🎵",
  "🎶",
  "🚀",
  "🛸",
  "🚁",
  "🚂",
  "🚃",
  "🚄",
  "🚅",
  "🚆",
  "🌟",
  "⭐",
  "✨",
  "💫",
  "🌠",
  "🌌",
  "🌈",
  "🔥",
]

const MemoryCards = () => {
  const [difficulty, setDifficulty] = useState("easy")
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [bestMoves, setBestMoves] = useState(null)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  useTrackView({
    id: "games-memory-cards",
    label: "Memory Cards",
    category: "Game Zone",
    route: "/games/MemoryCards",
  })

  useEffect(() => {
    const saved = localStorage.getItem(`memory-best-${difficulty}`)
    if (saved) setBestMoves(parseInt(saved))
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    let interval
    if (isRunning && !gameWon) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, gameWon])

  useEffect(() => {
    if (matched.length > 0 && matched.length === cards.length) {
      setGameWon(true)
      setIsRunning(false)

      if (!bestMoves || moves < bestMoves) {
        setBestMoves(moves)
        localStorage.setItem(`memory-best-${difficulty}`, moves.toString())
      }
    }
  }, [matched, cards, moves, bestMoves, difficulty])

  const initializeGame = () => {
    const pairCount = CARD_SETS[difficulty]
    const selectedEmojis = EMOJIS.slice(0, pairCount)
    const cardPairs = [...selectedEmojis, ...selectedEmojis]

    // Shuffle cards
    const shuffled = cardPairs
      .map((emoji, index) => ({ id: index, emoji }))
      .sort(() => Math.random() - 0.5)

    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setTimer(0)
    setIsRunning(false)
    setGameWon(false)
  }

  const handleCardClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    ) {
      return
    }

    if (!isRunning) setIsRunning(true)

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)

      const [first, second] = newFlipped
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second])
        setFlipped([])
      } else {
        setTimeout(() => setFlipped([]), 1000)
      }
    }
  }

  const getGridClass = () => {
    switch (difficulty) {
      case "easy":
        return "grid-4x4"
      case "medium":
        return "grid-6x6"
      case "hard":
        return "grid-8x8"
      default:
        return "grid-4x4"
    }
  }

  return (
    <div className="memory-cards-container">
      <div className="memory-cards-header">
        <h1>Memory Cards 🃏</h1>
        <p>Match all pairs to win!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-memory-cards",
              label: "Memory Cards",
              category: "Game Zone",
              route: "/games/MemoryCards",
            }}
          />
        </div>
      </div>

      <div className="memory-cards-content">
        <div className="game-controls">
          <div className="difficulty-selector">
            <button
              className={`diff-btn ${difficulty === "easy" ? "active" : ""}`}
              onClick={() => setDifficulty("easy")}
            >
              Easy (4x4)
            </button>
            <button
              className={`diff-btn ${difficulty === "medium" ? "active" : ""}`}
              onClick={() => setDifficulty("medium")}
            >
              Medium (6x6)
            </button>
            <button
              className={`diff-btn ${difficulty === "hard" ? "active" : ""}`}
              onClick={() => setDifficulty("hard")}
            >
              Hard (8x8)
            </button>
          </div>

          <div className="game-info">
            <div className="info-box">
              <span className="info-label">Moves:</span>
              <span className="info-value">{moves}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Time:</span>
              <span className="info-value">{timer}s</span>
            </div>
            {bestMoves && (
              <div className="info-box best">
                <span className="info-label">Best:</span>
                <span className="info-value">{bestMoves}</span>
              </div>
            )}
          </div>

          <button className="new-game-btn" onClick={initializeGame}>
            New Game
          </button>
        </div>

        <div className={`cards-grid ${getGridClass()}`}>
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className={`memory-card ${
                flipped.includes(index) || matched.includes(index)
                  ? "flipped"
                  : ""
              } ${matched.includes(index) ? "matched" : ""}`}
              onClick={() => handleCardClick(index)}
              whileHover={{
                scale:
                  flipped.includes(index) || matched.includes(index) ? 1 : 1.05,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">{card.emoji}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {gameWon && (
          <motion.div
            className="game-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="overlay-content">
              <h2>Congratulations! 🎉</h2>
              <p>You won in {moves} moves!</p>
              <p>Time: {timer}s</p>
              {bestMoves === moves && (
                <p className="new-record">New Record! 🏆</p>
              )}
              <button className="try-again-btn" onClick={initializeGame}>
                Play Again
              </button>
            </div>
          </motion.div>
        )}

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on a card to reveal it</li>
            <li>Try to find matching pairs</li>
            <li>Match all pairs to win</li>
            <li>Complete with fewer moves for a better score!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MemoryCards
