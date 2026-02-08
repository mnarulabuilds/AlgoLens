import React, { useState, useEffect } from "react"
import "./CPUScheduling.css"

const CPUScheduling = () => {
  const [processes] = useState([
    { id: 1, arrival: 0, burst: 4, color: "#FF6B6B" },
    { id: 2, arrival: 1, burst: 3, color: "#4ECDC4" },
    { id: 3, arrival: 2, burst: 1, color: "#45B7D1" },
    { id: 4, arrival: 3, burst: 2, color: "#96CEB4" },
  ])

  const [ganttChart, setGanttChart] = useState([])
  const [currentTime, setCurrentTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [stats, setStats] = useState({ avgWaiting: 0, avgTurnaround: 0 })

  const calculateFCFS = () => {
    let time = 0
    let chart = []
    let totalWaiting = 0
    let totalTurnaround = 0

    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival)

    sorted.forEach((p) => {
      if (time < p.arrival) time = p.arrival
      const start = time
      time += p.burst
      const end = time

      chart.push({
        ...p,
        start,
        end,
        waiting: start - p.arrival,
        turnaround: end - p.arrival,
      })

      totalWaiting += start - p.arrival
      totalTurnaround += end - p.arrival
    })

    setGanttChart(chart)
    setStats({
      avgWaiting: (totalWaiting / processes.length).toFixed(2),
      avgTurnaround: (totalTurnaround / processes.length).toFixed(2),
    })
  }

  const startSimulation = () => {
    setIsRunning(true)
    setCurrentTime(0)
    calculateFCFS()
  }

  useEffect(() => {
    if (isRunning && ganttChart.length > 0) {
      const timer = setInterval(() => {
        setCurrentTime((prev) => {
          const maxEnd = Math.max(...ganttChart.map((i) => i.end))
          if (prev >= maxEnd) {
            setIsRunning(false)
            clearInterval(timer)
            return prev
          }
          return prev + 0.1
        })
      }, 100)
      return () => clearInterval(timer)
    }
  }, [isRunning, ganttChart])

  return (
    <div className="os-visualizer container py-4">
      <h2 className="mb-4">CPU Scheduling: First Come First Served (FCFS)</h2>

      <div className="controls card mb-4 p-3 shadow-sm">
        <div className="d-flex gap-3 align-items-center">
          <button
            className="btn btn-primary"
            onClick={startSimulation}
            disabled={isRunning}
          >
            Start Simulation
          </button>
          <div className="text-muted">
            Simulated Time: <strong>{currentTime.toFixed(1)}s</strong>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="gantt-container card p-4 shadow-sm mb-4">
            <h5>Gantt Chart</h5>
            <div className="gantt-chart d-flex mt-3">
              {ganttChart.map((p, i) => (
                <div
                  key={i}
                  className="gantt-block"
                  style={{
                    width: `${p.burst * 40}px`,
                    backgroundColor: p.color,
                    opacity: currentTime >= p.start ? 1 : 0.2,
                    transition: "opacity 0.3s",
                  }}
                >
                  P{p.id}
                  <div className="time-label start">{p.start}</div>
                  {i === ganttChart.length - 1 && (
                    <div className="time-label end">{p.end}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stats-card card p-4 shadow-sm bg-light">
            <h5>Performance Metrics</h5>
            <hr />
            <div className="mb-2">
              Average Waiting Time: <strong>{stats.avgWaiting}s</strong>
            </div>
            <div>
              Average Turnaround Time: <strong>{stats.avgTurnaround}s</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container card p-4 shadow-sm mt-4">
        <h5>Process Queue</h5>
        <table className="table table-hover mt-2">
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Waiting Time</th>
              <th>Turnaround Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => {
              const result = ganttChart.find((r) => r.id === p.id)
              return (
                <tr key={p.id}>
                  <td>
                    <span
                      className="badge"
                      style={{ backgroundColor: p.color }}
                    >
                      P{p.id}
                    </span>
                  </td>
                  <td>{p.arrival}s</td>
                  <td>{p.burst}s</td>
                  <td>{result ? `${result.waiting}s` : "-"}</td>
                  <td>{result ? `${result.turnaround}s` : "-"}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CPUScheduling
