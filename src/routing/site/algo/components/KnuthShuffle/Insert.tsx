import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  InputGroup,
  Input,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

const Insert = ({ parent }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [data, setData] = useState(null)
  const [where, setWhere] = useState("Start")

  const toggleDropDown = () => setDropdownOpen((open) => !open)

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Insert</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Enter data</CardTitle>
        <br />
        <InputGroup>
          <Input
            disabled={parent.state.disabled}
            onChange={(event) => setData(event.target.value)}
            value={data || ""}
          />
          <InputGroupButtonDropdown
            addonType="append"
            isOpen={dropdownOpen}
            toggle={toggleDropDown}
          >
            <DropdownToggle caret>{where}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setWhere("Start")}>
                Start
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => setWhere("End")}>End</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
        <br />
        <Button
          disabled={parent.state.disabled}
          onClick={() => {
            parent.insert(data, where)
            setData(null)
          }}
        >
          Submit
        </Button>
      </CardBody>
    </Card>
  )
}

export default Insert
