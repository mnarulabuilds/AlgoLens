import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const SupplyDemand = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ demand: "10", supply: "4" })
  const demandShift = parseIntParam(params.demand, 10, 5, 15)
  const supplyShift = parseIntParam(params.supply, 4, 1, 8)

  const equilibrium = useMemo(() => {
    const q = (demandShift - supplyShift) / 2
    const p = q + supplyShift
    return { q: Math.max(0, q), p: Math.max(0, p) }
  }, [demandShift, supplyShift])

  return (
    <SimWorkbench
      title="Supply & Demand"
      hint="Linear curves intersect at market equilibrium (quantity, price)."
      controls={
        <>
          <label>
            Demand intercept
            <input
              type="range"
              min={5}
              max={15}
              value={demandShift}
              onChange={(e) => {
                setParams({ demand: e.target.value })
                markComplete()
              }}
            />
          </label>
          <label>
            Supply intercept
            <input
              type="range"
              min={1}
              max={8}
              value={supplyShift}
              onChange={(e) => {
                setParams({ supply: e.target.value })
                markComplete()
              }}
            />
          </label>
        </>
      }
    >
      <p>
        Equilibrium ≈ Q* = {equilibrium.q.toFixed(1)}, P* = {equilibrium.p.toFixed(1)}
      </p>
    </SimWorkbench>
  )
}

export default SupplyDemand
