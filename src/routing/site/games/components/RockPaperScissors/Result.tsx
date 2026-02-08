import React from "react"
import "./Result.css"

const Result = React.memo(({ result, resetGame }) => {
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
