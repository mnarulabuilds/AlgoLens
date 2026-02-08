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

const Delete = ({ parent }) => {
  const [data, setData] = useState(null)
  const [position, setPosition] = useState(null)

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
            disabled={parent.state.disabled}
            placeholder="Position"
            onChange={(event) => {
              setPosition(event.target.value)
              setData(null)
            }}
            value={position || ""}
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
            disabled={parent.state.disabled}
            placeholder="Value"
            onChange={(event) => {
              setData(event.target.value)
              setPosition(null)
            }}
            value={data || ""}
          />
        </InputGroup>
        <br />
        <Button
          disabled={parent.state.disabled}
          onClick={() => {
            parent.delete(data, position)
            setData(null)
            setPosition(null)
          }}
        >
          Submit
        </Button>
      </CardBody>
    </Card>
  )
}

export default Delete
