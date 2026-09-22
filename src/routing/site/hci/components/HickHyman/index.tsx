import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const HickHyman = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ choices: "4" })
  const n = parseIntParam(params.choices, 4, 2, 16)
  const a = 200
  const b = 120
  const rt = useMemo(() => a + b * Math.log2(n), [n])

  return (
    <SimWorkbench
      title="Hick–Hyman Law"
      hint="Reaction time increases logarithmically with the number of equally likely choices."
      controls={
        <label>
          Choices n: {n}
          <input
            type="range"
            min={2}
            max={16}
            value={n}
            onChange={(e) => {
              setParams({ choices: e.target.value })
              markComplete()
            }}
          />
        </label>
      }
    >
      <p>Estimated reaction time RT ≈ {rt.toFixed(0)} ms</p>
    </SimWorkbench>
  )
}

export default HickHyman
