import React, { useState, useRef, useEffect, useMemo, useCallback } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import parse from "autosuggest-highlight/parse"
import match from "autosuggest-highlight/match"
import "./SearchSuggestions.css"

export type SearchOption = {
  title?: string
  data?: string
  route?: string
  path?: string
  [key: string]: unknown
}

type SearchSuggestionsProps = {
  id?: string
  searchOps: SearchOption[]
  updateSelection?: (selection: SearchOption) => void
}

type FlatOption = SearchOption & {
  displayTitle: string
  category: string
  optionId: string
}

export default function SearchSuggestions(props: SearchSuggestionsProps) {
  const listboxId = props.id ? `${props.id}-listbox` : "search-listbox"
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState<SearchOption[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue) {
      const filtered = props.searchOps.filter((option) =>
        (option.title || option.data || "")
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
      setFilteredOptions(filtered)
      setOpen(filtered.length > 0)
      setActiveIndex(filtered.length > 0 ? 0 : -1)
    } else {
      setFilteredOptions([])
      setOpen(false)
      setActiveIndex(-1)
    }
  }, [inputValue, props.searchOps])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const flatOptions = useMemo((): FlatOption[] => {
    const items: FlatOption[] = []
    filteredOptions.forEach((option, index) => {
      const parts = (option.title || "").split(" : ")
      const category = parts[0] || "Other"
      const title = parts[1] || parts[0] || ""
      items.push({
        ...option,
        displayTitle: title,
        category,
        optionId: `${category}-${index}`,
      })
    })
    return items
  }, [filteredOptions])

  const groupedOptions = useMemo(() => {
    const groups: Record<string, FlatOption[]> = {}
    flatOptions.forEach((option) => {
      if (!groups[option.category]) groups[option.category] = []
      groups[option.category].push(option)
    })
    return groups
  }, [flatOptions])

  const handleSelect = useCallback(
    (option: SearchOption) => {
      setInputValue(option.title || option.data || "")
      setOpen(false)
      setActiveIndex(-1)
      props.updateSelection?.({ ...option })
    },
    [props.updateSelection]
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || flatOptions.length === 0) {
      if (event.key === "Escape") {
        setOpen(false)
      }
      return
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setActiveIndex((prev) => (prev + 1) % flatOptions.length)
        break
      case "ArrowUp":
        event.preventDefault()
        setActiveIndex((prev) =>
          prev <= 0 ? flatOptions.length - 1 : prev - 1
        )
        break
      case "Enter":
        event.preventDefault()
        if (activeIndex >= 0 && flatOptions[activeIndex]) {
          handleSelect(flatOptions[activeIndex])
        }
        break
      case "Escape":
        event.preventDefault()
        setOpen(false)
        setActiveIndex(-1)
        break
      default:
        break
    }
  }

  let flatIndex = -1

  return (
    <div className="search-container" ref={dropdownRef}>
      <div className="search-icon" aria-hidden="true">
        <AiOutlineSearch />
      </div>
      <input
        ref={inputRef}
        id={props.id}
        type="search"
        role="combobox"
        aria-label="Search visualizers"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          activeIndex >= 0 ? flatOptions[activeIndex]?.optionId : undefined
        }
        aria-autocomplete="list"
        className="search-input"
        placeholder="Search visualizers, games, simulations..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue && setOpen(filteredOptions.length > 0)}
        onKeyDown={handleKeyDown}
      />
      {open && Object.keys(groupedOptions).length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className="search-dropdown"
          aria-label="Search results"
        >
          {Object.entries(groupedOptions).map(([category, options]) => (
            <React.Fragment key={category}>
              <li className="search-dropdown-category" role="presentation">
                {category}
              </li>
              {options.map((option) => {
                flatIndex += 1
                const currentIndex = flatIndex
                const isActive = currentIndex === activeIndex
                const matches = match(option.displayTitle, inputValue)
                const parts = parse(option.displayTitle, matches)

                return (
                  <li
                    key={option.optionId}
                    id={option.optionId}
                    role="option"
                    aria-selected={isActive}
                    className={`search-dropdown-item${isActive ? " active" : ""}`}
                    onMouseEnter={() => setActiveIndex(currentIndex)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(option)}
                  >
                    <div>
                      {parts.map((part, idx) => (
                        <span
                          key={idx}
                          className={part.highlight ? "search-highlight" : undefined}
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
