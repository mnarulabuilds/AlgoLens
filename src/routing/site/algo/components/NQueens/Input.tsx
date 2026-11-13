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

interface QueensInputProps {
  onQueens: (size: number) => void
}

const QueensInput = React.memo(({ onQueens }: QueensInputProps) => {
  const [input, setInput] = useState(null)

  const handleSubmit = () => {
    onQueens(parseInt(input))
    setInput(null)
  }

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Queens on Board</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Number of rows or columns of square board N X N</CardTitle>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>Input Value</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            placeholder="Number of Queens on Board ( 1 to 16 )"
            onChange={(event) => setInput(event.target.value)}
            value={input || ""}
          />
        </InputGroup>
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </CardBody>
    </Card>
  )
})

QueensInput.displayName = "NQueens.Input"

export default QueensInput
