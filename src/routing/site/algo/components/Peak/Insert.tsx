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
  DropdownItem,
  DropdownMenu,
} from "reactstrap"

const Insert = React.memo(({ insert }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [data, setData] = useState("")
  const [where, setWhere] = useState("Start")

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen)

  const handleSubmit = () => {
    insert(Number(data), where)
    setData("")
  }

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Insert</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Enter data</CardTitle>
        <br />
        <InputGroup>
          <Input onChange={(e) => setData(e.target.value)} value={data} />
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
        <Button onClick={handleSubmit}>Submit</Button>
      </CardBody>
    </Card>
  )
})

Insert.displayName = "Peak.Insert"

export default Insert
