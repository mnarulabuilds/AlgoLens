import React from "react"

type ScoreboardProps = { score: number }

const Scoreboard = React.memo(({ score }: ScoreboardProps) => {
  return (
    <div className="scoreboard">
      <h2>Score: {score}</h2>
    </div>
  )
})

Scoreboard.displayName = "Breakout.Scoreboard"

export default Scoreboard
