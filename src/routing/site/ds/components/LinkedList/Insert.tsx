import React, { useState } from "react"

export default function Insert(props) {
  const [where, setWhere] = useState("start")
  const [data, setData] = useState(null)

  if (props.open) {
    return (
      <div className="card" style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Insert</h5>
        </div>
        <div className="card-body text-center">
          <h6>Enter data</h6>
          <div className="form-group mt-3">
            <label htmlFor="position-select">Position</label>
            <select
              id="position-select"
              className="form-select"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            >
              <option value="start">Start</option>
              <option value="end">End</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="data-input">Enter Data</label>
            <input
              type="text"
              id="data-input"
              className="form-control"
              onChange={(event) => setData(event.target.value)}
              value={data ? data : ""}
            />
          </div>
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => {
              props.insert(data, where)
              setData(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  } else return <div></div>
}
