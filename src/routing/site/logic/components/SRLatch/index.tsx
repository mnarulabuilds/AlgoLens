import React, { useState } from "react"
import "./SRLatch.css"

const SRLatch = () => {
  const [s, setS] = useState(false)
  const [r, setR] = useState(false)
  const [q, setQ] = useState(false)

  const handleToggleS = () => {
    const nextS = !s
    setS(nextS)
    if (nextS && !r) {
      setQ(true)
    } else if (!nextS && r) {
      setQ(false)
    }
  }

  const handleToggleR = () => {
    const nextR = !r
    setR(nextR)
    if (nextR && !s) {
      setQ(false)
    } else if (!nextR && s) {
      setQ(true)
    }
  }

  const qBar = !q

  return (
    <div className="sr-latch-container container py-4">
      <div className="text-center mb-5">
        <h1>SR Latch (Memory) 💾</h1>
        <p className="lead text-muted">
          The basic element of binary memory. It &quot;latches&quot; or
          remembers a single bit using cross-coupled NOR gates.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Inputs</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <span className="fw-bold">S (Set)</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={s}
                      onChange={handleToggleS}
                    />
                    <span className="badge bg-dark ms-2">{s ? "1" : "0"}</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <span className="fw-bold">R (Reset)</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={r}
                      onChange={handleToggleR}
                    />
                    <span className="badge bg-dark ms-2">{r ? "1" : "0"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-info bg-light">
            <div className="card-body">
              <h6>State Table</h6>
              <table className="table table-sm table-bordered mt-2 text-center bg-white">
                <thead className="table-dark">
                  <tr>
                    <th>S</th>
                    <th>R</th>
                    <th>Q (Next)</th>
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={!s && !r ? "table-warning fw-bold" : ""}>
                    <td>0</td>
                    <td>0</td>
                    <td>Q</td>
                    <td>No Change</td>
                  </tr>
                  <tr className={!s && r ? "table-warning fw-bold" : ""}>
                    <td>0</td>
                    <td>1</td>
                    <td>0</td>
                    <td>Reset</td>
                  </tr>
                  <tr className={s && !r ? "table-warning fw-bold" : ""}>
                    <td>1</td>
                    <td>0</td>
                    <td>1</td>
                    <td>Set</td>
                  </tr>
                  <tr className={s && r ? "table-warning fw-bold" : ""}>
                    <td>1</td>
                    <td>1</td>
                    <td>?</td>
                    <td>Invalid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="latch-visualizer shadow-lg p-5 bg-white rounded border d-flex flex-column align-items-center justify-content-center">
            {s && r ? (
              <div className="alert alert-danger w-100 text-center mb-4">
                <strong>Invalid State!</strong> S and R cannot both be 1 in a
                NOR latch.
              </div>
            ) : null}

            <div className="circuit-stage">
              <div className="latch-outputs d-flex gap-5">
                <div className="output-box text-center">
                  <div className={`output-node ${q ? "active glowing" : ""}`}>
                    {q ? "1" : "0"}
                  </div>
                  <span className="fw-bold d-block mt-2">Q</span>
                </div>
                <div className="output-box text-center">
                  <div
                    className={`output-node ${qBar ? "active glowing" : ""}`}
                  >
                    {qBar ? "1" : "0"}
                  </div>
                  <span className="fw-bold d-block mt-2">Q&apos;</span>
                </div>
              </div>

              <div className="mt-5 p-3 bg-light rounded text-center border-start border-primary border-4">
                <h5>How it remembers:</h5>
                <p className="small mb-0">
                  When you set **S=1**, the memory becomes **1**. Even if you
                  turn off **S**, the latch &quot;holds&quot; that value. To
                  clear it, you must pulse **R=1**.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SRLatch
