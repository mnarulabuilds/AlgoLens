import React, { useState, useEffect, useCallback } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const STATES = ["Sunny", "Rainy", "Cloudy"]
const MATRIX = [
  [0.7, 0.2, 0.1],
  [0.3, 0.4, 0.3],
  [0.4, 0.3, 0.3],
]

const NODE_POS = [
  { x: 120, y: 80 },
  { x: 280, y: 180 },
  { x: 440, y: 80 },
]

const MarkovChains = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ steps: "10" })
  const maxSteps = parseIntParam(params.steps, 10, 3, 30)
  const [state, setState] = useState(0)
  const [history, setHistory] = useState<number[]>([0])
  const [step, setStep] = useState(0)
  const [running, setRunning] = useState(false)

  const nextState = useCallback((s: number) => {
    const row = MATRIX[s]
    const r = Math.random()
    let cum = 0
    for (let i = 0; i < row.length; i++) {
      cum += row[i]
      if (r < cum) return i
    }
    return row.length - 1
  }, [])

  const stepOnce = () => {
    const next = nextState(state)
    setState(next)
    setHistory((h) => [...h, next])
    setStep((s) => s + 1)
    if (step + 1 >= maxSteps) {
      markComplete()
      setRunning(false)
    }
  }

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      if (step >= maxSteps) {
        setRunning(false)
        return
      }
      stepOnce()
    }, 600)
    return () => clearInterval(id)
  }, [running, step, maxSteps])

  const reset = () => {
    setState(0)
    setHistory([0])
    setStep(0)
    setRunning(false)
  }

  const W = 560
  const H = 240

  return (
    <SimWorkbench
      title="Markov Chains"
      hint="Each step transitions according to the row of the matrix for the current state. Future depends only on present."
      controls={
        <div>
          <label htmlFor="mk-steps">Animation steps: {maxSteps}</label>
          <input
            id="mk-steps"
            type="range"
            min={3}
            max={30}
            value={maxSteps}
            onChange={(e) => setParams({ steps: e.target.value })}
          />
        </div>
      }
      toolbar={
        <>
          <button
            type="button"
            className="sim-btn"
            onClick={() => setRunning(true)}
            disabled={running || step >= maxSteps}
          >
            Animate
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={stepOnce}
            disabled={running || step >= maxSteps}
          >
            Step
          </button>
          <button type="button" className="sim-btn sim-btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1rem" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          {MATRIX.map((row, i) =>
            row.map((p, j) => {
              if (p < 0.15) return null
              const from = NODE_POS[i]
              const to = NODE_POS[j]
              const mx = (from.x + to.x) / 2
              const my = (from.y + to.y) / 2 - 20
              return (
                <text
                  key={`${i}-${j}`}
                  x={mx}
                  y={my}
                  fontSize={9}
                  fill="currentColor"
                  opacity={0.5}
                  textAnchor="middle"
                >
                  {p.toFixed(1)}
                </text>
              )
            })
          )}
          {NODE_POS.map((pos, i) => (
            <g key={STATES[i]}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={36}
                fill={
                  state === i
                    ? "var(--primary-main, #3949ab)"
                    : "rgba(128,128,128,0.25)"
                }
                stroke={state === i ? "#ffd54f" : "rgba(128,128,128,0.4)"}
                strokeWidth={state === i ? 3 : 1}
              />
              <text
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={state === i ? "#fff" : "currentColor"}
              >
                {STATES[i]}
              </text>
            </g>
          ))}
        </svg>
        <table style={{ width: "100%", fontSize: "0.85rem", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 4 }}>From → To</th>
              {STATES.map((s) => (
                <th key={s} style={{ padding: 4 }}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: 4, fontWeight: 600 }}>{STATES[i]}</td>
                {row.map((p, j) => (
                  <td
                    key={j}
                    style={{
                      padding: 4,
                      textAlign: "center",
                      background:
                        state === i ? "rgba(57, 73, 171, 0.15)" : "transparent",
                    }}
                  >
                    {p.toFixed(1)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem" }}>
          Path: {history.map((h) => STATES[h]).join(" → ")} | Step {step}/{maxSteps}
        </p>
      </div>
    </SimWorkbench>
  )
}

export default MarkovChains
