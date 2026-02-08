import React, { useState, useRef, useEffect, useCallback } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 900px;
`

const SVGContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  cursor: crosshair;
`

const StyledSVG = styled.svg`
  width: 100%;
  height: 100%;
  touch-action: none;
`

const Controls = styled.div`
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: ${(props) => (props.active ? "#3b82f6" : "#f1f5f9")};
  color: ${(props) => (props.active ? "white" : "#475569")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#e2e8f0")};
  }
`

const BezierCurves = () => {
  const [points, setPoints] = useState([
    { x: 100, y: 400 },
    { x: 300, y: 100 },
    { x: 600, y: 100 },
    { x: 800, y: 400 },
  ])
  const [draggingIdx, setDraggingIdx] = useState(null)
  const svgRef = useRef(null)

  const getPos = (e) => {
    const svg = svgRef.current
    const rect = svg.getBoundingClientRect()
    const scaleX = svg.viewBox.baseVal.width / rect.width
    const scaleY = svg.viewBox.baseVal.height / rect.height
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const handlePointerDown = (idx) => (e) => {
    e.stopPropagation()
    setDraggingIdx(idx)
  }

  const handlePointerMove = useCallback(
    (e) => {
      if (draggingIdx === null) return
      const pos = getPos(e)
      setPoints((prev) => {
        const next = [...prev]
        next[draggingIdx] = pos
        return next
      })
    },
    [draggingIdx]
  )

  const handlePointerUp = useCallback(() => {
    setDraggingIdx(null)
  }, [])

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerMove, handlePointerUp])

  const getBezierPath = () => {
    if (points.length < 2) return ""
    let d = `M ${points[0].x} ${points[0].y}`
    if (points.length === 2) {
      d += ` L ${points[1].x} ${points[1].y}`
    } else if (points.length === 3) {
      d += ` Q ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}`
    } else if (points.length === 4) {
      d += ` C ${points[1].x} ${points[1].y}, ${points[2].x} ${points[2].y}, ${points[3].x} ${points[3].y}`
    }
    return d
  }

  const addPoint = () => {
    if (points.length >= 4) return
    const last = points[points.length - 1]
    setPoints([...points, { x: last.x + 50, y: last.y }])
  }

  const removePoint = () => {
    if (points.length <= 2) return
    setPoints(points.slice(0, -1))
  }

  return (
    <Container>
      <SVGContainer>
        <StyledSVG ref={svgRef} viewBox="0 0 900 500">
          <polyline
            points={points.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
          <path
            d={getBezierPath()}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {points.map((p, i) => (
            <g key={i} onPointerDown={handlePointerDown(i)}>
              <circle
                cx={p.x}
                cy={p.y}
                r="12"
                fill={
                  i === 0 || i === points.length - 1 ? "#3b82f6" : "#f59e0b"
                }
                style={{ cursor: "move" }}
              />
              <text
                x={p.x}
                y={p.y - 20}
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
                fontWeight="bold"
              >
                P{i}
              </text>
            </g>
          ))}
        </StyledSVG>
      </SVGContainer>
      <Controls>
        <Button onClick={addPoint} disabled={points.length >= 4}>
          Add Point
        </Button>
        <Button onClick={removePoint} disabled={points.length <= 2}>
          Remove Point
        </Button>
        <Button
          onClick={() =>
            setPoints([
              { x: 100, y: 400 },
              { x: 300, y: 100 },
              { x: 600, y: 100 },
              { x: 800, y: 400 },
            ])
          }
        >
          Reset
        </Button>
      </Controls>
    </Container>
  )
}

export default BezierCurves
