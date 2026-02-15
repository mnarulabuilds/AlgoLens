import React, { useState, useRef, useEffect, useMemo } from "react"
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

  const groupedOptions = useMemo(() => {
    const groups: Record<string, any[]> = {}
    filteredOptions.forEach((option: any) => {
      const parts = option.title.split(" : ")
      const category = parts[0] || "Other"
      const title = parts[1] || parts[0]
      if (!groups[category]) groups[category] = []
      groups[category].push({ ...option, displayTitle: title })
    })
    return groups
  }, [filteredOptions])

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-icon">
        <AiOutlineSearch />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search for an algorithm..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue && setOpen(true)}
      />
      {open && Object.keys(groupedOptions).length > 0 && (
        <ul className="search-dropdown">
          {Object.entries(groupedOptions).map(([category, options]) => (
            <React.Fragment key={category}>
              <li className="search-dropdown-category">{category}</li>
              {options.map((option, index) => {
                const matches = match(option.displayTitle, inputValue)
                const parts = parse(option.displayTitle, matches)
                return (
                  <li
                    key={`${category}-${index}`}
                    className="search-dropdown-item"
                    onClick={() => handleSelect(option)}
                  >
                    <div>
                      {parts.map((part, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                            color: part.highlight ? "#4ecca3" : "inherit",
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                )
              })}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  )
}
