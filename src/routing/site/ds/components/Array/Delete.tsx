import React, { useState, useCallback } from "react"
import {
  InputGroupText,
  InputGroupAddon,
  InputGroup,
  Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert,
} from "reactstrap"
import { MdExpandMore } from "react-icons/md"

const Delete = ({ array, updateState, alertId }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [data, setData] = useState(null)
  const [where, setWhere] = useState(0)
  const [alert, setAlert] = useState(null)
  const posOptions = ["Select", "Start", "End"]

  const toggleDropDown = useCallback(() => {
    setDropdownOpen((prevState) => !prevState)
  }, [])

  const deleteElement = useCallback(() => {
    let newArr = [...array]
    let exists = newArr.length > 0
    let present

    if (data) {
      present = exists && !!newArr.find((value) => value === data)
      newArr = newArr.filter((value) => value !== data)
    } else {
      switch (posOptions[where].toLowerCase()) {
        case "start":
          newArr.splice(0, 1)
          break
        case "end":
          newArr.splice(newArr.length - 1, 1)
          break
        default:
          present = exists = false
      }
    }

    setAlert({
      text: present
        ? "Deleted Successfully"
        : exists
        ? "Value not present"
        : "Delete operation is invalid",
      type: present ? "success" : exists ? "warning" : "danger",
      alertId: 2,
    })

    updateState({ array: newArr, highlights: [] })
  }, [array, data, posOptions, where, updateState])

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
            Delete Element (Position or Value)
            <MdExpandMore className="ms-2" />
          </button>
        </h2>
        <div
          id={`collapse-delete-${alertId}`}
          className="accordion-collapse collapse"
          data-bs-parent={`#accordion-delete-${alertId}`}
        >
          <div className="accordion-body">
            {alert && alert.alertId === alertId && (
              <Alert
                color={alert.type}
                isOpen={!!alert.text}
                toggle={() => {
                  setAlert(null)
                }}
              >
                {alert.text}
              </Alert>
            )}
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Position</InputGroupText>
              </InputGroupAddon>
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={dropdownOpen}
                toggle={toggleDropDown}
              >
                <DropdownToggle caret>{posOptions[where]}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setWhere(0)}>
                    Select
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => setWhere(1)}>Start</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => setWhere(2)}>End</DropdownItem>
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </InputGroup>
            <span className="m-2">Or</span>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>Value</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Value"
                onChange={(event) => {
                  setData(event.target.value)
                  setWhere(0)
                }}
                disabled={!!where}
                value={data ?? ""}
              />
            </InputGroup>
            <button
              className="btn mt-4"
              style={{ backgroundColor: "#403d4a", color: "white" }}
              onClick={() => {
                deleteElement()
                setData(null)
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
