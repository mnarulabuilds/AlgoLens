import React, { useState } from "react"
import "./Input.css"

const Input = React.memo(({ disabled, checkPalindrome }) => {
  const [input, setInput] = useState("")

  const handleSubmit = () => {
    if (input) {
      checkPalindrome(input)
      setInput("")
    }
  }

  return (
    <div className="palindrome-input-card">
      <h2 className="palindrome-input-header">
        Check whether string is Palindrome
      </h2>
      <h4 className="palindrome-input-subheader">
        A Palindrome reads the same from left to right and right to left
      </h4>
      <div className="palindrome-input-form">
        <div className="palindrome-input-group">
          <label
            htmlFor="palindrome-string-input"
            className="palindrome-input-label"
          >
            String
          </label>
          <input
            type="text"
            id="palindrome-string-input"
            className="palindrome-input-field"
            onChange={(event) => setInput(event.target.value)}
            value={input}
            disabled={disabled}
            placeholder="Enter a string"
          />
        </div>
        <button
          className="palindrome-submit-btn"
          disabled={disabled || !input}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
})

Input.displayName = "Palindrome.Input"

export default Input
