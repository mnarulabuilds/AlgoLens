import React, { useState, useEffect, useRef, useCallback } from "react"

import Canvas from "routing/site/algo/components/ClosestPair/Canvas"
import Run from "routing/site/algo/components/ClosestPair/Run"
import { Alert } from "reactstrap"
import useWindowDimensions from "common/helpers/dimensions"

const ClosestPair = () => {
  const [points, setPoints] = useState([])
  const [clickable, setClickable] = useState(true)
  const [alert, setAlert] = useState(null)
  const canvasRef = useRef(null)
  const { width: innerWidth } = useWindowDimensions()

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const drawPoints = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#ff2626" // Red color
    points.forEach((p) => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2, true)
      ctx.fill()
      ctx.font = "15px Arial"
      ctx.fillText(`( ${p.x} , ${p.y} )`, p.x + 6, p.y + 6)
    })
  }, [points])

  const drawLine = useCallback((p, q, stroke) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = stroke
    ctx.setLineDash([2, 2])
    ctx.beginPath()
    ctx.moveTo(p.x, p.y)
    ctx.lineTo(q.x, q.y)
    ctx.stroke()
  }, [])

  const drawVerticalLine = useCallback((x, color = "#0000ff") => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.strokeStyle = color
    ctx.setLineDash([5, 5])
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
    ctx.lineWidth = 1
    ctx.setLineDash([2, 2])
  }, [])

  const plot = useCallback(
    (i, j, shortest = null) => {
      if (i >= points.length - 1) {
        clearCanvas()
        drawPoints()
        if (shortest) {
          drawLine(shortest.start, shortest.end, "#ff2626")
        }
        setClickable(true)
        return
      }
      if (j >= points.length) {
        setTimeout(() => plot(i + 1, i + 2, shortest), 2000)
        return
      }
      clearCanvas()
      drawPoints()
      drawLine(points[i], points[j], "#000000")

      const length =
        (points[j].x - points[i].x) ** 2 + (points[j].y - points[i].y) ** 2
      if (!shortest || length < shortest.length) {
        shortest = {
          start: { x: points[i].x, y: points[i].y },
          end: { x: points[j].x, y: points[j].y },
          length: length,
        }
      }

      if (shortest) {
        drawLine(shortest.start, shortest.end, "#ff2626")
      }

      setTimeout(() => plot(i, j + 1, shortest), 1200)
    },
    [points, drawLine, clearCanvas, drawPoints]
  )

  // Helper function to calculate distance between two points
  const distance = useCallback((p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  }, [])

  // Helper function to find closest pair by brute force (for small arrays)
  const bruteForce = useCallback(
    (pointsArr) => {
      let minDist = Infinity
      let pair = null
      const n = pointsArr.length

      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dist = distance(pointsArr[i], pointsArr[j])
          if (dist < minDist) {
            minDist = dist
            pair = { start: pointsArr[i], end: pointsArr[j], length: minDist }
          }
        }
      }
      return pair
    },
    [distance]
  )

  // Helper function to find closest pair in strip
  const stripClosest = useCallback(
    (strip, d, currentPair) => {
      let minDist = d
      let pair = currentPair

      // Sort strip by y-coordinate
      strip.sort((a, b) => a.y - b.y)

      for (let i = 0; i < strip.length; i++) {
        for (
          let j = i + 1;
          j < strip.length && strip[j].y - strip[i].y < minDist;
          j++
        ) {
          const dist = distance(strip[i], strip[j])
          if (dist < minDist) {
            minDist = dist
            pair = { start: strip[i], end: strip[j], length: minDist }
          }
        }
      }
      return pair
    },
    [distance]
  )

  // Divide and Conquer algorithm with visualization
  const closestPairRecursive = useCallback(
    async (pointsArr, visualSteps) => {
      const n = pointsArr.length

      // Base case: use brute force for small arrays
      if (n <= 3) {
        return bruteForce(pointsArr)
      }

      // Divide points into two halves
      const mid = Math.floor(n / 2)
      const midPoint = pointsArr[mid]

      // Visualize the division
      visualSteps.push({
        type: "divide",
        midX: midPoint.x,
        left: pointsArr.slice(0, mid),
        right: pointsArr.slice(mid),
      })

      // Recursively find closest pairs in both halves
      const leftPair = await closestPairRecursive(
        pointsArr.slice(0, mid),
        visualSteps
      )
      const rightPair = await closestPairRecursive(
        pointsArr.slice(mid),
        visualSteps
      )

      // Find the smaller of two
      let minPair = leftPair
      if (rightPair && (!leftPair || rightPair.length < leftPair.length)) {
        minPair = rightPair
      }

      const d = minPair ? minPair.length : Infinity

      // Build strip of points within distance d of the dividing line
      const strip = pointsArr.filter((p) => Math.abs(p.x - midPoint.x) < d)

      visualSteps.push({
        type: "strip",
        midX: midPoint.x,
        strip: strip,
        currentBest: minPair,
        stripWidth: d,
      })

      // Find closest pair in strip
      const stripPair = stripClosest(strip, d, minPair)

      // Return the closest pair found
      return stripPair || minPair
    },
    [bruteForce, stripClosest]
  )

  // Animated visualization for divide and conquer
  const plotFast = useCallback(async () => {
    // Sort points by x-coordinate
    const sortedPoints = [...points].sort((a, b) => a.x - b.x)
    const visualSteps = []

    // Run the divide and conquer algorithm
    const result = await closestPairRecursive(sortedPoints, visualSteps)

    // Animate the visualization steps
    let stepIndex = 0

    const animateStep = () => {
      if (stepIndex >= visualSteps.length) {
        // Show final result
        clearCanvas()
        drawPoints()
        if (result) {
          drawLine(result.start, result.end, "#ff2626")
        }
        setClickable(true)
        return
      }

      const step = visualSteps[stepIndex]
      clearCanvas()
      drawPoints()

      if (step.type === "divide") {
        // Draw dividing line
        drawVerticalLine(step.midX, "#0000ff")
      } else if (step.type === "strip") {
        // Draw strip region
        drawVerticalLine(step.midX, "#0000ff")
        if (step.stripWidth && step.stripWidth !== Infinity) {
          drawVerticalLine(step.midX - step.stripWidth, "#00ff00")
          drawVerticalLine(step.midX + step.stripWidth, "#00ff00")
        }
        // Draw current best pair
        if (step.currentBest) {
          drawLine(step.currentBest.start, step.currentBest.end, "#ff6600")
        }
      }

      stepIndex++
      setTimeout(animateStep, 600)
    }

    animateStep()
  }, [
    points,
    closestPairRecursive,
    clearCanvas,
    drawPoints,
    drawLine,
    drawVerticalLine,
  ])

  const find = useCallback(
    (speed) => {
      if (points.length < 2) {
        setAlert({
          text: "Not enough points on canvas",
          type: "info",
        })
        return
      }
      if (speed.toLowerCase() === "slow") {
        setClickable(false)
        setAlert(null)
        plot(0, 1)
      } else if (speed.toLowerCase() === "fast") {
        setClickable(false)
        setAlert(null)
        plotFast()
      }
    },
    [points, plot, plotFast]
  )

  useEffect(() => {
    canvasRef.current = document.getElementById("pointsCanvas")
  }, [])

  useEffect(() => {
    drawPoints()
  }, [points])

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <div className="mt-2" style={{ width: "100%" }}>
          {alert && (
            <Alert
              color={alert.type}
              isOpen={!!alert.text}
              toggle={() => setAlert(null)}
            >
              {alert.text}
            </Alert>
          )}
          <Run find={find} />
        </div>
        <div className="m-2" style={{ width: "100%" }}>
          <h3 className="p-2">Click in the canvas below to draw points</h3>
          <Canvas
            id="pointsCanvas"
            clickable={clickable}
            width={`${innerWidth - 48}`}
            height="400"
            addPoints={(p) => {
              if (clickable) {
                setPoints((prevPoints) => [...prevPoints, p])
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ClosestPair
