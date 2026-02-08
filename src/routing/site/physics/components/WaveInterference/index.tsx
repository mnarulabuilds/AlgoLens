import React from "react"
import styled from "styled-components"
import WaveInterference from "./WaveInterference"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #05060b;
  min-height: 100vh;
  color: white;
`

const Heading = styled.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #7fe7ff;
  margin-bottom: 14px;
  text-align: center;
  text-shadow: 0 0 14px rgba(127, 231, 255, 0.35);
`

const Subheading = styled.p`
  margin: 0 0 18px 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  max-width: 900px;
  font-size: 0.95rem;
`

export default function Main() {
  return (
    <MainContainer>
      <Heading>Wave Interference</Heading>
      <Subheading>
        Two sources emit waves and create an interference pattern. Adjust source
        separation, wavelength, and speed to see constructive/destructive
        regions.
      </Subheading>
      <WaveInterference />
    </MainContainer>
  )
}
