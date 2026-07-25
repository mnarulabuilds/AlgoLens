import { useCallback, MouseEvent as ReactMouseEvent } from "react"

const usePoint = (canvas: HTMLCanvasElement | null) => {
  const size = 3

  const drawCoordinates = useCallback(
    (x: number, y: number) => {
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      ctx.fillStyle = "#ff2626"
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2, true)
      ctx.fill()
      ctx.font = "15px Arial"
      ctx.fillText(`( ${x} , ${y} )`, x + 2 * size, y + 2 * size)
    },
    [canvas, size]
  )

  const draw = useCallback(
    (event: MouseEvent | ReactMouseEvent<HTMLCanvasElement>) => {
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
