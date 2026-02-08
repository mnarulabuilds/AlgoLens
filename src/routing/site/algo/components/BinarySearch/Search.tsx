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

const Search = React.memo(({ parent, alertId }) => {
  const [data, setData] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputChange = (event) => {
    setData(event.target.value)
  }

  const handleSubmit = () => {
    parent.search(data)
    setData(null)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="accordion-container">
      <div className="accordion-summary" onClick={toggleExpanded}>
        <span>Search a Value</span>
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
              <InputGroupText>Value</InputGroupText>
            </InputGroupAddon>
            <Input
              type="number"
              placeholder="Value"
              onChange={handleInputChange}
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

Search.displayName = "BinarySearch.Search"

export default Search
