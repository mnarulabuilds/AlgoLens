import React, { useState, useEffect } from "react"
import styled from "styled-components"
import NumberVisualizer from "./NumberVisualizer"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
`

const Label = styled.label`
  color: #555;
  font-size: 1.2em;
  margin-bottom: 10px;
`

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`

const Select = styled.select`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #21a1f1;
    outline: none;
    box-shadow: 0 0 0 3px rgba(33, 161, 241, 0.5);
  }
`

const NumberConverter = () => {
  const [number, setNumber] = useState("")
  const [baseFrom, setBaseFrom] = useState(10)
  const [baseTo, setBaseTo] = useState(10)
  const [convertedNumber, setConvertedNumber] = useState("")

  useEffect(() => {
    const convertNumber = () => {
      if (number === "") return ""
      try {
        const num = parseInt(number, baseFrom)
        setConvertedNumber(num.toString(baseTo))
      } catch (error) {
        setConvertedNumber("Invalid Number")
      }
    }
    convertNumber()
  }, [number, baseFrom, baseTo])

  return (
    <Container>
      <Title>Number System Visualizer</Title>
      <Label>
        Input Number:
        <Input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter number"
        />
      </Label>
      <Label>
        Source Base:
        <Select
          value={baseFrom}
          onChange={(e) => setBaseFrom(parseInt(e.target.value))}
        >
          {[...Array(15).keys()].map((i) => (
            <option key={i + 2} value={i + 2}>
              {i + 2}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Target Base:
        <Select
          value={baseTo}
          onChange={(e) => setBaseTo(parseInt(e.target.value))}
        >
          {[...Array(15).keys()].map((i) => (
            <option key={i + 2} value={i + 2}>
              {i + 2}
            </option>
          ))}
        </Select>
      </Label>
      <Label>Converted Number:</Label>
      <NumberVisualizer number={convertedNumber} base={baseTo} />
    </Container>
  )
}

export default NumberConverter
