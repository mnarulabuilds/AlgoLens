import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const MovingAverageFilter = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ window: "3" })
  const windowSize = parseIntParam(params.window, 3, 2, 6)
  const noisy = [2, 9, 3, 8, 4, 7, 5, 6, 4, 8]

  const smoothed = useMemo(() => {
    const out: number[] = []
    for (let i = 0; i < noisy.length; i++) {
      const start = Math.max(0, i - windowSize + 1)
      const slice = noisy.slice(start, i + 1)
      out.push(Number((slice.reduce((a, b) => a + b, 0) / slice.length).toFixed(2)))
    }
    return out
  }, [windowSize])

  return (
    <SimWorkbench
      title="Moving Average Filter"
      hint="Low-pass smoothing by averaging the last N samples."
      controls={
        <label>
          Window size: {windowSize}
          <input
            type="range"
            min={2}
            max={6}
            value={windowSize}
            onChange={(e) => {
              setParams({ window: e.target.value })
              markComplete()
            }}
          />
        </label>
      }
    >
      <p>Noisy: [{noisy.join(", ")}]</p>
      <p>Filtered: [{smoothed.join(", ")}]</p>
    </SimWorkbench>
  )
}

export default MovingAverageFilter
