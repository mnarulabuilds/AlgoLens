import React from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const GestaltProximity = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ gap: "8" })
  const gap = parseIntParam(params.gap, 8, 4, 48)

  const dot = (left: number) => (
    <div
      key={left}
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "#162788",
        position: "absolute",
        left,
        top: 20,
      }}
    />
  )

  return (
    <SimWorkbench
      title="Gestalt Proximity"
      hint="Items close together are perceived as one group."
      controls={
        <label>
          Within-group spacing (px)
          <input
            type="range"
            min={4}
            max={48}
            value={gap}
            onChange={(e) => {
              setParams({ gap: e.target.value })
              markComplete()
            }}
          />
        </label>
      }
    >
      <div style={{ position: "relative", height: 60, marginBottom: 24 }}>
        {[0, gap, gap * 2].map(dot)}
        {[120, 120 + gap, 120 + gap * 2].map(dot)}
      </div>
    </SimWorkbench>
  )
}

export default GestaltProximity
