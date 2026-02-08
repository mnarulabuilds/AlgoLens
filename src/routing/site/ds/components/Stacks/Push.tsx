import React, { useState } from "react"
import "./Push.css"

export default function Push(props) {
  const [data, setData] = useState("")

  if (props.open)
    return (
      <div className="card">
        <h2 className="card-header">Push</h2>
        <div className="card-body">
          <div className="form-control">
            <label htmlFor="push-input" className="input-label">
              Insert
            </label>
            <input
              type="text"
              id="push-input"
              className="input-field"
              value={data}
              onChange={(event) => setData(event.target.value)}
            />
            <button
              className="submit-button"
              onClick={() => {
                props.push(data)
                setData("")
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  else return <div></div>
}
