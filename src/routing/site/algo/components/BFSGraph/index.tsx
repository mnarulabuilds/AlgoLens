import React, { useState, useEffect } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import styles from "./BFSGraph.module.css"

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
  A: { x: 100, y: 150 },
  B: { x: 220, y: 80 },
  C: { x: 220, y: 220 },
  D: { x: 340, y: 40 },
  E: { x: 340, y: 120 },
  F: { x: 340, y: 200 },
  G: { x: 340, y: 280 },
  H: { x: 460, y: 40 },
  I: { x: 460, y: 120 },
  J: { x: 460, y: 200 },
}

const BFSGraph = () => {
  const [visited, setVisited] = useState([])
  const [showPseudocode, setShowPseudocode] = useState(false)

  const pseudocode = [
    { text: "// Breadth-First Search (BFS) Algorithm", indent: 0 },
    { text: "function BFS(graph, startNode):", indent: 0 },
    { text: "// Initialize queue with start node", indent: 1 },
    { text: "queue = [startNode]", indent: 1 },
    { text: "visited = new Set()", indent: 1 },
    { text: "result = []", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Process nodes level by level", indent: 1 },
    { text: "while queue is not empty:", indent: 1 },
    { text: "// Dequeue front node", indent: 2 },
    { text: "currentNode = queue.removeFirst()", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Skip if already visited", indent: 2 },
    { text: "if currentNode in visited:", indent: 2 },
    { text: "continue", indent: 3 },
    { text: "", indent: 0 },
    { text: "// Mark as visited", indent: 2 },
    { text: "visited.add(currentNode)", indent: 2 },
    { text: "result.append(currentNode)", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Add all unvisited neighbors to queue", indent: 2 },
    { text: "for each neighbor in graph[currentNode]:", indent: 2 },
    { text: "if neighbor not in visited:", indent: 3 },
    { text: "queue.append(neighbor)", indent: 4 },
    { text: "", indent: 0 },
    { text: "return result", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Key Points:", indent: 0 },
    { text: "// - Uses Queue (FIFO) data structure", indent: 0 },
    { text: "// - Explores nodes level by level", indent: 0 },
    { text: "// - Time Complexity: O(V + E)", indent: 0 },
    { text: "// - Space Complexity: O(V)", indent: 0 },
    { text: "// - Guarantees shortest path in unweighted graphs", indent: 0 },
  ]

  useEffect(() => {
    runBFS("A") // start BFS at node A
  }, [])

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const runBFS = async (start) => {
    const q = [start]
    const seen = new Set()

    while (q.length) {
      const node = q.shift()
      if (seen.has(node)) continue
      seen.add(node)

      setVisited((v) => [...v, node])
      await sleep(700) // animation delay

      graph[node].forEach((nbr) => {
        if (!seen.has(nbr)) q.push(nbr)
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Breadth First Search (Graph) 🌐</h2>
        <button
          className={styles.pseudocodeBtn}
          onClick={() => setShowPseudocode(true)}
          title="View Pseudocode"
        >
          <FaCode /> Pseudocode
        </button>
      </div>
      <svg className={styles.svg}>
        {/* Render edges */}
        {Object.entries(graph).map(([node, neighbors]) =>
          neighbors.map((nbr) => {
            const { x: x1, y: y1 } = positions[node]
            const { x: x2, y: y2 } = positions[nbr]
            return (
              <line
                key={`${node}-${nbr}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#999"
                strokeWidth="2"
              />
            )
          })
        )}

        {/* Render nodes */}
        {Object.entries(positions).map(([node, { x, y }]) => (
          <g key={node}>
            <circle
              cx={x}
              cy={y}
              r="25"
              className={`${styles.node} ${
                visited.includes(node) ? styles.visited : ""
              }`}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dy=".3em"
              className={styles.label}
            >
              {node}
            </text>
          </g>
        ))}
      </svg>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "Breadth-First Search - Pseudocode",
          contentJSX: (
            <PseudocodeViewer pseudocode={pseudocode} title="BFS Algorithm" />
          ),
          close: {
            callback: () => setShowPseudocode(false),
          },
        }}
      />
    </div>
  )
}

export default BFSGraph
