import React, { useState, useEffect, useRef, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e293b;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  max-width: 900px;
  width: 100%;
`

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  cursor: crosshair;
  border: 1px solid #334155;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`

const ControlItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: #94a3b8;
  font-size: 0.9rem;
`

const Slider = styled.input`
  width: 150px;
`

const Instructions = styled.p`
  color: #64748b;
  margin-top: 15px;
  font-size: 0.9rem;
  text-align: center;
`

const FluidRipple = () => {
  const canvasRef = useRef(null)
  const [damping, setDamping] = useState(0.98)
  const [resolution, setResolution] = useState(200)

  const stateRef = useRef({
    cols: 0,
    rows: 0,
    current: [],
    previous: [],
    animationId: null,
  })

  const initGrid = useCallback(() => {
    const cols = resolution
    const rows = resolution
    stateRef.current.cols = cols
    stateRef.current.rows = rows
    stateRef.current.current = new Float32Array(cols * rows).fill(0)
    stateRef.current.previous = new Float32Array(cols * rows).fill(0)

    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = cols
      canvas.height = rows
    }
  }, [resolution])

  useEffect(() => {
    initGrid()
  }, [initGrid])

  const draw = useCallback(() => {
    const { cols, rows, current, previous } = stateRef.current
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const imgData = ctx.createImageData(cols, rows)

    for (let i = 1; i < cols - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        const idx = i + j * cols
        // Wave equation
        const sum =
          previous[idx - 1] +
          previous[idx + 1] +
          previous[idx - cols] +
          previous[idx + cols]
        current[idx] = sum / 2 - current[idx]
        current[idx] *= damping

        // Map value to color (pixel data is [R, G, B, A])
        const pos = idx * 4
        const val = current[idx]

        // Base color is a deep ocean blue
        // Ripples add brightness and a touch of cyan
        const brightness = Math.max(0, Math.min(255, 128 + val * 2))

        imgData.data[pos] = brightness * 0.1 // Slight red
        imgData.data[pos + 1] = brightness * 0.6 // More green
        imgData.data[pos + 2] = brightness // Full blue
        imgData.data[pos + 3] = 255 // Alpha
      }
    }

    ctx.putImageData(imgData, 0, 0)

    // Swap buffers
    const temp = stateRef.current.previous
    stateRef.current.previous = stateRef.current.current
    stateRef.current.current = temp
  }, [damping])

  useEffect(() => {
    const animate = () => {
      draw()
      stateRef.current.animationId = requestAnimationFrame(animate)
    }
    stateRef.current.animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(stateRef.current.animationId)
  }, [draw])

  const handleInteraction = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(
      ((e.clientX - rect.left) / rect.width) * stateRef.current.cols
    )
    const y = Math.floor(
      ((e.clientY - rect.top) / rect.height) * stateRef.current.rows
    )

    if (
      x > 0 &&
      x < stateRef.current.cols - 1 &&
      y > 0 &&
      y < stateRef.current.rows - 1
    ) {
      stateRef.current.previous[x + y * stateRef.current.cols] = 512
    }
  }

  return (
    <Container>
      <CanvasContainer
        onMouseMove={(e) => e.buttons === 1 && handleInteraction(e)}
        onMouseDown={handleInteraction}
      >
        <Canvas ref={canvasRef} />
      </CanvasContainer>

      <Controls>
        <ControlItem>
          <label>Damping: {damping.toFixed(3)}</label>
          <Slider
            type="range"
            min="0.9"
            max="0.999"
            step="0.001"
            value={damping}
            onChange={(e) => setDamping(parseFloat(e.target.value))}
          />
        </ControlItem>
        <ControlItem>
          <label>Resolution: {resolution}</label>
          <Slider
            type="range"
            min="100"
            max="400"
            step="50"
            value={resolution}
            onChange={(e) => setResolution(parseInt(e.target.value))}
          />
        </ControlItem>
      </Controls>

      <Instructions>
        Click or drag on the water to create ripples. Adjust damping to change
        how long ripples last.
      </Instructions>
    </Container>
  )
}

export default FluidRipple
