import React, { useState } from "react"
import "./Input.module.scss"

interface InputProps {
  disabled: boolean
  expo: (base: number, power: number) => void
}

const Input = ({ disabled, expo }: InputProps) => {
  const [base, setBase] = useState("")
  const [power, setPower] = useState("")

  const handleSubmit = () => {
    if (base && power) {
      expo(parseFloat(base), parseInt(power))
      setTimeout(() => {
        setBase("")
        setPower("")
      }, 100)
    }
  }

  return (
    <div className="expo-input-card">
      <h2 className="expo-header">Exponentiation Of Number</h2>
      <h4 className="expo-subheader">Base and Power</h4>
      <div className="expo-form">
        <div className="expo-input-group">
          <label htmlFor="base-input" className="expo-label">
            Base
          </label>
          <input
            type="number"
            id="base-input"
            className="expo-input"
            onChange={(event) => setBase(event.target.value)}
            value={base}
            disabled={disabled}
            placeholder="Enter base"
          />
        </div>
        <div className="expo-input-group">
          <label htmlFor="power-input" className="expo-label">
            Power
          </label>
          <input
            type="number"
            id="power-input"
            className="expo-input"
            onChange={(event) => setPower(event.target.value)}
            value={power}
            disabled={disabled}
            placeholder="Enter power"
          />
        </div>
        <button
          className="expo-submit-btn"
          disabled={disabled || !base || !power}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Input
