import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import DeferredMount from "common/components/DeferredMount"

describe("DeferredMount", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", undefined)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("renders children when visible", () => {
    render(
      <DeferredMount placeholder={<span>loading</span>}>
        <span>ready</span>
      </DeferredMount>
    )
    expect(screen.getByText("ready")).toBeInTheDocument()
  })
})
