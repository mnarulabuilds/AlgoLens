import React, { useState } from "react"
import "./BankersAlgorithm.css"

const BankersAlgorithm = () => {
  const [allocation] = useState([
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2],
  ])

  const [max] = useState([
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3],
  ])

  const [available] = useState([3, 3, 2])
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])

  const calculateSafeSequence = () => {
    const n = allocation.length
    const m = available.length
    const need = allocation.map((row, i) =>
      row.map((val, j) => max[i][j] - val)
    )

    let work = [...available]
    let finish = new Array(n).fill(false)
    let safeSequence = []
    let currentSteps = []

    for (let k = 0; k < n; k++) {
      let found = false
      for (let i = 0; i < n; i++) {
        if (!finish[i]) {
          let canAllocate = true
          for (let j = 0; j < m; j++) {
            if (need[i][j] > work[j]) {
              canAllocate = false
              break
            }
          }

          if (canAllocate) {
            currentSteps.push(
              `Process P${i} requirements (${need[i]}) <= Available (${work}). Granting resources.`
            )
            for (let j = 0; j < m; j++) {
              work[j] += allocation[i][j]
            }
            safeSequence.push(`P${i}`)
            finish[i] = true
            found = true
            currentSteps.push(`P${i} finished. New Available: (${work})`)
          }
        }
      }
      if (!found) break
    }

    if (safeSequence.length === n) {
      setResult({ status: "safe", sequence: safeSequence.join(" -> ") })
    } else {
      setResult({
        status: "unsafe",
        sequence:
          "No safe sequence found! System is in a potential deadlock state.",
      })
    }
    setSteps(currentSteps)
  }

  return (
    <div className="os-visualizer container py-4">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold text-primary">
          Banker&apos;s Algorithm
        </h2>
        <p className="text-muted">
          A deadlock avoidance algorithm that simulates resource allocation to
          ensure system safety.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Resource Allocation Matrices</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0 align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th rowSpan="2">Process</th>
                      <th colSpan="3">Allocation</th>
                      <th colSpan="3">Max Need</th>
                      <th colSpan="3">Current Need</th>
                    </tr>
                    <tr className="small text-uppercase">
                      <th>A</th>
                      <th>B</th>
                      <th>C</th>
                      <th>A</th>
                      <th>B</th>
                      <th>C</th>
                      <th>A</th>
                      <th>B</th>
                      <th>C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allocation.map((row, i) => (
                      <tr key={i}>
                        <td className="fw-bold">P{i}</td>
                        {row.map((val, j) => (
                          <td key={`alloc-${j}`}>{val}</td>
                        ))}
                        {max[i].map((val, j) => (
                          <td key={`max-${j}`}>{val}</td>
                        ))}
                        {row.map((val, j) => (
                          <td
                            key={`need-${j}`}
                            className="text-primary bg-light fw-bold"
                          >
                            {max[i][j] - val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">System Resources</h5>
            <div className="p-3 bg-light rounded-3 mb-4">
              <div className="small text-muted text-uppercase mb-2">
                Currently Available
              </div>
              <div className="d-flex justify-content-around">
                <div className="text-center">
                  <div className="fs-3 fw-bold text-primary">
                    {available[0]}
                  </div>
                  <div className="small fw-bold">Type A</div>
                </div>
                <div className="text-center">
                  <div className="fs-3 fw-bold text-primary">
                    {available[1]}
                  </div>
                  <div className="small fw-bold">Type B</div>
                </div>
                <div className="text-center">
                  <div className="fs-3 fw-bold text-primary">
                    {available[2]}
                  </div>
                  <div className="small fw-bold">Type C</div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              onClick={calculateSafeSequence}
            >
              Run Safety Algorithm
            </button>
          </div>

          {result && (
            <div
              className={`card border-0 shadow-sm p-4 animate-fade-in ${
                result.status === "safe"
                  ? "border-start border-4 border-success"
                  : "border-start border-4 border-danger"
              }`}
            >
              <h6
                className={`fw-bold mb-2 ${
                  result.status === "safe" ? "text-success" : "text-danger"
                }`}
              >
                {result.status === "safe" ? "✅ Safe State" : "❌ Unsafe State"}
              </h6>
              <div className="p-3 bg-white border rounded small">
                <strong>Sequence:</strong> {result.sequence}
              </div>

              <div className="mt-3">
                <h6 className="small fw-bold text-muted text-uppercase">
                  Execution Logs
                </h6>
                <div className="log-box small scrollbar-thin">
                  {steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="mb-1 py-1 border-bottom border-light"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BankersAlgorithm
