import React from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"

const HadamardSuperposition = () => {
  const markComplete = useMarkComplete()
  const [applied, setApplied] = React.useState(false)

  const applyH = () => {
    setApplied(true)
    markComplete()
  }

  return (
    <SimWorkbench
      title="Hadamard Superposition"
      hint="H|0⟩ = (|0⟩ + |1⟩)/√2 — equal superposition before measurement."
      controls={
        <button type="button" className="btn btn-primary" onClick={applyH}>
          Apply H to |0⟩
        </button>
      }
    >
      {applied ? (
        <p>|ψ⟩ = 0.707|0⟩ + 0.707|1⟩ — 50% / 50% measurement outcomes.</p>
      ) : (
        <p>Initial state |0⟩ — click to apply Hadamard.</p>
      )}
    </SimWorkbench>
  )
}

export default HadamardSuperposition
