import React from "react"
import { PlanetProvider } from "./PlanetContext"
import SolarSystemCanvas from "./SolarSystemCanvas"
import styled from "styled-components"

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #050505;
  color: white;
  position: relative;
  overflow: hidden;
`

const TitleOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  pointer-events: none;
`

const Title = styled.h1`
  font-size: 2em;
  margin: 0;
  color: #fbac61;
  text-shadow: 0 0 10px rgba(251, 172, 97, 0.5);
`

const Subtitle = styled.p`
  margin: 5px 0 0;
  opacity: 0.7;
  font-size: 0.9em;
`

const App = () => {
  return (
    <PlanetProvider>
      <AppContainer>
        <TitleOverlay>
          <Title>Planetary Motion</Title>
          <Subtitle>3D Solar System Simulation</Subtitle>
        </TitleOverlay>
        <SolarSystemCanvas />
      </AppContainer>
    </PlanetProvider>
  )
}

export default App
