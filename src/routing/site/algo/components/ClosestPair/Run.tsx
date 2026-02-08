import React, { useEffect, useRef, useState } from "react"
import "./Run.css"

const Run = (props) => {
  const inputLabel = useRef([])
  const [speed, setSpeed] = useState("Slow")
  const [, setLabelWidth] = useState(0)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const selectSpeed = (event) => {
    setSpeed(event.target.value)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Closest Pair of Points</h5>
        <p className="card-subheader">Pair connected by red dash lines</p>
      </div>
      <div className="card-actions">
        <div className="form-control">
          <label htmlFor="speed-select" ref={inputLabel}>
            Speed
          </label>
          <select
            id="speed-select"
            value={speed}
            onChange={selectSpeed}
            className="select"
          >
            <option value="Slow">Slow</option>
            <option value="Fast">Fast</option>
          </select>
        </div>
        <button
          className="run-button"
          onClick={() => {
            props.find(speed)
          }}
        >
          Run
        </button>
      </div>
    </div>
  )
}

export default Run
