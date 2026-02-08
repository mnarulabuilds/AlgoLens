import React, { useState } from "react"
import { evaluate } from "mathjs"

const EquationInput = ({ onEquationChange }) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      evaluate(input.replace("x", 0)) // Try evaluating the equation at x=0
      setError("")
      onEquationChange(input)
    } catch (err) {
      setError("Invalid equation. Please enter a valid equation.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="equation-input">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter equation (e.g., y = x^2)"
      />
      <button type="submit">Plot</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default EquationInput
