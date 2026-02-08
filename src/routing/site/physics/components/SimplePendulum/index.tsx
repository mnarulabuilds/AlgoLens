import React, { useState } from "react"
import Pendulum from "./Pendulum"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #e0e0e0;
  min-height: 100vh;
  box-sizing: border-box;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

const Label = styled.label`
  margin: 10px 0;
  font-size: 1rem;
  width: 100%;
`

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`

const Main = () => {
  const [speed, setSpeed] = useState(2)
  const [length, setLength] = useState(200)

  const handleSpeedChange = (e) => {
    const updatedSpeed = parseFloat(e.target.value || 0)
    if (updatedSpeed >= 0 && updatedSpeed <= 10) {
      setSpeed(updatedSpeed)
    }
  }

  const handleLengthChange = (e) => {
    const updatedLength = parseInt(e.target.value || 0, 10)
    if (updatedLength >= 0 && updatedLength <= 250) {
      setLength(updatedLength)
    }
  }

  return (
    <Container>
      <Title>Simple Pendulum Simulation</Title>
      <InputContainer>
        <Label>
          Speed (0 to 10 seconds per cycle):
          <Input
            type="number"
            value={speed}
            onChange={handleSpeedChange}
            min="0.1"
            step="0.1"
            max="10"
          />
        </Label>
        <Label>
          Rod Length (0 to 250 pixels):
          <Input
            type="number"
            value={length}
            onChange={handleLengthChange}
            min="50"
            max="250"
          />
        </Label>
      </InputContainer>
      <Pendulum speed={speed} length={length} />
    </Container>
  )
}

export default Main
