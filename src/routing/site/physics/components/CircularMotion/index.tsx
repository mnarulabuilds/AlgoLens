import React, { useState, useEffect } from "react"
import styled from "styled-components"

const ROTATION_INTERVAL_MILLISECONDS = 16

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`

const Controls = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const Label = styled.label`
  margin: 10px;
  font-size: 1.1em;

  input {
    margin-left: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`

const Visualizer = styled.div`
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`

const Circle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #3498db;
  border-radius: 50%;
  transition: transform 0.016s linear;
`

const Info = styled.div`
  margin-top: 20px;
  text-align: center;

  h4 {
    padding: 8px;
    font-size: 1.5em;
  }

  p {
    margin: 5px 0;
    font-size: 1.1em;
  }
`

const CircularMotion = () => {
  const [speed, setSpeed] = useState(1) // radians per second
  const [radius, setRadius] = useState(100) // pixels
  const [angle, setAngle] = useState(0) // current angle in radians

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(
        (prevAngle) =>
          prevAngle + (speed * ROTATION_INTERVAL_MILLISECONDS) / 1000
      )
    }, ROTATION_INTERVAL_MILLISECONDS)

    return () => clearInterval(interval)
  }, [speed])

  const angularMomentum = radius * speed

  return (
    <Container>
      <Info>
        <h4>Circular Motion</h4>
      </Info>
      <Controls>
        <Label>
          Speed (0 to 16 rad/s):
          <input
            type="number"
            value={speed}
            onChange={(e) => {
              const updatedSpeed = Number(e.target.value)
              if (updatedSpeed >= 0 && updatedSpeed <= 16)
                setSpeed(updatedSpeed)
            }}
          />
        </Label>
        <Label>
          Radius (0 to 120 pixels):
          <input
            type="number"
            value={radius}
            onChange={(e) => {
              const updatedRadius = Number(e.target.value)
              if (updatedRadius >= 0 && updatedRadius <= 120)
                setRadius(updatedRadius)
            }}
          />
        </Label>
      </Controls>
      <Visualizer>
        <Circle
          style={{
            transform: `translate(${radius * Math.cos(angle)}px, ${
              radius * Math.sin(angle)
            }px)`,
          }}
        />
      </Visualizer>
      <Info>
        <p>Angular Momentum: {angularMomentum.toFixed(2)}</p>
        <p>Number of Revolutions: {(angle / (2 * Math.PI)).toFixed(2)}</p>
      </Info>
    </Container>
  )
}

export default CircularMotion
