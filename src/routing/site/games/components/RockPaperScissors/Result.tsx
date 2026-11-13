import React from "react"
import "./Result.module.scss"

type ResultProps = { result: string; resetGame: () => void }

const Result = React.memo(({ result, resetGame }: ResultProps) => {
  return (
    <div className="result">
      <h2 className="result-text">{result}</h2>
      <button onClick={resetGame} className="reset-button">
        Play Again
      </button>
    </div>
  )
})

Result.displayName = "RockPaperScissors.Result"

export default Result
