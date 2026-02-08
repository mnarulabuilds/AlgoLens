import React, { useState } from "react"
import "./BinaryAdder.css"

const BinaryAdder = () => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [cin, setCin] = useState(0)

  // Full Adder Logic
  // Sum = A XOR B XOR Cin
  // Cout = (A AND B) OR (Cin AND (A XOR B))

  const aXorB = a ^ b
  const sum = aXorB ^ cin
  const aAndB = a & b
  const cinAndAXorB = cin & aXorB
  const cout = aAndB | cinAndAXorB

  return (
    <div className="binary-adder-container container py-4">
      <div className="text-center mb-5">
        <h1>Full Adder Circuit ➕</h1>
        <p className="lead text-muted">
          A fundamental building block of an Arithmetic Logic Unit (ALU). It
          adds three binary bits (A, B, and Carry-In).
        </p>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Inputs</div>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Input A</span>
                <button
                  className={`btn w-50 ${a ? "btn-danger" : "btn-dark"}`}
                  onClick={() => setA(a ? 0 : 1)}
                >
                  {a}
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Input B</span>
                <button
                  className={`btn w-50 ${b ? "btn-danger" : "btn-dark"}`}
                  onClick={() => setB(b ? 0 : 1)}
                >
                  {b}
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Carry In (Cin)</span>
                <button
                  className={`btn w-50 ${cin ? "btn-danger" : "btn-dark"}`}
                  onClick={() => setCin(cin ? 0 : 1)}
                >
                  {cin}
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-success bg-light">
            <div className="card-body text-center">
              <h5>Result</h5>
              <div className="d-flex justify-content-center gap-3">
                <div className="p-3 bg-white border rounded">
                  <small className="d-block text-muted">Carry Out</small>
                  <span className="display-6 fw-bold text-success">{cout}</span>
                </div>
                <div className="p-3 bg-white border rounded">
                  <small className="d-block text-muted">Sum</small>
                  <span className="display-6 fw-bold text-primary">{sum}</span>
                </div>
              </div>
              <div className="mt-3 fs-5 font-monospace">
                {cin} + {a} + {b} = {(cout << 1) | sum} (Binary)
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="circuit-diagram p-4 bg-white rounded shadow-sm border overflow-auto">
            {/* This is a visual representation of how signals flow */}
            <div className="logic-flow">
              <div className="flow-step">
                <span className="badge bg-secondary mb-2">
                  Stage 1: Intermediate XOR
                </span>
                <div className="flow-box">A ⊕ B = {aXorB}</div>
              </div>
              <div className="flow-step">
                <span className="badge bg-secondary mb-2">
                  Stage 2: Final Sum
                </span>
                <div className="flow-box primary">
                  (A ⊕ B) ⊕ Cin = <span className="text-primary">{sum}</span>
                </div>
              </div>
              <div className="flow-step mt-4">
                <span className="badge bg-secondary mb-2">
                  Stage 3: Carry Generation
                </span>
                <div className="flow-box success">
                  Cout = (A·B) + Cin·(A⊕B) ={" "}
                  <span className="text-success">{cout}</span>
                </div>
              </div>
            </div>

            <div className="formula-card mt-4 p-3 bg-light rounded font-monospace">
              <div>
                Sum = A ⊕ B ⊕ C<sub>in</sub>
              </div>
              <div>
                C<sub>out</sub> = (A ⋅ B) + (C<sub>in</sub> ⋅ (A ⊕ B))
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h3>The Binary Addition</h3>
        <div className="d-flex justify-content-center mt-3">
          <div className="binary-pencil-sum fs-1 font-monospace p-4 border rounded bg-light">
            <div className="text-muted fs-6 text-end pe-2">{cin} (Carry)</div>
            <div className="border-bottom border-dark">
              &nbsp; {a}
              <br />+ {b}
            </div>
            <div>
              {cout}
              {sum}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BinaryAdder
