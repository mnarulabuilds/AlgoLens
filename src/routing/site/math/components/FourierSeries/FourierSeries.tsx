import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1000px;
`

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 2 / 1;
  background: #1e293b;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid #334155;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  background: #1e293b;
  padding: 30px;
  border-radius: 16px;
  border: 1px solid #334155;
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Label = styled.label`
  font-weight: 600;
  color: #94a3b8;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`

const Slider = styled.input`
  width: 100%;
  cursor: pointer;
`

const Select = styled.select`
  padding: 10px;
  background: #0f172a;
  color: white;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
`

const FourierSeries = () => {
  const canvasRef = useRef(null)
  const [terms, setTerms] = useState(5)
  const [speed, setSpeed] = useState(0.02)
  const [waveType, setWaveType] = useState("square")

  const stateRef = useRef({
    time: 0,
    wave: [],
  })

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const { time, wave } = stateRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let x = 200
    let y = canvas.height / 2

    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"
    ctx.lineWidth = 1

    for (let i = 0; i < terms; i++) {
      let prevX = x
      let prevY = y

      let n, radius
      if (waveType === "square") {
        n = i * 2 + 1
        radius = 100 * (4 / (n * Math.PI))
      } else if (waveType === "sawtooth") {
        n = i + 1
        radius = 100 * (2 / (n * Math.PI)) * (i % 2 === 0 ? 1 : -1)
      }

      x += radius * Math.cos(n * time)
      y += radius * Math.sin(n * time)

      ctx.beginPath()
      ctx.arc(prevX, prevY, Math.abs(radius), 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(prevX, prevY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"
      ctx.lineWidth = 1
    }

    wave.unshift(y)
    if (wave.length > 500) wave.pop()

    ctx.strokeStyle = "#facc15"
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(400, wave[0])
    ctx.stroke()

    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(400, wave[0])
    for (let i = 1; i < wave.length; i++) {
      ctx.lineTo(400 + i, wave[i])
    }
    ctx.stroke()

    stateRef.current.time += speed
  }, [terms, waveType, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      const ctx = canvas.getContext("2d")
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    let animationId
    const animate = () => {
      draw()
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [draw])

  return (
    <Container>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
      <Controls>
        <ControlGroup>
          <Label>
            Number of Terms: <span>{terms}</span>
          </Label>
          <Slider
            type="range"
            min="1"
            max="50"
            value={terms}
            onChange={(e) => setTerms(parseInt(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>
            Speed: <span>{(speed * 100).toFixed(1)}%</span>
          </Label>
          <Slider
            type="range"
            min="0.005"
            max="0.1"
            step="0.005"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>Wave Target</Label>
          <Select
            value={waveType}
            onChange={(e) => {
              setWaveType(e.target.value)
              stateRef.current.wave = []
            }}
          >
            <option value="square">Square Wave</option>
            <option value="sawtooth">Sawtooth Wave</option>
          </Select>
        </ControlGroup>
      </Controls>
    </Container>
  )
}

export default FourierSeries
