import React, { useState, useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

function rollDie(): number {
  return Math.floor(Math.random() * 6) + 1
}

const CentralLimitTheorem = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ n: "50" })
  const sampleSize = parseIntParam(params.n, 50, 10, 500)
  const [sums, setSums] = useState<number[]>([])
  const [totalRolls, setTotalRolls] = useState(0)

  const rollBatch = () => {
    const batch: number[] = []
    for (let i = 0; i < sampleSize; i++) {
      let sum = 0
      for (let d = 0; d < 5; d++) sum += rollDie()
      batch.push(sum)
    }
    setSums((prev) => [...prev, ...batch].slice(-2000))
    setTotalRolls((t) => t + sampleSize)
    if (totalRolls + sampleSize >= 200) markComplete()
  }

  const reset = () => {
    setSums([])
    setTotalRolls(0)
  }

  const { bins, maxCount, mean } = useMemo(() => {
    const min = 5
    const max = 30
    const bucketCount = 26
    const counts = Array(bucketCount).fill(0)
    sums.forEach((s) => {
      const idx = Math.min(Math.max(s - min, 0), bucketCount - 1)
      counts[idx]++
    })
    const m = sums.length
      ? sums.reduce((a, b) => a + b, 0) / sums.length
      : 17.5
    return {
      bins: counts.map((c, i) => ({ value: min + i, count: c })),
      maxCount: Math.max(...counts, 1),
      mean: m,
    }
  }, [sums])

  const W = 560
  const H = 220
  const pad = 30

  return (
    <SimWorkbench
      title="Central Limit Theorem"
      hint="Sum of 5 dice rolled many times. The distribution of sums approaches a normal (bell) curve."
      controls={
        <div>
          <label htmlFor="clt-n">Rolls per batch: {sampleSize}</label>
          <input
            id="clt-n"
            type="range"
            min={10}
            max={500}
            step={10}
            value={sampleSize}
            onChange={(e) => setParams({ n: e.target.value })}
          />
        </div>
      }
      toolbar={
        <>
          <button type="button" className="sim-btn" onClick={rollBatch}>
            Roll {sampleSize} sums
          </button>
          <button type="button" className="sim-btn sim-btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1rem" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
          {bins.map((b, i) => {
            const barW = (W - 2 * pad) / bins.length - 2
            const x = pad + i * ((W - 2 * pad) / bins.length)
            const h = (b.count / maxCount) * (H - 2 * pad)
            return (
              <rect
                key={b.value}
                x={x}
                y={H - pad - h}
                width={barW}
                height={h}
                fill="var(--primary-main, #3949ab)"
                opacity={0.85}
                rx={2}
              />
            )
          })}
          <line
            x1={pad + ((mean - 5) / 25) * (W - 2 * pad)}
            y1={pad}
            x2={pad + ((mean - 5) / 25) * (W - 2 * pad)}
            y2={H - pad}
            stroke="#ffd54f"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <text x={pad} y={H - 8} fontSize={11} fill="currentColor">5</text>
          <text x={W - pad - 20} y={H - 8} fontSize={11} fill="currentColor">30</text>
        </svg>
        <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem" }}>
          Total samples: {sums.length} | Mean sum: {mean.toFixed(2)} | Yellow line = sample mean
        </p>
      </div>
    </SimWorkbench>
  )
}

export default CentralLimitTheorem
