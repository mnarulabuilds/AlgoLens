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

const Peak = React.memo(({ peak }) => {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  const handleSubmit = () => {
    peak(parseFloat(start), parseFloat(end))
    setStart("")
    setEnd("")
  }

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Peak</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Any One Peak inside Range</CardTitle>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Start</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Start"
            onChange={(e) => setStart(e.target.value)}
            value={start}
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>End</InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="End"
            onChange={(e) => setEnd(e.target.value)}
            value={end}
          />
        </InputGroup>
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </CardBody>
    </Card>
  )
})

Peak.displayName = "Peak.Peak"

export default Peak
