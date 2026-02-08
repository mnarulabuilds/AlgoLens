import React, { useEffect, useState } from "react"
import styles from "./DijkstraGraph.module.css"

const Dijkstra = () => {
  const nodes = [
    { id: 0, x: 100, y: 100 },
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 500, y: 100 },
    { id: 3, x: 700, y: 100 },
    { id: 4, x: 200, y: 250 },
    { id: 5, x: 400, y: 250 },
    { id: 6, x: 600, y: 250 },
    { id: 7, x: 800, y: 250 },
    { id: 8, x: 300, y: 400 },
    { id: 9, x: 600, y: 400 },
  ]

  const edges = [
    { from: 0, to: 1, weight: 4 },
    { from: 0, to: 4, weight: 2 },
    { from: 1, to: 2, weight: 3 },
    { from: 1, to: 5, weight: 2 },
    { from: 2, to: 3, weight: 1 },
    { from: 2, to: 6, weight: 5 },
    { from: 4, to: 5, weight: 3 },
    { from: 5, to: 6, weight: 1 },
    { from: 5, to: 8, weight: 4 },
    { from: 6, to: 9, weight: 2 },
  ]

  const [visited, setVisited] = useState([])
  const [current, setCurrent] = useState(null)
  const [distances, setDistances] = useState({})
  const [step, setStep] = useState(0)

  useEffect(() => {
    const runDijkstra = async () => {
      const dist = {}
      nodes.forEach((n) => (dist[n.id] = Infinity))
      dist[0] = 0

      const pq = [{ id: 0, dist: 0 }]
      const visitedOrder = []

      while (pq.length) {
        pq.sort((a, b) => a.dist - b.dist)
        const { id } = pq.shift()

        if (visitedOrder.includes(id)) continue
        visitedOrder.push(id)

        setCurrent(id)
        setVisited([...visitedOrder])
        setDistances({ ...dist })
        setStep((s) => s + 1)

        await new Promise((res) => setTimeout(res, 1200))

        edges.forEach(({ from, to, weight }) => {
          if (from === id && dist[to] > dist[id] + weight) {
            dist[to] = dist[id] + weight
            pq.push({ id: to, dist: dist[to] })
          }
          if (to === id && dist[from] > dist[id] + weight) {
            dist[from] = dist[id] + weight
            pq.push({ id: from, dist: dist[from] })
          }
        })
      }
      setCurrent(null)
    }

    runDijkstra()
  }, [])

  return (
    <div>
      <div className={styles.title}>Dijkstra’s Algorithm 🚦</div>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendVisited}`} />
          <span>Visited</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendCurrent}`} />
          <span>Current</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendEdge}`} />
          <span>Active Edge</span>
        </div>
      </div>

      {/* Step Counter */}
      <div className={styles.stepCounter}>Step {step}</div>

      <div className={styles.graphContainer}>
        <svg width="900" height="500">
          {edges.map((edge, i) => (
            <line
              key={i}
              x1={nodes[edge.from].x}
              y1={nodes[edge.from].y}
              x2={nodes[edge.to].x}
              y2={nodes[edge.to].y}
              stroke="#ccc"
              strokeWidth="2"
            />
          ))}
          {edges.map((edge, i) => (
            <text
              key={`w-${i}`}
              x={(nodes[edge.from].x + nodes[edge.to].x) / 2}
              y={(nodes[edge.from].y + nodes[edge.to].y) / 2 - 5}
              className={styles.edgeWeight}
            >
              {edge.weight}
            </text>
          ))}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="22"
                className={`${styles.node} 
                  ${visited.includes(node.id) ? styles.visited : ""} 
                  ${current === node.id ? styles.current : ""}`}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className={styles.nodeLabel}
              >
                {node.id} (
                {distances[node.id] === Infinity ? "∞" : distances[node.id]})
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

export default Dijkstra
