import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type Emp = { id: number; name: string }
type Dept = { dept_id: number; dept: string }

const EMPLOYEES: Emp[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
]

const DEPARTMENTS: Dept[] = [
  { dept_id: 10, dept: "Eng" },
  { dept_id: 20, dept: "Sales" },
  { dept_id: 30, dept: "HR" },
]

const EMP_DEPT: Record<number, number | null> = {
  1: 10,
  2: 20,
  3: null,
}

type JoinType = "inner" | "left"

const SQLJoin = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ join: "inner" })
  const joinType = (params.join === "left" ? "left" : "inner") as JoinType
  const result = useMemo(() => {
    const rows: { name: string; dept: string | null }[] = []
    EMPLOYEES.forEach((emp) => {
      const dId = EMP_DEPT[emp.id]
      const dept = dId != null
        ? DEPARTMENTS.find((d) => d.dept_id === dId)?.dept ?? null
        : null
      if (joinType === "inner") {
        if (dept != null) rows.push({ name: emp.name, dept })
      } else {
        rows.push({ name: emp.name, dept })
      }
    })
    return rows
  }, [joinType])

  const handleJoinChange = (j: JoinType) => {
    setParams({ join: j })
    markComplete()
  }

  return (
    <SimWorkbench
      title="SQL JOIN Visualizer"
      hint="INNER JOIN returns only matching rows. LEFT JOIN keeps all left-table rows, filling NULL when no match."
      controls={
        <div>
          <label htmlFor="join-type">JOIN type</label>
          <select
            id="join-type"
            value={joinType}
            onChange={(e) => handleJoinChange(e.target.value as JoinType)}
          >
            <option value="inner">INNER JOIN</option>
            <option value="left">LEFT JOIN</option>
          </select>
        </div>
      }
    >
      <div
        style={{
          padding: "1.25rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <Table title="employees" headers={["id", "name"]} rows={EMPLOYEES.map((e) => [e.id, e.name])} />
        <Table
          title="departments"
          headers={["dept_id", "dept"]}
          rows={DEPARTMENTS.map((d) => [d.dept_id, d.dept])}
        />
        <Table
          title={`${joinType.toUpperCase()} JOIN result`}
          headers={["name", "dept"]}
          rows={result.map((r) => [r.name, r.dept ?? "NULL"])}
          highlight
        />
      </div>
    </SimWorkbench>
  )
}

function Table({
  title,
  headers,
  rows,
  highlight,
}: {
  title: string
  headers: string[]
  rows: (string | number)[][]
  highlight?: boolean
}) {
  return (
    <div
      style={{
        border: highlight
          ? "2px solid var(--primary-main, #3949ab)"
          : "1px solid rgba(128,128,128,0.3)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "0.5rem 0.75rem",
          fontWeight: 700,
          fontSize: "0.85rem",
          background: "rgba(128,128,128,0.15)",
        }}
      >
        {title}
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} style={{ padding: "0.4rem", textAlign: "left", borderBottom: "1px solid rgba(128,128,128,0.3)" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "0.35rem 0.4rem",
                    color: cell === "NULL" ? "#f44336" : "inherit",
                    fontStyle: cell === "NULL" ? "italic" : "normal",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SQLJoin
