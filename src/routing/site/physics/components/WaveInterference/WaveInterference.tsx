import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const Layout = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 340px;
    align-items: start;
  }
`

const CanvasCard = styled.div`
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

const ControlsCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin-bottom: 6px;
`

const Value = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`

const Slider = styled.input`
  width: 100%;
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

const Help = styled.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.35;
`

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

// Diverging palette: blue -> black -> orange (high contrast)
function colorMap(v) {
  // v expected in [-1, 1]
  const x = (v + 1) / 2
  if (x < 0.5) {
    // blue side
    const t = x / 0.5
    return [
      Math.floor(20 + 40 * t),
      Math.floor(80 + 120 * t),
      Math.floor(120 + 135 * t),
    ]
  }
  // orange side
  const t = (x - 0.5) / 0.5
  return [
    Math.floor(35 + 220 * t),
    Math.floor(35 + 140 * t),
    Math.floor(40 + 60 * t),
  ]
}

export default function WaveInterference() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const rafRef = useRef(0)
  const timeRef = useRef(0)

  const [running, setRunning] = useState(true)
  const [separation, setSeparation] = useState(0.45) // normalized
  const [wavelength, setWavelength] = useState(0.12) // normalized
  const [speed, setSpeed] = useState(1.0)
  const [attenuation, setAttenuation] = useState(true)
  const [resolution, setResolution] = useState(220) // internal render res
  const [contrast, setContrast] = useState(1.25)

  const buffers = useRef({
    w: 0,
    h: 0,
    imageData: null,
    data: null,
  })

  // Resize backing buffer (fast: render at internal resolution, scale up)
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect()
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)

      // canvas in device pixels for crisp UI overlays; drawing uses logical pixels
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      const ctx = canvas.getContext("2d")
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // internal low-res buffer (square-ish)
      const iw = Math.max(60, Math.floor(resolution))
      const ih = Math.max(60, Math.floor(resolution))
      buffers.current.w = iw
      buffers.current.h = ih
      buffers.current.imageData = ctx.createImageData(iw, ih)
      buffers.current.data = buffers.current.imageData.data
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [resolution])

  const sources = useMemo(() => {
    // two sources centered horizontally
    return [
      { x: 0.5 - separation / 2, y: 0.5 },
      { x: 0.5 + separation / 2, y: 0.5 },
    ]
  }, [separation])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const render = () => {
      rafRef.current = requestAnimationFrame(render)
      if (!buffers.current.imageData) return

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      if (running) timeRef.current += 0.016 * speed
      const t = timeRef.current

      const iw = buffers.current.w
      const ih = buffers.current.h
      const data = buffers.current.data

      const k = (2 * Math.PI) / Math.max(1e-4, wavelength)
      const omega = k * 0.35 // visually nice; not physical units

      // field
      let ptr = 0
      for (let j = 0; j < ih; j++) {
        const y = j / (ih - 1)
        for (let i = 0; i < iw; i++) {
          const x = i / (iw - 1)

          let a = 0
          for (let s = 0; s < sources.length; s++) {
            const dx = x - sources[s].x
            const dy = y - sources[s].y
            const r = Math.sqrt(dx * dx + dy * dy)
            const phase = k * r - omega * t
            const amp = Math.sin(phase)
            const att = attenuation ? 1 / (1 + 12 * r) : 1
            a += amp * att
          }

          // normalize to [-1, 1], then apply contrast curve
          let v = clamp(a / 1.6, -1, 1)
          v = Math.sign(v) * Math.pow(Math.abs(v), 1 / contrast)

          const [r, g, b] = colorMap(v)
          data[ptr++] = r
          data[ptr++] = g
          data[ptr++] = b
          data[ptr++] = 255
        }
      }

      // draw scaled
      ctx.save()
      ctx.imageSmoothingEnabled = true
      ctx.clearRect(0, 0, w, h)
      ctx.putImageData(buffers.current.imageData, 0, 0)
      // scale low-res image to full canvas
      ctx.globalCompositeOperation = "source-over"
      ctx.drawImage(canvas, 0, 0, iw, ih, 0, 0, w, h)

      // draw sources markers
      ctx.globalCompositeOperation = "lighter"
      sources.forEach((s, idx) => {
        const sx = s.x * w
        const sy = s.y * h
        ctx.beginPath()
        ctx.arc(sx, sy, 6, 0, Math.PI * 2)
        ctx.fillStyle =
          idx === 0 ? "rgba(127,231,255,0.85)" : "rgba(251,172,97,0.85)"
        ctx.fill()
        ctx.beginPath()
        ctx.arc(sx, sy, 12, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255,255,255,0.35)"
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.restore()
    }

    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [attenuation, contrast, running, sources, speed, wavelength])

  return (
    <Layout>
      <CanvasCard>
        <CanvasWrap ref={wrapRef}>
          <Canvas ref={canvasRef} />
        </CanvasWrap>
      </CanvasCard>

      <ControlsCard>
        <ButtonRow>
          <Button primary onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Play"}
          </Button>
          <Button
            onClick={() => {
              timeRef.current = 0
            }}
          >
            Reset Time
          </Button>
        </ButtonRow>

        <Label>
          Source separation <Value>{separation.toFixed(2)}</Value>
        </Label>
        <Slider
          type="range"
          min="0.10"
          max="0.80"
          step="0.01"
          value={separation}
          onChange={(e) => setSeparation(parseFloat(e.target.value))}
        />

        <Label>
          Wavelength <Value>{wavelength.toFixed(2)}</Value>
        </Label>
        <Slider
          type="range"
          min="0.05"
          max="0.25"
          step="0.005"
          value={wavelength}
          onChange={(e) => setWavelength(parseFloat(e.target.value))}
        />

        <Label>
          Speed <Value>{speed.toFixed(2)}×</Value>
        </Label>
        <Slider
          type="range"
          min="0.2"
          max="3.0"
          step="0.05"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />

        <Label>
          Contrast <Value>{contrast.toFixed(2)}</Value>
        </Label>
        <Slider
          type="range"
          min="0.8"
          max="2.0"
          step="0.05"
          value={contrast}
          onChange={(e) => setContrast(parseFloat(e.target.value))}
        />

        <Label>
          Render resolution <Value>{resolution}px</Value>
        </Label>
        <Slider
          type="range"
          min="120"
          max="340"
          step="10"
          value={resolution}
          onChange={(e) => setResolution(parseInt(e.target.value, 10))}
        />

        <ButtonRow style={{ marginTop: 12 }}>
          <Button onClick={() => setAttenuation((v) => !v)}>
            Attenuation: {attenuation ? "On" : "Off"}
          </Button>
        </ButtonRow>

        <Help>
          - Blue/orange regions indicate opposite phase.
          <br />- High contrast makes nodes (quiet bands) easier to see.
          <br />- Lower resolution improves performance on mobile.
        </Help>
      </ControlsCard>
    </Layout>
  )
}
