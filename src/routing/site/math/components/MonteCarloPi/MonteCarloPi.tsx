import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const Layout = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`

const Card = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`

const CanvasWrap = styled.div`
  width: 100%;
  aspect-ratio: 1;
  position: relative;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const HUD = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`

const Pill = styled.div`
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  backdrop-filter: blur(8px);
`

const Controls = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`

const Button = styled.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${(p) =>
    p.primary
      ? "linear-gradient(180deg, #7fe7ff, #2dd4ff)"
      : "rgba(255, 255, 255, 0.06)"};
  color: ${(p) => (p.primary ? "#041014" : "rgba(255, 255, 255, 0.9)")};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 10px 0 6px;
`

const Value = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`

const Slider = styled.input`
  width: 100%;
`

const StatGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`

const Stat = styled.div`
  padding: 10px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const StatTitle = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
`

const StatValue = styled.div`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  font-variant-numeric: tabular-nums;
`

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function format(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export default function MonteCarloPi() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const rafRef = useRef(0)

  const [running, setRunning] = useState(true)
  const [batchSize, setBatchSize] = useState(800)
  const [speed, setSpeed] = useState(1.0)
  const [dotSize, setDotSize] = useState(2)
  const [showGuides, setShowGuides] = useState(true)

  // counters in refs (no rerender spam)
  const countsRef = useRef({ total: 0, inside: 0 })
  const [snapshot, setSnapshot] = useState({ total: 0, inside: 0 })

  const estimate = useMemo(() => {
    const { total, inside } = snapshot
    return total > 0 ? (4 * inside) / total : 0
  }, [snapshot])

  // Resize canvas to container with DPR cap (fast on mobile)
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect()
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))

      const ctx = canvas.getContext("2d")
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // On resize, redraw guides + clear points (consistent UX)
      ctx.clearRect(0, 0, rect.width, rect.height)
      drawGuides(ctx, rect.width, rect.height, showGuides)
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [showGuides])

  const reset = () => {
    countsRef.current = { total: 0, inside: 0 }
    setSnapshot({ total: 0, inside: 0 })
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)
    drawGuides(ctx, rect.width, rect.height, showGuides)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    let frame = 0
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      if (!running) return

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      // (re)draw guides lightly every N frames (keeps contrast)
      frame++
      if (showGuides && frame % 90 === 0) {
        // redraw guides without clearing points by drawing with low alpha
        ctx.save()
        ctx.globalAlpha = 0.12
        drawGuides(ctx, w, h, true)
        ctx.restore()
      }

      const n = Math.floor(batchSize * speed)
      const r = Math.min(w, h) * 0.48
      const cx = w / 2
      const cy = h / 2

      let inside = 0
      for (let i = 0; i < n; i++) {
        const x = Math.random() * 2 - 1
        const y = Math.random() * 2 - 1
        const inCircle = x * x + y * y <= 1
        if (inCircle) inside++

        const px = cx + x * r
        const py = cy + y * r

        ctx.fillStyle = inCircle
          ? "rgba(127,231,255,0.9)"
          : "rgba(251,172,97,0.75)"
        ctx.fillRect(px, py, dotSize, dotSize)
      }

      countsRef.current.total += n
      countsRef.current.inside += inside

      // update UI at ~10fps
      if (frame % 6 === 0) {
        setSnapshot({ ...countsRef.current })
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [batchSize, dotSize, running, showGuides, speed])

  return (
    <Layout>
      <Card>
        <CanvasWrap ref={wrapRef}>
          <Canvas ref={canvasRef} />
          <HUD>
            <Pill>{running ? "RUNNING" : "PAUSED"}</Pill>
            <Pill>π ≈ {estimate ? estimate.toFixed(6) : "—"}</Pill>
          </HUD>
        </CanvasWrap>
      </Card>

      <Controls>
        <ButtonRow>
          <Button primary onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Play"}
          </Button>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={() => setShowGuides((v) => !v)}>
            Guides: {showGuides ? "On" : "Off"}
          </Button>
        </ButtonRow>

        <Label>
          Points per frame <Value>{format(batchSize)}</Value>
        </Label>
        <Slider
          type="range"
          min="100"
          max="5000"
          step="50"
          value={batchSize}
          onChange={(e) => setBatchSize(parseInt(e.target.value, 10))}
        />

        <Label>
          Speed <Value>{speed.toFixed(2)}×</Value>
        </Label>
        <Slider
          type="range"
          min="0.25"
          max="3.0"
          step="0.05"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />

        <Label>
          Dot size <Value>{dotSize}px</Value>
        </Label>
        <Slider
          type="range"
          min="1"
          max="6"
          step="1"
          value={dotSize}
          onChange={(e) => setDotSize(parseInt(e.target.value, 10))}
        />

        <StatGrid>
          <Stat>
            <StatTitle>Total points</StatTitle>
            <StatValue>{format(snapshot.total)}</StatValue>
          </Stat>
          <Stat>
            <StatTitle>Inside circle</StatTitle>
            <StatValue>{format(snapshot.inside)}</StatValue>
          </Stat>
          <Stat>
            <StatTitle>Estimate</StatTitle>
            <StatValue>{estimate ? estimate.toFixed(6) : "—"}</StatValue>
          </Stat>
          <Stat>
            <StatTitle>Error vs π</StatTitle>
            <StatValue>
              {snapshot.total > 0
                ? Math.abs(Math.PI - estimate).toFixed(6)
                : "—"}
            </StatValue>
          </Stat>
        </StatGrid>
      </Controls>
    </Layout>
  )
}

function drawGuides(ctx, w, h, enabled) {
  if (!enabled) return

  const r = Math.min(w, h) * 0.48
  const cx = w / 2
  const cy = h / 2

  // background gradient
  const bg = ctx.createLinearGradient(0, 0, 0, h)
  bg.addColorStop(0, "rgba(2,6,23,1)")
  bg.addColorStop(1, "rgba(0,0,0,1)")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // square boundary (in normalized space)
  ctx.strokeStyle = "rgba(255,255,255,0.25)"
  ctx.lineWidth = 1
  ctx.strokeRect(cx - r, cy - r, 2 * r, 2 * r)

  // circle
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.strokeStyle = "rgba(127,231,255,0.35)"
  ctx.lineWidth = 2
  ctx.stroke()

  // axes
  ctx.strokeStyle = "rgba(255,255,255,0.10)"
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - r, cy)
  ctx.lineTo(cx + r, cy)
  ctx.moveTo(cx, cy - r)
  ctx.lineTo(cx, cy + r)
  ctx.stroke()
}
