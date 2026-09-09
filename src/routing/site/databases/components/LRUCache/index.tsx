import React, { useState, useCallback } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"

const KEYS = ["A", "B", "C", "D", "E", "F", "G", "H"]

const stageStyle: React.CSSProperties = {
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  minHeight: 280,
}

const LRUCache = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ capacity: "3" })
  const capacity = parseIntParam(params.capacity, 3, 2, 6)
  const [order, setOrder] = useState<string[]>([])
  const [log, setLog] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)

  const addLog = (msg: string) =>
    setLog((prev) => [msg, ...prev].slice(0, 8))

  const access = useCallback(
    (key: string) => {
      setOrder((prev) => {
        const filtered = prev.filter((k) => k !== key)
        let next = [key, ...filtered]
        let evicted: string | null = null

        if (!prev.includes(key) && next.length > capacity) {
          evicted = next[next.length - 1]
          next = next.slice(0, capacity)
          addLog(`ADD ${key} → evicted ${evicted}`)
          if (!completed) {
            setCompleted(true)
            markComplete()
          }
        } else if (prev.includes(key)) {
          addLog(`ACCESS ${key} → moved to front (MRU)`)
        } else {
          addLog(`ADD ${key} → cache has room`)
        }

        return next
      })
    },
    [capacity, completed, markComplete]
  )

  const reset = () => {
    setOrder([])
    setLog([])
    setCompleted(false)
  }

  return (
    <SimWorkbench
      title="LRU Cache"
      hint="Least Recently Used: the item at the tail is evicted when capacity is exceeded. Access or add keys to see order update."
      controls={
        <>
          <div>
            <label htmlFor="lru-capacity">Capacity: {capacity}</label>
            <input
              id="lru-capacity"
              type="range"
              min={2}
              max={6}
              value={capacity}
              onChange={(e) =>
                setParams({ capacity: e.target.value })
              }
            />
          </div>
        </>
      }
      toolbar={
        <>
          {KEYS.slice(0, capacity + 3).map((k) => (
            <button
              key={k}
              type="button"
              className="sim-btn"
              onClick={() => access(k)}
            >
              Access {k}
            </button>
          ))}
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
      <div style={stageStyle}>
        <div>
          <strong>Cache order (MRU → LRU):</strong>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {order.length === 0 ? (
              <span style={{ opacity: 0.6 }}>Empty cache</span>
            ) : (
              order.map((key, i) => (
                <div
                  key={`${key}-${i}`}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: 8,
                    background:
                      i === 0
                        ? "var(--primary-main, #3949ab)"
                        : i === order.length - 1
                          ? "rgba(244, 67, 54, 0.35)"
                          : "rgba(128,128,128,0.25)",
                    color: i === 0 ? "#fff" : "inherit",
                    fontWeight: 600,
                    border:
                      i === order.length - 1
                        ? "2px dashed #f44336"
                        : "1px solid rgba(128,128,128,0.3)",
                  }}
                >
                  {key}
                  {i === 0 && " (MRU)"}
                  {i === order.length - 1 && order.length >= capacity && " (LRU)"}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <strong>Activity log:</strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", fontSize: "0.9rem" }}>
            {log.length === 0 ? (
              <li style={{ opacity: 0.6 }}>Click a key to start</li>
            ) : (
              log.map((entry, i) => <li key={i}>{entry}</li>)
            )}
          </ul>
        </div>
      </div>
    </SimWorkbench>
  )
}

export default LRUCache
