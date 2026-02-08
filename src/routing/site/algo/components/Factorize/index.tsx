import React, { useState, lazy, useCallback, useMemo } from "react"
import { FaEquals, FaCircle } from "react-icons/fa"
import { Alert, Row, Col } from "reactstrap"
import { FixedSizeList as List } from "react-window"
import Input from "./Input"
import useWindowDimensions from "common/helpers/dimensions"

const LazyElement = lazy(() => import("common/components/Element"))

const Factorize = () => {
  const [input, setInput] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [alert, setAlert] = useState(null)

  const factorize = useCallback((number) => {
    setDisabled(true)
    if (number < 0 || !Number.isInteger(number)) {
      setAlert({
        type: "danger",
        text: "Factors will be shown for only whole numbers",
      })
      setDisabled(false)
      return []
    }
    if (number <= 1) {
      setAlert({
        type: "success",
        text: "Factors are shown in sorted order",
      })
      setDisabled(false)
      return [number] // Handle edge cases for 0 and 1
    }

    const factors = []

    // Check odd numbers from 3 onwards
    for (let i = 2; i * i <= number; i++) {
      if (number % i === 0) {
        factors.push(i)
        if (i !== number / i) {
          factors.push(number / i)
        }
      }
    }

    factors.push(1)
    if (number !== 1) {
      factors.push(number)
    }

    factors.sort((a, b) => a - b)
    setAlert({
      type: "success",
      text: "Factors are shown in sorted order",
    })
    setDisabled(false)
    return factors
  }, [])

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
          <Input setData={setInput} disabled={disabled} />
        </Col>
      </Row>

      {parseInt(input) >= 0 && (
        <Row className="text-center mt-4 mb-4 align-items-center">
          <Col xs={4}>
            <LazyElement
              highlight={true}
              data={{ value: `Factors(${input})` }}
              type="array"
            />
          </Col>
          <Col xs={2}>
            <FaEquals style={{ margin: "auto 5px" }} />
          </Col>
          <Col xs={6}>
            <LazyList factorize={factorize} input={input} />
          </Col>
        </Row>
      )}
    </div>
  )
}

const LazyList = ({ input, factorize }) => {
  const factors = useMemo(() => factorize(input), [input])
  const { width: innerWidth } = useWindowDimensions()

  return (
    <List
      height={120}
      itemCount={factors.length}
      itemSize={240}
      width={innerWidth * 0.5}
      direction="horizontal"
    >
      {({ index, style }) => (
        <Row style={style} className="align-items-center">
          <Col xs={6}>
            <LazyElement
              data={{ value: factors[index], index: index + 1 }}
              type="array"
            />
          </Col>
          {index < factors.length - 1 && (
            <Col xs={6}>
              <FaCircle style={{ margin: "auto 5px", alignSelf: "center" }} />
            </Col>
          )}
        </Row>
      )}
    </List>
  )
}

export default Factorize
