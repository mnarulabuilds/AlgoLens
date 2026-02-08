import React, { useEffect, useRef, useState } from "react"
import styles from "./KruskalVisualizer.module.css"
import { useMemo } from "react"

// ---------- useKruskal hook (algorithm + step control + DSU animation state) ----------
function useKruskal(nodes, edges) {
  // nodes: array of node ids
  // edges: array of {id, u, v, weight}
  const sortedEdges = useMemo(
    () => [...edges].sort((a, b) => a.weight - b.weight),
    [edges]
  )

  // DSU
  function makeDSU(nlist) {
    const parent = {}
    const rank = {}
    nlist.forEach((x) => {
      parent[x] = x
      rank[x] = 0
    })
    return { parent, rank }
  }

  function find(parent, x) {
    if (parent[x] !== x) parent[x] = find(parent, parent[x])
    return parent[x]
  }

  function union(parent, rank, a, b) {
    let ra = find(parent, a)
    let rb = find(parent, b)
    if (ra === rb) return false
    if (rank[ra] < rank[rb]) parent[ra] = rb
    else if (rank[ra] > rank[rb]) parent[rb] = ra
    else {
      parent[rb] = ra
      rank[ra] += 1
    }
    return true
  }

  // Step-by-step states
  function init() {
    const dsu = makeDSU(nodes)
    return {
      stepIndex: 0, // index into sortedEdges
      acceptedEdges: [], // edges accepted into MST
      rejectedEdges: [],
      dsu,
      status: "idle", // idle | running | finished
      logs: [],
    }
  }

  function step(state) {
    if (state.stepIndex >= sortedEdges.length) {
      return { ...state, status: "finished" }
    }
    const edge = sortedEdges[state.stepIndex]
    const { u, v } = edge
    const parentCopy = { ...state.dsu.parent }
    const rankCopy = { ...state.dsu.rank }
    const alreadyConnected = find(parentCopy, u) === find(parentCopy, v)

    let newAccepted = [...state.acceptedEdges]
    let newRejected = [...state.rejectedEdges]
    let newLogs = [...state.logs]

    if (!alreadyConnected) {
      union(parentCopy, rankCopy, u, v)
      newAccepted.push(edge)
      newLogs.push(`Accepted edge ${u}–${v} (w=${edge.weight})`)
    } else {
      newRejected.push(edge)
      newLogs.push(
        `Rejected edge ${u}–${v} (w=${edge.weight}) — would form cycle`
      )
    }

    return {
      ...state,
      stepIndex: state.stepIndex + 1,
      acceptedEdges: newAccepted,
      rejectedEdges: newRejected,
      dsu: { parent: parentCopy, rank: rankCopy },
      logs: newLogs,
      status:
        state.stepIndex + 1 >= sortedEdges.length ? "finished" : "running",
    }
  }

  function runAll(initialState) {
    let s = { ...initialState }
    while (s.stepIndex < sortedEdges.length) {
      s = step(s)
    }
    return s
  }

  return { init, step, runAll, sortedEdges }
}

