import React, { useMemo, useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"

type State = [number, number]

const gates = {
  X: (s: State): State => [s[1], s[0]],
  Y: (s: State): State => [-s[1], s[0]],
  Z: (s: State): State => [s[0], -s[1]],
}

const PauliGates = () => {
  const markComplete = useMarkComplete()
  const [state, setState] = useState<State>([1, 0])
  const norm = useMemo(
    () => Math.sqrt(state[0] * state[0] + state[1] * state[1]) || 1,
    [state]
  )

  const apply = (gate: keyof typeof gates) => {
    setState(gates[gate](state))
    markComplete()
  }

  return (
    <SimWorkbench
      title="Pauli Gates"
      hint="X bit-flip, Z phase-flip, Y combines both (up to global phase)."
      controls={
        <div className="d-flex gap-2">
          {(["X", "Y", "Z"] as const).map((g) => (
            <button key={g} type="button" className="btn btn-sm btn-primary" onClick={() => apply(g)}>
              Apply {g}
            </button>
          ))}
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setState([1, 0])}>
            Reset |0⟩
          </button>
        </div>
      }
    >
      <p>
        Amplitudes: α = {(state[0] / norm).toFixed(2)}, β = {(state[1] / norm).toFixed(2)}
      </p>
    </SimWorkbench>
  )
}

export default PauliGates
