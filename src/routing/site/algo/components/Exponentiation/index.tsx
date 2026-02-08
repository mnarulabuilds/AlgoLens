import React, { useState, useCallback, useEffect, lazy } from "react"
import { Row, Col } from "reactstrap"
import { FaEquals, FaTimes } from "react-icons/fa"
import Input from "./Input"

const Element = lazy(() => import("common/components/Element"))

const Exponent = () => {
  const [state, setState] = useState({
    result: [],
    base: null,
    power: null,
    disabled: false,
    ans: null,
  })

  const calculatePower = useCallback((currentPower) => {
    setState((prevState) => {
      const newResult = []
      for (let p = 0; p < currentPower - 1; p += 2) {
        newResult.push(prevState.result[p] * prevState.result[p + 1])
      }
      if (currentPower % 2 === 1) {
        newResult.push(prevState.result[currentPower - 1])
      }

      const isFinal = newResult.length === 1
      return {
        ...prevState,
        result: newResult,
        disabled: !isFinal,
        ans: isFinal ? newResult[0] : prevState.ans,
      }
    })
  }, [])

  useEffect(() => {
    if (state.disabled && state.result.length > 0) {
      const timer = setTimeout(() => {
        calculatePower(Math.ceil(state.result.length))
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [state.disabled, state.result])

  const expo = useCallback((base, power) => {
    if (power === 0) {
      setState({ result: [], base, power, disabled: false, ans: 1 })
      return
    }

    const initialResult = Array(power).fill(base)
    setState({
      result: initialResult,
      base,
      power,
      disabled: true,
      ans: null,
    })
    setTimeout(() => {
      calculatePower(power)
    }, 500)
  }, [])

  const { result, base, power, disabled, ans } = state

  return (
    <Row>
      <Col xs={12} sm={6} className="text-center m-4">
        <Input disabled={disabled} expo={expo} />
      </Col>
      {(disabled || ans !== null) && (
        <Col xs={12} sm={4} className="text-center m-4">
          {base !== null && power !== null && (
            <>
              <Element
                highlight={true}
                data={{ value: `${base} ^ ${power}` }}
                type="array"
              />
              <FaEquals style={{ margin: "auto 5px" }} />
            </>
          )}
          {result.length >= 1 &&
            disabled &&
            result.map((value, index) => (
              <React.Fragment key={`res_mul_val_${index}`}>
                {index > 0 && <FaTimes style={{ margin: "auto 5px" }} />}
                <Element
                  key={`val_${index}`}
                  highlight={result.length === 1}
                  data={{ value }}
                  type="array"
                />
              </React.Fragment>
            ))}
          {!disabled && ans !== null && (
            <Element
              key="result"
              highlight={true}
              data={{ value: ans }}
              type="array"
            />
          )}
        </Col>
      )}
    </Row>
  )
}

export default Exponent
