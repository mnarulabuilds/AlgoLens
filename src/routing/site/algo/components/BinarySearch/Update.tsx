import React, { useState } from "react"
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Button,
} from "reactstrap"
import { MdExpandMore } from "react-icons/md"
import "./BinarySearch.css"

const Update = React.memo(({ parent, alertId }) => {
  const [data, setData] = useState(null)
  const [position, setPosition] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
  }

  const handleDataChange = (event) => {
    setData(event.target.value)
  }

  const handleSubmit = () => {
    parent.update(parseFloat(position), data)
    setPosition(null)
    setData(null)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="accordion-container">
      <div className="accordion-summary" onClick={toggleExpanded}>
        <span>Update Value at Position</span>
        <MdExpandMore
          className={`expand-icon ${isExpanded ? "expanded" : ""}`}
        />
      </div>
      {isExpanded && (
        <div className="accordion-details">
          {parent.alert && parent.alert.alertId === alertId && (
            <Alert
              color={parent.alert.type}
              isOpen={!!parent.alert.text}
              toggle={() => {
                parent.setAlert(null)
              }}
            >
              {parent.alert.text}
            </Alert>
          )}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Position</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              placeholder="Position (0-based)"
              onChange={handlePositionChange}
              value={position ?? ""}
            />
          </InputGroup>
          <InputGroup className="mt-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Value</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              placeholder="Value"
              onChange={handleDataChange}
              value={data ?? ""}
            />
          </InputGroup>
          <Button
            className="mt-4"
            style={{ backgroundColor: "#403d4a", color: "white" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  )
})

Update.displayName = "BinarySearch.Update"

export default Update
