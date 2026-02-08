import React, { useState } from "react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap"

const Range = React.memo(({ handleRangeSubmit }) => {
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  const handleSubmit = () => {
    handleRangeSubmit(parseInt(start), parseInt(end))
    setStart(null)
    setEnd(null)
  }

  return (
    <Card>
      <CardHeader>
        <h5 className="text-primary mb-1">Primes in Range</h5>
        <p className="text-secondary mb-0">
          Find primes from start to end number in range
        </p>
      </CardHeader>
      <CardBody style={{ display: "flex", flexDirection: "column" }}>
        <FormGroup>
          <Label for="startRange">Start of Range</Label>
          <Input
            type="number"
            id="startRange"
            onChange={(event) => setStart(event.target.value)}
            value={start ?? ""}
          />
        </FormGroup>
        <FormGroup className="mt-2">
          <Label for="endRange">End of Range</Label>
          <Input
            type="number"
            id="endRange"
            onChange={(event) => setEnd(event.target.value)}
            value={end ?? ""}
          />
        </FormGroup>
        <Button
          style={{
            marginTop: 12,
            backgroundColor: "#403d4a",
            color: "white",
          }}
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </CardBody>
    </Card>
  )
})

Range.displayName = "Range"

export default Range
