import React, { useEffect, useRef } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import DeferredMount from "common/components/DeferredMount"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const L1 = 70
const L2 = 60

const ForwardKinematics = () => {
  const markComplete = useMarkComplete()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useVisualizerParams({ t1: "45", t2: "30" })
  const t1 = (parseIntParam(params.t1, 45, -90, 90) * Math.PI) / 180
  const t2 = (parseIntParam(params.t2, 30, -120, 120) * Math.PI) / 180

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const ox = 40
    const oy = 160
    const x1 = ox + L1 * Math.cos(t1)
    const y1 = oy - L1 * Math.sin(t1)
    const x2 = x1 + L2 * Math.cos(t1 + t2)
    const y2 = y1 - L2 * Math.sin(t1 + t2)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#162788"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(ox, oy)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.fillStyle = "#e53935"
    ctx.beginPath()
    ctx.arc(x2, y2, 6, 0, Math.PI * 2)
    ctx.fill()
  }, [t1, t2])

  return (
    <SimWorkbench
      title="2-Link Forward Kinematics"
      hint="Joint angles θ₁, θ₂ map to end-effector position via link lengths L₁, L₂."
      controls={
        <>
          {(
            [
              ["t1", "θ₁"],
              ["t2", "θ₂"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                type="range"
                min={key === "t1" ? -90 : -120}
                max={key === "t1" ? 90 : 120}
                value={parseIntParam(params[key], 45)}
                onChange={(e) => {
                  setParams({ [key]: e.target.value })
                  markComplete()
                }}
              />
            </label>
          ))}
        </>
      }
    >
      <DeferredMount>
        <canvas ref={canvasRef} width={280} height={180} />
      </DeferredMount>
    </SimWorkbench>
  )
}

export default ForwardKinematics
