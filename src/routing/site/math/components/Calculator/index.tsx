import React, { useState } from "react"
import "./Calculator.css"

const Calculator = () => {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value)
  }

  const handleClear = () => {
    setInput("")
    setResult("")
  }

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1))
  }

  const handleEvaluate = () => {
    try {
      setResult(eval(input))
    } catch (error) {
      setResult("Error")
    }
  }

  return (
    <div className="container">
      <h4>Basic Calculator</h4>
      <div className="calculator">
        <div className="display">
          <div className="input">{input}</div>
          <div className="result">{result}</div>
        </div>
        <div className="buttons">
          <button onClick={handleClear}>C</button>
          <button onClick={handleBackspace}>←</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={handleEvaluate}>=</button>
          <button onClick={() => handleClick("0")} className="zero">
            0
          </button>
          <button onClick={() => handleClick(".")}>.</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
