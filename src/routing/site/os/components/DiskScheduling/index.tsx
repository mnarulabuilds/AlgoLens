import React, { useState } from "react"
import "./DiskScheduling.css"

const DiskScheduling = () => {
  const [requestString, setRequestString] = useState(
    "98, 183, 37, 122, 14, 124, 65, 67"
  )
  const [initialHead, setInitialHead] = useState(53)
  const [diskSize] = useState(200)
  const [results, setResults] = useState([])
  const [totalMovement, setTotalMovement] = useState(0)

  const simulateFCFS = () => {
    const requests = requestString
      .split(",")
      .map((r) => parseInt(r.trim()))
      .filter((r) => !isNaN(r))
    let currentHead = initialHead
    let sequence = [initialHead]
    let movement = 0

    requests.forEach((req) => {
      movement += Math.abs(req - currentHead)
      currentHead = req
      sequence.push(req)
    })

    setResults(sequence)
    setTotalMovement(movement)
  }

  const simulateSCAN = () => {
    const requests = requestString
      .split(",")
      .map((r) => parseInt(r.trim()))
      .filter((r) => !isNaN(r))
    let sequence = [initialHead]
    let movement = 0
    let currentHead = initialHead

    const left = requests.filter((r) => r < initialHead).sort((a, b) => b - a)
    const right = requests.filter((r) => r >= initialHead).sort((a, b) => a - b)

    // Assume Moving towards 0 first
    left.forEach((req) => {
      movement += Math.abs(req - currentHead)
      currentHead = req
      sequence.push(req)
    })

    // Edge case: reaching 0
    if (left.length > 0 || initialHead > 0) {
      movement += Math.abs(0 - currentHead)
      currentHead = 0
      sequence.push(0)
    }

    right.forEach((req) => {
      movement += Math.abs(req - currentHead)
      currentHead = req
      sequence.push(req)
    })

    setResults(sequence)
    setTotalMovement(movement)
  }

  return (
    <div className="os-visualizer container py-4">
      <h2 className="mb-4">Disk Scheduling Algorithms</h2>

      <div className="controls card mb-4 p-4 shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label fw-bold">Request Queue</label>
            <input
              type="text"
              className="form-control"
              value={requestString}
              onChange={(e) => setRequestString(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-bold">Initial Head</label>
            <input
              type="number"
              className="form-control"
              value={initialHead}
              onChange={(e) => setInitialHead(parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="col-md-5 d-flex gap-2">
            <button
              className="btn btn-primary flex-grow-1"
              onClick={simulateFCFS}
            >
              FCFS
            </button>
            <button
              className="btn btn-success flex-grow-1"
              onClick={simulateSCAN}
            >
              SCAN (to 0)
            </button>
          </div>
        </div>
      </div>

      {results.length > 0 && (
        <div className="simulation-results">
          <div className="card p-3 mb-4 bg-light border-0 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Movement Statistics</h5>
              <span className="badge bg-primary fs-6">
                Total Head Movement: {totalMovement} Cylinders
              </span>
            </div>
          </div>

          <div className="card p-4 shadow-sm">
            <h5>Seek Visualization</h5>
            <div className="seek-chart-container mt-4">
              <svg
                width="100%"
                height="400"
                viewBox={`0 0 ${diskSize} ${results.length * 40}`}
              >
                {/* Grid Lines */}
                {[0, 50, 100, 150, 199].map((val) => (
                  <line
                    key={val}
                    x1={val}
                    y1="0"
                    x2={val}
                    y2={results.length * 40}
                    stroke="#e2e8f0"
                    strokeDasharray="4"
                  />
                ))}

                {/* Seek Path */}
                {results.map(
                  (point, i) =>
                    i < results.length - 1 && (
                      <line
                        key={i}
                        x1={point}
                        y1={i * 40 + 20}
                        x2={results[i + 1]}
                        y2={(i + 1) * 40 + 20}
                        stroke="#162788"
                        strokeWidth="2"
                      />
                    )
                )}

                {/* Points */}
                {results.map((point, i) => (
                  <g key={i}>
                    <circle
                      cx={point}
                      cy={i * 40 + 20}
                      r="4"
                      fill={i === 0 ? "#FF6B6B" : "#162788"}
                    />
                    <text
                      x={point}
                      y={i * 40 + 15}
                      fontSize="10"
                      textAnchor="middle"
                    >
                      {point}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="mt-4">
            <h6>Execution Sequence:</h6>
            <div className="d-flex flex-wrap gap-2">
              {results.map((p, i) => (
                <span key={i} className="badge bg-secondary">
                  {i === 0 ? "Start" : ""} {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiskScheduling
