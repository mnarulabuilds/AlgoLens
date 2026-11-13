import React, { lazy, useCallback, useState } from "react"
import ChoiceButton from "./ChoiceButton"
import "./Game.module.scss"
import { emojis } from "./emojis"

const Result = lazy(() => import("./Result"))

type Choice = "Rock" | "Paper" | "Scissors"
type GameResult = "It's a tie!" | "You win!" | "You lose!"
const choices: Choice[] = ["Rock", "Paper", "Scissors"]

const getResult = (
  playerChoice: Choice,
  computerChoice: Choice
): GameResult => {
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
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null)
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null)
  const [result, setResult] = useState<GameResult | null>(null)

  const handleChoice = useCallback((choice: Choice) => {
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
