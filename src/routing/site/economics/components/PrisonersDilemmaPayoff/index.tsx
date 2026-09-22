import React from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"

const PAYOFFS = {
  CC: [3, 3],
  CD: [0, 5],
  DC: [5, 0],
  DD: [1, 1],
} as const

const PrisonersDilemmaPayoff = () => {
  const markComplete = useMarkComplete()

  return (
    <SimWorkbench
      title="Prisoner's Dilemma Payoffs"
      hint="Mutual cooperation beats mutual defection, but tempting to defect."
      controls={
        <button type="button" className="btn btn-sm btn-primary" onClick={() => markComplete()}>
          Mark explored
        </button>
      }
    >
      <table className="table table-sm">
        <thead>
          <tr>
            <th />
            <th>Cooperate</th>
            <th>Defect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Cooperate</th>
            <td>{PAYOFFS.CC.join(", ")}</td>
            <td>{PAYOFFS.CD.join(", ")}</td>
          </tr>
          <tr>
            <th>Defect</th>
            <td>{PAYOFFS.DC.join(", ")}</td>
            <td>{PAYOFFS.DD.join(", ")}</td>
          </tr>
        </tbody>
      </table>
    </SimWorkbench>
  )
}

export default PrisonersDilemmaPayoff
