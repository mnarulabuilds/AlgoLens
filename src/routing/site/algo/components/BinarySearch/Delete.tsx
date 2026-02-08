import React, { useState } from "react"
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap"
import { MdExpandMore } from "react-icons/md"

const Delete = React.memo(({ parent, alertId }) => {
  const [data, setData] = useState(null)
  const [position, setPosition] = useState(null)

  const handlePositionChange = (event) => {
    setPosition(event.target.value)
    setData(null)
  }

  const handleDataChange = (event) => {
    setData(event.target.value)
    setPosition(null)
  }

  const handleSubmit = () => {
    parent.deleteItem(data, parseFloat(position))
    setData(null)
    setPosition(null)
  }

  return (
    <div className="accordion" id={`accordion-delete-${alertId}`}>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-delete-${alertId}`}
          >
            Delete based on Position or Value
            <MdExpandMore className="ms-2" />
          </button>
        </h2>
        <div
          id={`collapse-delete-${alertId}`}
          className="accordion-collapse collapse"
          data-bs-parent={`#accordion-delete-${alertId}`}
        >
          <div className="accordion-body">
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
                disabled={data}
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
                disabled={position}
                value={data ?? ""}
              />
            </InputGroup>
            <button
              className="btn mt-4"
              style={{ backgroundColor: "#403d4a", color: "white" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

Delete.displayName = "BinarySearch.Delete"

export default Delete
