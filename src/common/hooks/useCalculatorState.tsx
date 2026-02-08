import { useState } from "react"
import { evaluate, format } from "mathjs"

const useCalculatorState = () => {
  const [display, setDisplay] = useState("")

  const handleButtonClick = (label) => {
    if (label === "C") {
      setDisplay("")
    } else if (label === "=") {
      try {
        const result = evaluate(display)
        setDisplay(format(result, { precision: 14 }))
      } catch (error) {
        setDisplay("Error")
      }
    } else {
      setDisplay(display + label)
    }
  }

  return {
    display,
    handleButtonClick,
  }
}

export default useCalculatorState
