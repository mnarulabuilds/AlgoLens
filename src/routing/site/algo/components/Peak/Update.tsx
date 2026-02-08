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

const Update = React.memo(({ update }) => {
  const [data, setData] = useState("")
  const [position, setPosition] = useState("")

  const handleSubmit = () => {
    update(Number(position), Number(data))
    setData("")
    setPosition("")
  }

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Update</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Value at Position</CardTitle>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            placeholder="Position"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Value</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Value"
            onChange={(e) => setData(e.target.value)}
            value={data}
          />
        </InputGroup>
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </CardBody>
    </Card>
  )
})

Update.displayName = "Peak.Update"

export default Update
