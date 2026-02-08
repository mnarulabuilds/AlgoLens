import React, { useState } from "react"
import { Card, CardBody, CardHeader, CardTitle, Button } from "reactstrap"

const Shuffle = ({ parent }) => {
  const [shuffle, setShuffle] = useState(false)

  return (
    <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
      <CardHeader>Knuths Shuffle</CardHeader>
      <CardBody className="text-center">
        <CardTitle>Shuffle (or reset) Array Randomly and Uniformly</CardTitle>
        <br />
        <Button
          disabled={parent.state.disabled}
          onClick={() => {
            parent.shuffle()
            setShuffle(true)
          }}
        >
          Shuffle
        </Button>
        {shuffle && (
          <Button
            disabled={parent.state.disabled}
            onClick={() => {
              parent.reset()
              setShuffle(false)
            }}
          >
            Reset
          </Button>
        )}
      </CardBody>
    </Card>
  )
}

export default Shuffle
