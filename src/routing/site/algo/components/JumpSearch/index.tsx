import React, { useState } from "react"
import styles from "./JumpSearch.module.css"

const JumpSearch = () => {
  const [arrayInput, setArrayInput] = useState("1,3,5,7,9,11,13,15,17,19")
  const [targetInput, setTargetInput] = useState("11")
  const [array, setArray] = useState([])
  const [, setTarget] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [status, setStatus] = useState("Enter array and target to start")
  const [isRunning, setIsRunning] = useState(false)

  const stepDelay = 700

  const parseInputs = () => {
    const arr = arrayInput
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map(Number)

    if (arr.some(isNaN)) {
      setStatus("Error: Array contains invalid numbers.")
      return null
    }

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        setStatus("Error: Array must be sorted in ascending order.")
        return null
      }
    }

    const tgt = Number(targetInput)
    if (isNaN(tgt)) {
      setStatus("Error: Target is not a valid number.")
      return null
    }

    setArray(arr)
    setTarget(tgt)
    return { arr, tgt }
  }

  const startSearch = () => {
    const inputs = parseInputs()
    if (!inputs) return

    const { arr, tgt } = inputs
    setIsRunning(true)
    setStatus("Searching...")
    setHighlightedIndex(-1)

    const n = arr.length
    if (n === 0) {
      setStatus("Array is empty.")
      setIsRunning(false)
      return
    }

    const step = Math.floor(Math.sqrt(n))
    let prev = 0
    let curr = 0
    const searchSteps = []

    // Jump in blocks
    while (curr < n && arr[curr] < tgt) {
      searchSteps.push(curr)
      prev = curr
      curr += step
    }

    // Linear search in block
    const end = Math.min(curr, n)
    for (let i = prev; i < end; i++) {
      searchSteps.push(i)
    }

    let index = 0

    const timer = setInterval(() => {
      if (index >= searchSteps.length) {
        clearInterval(timer)
        if (arr[highlightedIndex] === tgt) {
          setStatus(`Found ${tgt} at index ${highlightedIndex}`)
        } else {
          setStatus(`${tgt} not found`)
        }
        setIsRunning(false)
        return
      }
      setHighlightedIndex(searchSteps[index])
      index++
    }, stepDelay)
  }

  return (
    <div>
      <div style={{ marginBottom: "15px" }}>
        <label>
          Sorted Array (comma separated):{" "}
          <input
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            disabled={isRunning}
            style={{ width: "300px" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Target Number:{" "}
          <input
            type="text"
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            disabled={isRunning}
          />
        </label>
      </div>

      <button onClick={startSearch} disabled={isRunning}>
        Start Jump Search
      </button>

      <div className={styles.arrayContainer}>
        {array.map((num, idx) => (
          <div
            key={idx}
            className={`${styles.arrayElement} ${
              idx === highlightedIndex ? styles.highlight : ""
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "15px", fontWeight: "bold" }}>{status}</div>
    </div>
  )
}

export default JumpSearch
