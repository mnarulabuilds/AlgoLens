import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const FittsLaw = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ distance: "200", width: "40" })
  const D = parseIntParam(params.distance, 200, 50, 400)
  const W = parseIntParam(params.width, 40, 10, 120)
  const a = 50
  const b = 150

  const mt = useMemo(() => a + b * Math.log2(D / W + 1), [D, W])

  return (
    <SimWorkbench
      title="Fitts's Law"
      hint="Movement time grows with log(distance/target width) — basis for UI target sizing."
      controls={
        <>
          <label>
            Distance D (px)
            <input
              type="range"
              min={50}
              max={400}
              value={D}
              onChange={(e) => {
                setParams({ distance: e.target.value })
                markComplete()
              }}
            />
          </label>
          <label>
            Target width W (px)
            <input
              type="range"
              min={10}
              max={120}
              value={W}
              onChange={(e) => {
                setParams({ width: e.target.value })
                markComplete()
              }}
            />
          </label>
        </>
      }
    >
      <p>Estimated movement time MT ≈ {mt.toFixed(0)} ms</p>
      <div style={{ position: "relative", height: 60 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#162788",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: D,
            width: W,
            height: 24,
            borderRadius: 4,
            background: "#0D681C",
          }}
        />
      </div>
    </SimWorkbench>
  )
}

export default FittsLaw
