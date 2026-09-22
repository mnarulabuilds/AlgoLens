import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import LearnPanel from "../common/components/LearnPanel"

const content = {
  summary: "Bubble sort repeatedly swaps adjacent elements.",
  complexity: "O(n²)",
  useCases: ["Teaching", "Small datasets"],
  relatedLinks: [{ label: "Wikipedia", url: "https://example.com/sort" }],
}

describe("LearnPanel", () => {
  it("expands to show learn content", async () => {
    const user = userEvent.setup()
    render(<LearnPanel content={content} />)

    expect(screen.queryByText(content.summary)).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: /Learn/i }))
    expect(screen.getByText(content.summary)).toBeInTheDocument()
    expect(screen.getByText(/Complexity:/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Wikipedia" })).toHaveAttribute(
      "href",
      "https://example.com/sort"
    )
  })
})
