import React, { useEffect, useRef } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import DeferredMount from "common/components/DeferredMount"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const AffineTransform2D = () => {
  const markComplete = useMarkComplete()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useVisualizerParams({
    angle: "25",
    scale: "120",
    tx: "150",
  })
  const angle = (parseIntParam(params.angle, 25, -90, 90) * Math.PI) / 180
  const scale = parseIntParam(params.scale, 120, 50, 150) / 100
  const tx = parseIntParam(params.tx, 150, 80, 220)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(tx, 100)
    ctx.rotate(angle)
    ctx.scale(scale, scale)
    ctx.fillStyle = "#162788"
    ctx.fillRect(-40, -30, 80, 60)
    ctx.restore()
    markComplete()
  }, [angle, scale, tx, markComplete])

  return (
    <SimWorkbench
      title="2D Affine Transform"
      hint="Translate → rotate → scale applied in order on a rectangle."
      controls={
        <>
          <label>
            Rotation (°)
            <input
              type="range"
              min={-90}
              max={90}
              value={parseIntParam(params.angle, 25)}
              onChange={(e) => setParams({ angle: e.target.value })}
            />
          </label>
          <label>
            Scale
            <input
              type="range"
              min={50}
              max={150}
              value={parseIntParam(params.scale, 120)}
              onChange={(e) => setParams({ scale: e.target.value })}
            />
          </label>
          <label>
            Translate X
            <input
              type="range"
              min={80}
              max={220}
              value={parseIntParam(params.tx, 150)}
              onChange={(e) => setParams({ tx: e.target.value })}
            />
          </label>
        </>
      }
    >
      <DeferredMount>
        <canvas ref={canvasRef} width={300} height={200} />
      </DeferredMount>
    </SimWorkbench>
  )
}

export default AffineTransform2D
