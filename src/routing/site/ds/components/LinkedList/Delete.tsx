import React from "react"

export default function Delete(props) {
  const [where, setWhere] = React.useState("")
  const [data, setData] = React.useState(null)
  const [position, setPosition] = React.useState(null)

  if (props.open)
    return (
      <div className="card" style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Delete</h5>
        </div>
        <div className="card-body text-center">
          <h6>Position or value</h6>
          <div className="form-group mt-3">
            <label htmlFor="position-select">Position</label>
            <select
              id="position-select"
              className="form-select"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
            >
              <option value="">Select</option>
              <option value="start">Start</option>
              <option value="end">End</option>
            </select>
          </div>
          <p className="text-center">OR</p>
          <div className="form-group mt-2">
            <label htmlFor="index-input">Index</label>
            <input
              type="text"
              id="index-input"
              className="form-control"
              onChange={(event) => setPosition(event.target.value)}
              value={position ? position : ""}
            />
          </div>
          <p className="text-center">OR</p>
          <div className="form-group mt-2">
            <label htmlFor="value-input">Value</label>
            <input
              type="text"
              id="value-input"
              className="form-control"
              onChange={(event) => setData(event.target.value)}
              value={data ? data : ""}
            />
          </div>
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => {
              props.del(data, where, position)
              setData(null)
              setPosition(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  else return <div></div>
}
