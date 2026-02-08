import React, { lazy, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import Insert from "./Insert"
import Delete from "./Delete"
import Update from "./Update"
import Shuffle from "./Shuffle"

const Element = lazy(() => import("common/components/Element"))

const KnuthShuffle = () => {
  const [state, setState] = useState({
    original: [],
    array: [],
    highlights: [],
    disabled: false,
  })

  const insert = (data, where) => {
    if (data) {
      const arr = [...state.array]
      if (where.toLowerCase() === "start") {
        arr.unshift(data)
      } else {
        arr.push(data)
      }
      setState({ ...state, array: arr, highlights: [], original: arr })
    } else {
      alert("Submission is empty")
    }
  }

  const deleteData = (data, position) => {
    let arr = [...state.array]
    position = parseInt(position)
    if (data) {
      const filteredArr = arr.filter((value) => value !== data)
      if (filteredArr.length !== arr.length) {
        arr = filteredArr
        setState({ ...state, array: arr, highlights: [], original: arr })
      } else {
        alert("Data not found to delete")
      }
    } else if (position >= 0 && position < arr.length) {
      arr.splice(position, 1)
      setState({
        ...state,
        array: arr,
        highlights: [],
        original: arr,
      })
    } else {
      alert("Unable to delete")
    }
  }

  const update = (position, value) => {
    position = parseInt(position)
    if (position >= 0 && position < state.array.length && value) {
      const arr = [...state.array]
      arr[position] = value
      setState({ ...state, array: arr, highlights: [position], original: arr })
    } else {
      alert("Cannot update")
    }
  }

  const shuffle = (i = 0) => {
    if (i === state.array.length) {
      setState((prevState) => {
        return {
          ...prevState,
          highlights: [],
          disabled: false,
        }
      })
      return
    }

    setState((prevState) => {
      const array = [...prevState.array]
      const s = Math.floor(Math.random() * i)
      const t = array[s]
      array[s] = array[i]
      array[i] = t
      return {
        ...prevState,
        array,
        highlights: [s, i],
        disabled: true,
      }
    })

    setTimeout(() => shuffle(i + 1), 1000)
  }

  const reset = () => {
    if (state.array.length > 0) {
      setState({ ...state, array: [...state.original] })
    } else {
      alert("Array is empty")
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={6} className="p-2">
          <Insert parent={{ state, insert }} />
        </Col>
        <Col xs={6} className="p-2">
          <Delete parent={{ state, delete: deleteData }} />
        </Col>
        <Col xs={6} className="p-2">
          <Update parent={{ state, update }} />
        </Col>
        <Col xs={6} className="p-2">
          <Shuffle parent={{ state, shuffle, reset }} />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        {state.array.map((value, index) => (
          <Element
            highlight={state.highlights.includes(index)}
            key={`${value}-${index}`}
            data={{ value, index }}
            type="array"
          />
        ))}
      </Row>
    </Container>
  )
}

export default KnuthShuffle
