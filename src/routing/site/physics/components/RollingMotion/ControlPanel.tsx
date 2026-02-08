import React from "react"
import styled from "styled-components"

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`

const Label = styled.label`
  margin: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: #333;
`

const Input = styled.input`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 60%;
  font-size: 1rem;
`

const Select = styled.select`
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 65%;
  font-size: 1rem;
`

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`

const ControlPanel = ({
  angle,
  setAngle,
  initialPosition,
  setInitialPosition,
}) => {
  const updateAngle = (e) => {
    const updatedAngle = Number(e.target.value)
    if (updatedAngle >= 0 && updatedAngle <= 90) setAngle(updatedAngle)
  }

  return (
    <Panel>
      <Label>
        Angle (0 to 90 degrees):
        <Input type="number" value={angle} onChange={updateAngle} />
      </Label>
      <Label>
        Initial Position:
        <Select
          value={initialPosition}
          onChange={(e) => setInitialPosition(e.target.value)}
        >
          <option value="onGround">Left</option>
          <option value="onPlane">Right</option>
        </Select>
      </Label>
      <div>
        <Button onClick={() => setAngle(30)}>Reset Angle</Button>
        <Button onClick={() => setInitialPosition("onPlane")}>
          Reset Position
        </Button>
      </div>
    </Panel>
  )
}

export default ControlPanel
