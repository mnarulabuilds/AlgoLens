import React, { useState } from "react"
import styled from "styled-components"
import Draggable from "react-draggable"

const Canvas = styled.div`
  width: 100%;
  height: 80vh;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
`

const MirrorStyled = styled.div`
  width: 10px;
  height: 100px;
  background: #000;
  position: absolute;
`

const LensStyled = styled.div`
  width: 10px;
  height: 100px;
  background: rgba(0, 0, 255, 0.5);
  position: absolute;
`

const RayStyled = styled.div`
  position: absolute;
  width: 5px;
  background: yellow;
  height: ${(props) => props.length}px;
  transform: rotate(${(props) => props.angle}deg);
  transform-origin: top left;
`

const Panel = styled.div`
  width: 100%;
  height: 20vh;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`

const Button = styled.button`
  background: #fff;
  color: #333;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin: 5px;
`

const Mirror = () => <MirrorStyled />
const Lens = () => <LensStyled />

const Ray = ({ startX, startY, endX, endY }) => {
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)

  return (
    <RayStyled
      style={{ top: startY, left: startX }}
      angle={angle}
      length={length}
    />
  )
}

// Function to calculate intersection point of a ray with an element
const calculateIntersection = (rayStart, rayEnd, element) => {
  const { x: x1, y: y1 } = rayStart
  const { x: x2, y: y2 } = rayEnd
  const { x: x3, y: y3, width, height } = element

  const denominator =
    (x1 - x2) * (y3 - y3 + height) - (y1 - y2) * (x3 - x3 + width)
  if (denominator === 0) return null

  const t1 =
    ((x1 - x3) * (y3 - y3 + height) - (y1 - y3) * (x3 - x3 + width)) /
    denominator
  const t2 = ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator

  if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
    return {
      x: x1 + t1 * (x2 - x1),
      y: y1 + t1 * (y2 - y1),
    }
  }
  return null
}

// Function to calculate reflection or refraction of a ray at an element
const calculateReflectionOrRefraction = (ray, element) => {
  const { width, height } = element
  const { startX, startY, endX, endY } = ray

  // Calculate normal vector of the element
  const normalVector = {
    x: height === 0 ? 1 : 0,
    y: width === 0 ? 1 : 0,
  }

  // Calculate incident and reflected/refracted angles
  const incidentAngle = Math.atan2(endY - startY, endX - startX)
  const normalAngle = Math.atan2(normalVector.y, normalVector.x)
  const angleOfIncidence = incidentAngle - normalAngle
  const angleOfReflectionOrRefraction =
    element.type === "mirror"
      ? incidentAngle - 2 * angleOfIncidence
      : incidentAngle + 2 * angleOfIncidence

  // Calculate new endpoint based on angle of reflection/refraction
  const length = ray.length
  const newEndX = startX + length * Math.cos(angleOfReflectionOrRefraction)
  const newEndY = startY + length * Math.sin(angleOfReflectionOrRefraction)

  return {
    ...ray,
    endX: newEndX,
    endY: newEndY,
  }
}

// Function to check if a point is outside the canvas boundaries
const isOutsideCanvas = (x, y) => {
  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight
  return x < 0 || x > canvasWidth || y < 0 || y > canvasHeight
}

const calculateRay = (ray, elements) => {
  let newRay = { ...ray }
  let rayEndX = newRay.startX
  let rayEndY = newRay.startY

  for (let i = 0; i < 1000; i++) {
    // Adjust maximum iterations as needed
    const nextPoint = { x: rayEndX, y: rayEndY }

    elements.forEach((element) => {
      const intersection = calculateIntersection(
        { x: newRay.startX, y: newRay.startY },
        nextPoint,
        element
      )
      if (intersection) {
        newRay = calculateReflectionOrRefraction(newRay, element)
        rayEndX = newRay.endX
        rayEndY = newRay.endY
      }
    })

    // Update ray length
    newRay.length = Math.sqrt(
      (newRay.endX - newRay.startX) ** 2 + (newRay.endY - newRay.startY) ** 2
    )

    // Break loop if ray has reached maximum length or reached canvas boundaries
    if (
      newRay.length >= ray.length ||
      isOutsideCanvas(newRay.endX, newRay.endY)
    ) {
      break
    }
  }

  return newRay
}

const MirrorLensCanvas = ({ elements, rays, onDragElement, onDragRay }) => {
  return (
    <Canvas>
      {elements.map((el, index) => (
        <Draggable
          key={index}
          defaultPosition={{ x: el.x, y: el.y }}
          onStop={(e, data) => onDragElement(index, data.x, data.y)}
        >
          <div style={{ position: "absolute", top: 0, left: 0 }}>
            {el.type === "mirror" ? <Mirror /> : <Lens />}
          </div>
        </Draggable>
      ))}
      {rays.map((ray, index) => {
        const calculatedRay = calculateRay(ray, elements)
        return (
          <Draggable
            key={index}
            defaultPosition={{
              x: calculatedRay.startX,
              y: calculatedRay.startY,
            }}
            onStop={(e, data) => onDragRay(index, data.x, data.y)}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <Ray
                startX={calculatedRay.startX}
                startY={calculatedRay.startY}
                endX={calculatedRay.endX}
                endY={calculatedRay.endY}
              />
            </div>
          </Draggable>
        )
      })}
    </Canvas>
  )
}

const ControlPanel = ({ addElement, addRay }) => {
  return (
    <Panel>
      <Button onClick={() => addElement("mirror")}>Add Mirror</Button>
      <Button onClick={() => addElement("lens")}>Add Lens</Button>
      <Button onClick={addRay}>Add Ray</Button>
    </Panel>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

function App() {
  const [elements, setElements] = useState([])
  const [rays, setRays] = useState([])

  const addElement = (type) => {
    setElements([...elements, { type, x: 100, y: 100 }])
  }

  const onDragElement = (index, x, y) => {
    const updatedElements = [...elements]
    updatedElements[index] = { ...updatedElements[index], x, y }
    setElements(updatedElements)
  }

  const onDragRay = (index, x, y) => {
    const updatedRays = [...rays]
    const draggedRay = updatedRays[index]

    if (draggedRay) {
      const dx = x - draggedRay.startX
      const dy = y - draggedRay.startY

      updatedRays[index] = {
        ...draggedRay,
        startX: x,
        startY: y,
        endX: draggedRay.endX + dx,
        endY: draggedRay.endY + dy,
      }

      setRays(updatedRays)
    }
  }

  const addRay = () => {
    setRays([...rays, { startX: 200, startY: 100, endX: 200, endY: 300 }])
  }

  return (
    <AppContainer>
      <MirrorLensCanvas
        elements={elements}
        onDragElement={onDragElement}
        rays={rays}
        onDragRay={onDragRay}
      />
      <ControlPanel addElement={addElement} addRay={addRay} />
    </AppContainer>
  )
}

export default App
