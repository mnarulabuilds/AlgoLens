import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const CanvasContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #000;
`

const PLANE_HALF_LENGTH = 100

const InclinedPlane = ({ angle, initialPosition }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const width = canvas.width
    const height = canvas.height

    const drawInclinedPlane = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate((-angle * Math.PI) / 180)

      ctx.beginPath()
      ctx.moveTo(-PLANE_HALF_LENGTH, 0)
      ctx.lineTo(PLANE_HALF_LENGTH, 0)
      ctx.lineWidth = 4
      ctx.strokeStyle = "#000"
      ctx.stroke()

      ctx.restore()
    }

    const randomGradient = (size) => {
      const gradient = ctx.createLinearGradient(-size, 0, size, 0)
      gradient.addColorStop(0, "royalblue")
      gradient.addColorStop(1, "#FFFFFF")
      return gradient
    }

    const drawRollingBall = (x, y, rotationAngle) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotationAngle)
      ctx.beginPath()
      ctx.arc(0, 0, 15, 0, 2 * Math.PI)
      ctx.fillStyle = randomGradient(15)
      ctx.fill()
      ctx.lineWidth = 2
      ctx.strokeStyle = "#000"
      ctx.stroke()
      ctx.restore()
    }

    const drawForces = (x, y) => {
      ctx.save()
      ctx.strokeStyle = "red"
      ctx.lineWidth = 2

      // Gravity force
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x, y + 40)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x - 5, y + 35)
      ctx.lineTo(x, y + 40)
      ctx.lineTo(x + 5, y + 35)
      ctx.stroke()
      ctx.fillText("Gravity", x + 10, y + 45)

      // Normal force
      ctx.strokeStyle = "green"
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(
        x - 40 * Math.sin((angle * Math.PI) / 180),
        y - 40 * Math.cos((angle * Math.PI) / 180)
      )
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(
        x -
          35 * Math.sin((angle * Math.PI) / 180) -
          5 * Math.cos((angle * Math.PI) / 180),
        y -
          35 * Math.cos((angle * Math.PI) / 180) +
          5 * Math.sin((angle * Math.PI) / 180)
      )
      ctx.lineTo(
        x - 40 * Math.sin((angle * Math.PI) / 180),
        y - 40 * Math.cos((angle * Math.PI) / 180)
      )
      ctx.lineTo(
        x -
          35 * Math.sin((angle * Math.PI) / 180) +
          5 * Math.cos((angle * Math.PI) / 180),
        y -
          35 * Math.cos((angle * Math.PI) / 180) -
          5 * Math.sin((angle * Math.PI) / 180)
      )
      ctx.stroke()
      ctx.fillText(
        "Normal",
        x - 50 * Math.sin((angle * Math.PI) / 180),
        y - 50 * Math.cos((angle * Math.PI) / 180)
      )

      const direction = initialPosition === "onGround" ? 1 : -1

      // Friction force
      ctx.strokeStyle = "orange"
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(
        x - direction * 40 * Math.cos((angle * Math.PI) / 180),
        y + direction * 40 * Math.sin((angle * Math.PI) / 180)
      )
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(
        x -
          direction * 35 * Math.cos((angle * Math.PI) / 180) -
          direction * 5 * Math.sin((angle * Math.PI) / 180),
        y +
          direction * 35 * Math.sin((angle * Math.PI) / 180) +
          direction * 5 * Math.cos((angle * Math.PI) / 180)
      )
      ctx.lineTo(
        x - direction * 40 * Math.cos((angle * Math.PI) / 180),
        y + direction * 40 * Math.sin((angle * Math.PI) / 180)
      )
      ctx.lineTo(
        x -
          direction * 35 * Math.cos((angle * Math.PI) / 180) +
          direction * 5 * Math.sin((angle * Math.PI) / 180),
        y +
          direction * 35 * Math.sin((angle * Math.PI) / 180) -
          direction * 5 * Math.cos((angle * Math.PI) / 180)
      )
      ctx.stroke()
      ctx.fillText(
        "Friction",
        x - direction * 50 * Math.cos((angle * Math.PI) / 180),
        y + direction * 50 * Math.sin((angle * Math.PI) / 180)
      )

      ctx.restore()
    }

    const animateRollingBall = () => {
      let speed = initialPosition === "onGround" ? 1 : -1

      const startX =
        width / 2 -
        speed * PLANE_HALF_LENGTH * Math.cos((angle * Math.PI) / 180)
      const startY =
        height / 2 +
        speed * PLANE_HALF_LENGTH * Math.sin((angle * Math.PI) / 180)
      const endX =
        width / 2 +
        speed * PLANE_HALF_LENGTH * Math.cos((angle * Math.PI) / 180)
      let rotationAngle = 0

      let ballX = startX
      let ballY = startY - 20
      let requestId

      const step = () => {
        drawInclinedPlane()
        drawRollingBall(ballX, ballY, rotationAngle)
        drawForces(ballX, ballY)

        ballX += speed * Math.cos((angle * Math.PI) / 180)
        ballY -= speed * Math.sin((angle * Math.PI) / 180)
        rotationAngle += 0.1 * speed

        if ((speed === 1 && ballX >= endX) || (speed === -1 && ballX <= endX)) {
          cancelAnimationFrame(requestId)
        } else {
          requestId = requestAnimationFrame(step)
        }
      }

      requestId = requestAnimationFrame(step)
      return () => cancelAnimationFrame(requestId)
    }

    drawInclinedPlane()
    animateRollingBall()
  }, [angle, initialPosition])

  return (
    <CanvasContainer>
      <canvas ref={canvasRef} width={400} height={400} />
    </CanvasContainer>
  )
}

export default InclinedPlane
