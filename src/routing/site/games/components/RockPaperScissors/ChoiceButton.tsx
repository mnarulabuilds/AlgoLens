import React from "react"
import "./ChoiceButton.css"
import { emojis } from "./emojis"

const ChoiceButton = React.memo(({ choice, onClick, result }) => {
  return (
    <button
      className="choice-button"
      onClick={() => onClick(choice)}
      disabled={result}
    >
      <span className="emoji">{emojis[choice]}</span> {choice}
    </button>
  )
})

ChoiceButton.displayName = "RockPaperScissors.ChoiceButton"

export default ChoiceButton
