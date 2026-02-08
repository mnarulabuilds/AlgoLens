import React from "react"
import styled from "styled-components"
import FluidRipple from "./FluidRipple"

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
  color: #fff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`

function Main() {
  return (
    <MainContainer>
      <Heading>Fluid Ripple Simulation</Heading>
      <FluidRipple />
    </MainContainer>
  )
}

export default Main
