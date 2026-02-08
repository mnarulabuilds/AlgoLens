import React, { useState, useCallback } from "react"
import { evaluate } from "mathjs"

const EquationInput = ({ onEquationChange }) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const debouncedEquationChange = useCallback(debounce(onEquationChange, 500), [
    onEquationChange,
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      evaluate(input.replace(/x|y/g, "0"))
      setError("")
      debouncedEquationChange(input)
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
        placeholder="Enter equation (e.g., z = x^2 + y^2)"
      />
      <button type="submit">Plot</button>
      <button
        type="reset"
        onClick={() => {
          setInput("")
          debouncedEquationChange("")
        }}
      >
        Clear
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default EquationInput
