import React from "react"
import Link from "./Link"

const Element = ({ type, data, highlight, next, AllGreater, AllSmaller }) => {
  let element = null
  let elStyles = {
    border: "1px solid white",
    background: "rgba(40,60,180,0.8)",
    width: "100%",
  }

  if (highlight) {
    elStyles.background = "rgba(30,150,40,0.8)"
  }

  const sanitizedType = type.toLowerCase()

  switch (sanitizedType) {
    case "stack":
      element = [
        data.index === 0 && (
          <div key="Top" style={{ padding: "8px", textAlign: "center" }}>
            Top
          </div>
        ),
        <div
          key={`${data.index}-${data.value}`}
          style={{
            ...elStyles,
            background: highlight
              ? "rgba(30,150,40,0.8)"
              : "rgba(40,40,160,0.8)",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ color: "white", fontSize: "18px" }}>{data.value}</div>
          <div style={{ color: "white", fontSize: "12px" }}>{data.index}</div>
        </div>,
      ]
      break

    case "array":
    case "linkedlist":
    case "queues":
      element = (
        <div
          key={`${data.value}-${data.index}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {(sanitizedType === "queues" || sanitizedType === "linkedlist") &&
            data.index === 0 && (
              <div
                style={{
                  color: "white",
                  padding: "8px",
                  backgroundColor: "#dc3545",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {sanitizedType === "linkedlist" ? "Head" : "Front"} <br />
              </div>
            )}
          <div
            style={{
              ...elStyles,
              background: highlight
                ? "rgba(30,150,40,0.8)"
                : "rgba(40,60,180,0.8)",
              padding: "8px",
              textAlign: "center",
            }}
          >
            <div style={{ color: "white", fontSize: "18px" }}>{data.value}</div>
            {data.index >= 0 && (
              <div style={{ color: "white", fontSize: "12px" }}>
                {data.index}
              </div>
            )}
          </div>
          {(sanitizedType === "queues" || sanitizedType === "linkedlist") &&
            next === false && (
              <div
                style={{
                  color: "white",
                  padding: "8px",
                  backgroundColor: "#dc3545",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {sanitizedType === "linkedlist" ? "Tail" : "Rear"}
              </div>
            )}
          {(sanitizedType === "linkedlist" || sanitizedType === "queues") &&
            next && (
              <span key={`${data.index}-${data.value}-nextlink`}>
                <Link direction="right" />
              </span>
            )}
        </div>
      )
      break

    case "sets":
      element = (
        <div
          key={data.value}
          style={{
            ...elStyles,
            background: highlight
              ? "rgba(30,150,40,0.8)"
              : AllGreater
              ? "rgba(242,19,23,0.8)"
              : AllSmaller
              ? "rgba(250,183,0,0.8)"
              : "rgba(40,60,180,0.8)",
            borderRadius: "50%",
            minHeight: "100px",
            minWidth: "100px",
            margin: "20px",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "18px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {data.value}
          </div>
        </div>
      )
      break

    default:
  }

  return data && element
}

export default Element
