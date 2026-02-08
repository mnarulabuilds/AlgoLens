import React from "react"

const Scoreboard = React.memo(({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
    </div>
  )
})

Scoreboard.displayName = "Breakout.Scoreboard"

export default Scoreboard
