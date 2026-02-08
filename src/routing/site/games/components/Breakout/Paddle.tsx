import React, { useState, useEffect } from "react"
import { VIEWPORT_WIDTH_FACTOR } from "./viewport"

const Paddle = React.memo(() => {
  const [position, setPosition] = useState(
    (VIEWPORT_WIDTH_FACTOR * window.innerWidth) / 2 - 50
  )

  const handleMouseMove = (event) => {
    const newLeft = event.clientX - 50
    setPosition(
      Math.max(
        60,
        Math.min(VIEWPORT_WIDTH_FACTOR * window.innerWidth - 60, newLeft)
      )
    )
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <div className="paddle" style={{ left: position }}></div>
})

Paddle.displayName = "Breakout.Paddle"

export default Paddle
