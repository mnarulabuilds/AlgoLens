import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import "./DiningPhilosophers.css"

const DiningPhilosophers = () => {
  const [philosophers, setPhilosophers] = useState([
    { id: 0, status: "thinking", leftChopstick: 0, rightChopstick: 1 },
    { id: 1, status: "thinking", leftChopstick: 1, rightChopstick: 2 },
    { id: 2, status: "thinking", leftChopstick: 2, rightChopstick: 3 },
    { id: 3, status: "thinking", leftChopstick: 3, rightChopstick: 4 },
    { id: 4, status: "thinking", leftChopstick: 4, rightChopstick: 0 },
  ])

  const [chopsticks, setChopsticks] = useState([true, true, true, true, true]) // true means available
  const [logs, setLogs] = useState([
    "Simulation started. All philosophers are thinking.",
  ])

  const addLog = (msg) => {
    setLogs((prev) => [msg, ...prev].slice(0, 5))
  }

  const togglePhilosopher = (id) => {
    const phil = philosophers[id]
    if (phil.status === "thinking") {
      // Try to eat
      if (chopsticks[phil.leftChopstick] && chopsticks[phil.rightChopstick]) {
        // Can eat
        const nextChopsticks = [...chopsticks]
        nextChopsticks[phil.leftChopstick] = false
        nextChopsticks[phil.rightChopstick] = false
        setChopsticks(nextChopsticks)

        const nextPhils = [...philosophers]
        nextPhils[id].status = "eating"
        setPhilosophers(nextPhils)
        addLog(`Philosopher ${id} is now eating.`)
      } else {
        addLog(`Philosopher ${id} is waiting for chopsticks.`)
        const nextPhils = [...philosophers]
        nextPhils[id].status = "hungry"
        setPhilosophers(nextPhils)
      }
    } else if (phil.status === "eating" || phil.status === "hungry") {
      // stop eating or stop being hungry
      if (phil.status === "eating") {
        const nextChopsticks = [...chopsticks]
        nextChopsticks[phil.leftChopstick] = true
        nextChopsticks[phil.rightChopstick] = true
        setChopsticks(nextChopsticks)
        addLog(`Philosopher ${id} finished eating and is now thinking.`)
      }
      const nextPhils = [...philosophers]
      nextPhils[id].status = "thinking"
      setPhilosophers(nextPhils)
    }
  }

  return (
    <div className="os-visualizer container py-4">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold text-primary">Dining Philosophers</h2>
        <p className="text-muted">
          A classic synchronization problem illustrating resource contention and
          deadlock.
        </p>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-lg-7 text-center">
          <div className="table-wrapper">
            <div className="table-circle shadow">
              <span className="table-label">Shared Resources</span>
              {/* Chopsticks */}
              {chopsticks.map((available, i) => {
                const angle = (i * 72 + 36) * (Math.PI / 180)
                const x = 50 + 35 * Math.cos(angle)
                const y = 50 + 35 * Math.sin(angle)
                return (
                  <motion.div
                    key={`chopstick-${i}`}
                    className={`chopstick ${available ? "available" : "taken"}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${
                        i * 72 + 126
                      }deg)`,
                    }}
                    animate={{
                      scale: available ? 1 : 0.8,
                      opacity: available ? 1 : 0.3,
                    }}
                  />
                )
              })}
            </div>

            {/* Philosophers */}
            {philosophers.map((phil, i) => {
              const angle = (i * 72 - 90) * (Math.PI / 180)
              const x = 50 + 45 * Math.cos(angle)
              const y = 50 + 45 * Math.sin(angle)
              return (
                <motion.div
                  key={`phil-${i}`}
                  className={`philosopher-node shadow-sm ${phil.status}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => togglePhilosopher(i)}
                >
                  <div className="phil-avatar">
                    {phil.status === "eating"
                      ? "🍜"
                      : phil.status === "hungry"
                      ? "🤤"
                      : "🤔"}
                  </div>
                  <div className="phil-id">P{phil.id}</div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-3">Philosopher Status</h5>
            <div className="status-legend mb-3">
              <div className="d-flex align-items-center mb-2">
                <span className="legend-dot thinking"></span>
                <span className="ms-2 small">Thinking (Idle)</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="legend-dot hungry"></span>
                <span className="ms-2 small">
                  Hungry (Waiting for keys/forks)
                </span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="legend-dot eating"></span>
                <span className="ms-2 small">Eating (Holding resources)</span>
              </div>
            </div>

            <div className="instructions alert alert-info py-2">
              <small>
                Click on a philosopher to toggle their state. Two adjacent
                philosophers cannot eat simultaneously.
              </small>
            </div>

            <h6 className="fw-bold mt-4">Simulation Logs</h6>
            <div className="log-container">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div
                    key={log + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="log-entry"
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiningPhilosophers
