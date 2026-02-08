import React from "react"
import styled from "styled-components"
import Button from "./Button"
import Display from "./Display"
import useCalculatorState from "common/hooks/useCalculatorState"

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`

const CalculatorWrapper = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`

const Calculator = () => {
  const { display, handleButtonClick } = useCalculatorState()

  const colorMap = {
    7: "midnightblue",
    8: "midnightblue",
    9: "midnightblue",
    " / ": "orange",
    "sqrt(": "forestgreen",
    4: "midnightblue",
    5: "midnightblue",
    6: "midnightblue",
    " * ": "orange",
    "pow(": "forestgreen",
    1: "midnightblue",
    2: "midnightblue",
    3: "midnightblue",
    " - ": "orange",
    "sin(": "forestgreen",
    0: "midnightblue",
    ".": "firebrick",
    "=": "firebrick",
    " + ": "orange",
    "cos(": "forestgreen",
    ",": "firebrick",
    "(": "firebrick",
    ")": "firebrick",
    e: "purple",
    pi: "purple",
    C: "springgreen",
  }

  const buttons = [
    "7",
    "8",
    "9",
    " / ",
    "sqrt(",
    "4",
    "5",
    "6",
    " * ",
    "pow(",
    "1",
    "2",
    "3",
    " - ",
    "sin(",
    "0",
    ".",
    "=",
    " + ",
    "cos(",
    ",",
    "(",
    ")",
    "e",
    "pi",
    "C",
  ]

  return (
    <CalculatorWrapper>
      <Header>Advanced Calculator</Header>
      <Display value={display} />
      <ButtonGrid>
        {buttons.map((label) => (
          <Button
            key={label}
            label={label}
            bgColor={colorMap[label]}
            onClick={() => handleButtonClick(label)}
          />
        ))}
      </ButtonGrid>
    </CalculatorWrapper>
  )
}

export default Calculator
