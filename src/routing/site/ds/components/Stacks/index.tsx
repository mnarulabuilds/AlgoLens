import React, { useState } from "react"
import Element from "common/components/Element"
import Push from "./Push"
import Pop from "./Pop"
import Get from "./Get"

export default function Stack() {
  const [array, setArray] = useState<string[]>([])
  const [highlights, setHighlights] = useState<number[] | null>(null)
  const [where, setWhere] = useState("Top")
  const [result, setResult] = useState<string | null>(null)

  const [radioVal, setRadioVal] = useState("")

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    margin: "16px",
  }

  const paperStyle: React.CSSProperties = {
    padding: "16px",
    margin: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
  }

  const cardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "16px",
  }

  const cardHeaderStyle: React.CSSProperties = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    borderRadius: "4px 4px 0 0",
  }

  const cardContentStyle: React.CSSProperties = {
    padding: "16px",
  }

  const boxStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    margin: "16px 0",
    border: "1px solid black",
    borderTop: "none",
  }

  const radioGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }

  const radioLabelStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",
  }

  const showOperation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const operation = event.target.value
    setRadioVal(operation)
  }

  const push = (data: string) => {
    if (data) {
      const arr = array
      arr.splice(0, 0, data)
      setArray(arr)
      setHighlights([0])
      setResult(null)
    } else {
      alert("Nothing to Push")
    }
  }

  const pop = () => {
    const arr = array
    arr.splice(0, 1)
    setArray(arr)
    setHighlights([])
    setResult(null)
  }

  const get = (): void => {
    const arr = array

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
            const highlight = highlights && highlights.includes(index)
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
