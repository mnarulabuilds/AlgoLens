import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import { UserProvider } from "../common/context/UserContext"
import VisualizerPage from "../common/components/VisualizerPage"

const topic = {
  id: "algo/Sorting",
  label: "Sorting 📊",
  category: "Algorithms 🧠",
  route: "/algo/Sorting",
}

describe("VisualizerPage", () => {
  beforeEach(() => {
    document.title = "AlgoLens"
  })

  afterEach(() => {
    document.title = "AlgoLens"
  })

  it("renders the page title, favorite button, and child content", () => {
    render(
      <UserProvider>
        <VisualizerPage topic={topic} pageTitle="Algorithms : Sorting">
          <p>Visualizer body</p>
        </VisualizerPage>
      </UserProvider>
    )

    expect(
      screen.getByRole("heading", { level: 1, name: "Algorithms : Sorting" })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Add to favorites" })).toBeInTheDocument()
    expect(screen.getByText("Visualizer body")).toBeInTheDocument()
    expect(document.title).toBe("Algorithms : Sorting | AlgoLens")
  })

  it("resets the document title on unmount", () => {
    const { unmount } = render(
      <UserProvider>
        <VisualizerPage topic={topic} pageTitle="Temporary Page">
          <p>Content</p>
        </VisualizerPage>
      </UserProvider>
    )

    expect(document.title).toBe("Temporary Page | AlgoLens")
    unmount()
    expect(document.title).toBe("AlgoLens")
  })
})
