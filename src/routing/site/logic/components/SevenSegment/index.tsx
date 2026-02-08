import React, { useState } from "react"
import "./SevenSegment.css"

// Segments: a, b, c, d, e, f, g
const digitMap = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
  off: [0, 0, 0, 0, 0, 0, 0],
}

const SevenSegment = () => {
  const [currentDigit, setCurrentDigit] = useState(0)
  const [manual, setManual] = useState(digitMap[0])

  const setDigit = (d) => {
    setCurrentDigit(d)
    setManual(digitMap[d])
  }

  const toggleSegment = (idx) => {
    const next = [...manual]
    next[idx] = next[idx] ? 0 : 1
    setManual(next)
    setCurrentDigit("custom")
  }

  const segmentLabels = ["a", "b", "c", "d", "e", "f", "g"]

  return (
    <div className="seven-segment-container container py-4">
      <div className="text-center mb-5">
        <h1>7-Segment Display 🔟</h1>
        <p className="lead text-muted">
          Used to display decimal numerals. See the binary truth behind each
          digit.
        </p>
      </div>

      <div className="row g-4 justify-content-center align-items-center">
        <div className="col-lg-5">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">
              Preset Digits
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
                  <button
                    key={d}
                    className={`btn btn-lg ${
                      currentDigit === d ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setDigit(d)}
                    style={{ width: "50px" }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-info bg-light">
            <div className="card-body">
              <h6>Binary Input (a-g)</h6>
              <div className="d-flex flex-column gap-2">
                {segmentLabels.map((label, i) => (
                  <div
                    key={label}
                    className="d-flex justify-content-between align-items-center bg-white p-2 rounded border"
                  >
                    <span className="fw-bold">Segment {label}</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={!!manual[i]}
                        onChange={() => toggleSegment(i)}
                      />
                      <span className="badge bg-dark ms-2">{manual[i]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7 d-flex justify-content-center">
          <div className="display-case shadow-lg p-5 bg-dark rounded-3 border border-secondary">
            <div className="seven-segment-visual">
              {/* a */}
              <div
                className={`segment seg-horiz seg-a ${manual[0] ? "on" : ""}`}
              ></div>
              {/* f */}
              <div
                className={`segment seg-vert seg-f ${manual[5] ? "on" : ""}`}
              ></div>
              {/* b */}
              <div
                className={`segment seg-vert seg-b ${manual[1] ? "on" : ""}`}
              ></div>
              {/* g */}
              <div
                className={`segment seg-horiz seg-g ${manual[6] ? "on" : ""}`}
              ></div>
              {/* e */}
              <div
                className={`segment seg-vert seg-e ${manual[4] ? "on" : ""}`}
              ></div>
              {/* c */}
              <div
                className={`segment seg-vert seg-c ${manual[2] ? "on" : ""}`}
              ></div>
              {/* d */}
              <div
                className={`segment seg-horiz seg-d ${manual[3] ? "on" : ""}`}
              ></div>
            </div>

            <div className="mt-5 text-center text-secondary">
              <small className="font-monospace">
                STATUS:{" "}
                {currentDigit === "custom"
                  ? "USER_INPUT"
                  : `DISPLAYING_${currentDigit}`}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SevenSegment
