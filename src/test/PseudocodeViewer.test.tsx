import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import PseudocodeViewer from "../common/components/PseudocodeViewer"

const pseudocode = [
  { text: "function sort(array):", indent: 0 },
  { text: "  return array", indent: 1 },
]

describe("PseudocodeViewer", () => {
  it("renders pseudocode lines with line numbers", () => {
    render(
      <PseudocodeViewer
        pseudocode={pseudocode}
        title="Bubble Sort"
        highlightedLine={1}
      />
    )

    expect(screen.getByRole("heading", { name: "Bubble Sort" })).toBeInTheDocument()
    expect(screen.getByText("function sort(array):")).toBeInTheDocument()
    expect(screen.getByText("return array")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(document.querySelector(".pseudocode-line.highlighted")).toBeTruthy()
  })

  it("uses a default title when none is provided", () => {
    render(<PseudocodeViewer pseudocode={[]} />)
    expect(
      screen.getByRole("heading", { name: "Algorithm Pseudocode" })
    ).toBeInTheDocument()
  })
})
