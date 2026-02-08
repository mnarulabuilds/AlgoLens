import React, { useState, useEffect, useCallback, useMemo } from "react"
import styled from "styled-components"
import { Alert } from "reactstrap"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  gap: 15px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-around;
  }
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #555;
`

const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  text-align: center;
  font-size: 1rem;
`

const Visualization = styled.div`
  margin-bottom: 20px;
  width: 100%;
`

const Results = styled.div`
  margin-top: 10px;
  text-align: center;
  width: 100%;
  font-size: 1rem;
`

const SVG = styled.svg`
  width: 100%;
  max-width: 500px;
  height: auto;
`

const Path = styled.path`
  stroke: blue;
  fill: none;
`

const Line = styled.line`
  stroke: black;
  stroke-width: 2;
`

const Text = styled.text`
  font-family: Arial;
  font-size: 12px;
  text-anchor: middle;
`

const ProjectileMotion = () => {
  const [angle, setAngle] = useState(45)
  const [speed, setSpeed] = useState(50)
  const [trajectory, setTrajectory] = useState([])

  const g = 9.81 // acceleration due to gravity

  const calculateTrajectory = useCallback(() => {
    const radianAngle = (angle * Math.PI) / 180
    const totalTime = (2 * speed * Math.sin(radianAngle)) / g
    const points = []

    for (let t = 0; t <= totalTime; t += 0.1) {
      const x = speed * t * Math.cos(radianAngle)
      const y = speed * t * Math.sin(radianAngle) - 0.5 * g * t * t
      if (y >= 0) {
        points.push({ x, y })
      } else {
        break
      }
    }

    setTrajectory(points)
  }, [angle, speed])

  useEffect(() => {
    calculateTrajectory()
  }, [angle, speed, calculateTrajectory])

  const totalDistance = useMemo(() => {
    return trajectory.length > 0 ? trajectory[trajectory.length - 1].x : 0
  }, [trajectory])

  const maxHeight = useMemo(() => {
    return Math.max(...trajectory.map((point) => point.y), 0)
  }, [trajectory])

  return (
    <Container>
      <Controls>
        <Label>
          Angle (degrees):
          <Input
            type="number"
            value={angle}
            onChange={(e) => {
              const updatedAngle = Number(e.target.value)
              if (updatedAngle >= 0 && updatedAngle <= 90) {
                setAngle(updatedAngle)
              }
            }}
          />
        </Label>
        <Label>
          Speed (m/s):
          <Input
            type="number"
            value={speed}
            onChange={(e) => {
              const updatedSpeed = Number(e.target.value)
              if (updatedSpeed >= 0 && updatedSpeed <= 1000) {
                setSpeed(updatedSpeed)
              }
            }}
          />
        </Label>
      </Controls>
      <Alert color="info" style={{ width: "100%" }}>
        Angle should be from 0 to 90
      </Alert>
      <Alert color="info" style={{ width: "100%" }}>
        Speed should be from 0 to 1000
      </Alert>
      <Visualization>
        <SVG viewBox="0 0 500 500">
          <Path
            d={`M 0 500 ${trajectory
              .map((point) => `${point.x * 10} ${500 - point.y * 10}`)
              .join(" L ")}`}
          />
          <Line x1="0" y1="500" x2="500" y2="500" />
          <g>
            <Line x1="0" y1="490" x2="0" y2="500" />
            <Text x="5" y="490">
              0
            </Text>
            <Line x1="500" y1="490" x2="500" y2="500" />
            <Text x="490" y="490">
              50
            </Text>
          </g>
        </SVG>
      </Visualization>
      <Results>
        <p>Total Distance: {totalDistance.toFixed(2)} meters</p>
        <p>Maximum Height: {maxHeight.toFixed(2)} meters</p>
      </Results>
    </Container>
  )
}

export default ProjectileMotion
