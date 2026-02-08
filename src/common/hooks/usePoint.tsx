import { useCallback } from "react"

const usePoint = (canvas) => {
  const size = 3

  const drawCoordinates = useCallback(
    (x, y) => {
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      ctx.fillStyle = "#ff2626" // Red color
      ctx.beginPath() // Start path
      ctx.arc(x, y, size, 0, Math.PI * 2, true)
      ctx.fill()
      ctx.font = "15px Arial"
      ctx.fillText(`( ${x} , ${y} )`, x + 2 * size, y + 2 * size)
    },
    [canvas, size]
  )

  const draw = useCallback(
    (event) => {
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      drawCoordinates(x, y)
    },
    [canvas, drawCoordinates]
  )

  return { draw }
}

export default usePoint
