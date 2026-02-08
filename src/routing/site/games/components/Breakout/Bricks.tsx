import React from "react"
import Brick from "./Brick"

const Bricks = ({ bricks }) => {
  return (
    <div className="bricks">
      {bricks.map((brick, index) => (
        <Brick
          key={`${brick.x} -- ${brick.y} -- ${index} -- brick`}
          position={brick}
        />
      ))}
    </div>
  )
}

export default Bricks
