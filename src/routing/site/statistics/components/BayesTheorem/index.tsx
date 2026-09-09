import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const BayesTheorem = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({
    pa: "1",
    pba: "80",
    pbna: "10",
  })
  const pA = parseIntParam(params.pa, 1, 1, 50) / 100
  const pBgivenA = parseIntParam(params.pba, 80, 1, 99) / 100
  const pBgivenNotA = parseIntParam(params.pbna, 10, 1, 99) / 100
  const [interacted, setInteracted] = React.useState(false)

  const { pB, pAgivenB } = useMemo(() => {
    const pNotA = 1 - pA
    const pB = pBgivenA * pA + pBgivenNotA * pNotA
    const pAgivenB = pB > 0 ? (pBgivenA * pA) / pB : 0
    return { pB, pAgivenB }
  }, [pA, pBgivenA, pBgivenNotA])

  const setParam = (key: string, value: number) => {
    setParams({ [key]: String(value) })
    if (!interacted) {
      setInteracted(true)
      markComplete()
    }
  }

  return (
    <SimWorkbench
      title="Bayes' Theorem"
      hint="P(A|B) = P(B|A)·P(A) / P(B). Adjust priors and likelihoods to see how evidence updates belief."
      controls={
        <>
          <div>
            <label>P(A) — prior: {(pA * 100).toFixed(0)}%</label>
            <input
              type="range"
              min={1}
              max={50}
              value={parseIntParam(params.pa, 1)}
              onChange={(e) => setParam("pa", Number(e.target.value))}
            />
          </div>
          <div>
            <label>P(B|A) — sensitivity: {(pBgivenA * 100).toFixed(0)}%</label>
            <input
              type="range"
              min={1}
              max={99}
              value={parseIntParam(params.pba, 80)}
              onChange={(e) => setParam("pba", Number(e.target.value))}
            />
          </div>
          <div>
            <label>P(B|¬A) — false positive: {(pBgivenNotA * 100).toFixed(0)}%</label>
            <input
              type="range"
              min={1}
              max={99}
              value={parseIntParam(params.pbna, 10)}
              onChange={(e) => setParam("pbna", Number(e.target.value))}
            />
          </div>
        </>
      }
    >
      <div style={{ padding: "1.5rem", textAlign: "center" }}>
        <div
          style={{
            fontSize: "1.1rem",
            marginBottom: "1rem",
            fontFamily: "monospace",
          }}
        >
          P(A|B) = P(B|A)·P(A) / P(B)
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
          <Stat label="P(A)" value={`${(pA * 100).toFixed(1)}%`} />
          <Stat label="P(B|A)" value={`${(pBgivenA * 100).toFixed(1)}%`} />
          <Stat label="P(B|¬A)" value={`${(pBgivenNotA * 100).toFixed(1)}%`} />
          <Stat label="P(B)" value={`${(pB * 100).toFixed(1)}%`} muted />
        </div>
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.25rem",
            borderRadius: 12,
            background: "rgba(57, 73, 171, 0.2)",
            border: "2px solid var(--primary-main, #3949ab)",
          }}
        >
          <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>Posterior</div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            P(A|B) = {(pAgivenB * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: "0.85rem", marginTop: "0.5rem", opacity: 0.75 }}>
            Given a positive test B, probability of condition A
          </div>
        </div>
      </div>
    </SimWorkbench>
  )
}

function Stat({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div style={{ opacity: muted ? 0.7 : 1 }}>
      <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>{value}</div>
    </div>
  )
}

export default BayesTheorem
