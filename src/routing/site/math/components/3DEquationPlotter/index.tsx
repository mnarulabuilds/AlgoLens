import React, { Suspense, useState } from "react"
import "./Plotter.css"
import EquationInput from "./EquationInput"
import Plot3D from "./Plot3D"

const App = () => {
  const [equation, setEquation] = useState("")

  const handleEquationChange = (newEquation) => {
    setEquation(newEquation)
  }

  return (
    <div className="Plotter">
      <h1>3D Equation Plotter in x , y and z</h1>
      <EquationInput onEquationChange={handleEquationChange} />
      {equation && (
        <Suspense fallback={<div>Loading plot...</div>}>
          <Plot3D equation={equation} />
        </Suspense>
      )}
    </div>
  )
}

export default App
