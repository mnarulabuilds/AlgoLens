import React from "react"

const Brick = ({ position }) => {
  return (
    <div className="brick" style={{ left: position.x, top: position.y }}></div>
  )
}

export default Brick
