import React, { useState } from "react"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import styles from "./BellmanFord.module.css"

const BellmanFordVisualizer = () => {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [startNode, setStartNode] = useState("")
  const [distances, setDistances] = useState({})
  const [log, setLog] = useState([])
  const [negativeCycle, setNegativeCycle] = useState(false)
  const markComplete = useMarkComplete()

  const addNode = () => {
    const newNode = `N${nodes.length}`
    setNodes([...nodes, newNode])
  }

  const addEdge = () => {
    const from = prompt("From Node:")
    const to = prompt("To Node:")
    const weight = Number(prompt("Weight:"))

    if (!nodes.includes(from) || !nodes.includes(to)) {
      alert("Invalid nodes")
      return
    }

    setEdges([...edges, { from, to, weight }])
  }

  const runBellmanFord = () => {
    if (!startNode) {
      alert("Select a start node!")
      return
    }

    const dist = {}
    nodes.forEach((n) => (dist[n] = Infinity))
    dist[startNode] = 0

    const logSteps = []

    for (let i = 0; i < nodes.length - 1; i++) {
      edges.forEach(({ from, to, weight }) => {
        if (dist[from] + weight < dist[to]) {
          dist[to] = dist[from] + weight
          logSteps.push(`Relaxed edge ${from} → ${to}, new cost = ${dist[to]}`)
        }
      })
    }

    // Check negative cycle
    let hasNegCycle = false
    edges.forEach(({ from, to, weight }) => {
      if (dist[from] + weight < dist[to]) {
        hasNegCycle = true
      }
    })

    setNegativeCycle(hasNegCycle)
    setDistances(dist)
    setLog(logSteps)
    if (nodes.length > 0) markComplete()
  }

  return (
    <div className={styles.wrapper}>
      <h2>Bellman–Ford Visualizer 🚦</h2>

      <div className={styles.controls}>
        <button onClick={addNode}>➕ Add Node</button>
        <button onClick={addEdge}>➕ Add Edge</button>

        <select onChange={(e) => setStartNode(e.target.value)} defaultValue="">
          <option value="">Pick Start Node</option>
          {nodes.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>

        <button className={styles.runBtn} onClick={runBellmanFord}>
          ▶️ Run Bellman–Ford
        </button>
      </div>

      <div className={styles.grid}>
        <div>
          <h3>Nodes</h3>
          <ul>
            {nodes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <h3>Edges</h3>
          <ul>
            {edges.map((e, i) => (
              <li key={i}>
                {e.from} → {e.to} (w={e.weight})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Distances</h3>
          <ul>
            {Object.keys(distances).map((n) => (
              <li key={n}>
                {n}: {distances[n] === Infinity ? "∞" : distances[n]}
              </li>
            ))}
          </ul>

          {negativeCycle && (
            <div className={styles.error}>⚠️ Negative Cycle Detected!</div>
          )}
        </div>

        <div className={styles.logBox}>
          <h3>Relaxation Log</h3>
          {log.map((l, i) => (
            <div key={i} className={styles.logItem}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BellmanFordVisualizer
