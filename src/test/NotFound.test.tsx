import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import NotFound from "../routing/base/NotFound"

describe("NotFound", () => {
  it("renders a 404 message and home link", () => {
    render(<NotFound />)

    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Return Home" })).toHaveAttribute(
      "href",
      "/"
    )
  })
})
