import React from "react"
import styled from "styled-components"
import FourierSeries from "./FourierSeries"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #f8fafc;
  margin-bottom: 20px;
`

function Main() {
  return (
    <MainContainer>
      <Heading>Fourier Series Visualizer</Heading>
      <FourierSeries />
    </MainContainer>
  )
}

export default Main
