import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

type Point = { x: number; y: number; label: "A" | "B" }

const POINTS: Point[] = [
  { x: 30, y: 70, label: "A" },
  { x: 45, y: 55, label: "A" },
  { x: 55, y: 80, label: "A" },
  { x: 70, y: 40, label: "B" },
  { x: 80, y: 65, label: "B" },
  { x: 85, y: 30, label: "B" },
  { x: 40, y: 35, label: "A" },
  { x: 75, y: 75, label: "B" },
]

const SPLIT_X = 60
const SPLIT_Y = 50

function classify(x: number, y: number): "A" | "B" {
  if (x < SPLIT_X) return y < SPLIT_Y ? "A" : "A"
  return y < SPLIT_Y ? "B" : "B"
}

const DecisionTrees = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ split: "x" })
  const showSplit = params.split === "x" ? "x" : "y"
  const [classified, setClassified] = React.useState(false)

  const accuracy = useMemo(() => {
    const correct = POINTS.filter((p) => classify(p.x, p.y) === p.label).length
    return ((correct / POINTS.length) * 100).toFixed(0)
  }, [])

  const handleClassify = () => {
    setClassified(true)
    markComplete()
  }

  const W = 400
  const H = 280
  const pad = 30
  const scale = (v: number, max: number) => pad + (v / 100) * (max - 2 * pad)

  return (
    <SimWorkbench
      title="Decision Tree Classifier"
      hint="A tree splits feature space with axis-aligned boundaries. Here x < 60 then y < 50 separates classes A and B."
      controls={
        <div>
          <label htmlFor="dt-split">Highlight split</label>
          <select
            id="dt-split"
            value={showSplit}
            onChange={(e) => setParams({ split: e.target.value })}
          >
            <option value="x">First split: x &lt; 60</option>
            <option value="y">Second split: y &lt; 50</option>
          </select>
        </div>
      }
      toolbar={
        <button type="button" className="sim-btn" onClick={handleClassify}>
          Classify regions
        </button>
      }
    >
      <div style={{ padding: "1rem" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
          <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} fill="rgba(128,128,128,0.08)" />
          {classified && (
            <>
              <rect
                x={pad}
                y={pad}
                width={scale(SPLIT_X, W) - pad}
                height={H - 2 * pad}
                fill="rgba(57, 73, 171, 0.12)"
              />
              <rect
                x={scale(SPLIT_X, W)}
                y={pad}
                width={W - pad - (scale(SPLIT_X, W))}
                height={scale(SPLIT_Y, H) - pad}
                fill="rgba(244, 67, 54, 0.12)"
              />
            </>
          )}
          {(showSplit === "x" || classified) && (
            <line
              x1={scale(SPLIT_X, W)}
              y1={pad}
              x2={scale(SPLIT_X, W)}
              y2={H - pad}
              stroke="#ffd54f"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          )}
          {(showSplit === "y" || classified) && (
            <line
              x1={scale(SPLIT_X, W)}
              y1={scale(SPLIT_Y, H)}
              x2={W - pad}
              y2={scale(SPLIT_Y, H)}
              stroke="#80cbc4"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          )}
          {POINTS.map((p, i) => (
            <circle
              key={i}
              cx={scale(p.x, W)}
              cy={scale(p.y, H)}
              r={8}
              fill={p.label === "A" ? "#3949ab" : "#f44336"}
              stroke="#fff"
              strokeWidth={1}
            />
          ))}
          <text x={pad} y={H - 8} fontSize={10} fill="currentColor">0</text>
          <text x={W - pad - 15} y={H - 8} fontSize={10} fill="currentColor">100</text>
        </svg>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", fontSize: "0.9rem", flexWrap: "wrap" }}>
          <span><span style={{ color: "#3949ab" }}>●</span> Class A</span>
          <span><span style={{ color: "#f44336" }}>●</span> Class B</span>
          {classified && (
            <span>Training accuracy: {accuracy}%</span>
          )}
        </div>
        <pre style={{ fontSize: "0.8rem", marginTop: "0.75rem", opacity: 0.85 }}>
{`if x < 60:
  → class A
else:
  if y < 50: → class B
  else:      → class B`}
        </pre>
      </div>
    </SimWorkbench>
  )
}

export default DecisionTrees
