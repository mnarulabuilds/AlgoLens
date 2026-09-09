import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type NodeState = "follower" | "candidate" | "leader"
type Node = { id: number; state: NodeState; log: string[]; term: number }

const RaftConsensus = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ phase: "election" })
  const phase = params.phase === "replicate" ? "replicate" : "election"
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, state: "follower", log: [], term: 0 },
    { id: 2, state: "follower", log: [], term: 0 },
    { id: 3, state: "follower", log: [], term: 0 },
  ])
  const [message, setMessage] = useState("Cluster idle. Start leader election.")

  const reset = () => {
    setNodes([
      { id: 1, state: "follower", log: [], term: 0 },
      { id: 2, state: "follower", log: [], term: 0 },
      { id: 3, state: "follower", log: [], term: 0 },
    ])
    setMessage("Cluster reset.")
    setParams({ phase: "election" })
  }

  const runElection = () => {
    const leaderId = 2
    setNodes([
      { id: 1, state: "follower", log: [], term: 1 },
      { id: 2, state: "leader", log: [], term: 1 },
      { id: 3, state: "follower", log: [], term: 1 },
    ])
    setMessage("Node 2 wins election (term 1) — majority vote received.")
    setParams({ phase: "replicate" })
  }

  const replicateEntry = () => {
    const entry = `SET x=${Math.floor(Math.random() * 100)}`
    setNodes([
      { id: 1, state: "follower", log: [entry], term: 1 },
      { id: 2, state: "leader", log: [entry], term: 1 },
      { id: 3, state: "follower", log: [entry], term: 1 },
    ])
    setMessage("Leader appended entry; followers acknowledged. Log replicated.")
    markComplete()
  }

  const stateColor: Record<NodeState, string> = {
    follower: "rgba(128,128,128,0.35)",
    candidate: "rgba(255, 193, 7, 0.4)",
    leader: "var(--primary-main, #3949ab)",
  }

  return (
    <SimWorkbench
      title="Raft Consensus"
      hint="Raft elects a single leader per term, then replicates log entries to a majority of followers."
      toolbar={
        <>
          <button type="button" className="sim-btn" onClick={runElection}>
            Start election
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={replicateEntry}
            disabled={nodes.every((n) => n.state !== "leader")}
          >
            Replicate log entry
          </button>
          <button type="button" className="sim-btn sim-btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <p style={{ margin: "0 0 1rem", fontSize: "0.9rem" }}>{message}</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {nodes.map((node) => (
            <div
              key={node.id}
              style={{
                padding: "1rem",
                borderRadius: 12,
                border: "2px solid rgba(128,128,128,0.3)",
                minWidth: 140,
                textAlign: "center",
                background: stateColor[node.state],
                color: node.state === "leader" ? "#fff" : "inherit",
              }}
            >
              <div style={{ fontWeight: 700 }}>Node {node.id}</div>
              <div style={{ fontSize: "0.8rem", margin: "0.25rem 0" }}>
                {node.state.toUpperCase()} | term {node.term}
              </div>
              <div style={{ fontSize: "0.75rem", marginTop: "0.5rem" }}>
                Log: {node.log.length ? node.log.join(", ") : "(empty)"}
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.85rem", opacity: 0.75 }}>
          Phase: {phase === "election" ? "Leader election" : "Log replication"}
        </p>
      </div>
    </SimWorkbench>
  )
}

export default RaftConsensus
