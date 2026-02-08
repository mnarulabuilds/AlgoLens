import React, { useState, useRef, useEffect } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"
import "./SearchSuggestions.css"

export default function SearchSuggestions(props) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (inputValue) {
      const filtered = props.searchOps.filter((option) =>
        (option.title || option.data || "")
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
      setFilteredOptions(filtered)
      setOpen(filtered.length > 0)
    } else {
      setFilteredOptions([])
      setOpen(false)
    }
  }, [inputValue, props.searchOps])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (option) => {
    setInputValue(option.title || option.data || "")
    setOpen(false)
    props.updateSelection && props.updateSelection({ ...option })
  }

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-icon">
        <AiOutlineSearch />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Page"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue && setOpen(true)}
      />
      {open && filteredOptions.length > 0 && (
        <ul className="search-dropdown">
          {filteredOptions.map((option, index) => {
            const matches = match(option.title, inputValue)
            const parts = parse(option.title, matches)
            return (
              <li
                key={index}
                className="search-dropdown-item"
                onClick={() => handleSelect(option)}
              >
                <div>
                  {parts.map((part, idx) => (
                    <span
                      key={idx}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
