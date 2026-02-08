import React, { Suspense, lazy, useCallback, useState } from "react"
import Input from "./Input"
import { FixedSizeList as List } from "react-window"
import useWindowDimensions from "common/helpers/dimensions"
import "./Palindrome.css"

const LazyElement = lazy(() => import("common/components/Element"))

const Palindrome = () => {
  const [characters, setCharacters] = useState([])
  const [alert, setAlert] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const updateCharacters = (start, end, delay) => {
    setTimeout(() => {
      setCharacters((prevCharacters) => {
        return prevCharacters.map(({ char, highlight }, idx) => {
          if (idx === start || idx === end) {
            return {
              char,
              highlight: true,
            }
          }
          return {
            char,
            highlight,
          }
        })
      })
    }, delay)
  }

  const checkPalindrome = useCallback((input) => {
    let start = 0,
      end = input.length - 1,
      isPalindrome = true,
      delay = 1000

    setCharacters(
      input.split("").map((char) => ({
        char,
        highlight: false,
      }))
    )
    setDisabled(true)
    while (start <= end) {
      if (input[start] !== input[end]) {
        setAlert({
          type: "danger",
          text: "Input string is not a Palindrome",
        })
        setDisabled(false)
        isPalindrome = false
        break
      } else {
        updateCharacters(start, end, delay)
        delay = delay * 1.2
        start++
        end--
      }
    }
    if (isPalindrome) {
      setAlert({
        type: "success",
        text: "Input string is a Palindrome",
      })
      setDisabled(false)
    }
  }, [])

  return (
    <div className="palindrome-container">
      {alert && (
        <div className="palindrome-row">
          <div className="palindrome-col-full">
            <div className={`palindrome-alert palindrome-alert-${alert.type}`}>
              <span>{alert.text}</span>
              <button
                className="palindrome-alert-close"
                onClick={() => setAlert(null)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="palindrome-row text-center">
        <div className="palindrome-col-full">
          <Input checkPalindrome={checkPalindrome} disabled={disabled} />
        </div>
      </div>

      <div className="palindrome-row palindrome-chars-container text-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyList characters={characters} />
        </Suspense>
      </div>
    </div>
  )
}

const LazyList = ({ characters }) => {
  const { width: innerWidth } = useWindowDimensions()

  return (
    <List
      height={120}
      itemCount={characters.length}
      itemSize={200}
      width={innerWidth || 800}
      direction="horizontal"
    >
      {({ index, style }) => (
        <div className="palindrome-char-item" style={style}>
          <LazyElement
            highlight={characters[index].highlight}
            data={{ value: characters[index].char, index }}
            type="array"
          />
        </div>
      )}
    </List>
  )
}

export default Palindrome
