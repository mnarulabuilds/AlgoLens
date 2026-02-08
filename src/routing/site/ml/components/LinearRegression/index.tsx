import React, { useState } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./LinearRegression.css"

const LinearRegression = () => {
  const [points, setPoints] = useState([])
  const [showLine, setShowLine] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [slope, setSlope] = useState(0)
  const [intercept, setIntercept] = useState(0)
  const [learningRate, setLearningRate] = useState(0.01)
  const [loss, setLoss] = useState(0)
  const [showPseudocode, setShowPseudocode] = useState(false)

  // Track this view in user's history
  useTrackView({
    id: "ml-linear-regression",
    label: "Linear Regression",
    category: "Machine Learning",
    route: "/ml/LinearRegression",
  })

  const canvasWidth = 600
  const canvasHeight = 400

  const pseudocode = [
    { text: "// Linear Regression using Gradient Descent", indent: 0 },
    {
      text: "function linearRegression(points, learningRate, epochs):",
      indent: 0,
    },
    { text: "// Initialize parameters", indent: 1 },
    { text: "m = 0  // slope", indent: 1 },
    { text: "b = 0  // intercept", indent: 1 },
    { text: "n = length(points)", indent: 1 },
    { text: "", indent: 0 },
    { text: "for epoch from 1 to epochs:", indent: 1 },
    { text: "mGradient = 0", indent: 2 },
    { text: "bGradient = 0", indent: 2 },
    { text: "loss = 0", indent: 2 },
    { text: "", indent: 0 },
    { text: "// Calculate gradients for all points", indent: 2 },
    { text: "for each point in points:", indent: 2 },
    { text: "prediction = m * point.x + b", indent: 3 },
    { text: "error = prediction - point.y", indent: 3 },
    { text: "mGradient += (2/n) * error * point.x", indent: 3 },
    { text: "bGradient += (2/n) * error", indent: 3 },
    { text: "loss += error²", indent: 3 },
    { text: "", indent: 0 },
    { text: "// Update parameters", indent: 2 },
    { text: "m = m - learningRate * mGradient", indent: 2 },
    { text: "b = b - learningRate * bGradient", indent: 2 },
    { text: "loss = loss / n", indent: 2 },
    { text: "", indent: 0 },
    { text: "return (m, b)", indent: 1 },
    { text: "", indent: 0 },
    { text: "// Closed Form Solution (Normal Equation)", indent: 0 },
    { text: "function linearRegressionClosedForm(points):", indent: 0 },
    { text: "n = length(points)", indent: 1 },
    { text: "sumX = sum of all x values", indent: 1 },
    { text: "sumY = sum of all y values", indent: 1 },
    { text: "sumXY = sum of (x * y) for all points", indent: 1 },
    { text: "sumX2 = sum of (x²) for all points", indent: 1 },
    { text: "", indent: 0 },
    { text: "m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX²)", indent: 1 },
    { text: "b = (sumY - m * sumX) / n", indent: 1 },
    { text: "", indent: 0 },
    { text: "return (m, b)", indent: 1 },
  ]

  const handleCanvasClick = (e) => {
    if (isTraining) return
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPoints([...points, { x, y }])
    setShowLine(false)
  }

  const calculateLinearRegression = () => {
    if (points.length < 2) return

    const n = points.length
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0

    points.forEach((point) => {
      sumX += point.x
      sumY += point.y
      sumXY += point.x * point.y
      sumX2 += point.x * point.x
    })

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const b = (sumY - m * sumX) / n

    setSlope(m)
    setIntercept(b)
    setShowLine(true)
  }

  const trainGradientDescent = async () => {
    if (points.length < 2) return

    setIsTraining(true)
    let m = slope || 0
    let b = intercept || 0
    const epochs = 100

    for (let i = 0; i < epochs; i++) {
      let mGradient = 0
      let bGradient = 0
      let totalLoss = 0

      points.forEach((point) => {
        const prediction = m * point.x + b
        const error = prediction - point.y
        mGradient += (2 / points.length) * error * point.x
        bGradient += (2 / points.length) * error
        totalLoss += error * error
      })

      m -= learningRate * mGradient
      b -= learningRate * bGradient

      setSlope(m)
      setIntercept(b)
      setEpoch(i + 1)
      setLoss(totalLoss / points.length)
      setShowLine(true)

      await new Promise((resolve) => setTimeout(resolve, 20))
    }

    setIsTraining(false)
  }

  const clearCanvas = () => {
    setPoints([])
    setShowLine(false)
    setSlope(0)
    setIntercept(0)
    setEpoch(0)
    setLoss(0)
  }

  const generateRandomPoints = () => {
    const newPoints = []
    const randomSlope = Math.random() * 0.5 + 0.2
    const randomIntercept = Math.random() * 200 + 50
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvasWidth
      const y = randomSlope * x + randomIntercept + (Math.random() - 0.5) * 100
      if (y > 0 && y < canvasHeight) {
        newPoints.push({ x, y })
      }
    }
    setPoints(newPoints)
    setShowLine(false)
  }

  return (
    <div className="linear-regression-container">
      <div className="lr-header">
        <h1>Linear Regression Visualization 📈</h1>
        <p>Click on the canvas to add points, then train the model!</p>
        <div className="header-buttons">
          <button
            className="pseudocode-button"
            onClick={() => setShowPseudocode(true)}
            title="View Pseudocode"
          >
            <FaCode /> View Pseudocode
          </button>
          <FavoriteButton
            topic={{
              id: "ml-linear-regression",
              label: "Linear Regression",
              category: "Machine Learning",
              route: "/ml/LinearRegression",
            }}
          />
        </div>
      </div>

      <div className="lr-content">
        <div className="lr-canvas-wrapper">
          <svg
            width={canvasWidth}
            height={canvasHeight}
            onClick={handleCanvasClick}
            className="lr-canvas"
          >
            <rect
              width={canvasWidth}
              height={canvasHeight}
              fill="#1a1a2e"
              stroke="#4ecca3"
              strokeWidth="2"
            />

            {/* Grid */}
            {Array.from({ length: 10 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={(i + 1) * (canvasWidth / 10)}
                  y1="0"
                  x2={(i + 1) * (canvasWidth / 10)}
                  y2={canvasHeight}
                  stroke="#2a2a3e"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={(i + 1) * (canvasHeight / 10)}
                  x2={canvasWidth}
                  y2={(i + 1) * (canvasHeight / 10)}
                  stroke="#2a2a3e"
                  strokeWidth="1"
                />
              </React.Fragment>
            ))}

            {/* Points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#4ecca3"
                stroke="#fff"
                strokeWidth="2"
              />
            ))}

            {/* Regression Line */}
            {showLine && (
              <line
                x1="0"
                y1={intercept}
                x2={canvasWidth}
                y2={slope * canvasWidth + intercept}
                stroke="#ff6b6b"
                strokeWidth="3"
                strokeDasharray={isTraining ? "5,5" : "0"}
              />
            )}
          </svg>
        </div>

        <div className="lr-controls">
          <div className="control-group">
            <h3>Actions</h3>
            <button onClick={handleCanvasClick} disabled={isTraining}>
              Add Points (Click Canvas)
            </button>
            <button onClick={generateRandomPoints} disabled={isTraining}>
              Generate Random Points
            </button>
            <button
              onClick={calculateLinearRegression}
              disabled={points.length < 2 || isTraining}
            >
              Calculate (Closed Form)
            </button>
            <button
              onClick={trainGradientDescent}
              disabled={points.length < 2 || isTraining}
            >
              {isTraining ? "Training..." : "Train (Gradient Descent)"}
            </button>
            <button onClick={clearCanvas} disabled={isTraining}>
              Clear Canvas
            </button>
          </div>

          <div className="control-group">
            <h3>Parameters</h3>
            <label>
              Learning Rate: {learningRate.toFixed(3)}
              <input
                type="range"
                min="0.001"
                max="0.1"
                step="0.001"
                value={learningRate}
                onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                disabled={isTraining}
              />
            </label>
          </div>

          <div className="control-group">
            <h3>Model Info</h3>
            <div className="info-item">
              <span>Points:</span>
              <span>{points.length}</span>
            </div>
            <div className="info-item">
              <span>Slope (m):</span>
              <span>{slope.toFixed(4)}</span>
            </div>
            <div className="info-item">
              <span>Intercept (b):</span>
              <span>{intercept.toFixed(4)}</span>
            </div>
            {epoch > 0 && (
              <>
                <div className="info-item">
                  <span>Epoch:</span>
                  <span>{epoch}</span>
                </div>
                <div className="info-item">
                  <span>Loss (MSE):</span>
                  <span>{loss.toFixed(4)}</span>
                </div>
              </>
            )}
          </div>

          <div className="control-group">
            <h3>Equation</h3>
            <div className="equation">
              {showLine ? (
                <code>
                  y = {slope.toFixed(2)}x {intercept >= 0 ? "+" : ""}
                  {intercept.toFixed(2)}
                </code>
              ) : (
                <code>No model yet</code>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lr-info">
        <h3>About Linear Regression</h3>
        <p>
          Linear Regression is a fundamental machine learning algorithm that
          finds the best-fitting straight line through a set of points. It
          models the relationship between variables using the equation: y = mx +
          b
        </p>
        <ul>
          <li>
            <strong>Closed Form:</strong> Calculates the optimal line instantly
            using mathematical formulas
          </li>
          <li>
            <strong>Gradient Descent:</strong> Iteratively adjusts the line to
            minimize error over multiple epochs
          </li>
          <li>
            <strong>Loss (MSE):</strong> Mean Squared Error measures how well
            the line fits the data
          </li>
        </ul>
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "Linear Regression - Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={pseudocode}
              title="Linear Regression Algorithm"
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

export default LinearRegression
