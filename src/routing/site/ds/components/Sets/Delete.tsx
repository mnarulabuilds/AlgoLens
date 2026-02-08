import React from "react"

export default function Delete(props) {
  const [data, setData] = React.useState(null)

  if (props.open)
    return (
      <div className="card" style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Delete</h5>
        </div>
        <div className="card-body">
          <div className="form-group mt-3">
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
              props.del(data)
              setData(null)
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  else return <div></div>
}
