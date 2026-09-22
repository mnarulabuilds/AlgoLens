import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const CompoundInterest = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({
    principal: "1000",
    rate: "5",
    years: "10",
  })
  const p = parseIntParam(params.principal, 1000, 100, 5000)
  const r = parseIntParam(params.rate, 5, 1, 15) / 100
  const t = parseIntParam(params.years, 10, 1, 30)

  const amount = useMemo(() => p * Math.pow(1 + r, t), [p, r, t])

  return (
    <SimWorkbench
      title="Compound Interest"
      hint="A = P(1 + r)^t — exponential growth of principal."
      controls={
        <>
          {(
            [
              ["principal", 100, 5000],
              ["rate", 1, 15],
              ["years", 1, 30],
            ] as const
          ).map(([key, min, max]) => (
            <label key={key}>
              {key}
              <input
                type="range"
                min={min}
                max={max}
                value={parseIntParam(params[key], min)}
                onChange={(e) => {
                  setParams({ [key]: e.target.value })
                  markComplete()
                }}
              />
            </label>
          ))}
        </>
      }
    >
      <p>
        Future value: ${amount.toFixed(2)} (interest earned: ${(amount - p).toFixed(2)})
      </p>
    </SimWorkbench>
  )
}

export default CompoundInterest
