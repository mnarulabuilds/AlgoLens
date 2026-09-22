import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

function simulate(kp: number, ki: number, kd: number, setpoint: number) {
  let y = 0
  let integral = 0
  let prevErr = 0
  const trace: number[] = []
  for (let t = 0; t < 40; t++) {
    const err = setpoint - y
    integral += err
    const derivative = err - prevErr
    const u = kp * err + ki * integral + kd * derivative
    y += u * 0.08
    prevErr = err
    trace.push(Number(y.toFixed(2)))
  }
  return trace
}

const PIDController = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ kp: "12", ki: "2", kd: "4" })
  const kp = parseIntParam(params.kp, 12, 1, 30)
  const ki = parseIntParam(params.ki, 2, 0, 10)
  const kd = parseIntParam(params.kd, 4, 0, 15)
  const trace = useMemo(() => simulate(kp / 10, ki / 100, kd / 10, 1), [kp, ki, kd])

  return (
    <SimWorkbench
      title="PID Controller"
      hint="Proportional + integral + derivative terms drive output toward a setpoint."
      controls={
        <>
          {(["kp", "ki", "kd"] as const).map((key) => (
            <label key={key}>
              {key.toUpperCase()}
              <input
                type="range"
                min={key === "kp" ? 1 : 0}
                max={key === "kp" ? 30 : key === "ki" ? 10 : 15}
                value={parseIntParam(params[key], 0)}
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
      <p>Final output: {trace[trace.length - 1]} (setpoint 1.0)</p>
    </SimWorkbench>
  )
}

export default PIDController
