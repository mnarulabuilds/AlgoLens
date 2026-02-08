import React from "react"
import styled from "styled-components"
import ElasticCollisions from "./ElasticCollisions"

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`

function Main() {
  return (
    <MainContainer>
      <Heading>Elastic Collisions Visualizer</Heading>
      <ElasticCollisions />
    </MainContainer>
  )
}

export default Main
