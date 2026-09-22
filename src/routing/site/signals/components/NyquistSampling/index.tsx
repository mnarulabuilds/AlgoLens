import React, { useEffect, useRef } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import DeferredMount from "common/components/DeferredMount"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const NyquistSampling = () => {
  const markComplete = useMarkComplete()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [params, setParams] = useVisualizerParams({ freq: "3", rate: "8" })
  const freq = parseIntParam(params.freq, 3, 1, 8)
  const rate = parseIntParam(params.rate, 8, 4, 24)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#162788"
    ctx.beginPath()
    for (let x = 0; x < canvas.width; x++) {
      const t = x / 40
      const y = 100 + 40 * Math.sin(2 * Math.PI * freq * t)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.fillStyle = "#e53935"
    const step = canvas.width / rate
    for (let i = 0; i < rate; i++) {
      const x = i * step
      const t = x / 40
      const y = 100 + 40 * Math.sin(2 * Math.PI * freq * t)
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [freq, rate])

  const onChange = (key: string, value: string) => {
    setParams({ [key]: value })
    markComplete()
  }

  const aliasing = rate < 2 * freq

  return (
    <SimWorkbench
      title="Nyquist Sampling"
      hint="Sample rate must exceed 2× the highest frequency to reconstruct the signal."
      controls={
        <>
          <label>
            Signal frequency (Hz)
            <input type="range" min={1} max={8} value={freq} onChange={(e) => onChange("freq", e.target.value)} />
          </label>
          <label>
            Sample rate
            <input type="range" min={4} max={24} value={rate} onChange={(e) => onChange("rate", e.target.value)} />
          </label>
        </>
      }
    >
      <DeferredMount>
        <canvas ref={canvasRef} width={320} height={200} />
      </DeferredMount>
      <p>{aliasing ? "⚠ Below Nyquist rate — aliasing likely." : "✓ Above Nyquist rate."}</p>
    </SimWorkbench>
  )
}

export default NyquistSampling
