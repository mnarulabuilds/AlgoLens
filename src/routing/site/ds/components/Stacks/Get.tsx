import React, { useState, useEffect, useRef } from "react"

export default function Get(props) {
  const [position, setPosition] = useState("")
  const [, setLabelWidth] = useState(0)
  const inputLabel = useRef()

  useEffect(() => {
    if (inputLabel.current) {
      setLabelWidth(inputLabel.current.offsetWidth)
    }
  }, [])

  const handleChange = (event) => {
    props.modifyWhere(event.target.value)
    setPosition(event.target.value)
  }

  if (props.open) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "400px",
          margin: "16px auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {props.array1.length > 0 ? (
          <>
            <h2
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px",
                borderRadius: "4px 4px 0 0",
                textAlign: "center",
              }}
            >
              Get
            </h2>
            <div style={{ padding: "16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label
                  htmlFor="position-select"
                  ref={inputLabel}
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Position
                </label>
                <select
                  id="position-select"
                  value={position}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option value="" disabled>
                    Select Position
                  </option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
              <div style={{ marginBottom: "16px" }}>
                {props.result1 && (
                  <input
                    type="text"
                    disabled
                    value={props.result1}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f9f9f9",
                      color: "#333",
                    }}
                  />
                )}
              </div>
              <button
                onClick={() => props.get()}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <h2
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "16px",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            Empty Stack
          </h2>
        )}
      </div>
    )
  } else return <div></div>
}
