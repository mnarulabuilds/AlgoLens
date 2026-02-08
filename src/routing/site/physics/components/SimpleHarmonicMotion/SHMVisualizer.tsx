import React, { useState, useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"

// Constants
const SPRING_CONSTANT = 0.5 // Assuming some constant for spring

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: #e0f7fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const BlockAnimation = (amplitude) => keyframes`
  0% { transform: translateX(${amplitude}px); }
  50% { transform: translateX(-${amplitude}px); }
  100% { transform: translateX(${amplitude}px); }
`

const Block = styled.div`
  width: 50px;
  height: 50px;
  background-color: #3498db;
  border-radius: 5px;
  position: relative;
  animation: ${({ amplitude }) => BlockAnimation(amplitude)}
    ${({ period }) => period}s linear infinite;
`

const Info = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
`

const SHMVisualizer = ({ mass, springLength }) => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const amplitude = springLength // Amplitude can be the length of the spring
  const period = (2 * Math.PI) / Math.sqrt(SPRING_CONSTANT / mass) // Period of SHM
  const requestRef = useRef()

  // Time Elapsed Effect
  useEffect(() => {
    const start = Date.now()
    const animate = () => {
      setTimeElapsed((Date.now() - start) / 1000)
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [])

  return (
    <Container>
      <Block amplitude={amplitude} period={period} />
      <Info>Time Elapsed: {timeElapsed.toFixed(2)}s</Info>
    </Container>
  )
}

SHMVisualizer.propTypes = {
  mass: PropTypes.number.isRequired,
  springLength: PropTypes.number.isRequired,
}

export default SHMVisualizer
