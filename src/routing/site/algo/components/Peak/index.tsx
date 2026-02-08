import React, { useState, useCallback, lazy } from "react"
import { Container, Row, Col } from "reactstrap"
import Insert from "./Insert"
import Delete from "./Delete"
import Update from "./Update"
import Peak from "./Peak"

const Element = lazy(() => import("common/components/Element"))

const Visuals = () => {
  const [array, setArray] = useState([])
  const [highlights, setHighlights] = useState([])
  const [iter, setIter] = useState(0)

  const insert = useCallback(
    (data, where) => {
      if (data) {
        let newArr = [...array]
        if (where.toLowerCase() === "start") {
          newArr.unshift(data)
        } else {
          newArr.push(data)
        }
        setArray(newArr)
        setHighlights([])
      } else {
        alert("Submission is empty")
      }
    },
    [array]
  )

  const deleteData = useCallback(
    (data, position) => {
      let newArr = [...array]
      if (data) {
        const length = newArr.length
        newArr = newArr.filter((value) => value !== data)
        if (length !== newArr.length) {
          setArray(newArr)
          setHighlights([])
        } else {
          alert("Data not found to delete")
        }
      } else if (position >= 0 && position < newArr.length) {
        newArr.splice(position, 1)
        setArray(newArr)
        setHighlights([])
        setIter(0)
      } else {
        alert("Unable to delete")
      }
    },
    [array]
  )

  const update = useCallback(
    (position, value) => {
      if (
        !Number.isNaN(value) &&
        parseInt(position) <= array.length - 1 &&
        parseInt(position) >= 0
      ) {
        let newArr = [...array]
        newArr[position] = value
        setArray(newArr)
        setHighlights([parseInt(position)])
      } else {
        alert("Cannot update")
      }
    },
    [array]
  )

  const isPeak = (arr, mid, start, end) => {
    let midEle =
      arr[mid] === parseFloat(arr[mid]) ? parseFloat(arr[mid]) : arr[mid]
    if (mid > start && mid < end) {
      let midMoreEle =
        arr[mid + 1] === parseFloat(arr[mid + 1])
          ? parseFloat(arr[mid + 1])
          : arr[mid + 1]
      let midLessEle =
        arr[mid - 1] === parseFloat(arr[mid - 1])
          ? parseFloat(arr[mid - 1])
          : arr[mid - 1]
      if (midEle >= midMoreEle && midEle >= midLessEle) {
        return { r: true }
      }
      if (midEle <= midLessEle) {
        return { r: false, d: "left" }
      }
    } else if (mid === start && mid < end) {
      let midMoreEle =
        arr[mid + 1] === parseFloat(arr[mid + 1])
          ? parseFloat(arr[mid + 1])
          : arr[mid + 1]
      if (midEle >= midMoreEle) {
        return { r: true }
      }
    } else if (mid === end && mid > start) {
      let midLessEle =
        arr[mid - 1] === parseFloat(arr[mid - 1])
          ? parseFloat(arr[mid - 1])
          : arr[mid - 1]
      if (midEle >= midLessEle) {
        return { r: true }
      }
      return { r: false, d: "left" }
    }
    return { r: false, d: "right" }
  }

  const bsPeak = useCallback((start, end, arr) => {
    let mid = parseInt(start + (end - start) / 2)
    if (start > end) {
      setHighlights([])
      return
    }
    let { r, d } = isPeak(arr, mid, start, end)
    if (r) {
      setHighlights([mid])
      setIter("Completed")
    } else if (d === "right") {
      setIter((prevIter) => prevIter + 1)
      setTimeout(() => {
        bsPeak(mid + 1, end, arr)
      }, 1000)
    } else if (d === "left") {
      setIter((prevIter) => prevIter + 1)
      setTimeout(() => {
        bsPeak(start, mid - 1, arr)
      }, 1000)
    }
  }, [])

  const peak = useCallback(
    (start, end) => {
      if (start >= 0 && end >= 0) {
        if (start === Math.floor(start) && end === Math.floor(end)) {
          if (start > end) {
            alert("Start should be less than end")
            return
          }
          if (array.length > 0) {
            let s = Math.floor(start)
            start = s
            end = Math.floor(end)
            let highlightsRange = []
            while (s <= end) {
              highlightsRange.push(s)
              s++
            }
            setHighlights(highlightsRange)
            setIter(0)
            setTimeout(() => {
              bsPeak(start, end, array)
            }, 1000)
          } else {
            alert("No peak in empty array")
          }
        } else {
          alert("Enter integers only")
        }
      } else {
        alert("Incomplete Range")
      }
    },
    [array, bsPeak]
  )

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <Insert insert={insert} />
        </Col>
        <Col sm={3}>
          <Delete deleteData={deleteData} />
        </Col>
        <Col sm={3}>
          <Update update={update} />
        </Col>
        <Col sm={3}>
          <Peak peak={peak} />
        </Col>
      </Row>
      <Row className="mt-4 mb-4">
        {array.map((value, index) => {
          const highlight = highlights.includes(index)
          return (
            <Element
              highlight={highlight}
              key={`${value}-${index}`}
              data={{ value, index }}
              type="array"
            />
          )
        })}
      </Row>
      {(parseInt(iter) > 0 || iter !== "0") && (
        <Row className="mt-4 mb-4">Steps: {iter}</Row>
      )}
    </Container>
  )
}

export default Visuals
