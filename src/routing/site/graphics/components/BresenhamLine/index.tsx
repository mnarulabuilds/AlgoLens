import React, { useEffect, useRef } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import DeferredMount from "common/components/DeferredMount"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

function bresenham(x0: number, y0: number, x1: number, y1: number) {
  const points: [number, number][] = []
  let x = x0
  let y = y0
  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx - dy

  while (true) {
    points.push([x, y])
    if (x === x1 && y === y1) break
    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }
  }
  return points
}

const BresenhamLine = () => {
  const markComplete = useMarkComplete()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useVisualizerParams({ x1: "120", y1: "80" })
  const x1 = parseIntParam(params.x1, 120, 10, 280)
  const y1 = parseIntParam(params.y1, 80, 10, 180)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#111"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const points = bresenham(20, 20, x1, y1)
    ctx.fillStyle = "#4fc3f7"
    points.forEach(([x, y]) => {
      ctx.fillRect(x, y, 2, 2)
    })
  }, [x1, y1])

  return (
    <SimWorkbench
      title="Bresenham Line Algorithm"
      hint="Integer-only line rasterization — watch how error terms pick the next pixel."
      controls={
        <>
          <label>
            End X: {x1}
            <input
              type="range"
              min={10}
              max={280}
              value={x1}
              onChange={(e) => {
                setParams({ x1: e.target.value })
                markComplete()
              }}
            />
          </label>
          <label>
            End Y: {y1}
            <input
              type="range"
              min={10}
              max={180}
              value={y1}
              onChange={(e) => {
                setParams({ y1: e.target.value })
                markComplete()
              }}
            />
          </label>
        </>
      }
    >
      <DeferredMount>
        <canvas ref={canvasRef} width={300} height={200} aria-label="Line plot" />
      </DeferredMount>
    </SimWorkbench>
  )
}

export default BresenhamLine
