import React from "react"
import Brick from "./Brick"

type BrickPosition = { x: number; y: number }

const Bricks = ({ bricks }: { bricks: BrickPosition[] }) => {
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
