import React, { useState } from "react"
import styled from "styled-components"
import SHMVisualizer from "./SHMVisualizer"

const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #4caf50;
  color: #fff;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 4px solid #388e3c;
  margin-bottom: 16px;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e8f5e9;
  padding: 20px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Label = styled.label`
  font-size: 18px;
  margin-top: 10px;
  color: #555;
`

const Main = () => {
  const [mass, setMass] = useState(1)
  const [springLength, setSpringLength] = useState(100)

  const adjustMass = (e) => {
    const updatedMass = Number(e.target.value)
    if (updatedMass >= 0 && updatedMass <= 10) {
      setMass(updatedMass)
    }
  }

  const adjustSpringLength = (e) => {
    const updatedSpringLength = Number(e.target.value)
    if (updatedSpringLength >= 0 && updatedSpringLength <= 150) {
      setSpringLength(updatedSpringLength)
    }
  }

  return (
    <AppContainer>
      <HeaderContainer>Simple Harmonic Motion</HeaderContainer>
      <InputContainer>
        <Label htmlFor="mass">Mass (0 to 10 kg):</Label>
        <Input id="mass" type="number" value={mass} onChange={adjustMass} />
        <Label htmlFor="springLength">Spring Length (0 to 150 px):</Label>
        <Input
          id="springLength"
          type="number"
          value={springLength}
          onChange={adjustSpringLength}
        />
      </InputContainer>
      <SHMVisualizer mass={mass} springLength={springLength} />
    </AppContainer>
  )
}

export default Main
