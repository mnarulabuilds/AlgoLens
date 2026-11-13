import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Breadcrumbs from "../common/components/Breadcrumbs"

function renderAt(path: string) {
  window.history.replaceState(null, "", path)
  return render(<Breadcrumbs />)
}

describe("Breadcrumbs", () => {
  it("renders nothing on the home route", () => {
    const { container } = renderAt("/")
    expect(container.firstChild).toBeNull()
  })

  it("formats unknown category slugs", () => {
    renderAt("/customTopic")
    expect(screen.getByText("Custom Topic")).toBeInTheDocument()
  })

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
