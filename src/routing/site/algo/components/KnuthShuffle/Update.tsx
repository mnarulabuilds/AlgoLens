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
} from "common/components/Ui"

const Update = ({ parent }) => {
  const [data, setData] = useState(null)
  const [position, setPosition] = useState(null)

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Update</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Value at Position</CardTitle>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
          <Input
            disabled={parent.state.disabled}
            type="number"
            placeholder="Position"
            onChange={(event) => setPosition(event.target.value)}
            value={position || ""}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>Value</InputGroupText>
          </InputGroupAddon>
          <Input
            disabled={parent.state.disabled}
            placeholder="Value"
            onChange={(event) => setData(event.target.value)}
            value={data || ""}
          />
        </InputGroup>
        <br />
        <Button
          disabled={parent.state.disabled}
          onClick={() => {
            parent.update(position, data)
            setPosition(null)
            setData(null)
          }}
        >
          Submit
        </Button>
      </CardBody>
    </Card>
  )
}

export default Update
