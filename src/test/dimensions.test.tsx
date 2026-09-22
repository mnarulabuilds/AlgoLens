import { describe, it, expect, vi, afterEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import useWindowDimensions from "../common/helpers/dimensions"

describe("useWindowDimensions", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("returns the current window size", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1024)
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(768)

    const { result } = renderHook(() => useWindowDimensions())
    expect(result.current).toEqual({ width: 1024, height: 768 })
  })

  it("updates when the window is resized", () => {
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(800)
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(600)

    const { result } = renderHook(() => useWindowDimensions())

    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1280)
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(720)

    act(() => {
      window.dispatchEvent(new Event("resize"))
    })

    expect(result.current).toEqual({ width: 1280, height: 720 })
  })
})
