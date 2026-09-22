import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import React from "react"
import NotFound from "../routing/base/NotFound"

describe("NotFound", () => {
  it("renders a 404 message and home link", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(screen.getByText("404")).toBeInTheDocument()
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Return Home" })).toHaveAttribute(
      "href",
      "/"
    )
  })
})
