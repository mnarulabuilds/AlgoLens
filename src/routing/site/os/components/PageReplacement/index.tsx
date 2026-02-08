import React, { useState } from "react"
import "./PageReplacement.css"

const PageReplacement = () => {
  const [pageString, setPageString] = useState("7,0,1,2,0,3,0,4,2,3,0,3,2")
  const [frameCount, setFrameCount] = useState(3)
  const [steps, setSteps] = useState([])
  const [faults, setFaults] = useState(0)

  const simulateFIFO = () => {
    const pages = pageString.split(",").map((p) => p.trim())
    let frames = Array(frameCount).fill(null)
    let results = []
    let pageFaults = 0
    let pointer = 0

    pages.forEach((page) => {
      let hit = frames.includes(page)
      let currentStatus = [...frames]

      if (!hit) {
        frames[pointer] = page
        pointer = (pointer + 1) % frameCount
        pageFaults++
        currentStatus = [...frames]
      }

      results.push({
        page,
        frames: currentStatus,
        isHit: hit,
      })
    })

    setSteps(results)
    setFaults(pageFaults)
  }

  return (
    <div className="os-visualizer container py-4">
      <h2 className="mb-4">Page Replacement: FIFO (First-In, First-Out)</h2>

      <div className="controls card mb-4 p-4 shadow-sm">
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <label className="form-label fw-bold">
              Reference String (Comma separated)
            </label>
            <input
              type="text"
              className="form-control"
              value={pageString}
              onChange={(e) => setPageString(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Number of Frames</label>
            <input
              type="number"
              className="form-control"
              value={frameCount}
              min="1"
              max="7"
              onChange={(e) => setFrameCount(parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="col-md-3 text-end">
            <button className="btn btn-primary w-100" onClick={simulateFIFO}>
              Simulate FIFO
            </button>
          </div>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="results-container">
          <div className="card p-4 shadow-sm mb-4 bg-light d-flex justify-content-between flex-row align-items-center">
            <h5 className="mb-0">Simulation Results</h5>
            <div className="badge bg-danger p-2 fs-6">
              Total Page Faults: {faults}
            </div>
          </div>

          <div className="visual-grid-container mt-4">
            <div className="visual-grid d-flex gap-2">
              {steps.map((step, idx) => (
                <div key={idx} className="step-column">
                  <div
                    className={`page-entry mb-2 ${step.isHit ? "hit" : "miss"}`}
                  >
                    {step.page}
                  </div>
                  <div className="frame-stack">
                    {step.frames.map((f, i) => (
                      <div
                        key={i}
                        className={`frame-slot ${
                          f === step.page && !step.isHit ? "active-fault" : ""
                        }`}
                      >
                        {f ?? "-"}
                      </div>
                    ))}
                  </div>
                  <div className="status-label mt-2">
                    {step.isHit ? "🎁" : "❌"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageReplacement
