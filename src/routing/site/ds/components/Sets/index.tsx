import React, { useState, Fragment } from "react"
import Element from "common/components/Element"
import Insert from "./Insert"
import Delete from "./Delete"
import Search from "./Search"
import SortedSet from "js-sorted-set"

export default function Sets() {
  const [radioVal, setRadioVal] = useState(false)
  const [isGreat, setIsGreat] = useState("")
  const [data, setData] = useState(null)
  const [set, setSet] = useState(new SortedSet())

  const showOperation = (event) => {
    setRadioVal(event.target.value)
  }

  const cloneSet = (sortedSet) => {
    let clone = new SortedSet()
    if (!sortedSet || sortedSet.length === 0) {
      return clone
    }
    sortedSet.forEach((element) => {
      clone.insert(element)
    })
    return clone
  }

  const insert = (data) => {
    if (data) {
      if (data.length < 7 && !isNaN(data)) {
        if (set.contains(Number(data))) {
          alert("Already Present")
          return
        }
        const mySet = cloneSet(set)
        mySet.insert(Number(data))
        setSet(mySet)
      } else {
        alert("Invalid input (must contain integers only)")
      }
    } else {
      alert("Enter data")
    }
  }

  const del = (data) => {
    if (data) {
      if (data.length < 6 && !isNaN(data)) {
        if (set.contains(Number(data))) {
          const mySet = cloneSet(set)
          mySet.remove(Number(data))
          setSet(mySet)
        } else {
          alert("Value not exists in the set")
        }
      } else {
        alert("Invalid input (must contain integers only)")
      }
    } else {
      alert("Enter data")
    }
  }

  const search = (data, where) => {
    if (data) {
      if (data.length < 7 && !isNaN(data)) {
        if (!set || set.length === 0) {
          alert("Set is empty")
          return
        }
        setIsGreat(where)
        setData(Number(data))
        switch (where) {
          case "no":
            !set.contains(Number(data)) && alert("Data Not Found")
            break
          case "all-smaller":
            Number(set.beginIterator().value()) > Number(data) &&
              alert("No smaller element present")
            break
          case "all-greater":
            Number(set.endIterator().previous().value()) < Number(data) &&
              alert("No Greater Element present")
            break
          default:
            break
        }
      } else {
        alert("Invalid input (must contain integers only)")
      }
    } else {
      alert("Enter data")
    }
  }

  const renderList = () => {
    return (
      set &&
      set.length > 0 &&
      set.map((element, key) => (
        <Fragment key={`${key}-${element}`}>
          <Element
            data={{ value: Number(element) }}
            type="sets"
            next={true}
            highlight={
              isGreat === "no" &&
              data !== null &&
              Number(element) === Number(data)
            }
            AllGreater={
              isGreat === "all-greater" && Number(element) > Number(data)
            }
            AllSmaller={
              isGreat === "all-smaller" && Number(element) < Number(data)
            }
          />
        </Fragment>
      ))
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", padding: "16px" }}>
      <div style={{ flex: 1, marginRight: "16px" }}>
        <div style={{ padding: "16px", border: "1px solid #ccc" }}>
          <h6
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "8px",
              textAlign: "center",
            }}
          >
            Operations
          </h6>
          <div style={{ padding: "8px" }}>
            <fieldset style={{ border: "none" }}>
              <legend style={{ fontSize: "14px" }}>Choose Operation</legend>
              <label>
                <input
                  type="radio"
                  name="operation"
                  value="Insert"
                  onChange={showOperation}
                />
                Insert
              </label>
              <label>
                <input
                  type="radio"
                  name="operation"
                  value="Delete"
                  onChange={showOperation}
                />
                Delete
              </label>
              <label>
                <input
                  type="radio"
                  name="operation"
                  value="Search"
                  onChange={showOperation}
                />
                Search
              </label>
            </fieldset>
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Insert
            open={radioVal === "Insert"}
            insert={(data) => insert(data)}
          />
          <Search
            open={radioVal === "Search"}
            search={(data, where) => search(data, where)}
          />
          <Delete open={radioVal === "Delete"} del={(data) => del(data)} />
        </div>
      </div>
      <div
        style={{
          flex: 1,
          border: set.length > 0 ? "2px solid black" : "",
          padding: "16px",
        }}
      >
        {renderList()}
      </div>
    </div>
  )
}
