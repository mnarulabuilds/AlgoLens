import React, { useState } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap"

const Delete = React.memo(({ deleteData }) => {
  const [data, setData] = useState("")
  const [position, setPosition] = useState("")

  const handleSubmit = () => {
    deleteData(Number(data), Number(position))
    setData("")
    setPosition("")
  }

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Delete</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Position or Value</CardTitle>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Position"
            onChange={(e) => {
              setPosition(e.target.value)
              setData("")
            }}
            value={position}
          />
        </InputGroup>
        <br />
        <span>Or</span>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Value</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Value"
            onChange={(e) => {
              setData(e.target.value)
              setPosition("")
            }}
            value={data}
          />
        </InputGroup>
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </CardBody>
    </Card>
  )
})

Delete.displayName = "Peak.Delete"

export default Delete
