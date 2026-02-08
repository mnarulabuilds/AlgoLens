import React, { useState, useEffect, useRef } from "react"
import "./MagneticField.css"

const MagneticField = () => {
  const [velocity, setVelocity] = useState(5)
  const [charge, setCharge] = useState(1) // +1 or -1
  const [bField, setBField] = useState(0.05) // Magnetic field strength
  const [isSimulating, setIsSimulating] = useState(false)

  const canvasRef = useRef(null)
  const particleRef = useRef({ x: 50, y: 250, vx: 5, vy: 0 })
  const trailRef = useRef([])
  const requestRef = useRef()

  const canvasWidth = 800
  const canvasHeight = 500
  const fieldBoundary = 150 // X coordinate where field starts

  const resetSimulation = () => {
    particleRef.current = { x: 50, y: 250, vx: velocity, vy: 0 }
    trailRef.current = []
    setIsSimulating(false)
    draw()
  }

  const step = () => {
    if (!isSimulating) return

    let { x, y, vx, vy } = particleRef.current

    // If inside field
    if (x > fieldBoundary) {
      // Lorentz Force: F = q * (v x B)
      // In 2D, if B is into the screen (Z direction), Force is perpendicular to v
      // ax = q * vy * B
      // ay = -q * vx * B
      const ax = charge * vy * bField
      const ay = -charge * vx * bField

      vx += ax
      vy += ay
    }

    x += vx
    y += vy

    particleRef.current = { x, y, vx, vy }
    trailRef.current.push({ x, y })

    // Boundary check
    if (x > canvasWidth || x < 0 || y > canvasHeight || y < 0) {
      setIsSimulating(false)
    }

    draw()
    requestRef.current = requestAnimationFrame(step)
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw Magnetic Field Region (X symbols for "Into Screen")
    ctx.fillStyle = "rgba(0, 123, 255, 0.05)"
    ctx.fillRect(fieldBoundary, 0, canvasWidth - fieldBoundary, canvasHeight)

    ctx.strokeStyle = "rgba(0, 123, 255, 0.2)"
    ctx.lineWidth = 1
    for (let i = fieldBoundary + 25; i < canvasWidth; i += 50) {
      for (let j = 25; j < canvasHeight; j += 50) {
        ctx.beginPath()
        ctx.moveTo(i - 5, j - 5)
        ctx.lineTo(i + 5, j + 5)
        ctx.moveTo(i + 5, j - 5)
        ctx.lineTo(i - 5, j + 5)
        ctx.stroke()
      }
    }

    // Boundary line
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(fieldBoundary, 0)
    ctx.lineTo(fieldBoundary, canvasHeight)
    ctx.strokeStyle = "#333"
    ctx.stroke()
    ctx.setLineDash([])

    // Label Regions
    ctx.fillStyle = "#666"
    ctx.font = "bold 14px Arial"
    ctx.fillText("Field-Free Region", 10, 30)
    ctx.fillText("Magnetic Field (B)", fieldBoundary + 10, 30)

    // Draw Trail
    if (trailRef.current.length > 1) {
      ctx.beginPath()
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y)
      for (let i = 1; i < trailRef.current.length; i++) {
        ctx.lineTo(trailRef.current[i].x, trailRef.current[i].y)
      }
      ctx.strokeStyle = "#ffc107"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw Particle
    const { x, y } = particleRef.current
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fillStyle = charge > 0 ? "#dc3545" : "#0d6efd"
    ctx.fill()
    ctx.fillStyle = "#fff"
    ctx.font = "bold 12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(charge > 0 ? "+" : "-", x, y + 4)
  }

  useEffect(() => {
    draw()
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  useEffect(() => {
    if (isSimulating) {
      requestRef.current = requestAnimationFrame(step)
    } else {
      cancelAnimationFrame(requestRef.current)
    }
  }, [isSimulating])

  return (
    <div className="lorentz-container container py-4">
      <div className="text-center mb-5">
        <h1>Lorentz Force 🧲</h1>
        <p className="lead text-muted">
          Watch a charged particle deflect as it enters a uniform magnetic field
          (F = qvB).
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Parameters</div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  Initial Velocity: <span>{velocity}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={velocity}
                  onChange={(e) => {
                    setVelocity(parseFloat(e.target.value))
                    resetSimulation()
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  Charge (q):{" "}
                  <span>{charge > 0 ? "+ Positive" : "- Negative"}</span>
                </label>
                <select
                  className="form-select"
                  value={charge}
                  onChange={(e) => {
                    setCharge(parseInt(e.target.value))
                    resetSimulation()
                  }}
                >
                  <option value="1">Positive (+)</option>
                  <option value="-1">Negative (-)</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  B-Field Strength: <span>{bField}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0.01"
                  max="0.2"
                  step="0.01"
                  value={bField}
                  onChange={(e) => {
                    setBField(parseFloat(e.target.value))
                    resetSimulation()
                  }}
                />
              </div>

              <div className="d-grid gap-2">
                <button
                  className={`btn ${
                    isSimulating ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => setIsSimulating(!isSimulating)}
                >
                  {isSimulating ? "Stop" : "Start Simulation"}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={resetSimulation}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-info bg-light">
            <div className="card-body">
              <h6>Physics Insight</h6>
              <p className="small mb-0">
                The magnetic force is always perpendicular to both the velocity
                and the field. This causes the particle to move in a **circular
                path**. The radius (Cyclotron Radius) is: <br />
                <code>r = mv / qB</code>
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="canvas-holder shadow p-2 bg-dark rounded">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              className="lorentz-canvas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MagneticField
