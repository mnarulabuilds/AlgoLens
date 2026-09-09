import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type IsoLevel = "read_uncommitted" | "serializable"

const TransactionIsolation = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ isolation: "read_uncommitted" })
  const isolation = (params.isolation === "serializable"
    ? "serializable"
    : "read_uncommitted") as IsoLevel
  const [balance, setBalance] = useState(1000)
  const [t1Step, setT1Step] = useState(0)
  const [t2Step, setT2Step] = useState(0)
  const [dirtyRead, setDirtyRead] = useState<number | null>(null)
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => setLog((p) => [...p, msg])

  const reset = () => {
    setBalance(1000)
    setT1Step(0)
    setT2Step(0)
    setDirtyRead(null)
    setLog([])
  }

  const runT1Write = () => {
    if (t1Step > 0) return
    addLog("T1: BEGIN")
    addLog("T1: UPDATE balance SET amount = 500 (uncommitted)")
    setBalance(500)
    setT1Step(1)
  }

  const runT2Read = () => {
    if (t1Step < 1 || t2Step > 0) return
    addLog("T2: BEGIN")
    if (isolation === "read_uncommitted") {
      addLog("T2: SELECT balance → reads 500 (dirty read!)")
      setDirtyRead(500)
    } else {
      addLog("T2: SELECT balance → blocked / reads 1000 (no dirty read)")
      setDirtyRead(1000)
      markComplete()
    }
    setT2Step(1)
  }

  const runT1Rollback = () => {
    if (t1Step < 1) return
    addLog("T1: ROLLBACK → balance restored to 1000")
    setBalance(1000)
    setT1Step(2)
    if (isolation === "read_uncommitted" && dirtyRead === 500) {
      addLog("⚠ T2 read uncommitted data that was rolled back!")
      markComplete()
    }
  }

  return (
    <SimWorkbench
      title="Transaction Isolation"
      hint="Under READ UNCOMMITTED, T2 can see T1's uncommitted write (dirty read). SERIALIZABLE prevents this."
      controls={
        <div>
          <label htmlFor="iso-level">Isolation level</label>
          <select
            id="iso-level"
            value={isolation}
            onChange={(e) => {
              setParams({ isolation: e.target.value })
              reset()
            }}
          >
            <option value="read_uncommitted">READ UNCOMMITTED</option>
            <option value="serializable">SERIALIZABLE</option>
          </select>
        </div>
      }
      toolbar={
        <>
          <button type="button" className="sim-btn" onClick={runT1Write} disabled={t1Step > 0}>
            T1: Write 500
          </button>
          <button type="button" className="sim-btn" onClick={runT2Read} disabled={t1Step < 1 || t2Step > 0}>
            T2: Read balance
          </button>
          <button type="button" className="sim-btn" onClick={runT1Rollback} disabled={t1Step !== 1}>
            T1: Rollback
          </button>
          <button type="button" className="sim-btn sim-btn-secondary" onClick={reset}>
            Reset
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <div style={panelStyle}>
          <strong>Shared row: balance</strong>
          <div style={{ fontSize: "2rem", fontWeight: 700, margin: "0.5rem 0" }}>
            ${balance}
          </div>
          {t1Step === 1 && (
            <span style={{ color: "#ff9800", fontSize: "0.85rem" }}>
              T1 uncommitted write pending
            </span>
          )}
        </div>
        <div style={panelStyle}>
          <strong>T2 read value</strong>
          <div style={{ fontSize: "1.5rem", margin: "0.5rem 0" }}>
            {dirtyRead != null ? `$${dirtyRead}` : "—"}
          </div>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <strong>Timeline</strong>
          <ol style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem", fontSize: "0.85rem" }}>
            {log.length === 0 ? (
              <li style={{ opacity: 0.6 }}>Run T1 write, then T2 read</li>
            ) : (
              log.map((l, i) => <li key={i}>{l}</li>)
            )}
          </ol>
        </div>
      </div>
    </SimWorkbench>
  )
}

const panelStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: 8,
  border: "1px solid rgba(128,128,128,0.3)",
  minWidth: 140,
}

export default TransactionIsolation
