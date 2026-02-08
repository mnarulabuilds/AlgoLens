import React from "react"

export default function Placeholder({ variant = "rect", width, height }) {
  const style = {
    width: width || "100%",
    height: height || "100px",
    backgroundColor: "#e0e0e0",
    borderRadius:
      variant === "circle" ? "50%" : variant === "text" ? "4px" : "0",
    animation: "pulse 1.5s ease-in-out infinite",
  }

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
      <div style={style} />
    </>
  )
}
