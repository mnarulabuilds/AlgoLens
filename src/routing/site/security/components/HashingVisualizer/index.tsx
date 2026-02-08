import React, { useState, useEffect } from "react"
import "./HashingVisualizer.css"

const HashingVisualizer = () => {
  const [input, setInput] = useState("AlgoLens")
  const [hash, setHash] = useState("")
  const [bits, setBits] = useState([])

  const computeHash = async (text) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    return { hex: hashHex, array: hashArray }
  }

  useEffect(() => {
    const updateHash = async () => {
      const result = await computeHash(input)
      setHash(result.hex)

      // Convert to bits for visual avalanche effect
      const binary = result.array
        .map((b) => b.toString(2).padStart(8, "0"))
        .join("")
      setBits(binary.split(""))
    }
    updateHash()
  }, [input])

  return (
    <div className="hashing-container container py-4">
      <div className="text-center mb-5">
        <h1>Hashing Visualizer 🔑</h1>
        <p className="lead text-muted">
          Visualize the SHA-256 hashing algorithm and the &quot;Avalanche
          Effect&quot;.
        </p>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">Input Data</div>
            <div className="card-body">
              <textarea
                className="form-control mb-3"
                rows="4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something to see its hash..."
              ></textarea>
              <div className="alert alert-info py-2 m-0">
                <strong>Length:</strong> {input.length} characters
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">SHA-256 Hash</div>
            <div className="card-body d-flex flex-column justify-content-center">
              <div className="hash-output p-3 bg-light rounded text-center">
                <code className="text-break fs-4 text-primary">{hash}</code>
              </div>
              <div className="mt-3 text-muted small text-center">
                A 256-bit (64 hex characters) fixed-length unique identifier.
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3>The Avalanche Effect</h3>
      <p className="text-muted">
        A small change in input (like changing one character) results in a
        drastically different hash. Watch the bits below change as you type.
      </p>

      <div className="bit-grid shadow-sm p-4 bg-white rounded border mt-4">
        {bits.map((bit, i) => (
          <div
            key={i}
            className={`bit-cell ${bit === "1" ? "bit-one" : "bit-zero"}`}
            title={`Bit ${i}`}
          >
            {bit}
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h4>Key Properties of Cryptographic Hashes:</h4>
        <div className="row g-4 mt-1">
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light h-100">
              <h5>Deterministic</h5>
              <p className="small mb-0">
                The same input always produces the exact same hash.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light h-100">
              <h5>Quick Computation</h5>
              <p className="small mb-0">
                Calculating the hash value is efficient for any given message.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 border rounded bg-light h-100">
              <h5>Pre-image Resistance</h5>
              <p className="small mb-0">
                It is infeasible to generate the original message from its hash.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HashingVisualizer
