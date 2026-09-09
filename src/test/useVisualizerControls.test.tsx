import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { renderHook, act } from "@testing-library/react"
import useVisualizerControls from "../common/hooks/useVisualizerControls"

describe("useVisualizerControls", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("starts and stops a visualization run", () => {
    const { result } = renderHook(() => useVisualizerControls(50))

    act(() => result.current.start())
    expect(result.current.isRunning).toBe(true)
    expect(result.current.isPaused).toBe(false)

    act(() => result.current.stop())
    expect(result.current.isRunning).toBe(false)
    expect(result.current.highlightedLine).toBe(-1)
  })

  it("pauses and resumes execution", () => {
    const { result } = renderHook(() => useVisualizerControls(50))

    act(() => result.current.start())
    act(() => result.current.pause())
    expect(result.current.isPaused).toBe(true)

    act(() => result.current.resume())
    expect(result.current.isPaused).toBe(false)
  })

  it("updates highlighted line and speed", () => {
    const { result } = renderHook(() => useVisualizerControls(50))

    act(() => result.current.setHighlightedLine(3))
    act(() => result.current.setSpeed(80))

    expect(result.current.highlightedLine).toBe(3)
    expect(result.current.speed).toBe(80)
  })

  it("throws when wait is called after stop", async () => {
    const { result } = renderHook(() => useVisualizerControls(100))

    act(() => result.current.start())
    act(() => result.current.stop())

    await expect(result.current.wait()).rejects.toThrow("ALGORITHM_STOPPED")
  })

  it("waits for the configured delay while running", async () => {
    const { result } = renderHook(() => useVisualizerControls(100))

    act(() => result.current.start())

    const waitPromise = result.current.wait()
    await act(async () => {
      vi.advanceTimersByTime(10)
      await waitPromise
    })
  })
})
