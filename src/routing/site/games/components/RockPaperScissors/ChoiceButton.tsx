import React from "react"
import "./ChoiceButton.module.scss"
import { emojis } from "./emojis"

type Choice = "Rock" | "Paper" | "Scissors"
type ChoiceButtonProps = {
  choice: Choice
  onClick: (choice: Choice) => void
  result: string | null
}

const ChoiceButton = React.memo(
  ({ choice, onClick, result }: ChoiceButtonProps) => {
    return (
      <button
        className="choice-button"
        onClick={() => onClick(choice)}
        disabled={result !== null}
      >
        <span className="emoji">{emojis[choice]}</span> {choice}
      </button>
    )
  }
)

ChoiceButton.displayName = "RockPaperScissors.ChoiceButton"

export default ChoiceButton
