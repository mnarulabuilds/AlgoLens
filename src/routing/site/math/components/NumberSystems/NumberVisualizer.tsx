import React from "react"
import styled from "styled-components"

const VisualizerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const NumberBlock = styled.div`
  margin: 5px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.2em;
  color: #333;
  animation: fadeIn 0.5s ease-in-out;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #ddd;
    transform: scale(1.1);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    font-size: 1em;
    padding: 8px;
  }
`

const BaseLabel = styled.div`
  margin-top: 20px;
  font-size: 1.5em;
  color: #61dafb;
`

const NumberVisualizer = ({ number, base }) => {
  const baseLabels = {
    2: "Binary",
    8: "Octal",
    10: "Decimal",
    16: "Hexadecimal",
  }

  const getSymbols = (num) => {
    if (!num) return []

    return num.split("").map((digit, index) => (
      <NumberBlock
        key={index}
        title={`Position: ${num.length - index - 1}, Value: ${digit}`}
      >
        {digit}
      </NumberBlock>
    ))
  }

  return (
    <div>
      <VisualizerContainer>{getSymbols(number, base)}</VisualizerContainer>
      {number && (
        <BaseLabel>{`Base: ${base} (${
          baseLabels[base] || "Custom Base"
        })`}</BaseLabel>
      )}
    </div>
  )
}

export default NumberVisualizer
