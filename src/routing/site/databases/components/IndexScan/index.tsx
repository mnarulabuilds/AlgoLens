import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type Row = { id: number; name: string; dept: string }

const TABLE: Row[] = [
  { id: 1, name: "Alice", dept: "Eng" },
  { id: 2, name: "Bob", dept: "Sales" },
  { id: 3, name: "Carol", dept: "Eng" },
  { id: 4, name: "Dan", dept: "HR" },
  { id: 5, name: "Eve", dept: "Eng" },
  { id: 6, name: "Frank", dept: "Sales" },
  { id: 7, name: "Grace", dept: "Eng" },
  { id: 8, name: "Henry", dept: "HR" },
]

const TARGET_DEPT = "Eng"

const IndexScan = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ mode: "index" })
  const useIndex = params.mode === "index"
  const [examined, setExamined] = useState<number[]>([])
  const [result, setResult] = useState<Row[]>([])
  const [ranBoth, setRanBoth] = useState({ index: false, scan: false })

  const runQuery = () => {
    if (useIndex) {
      const idx = TABLE.map((r, i) => i).filter((i) => TABLE[i].dept === TARGET_DEPT)
      setExamined(idx)
      setResult(idx.map((i) => TABLE[i]))
      setRanBoth((p) => {
        const next = { ...p, index: true }
        if (next.scan) markComplete()
        return next
      })
    } else {
      const hits: Row[] = []
      const seen: number[] = []
      TABLE.forEach((row, i) => {
        seen.push(i)
        if (row.dept === TARGET_DEPT) hits.push(row)
      })
      setExamined(seen)
      setResult(hits)
      setRanBoth((p) => {
        const next = { ...p, scan: true }
        if (next.index) markComplete()
        return next
      })
    }
  }

  return (
    <SimWorkbench
      title="Index vs Full Table Scan"
      hint={`Query: SELECT * FROM employees WHERE dept = '${TARGET_DEPT}'. An index on dept skips unrelated rows.`}
      controls={
        <div>
          <label htmlFor="scan-mode">Scan mode</label>
          <select
            id="scan-mode"
            value={params.mode}
            onChange={(e) => {
              setParams({ mode: e.target.value })
              setExamined([])
              setResult([])
            }}
          >
            <option value="index">Index scan (dept index)</option>
            <option value="full">Full table scan</option>
          </select>
        </div>
      }
      toolbar={
        <button type="button" className="sim-btn" onClick={runQuery}>
          Run query
        </button>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>id</th>
              <th style={thStyle}>name</th>
              <th style={thStyle}>dept</th>
            </tr>
          </thead>
          <tbody>
            {TABLE.map((row, i) => {
              const isExamined = examined.includes(i)
              const isMatch = row.dept === TARGET_DEPT && isExamined
              return (
                <tr
                  key={row.id}
                  style={{
                    background: isMatch
                      ? "rgba(76, 175, 80, 0.25)"
                      : isExamined
                        ? "rgba(255, 193, 7, 0.15)"
                        : "transparent",
                  }}
                >
                  <td style={tdStyle}>{row.id}</td>
                  <td style={tdStyle}>{row.name}</td>
                  <td style={tdStyle}>{row.dept}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div>
            <strong>Rows examined:</strong> {examined.length || "—"} / {TABLE.length}
          </div>
          <div>
            <strong>Rows returned:</strong> {result.length || "—"}
          </div>
          <div>
            <strong>Mode:</strong> {useIndex ? "Index scan" : "Full scan"}
          </div>
        </div>
        {result.length > 0 && (
          <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
            Result: {result.map((r) => r.name).join(", ")}
          </p>
        )}
      </div>
    </SimWorkbench>
  )
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "0.5rem",
  borderBottom: "2px solid rgba(128,128,128,0.35)",
}

const tdStyle: React.CSSProperties = {
  padding: "0.45rem 0.5rem",
  borderBottom: "1px solid rgba(128,128,128,0.2)",
}

export default IndexScan
