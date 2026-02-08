import React, { useState } from "react"

const Input = React.memo(({ disabled, setData }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input && !isNaN(input)) {
      setData(Number(input))
      setInput("")
    }
  }

  return (
    <div style={styles.card}>
      <h2 className="bg-success text-white p-2">
        Compute factors of a whole number N = p x q x r ..... x z
      </h2>
      <h4 className="text-primary p-2">
        Finds numbers between 1 to N that completely divides N leaving remainder
        0
      </h4>
      <div style={styles.cardActions}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label htmlFor="factorize-input" style={styles.label}>
              Number
            </label>
            <input
              id="factorize-input"
              type="number"
              style={styles.input}
              onChange={(event) => {
                setInput(event.target.value)
              }}
              value={input}
              disabled={disabled}
              placeholder="Enter a number"
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(disabled ? styles.buttonDisabled : {}),
            }}
            disabled={disabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
})

const styles = {
  card: {
    minWidth: "180px",
    border: "1px solid #e0e0e0",
    borderRadius: "4px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardActions: {
    padding: "16px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    color: "#666",
    fontWeight: "500",
  },
  input: {
    border: "1px solid #e2e2e1",
    borderRadius: "4px",
    backgroundColor: "#fcfcfb",
    padding: "10px 12px",
    fontSize: "14px",
    transition: "all 0.2s",
    outline: "none",
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    alignSelf: "flex-start",
    marginTop: "8px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
}

Input.displayName = "Factorize.Input"

export default Input
