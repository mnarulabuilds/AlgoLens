import React, { useState, lazy, useEffect } from "react"
import { FaEquals, FaTimes } from "react-icons/fa"
import Input from "routing/site/algo/components/Factorial/Input"
import "./Factorial.css"

const Element = lazy(() => import("common/components/Element"))

const Factorial = () => {
  const [input, setInput] = useState(null)
  const [result, setResult] = useState(null)
  const [processed, setProcessed] = useState(null)
  const [rest, setRest] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState(null)

  const computeFactorial = (currentValue) => {
    if (currentValue <= 0) {
      setTimeout(() => {
        setDisabled(false)
        setAlert({
          text: "Factorial successfully computed",
          type: "success",
        })
        setInput(null)
        setProcessed(null)
        setRest(null)
      }, 500)
      return
    }
    setTimeout(() => {
      setProcessed((prevProcessed) => `${prevProcessed} X ${currentValue}`)
      setProcessed((prevProcessed) => {
        const processedNumbers = prevProcessed.split(" X ").map(Number)
        if (processedNumbers.length === 2) {
          const [a, b] = processedNumbers
          return (a * b).toString()
        }
        return prevProcessed
      })
      setRest(currentValue - 1)
      computeFactorial(currentValue - 1)
    }, 500)
  }

  const fact = (input) => {
    if (input >= 0 && input <= 1) {
      setAlert({
        text: "Factorial is 1",
        type: "success",
      })
    } else if (input >= 2 && input <= 50) {
      setInput(input)
      setDisabled(true)
      setProcessed(input > 1 ? `${input}` : `1`)
      setRest(input >= 2 ? input - 1 : 1)
      setAlert(null)
      computeFactorial(input - 1)
    } else {
      setAlert({
        text: "Factorial does not exist or too large",
        type: "danger",
      })
    }
  }

  useEffect(() => {
    const updateResult = () => {
      if (processed) {
        const processedNumbers = processed.split(" X ").map(Number)
        if (processedNumbers.length <= 2) {
          const [a = 1, b = 1] = processedNumbers
          if (b === 1) setResult((a * b).toString())
        }
      }
    }
    updateResult()
  }, [processed])

  return (
    <div className="factorial-container">
      {alert && (
        <div className="factorial-row">
          <div className="factorial-col-full">
            <div className={`factorial-alert factorial-alert-${alert.type}`}>
              <span>{alert.text}</span>
              <button
                className="factorial-alert-close"
                onClick={() => setAlert(null)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="factorial-row text-center">
        <div className="factorial-col-full">
          <Input fact={fact} setResult={setResult} disabled={disabled} />
        </div>
      </div>

      {parseInt(input) >= 0 && (
        <div className="factorial-row text-center factorial-computation">
          <div className="factorial-col-2">
            <Element
              highlight={true}
              data={{ value: `${input}!` }}
              type="array"
            />
          </div>
          <div className="factorial-col-2 factorial-icon">
            <FaEquals style={{ margin: "auto 5px" }} />
          </div>
          <div className="factorial-col-3">
            <Element data={{ value: processed }} type="array" />
          </div>
          <div className="factorial-col-2 factorial-icon">
            <FaTimes style={{ margin: "auto 5px" }} />
          </div>
          <div className="factorial-col-3">
            <Element data={{ value: `${rest}!` }} type="array" />
          </div>
        </div>
      )}
      {parseInt(result) >= 0 && (
        <div className="factorial-row text-center factorial-result">
          <div className="factorial-col-full">
            <Element
              highlight={true}
              data={{ value: `${result}` }}
              type="array"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Factorial
