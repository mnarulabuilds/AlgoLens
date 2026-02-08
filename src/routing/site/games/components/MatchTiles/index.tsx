import React, { useEffect, useState } from "react"
import styles from "./MatchTiles.module.css"

// Utility: generate pairs and shuffle
const generateTiles = (n) => {
  const totalTiles = n * n
  // Ensure even total (we should only allow even totals). If odd, throw to catch bugs.
  if (totalTiles % 2 !== 0) {
    throw new Error(
      "Grid must have an even number of tiles to form pairs. Choose an even N."
    )
  }

  const values = []
  for (let i = 1; i <= totalTiles / 2; i++) {
    values.push(i)
    values.push(i)
  }

  // Fisher-Yates shuffle
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[values[i], values[j]] = [values[j], values[i]]
  }

  return values.map((val, idx) => ({
    id: idx,
    value: val,
    flipped: false,
    matched: false,
  }))
}

const sanitizeN = (val) => {
  let num = Number(val) || 2
  if (num < 2) num = 2
  if (num > 8) num = 8
  // ensure an even grid (n must be even so n*n is even)
  if (num % 2 !== 0) num = num + 1
  return num
}

export default function MatchTiles() {
  const [n, setN] = useState(4)
  const [tiles, setTiles] = useState(() => generateTiles(4))
  const [busy, setBusy] = useState(false)

  // regenerate tiles whenever n changes
  useEffect(() => {
    setTiles(generateTiles(n))
    setBusy(false)
  }, [n])

  const handleTileClick = (id) => {
    if (busy) return // ignore clicks while resolving a pair

    setTiles((prev) => {
      const clicked = prev.find((t) => t.id === id)
      if (!clicked || clicked.flipped || clicked.matched) return prev

      const newTiles = prev.map((t) =>
        t.id === id ? { ...t, flipped: true } : t
      )

      const open = newTiles.filter((t) => t.flipped && !t.matched)
      if (open.length === 2) {
        setBusy(true)
        if (open[0].value === open[1].value) {
          // matched
          setTimeout(() => {
            setTiles((curr) =>
              curr.map((t) =>
                t.id === open[0].id || t.id === open[1].id
                  ? { ...t, matched: true }
                  : t
              )
            )
            setBusy(false)
          }, 500)
        } else {
          // not a match
          setTimeout(() => {
            setTiles((curr) =>
              curr.map((t) =>
                t.id === open[0].id || t.id === open[1].id
                  ? { ...t, flipped: false }
                  : t
              )
            )
            setBusy(false)
          }, 800)
        }
      }

      return newTiles
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <label htmlFor="grid-size">Grid Size (N):</label>
        <input
          id="grid-size"
          type="number"
          min="2"
          max="8"
          value={n}
          onChange={(e) => setN(sanitizeN(e.target.value))}
        />
      </div>

      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}
      >
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`${styles.tile} ${
              tile.flipped || tile.matched ? styles.flipped : ""
            }`}
          >
            {/* Use a button that perfectly covers the tile area so clicks don't "fall through" to other elements */}
            <button
              type="button"
              className={styles.inner}
              onClick={() => handleTileClick(tile.id)}
              aria-pressed={tile.flipped || tile.matched}
            >
              <div className={styles.front}>?</div>
              <div className={styles.back}>{tile.value}</div>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
