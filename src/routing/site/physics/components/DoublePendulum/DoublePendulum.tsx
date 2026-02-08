import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const Container = styled.div`
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
  aspect-ratio: 16 / 10;
  position: relative;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const HUD = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  pointer-events: none;
`

const Pill = styled.div`
  pointer-events: none;
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

const ControlsCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
`

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const Button = styled.button`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: ${(p) =>
    p.primary
      ? "linear-gradient(180deg, #fbac61, #e98c2f)"
      : "rgba(255, 255, 255, 0.06)"};
  color: ${(p) => (p.primary ? "#111827" : "rgba(255, 255, 255, 0.9)")};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
  min-width: 110px;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`

const ControlGroup = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 0.9rem;
  margin-bottom: 6px;
`

const Value = styled.span`
  color: rgba(255, 255, 255, 0.68);
  font-variant-numeric: tabular-nums;
`

const Slider = styled.input`
  width: 100%;
`

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function rk4Step(state, dt, derivs) {
  const k1 = derivs(state)
  const s2 = state.map((v, i) => v + (dt / 2) * k1[i])
  const k2 = derivs(s2)
  const s3 = state.map((v, i) => v + (dt / 2) * k2[i])
  const k3 = derivs(s3)
  const s4 = state.map((v, i) => v + dt * k3[i])
  const k4 = derivs(s4)
  return state.map(
    (v, i) => v + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])
  )
}

export default function DoublePendulum() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const rafRef = useRef(0)
  const lastTRef = useRef(0)
  const trailRef = useRef([])

  const [running, setRunning] = useState(true)
  const [showTrail, setShowTrail] = useState(true)

  // Parameters (UI state)
  const [m1, setM1] = useState(1.0)
  const [m2, setM2] = useState(1.0)
  const [l1, setL1] = useState(1.2)
  const [l2, setL2] = useState(1.0)
  const [g, setG] = useState(9.81)
  const [damping, setDamping] = useState(0.01) // 0..0.08 (approx)
  const [timeScale, setTimeScale] = useState(1.0)
  const [trailLen, setTrailLen] = useState(600)

  // Simulation state in a ref (avoid rerenders)
  const simRef = useRef({
    // [theta1, omega1, theta2, omega2]
    state: [Math.PI / 2, 0, Math.PI / 2 + 0.2, 0],
  })

  const derivs = useMemo(() => {
    return (s) => {
      const theta1 = s[0]
      const omega1 = s[1]
      const theta2 = s[2]
      const omega2 = s[3]

      const delta = theta1 - theta2
      const denom = 2 * m1 + m2 - m2 * Math.cos(2 * delta)

      const dtheta1 = omega1
      const dtheta2 = omega2

      const domega1 =
        (-g * (2 * m1 + m2) * Math.sin(theta1) -
          m2 * g * Math.sin(theta1 - 2 * theta2) -
          2 *
            Math.sin(delta) *
            m2 *
            (omega2 * omega2 * l2 + omega1 * omega1 * l1 * Math.cos(delta))) /
        (l1 * denom)

      const domega2 =
        (2 *
          Math.sin(delta) *
          (omega1 * omega1 * l1 * (m1 + m2) +
            g * (m1 + m2) * Math.cos(theta1) +
            omega2 * omega2 * l2 * m2 * Math.cos(delta))) /
        (l2 * denom)

      // simple linear damping (applied as acceleration)
      return [
        dtheta1,
        domega1 - damping * omega1,
        dtheta2,
        domega2 - damping * omega2,
      ]
    }
  }, [m1, m2, l1, l2, g, damping])

  // Resize canvas to match container (crisp + fast)
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
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  const reset = (randomize = false) => {
    simRef.current.state = randomize
      ? [
          (Math.random() * 1.4 + 0.2) * Math.PI,
          0,
          (Math.random() * 1.4 + 0.2) * Math.PI,
          0,
        ]
      : [Math.PI / 2, 0, Math.PI / 2 + 0.2, 0]
    trailRef.current = []
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const draw = (t) => {
      rafRef.current = requestAnimationFrame(draw)
      const lastT = lastTRef.current || t
      lastTRef.current = t
      const dtMs = t - lastT
      const dt = clamp(dtMs / 1000, 0, 0.033) * timeScale

      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      // background
      ctx.clearRect(0, 0, w, h)
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      bg.addColorStop(0, "#020617")
      bg.addColorStop(1, "#000000")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // sim step
      if (running) {
        const subSteps = dt > 0 ? Math.ceil(dt / 0.008) : 1
        const hdt = dt / subSteps
        for (let i = 0; i < subSteps; i++) {
          simRef.current.state = rk4Step(simRef.current.state, hdt, derivs)
        }
      }

      const [theta1, , theta2] = simRef.current.state
      const origin = { x: w / 2, y: h * 0.18 }
      const scale = (Math.min(w, h) * 0.38) / (l1 + l2)

      const x1 = origin.x + l1 * scale * Math.sin(theta1)
      const y1 = origin.y + l1 * scale * Math.cos(theta1)
      const x2 = x1 + l2 * scale * Math.sin(theta2)
      const y2 = y1 + l2 * scale * Math.cos(theta2)

      // trail
      if (showTrail) {
        const trail = trailRef.current
        trail.push({ x: x2, y: y2 })
        if (trail.length > trailLen) trail.splice(0, trail.length - trailLen)

        ctx.save()
        ctx.globalCompositeOperation = "lighter"
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i]
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        const grad = ctx.createLinearGradient(0, 0, w, h)
        grad.addColorStop(0, "rgba(59,130,246,0.0)")
        grad.addColorStop(0.5, "rgba(59,130,246,0.35)")
        grad.addColorStop(1, "rgba(251,172,97,0.55)")
        ctx.strokeStyle = grad
        ctx.stroke()
        ctx.restore()
      }

      // rods
      ctx.lineWidth = 3
      ctx.strokeStyle = "rgba(255,255,255,0.75)"
      ctx.beginPath()
      ctx.moveTo(origin.x, origin.y)
      ctx.lineTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // joints + bobs
      const r1 = 8 + m1 * 4
      const r2 = 8 + m2 * 4

      // bob 1
      ctx.fillStyle = "#60a5fa"
      ctx.beginPath()
      ctx.arc(x1, y1, r1, 0, Math.PI * 2)
      ctx.fill()

      // bob 2
      ctx.fillStyle = "#fbac61"
      ctx.beginPath()
      ctx.arc(x2, y2, r2, 0, Math.PI * 2)
      ctx.fill()

      // origin
      ctx.fillStyle = "rgba(255,255,255,0.85)"
      ctx.beginPath()
      ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [derivs, l1, l2, m1, m2, running, showTrail, timeScale, trailLen])

  return (
    <Container>
      <CanvasCard>
        <CanvasWrap ref={wrapRef}>
          <Canvas ref={canvasRef} />
          <HUD>
            <Pill>{running ? "RUNNING" : "PAUSED"}</Pill>
            <Pill>Drag not enabled • Use controls</Pill>
          </HUD>
        </CanvasWrap>
      </CanvasCard>

      <ControlsCard>
        <Row>
          <Button primary onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Play"}
          </Button>
          <Button onClick={() => reset(false)}>Reset</Button>
          <Button onClick={() => reset(true)}>Randomize</Button>
        </Row>

        <ControlGroup>
          <Label>
            Mass 1 <Value>{m1.toFixed(2)}</Value>
          </Label>
          <Slider
            type="range"
            min="0.4"
            max="3.0"
            step="0.05"
            value={m1}
            onChange={(e) => setM1(parseFloat(e.target.value))}
          />
          <Label>
            Mass 2 <Value>{m2.toFixed(2)}</Value>
          </Label>
          <Slider
            type="range"
            min="0.4"
            max="3.0"
            step="0.05"
            value={m2}
            onChange={(e) => setM2(parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <Label>
            Length 1 <Value>{l1.toFixed(2)} m</Value>
          </Label>
          <Slider
            type="range"
            min="0.5"
            max="2.2"
            step="0.05"
            value={l1}
            onChange={(e) => setL1(parseFloat(e.target.value))}
          />
          <Label>
            Length 2 <Value>{l2.toFixed(2)} m</Value>
          </Label>
          <Slider
            type="range"
            min="0.5"
            max="2.2"
            step="0.05"
            value={l2}
            onChange={(e) => setL2(parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <Label>
            Gravity <Value>{g.toFixed(2)} m/s²</Value>
          </Label>
          <Slider
            type="range"
            min="0.0"
            max="20.0"
            step="0.1"
            value={g}
            onChange={(e) => setG(parseFloat(e.target.value))}
          />
          <Label>
            Damping <Value>{damping.toFixed(3)}</Value>
          </Label>
          <Slider
            type="range"
            min="0.0"
            max="0.08"
            step="0.001"
            value={damping}
            onChange={(e) => setDamping(parseFloat(e.target.value))}
          />
          <Label>
            Speed <Value>{timeScale.toFixed(2)}×</Value>
          </Label>
          <Slider
            type="range"
            min="0.2"
            max="3.0"
            step="0.05"
            value={timeScale}
            onChange={(e) => setTimeScale(parseFloat(e.target.value))}
          />
        </ControlGroup>

        <ControlGroup>
          <Row>
            <Button
              onClick={() => setShowTrail((v) => !v)}
              style={{ minWidth: 140 }}
            >
              Trail: {showTrail ? "On" : "Off"}
            </Button>
          </Row>
          <Label>
            Trail length <Value>{trailLen}</Value>
          </Label>
          <Slider
            type="range"
            min="50"
            max="1400"
            step="10"
            value={trailLen}
            onChange={(e) => setTrailLen(parseInt(e.target.value, 10))}
          />
        </ControlGroup>
      </ControlsCard>
    </Container>
  )
}
