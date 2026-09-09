import React, { useState, useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

function randn(): number {
  const u1 = Math.random()
  const u2 = Math.random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

const TRUE_MEAN = 50
const TRUE_STD = 10

const ConfidenceIntervals = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ n: "30" })
  const sampleSize = parseIntParam(params.n, 30, 5, 200)
  const [sample, setSample] = useState<number[]>([])
  const [generated, setGenerated] = useState(false)

  const { mean, ciLow, ciHigh, se } = useMemo(() => {
    if (sample.length === 0) {
      return { mean: TRUE_MEAN, ciLow: 45, ciHigh: 55, se: 0 }
    }
    const n = sample.length
    const mean = sample.reduce((a, b) => a + b, 0) / n
    const variance =
      sample.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1 || 1)
    const se = Math.sqrt(variance / n)
    const margin = 1.96 * se
    return { mean, ciLow: mean - margin, ciHigh: mean + margin, se }
  }, [sample])

  const generate = () => {
    const data = Array.from(
      { length: sampleSize },
      () => TRUE_MEAN + randn() * TRUE_STD
    )
    setSample(data)
    setGenerated(true)
    markComplete()
  }

  const W = 560
  const H = 120
  const pad = 40
  const scaleMin = 20
  const scaleMax = 80
  const toX = (v: number) =>
    pad + ((v - scaleMin) / (scaleMax - scaleMin)) * (W - 2 * pad)

  return (
    <SimWorkbench
      title="Confidence Intervals"
      hint="A 95% CI means that if we repeated sampling many times, ~95% of intervals would contain the true mean."
      controls={
        <div>
          <label htmlFor="ci-n">Sample size: {sampleSize}</label>
          <input
            id="ci-n"
            type="range"
            min={5}
            max={200}
            value={sampleSize}
            onChange={(e) => setParams({ n: e.target.value })}
          />
        </div>
      }
      toolbar={
        <button type="button" className="sim-btn" onClick={generate}>
          Draw sample (n={sampleSize})
        </button>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <line
            x1={pad}
            y1={H / 2}
            x2={W - pad}
            y2={H / 2}
            stroke="rgba(128,128,128,0.5)"
            strokeWidth={2}
          />
          <line
            x1={toX(TRUE_MEAN)}
            y1={20}
            x2={toX(TRUE_MEAN)}
            y2={H - 20}
            stroke="#4caf50"
            strokeWidth={2}
            strokeDasharray="6 4"
          />
          <text x={toX(TRUE_MEAN) - 20} y={16} fontSize={10} fill="#4caf50">
            μ={TRUE_MEAN}
          </text>
          {generated && (
            <>
              <line
                x1={toX(ciLow)}
                y1={H / 2}
                x2={toX(ciHigh)}
                y2={H / 2}
                stroke="var(--primary-main, #3949ab)"
                strokeWidth={6}
                strokeLinecap="round"
              />
              <circle cx={toX(mean)} cy={H / 2} r={8} fill="#ffd54f" />
              <text x={toX(ciLow) - 5} y={H - 8} fontSize={10} fill="currentColor">
                {ciLow.toFixed(1)}
              </text>
              <text x={toX(ciHigh) - 10} y={H - 8} fontSize={10} fill="currentColor">
                {ciHigh.toFixed(1)}
              </text>
            </>
          )}
          {[30, 40, 50, 60, 70].map((t) => (
            <text key={t} x={toX(t) - 6} y={H - 8} fontSize={9} fill="currentColor" opacity={0.6}>
              {t}
            </text>
          ))}
        </svg>
        {generated && (
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.9rem" }}>
            Sample mean = {mean.toFixed(2)} | SE = {se.toFixed(2)} | 95% CI = [
            {ciLow.toFixed(2)}, {ciHigh.toFixed(2)}]
          </p>
        )}
      </div>
    </SimWorkbench>
  )
}

export default ConfidenceIntervals
