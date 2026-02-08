import React from "react"
import styled from "styled-components"
import FractalTrees from "./FractalTrees"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0fdf4;
  min-height: 100vh;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #14532d;
  margin-bottom: 20px;
`

function Main() {
  return (
    <MainContainer>
      <Heading>Fractal Tree Generator</Heading>
      <FractalTrees />
    </MainContainer>
  )
}

export default Main
