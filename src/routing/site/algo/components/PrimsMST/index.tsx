import React, { useEffect, useState } from "react"
import styles from "./PrimsMST.module.css"

const PrimsMST = () => {
  const nodes = [
    { id: "A", x: 150, y: 100 },
    { id: "B", x: 350, y: 100 },
    { id: "C", x: 550, y: 100 },
    { id: "D", x: 150, y: 250 },
    { id: "E", x: 350, y: 250 },
    { id: "F", x: 550, y: 250 },
    { id: "G", x: 250, y: 400 },
    { id: "H", x: 450, y: 400 },
  ]

  // Edges with weights (undirected graph)
  const edges = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 6 },
    { from: "B", to: "E", weight: 3 },
    { from: "C", to: "F", weight: 1 },
    { from: "D", to: "E", weight: 7 },
    { from: "D", to: "G", weight: 5 },
    { from: "E", to: "F", weight: 8 },
    { from: "E", to: "G", weight: 2 },
    { from: "E", to: "H", weight: 4 },
    { from: "F", to: "H", weight: 3 },
    { from: "G", to: "H", weight: 9 },
  ]

  const [visitedNodes, setVisitedNodes] = useState([])
  const [mstEdges, setMstEdges] = useState([])
  const [currentNode, setCurrentNode] = useState(null)
  const [consideringEdge, setConsideringEdge] = useState(null)
  const [step, setStep] = useState(0)
  const [totalWeight, setTotalWeight] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    runPrims()
  }, [])

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const runPrims = async () => {
    setIsRunning(true)
    const visited = new Set()
    const mst = []
    let weight = 0

    // Start from node A
    const startNode = "A"
    visited.add(startNode)
    setVisitedNodes([startNode])
    setCurrentNode(startNode)
    await sleep(1200)

    while (visited.size < nodes.length) {
      setStep((s) => s + 1)

      // Find minimum weight edge connecting visited to unvisited
      let minEdge = null
      let minWeight = Infinity

      // Check all edges
      for (const edge of edges) {
        const { from, to, weight: edgeWeight } = edge

        // Check if edge connects visited to unvisited
        const fromVisited = visited.has(from)
        const toVisited = visited.has(to)

        if (fromVisited && !toVisited) {
          // Edge goes from visited to unvisited
          setConsideringEdge({ from, to })
          await sleep(300)

          if (edgeWeight < minWeight) {
            minWeight = edgeWeight
            minEdge = { from, to, weight: edgeWeight }
          }
        } else if (toVisited && !fromVisited) {
          // Edge goes from unvisited to visited (reverse)
          setConsideringEdge({ from: to, to: from })
          await sleep(300)

          if (edgeWeight < minWeight) {
            minWeight = edgeWeight
            minEdge = { from: to, to: from, weight: edgeWeight }
          }
        }
      }

      setConsideringEdge(null)

      if (!minEdge) break // No more edges (shouldn't happen in connected graph)

      // Add edge to MST
      mst.push(minEdge)
      visited.add(minEdge.to)
      weight += minEdge.weight

      setMstEdges([...mst])
      setVisitedNodes([...visited])
      setCurrentNode(minEdge.to)
      setTotalWeight(weight)

      await sleep(1200)
    }

    setCurrentNode(null)
    setIsComplete(true)
    setIsRunning(false)
  }

  const resetVisualization = () => {
    if (isRunning) return
    setVisitedNodes([])
    setMstEdges([])
    setCurrentNode(null)
    setConsideringEdge(null)
    setStep(0)
    setTotalWeight(0)
    setIsComplete(false)
    runPrims()
  }

  const getNodePosition = (nodeId) => {
    const node = nodes.find((n) => n.id === nodeId)
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 }
  }

  const isEdgeInMST = (from, to) => {
    return mstEdges.some(
      (edge) =>
        (edge.from === from && edge.to === to) ||
        (edge.from === to && edge.to === from)
    )
  }

  const isEdgeConsidering = (from, to) => {
    if (!consideringEdge) return false
    return (
      (consideringEdge.from === from && consideringEdge.to === to) ||
      (consideringEdge.from === to && consideringEdge.to === from)
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Prim&apos;s Minimum Spanning Tree 🌳</h1>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendVisited}`} />
          <span>Visited Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendCurrent}`} />
          <span>Current Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendMstEdge}`} />
          <span>MST Edge</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendConsidering}`} />
          <span>Considering</span>
        </div>
      </div>

      {/* Info Panel */}
      <div className={styles.infoPanel}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Step:</span>
          <span className={styles.infoValue}>{step}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>MST Edges:</span>
          <span className={styles.infoValue}>{mstEdges.length}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Total Weight:</span>
          <span className={styles.infoValue}>{totalWeight}</span>
        </div>
        {isComplete && (
          <div className={styles.completeMessage}>
            ✓ MST Complete! Minimum weight: {totalWeight}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          onClick={resetVisualization}
          disabled={isRunning}
          className={styles.btnPrimary}
        >
          {isRunning ? "Running..." : "Restart Animation"}
        </button>
      </div>

      {/* Graph Visualization */}
      <div className={styles.graphContainer}>
        <svg width="700" height="500" className={styles.svg}>
          {/* Render all edges */}
          {edges.map((edge, idx) => {
            const fromPos = getNodePosition(edge.from)
            const toPos = getNodePosition(edge.to)
            const inMST = isEdgeInMST(edge.from, edge.to)
            const considering = isEdgeConsidering(edge.from, edge.to)

            return (
              <g key={`edge-${idx}`}>
                <line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  className={`${styles.edge} ${
                    inMST
                      ? styles.mstEdge
                      : considering
                      ? styles.consideringEdge
                      : ""
                  }`}
                  strokeWidth={inMST ? "4" : considering ? "3" : "2"}
                />
                {/* Edge weight label */}
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2}
                  className={`${styles.edgeWeight} ${
                    inMST ? styles.mstWeight : ""
                  }`}
                >
                  {edge.weight}
                </text>
              </g>
            )
          })}

          {/* Render nodes */}
          {nodes.map((node) => {
            const isVisited = visitedNodes.includes(node.id)
            const isCurrent = currentNode === node.id

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="28"
                  className={`${styles.node} ${
                    isVisited ? styles.visitedNode : ""
                  } ${isCurrent ? styles.currentNode : ""}`}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy=".35em"
                  className={styles.nodeLabel}
                >
                  {node.id}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Algorithm Explanation */}
      <div className={styles.explanation}>
        <h3>How Prim&apos;s Algorithm Works:</h3>
        <ol>
          <li>Start with any vertex (here we start at node A)</li>
          <li>
            Add the minimum weight edge that connects a visited vertex to an
            unvisited vertex
          </li>
          <li>Mark the newly connected vertex as visited</li>
          <li>Repeat step 2-3 until all vertices are included in the MST</li>
          <li>
            The result is a Minimum Spanning Tree - a tree that connects all
            vertices with minimum total edge weight
          </li>
        </ol>
        <p className={styles.complexity}>
          <strong>Time Complexity:</strong> O(E log V) with binary heap, where E
          = edges, V = vertices
        </p>
      </div>
    </div>
  )
}

export default PrimsMST
