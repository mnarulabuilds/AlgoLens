import React from "react"
import styled from "styled-components"
import DoublePendulum from "./DoublePendulum"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: radial-gradient(
    circle at 20% 10%,
    #0b1020 0%,
    #05060b 55%,
    #000 100%
  );
  min-height: 100vh;
  color: #eef2ff;
`

const Heading = styled.h1`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  color: #fbac61;
  margin: 0 0 14px 0;
  text-align: center;
  text-shadow: 0 0 14px rgba(251, 172, 97, 0.35);
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
      <Heading>Double Pendulum</Heading>
      <Subheading>
        A chaotic system: tiny changes in initial conditions can lead to wildly
        different motion. Use the controls to tweak parameters and reset.
      </Subheading>
      <DoublePendulum />
    </MainContainer>
  )
}
