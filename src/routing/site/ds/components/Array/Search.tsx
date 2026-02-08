import React, { useState, useCallback } from "react"
import {
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap"
import { MdExpandMore } from "react-icons/md"

const Search = ({ array, updateState, alertId }) => {
  const [data, setData] = useState(null)
  const [alert, setAlert] = useState(null)

  const search = useCallback(() => {
    if (data) {
      const highlights = array
        .map((value, index) => (value === data ? index : -1))
        .filter((index) => index !== -1)
      const foundMatches = highlights.length > 0
      setAlert({
        text: foundMatches
          ? "Searched values are highlighted"
          : "No matches found",
        type: "success",
        alertId: 4,
      })
      updateState({ highlights })
    } else {
      setAlert({ text: "Empty Search", type: "danger", alertId: 4 })
    }
  }, [array, data, updateState])

  return (
    <div className="accordion" id={`accordion-search-${alertId}`}>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-search-${alertId}`}
          >
            Search Element (Value at Position)
            <MdExpandMore className="ms-2" />
          </button>
        </h2>
        <div
          id={`collapse-search-${alertId}`}
          className="accordion-collapse collapse"
          data-bs-parent={`#accordion-search-${alertId}`}
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
                <InputGroupText>Value</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Value"
                onChange={(event) => setData(event.target.value)}
                value={data ?? ""}
              />
            </InputGroup>
            <button
              className="btn mt-4"
              style={{ backgroundColor: "#403d4a", color: "white" }}
              onClick={() => {
                search()
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

export default Search
