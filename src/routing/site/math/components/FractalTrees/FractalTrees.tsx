import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`

const CanvasContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(20, 83, 45, 0.1);
  overflow: hidden;
  border: 1px solid #dcfce7;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`

const Controls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  width: 100%;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Label = styled.label`
  font-weight: 600;
  color: #166534;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
`

const Slider = styled.input`
  width: 100%;
  accent-color: #22c55e;
`

const FractalTrees = () => {
  const canvasRef = useRef(null)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const [depth, setDepth] = useState(10)
  const [angle, setAngle] = useState(25)
  const [lengthRatio, setLengthRatio] = useState(0.75)
  const [baseLength, setBaseLength] = useState(120)

  const drawBranch = useCallback(
    (ctx, len, thick, ang) => {
      ctx.lineWidth = thick
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -len)
      ctx.stroke()

      if (len < 4) {
        ctx.fillStyle = "#22c55e"
        ctx.beginPath()
        ctx.arc(0, -len, 4, 0, Math.PI * 2)
        ctx.fill()
        return
      }

      ctx.save()
      ctx.translate(0, -len)
      ctx.rotate((ang * Math.PI) / 180)
      drawBranch(ctx, len * lengthRatio, thick * 0.7, ang)
      ctx.restore()

      ctx.save()
      ctx.translate(0, -len)
      ctx.rotate((-ang * Math.PI) / 180)
      drawBranch(ctx, len * lengthRatio, thick * 0.7, ang)
      ctx.restore()
    },
    [lengthRatio]
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    const { w, h } = sizeRef.current
    if (!w || !h) return

    // Clear in CSS pixels (we set transform in resize)
    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = "#4b2c20"
    ctx.lineCap = "round"

    ctx.save()
    ctx.translate(w / 2, h - 20)
    // Keep tree visible across different canvas sizes
    const scaledBase = Math.min(baseLength, h * 0.42)
    drawBranch(ctx, scaledBase, depth * 0.8, angle)
    ctx.restore()
  }, [depth, angle, lengthRatio, baseLength, drawBranch])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ro = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))

      sizeRef.current = { w: rect.width, h: rect.height, dpr }
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))

      const ctx = canvas.getContext("2d")
      // Reset transform (prevents cumulative scaling on resize)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    })

    ro.observe(canvas)
    return () => ro.disconnect()
  }, [draw])

  return (
    <Container>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
      <Controls>
        <ControlGroup>
          <Label>
            Recursion Depth: <span>{depth}</span>
          </Label>
          <Slider
            type="range"
            min="1"
            max="12"
            step="1"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>
            Branch Angle: <span>{angle}°</span>
          </Label>
          <Slider
            type="range"
            min="0"
            max="90"
            step="1"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>
            Length Ratio: <span>{lengthRatio.toFixed(2)}</span>
          </Label>
          <Slider
            type="range"
            min="0.5"
            max="0.85"
            step="0.01"
            value={lengthRatio}
            onChange={(e) => setLengthRatio(parseFloat(e.target.value))}
          />
        </ControlGroup>
        <ControlGroup>
          <Label>
            Base Length: <span>{baseLength}px</span>
          </Label>
          <Slider
            type="range"
            min="50"
            max="200"
            step="1"
            value={baseLength}
            onChange={(e) => setBaseLength(parseInt(e.target.value))}
          />
        </ControlGroup>
      </Controls>
    </Container>
  )
}

export default FractalTrees
