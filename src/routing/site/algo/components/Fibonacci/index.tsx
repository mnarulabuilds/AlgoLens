import React, { useState, lazy, useEffect } from "react"
import { Alert, Row, Col } from "common/components/Ui"
import HorizontalVirtualList from "common/components/HorizontalVirtualList"
import Input from "./Input"
import useWindowDimensions from "common/helpers/dimensions"

const LazyElement = lazy(() => import("common/components/Element"))

const Fibonacci = () => {
  const [input, setInput] = useState<number | null>(null)
  const [sequence, setSequence] = useState<number[]>([])
  const [disabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState<{ text: string; type: string } | null>(
    null
  )

  const updateSequence = (delay: number) => {
    setTimeout(() => {
      setSequence((prevSequence) => {
        return prevSequence.concat([
          prevSequence[prevSequence.length - 1] +
            prevSequence[prevSequence.length - 2],
        ])
      })
    }, delay)
  }

  const generateSequence = (input: number) => {
    if (input < 2) {
      setAlert({
        text: "Input should be greater than 2",
        type: "danger",
      })
    } else {
      setInput(input)
      setDisabled(true)
      setAlert(null)
      setSequence([0, 1])
      for (let num = 2; num <= input; ++num) {
        updateSequence(num * 100)
      }
    }
  }

  useEffect(() => {
    if (sequence.length === parseInt(String(input))) {
      setAlert({
        text: "Sequence has been generated",
        type: "success",
      })
      setDisabled(false)
    }
  }, [sequence.length, input])

  return (
    <div className="container">
      {alert && (
        <Row>
          <Col xs={12}>
            <Alert
              color={alert.type}
              isOpen={!!alert.text}
              toggle={() => setAlert(null)}
            >
              {alert.text}
            </Alert>
          </Col>
        </Row>
      )}
      <Row className="text-center">
        <Col xs={12}>
          <Input generateSequence={generateSequence} disabled={disabled} />
        </Col>
      </Row>

      {parseInt(String(input)) >= 2 && sequence.length > 0 && (
        <Row className="text-center mt-4 mb-4">
          <LazyList sequence={sequence} />
        </Row>
      )}
    </div>
  )
}

const LazyList = ({ sequence }: { sequence: number[] }) => {
  const { width: innerWidth } = useWindowDimensions()

  return (
    <HorizontalVirtualList
      height={120}
      itemCount={sequence.length}
      itemSize={400}
      width={innerWidth || 800}
      renderItem={(index) => (
        <Col xs={12} className="align-items-center">
          <LazyElement
            data={{ value: sequence[index], index }}
            highlight={index === sequence.length - 1}
            type="array"
          />
        </Col>
      )}
    />
  )
}

export default Fibonacci
