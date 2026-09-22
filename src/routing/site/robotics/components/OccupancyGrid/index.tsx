import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"

const SIZE = 6
const START: [number, number] = [0, 0]
const GOAL: [number, number] = [5, 5]
const BLOCKED = new Set(["1,1", "2,2", "3,1", "4,3"])

function bfsPath() {
  const key = (r: number, c: number) => `${r},${c}`
  const queue: [number, number][] = [START]
  const prev = new Map<string, string | null>([[key(...START), null]])
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]
  while (queue.length) {
    const [r, c] = queue.shift()!
    if (r === GOAL[0] && c === GOAL[1]) break
    for (const [dr, dc] of dirs) {
      const nr = r + dr
      const nc = c + dc
      const k = key(nr, nc)
      if (nr < 0 || nc < 0 || nr >= SIZE || nc >= SIZE) continue
      if (BLOCKED.has(k) || prev.has(k)) continue
      prev.set(k, key(r, c))
      queue.push([nr, nc])
    }
  }
  const path: string[] = []
  let cur: string | null = key(...GOAL)
  while (cur) {
    path.unshift(cur)
    cur = prev.get(cur) ?? null
  }
  return path
}

const OccupancyGrid = () => {
  const markComplete = useMarkComplete()
  const path = useMemo(() => bfsPath(), [])

  React.useEffect(() => {
    markComplete()
  }, [markComplete])

  return (
    <SimWorkbench
      title="Occupancy Grid + Path"
      hint="Grid cells marked occupied; BFS finds a feasible route from start to goal."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${SIZE}, 32px)`,
          gap: 4,
        }}
      >
        {Array.from({ length: SIZE * SIZE }, (_, i) => {
          const r = Math.floor(i / SIZE)
          const c = i % SIZE
          const k = `${r},${c}`
          const onPath = path.includes(k)
          const blocked = BLOCKED.has(k)
          const isStart = r === START[0] && c === START[1]
          const isGoal = r === GOAL[0] && c === GOAL[1]
          let bg = "#eee"
          if (blocked) bg = "#333"
          else if (onPath) bg = "#4fc3f7"
          if (isStart) bg = "#0D681C"
          if (isGoal) bg = "#e53935"
          return <div key={k} style={{ width: 32, height: 32, background: bg, borderRadius: 4 }} />
        })}
      </div>
    </SimWorkbench>
  )
}

export default OccupancyGrid
