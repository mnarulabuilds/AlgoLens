import React, { lazy, useState, Suspense } from "react"
import Insert from "routing/site/algo/components/BinarySearch/Insert"
import Update from "routing/site/algo/components/BinarySearch/Update"
import Delete from "routing/site/algo/components/BinarySearch/Delete"
import Search from "routing/site/algo/components/BinarySearch/Search"
import { FixedSizeList as List } from "react-window"
import useWindowDimensions from "common/helpers/dimensions"

const LazyElement = lazy(() => import("common/components/Element"))

const BinarySearch = () => {
  const [array, setArray] = useState([])
  const [highlights, setHighlights] = useState({ start: 0, end: -1 })
  const [iter, setIter] = useState(0)
  const [alert, setAlert] = useState(null)

  const insert = (data) => {
    if (data) {
      const value = parseFloat(data)
      setArray((prevArray) => {
        const updatedArray = [...prevArray]
        let i
        for (i = 0; i < updatedArray.length; i++) {
          if (updatedArray[i] >= value) {
            break
          }
        }
        updatedArray.splice(i, 0, value)
        setHighlights({ start: i, end: i })
        return updatedArray
      })
      setIter(0)
      setAlert(null)
    } else {
      setAlert({ text: "Submission is empty", type: "danger", alertId: 1 })
      return null
    }
  }

  const deleteItem = (data, position) => {
    let arr = [...array]
    if (data) {
      const num = parseFloat(data)
      let length = arr.length
      arr = arr.filter((value) => {
        return value !== num
      })
      if (!arr || arr.length === 0) arr = []
      if (length !== arr.length) {
        setArray(arr)
        setHighlights({ start: 0, end: -1 })
        setAlert(null)
      } else {
        setAlert({
          text: "Data not found to delete",
          type: "danger",
          alertId: 2,
        })
      }
    } else if (position >= 0 && position < arr.length) {
      arr.splice(position, 1)
      setArray(arr)
      setHighlights({ start: 0, end: -1 })
      setIter(0)
      setAlert(null)
    } else {
      setAlert({ text: "Unable to delete", type: "danger", alertId: 2 })
    }
  }

  const update = (position, data) => {
    if (data && position < array.length && position >= 0) {
      deleteItem(null, position)
      insert(data)
      setIter(0)
      setAlert(null)
    } else {
      setAlert({
        text: "Data or position not found to update",
        type: "danger",
        alertId: 3,
      })
    }
  }

  const bs = (data, start, end, arr) => {
    let mid = Math.floor((start + end) / 2)

    if (start > end) return

    if (arr[mid] === data) {
      setHighlights({ start: mid, end: mid })
      setIter((prevIter) => prevIter + 1)
    } else if (arr[mid] < data) {
      setHighlights((highlights) => ({
        ...highlights,
        start: mid + 1,
      }))
      setIter((prevIter) => prevIter + 1)
      setTimeout(() => {
        bs(data, mid + 1, end, arr)
      }, 0.75 * 1000)
    } else {
      setHighlights((highlights) => ({
        ...highlights,
        end: mid - 1,
      }))
      setIter((prevIter) => prevIter + 1)
      setTimeout(() => {
        bs(data, start, mid - 1, arr)
      }, 0.75 * 1000)
    }
  }

  const search = (data) => {
    if (data && array.length > 0) {
      const value = parseFloat(data)
      const start = 0
      const end = array.length - 1
      setHighlights({ start, end })
      setIter(0)
      setTimeout(() => {
        bs(value, start, end, array)
      }, 0.75 * 1000)
    } else {
      setAlert({ text: "Empty Search", type: "danger", alertId: 4 })
    }
  }

  return (
    <div>
      <div>
        <div className="mt-2">
          <Insert parent={{ insert, alert, setAlert }} alertId={1} />
        </div>
        <div className="mt-2">
          <Delete parent={{ deleteItem, alert, setAlert }} alertId={2} />
        </div>
        <div className="mt-2">
          <Update parent={{ update, alert, setAlert }} alertId={3} />
        </div>
        <div className="mt-2">
          <Search parent={{ search, alert, setAlert }} alertId={4} />
        </div>
      </div>
      <div className="mt-4 mb-4">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyList data={array} highlights={highlights} />
        </Suspense>
      </div>
      <div className="mt-4 mb-4">Steps : {iter}</div>
    </div>
  )
}

const LazyList = ({ data, highlights }) => {
  const { width: innerWidth } = useWindowDimensions()
  return (
    <List
      height={120}
      itemCount={data.length}
      itemSize={200}
      width={innerWidth || 800}
      direction="horizontal"
    >
      {({ index, style }) => {
        return (
          <div style={style}>
            <LazyElement
              highlight={index >= highlights.start && index <= highlights.end}
              data={{ value: data[index], index }}
              type="array"
            />
          </div>
        )
      }}
    </List>
  )
}

export default BinarySearch
