import React from "react"
import styled from "styled-components"

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 2px solid #00796b;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: #00796b;
    margin: 0;
  }
`

const Result = ({ hypotenuse }) => {
  return (
    <ResultContainer>
      <h2>Hypotenuse: {hypotenuse.toFixed(2)}</h2>
    </ResultContainer>
  )
}

export default Result
