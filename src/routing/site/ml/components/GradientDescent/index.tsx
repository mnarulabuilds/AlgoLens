import React, { useState, useEffect, useRef } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import "./GradientDescent.css"

const GradientDescent = () => {
  const canvasRef = useRef(null)
  const [functionType, setFunctionType] = useState("quadratic")
  const [learningRate, setLearningRate] = useState(0.1)
  const [currentX, setCurrentX] = useState(5)
  const [currentY, setCurrentY] = useState(0)
  const [path, setPath] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [iteration, setIteration] = useState(0)
  const [converged, setConverged] = useState(false)
  const [showPseudocode, setShowPseudocode] = useState(false)

  const canvasWidth = 700
  const canvasHeight = 500
  const padding = 50

  const pseudocode = [
    { text: "// Gradient Descent Optimization Algorithm", indent: 0 },
    {
      text: "function gradientDescent(f, df, x0, learningRate, maxIter):",
      indent: 0,
    },
    { text: "// f: objective function to minimize", indent: 1 },
    { text: "// df: derivative (gradient) of f", indent: 1 },
    { text: "// x0: initial starting point", indent: 1 },
    { text: "// learningRate: step size (alpha)", indent: 1 },
    { text: "// maxIter: maximum iterations", indent: 1 },
    { text: "", indent: 0 },
    { text: "x = x0  // Current position", indent: 1 },
    { text: "iteration = 0", indent: 1 },
    { text: "converged = false", indent: 1 },
    { text: "convergenceThreshold = 0.001", indent: 1 },
    { text: "", indent: 0 },
    { text: "while iteration < maxIter AND not converged:", indent: 1 },
    { text: "// Step 1: Calculate gradient at current point", indent: 2 },
    { text: "gradient = df(x)", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Step 2: Check for convergence", indent: 2 },
    { text: "if abs(gradient) < convergenceThreshold:", indent: 2 },
    { text: "converged = true", indent: 3 },
    { text: "break", indent: 3 },
    { text: "", indent: 0 },
    {
      text: "// Step 3: Update position (move opposite to gradient)",
      indent: 2,
    },
    { text: "x = x - learningRate * gradient", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Step 4: Increment iteration counter", indent: 2 },
    { text: "iteration++", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Return optimized value and function value", indent: 1 },
    { text: "return x, f(x)", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Key Concepts:", indent: 0 },
    { text: "// - Gradient points uphill (steepest ascent)", indent: 0 },
    { text: "// - We move opposite (-gradient) to go downhill", indent: 0 },
    { text: "// - Learning rate controls step size", indent: 0 },
    { text: "//   * Too small: slow convergence", indent: 0 },
    { text: "//   * Too large: overshooting, divergence", indent: 0 },
    {
      text: "// - Algorithm stops when gradient ≈ 0 (local minimum)",
      indent: 0,
    },
  ]

  useEffect(() => {
    drawFunction()
  }, [functionType, currentX, path])

  const functions = {
    quadratic: {
      f: (x) => (x - 2) ** 2 - 3,
      df: (x) => 2 * (x - 2),
      name: "f(x) = (x-2)² - 3",
      range: { min: -5, max: 10 },
    },
    cubic: {
      f: (x) => 0.1 * x ** 3 - x ** 2 - 2 * x + 5,
      df: (x) => 0.3 * x ** 2 - 2 * x - 2,
      name: "f(x) = 0.1x³ - x² - 2x + 5",
      range: { min: -5, max: 10 },
    },
    sin: {
      f: (x) => Math.sin(x) + x * 0.1,
      df: (x) => Math.cos(x) + 0.1,
      name: "f(x) = sin(x) + 0.1x",
      range: { min: -6, max: 6 },
    },
    abs: {
      f: (x) => Math.abs(x - 2) + (x - 2) ** 2 * 0.2,
      df: (x) => (x > 2 ? 1 : -1) + (x - 2) * 0.4,
      name: "f(x) = |x-2| + 0.2(x-2)²",
      range: { min: -3, max: 8 },
    },
  }

  const func = functions[functionType]

  const toCanvasX = (x) => {
    const { min, max } = func.range
    return ((x - min) / (max - min)) * (canvasWidth - 2 * padding) + padding
  }

  const toCanvasY = (y) => {
    const yMin = -10
    const yMax = 15
    return (
      canvasHeight -
      padding -
      ((y - yMin) / (yMax - yMin)) * (canvasHeight - 2 * padding)
    )
  }

  const fromCanvasX = (cx) => {
    const { min, max } = func.range
    return ((cx - padding) / (canvasWidth - 2 * padding)) * (max - min) + min
  }

  const drawFunction = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    // Draw axes
    ctx.strokeStyle = "#4ecca3"
    ctx.lineWidth = 2

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(toCanvasX(0), padding)
    ctx.lineTo(toCanvasX(0), canvasHeight - padding)
    ctx.stroke()

    // X-axis
    const y0 = toCanvasY(0)
    ctx.beginPath()
    ctx.moveTo(padding, y0)
    ctx.lineTo(canvasWidth - padding, y0)
    ctx.stroke()

    // Draw function
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 3
    ctx.beginPath()

    const { min, max } = func.range
    const step = (max - min) / 500

    for (let x = min; x <= max; x += step) {
      const y = func.f(x)
      const cx = toCanvasX(x)
      const cy = toCanvasY(y)

      if (x === min) {
        ctx.moveTo(cx, cy)
      } else {
        ctx.lineTo(cx, cy)
      }
    }
    ctx.stroke()

    // Draw path
    if (path.length > 1) {
      ctx.strokeStyle = "#ff6b6b"
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])

      ctx.beginPath()
      path.forEach((point, index) => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)

        if (index === 0) {
          ctx.moveTo(cx, cy)
        } else {
          ctx.lineTo(cx, cy)
        }
      })
      ctx.stroke()
      ctx.setLineDash([])

      // Draw path points
      path.forEach((point, index) => {
        const cx = toCanvasX(point.x)
        const cy = toCanvasY(point.y)

        ctx.beginPath()
        ctx.arc(cx, cy, 4, 0, 2 * Math.PI)
        ctx.fillStyle =
          index === path.length - 1 ? "#4ecca3" : "rgba(255, 107, 107, 0.6)"
        ctx.fill()
      })
    }

    // Draw current position
    const cx = toCanvasX(currentX)
    const cy = toCanvasY(currentY)

    ctx.beginPath()
    ctx.arc(cx, cy, 8, 0, 2 * Math.PI)
    ctx.fillStyle = "#4ecca3"
    ctx.fill()
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw tangent line
    const gradient = func.df(currentX)
    const tangentLength = 2

    ctx.strokeStyle = "#FFD700"
    ctx.lineWidth = 2
    ctx.beginPath()
    const x1 = currentX - tangentLength
    const y1 = currentY - gradient * tangentLength
    const x2 = currentX + tangentLength
    const y2 = currentY + gradient * tangentLength
    ctx.moveTo(toCanvasX(x1), toCanvasY(y1))
    ctx.lineTo(toCanvasX(x2), toCanvasY(y2))
    ctx.stroke()

    // Labels
    ctx.fillStyle = "#4ecca3"
    ctx.font = "16px Arial"
    ctx.textAlign = "center"
    ctx.fillText(func.name, canvasWidth / 2, 30)

    ctx.font = "12px Arial"
    ctx.fillStyle = "#b0b0b0"
    ctx.fillText(`x = ${currentX.toFixed(3)}`, cx, cy - 20)
    ctx.fillText(`f(x) = ${currentY.toFixed(3)}`, cx, cy - 35)
  }

  const reset = () => {
    const { min, max } = func.range
    const startX = min + (max - min) * 0.8
    setCurrentX(startX)
    setCurrentY(func.f(startX))
    setPath([])
    setIteration(0)
    setConverged(false)
  }

  const step = () => {
    if (converged) return

    const gradient = func.df(currentX)
    const newX = currentX - learningRate * gradient
    const newY = func.f(newX)

    setPath([...path, { x: currentX, y: currentY }])
    setCurrentX(newX)
    setCurrentY(newY)
    setIteration(iteration + 1)

    if (Math.abs(gradient) < 0.001) {
      setConverged(true)
    }
  }

  const run = async () => {
    setIsRunning(true)
    let x = currentX
    let newPath = [...path]
    let iter = iteration

    for (let i = 0; i < 100; i++) {
      const gradient = func.df(x)
      const y = func.f(x)

      newPath.push({ x, y })
      setPath([...newPath])

      if (Math.abs(gradient) < 0.001) {
        setConverged(true)
        break
      }

      x = x - learningRate * gradient
      setCurrentX(x)
      setCurrentY(func.f(x))
      iter++
      setIteration(iter)

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setIsRunning(false)
  }

  const handleCanvasClick = (e) => {
    if (isRunning) return

    const rect = e.target.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const x = fromCanvasX(cx)

    if (x >= func.range.min && x <= func.range.max) {
      setCurrentX(x)
      setCurrentY(func.f(x))
      setPath([])
      setIteration(0)
      setConverged(false)
    }
  }

  return (
    <div className="gradient-descent-container">
      <div className="gd-header">
        <h1>Gradient Descent Visualization 📉</h1>
        <p>Watch how gradient descent finds the minimum of a function!</p>
        <button
          className="pseudocode-button"
          onClick={() => setShowPseudocode(true)}
          title="View Pseudocode"
        >
          <FaCode /> View Pseudocode
        </button>
      </div>

      <div className="gd-content">
        <div className="gd-canvas-wrapper">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="gd-canvas"
          />
        </div>

        <div className="gd-controls">
          <div className="control-group">
            <h3>Actions</h3>
            <button onClick={step} disabled={isRunning || converged}>
              Step Once
            </button>
            <button onClick={run} disabled={isRunning || converged}>
              {isRunning ? "Running..." : "Run to Convergence"}
            </button>
            <button onClick={reset} disabled={isRunning}>
              Reset Position
            </button>
          </div>

          <div className="control-group">
            <h3>Function Type</h3>
            <select
              value={functionType}
              onChange={(e) => {
                setFunctionType(e.target.value)
                reset()
              }}
              disabled={isRunning}
            >
              <option value="quadratic">Quadratic (Simple)</option>
              <option value="cubic">Cubic (Multiple Minima)</option>
              <option value="sin">Sinusoidal (Oscillating)</option>
              <option value="abs">Absolute Value (Non-smooth)</option>
            </select>
          </div>

          <div className="control-group">
            <h3>Parameters</h3>
            <label>
              Learning Rate: {learningRate.toFixed(3)}
              <input
                type="range"
                min="0.001"
                max="0.5"
                step="0.001"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                disabled={isRunning}
              />
            </label>
            <div className="info-text">
              {learningRate < 0.05 && "🐌 Very slow convergence"}
              {learningRate >= 0.05 && learningRate < 0.2 && "✅ Good rate"}
              {learningRate >= 0.2 &&
                learningRate < 0.4 &&
                "⚠️ Might overshoot"}
              {learningRate >= 0.4 && "❌ Likely to diverge"}
            </div>
          </div>

          <div className="control-group">
            <h3>Statistics</h3>
            <div className="info-item">
              <span>Current x:</span>
              <span>{currentX.toFixed(4)}</span>
            </div>
            <div className="info-item">
              <span>Current f(x):</span>
              <span>{currentY.toFixed(4)}</span>
            </div>
            <div className="info-item">
              <span>Gradient:</span>
              <span>{func.df(currentX).toFixed(4)}</span>
            </div>
            <div className="info-item">
              <span>Iterations:</span>
              <span>{iteration}</span>
            </div>
            <div className="info-item">
              <span>Status:</span>
              <span>{converged ? "✓ Converged" : "Optimizing"}</span>
            </div>
          </div>

          <div className="control-group">
            <h3>Legend</h3>
            <div className="legend-items">
              <div className="legend-item">
                <div className="legend-line white"></div>
                <span>Function curve</span>
              </div>
              <div className="legend-item">
                <div className="legend-circle green"></div>
                <span>Current position</span>
              </div>
              <div className="legend-item">
                <div className="legend-line gold"></div>
                <span>Tangent (gradient)</span>
              </div>
              <div className="legend-item">
                <div className="legend-line red dashed"></div>
                <span>Descent path</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gd-info">
        <h3>About Gradient Descent</h3>
        <p>
          Gradient Descent is an optimization algorithm used to find the minimum
          of a function. It&apos;s fundamental to training machine learning
          models.
        </p>
        <h4>How It Works:</h4>
        <ol>
          <li>Start at a random point on the function</li>
          <li>Calculate the gradient (slope) at the current point</li>
          <li>
            Move in the opposite direction of the gradient (downhill) by:
            <code>x_new = x_old - learning_rate * gradient</code>
          </li>
          <li>Repeat until the gradient is close to zero (convergence)</li>
        </ol>
        <p>
          <strong>Learning Rate:</strong> Controls step size. Too small = slow
          convergence. Too large = overshooting or divergence.
        </p>
        <p>
          <strong>Tip:</strong> Click anywhere on the canvas to start from a new
          position!
        </p>
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "Gradient Descent - Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={pseudocode}
              title="Gradient Descent Algorithm"
            />
          ),
          close: {
            callback: () => setShowPseudocode(false),
          },
        }}
      />
    </div>
  )
}

export default GradientDescent
