import React, { useState } from "react"
import "./Input.css"

const Input = React.memo(({ checkPrime }) => {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input) {
      checkPrime(parseInt(input))
      setInput("")
    }
  }

  return (
    <div className="primes-input-card">
      <h2 className="primes-input-header">
        Check whether input number is prime or composite
      </h2>
      <h4 className="primes-input-subheader">
        A prime number is only divisible by 1 and itself and has no other
        factors
      </h4>
      <div className="primes-input-form">
        <div className="primes-input-group">
          <label htmlFor="primes-number-input" className="primes-input-label">
            Number
          </label>
          <input
            type="number"
            id="primes-number-input"
            className="primes-input-field"
            placeholder="Enter a number"
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </div>
        <button
          className="primes-submit-btn"
          disabled={!input}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
})

Input.displayName = "Primes.Input"

export default Input
