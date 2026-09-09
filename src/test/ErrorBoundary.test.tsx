import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import ErrorBoundary from "../common/components/ErrorBoundary"

function BrokenChild(): React.ReactNode {
  throw new Error("Visualizer crashed")
}

describe("ErrorBoundary", () => {
  let consoleError: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
  })

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>
    )

    expect(screen.getByText("All good")).toBeInTheDocument()
  })

  it("shows a fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <BrokenChild />
      </ErrorBoundary>
    )

    expect(
      screen.getByText("⚠️ Something went wrong in the visualizer")
    ).toBeInTheDocument()
    expect(screen.getByText("Visualizer crashed")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Refresh Page/i })).toBeInTheDocument()
  })
})
