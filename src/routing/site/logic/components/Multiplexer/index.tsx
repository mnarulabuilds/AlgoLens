import React, { useState } from "react"
import "./Multiplexer.css"

const Multiplexer = () => {
  const [in0, setIn0] = useState(false)
  const [in1, setIn1] = useState(false)
  const [select, setSelect] = useState(false)

  const output = select ? in1 : in0

  return (
    <div className="mux-container container py-4">
      <div className="text-center mb-5">
        <h1>2-to-1 Multiplexer (MUX) 🔀</h1>
        <p className="lead text-muted">
          A &quot;data selector&quot; that picks one of many inputs and forwards
          it to a single output based on a selection signal.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-lg-5">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Inputs</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded text-primary">
                  <span className="fw-bold">Input 0 (D0)</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={in0}
                      onChange={() => setIn0(!in0)}
                    />
                    <span className="badge bg-dark ms-2">
                      {in0 ? "1" : "0"}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded text-success">
                  <span className="fw-bold">Input 1 (D1)</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={in1}
                      onChange={() => setIn1(!in1)}
                    />
                    <span className="badge bg-dark ms-2">
                      {in1 ? "1" : "0"}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-dark text-white rounded mt-2">
                  <span className="fw-bold">Select (S)</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={select}
                      onChange={() => setSelect(!select)}
                    />
                    <span className="badge bg-light text-dark ms-2">
                      {select ? "1" : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-info bg-light">
            <div className="card-body">
              <h6>Logic Formula:</h6>
              <div className="p-3 bg-white border rounded font-monospace text-center">
                Out = (D0 ⋅ S&apos;) + (D1 ⋅ S)
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="mux-visualizer shadow-lg p-5 bg-white rounded border d-flex justify-content-center align-items-center">
            <div className="mux-graphics">
              <div className="input-ports">
                <div className={`port p0 ${!select ? "active" : ""}`}>
                  D0: {in0 ? "1" : "0"}
                </div>
                <div className={`port p1 ${select ? "active" : ""}`}>
                  D1: {in1 ? "1" : "0"}
                </div>
              </div>

              <div className="mux-body">
                <div className="mux-trapezoid">MUX</div>
                <div className={`select-line ${select ? "high" : "low"}`}>
                  S: {select ? "1" : "0"}
                </div>
              </div>

              <div className={`output-port ${output ? "high" : "low"}`}>
                OUT: {output ? "1" : "0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Multiplexer
