import React from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const RGBColorMixer = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ r: "200", g: "80", b: "120" })
  const r = parseIntParam(params.r, 200, 0, 255)
  const g = parseIntParam(params.g, 80, 0, 255)
  const b = parseIntParam(params.b, 120, 0, 255)
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`

  const onChange = (key: string, value: string) => {
    setParams({ [key]: value })
    markComplete()
  }

  return (
    <SimWorkbench
      title="RGB Color Mixer"
      hint="Additive color mixing — the same model used by displays."
      controls={
        <>
          {(["r", "g", "b"] as const).map((channel) => (
            <label key={channel}>
              {channel.toUpperCase()}: {parseIntParam(params[channel], 0)}
              <input
                type="range"
                min={0}
                max={255}
                value={parseIntParam(params[channel], 0)}
                onChange={(e) => onChange(channel, e.target.value)}
              />
            </label>
          ))}
        </>
      }
    >
      <div
        style={{
          width: "100%",
          height: 160,
          borderRadius: 12,
          background: `rgb(${r}, ${g}, ${b})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        {hex}
      </div>
    </SimWorkbench>
  )
}

export default RGBColorMixer
