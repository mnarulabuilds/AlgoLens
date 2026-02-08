import React from "react"
import styled from "styled-components"
import TriangleVisualizer from "./TriangleVisualizer"
import InputForm from "./InputForm"
import Result from "./Result"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #e0f7fa;
  min-height: 100vh;
  font-family: "Arial, sans-serif";

  h1 {
    color: #00796b;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`

function App() {
  const [sideA, setSideA] = React.useState(3)
  const [sideB, setSideB] = React.useState(4)
  const [hypotenuse, setHypotenuse] = React.useState(
    Math.sqrt(sideA ** 2 + sideB ** 2)
  )

  const calculateHypotenuse = React.useMemo(() => {
    return Math.sqrt(sideA ** 2 + sideB ** 2)
  }, [sideA, sideB])

  React.useEffect(() => {
    setHypotenuse(calculateHypotenuse)
  }, [calculateHypotenuse])

  return (
    <Container>
      <h1>Pythagoras Theorem Visualizer</h1>
      <InputForm setSideA={setSideA} setSideB={setSideB} />
      <TriangleVisualizer sideA={sideA} sideB={sideB} hypotenuse={hypotenuse} />
      <Result hypotenuse={hypotenuse} />
    </Container>
  )
}

export default App
