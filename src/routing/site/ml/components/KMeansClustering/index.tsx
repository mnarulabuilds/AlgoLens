import React, { useState } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import "./KMeansClustering.css"

const KMeansClustering = () => {
  const [points, setPoints] = useState([])
  const [centroids, setCentroids] = useState([])
  const [k, setK] = useState(3)
  const [isRunning, setIsRunning] = useState(false)
  const [iteration, setIteration] = useState(0)
  const [converged, setConverged] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [showPseudocode, setShowPseudocode] = useState(false)

  const canvasWidth = 600
  const canvasHeight = 400

  const pseudocode = [
    { text: "// K-Means Clustering Algorithm", indent: 0 },
    { text: "function kMeans(points, K, maxIterations):", indent: 0 },
    { text: "// Step 1: Initialize centroids randomly", indent: 1 },
    { text: "centroids = selectRandomPoints(points, K)", indent: 1 },
    { text: "iteration = 0", indent: 1 },
    { text: "hasConverged = false", indent: 1 },
    { text: "", indent: 0 },
    {
      text: "while iteration < maxIterations AND not hasConverged:",
      indent: 1,
    },
    {
      text: "// Step 2: Assignment - Assign each point to nearest centroid",
      indent: 2,
    },
    { text: "for each point in points:", indent: 2 },
    { text: "minDistance = infinity", indent: 3 },
    { text: "closestCentroid = 0", indent: 3 },
    { text: "", indent: 0 },
    { text: "for i from 0 to K-1:", indent: 3 },
    { text: "dist = euclideanDistance(point, centroids[i])", indent: 4 },
    { text: "if dist < minDistance:", indent: 4 },
    { text: "minDistance = dist", indent: 5 },
    { text: "closestCentroid = i", indent: 5 },
    { text: "", indent: 0 },
    { text: "point.cluster = closestCentroid", indent: 3 },
    { text: "", indent: 0 },
    { text: "// Step 3: Update - Recalculate centroid positions", indent: 2 },
    { text: "oldCentroids = copy(centroids)", indent: 2 },
    { text: "", indent: 0 },
    { text: "for i from 0 to K-1:", indent: 2 },
    { text: "clusterPoints = points where cluster == i", indent: 3 },
    { text: "", indent: 0 },
    { text: "if clusterPoints is not empty:", indent: 3 },
    { text: "centroids[i].x = mean(clusterPoints.x)", indent: 4 },
    { text: "centroids[i].y = mean(clusterPoints.y)", indent: 4 },
    { text: "", indent: 0 },
    { text: "// Step 4: Check convergence", indent: 2 },
    { text: "hasConverged = true", indent: 2 },
    { text: "for i from 0 to K-1:", indent: 2 },
    {
      text: "if distance(centroids[i], oldCentroids[i]) > threshold:",
      indent: 3,
    },
    { text: "hasConverged = false", indent: 4 },
    { text: "break", indent: 4 },
    { text: "", indent: 0 },
    { text: "iteration++", indent: 2 },
    { text: "", indent: 0 },
    { text: "return centroids, point assignments", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Helper function", indent: 0 },
    { text: "function euclideanDistance(p1, p2):", indent: 0 },
    { text: "return sqrt((p1.x - p2.x)² + (p1.y - p2.y)²)", indent: 1 },
  ]

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
  ]

  const handleCanvasClick = (e) => {
    if (isRunning) return
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPoints([...points, { x, y, cluster: -1 }])
  }

  const generateRandomPoints = () => {
    const newPoints = []
    const numClusters = Math.min(k, 5)

    for (let i = 0; i < numClusters; i++) {
      const centerX = Math.random() * (canvasWidth - 100) + 50
      const centerY = Math.random() * (canvasHeight - 100) + 50

      for (let j = 0; j < 15; j++) {
        const angle = Math.random() * 2 * Math.PI
        const radius = Math.random() * 60 + 10
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        if (
          x >= 10 &&
          x <= canvasWidth - 10 &&
          y >= 10 &&
          y <= canvasHeight - 10
        ) {
          newPoints.push({ x, y, cluster: -1 })
        }
      }
    }

    setPoints(newPoints)
    setCentroids([])
    setIteration(0)
    setConverged(false)
  }

  const initializeCentroids = () => {
    if (points.length < k) return

    const newCentroids = []
    const usedIndices = new Set()

    for (let i = 0; i < k; i++) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * points.length)
      } while (usedIndices.has(randomIndex))

      usedIndices.add(randomIndex)
      newCentroids.push({
        x: points[randomIndex].x,
        y: points[randomIndex].y,
        id: i,
      })
    }

    setCentroids(newCentroids)
    setIteration(0)
    setConverged(false)
  }

  const distance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  const assignClusters = () => {
    const newPoints = points.map((point) => {
      let minDist = Infinity
      let closestCentroid = 0

      centroids.forEach((centroid, index) => {
        const dist = distance(point, centroid)
        if (dist < minDist) {
          minDist = dist
          closestCentroid = index
        }
      })

      return { ...point, cluster: closestCentroid }
    })

    setPoints(newPoints)
    return newPoints
  }

  const updateCentroids = (clusteredPoints) => {
    const newCentroids = centroids.map((centroid, index) => {
      const clusterPoints = clusteredPoints.filter((p) => p.cluster === index)

      if (clusterPoints.length === 0) return centroid

      const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0)
      const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0)

      return {
        x: sumX / clusterPoints.length,
        y: sumY / clusterPoints.length,
        id: index,
      }
    })

    const hasConverged = newCentroids.every(
      (newC, i) =>
        Math.abs(newC.x - centroids[i].x) < 0.5 &&
        Math.abs(newC.y - centroids[i].y) < 0.5
    )

    setCentroids(newCentroids)
    return hasConverged
  }

  const runKMeans = async () => {
    if (centroids.length === 0) {
      initializeCentroids()
      await new Promise((resolve) => setTimeout(resolve, speed))
    }

    setIsRunning(true)
    let currentIteration = 0
    let hasConverged = false

    while (!hasConverged && currentIteration < 50) {
      const clusteredPoints = assignClusters()
      await new Promise((resolve) => setTimeout(resolve, speed))

      hasConverged = updateCentroids(clusteredPoints)
      currentIteration++
      setIteration(currentIteration)

      await new Promise((resolve) => setTimeout(resolve, speed))
    }

    setConverged(true)
    setIsRunning(false)
  }

  const stepKMeans = () => {
    if (centroids.length === 0) {
      initializeCentroids()
      return
    }

    const clusteredPoints = assignClusters()
    const hasConverged = updateCentroids(clusteredPoints)
    setIteration(iteration + 1)
    setConverged(hasConverged)
  }

  const clearCanvas = () => {
    setPoints([])
    setCentroids([])
    setIteration(0)
    setConverged(false)
  }

  return (
    <div className="kmeans-container">
      <div className="kmeans-header">
        <h1>K-Means Clustering Visualization 🎯</h1>
        <p>Click to add points or generate random clusters!</p>
        <button
          className="pseudocode-button"
          onClick={() => setShowPseudocode(true)}
          title="View Pseudocode"
        >
          <FaCode /> View Pseudocode
        </button>
      </div>

      <div className="kmeans-content">
        <div className="kmeans-canvas-wrapper">
          <svg
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="kmeans-canvas"
          >
            <rect
              width={canvasWidth}
              height={canvasHeight}
              fill="#1a1a2e"
              stroke="#4ecca3"
              strokeWidth="2"
            />

            {/* Grid */}
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={(i + 1) * (canvasWidth / 10)}
                  y1="0"
                  x2={(i + 1) * (canvasWidth / 10)}
                  y2={canvasHeight}
                  stroke="#2a2a3e"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={(i + 1) * (canvasHeight / 10)}
                  x2={canvasWidth}
                  y2={(i + 1) * (canvasHeight / 10)}
                  stroke="#2a2a3e"
                  strokeWidth="1"
                />
              </React.Fragment>
            ))}

            {/* Points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill={
                  point.cluster >= 0 && point.cluster < colors.length
                    ? colors[point.cluster]
                    : "#4ecca3"
                }
                stroke="#fff"
                strokeWidth="1"
                opacity="0.8"
              />
            ))}

            {/* Centroids */}
            {centroids.map((centroid, index) => (
              <g key={`centroid-${index}`}>
                <circle
                  cx={centroid.x}
                  cy={centroid.y}
                  r="12"
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth="3"
                />
                <text
                  x={centroid.x}
                  y={centroid.y + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {index + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="kmeans-controls">
          <div className="control-group">
            <h3>Actions</h3>
            <button onClick={generateRandomPoints} disabled={isRunning}>
              Generate Random Clusters
            </button>
            <button
              onClick={initializeCentroids}
              disabled={points.length < k || isRunning}
            >
              Initialize Centroids
            </button>
            <button
              onClick={stepKMeans}
              disabled={points.length < k || isRunning || converged}
            >
              Step Once
            </button>
            <button
              onClick={runKMeans}
              disabled={points.length < k || isRunning || converged}
            >
              {isRunning ? "Running..." : "Run Algorithm"}
            </button>
            <button onClick={clearCanvas} disabled={isRunning}>
              Clear Canvas
            </button>
          </div>

          <div className="control-group">
            <h3>Parameters</h3>
            <label>
              Number of Clusters (K): {k}
              <input
                type="range"
                min="2"
                max="8"
                value={k}
                onChange={(e) => setK(parseInt(e.target.value))}
                disabled={isRunning}
              />
            </label>
            <label>
              Animation Speed: {speed}ms
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                disabled={isRunning}
              />
            </label>
          </div>

          <div className="control-group">
            <h3>Statistics</h3>
            <div className="info-item">
              <span>Points:</span>
              <span>{points.length}</span>
            </div>
            <div className="info-item">
              <span>Clusters (K):</span>
              <span>{k}</span>
            </div>
            <div className="info-item">
              <span>Iteration:</span>
              <span>{iteration}</span>
            </div>
            <div className="info-item">
              <span>Status:</span>
              <span>
                {converged ? "✓ Converged" : isRunning ? "Running..." : "Ready"}
              </span>
            </div>
          </div>

          <div className="control-group">
            <h3>Legend</h3>
            <div className="legend">
              {Array.from({ length: k }).map((_, index) => (
                <div key={index} className="legend-item">
                  <div
                    className="legend-color"
                    style={{ background: colors[index % colors.length] }}
                  />
                  <span>Cluster {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="kmeans-info">
        <h3>About K-Means Clustering</h3>
        <p>
          K-Means is an unsupervised learning algorithm that partitions data
          into K distinct clusters. Each point belongs to the cluster with the
          nearest centroid.
        </p>
        <h4>Algorithm Steps:</h4>
        <ol>
          <li>
            <strong>Initialize:</strong> Randomly select K points as initial
            centroids
          </li>
          <li>
            <strong>Assignment:</strong> Assign each point to the nearest
            centroid
          </li>
          <li>
            <strong>Update:</strong> Recalculate centroids as the mean of
            assigned points
          </li>
          <li>
            <strong>Repeat:</strong> Continue steps 2-3 until convergence
          </li>
        </ol>
        <p>
          <strong>Convergence:</strong> The algorithm stops when centroids no
          longer move significantly between iterations.
        </p>
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "K-Means Clustering - Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={pseudocode}
              title="K-Means Clustering Algorithm"
            />
          ),
          close: {
            callback: () => setShowPseudocode(false),
          },
        }}
      />
    </div>
  )
}

export default KMeansClustering
