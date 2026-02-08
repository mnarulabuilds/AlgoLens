import React from "react"
import styled from "styled-components"
import BezierCurves from "./BezierCurves"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8fafc;
  min-height: 100vh;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #1e293b;
  margin-bottom: 20px;
`

function Main() {
  return (
    <MainContainer>
      <Heading>Bezier Curves Visualizer</Heading>
      <BezierCurves />
    </MainContainer>
  )
}

export default Main
