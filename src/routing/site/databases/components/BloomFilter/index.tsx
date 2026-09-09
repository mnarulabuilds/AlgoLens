import React, { useState, useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const BIT_SIZE = 32

function hash(str: string, seed: number): number {
  let h = seed
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % BIT_SIZE
  }
  return h
}

const BloomFilter = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ hashes: "3" })
  const hashCount = parseIntParam(params.hashes, 3, 1, 5)
  const [bits, setBits] = useState<boolean[]>(() => Array(BIT_SIZE).fill(false))
  const [items, setItems] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [lastQuery, setLastQuery] = useState<{
    word: string
    positions: number[]
    maybe: boolean
  } | null>(null)

  const getPositions = (word: string) =>
    Array.from({ length: hashCount }, (_, i) => hash(word, i + 1))

  const addItem = () => {
    const word = input.trim().toLowerCase()
    if (!word || items.includes(word)) return
    const positions = getPositions(word)
    setBits((prev) => {
      const next = [...prev]
      positions.forEach((p) => {
        next[p] = true
      })
      return next
    })
    setItems((prev) => [...prev, word])
    setInput("")
    setLastQuery(null)
  }

  const queryItem = () => {
    const word = input.trim().toLowerCase()
    if (!word) return
    const positions = getPositions(word)
    const maybe = positions.every((p) => bits[p])
    setLastQuery({ word, positions, maybe })
    if (maybe) markComplete()
    setInput("")
  }

  const reset = () => {
    setBits(Array(BIT_SIZE).fill(false))
    setItems([])
    setLastQuery(null)
    setInput("")
  }

  const highlighted = useMemo(() => {
    if (!lastQuery) return new Set<number>()
    return new Set(lastQuery.positions)
  }, [lastQuery])

  return (
    <SimWorkbench
      title="Bloom Filter"
      hint="A Bloom filter can return false positives but never false negatives. All hash positions must be set for 'maybe present'."
      controls={
        <div>
          <label htmlFor="bf-hashes">Hash functions: {hashCount}</label>
          <input
            id="bf-hashes"
            type="range"
            min={1}
            max={5}
            value={hashCount}
            onChange={(e) => setParams({ hashes: e.target.value })}
          />
        </div>
      }
      toolbar={
        <>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter string..."
            style={{
              flex: 1,
              minWidth: 140,
              padding: "0.45rem 0.75rem",
              borderRadius: 8,
              border: "1px solid rgba(128,128,128,0.35)",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem()
            }}
          />
          <button type="button" className="sim-btn" onClick={addItem}>
            Add
          </button>
          <button type="button" className="sim-btn" onClick={queryItem}>
            Query
          </button>
          <button
            type="button"
            className="sim-btn sim-btn-secondary"
            onClick={reset}
          >
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(16, 1fr)",
            gap: 4,
            marginBottom: "1rem",
          }}
        >
          {bits.map((on, i) => (
            <div
              key={i}
              title={`bit ${i}`}
              style={{
                aspectRatio: "1",
                borderRadius: 4,
                background: highlighted.has(i)
                  ? "#ffd54f"
                  : on
                    ? "var(--primary-main, #3949ab)"
                    : "rgba(128,128,128,0.2)",
                border: highlighted.has(i)
                  ? "2px solid #ff9800"
                  : "1px solid rgba(128,128,128,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: 600,
              }}
            >
              {i}
            </div>
          ))}
        </div>
        <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem" }}>
          <strong>Inserted:</strong>{" "}
          {items.length ? items.join(", ") : "(none)"}
        </p>
        {lastQuery && (
          <p
            style={{
              margin: 0,
              padding: "0.75rem",
              borderRadius: 8,
              background: lastQuery.maybe
                ? "rgba(76, 175, 80, 0.2)"
                : "rgba(244, 67, 54, 0.2)",
            }}
          >
            Query &quot;{lastQuery.word}&quot;:{" "}
            <strong>
              {lastQuery.maybe
                ? "MAYBE in set (all bits set)"
                : "DEFINITELY NOT in set"}
            </strong>
            {" "}
            — positions [{lastQuery.positions.join(", ")}]
          </p>
        )}
      </div>
    </SimWorkbench>
  )
}

export default BloomFilter
