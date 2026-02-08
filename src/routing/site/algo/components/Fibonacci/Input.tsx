import React, { useState } from "react"

const Input = React.memo(({ disabled, generateSequence }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input) {
      generateSequence(parseInt(input))
      setInput("")
    }
  }

  return (
    <div className="card border" style={{ minWidth: 180 }}>
      <h2 className="bg-success text-white p-2">
        Generate Fibonacci Sequence of length N &gt; 2 with starting numbers 0
        and 1
      </h2>
      <h4 className="text-primary p-2">
        Generates the sequence Fib(n) such that Fib(n) = Fib(n-1) + Fib(n-2)
        where Fib(1) = 1, Fib(0) = 0
      </h4>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group m-2">
            <label htmlFor="fibonacci-input" className="form-label">
              Number
            </label>
            <input
              id="fibonacci-input"
              type="number"
              className="form-control"
              onChange={(event) => setInput(event.target.value)}
              value={input}
              disabled={disabled}
              placeholder="Enter a number"
            />
          </div>
          <button
            className="btn btn-primary m-2"
            disabled={disabled}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
})

Input.displayName = "Fibonacci.Input"

export default Input
