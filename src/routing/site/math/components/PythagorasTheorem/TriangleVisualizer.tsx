import React from "react"
import styled from "styled-components"

const SvgContainer = styled.div`
  width: 100%;
  max-width: 400px;
  height: 400px;
  position: relative;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 2px solid #00796b;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`

const Line = styled.line`
  stroke: #ff6347;
  stroke-width: 2;
`

const Text = styled.text`
  fill: #00796b;
  font-size: 14px;
`

const TriangleVisualizer = ({ sideA, sideB, hypotenuse }) => {
  const scale = 25
  const offset = 25
  const viewBoxWidth = sideA * scale + offset * 2
  const viewBoxHeight = sideB * scale + offset * 2

  return (
    <SvgContainer>
      <Svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        {/* Right-angle triangle */}
        <Line
          x1={offset}
          y1={viewBoxHeight - offset}
          x2={offset + sideA * scale}
          y2={viewBoxHeight - offset}
        />{" "}
        {/* sideA */}
        <Line
          x1={offset}
          y1={viewBoxHeight - offset}
          x2={offset}
          y2={viewBoxHeight - offset - sideB * scale}
        />{" "}
        {/* sideB */}
        <Line
          x1={offset}
          y1={viewBoxHeight - offset - sideB * scale}
          x2={offset + sideA * scale}
          y2={viewBoxHeight - offset}
        />{" "}
        {/* hypotenuse */}
        {/* Labels */}
        <Text x={offset + (sideA * scale) / 2} y={viewBoxHeight - offset + 15}>
          a: {sideA}
        </Text>
        <Text
          x={offset - 15}
          y={viewBoxHeight - offset - (sideB * scale) / 2}
          transform={`rotate(-90, ${offset - 15}, ${
            viewBoxHeight - offset - (sideB * scale) / 2
          })`}
        >
          b: {sideB}
        </Text>
        <Text
          x={offset + (sideA * scale) / 2}
          y={viewBoxHeight - offset - (sideB * scale) / 2 - 5}
          transform={`rotate(${Math.atan(sideB / sideA) * (-180 / Math.PI)}, ${
            offset + (sideA * scale) / 2
          }, ${viewBoxHeight - offset - (sideB * scale) / 2 - 5})`}
        >
          c: {hypotenuse.toFixed(2)}
        </Text>
      </Svg>
    </SvgContainer>
  )
}

export default TriangleVisualizer
