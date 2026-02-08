import React, { useState } from "react"
import Element from "common/components/Element"
import Push from "./Push"
import Pop from "./Pop"
import Get from "./Get"

export default function Stack() {
  let [array, setArray] = useState([])
  let [highlights, setHighlights] = useState(null)
  let [where, setWhere] = useState("Top")
  let [result, setResult] = useState(null)

  let [radioVal, setRadioVal] = useState(false)

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    margin: "16px",
  }

  const paperStyle = {
    padding: "16px",
    margin: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  }

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "16px",
  }

  const cardHeaderStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px 4px 0 0",
  }

  const cardContentStyle = {
    padding: "16px",
  }

  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    margin: "16px 0",
    border: "1px solid black",
    borderTop: "none",
  }

  const radioGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }

  const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",
  }

  let showOperation = (event) => {
    let operation = event.target.value
    setRadioVal(operation)
  }

  let push = (data) => {
    if (data) {
      let arr = array
      arr.splice(0, 0, data)
      setArray(arr)
      setHighlights([0])
      setResult(null)
    } else {
      alert("Nothing to Push")
    }
  }

  let pop = () => {
    let arr = array
    arr.splice(0, 1)
    setArray(arr)
    setHighlights([])
    setResult(null)
  }

  let get = () => {
    let arr = array

    switch (where.toLowerCase()) {
      case "top":
        setHighlights([0])
        setResult(arr[0])
        return
      case "bottom":
        setHighlights([arr.length - 1])
        setResult(arr[arr.length - 1])
        return
      default:
    }
  }

  return (
    <div style={containerStyle}>
      <div style={paperStyle}>
        <div style={cardStyle}>
          <h2 style={cardHeaderStyle}>Operations</h2>
          <div style={cardContentStyle}>
            <div style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="operation"
                  value="Push"
                  onChange={showOperation}
                />
                Push
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="operation"
                  value="Pop"
                  onChange={showOperation}
                />
                Pop
              </label>
              <label style={radioLabelStyle}>
                <input
                  type="radio"
                  name="operation"
                  value="Get"
                  onChange={showOperation}
                />
                Get
              </label>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "16px" }}>
          <Push
            open={radioVal === "Push"}
            push={(data) => {
              push(data)
            }}
          />
          <Pop
            open={radioVal === "Pop"}
            pop={() => {
              pop()
            }}
          />
          <Get
            open={radioVal === "Get"}
            modifyWhere={(position) => {
              setWhere(position)
            }}
            result1={result}
            array1={array}
            get={() => {
              get()
            }}
          />
        </div>
      </div>
      <div style={{ flex: "1 1 auto", marginLeft: "16px" }}>
        <div style={boxStyle}>
          {array.map((value, index) => {
            let highlight = highlights && highlights.includes(index)
            return (
              <Element
                highlight={highlight}
                key={`${value}-${index}`}
                data={{ value, index }}
                type="stack"
              />
            )
          })}
        </div>
        <div style={{ textAlign: "center" }}>Stack Container</div>
      </div>
    </div>
  )
}
