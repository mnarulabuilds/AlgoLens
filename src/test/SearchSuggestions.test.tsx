import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import SearchSuggestions from "../common/components/SearchSuggestions"

const searchOps = [
  {
    title: "Algorithms 🧠 : Sorting 📊",
    route: "/algo/Sorting",
  },
  {
    title: "Game Zone 🎮 : 2048 Game 🔢",
    route: "/games/Game2048",
  },
]

describe("SearchSuggestions", () => {
  it("filters and selects a result with the keyboard", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <SearchSuggestions id="site-search" searchOps={searchOps} updateSelection={onSelect} />
    )

    const input = screen.getByRole("combobox", { name: "Search visualizers" })
    await user.type(input, "2048")
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.keyboard("{ArrowDown}{Enter}")
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ route: "/games/Game2048" })
    )
  })

  it("closes the listbox on Escape", async () => {
    const user = userEvent.setup()

    render(<SearchSuggestions searchOps={searchOps} />)

    const input = screen.getByRole("combobox", { name: "Search visualizers" })
    await user.type(input, "sort")
    expect(screen.getByRole("listbox")).toBeInTheDocument()

    await user.keyboard("{Escape}")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
  })
})
