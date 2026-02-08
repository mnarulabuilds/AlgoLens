import React from "react"

export default function Delete(props) {
  if (props.open)
    return (
      <div className="card" style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Delete</h5>
        </div>
        <div className="card-body text-center">
          <p>Delete from front (FIFO)</p>
          <button
            className="btn btn-outline-primary mt-2"
            onClick={() => {
              props.del("start")
            }}
          >
            DELETE
          </button>
        </div>
      </div>
    )
  else return <div></div>
}
