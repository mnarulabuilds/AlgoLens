import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const QubitBloch = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ theta: "45", phi: "30" })
  const theta = (parseIntParam(params.theta, 45, 0, 180) * Math.PI) / 180
  const phi = (parseIntParam(params.phi, 30, 0, 360) * Math.PI) / 180

  const { p0, p1 } = useMemo(() => {
    const amp0 = Math.cos(theta / 2)
    const amp1 = Math.sin(theta / 2)
    void phi
    return { p0: amp0 * amp0, p1: amp1 * amp1 }
  }, [theta, phi])

  const update = (key: string, value: string) => {
    setParams({ [key]: value })
    markComplete()
  }

  return (
    <SimWorkbench
      title="Qubit State"
      hint="|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ} sin(θ/2)|1⟩ — probabilities are |amplitude|²."
      controls={
        <>
          <label>
            θ (polar): {parseIntParam(params.theta, 45)}°
            <input
              type="range"
              min={0}
              max={180}
              value={parseIntParam(params.theta, 45)}
              onChange={(e) => update("theta", e.target.value)}
            />
          </label>
          <label>
            φ (phase): {parseIntParam(params.phi, 30)}°
            <input
              type="range"
              min={0}
              max={360}
              value={parseIntParam(params.phi, 30)}
              onChange={(e) => update("phi", e.target.value)}
            />
          </label>
        </>
      }
    >
      <div className="d-flex gap-4 justify-content-center">
        <div>P(|0⟩) = {(p0 * 100).toFixed(1)}%</div>
        <div>P(|1⟩) = {(p1 * 100).toFixed(1)}%</div>
      </div>
    </SimWorkbench>
  )
}

export default QubitBloch
