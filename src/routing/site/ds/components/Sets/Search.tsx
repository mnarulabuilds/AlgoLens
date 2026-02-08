import React, { useState } from "react"

export default function Search(props) {
  const [data, setData] = useState(null)

  if (props.open) {
    return (
      <div
        style={{
          border: "1px solid rgba(22,45,167,0.9)",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "16px auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "16px",
            borderRadius: "8px 8px 0 0",
            textAlign: "center",
          }}
        >
          <h2>Search</h2>
        </div>

        {/* Content */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          <h3>Data</h3>
        </div>

        {/* Form */}
        <div style={{ padding: "16px", textAlign: "center" }}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="reddit-input"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Value
            </label>
            <input
              type="text"
              id="reddit-input"
              value={data || ""}
              onChange={(event) => setData(event.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <button
            onClick={() => {
              props.search(data, "all-greater")
              setData(null)
            }}
            style={{
              padding: "10px 16px",
              margin: "8px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            All Greater elements
          </button>

          <button
            onClick={() => {
              props.search(data, "alls")
              setData(null)
            }}
            style={{
              padding: "10px 16px",
              margin: "8px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            All Smaller elements
          </button>

          <button
            onClick={() => {
              props.search(data, "no")
              setData(null)
            }}
            style={{
              padding: "10px 16px",
              margin: "8px",
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
      </div>
    )
  } else return <div></div>
}
