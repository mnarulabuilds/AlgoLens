import React, { useMemo, useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const KEYS = ["user:1", "user:42", "session:abc", "cache:img", "order:99", "cart:7"]

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
}

const ConsistentHashing = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ nodes: "3" })
  const nodeCount = parseIntParam(params.nodes, 3, 2, 5)
  const [activeNodes, setActiveNodes] = useState<number[]>([0, 1, 2])
  const [migrated, setMigrated] = useState<string[]>([])

  const assignments = useMemo(() => {
    const map: Record<string, number> = {}
    KEYS.forEach((key) => {
      const angle = hash(key)
      const sorted = [...activeNodes].sort((a, b) => a - b)
      let owner = sorted[0]
      for (const n of sorted) {
        const nodeAngle = (n * 360) / Math.max(nodeCount, 5)
        if (nodeAngle <= angle) owner = n
      }
      map[key] = owner
    })
    return map
  }, [activeNodes, nodeCount])

  const addNode = () => {
    const next = activeNodes.length
    if (next >= nodeCount) return
    const before = { ...assignments }
    setActiveNodes((p) => [...p, next])
    setTimeout(() => {
      const after: Record<string, number> = {}
      KEYS.forEach((key) => {
        const angle = hash(key)
        const sorted = [...activeNodes, next].sort((a, b) => a - b)
        let owner = sorted[0]
        for (const n of sorted) {
          const nodeAngle = (n * 360) / Math.max(nodeCount, 5)
          if (nodeAngle <= angle) owner = n
        }
        after[key] = owner
      })
      const moved = KEYS.filter((k) => before[k] !== after[k])
      setMigrated(moved)
      if (moved.length) markComplete()
    }, 0)
  }

  const removeNode = () => {
    if (activeNodes.length <= 2) return
    const removed = activeNodes[activeNodes.length - 1]
    setActiveNodes((p) => p.slice(0, -1))
    setMigrated(KEYS.filter((k) => assignments[k] === removed))
    markComplete()
  }

  const W = 320
  const H = 320
  const cx = W / 2
  const cy = H / 2
  const R = 120

  const polar = (deg: number, r = R) => ({
    x: cx + r * Math.cos((deg - 90) * Math.PI / 180),
    y: cy + r * Math.sin((deg - 90) * Math.PI / 180),
  })

  return (
    <SimWorkbench
      title="Consistent Hashing"
      hint="Keys map to the next node clockwise on the ring. Adding/removing a node only remaps a fraction of keys."
      controls={
        <div>
          <label htmlFor="ch-nodes">Max nodes: {nodeCount}</label>
          <input
            id="ch-nodes"
            type="range"
            min={2}
            max={5}
            value={nodeCount}
            onChange={(e) => setParams({ nodes: e.target.value })}
          />
        </div>
      }
      toolbar={
        <>
          <button
            type="button"
            className="sim-btn"
            onClick={addNode}
            disabled={activeNodes.length >= nodeCount}
          >
            Add node
          </button>
          <button
            type="button"
            className="sim-btn sim-btn-secondary"
            onClick={removeNode}
            disabled={activeNodes.length <= 2}
          >
            Remove node
          </button>
        </>
      }
    >
      <div style={{ padding: "1rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="rgba(128,128,128,0.4)"
            strokeWidth={2}
          />
          {activeNodes.map((n) => {
            const deg = (n * 360) / Math.max(nodeCount, 5)
            const p = polar(deg)
            return (
              <g key={n}>
                <circle cx={p.x} cy={p.y} r={14} fill="var(--primary-main, #3949ab)" />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={700}>
                  N{n}
                </text>
              </g>
            )
          })}
          {KEYS.map((key) => {
            const deg = hash(key)
            const p = polar(deg, R - 30)
            const owner = assignments[key]
            const moved = migrated.includes(key)
            return (
              <circle
                key={key}
                cx={p.x}
                cy={p.y}
                r={6}
                fill={moved ? "#f44336" : ["#80cbc4", "#ffd54f", "#ce93d8", "#a5d6a7", "#ffab91", "#90caf9"][owner % 6]}
              >
                <title>{`${key} → N${owner}`}</title>
              </circle>
            )
          })}
        </svg>
        <div style={{ flex: 1, minWidth: 180, fontSize: "0.85rem" }}>
          <strong>Key → Node</strong>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.25rem" }}>
            {KEYS.map((k) => (
              <li key={k} style={{ color: migrated.includes(k) ? "#f44336" : "inherit" }}>
                {k} → Node {assignments[k]}
                {migrated.includes(k) && " (migrated)"}
              </li>
            ))}
          </ul>
          <p style={{ opacity: 0.75 }}>
            Active nodes: {activeNodes.map((n) => `N${n}`).join(", ")}
          </p>
        </div>
      </div>
    </SimWorkbench>
  )
}

export default ConsistentHashing
