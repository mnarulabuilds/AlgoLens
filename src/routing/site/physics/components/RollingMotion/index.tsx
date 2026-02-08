import React, { useState } from "react"
import styled from "styled-components"
import ControlPanel from "./ControlPanel"
import InclinedPlane from "./InclinedPlane"

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`

const Main = () => {
  const [angle, setAngle] = useState(30) // Default angle
  const [initialPosition, setInitialPosition] = useState("onPlane") // Default initial position

  return (
    <AppContainer>
      <h1>Rolling Motion ⚙️ on Inclined Plane 🛤️</h1>
      <ControlPanel
        angle={angle}
        setAngle={setAngle}
        initialPosition={initialPosition}
        setInitialPosition={setInitialPosition}
      />
      <InclinedPlane angle={angle} initialPosition={initialPosition} />
    </AppContainer>
  )
}

export default Main
