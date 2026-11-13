import React, { useState } from "react"
import "./Input.module.scss"

interface InputProps {
  disabled: boolean
  fact: (input: number) => void
  setResult: React.Dispatch<React.SetStateAction<string | null>>
}

const Input = React.memo(({ disabled, fact, setResult }: InputProps) => {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input) {
      fact(parseInt(input))
      setInput("")
      setResult(null)
    }
  }

  return (
    <div className="factorial-input-card">
      <h2 className="factorial-input-header">
        Compute Factorial of a whole number N → N!
      </h2>
      <h4 className="factorial-input-subheader">
        Finds the product 1 x 2 x 3 x .... upto a number N
      </h4>
      <div className="factorial-input-form">
        <div className="factorial-input-group">
          <label
            htmlFor="factorial-number-input"
            className="factorial-input-label"
          >
            Number
          </label>
          <input
            type="number"
            id="factorial-number-input"
            className="factorial-input-field"
            onChange={(event) => setInput(event.target.value)}
            value={input}
            disabled={disabled}
            placeholder="Enter a number"
          />
        </div>
        <button
          className="factorial-submit-btn"
          disabled={disabled || !input}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
})

Input.displayName = "Factorial.Input"

export default Input
