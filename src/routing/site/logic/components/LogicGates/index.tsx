import React, { useState } from "react"
import "./LogicGates.css"

const gates = [
  {
    type: "AND",
    description: "Output is 1 only if BOTH inputs are 1.",
    symbol: "&",
    logic: (a, b) => a && b,
  },
  {
    type: "OR",
    description: "Output is 1 if AT LEAST ONE input is 1.",
    symbol: "≥1",
    logic: (a, b) => a || b,
  },
  {
    type: "XOR",
    description: "Output is 1 if ONLY ONE input is 1.",
    symbol: "=1",
    logic: (a, b) => a !== b,
  },
  {
    type: "NAND",
    description: "NOT AND: Output is 0 only if BOTH inputs are 1.",
    symbol: "~&",
    logic: (a, b) => !(a && b),
  },
  {
    type: "NOR",
    description: "NOT OR: Output is 1 only if BOTH inputs are 0.",
    symbol: "~≥1",
    logic: (a, b) => !(a || b),
  },
]

const LogicGates = () => {
  const [inputs, setInputs] = useState({ A: false, B: false })
  const [selectedGate, setSelectedGate] = useState(gates[0])

  const toggleInput = (key) => {
    setInputs((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const output = selectedGate.logic(inputs.A, inputs.B)

  return (
    <div className="logic-gates-container container py-4">
      <div className="text-center mb-5">
        <h1>Basic Logic Gates ⚡</h1>
        <p className="lead text-muted">
          The building blocks of digital electronics. Toggle inputs to see the
          output.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Select Gate</div>
            <div className="card-body">
              <div className="list-group">
                {gates.map((gate) => (
                  <button
                    key={gate.type}
                    className={`list-group-item list-group-item-action ${
                      selectedGate.type === gate.type ? "active" : ""
                    }`}
                    onClick={() => setSelectedGate(gate)}
                  >
                    <strong>{gate.type}</strong> - {gate.description}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-info bg-light">
            <div className="card-body">
              <h6>Truth Table: {selectedGate.type}</h6>
              <table className="table table-sm table-bordered mt-2 text-center bg-white">
                <thead className="table-dark">
                  <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>Out</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [0, 0],
                    [0, 1],
                    [1, 0],
                    [1, 1],
                  ].map(([a, b]) => {
                    const res = selectedGate.logic(!!a, !!b) ? 1 : 0
                    const isActiveRow =
                      (inputs.A ? 1 : 0) === a && (inputs.B ? 1 : 0) === b
                    return (
                      <tr
                        key={`${a}-${b}`}
                        className={isActiveRow ? "table-warning fw-bold" : ""}
                      >
                        <td>{a}</td>
                        <td>{b}</td>
                        <td>{res}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="logic-visualizer shadow-lg p-5 bg-white rounded border d-flex flex-column align-items-center">
            <div className="gate-display d-flex align-items-center gap-5">
              {/* Inputs */}
              <div className="inputs-column d-flex flex-column gap-5">
                <div className="input-node text-center">
                  <div
                    className={`node-toggle ${inputs.A ? "active" : ""}`}
                    onClick={() => toggleInput("A")}
                  >
                    {inputs.A ? "1" : "0"}
                  </div>
                  <span className="fw-bold d-block mt-2">Input A</span>
                </div>
                <div className="input-node text-center">
                  <div
                    className={`node-toggle ${inputs.B ? "active" : ""}`}
                    onClick={() => toggleInput("B")}
                  >
                    {inputs.B ? "1" : "0"}
                  </div>
                  <span className="fw-bold d-block mt-2">Input B</span>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="connector-lines">
                <div
                  className={`line line-a ${inputs.A ? "glowing" : ""}`}
                ></div>
                <div
                  className={`line line-b ${inputs.B ? "glowing" : ""}`}
                ></div>
              </div>

              {/* Gate Symbol */}
              <div className="gate-symbol-wrapper">
                <div className="gate-body">
                  <span className="symbol">{selectedGate.symbol}</span>
                  <span className="gate-label">{selectedGate.type}</span>
                </div>
              </div>

              {/* Output Line */}
              <div className="connector-lines">
                <div
                  className={`line line-out ${output ? "glowing" : ""}`}
                ></div>
              </div>

              {/* Output Node */}
              <div className="output-node text-center">
                <div
                  className={`node-display ${output ? "active glowing" : ""}`}
                >
                  {output ? "1" : "0"}
                </div>
                <span className="fw-bold d-block mt-2">Output</span>
              </div>
            </div>

            <div className="mt-5 p-3 bg-light rounded text-center w-100 border-start border-primary border-4">
              <h5>Logic Formula</h5>
              <code className="fs-4">
                {selectedGate.type} (A, B) = {output ? "1" : "0"}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogicGates
