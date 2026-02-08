import React, { useRef, useEffect } from "react"
import usePoint from "common/hooks/usePoint"

const Canvas = ({ id, width, height, clickable, addPoints }) => {
  const canvasRef = useRef(null)

  const { draw } = usePoint(canvasRef.current)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleClick = (event) => {
      if (clickable) {
        draw(event)
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        addPoints({ x, y })
      }
    }

    canvas.addEventListener("click", handleClick)
    return () => {
      canvas.removeEventListener("click", handleClick)
    }
  }, [clickable, draw, addPoints])

  return (
    <canvas
      id={id}
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: "1px solid lightgray",
        background: "rgba(123,178,91,0.3)",
      }}
    ></canvas>
  )
}

export default Canvas