// ---------- KruskalVisualizer Component ----------
export default function KruskalMST() {
  const [nodes, setNodes] = useState(["A", "B", "C", "D"])
  const [edges, setEdges] = useState([
    { id: "e1", u: "A", v: "B", weight: 3 },
    { id: "e2", u: "A", v: "C", weight: 1 },
    { id: "e3", u: "B", v: "C", weight: 7 },
    { id: "e4", u: "B", v: "D", weight: 5 },
    { id: "e5", u: "C", v: "D", weight: 2 },
  ])

  const { init, step, runAll, sortedEdges } = useKruskal(nodes, edges)
  const [state, setState] = useState(() => init())

  // Layout state for simple force-directed placement
  const [positions, setPositions] = useState(() => {
    const map = {}
    const angleStep = (Math.PI * 2) / nodes.length
    nodes.forEach((n, i) => {
      map[n] = {
        x: 300 + Math.cos(i * angleStep) * 150,
        y: 150 + Math.sin(i * angleStep) * 100,
        vx: 0,
        vy: 0,
      }
    })
    return map
  })

  // update positions if node count changes
  useEffect(() => {
    setPositions((old) => {
      const next = { ...old }
      const angleStep = (Math.PI * 2) / nodes.length
      nodes.forEach((n, i) => {
        if (!next[n])
          next[n] = {
            x: 300 + Math.cos(i * angleStep) * 150,
            y: 150 + Math.sin(i * angleStep) * 100,
            vx: 0,
            vy: 0,
          }
      })
      // remove deleted
      Object.keys(next).forEach((k) => {
        if (!nodes.includes(k)) delete next[k]
      })
      return next
    })
  }, [nodes])

  // simple force simulation tick
  const rafRef = useRef(null)
  useEffect(() => {
    let mounted = true
    function tick() {
      setPositions((pos) => {
        const p = { ...pos }
        const keys = Object.keys(p)
        // repulsion
        for (let i = 0; i < keys.length; i++) {
          for (let j = i + 1; j < keys.length; j++) {
            const a = p[keys[i]]
            const b = p[keys[j]]
            let dx = a.x - b.x
            let dy = a.y - b.y
            let dist = Math.sqrt(dx * dx + dy * dy) || 1
            const force = 800 / (dist * dist)
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            a.vx += fx
            a.vy += fy
            b.vx -= fx
            b.vy -= fy
          }
        }
        // spring edges
        edges.forEach((e) => {
          const a = p[e.u]
          const b = p[e.v]
          if (!a || !b) return
          let dx = b.x - a.x
          let dy = b.y - a.y
          let dist = Math.sqrt(dx * dx + dy * dy) || 1
          const desired = 120
          const k = 0.02
          const diff = dist - desired
          const fx = (dx / dist) * diff * k
          const fy = (dy / dist) * diff * k
          a.vx += fx
          a.vy += fy
          b.vx -= fx
          b.vy -= fy
        })

        // integrate
        keys.forEach((key) => {
          p[key].vx *= 0.85
          p[key].vy *= 0.85
          p[key].x += p[key].vx
          p[key].y += p[key].vy
          // bounds
          p[key].x = Math.max(30, Math.min(570, p[key].x))
          p[key].y = Math.max(30, Math.min(320, p[key].y))
        })
        return p
      })
      if (mounted) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      mounted = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [edges])

  // Controls
  function handleAddNode() {
    // next label: single uppercase letters then A1, A2 if >26
    const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let nextLabel = "X"
    for (let i = 0; i < base.length; i++) {
      if (!nodes.includes(base[i])) {
        nextLabel = base[i]
        break
      }
    }
    if (nodes.length >= 26) nextLabel = `N${nodes.length}`
    setNodes((s) => [...s, nextLabel])
  }

  function handleAddEdge() {
    const from = prompt("From node (id):")
    const to = prompt("To node (id):")
    const w = Number(prompt("Weight (number):"))
    if (!from || !to || isNaN(w)) return alert("Invalid input")
    if (!nodes.includes(from) || !nodes.includes(to))
      return alert("Unknown nodes")
    const id = `e${edges.length + 1}`
    setEdges((s) => [...s, { id, u: from, v: to, weight: w }])
  }

  function handleReset() {
    setState(init())
    // keep nodes/edges
  }

  // algorithm steps
  function handleStep() {
    setState((s) => step(s))
  }

  function handleRunAll() {
    setState((s) => runAll(s))
  }

  // when nodes or edges change, reinit state
  useEffect(() => {
    setState(() => init())
  }, [nodes, edges])

  // helpers for rendering
  const acceptedSet = new Set(state.acceptedEdges.map((e) => e.id))
  const rejectedSet = new Set(state.rejectedEdges.map((e) => e.id))
  const nextEdge = sortedEdges[state.stepIndex]

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kruskal&apos;s MST Visualizer 🪢</h2>
      <div className={styles.controls}>
        <button onClick={handleAddNode}>➕ Add Node</button>
        <button onClick={handleAddEdge}>➕ Add Edge</button>
        <button onClick={handleStep}>⏭ Step</button>
        <button onClick={handleRunAll}>▶ Run All</button>
        <button onClick={handleReset}>⟲ Reset</button>
      </div>

      <div className={styles.main}>
        <svg className={styles.canvas} viewBox="0 0 600 360">
          {/* edges (base) */}
          {edges.map((e) => {
            const a = positions[e.u]
            const b = positions[e.v]
            if (!a || !b) return null
            const isAccepted = acceptedSet.has(e.id)
            const isRejected = rejectedSet.has(e.id)
            const isNext = nextEdge && nextEdge.id === e.id
            return (
              <g key={e.id}>
                <line
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={
                    isAccepted
                      ? "#2b8a3e"
                      : isRejected
                      ? "#d9534f"
                      : isNext
                      ? "#f0ad4e"
                      : "#aaa"
                  }
                  strokeWidth={isAccepted ? 4 : isNext ? 3.5 : 2}
                  opacity={isRejected ? 0.6 : 1}
                />
                <text
                  x={(a.x + b.x) / 2 + 6}
                  y={(a.y + b.y) / 2 - 6}
                  className={styles.edgeLabel}
                >
                  {e.weight}
                </text>
              </g>
            )
          })}

          {/* accepted edges highlight on top */}
          {state.acceptedEdges.map((e) => {
            const a = positions[e.u]
            const b = positions[e.v]
            if (!a || !b) return null
            return (
              <line
                key={`acc-${e.id}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#2b8a3e"
                strokeWidth={4}
                opacity={0.4}
              />
            )
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const p = positions[n] || { x: 300, y: 150 }
            // find leader for DSU highlighting
            const leader = state.dsu?.parent
              ? (function () {
                  let pr = state.dsu.parent
                  let x = n
                  while (pr[x] !== x) x = pr[x]
                  return x
                })()
              : null
            return (
              <g
                key={n}
                className={styles.nodeGroup}
                transform={`translate(${p.x}, ${p.y})`}
              >
                <circle
                  r={18}
                  fill={leader ? "#fff" : "#fff"}
                  stroke="#333"
                  strokeWidth={2}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={styles.nodeLabel}
                >
                  {n}
                </text>
              </g>
            )
          })}
        </svg>

        <div className={styles.side}>
          <div className={styles.panel}>
            <h4>Sorted Edges</h4>
            <ol>
              {sortedEdges.map((e) => (
                <li key={e.id} style={{ marginBottom: 6 }}>
                  <strong
                    style={{
                      color: acceptedSet.has(e.id)
                        ? "#2b8a3e"
                        : rejectedSet.has(e.id)
                        ? "#d9534f"
                        : "#333",
                    }}
                  >
                    {e.u}–{e.v}
                  </strong>{" "}
                  (w={e.weight}){" "}
                  {nextEdge && nextEdge.id === e.id ? " ← next" : ""}
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.panel}>
            <h4>MST Edges</h4>
            <ul>
              {state.acceptedEdges.map((e) => (
                <li key={e.id}>
                  {e.u}–{e.v} (w={e.weight})
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              Total weight:{" "}
              {state.acceptedEdges.reduce((s, e) => s + e.weight, 0)}
            </div>
          </div>

          <div className={styles.panel}>
            <h4>DSU Parent Map</h4>
            <pre className={styles.dsuBox}>
              {state.dsu ? JSON.stringify(state.dsu.parent, null, 2) : "{}"}
            </pre>
          </div>

          <div className={styles.panel}>
            <h4>Logs</h4>
            <div className={styles.logBox}>
              {state.logs.map((l, i) => (
                <div key={i} className={styles.logItem}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
