import React, { useState, useEffect } from "react"
import {
  VIEWPORT_HEIGHT_FACTOR,
  VIEWPORT_PAD,
  VIEWPORT_WIDTH_FACTOR,
} from "./viewport"

const Ball = ({
  paddlePosition,
  bricks,
  updateScore,
  endGame,
  removeBrick,
}) => {
  const [position, setPosition] = useState({
    x: (VIEWPORT_WIDTH_FACTOR * window.innerWidth) / 2,
    y: (VIEWPORT_HEIGHT_FACTOR * window.innerHeight) / 2,
  })
  const [velocity, setVelocity] = useState({ x: 2, y: -2 })
  const ballRadius = 10

  useEffect(() => {
    const timer = setTimeout(moveBall, 16)
    return () => clearTimeout(timer)
  }, [position, velocity])

  const moveBall = () => {
    let newPosition = { ...position }
    let newVelocity = { ...velocity }

    newPosition.x += newVelocity.x
    newPosition.y += newVelocity.y

    // Collision with walls
    if (
      newPosition.x <= ballRadius + VIEWPORT_PAD ||
      newPosition.x >=
        VIEWPORT_WIDTH_FACTOR * window.innerWidth - VIEWPORT_PAD - ballRadius
    ) {
      newVelocity.x = -newVelocity.x
    }
    if (newPosition.y <= ballRadius) {
      newVelocity.y = -newVelocity.y
    }

    // Collision with paddle
    if (
      newPosition.y + ballRadius >=
        VIEWPORT_HEIGHT_FACTOR * window.innerHeight - 40 &&
      newPosition.x >= paddlePosition &&
      newPosition.x <= paddlePosition + 100
    ) {
      newVelocity.y = -newVelocity.y
    }

    // Collision with bricks
    let removedBrickIndex = -1
    for (let i = 0; i < bricks.length; i++) {
      const brick = bricks[i]
      if (
        newPosition.x >= brick.x - 50 &&
        newPosition.x <= brick.x + 50 &&
        newPosition.y >= brick.y - 20 &&
        newPosition.y <= brick.y + 20
      ) {
        newVelocity.y = -newVelocity.y
        newVelocity.x = -newVelocity.x
        removedBrickIndex = i
        break
      }
    }

    // Collision with bottom wall
    if (
      newPosition.y >=
        VIEWPORT_HEIGHT_FACTOR * window.innerHeight - ballRadius ||
      !bricks.length
    ) {
      endGame()
      return
    }

    if (removedBrickIndex !== -1) {
      removeBrick(removedBrickIndex)
      updateScore()
    }

    setPosition(newPosition)
    setVelocity(newVelocity)
  }

  return (
    <div className="ball" style={{ left: position.x, top: position.y }}></div>
  )
}

export default Ball
