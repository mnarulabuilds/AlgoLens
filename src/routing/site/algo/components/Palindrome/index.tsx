import React, { Suspense, lazy, useCallback, useState } from "react"
import Input from "./Input"
import HorizontalVirtualList from "common/components/HorizontalVirtualList"
import useWindowDimensions from "common/helpers/dimensions"
import "./Palindrome.module.scss"

const LazyElement = lazy(() => import("common/components/Element"))

const Palindrome = () => {
  const [characters, setCharacters] = useState<
    { char: string; highlight: boolean }[]
  >([])
  const [alert, setAlert] = useState<{ text: string; type: string } | null>(
    null
  )
  const [disabled, setDisabled] = useState(false)

  const updateCharacters = (start: number, end: number, delay: number) => {
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

  const checkPalindrome = useCallback((input: string) => {
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

const LazyList = ({
  characters,
}: {
  characters: { char: string; highlight: boolean }[]
}) => {
  const { width: innerWidth } = useWindowDimensions()

  return (
    <HorizontalVirtualList
      height={120}
      itemCount={characters.length}
      itemSize={200}
      width={innerWidth || 800}
      renderItem={(index) => (
        <div className="palindrome-char-item">
          <LazyElement
            highlight={characters[index].highlight}
            data={{ value: characters[index].char, index }}
            type="array"
          />
        </div>
      )}
    />
  )
}

export default Palindrome
