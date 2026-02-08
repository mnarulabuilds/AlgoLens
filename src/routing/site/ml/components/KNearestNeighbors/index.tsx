import React, { useState } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import "./KNearestNeighbors.css"

const KNearestNeighbors = () => {
  const [points, setPoints] = useState([])
  const [testPoint, setTestPoint] = useState(null)
  const [k, setK] = useState(3)
  const [currentClass, setCurrentClass] = useState(0)
  const [showVoronoi, setShowVoronoi] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [neighbors, setNeighbors] = useState([])
  const [showPseudocode, setShowPseudocode] = useState(false)

  const canvasWidth = 600
  const canvasHeight = 400

  const pseudocode = [
    { text: "// K-Nearest Neighbors Classification Algorithm", indent: 0 },
    { text: "function knnClassify(trainingData, testPoint, K):", indent: 0 },
    { text: "// trainingData: array of labeled points", indent: 1 },
    { text: "// testPoint: point to classify", indent: 1 },
    { text: "// K: number of neighbors to consider", indent: 1 },
    { text: "", indent: 0 },
    {
      text: "// Step 1: Calculate distances to all training points",
      indent: 1,
    },
    { text: "distances = []", indent: 1 },
    { text: "", indent: 0 },
    { text: "for each point in trainingData:", indent: 1 },
    { text: "dist = euclideanDistance(testPoint, point)", indent: 2 },
    { text: "distances.push({", indent: 2 },
    { text: "point: point,", indent: 3 },
    { text: "distance: dist,", indent: 3 },
    { text: "class: point.class", indent: 3 },
    { text: "})", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Step 2: Sort by distance (ascending)", indent: 1 },
    { text: "sortedDistances = sort(distances, by: distance)", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Step 3: Select K nearest neighbors", indent: 1 },
    { text: "kNearest = sortedDistances[0:K]", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Step 4: Count votes for each class", indent: 1 },
    { text: "votes = {}  // Dictionary to count class votes", indent: 1 },
    { text: "", indent: 0 },
    { text: "for each neighbor in kNearest:", indent: 1 },
    { text: "classLabel = neighbor.class", indent: 2 },
    { text: "if classLabel not in votes:", indent: 2 },
    { text: "votes[classLabel] = 0", indent: 3 },
    { text: "votes[classLabel]++", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Step 5: Find class with maximum votes", indent: 1 },
    { text: "maxVotes = 0", indent: 1 },
    { text: "predictedClass = null", indent: 1 },
    { text: "", indent: 0 },
    { text: "for each (class, count) in votes:", indent: 1 },
    { text: "if count > maxVotes:", indent: 2 },
    { text: "maxVotes = count", indent: 3 },
    { text: "predictedClass = class", indent: 3 },
    { text: "", indent: 0 },
    { text: "return predictedClass", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Helper: Calculate Euclidean Distance", indent: 0 },
    { text: "function euclideanDistance(p1, p2):", indent: 0 },
    { text: "return sqrt((p1.x - p2.x)² + (p1.y - p2.y)²)", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Note: For multi-dimensional data,", indent: 0 },
    { text: "// sum over all dimensions: sqrt(Σ(p1[i] - p2[i])²)", indent: 0 },
  ]

  const classes = [
    { id: 0, name: "Class A", color: "#FF6B6B" },
    { id: 1, name: "Class B", color: "#4ECDC4" },
    { id: 2, name: "Class C", color: "#FFD93D" },
  ]

  const handleCanvasClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (e.shiftKey) {
      // Shift + Click to add test point
      setTestPoint({ x, y })
      classifyPoint({ x, y })
    } else {
      // Regular click to add training point
      setPoints([...points, { x, y, class: currentClass }])
      if (testPoint) {
        classifyPoint(testPoint)
      }
    }
  }

  const distance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }

  const classifyPoint = (point) => {
    if (points.length === 0) {
      setPrediction(null)
      setNeighbors([])
      return
    }

    // Calculate distances to all points
    const distances = points.map((p, index) => ({
      ...p,
      distance: distance(point, p),
      index,
    }))

    // Sort by distance and take k nearest
    distances.sort((a, b) => a.distance - b.distance)
    const kNearest = distances.slice(0, Math.min(k, points.length))

    // Count votes for each class
    const votes = {}
    kNearest.forEach((neighbor) => {
      votes[neighbor.class] = (votes[neighbor.class] || 0) + 1
    })

    // Find class with most votes
    let maxVotes = 0
    let predictedClass = 0
    Object.entries(votes).forEach(([cls, count]) => {
      if (count > maxVotes) {
        maxVotes = count
        predictedClass = parseInt(cls)
      }
    })

    setPrediction(predictedClass)
    setNeighbors(kNearest)
  }

  const generateRandomData = () => {
    const newPoints = []

    // Generate clusters for each class
    classes.forEach((cls, classIndex) => {
      const numClusters = 2
      for (let c = 0; c < numClusters; c++) {
        const centerX = Math.random() * (canvasWidth - 100) + 50
        const centerY = Math.random() * (canvasHeight - 100) + 50

        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * 2 * Math.PI
          const radius = Math.random() * 40 + 10
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          if (
            x >= 10 &&
            x <= canvasWidth - 10 &&
            y >= 10 &&
            y <= canvasHeight - 10
          ) {
            newPoints.push({ x, y, class: classIndex })
          }
        }
      }
    })

    setPoints(newPoints)
    setTestPoint(null)
    setPrediction(null)
    setNeighbors([])
  }

  const clearCanvas = () => {
    setPoints([])
    setTestPoint(null)
    setPrediction(null)
    setNeighbors([])
  }

  const generateVoronoiGrid = () => {
    const grid = []
    const gridSize = 20

    for (let x = 0; x < canvasWidth; x += gridSize) {
      for (let y = 0; y < canvasHeight; y += gridSize) {
        const point = { x: x + gridSize / 2, y: y + gridSize / 2 }

        if (points.length > 0) {
          // Find k nearest neighbors
          const distances = points.map((p) => ({
            ...p,
            distance: distance(point, p),
          }))
          distances.sort((a, b) => a.distance - b.distance)
          const kNearest = distances.slice(0, Math.min(k, points.length))

          // Count votes
          const votes = {}
          kNearest.forEach((neighbor) => {
            votes[neighbor.class] = (votes[neighbor.class] || 0) + 1
          })

          // Find predicted class
          let maxVotes = 0
          let predictedClass = 0
          Object.entries(votes).forEach(([cls, count]) => {
            if (count > maxVotes) {
              maxVotes = count
              predictedClass = parseInt(cls)
            }
          })

          grid.push({ x, y, class: predictedClass, size: gridSize })
        }
      }
    }

    return grid
  }

  return (
    <div className="knn-container">
      <div className="knn-header">
        <h1>K-Nearest Neighbors (KNN) Visualization 🎯</h1>
        <p>
          Click to add training points. Shift+Click to classify a test point!
        </p>
        <button
          className="pseudocode-button"
          onClick={() => setShowPseudocode(true)}
          title="View Pseudocode"
        >
          <FaCode /> View Pseudocode
        </button>
      </div>

      <div className="knn-content">
        <div className="knn-canvas-wrapper">
          <svg
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="knn-canvas"
          >
            <rect
              width={canvasWidth}
              height={canvasHeight}
              fill="#1a1a2e"
              stroke="#4ecca3"
              strokeWidth="2"
            />

            {/* Voronoi diagram */}
            {showVoronoi &&
              generateVoronoiGrid().map((cell, index) => (
                <rect
                  key={index}
                  x={cell.x}
                  y={cell.y}
                  width={cell.size}
                  height={cell.size}
                  fill={classes[cell.class].color}
                  opacity="0.15"
                />
              ))}

            {/* Connection lines to neighbors */}
            {testPoint &&
              neighbors.map((neighbor, index) => (
                <line
                  key={index}
                  x1={testPoint.x}
                  y1={testPoint.y}
                  x2={neighbor.x}
                  y2={neighbor.y}
                  stroke={classes[neighbor.class].color}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.6"
                />
              ))}

            {/* Training points */}
            {points.map((point, index) => {
              const isNeighbor = neighbors.some((n) => n.index === index)
              return (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r={isNeighbor ? 8 : 6}
                  fill={classes[point.class].color}
                  stroke={isNeighbor ? "#fff" : classes[point.class].color}
                  strokeWidth={isNeighbor ? 3 : 1}
                  opacity={isNeighbor ? 1 : 0.8}
                />
              )
            })}

            {/* Test point */}
            {testPoint && (
              <g>
                <circle
                  cx={testPoint.x}
                  cy={testPoint.y}
                  r="12"
                  fill={
                    prediction !== null ? classes[prediction].color : "#4ecca3"
                  }
                  stroke="#fff"
                  strokeWidth="3"
                />
                <text
                  x={testPoint.x}
                  y={testPoint.y + 5}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="14"
                  fontWeight="bold"
                >
                  ?
                </text>
              </g>
            )}

            {/* Instructions overlay */}
            {points.length === 0 && (
              <text
                x={canvasWidth / 2}
                y={canvasHeight / 2}
                textAnchor="middle"
                fill="#4ecca3"
                fontSize="16"
                opacity="0.5"
              >
                Click to add training points
              </text>
            )}
          </svg>
        </div>

        <div className="knn-controls">
          <div className="control-group">
            <h3>Actions</h3>
            <button onClick={generateRandomData}>Generate Random Data</button>
            <button onClick={clearCanvas}>Clear Canvas</button>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showVoronoi}
                onChange={(e) => setShowVoronoi(e.target.checked)}
              />
              Show Decision Boundaries
            </label>
          </div>

          <div className="control-group">
            <h3>Current Class</h3>
            <div className="class-selector">
              {classes.map((cls) => (
                <button
                  key={cls.id}
                  className={`class-button ${
                    currentClass === cls.id ? "active" : ""
                  }`}
                  style={{
                    background:
                      currentClass === cls.id ? cls.color : "transparent",
                    borderColor: cls.color,
                  }}
                  onClick={() => setCurrentClass(cls.id)}
                >
                  {cls.name}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <h3>Parameters</h3>
            <label>
              K (Neighbors): {k}
              <input
                type="range"
                min="1"
                max="15"
                value={k}
                onChange={(e) => {
                  setK(parseInt(e.target.value))
                  if (testPoint) {
                    classifyPoint(testPoint)
                  }
                }}
              />
            </label>
            <div className="info-text">
              {k === 1 && "K=1: Sensitive to noise"}
              {k > 1 && k <= 5 && "Good for most cases"}
              {k > 5 && k <= 10 && "Smoother boundaries"}
              {k > 10 && "May oversmooth"}
            </div>
          </div>

          <div className="control-group">
            <h3>Statistics</h3>
            <div className="info-item">
              <span>Training Points:</span>
              <span>{points.length}</span>
            </div>
            <div className="info-item">
              <span>K Value:</span>
              <span>{k}</span>
            </div>
            {classes.map((cls) => (
              <div key={cls.id} className="info-item">
                <span>{cls.name}:</span>
                <span style={{ color: cls.color }}>
                  {points.filter((p) => p.class === cls.id).length}
                </span>
              </div>
            ))}
          </div>

          {testPoint && prediction !== null && (
            <div className="control-group prediction-result">
              <h3>Prediction</h3>
              <div
                className="prediction-box"
                style={{
                  background: classes[prediction].color,
                  color: "#fff",
                }}
              >
                <strong>{classes[prediction].name}</strong>
              </div>
              <div className="neighbor-votes">
                <h4>Neighbor Votes:</h4>
                {classes.map((cls) => {
                  const votes = neighbors.filter((n) => n.class === cls.id)
                    .length
                  return votes > 0 ? (
                    <div key={cls.id} className="vote-item">
                      <span>{cls.name}:</span>
                      <span style={{ color: cls.color }}>{votes}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}

          <div className="control-group">
            <h3>Instructions</h3>
            <ul className="instructions">
              <li>
                <strong>Click:</strong> Add training point of current class
              </li>
              <li>
                <strong>Shift+Click:</strong> Add test point to classify
              </li>
              <li>Connected points are the K nearest neighbors</li>
              <li>Decision boundaries show classification regions</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="knn-info">
        <h3>About K-Nearest Neighbors</h3>
        <p>
          KNN is a simple, yet powerful classification algorithm. It classifies
          a data point based on the majority vote of its K nearest neighbors in
          the feature space.
        </p>
        <h4>How It Works:</h4>
        <ol>
          <li>Calculate distance from test point to all training points</li>
          <li>Select the K nearest training points</li>
          <li>Count the class votes among these K neighbors</li>
          <li>Assign the class with the most votes to the test point</li>
        </ol>
        <h4>Key Characteristics:</h4>
        <ul>
          <li>
            <strong>Non-parametric:</strong> Makes no assumptions about data
            distribution
          </li>
          <li>
            <strong>Lazy learning:</strong> No training phase, all computation
            at prediction time
          </li>
          <li>
            <strong>K selection:</strong> Lower K = more sensitive to noise,
            Higher K = smoother decision boundaries
          </li>
          <li>
            <strong>Distance metric:</strong> Typically uses Euclidean distance
          </li>
        </ul>
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "K-Nearest Neighbors - Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={pseudocode}
              title="K-Nearest Neighbors Algorithm"
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

export default KNearestNeighbors
