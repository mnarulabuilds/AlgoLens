import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`

const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  margin-bottom: 30px;
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
`

const Input = styled.input`
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(props) => (props.primary ? "#3b82f6" : "#e2e8f0")};
  color: ${(props) => (props.primary ? "white" : "#475569")};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
    background: ${(props) => (props.primary ? "#2563eb" : "#cbd5e1")};
  }
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  background: #f1f5f9;
  padding: 15px;
  border-radius: 10px;
`

const StatItem = styled.div`
  text-align: center;
  p {
    margin: 5px 0;
    color: #334155;
    font-size: 0.95rem;
  }
  span {
    font-weight: bold;
    color: #0f172a;
  }
`

const ElasticCollisions = () => {
  const canvasRef = useRef(null)
  const [m1, setM1] = useState(2)
  const [m2, setM2] = useState(5)
  const [v1Init, setV1Init] = useState(3)
  const [v2Init, setV2Init] = useState(-2)
  const [isPlaying, setIsPlaying] = useState(false)

  const stateRef = useRef({
    p1: { x: 200, v: 3, m: 2, r: 20 },
    p2: { x: 600, v: -2, m: 5, r: 35 },
    lastUpdateTime: 0,
  })

  const reset = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    stateRef.current = {
      p1: {
        x: canvas.width * 0.25,
        v: Number(v1Init),
        m: Number(m1),
        r: 15 + Math.sqrt(m1) * 8,
      },
      p2: {
        x: canvas.width * 0.75,
        v: Number(v2Init),
        m: Number(m2),
        r: 15 + Math.sqrt(m2) * 8,
      },
      lastUpdateTime: performance.now(),
    }
    setIsPlaying(false)
    draw()
  }, [m1, m2, v1Init, v2Init])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const { p1, p2 } = stateRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw floor
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, canvas.height - 50)
    ctx.lineTo(canvas.width, canvas.height - 50)
    ctx.stroke()

    // Draw Particle 1
    ctx.fillStyle = "#3b82f6"
    ctx.beginPath()
    ctx.arc(p1.x, canvas.height - 50 - p1.r, p1.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(`${p1.m}kg`, p1.x, canvas.height - 50 - p1.r + 5)

    // Draw Particle 2
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(p2.x, canvas.height - 50 - p2.r, p2.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(`${p2.m}kg`, p2.x, canvas.height - 50 - p2.r + 5)

    // Draw velocity arrows
    const drawArrow = (x, y, v, color) => {
      if (Math.abs(v) < 0.1) return
      const length = v * 20
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + length, y)
      ctx.stroke()

      // Arrow head
      ctx.beginPath()
      const headSize = 8
      const sign = v > 0 ? 1 : -1
      ctx.moveTo(x + length, y)
      ctx.lineTo(x + length - headSize * sign, y - headSize / 2)
      ctx.lineTo(x + length - headSize * sign, y + headSize / 2)
      ctx.closePath()
      ctx.fill()
    }

    drawArrow(p1.x, canvas.height - 50 - p1.r - 20, p1.v, "#3b82f6")
    drawArrow(p2.x, canvas.height - 50 - p2.r - 20, p2.v, "#ef4444")
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    reset()
  }, [reset])

  useEffect(() => {
    if (!isPlaying) return

    let animationId
    const update = (time) => {
      const dt = (time - stateRef.current.lastUpdateTime) / 16 // normalized delta time
      stateRef.current.lastUpdateTime = time

      const { p1, p2 } = stateRef.current

      // Move
      p1.x += p1.v * dt
      p2.x += p2.v * dt

      // Wall collisions
      if (p1.x - p1.r < 0) {
        p1.x = p1.r
        p1.v *= -1
      }
      if (p2.x + p2.r > canvasRef.current.width) {
        p2.x = canvasRef.current.width - p2.r
        p2.v *= -1
      }

      // Sphere-Sphere collision
      const dist = Math.abs(p1.x - p2.x)
      if (dist < p1.r + p2.r) {
        // Resolve overlap
        const overlap = p1.r + p2.r - dist
        if (p1.x < p2.x) {
          p1.x -= overlap / 2
          p2.x += overlap / 2
        } else {
          p1.x += overlap / 2
          p2.x -= overlap / 2
        }

        // Elastic collision formula
        const v1 = p1.v
        const v2 = p2.v
        const m1 = p1.m
        const m2 = p2.m

        p1.v = (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2)
        p2.v = (v2 * (m2 - m1) + 2 * m1 * v1) / (m1 + m2)
      }

      draw()
      animationId = requestAnimationFrame(update)
    }

    stateRef.current.lastUpdateTime = performance.now()
    animationId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationId)
  }, [isPlaying, draw])

  return (
    <Container>
      <Controls>
        <ControlGroup>
          <Label>Mass 1 (kg)</Label>
          <Input
            type="number"
            value={m1}
            onChange={(e) => setM1(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>Velocity 1 (m/s)</Label>
          <Input
            type="number"
            value={v1Init}
            onChange={(e) => setV1Init(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>Mass 2 (kg)</Label>
          <Input
            type="number"
            value={m2}
            onChange={(e) => setM2(e.target.value)}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>Velocity 2 (m/s)</Label>
          <Input
            type="number"
            value={v2Init}
            onChange={(e) => setV2Init(e.target.value)}
          />
        </ControlGroup>
      </Controls>

      <ButtonGroup>
        <Button primary onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause" : "Start Simulation"}
        </Button>
        <Button onClick={reset}>Reset</Button>
      </ButtonGroup>

      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>

      <Stats>
        <StatItem>
          <p>
            Object 1 Momentum:{" "}
            <span>
              {(stateRef.current.p1.m * stateRef.current.p1.v).toFixed(2)}
            </span>
          </p>
          <p>
            Object 1 Energy:{" "}
            <span>
              {(
                0.5 *
                stateRef.current.p1.m *
                stateRef.current.p1.v ** 2
              ).toFixed(2)}
            </span>
          </p>
        </StatItem>
        <StatItem>
          <p>
            Object 2 Momentum:{" "}
            <span>
              {(stateRef.current.p2.m * stateRef.current.p2.v).toFixed(2)}
            </span>
          </p>
          <p>
            Object 2 Energy:{" "}
            <span>
              {(
                0.5 *
                stateRef.current.p2.m *
                stateRef.current.p2.v ** 2
              ).toFixed(2)}
            </span>
          </p>
        </StatItem>
      </Stats>
    </Container>
  )
}

export default ElasticCollisions
