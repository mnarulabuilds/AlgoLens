import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import Breadcrumbs from "../common/components/Breadcrumbs"

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Breadcrumbs />
    </MemoryRouter>
  )
}

describe("Breadcrumbs", () => {
  it("shows category label from the route registry", () => {
    renderAt("/algo")
    expect(screen.getByText("Algorithms 🧠")).toBeInTheDocument()
  })

  it("shows visualizer label from the route registry", () => {
    renderAt("/algo/Sorting")
    expect(screen.getByText("Algorithms 🧠")).toBeInTheDocument()
    expect(screen.getByText("Sorting 📊")).toBeInTheDocument()
  })

  it("marks the current page in the trail", () => {
    renderAt("/games/Game2048")
    expect(screen.getByText("2048 Game 🔢")).toHaveAttribute(
      "aria-current",
      "page"
    )
  })
})
