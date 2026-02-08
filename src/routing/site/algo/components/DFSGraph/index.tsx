import React, { useState, useEffect } from "react"
import styles from "./DFSGraph.module.css"

const graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F", "G"],
  D: ["B", "H"],
  E: ["B", "I"],
  F: ["C", "J"],
  G: ["C"],
  H: ["D"],
  I: ["E"],
  J: ["F"],
}

const positions = {
  A: { x: 100, y: 200 },
  B: { x: 220, y: 120 },
  C: { x: 220, y: 280 },
  D: { x: 340, y: 60 },
  E: { x: 340, y: 160 },
  F: { x: 340, y: 240 },
  G: { x: 340, y: 320 },
  H: { x: 460, y: 60 },
  I: { x: 460, y: 160 },
  J: { x: 460, y: 240 },
}

export default function DFSGraph() {
  const [visited, setVisited] = useState([])
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return

    let order = []
    const visitedSet = new Set()

    function dfs(node) {
      if (visitedSet.has(node)) return
      visitedSet.add(node)
      order.push(node)
      graph[node].forEach((n) => dfs(n))
    }

    dfs("A") // start DFS from A

    let i = 0
    const interval = setInterval(() => {
      if (i < order.length) {
        setVisited((prev) => [...prev, order[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  const edges = []
  Object.keys(graph).forEach((node) => {
    graph[node].forEach((neighbor) => {
      if (
        Object.keys(positions).includes(neighbor) &&
        node < neighbor // avoid duplicate edges
      ) {
        edges.push([node, neighbor])
      }
    })
  })

  return (
    <div className={styles.container}>
      <h2>Depth First Search 🌲</h2>
      <button
        className={styles.button}
        onClick={() => {
          setVisited([])
          setRunning(true)
        }}
      >
        Start DFS
      </button>
      <div>
        <svg width="600" height="400" className={styles.graph}>
          {/* Draw edges */}
          {edges.map(([from, to], idx) => (
            <line
              key={idx}
              x1={positions[from].x}
              y1={positions[from].y}
              x2={positions[to].x}
              y2={positions[to].y}
              stroke="#999"
              strokeWidth="2"
            />
          ))}

          {/* Draw nodes */}
          {Object.keys(positions).map((node) => (
            <g key={node}>
              <circle
                cx={positions[node].x}
                cy={positions[node].y}
                r="20"
                className={
                  visited.includes(node)
                    ? styles.visitedNode
                    : styles.unvisitedNode
                }
              />
              <text
                x={positions[node].x}
                y={positions[node].y + 5}
                textAnchor="middle"
                fontSize="14"
                fill="white"
              >
                {node}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
