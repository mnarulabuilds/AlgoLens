import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

const INPUT = "the cat sat on the mat the cat"

type Phase = "idle" | "map" | "shuffle" | "reduce" | "done"

const MapReduce = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ phase: "idle" })
  const [phase, setPhase] = useState<Phase>(
    (params.phase as Phase) || "idle"
  )
  const [mapOut, setMapOut] = useState<{ word: string; count: number }[]>([])
  const [shuffled, setShuffled] = useState<Record<string, number[]>>({})
  const [reduceOut, setReduceOut] = useState<Record<string, number>>({})

  const advance = () => {
    if (phase === "idle" || phase === "done") {
      const words = INPUT.split(" ")
      const mapped = words.map((w) => ({ word: w, count: 1 }))
      setMapOut(mapped)
      setPhase("map")
      setParams({ phase: "map" })
    } else if (phase === "map") {
      const groups: Record<string, number[]> = {}
      mapOut.forEach(({ word, count }) => {
        if (!groups[word]) groups[word] = []
        groups[word].push(count)
      })
      setShuffled(groups)
      setPhase("shuffle")
      setParams({ phase: "shuffle" })
    } else if (phase === "shuffle") {
      const reduced: Record<string, number> = {}
      Object.entries(shuffled).forEach(([word, counts]) => {
        reduced[word] = counts.reduce((a, b) => a + b, 0)
      })
      setReduceOut(reduced)
      setPhase("reduce")
      setParams({ phase: "reduce" })
      markComplete()
    } else if (phase === "reduce") {
      setPhase("done")
      setParams({ phase: "done" })
    }
  }

  const reset = () => {
    setPhase("idle")
    setMapOut([])
    setShuffled({})
    setReduceOut({})
    setParams({ phase: "idle" })
  }

  const phaseLabel: Record<Phase, string> = {
    idle: "Ready",
    map: "Map",
    shuffle: "Shuffle",
    reduce: "Reduce",
    done: "Complete",
  }

  return (
    <SimWorkbench
      title="MapReduce Word Count"
      hint="Map emits (word, 1) pairs, shuffle groups by key, reduce sums counts."
      toolbar={
        <>
          <button type="button" className="sim-btn" onClick={advance}>
            {phase === "reduce" ? "Finish" : phase === "done" ? "Done" : `Next: ${phase === "idle" ? "Map" : phase === "map" ? "Shuffle" : "Reduce"}`}
          </button>
          <button type="button" className="sim-btn sim-btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <strong>Input:</strong> &quot;{INPUT}&quot;
        </div>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {(["map", "shuffle", "reduce"] as const).map((p) => (
            <span
              key={p}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: 6,
                fontSize: "0.8rem",
                fontWeight: 600,
                background:
                  phase === p || (phase === "done" && p === "reduce")
                    ? "var(--primary-main, #3949ab)"
                    : "rgba(128,128,128,0.2)",
                color:
                  phase === p || (phase === "done" && p === "reduce")
                    ? "#fff"
                    : "inherit",
              }}
            >
              {p.toUpperCase()}
            </span>
          ))}
          <span style={{ marginLeft: "auto", fontSize: "0.85rem" }}>
            Status: {phaseLabel[phase]}
          </span>
        </div>

        {phase !== "idle" && (
          <div style={{ marginBottom: "1rem" }}>
            <strong>Map output:</strong>
            <div style={{ fontFamily: "monospace", fontSize: "0.85rem", marginTop: 4 }}>
              {mapOut.map((m, i) => (
                <span key={i}>({m.word}, {m.count}) </span>
              ))}
            </div>
          </div>
        )}

        {(phase === "shuffle" || phase === "reduce" || phase === "done") && (
          <div style={{ marginBottom: "1rem" }}>
            <strong>Shuffle (grouped):</strong>
            <pre style={{ fontSize: "0.8rem", margin: "4px 0 0" }}>
              {JSON.stringify(shuffled, null, 2)}
            </pre>
          </div>
        )}

        {(phase === "reduce" || phase === "done") && (
          <div>
            <strong>Reduce output:</strong>
            <pre style={{ fontSize: "0.85rem", margin: "4px 0 0" }}>
              {JSON.stringify(reduceOut, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </SimWorkbench>
  )
}

export default MapReduce
