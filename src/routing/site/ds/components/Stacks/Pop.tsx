import React from "react"

export default function Pop(props) {
  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "16px",
    minWidth: "275px",
    margin: "16px 0",
  }

  const buttonStyle = {
    display: "inline-block",
    padding: "8px 16px",
    margin: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    textAlign: "center",
  }

  const formControlStyle = {
    width: "100%",
    paddingBottom: "12px",
    paddingTop: "4px",
  }

  if (props.open) {
    return (
      <div style={cardStyle}>
        <h2
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px",
          }}
        >
          Pop
        </h2>
        <div style={formControlStyle}>
          <button
            style={buttonStyle}
            onClick={() => {
              props.pop()
            }}
          >
            Submit
          </button>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
