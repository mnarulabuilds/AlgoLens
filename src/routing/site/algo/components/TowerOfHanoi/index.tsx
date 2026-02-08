import React, { useState, useEffect, useRef } from "react"
import styles from "./TowerOfHanoi.module.css"

const TowerOfHanoi = () => {
  const [numDisks, setNumDisks] = useState(3)
  const [rods, setRods] = useState([[], [], []])
  const [moves, setMoves] = useState([])
  const [moveIndex, setMoveIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const timerRef = useRef(null)

  // Initialize rods and moves whenever numDisks changes
  useEffect(() => {
    const initialRods = [[], [], []]
    for (let i = numDisks; i >= 1; i--) {
      initialRods[0].push(i)
    }
    setRods(initialRods)
    setMoveIndex(0)
    setIsRunning(false)

    const generatedMoves = []
    const solveHanoi = (n, from, to, aux) => {
      if (n === 0) return
      solveHanoi(n - 1, from, aux, to)
      generatedMoves.push([from, to])
      solveHanoi(n - 1, aux, to, from)
    }

    solveHanoi(numDisks, 0, 2, 1)
    setMoves(generatedMoves)
  }, [numDisks])

  // Animate moves
  useEffect(() => {
    if (!isRunning || moveIndex >= moves.length) return

    timerRef.current = setTimeout(() => {
      const [from, to] = moves[moveIndex]
      setRods((prev) => {
        const newRods = prev.map((arr) => [...arr])
        const disk = newRods[from].pop()
        newRods[to].push(disk)
        return newRods
      })
      setMoveIndex(moveIndex + 1)
    }, 700)

    return () => clearTimeout(timerRef.current)
  }, [moveIndex, moves, isRunning])

  const handleStart = () => setIsRunning(true)
  const handleStop = () => setIsRunning(false)

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Number of Disks:{" "}
          <input
            type="number"
            min="1"
            max="8"
            value={numDisks}
            onChange={(e) => setNumDisks(Number(e.target.value))}
          />
        </label>
        <button onClick={handleStart} style={{ marginLeft: "10px" }}>
          Start
        </button>
        <button onClick={handleStop} style={{ marginLeft: "5px" }}>
          Stop
        </button>
      </div>

      <div className={styles.container}>
        {rods.map((rod, rodIndex) => (
          <div key={rodIndex} className={styles.rod}>
            {rod.map((disk, diskIndex) => (
              <div
                key={diskIndex}
                className={styles.disk}
                style={{ width: `${disk * 20}px` }}
              >
                {disk}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TowerOfHanoi
