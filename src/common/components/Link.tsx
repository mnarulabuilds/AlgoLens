import React from "react"

const Link = ({ direction, label }) => {
  const getIcon = (direction) => {
    switch (direction.toLowerCase()) {
      case "left":
        return <i className="ico left"></i>
      case "up":
        return <i className="ico up"></i>
      case "down":
        return <i className="ico down"></i>
      default:
        return <i className="ico right"></i>
    }
  }

  return (
    <div>
      <div className="link-label">{label}</div>
      <div className="link">{getIcon(direction)}</div>
    </div>
  )
}

export default Link
