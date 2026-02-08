import React, { lazy, useCallback, useState } from "react"
import ChoiceButton from "./ChoiceButton"
import "./Game.css"
import { emojis } from "./emojis"

const Result = lazy(() => import("./Result"))

const choices = ["Rock", "Paper", "Scissors"]

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) {
    return "It's a tie!"
  }
  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Scissors" && computerChoice === "Paper") ||
    (playerChoice === "Paper" && computerChoice === "Rock")
  ) {
    return "You win!"
  }
  return "You lose!"
}

const Game = () => {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)

  const handleChoice = useCallback((choice) => {
    if (!result) {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)]
      setPlayerChoice(choice)
      setComputerChoice(randomChoice)
      setResult(getResult(choice, randomChoice))
    }
  }, [])

  const resetGame = useCallback(() => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult(null)
  }, [])

  return (
    <div className="game-rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <ChoiceButton
            key={choice}
            choice={choice}
            onClick={handleChoice}
            result={result}
          />
        ))}
      </div>
      {result && <Result result={result} resetGame={resetGame} />}
      <div className="choices-display">
        {playerChoice && (
          <p>
            You chose: <span className="emoji">{emojis[playerChoice]}</span>{" "}
            {playerChoice}
          </p>
        )}
        {computerChoice && (
          <p>
            Computer chose:{" "}
            <span className="emoji">{emojis[computerChoice]}</span>{" "}
            {computerChoice}
          </p>
        )}
      </div>
    </div>
  )
}

export default Game
