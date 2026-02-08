import React, { useEffect, useState, useRef } from "react"
import styled, { keyframes } from "styled-components"

const swing = keyframes`
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(-45deg); }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #f0f0f0;
`

const PendulumWrapper = styled.div`
  position: relative;
  height: 300px;
`

const Rod = styled.div`
  width: 2px;
  height: ${(props) => props.length}px;
  background: #333;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: top;
  animation: ${swing} ${(props) => props.speed}s infinite ease-in-out;
`

const Bob = styled.div`
  width: 30px;
  height: 30px;
  background: #3498db;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const Timer = styled.div`
  margin-top: 20px;
  font-size: 1.5rem;
  color: #333;
`

const Pendulum = ({ speed, length }) => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <Container>
      <PendulumWrapper>
        <Rod length={length} speed={speed}>
          <Bob />
        </Rod>
      </PendulumWrapper>
      <Timer>Time Elapsed: {timeElapsed} s</Timer>
    </Container>
  )
}

export default Pendulum
