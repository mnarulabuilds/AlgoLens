import React, { useState, useCallback, lazy, Suspense } from "react"
import EquationInput from "./EquationInput"
import "./Plotter.css"

const Plot = lazy(() => import("./Plot"))

const App = () => {
  const [equation, setEquation] = useState("")

  const handleEquationChange = useCallback((newEquation) => {
    setEquation(newEquation)
  }, [])

  return (
    <div className="Plotter">
      <h1>2-D Equation Plotter in x and y</h1>
      <EquationInput onEquationChange={handleEquationChange} />
      {equation && (
        <Suspense fallback={<div>Loading plot...</div>}>
          <Plot equation={equation} />
        </Suspense>
      )}
    </div>
  )
}

export default App
