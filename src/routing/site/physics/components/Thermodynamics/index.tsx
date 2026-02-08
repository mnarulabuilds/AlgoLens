import React, { useState, useEffect, useRef } from "react"
import "./Thermodynamics.css"

const Thermodynamics = () => {
  const [temperature, setTemperature] = useState(300) // Kelvin
  const [volume, setVolume] = useState(400) // Width of box
  const [particleCount, setParticleCount] = useState(20)
  const canvasRef = useRef(null)
  const [particles, setParticles] = useState([])
  const requestRef = useRef()

  const boxHeight = 400
  const particleRadius = 5

  // Initialize particles
  useEffect(() => {
    const newParticles = []
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * (volume - 2 * particleRadius) + particleRadius,
        y: Math.random() * (boxHeight - 2 * particleRadius) + particleRadius,
        vx: (Math.random() - 0.5) * Math.sqrt(temperature / 10),
        vy: (Math.random() - 0.5) * Math.sqrt(temperature / 10),
      })
    }
    setParticles(newParticles)
  }, [particleCount])

  // Update speeds when temperature changes
  useEffect(() => {
    setParticles((prev) =>
      prev.map((p) => {
        const speedScale =
          Math.sqrt(temperature / 10) / Math.sqrt(p.vx ** 2 + p.vy ** 2 || 1)
        return {
          ...p,
          vx:
            p.vx * speedScale ||
            (Math.random() - 0.5) * Math.sqrt(temperature / 10),
          vy:
            p.vy * speedScale ||
            (Math.random() - 0.5) * Math.sqrt(temperature / 10),
        }
      })
    )
  }, [temperature])

  const animate = () => {
    setParticles((prevParticles) => {
      return prevParticles.map((p) => {
        let newX = p.x + p.vx
        let newY = p.y + p.vy
        let newVx = p.vx
        let newVy = p.vy

        // Collision with walls
        if (newX <= particleRadius || newX >= volume - particleRadius) {
          newVx = -newVx
          newX =
            newX <= particleRadius ? particleRadius : volume - particleRadius
        }
        if (newY <= particleRadius || newY >= boxHeight - particleRadius) {
          newVy = -newVy
          newY =
            newY <= particleRadius ? particleRadius : boxHeight - particleRadius
        }

        return { x: newX, y: newY, vx: newVx, vy: newVy }
      })
    })
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [volume]) // Restart when volume/boundaries change significantly

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw Box
    ctx.strokeStyle = "#333"
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, volume, boxHeight)

    // Draw Particles
    particles.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2)
      // Color based on speed (temperature)
      const speed = Math.sqrt(p.vx ** 2 + p.vy ** 2)
      const r = Math.min(255, Math.floor(speed * 50))
      const b = Math.max(0, 255 - r)
      ctx.fillStyle = `rgb(${r}, 100, ${b})`
      ctx.fill()
      ctx.closePath()
    })
  }, [particles, volume])

  // Ideal Gas Law: P = nRT / V
  const pressure = ((particleCount * temperature) / volume).toFixed(2)

  return (
    <div className="thermo-container container py-4">
      <div className="text-center mb-5">
        <h1>Ideal Gas Law 🌡️</h1>
        <p className="lead text-muted">
          Visualize the relationship between Pressure, Volume, and Temperature
          (PV = nRT).
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Controls</div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  Temperature: <span>{temperature} K</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="50"
                  max="1000"
                  value={temperature}
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                />
                <small className="text-muted">
                  Affects kinetic energy (speed) of particles.
                </small>
              </div>

              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  Volume (Width): <span>{volume}px</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="100"
                  max="600"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                />
                <small className="text-muted">
                  Adjusting volume changes pressure.
                </small>
              </div>

              <div className="mb-4">
                <label className="form-label d-flex justify-content-between">
                  Particle Count: <span>{particleCount}</span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="100"
                  value={particleCount}
                  onChange={(e) => setParticleCount(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="card shadow-sm bg-dark text-white">
            <div className="card-body text-center">
              <h5>Current Pressure (P)</h5>
              <div className="display-4 text-warning">{pressure}</div>
              <p className="small text-muted m-0">Arbitrary Units</p>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="simulation-canvas-wrapper shadow-lg p-3 bg-light rounded">
            <canvas
              ref={canvasRef}
              width={600}
              height={boxHeight}
              className="thermo-canvas"
            />
          </div>
          <div className="mt-4 p-3 bg-white border rounded">
            <h5>Kinetic Theory of Gases</h5>
            <p className="small mb-0">
              Pressure is the result of collisions between gas particles and the
              walls of the container. As **Temperature** increases, particles
              move faster, creating more forceful collisions. As **Volume**
              decreases, particles hit the walls more frequently. Both lead to
              higher **Pressure**.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thermodynamics
