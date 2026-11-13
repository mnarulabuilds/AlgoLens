import React, { useState, useEffect } from "react"
import "./styles.module.scss"
import Scoreboard from "./Scoreboard"
import Paddle from "./Paddle"
import Ball from "./Ball"
import Bricks from "./Bricks"

type BrickPosition = { x: number; y: number }

const Game = () => {
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [paddlePosition, setPaddlePosition] = useState(
    window.innerWidth / 2 - 50
  )
  const [bricks, setBricks] = useState<BrickPosition[]>(() => createBricks())

  const updateScore = () => {
    setScore(score + 1)
  }

  const endGame = () => {
    setGameOver(true)
  }

  const removeBrick = (index: number) => {
    setBricks((previousBricks) =>
      previousBricks.filter((_, prevIndex) => prevIndex !== index)
    )
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newLeft = event.clientX - 50
      setPaddlePosition(Math.max(0, Math.min(window.innerWidth - 100, newLeft)))
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="game">
      <Scoreboard score={score} />
      <Paddle />
      <Ball
        paddlePosition={paddlePosition}
        bricks={bricks}
        updateScore={updateScore}
        endGame={endGame}
        removeBrick={removeBrick}
      />
      <Bricks bricks={bricks} />
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  )
}

function createBricks(): BrickPosition[] {
  const bricks: BrickPosition[] = []
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 5; j++) {
      bricks.push({ x: i * 60, y: j * 40 })
    }
  }
  return bricks
}

export default Game
