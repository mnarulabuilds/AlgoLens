import { describe, it, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import useVisualizerKeyboard from "../common/hooks/useVisualizerKeyboard"

describe("useVisualizerKeyboard", () => {
  it("invokes handlers for visualization shortcuts", () => {
    const onPauseResume = vi.fn()
    const onStep = vi.fn()
    const onStop = vi.fn()
    const onReset = vi.fn()

    renderHook(() =>
      useVisualizerKeyboard({
        onPauseResume,
        onStep,
        onStop,
        onReset,
      })
    )

    window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }))
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }))

    expect(onPauseResume).toHaveBeenCalledTimes(1)
    expect(onStep).toHaveBeenCalledTimes(1)
    expect(onStop).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it("ignores keys when disabled or focused in form fields", () => {
    const onPauseResume = vi.fn()
    renderHook(() =>
      useVisualizerKeyboard({ enabled: false, onPauseResume })
    )

    window.dispatchEvent(new KeyboardEvent("keydown", { key: " " }))
    expect(onPauseResume).not.toHaveBeenCalled()

    const input = document.createElement("input")
    document.body.appendChild(input)
    input.focus()

    renderHook(() => useVisualizerKeyboard({ onPauseResume }))
    input.dispatchEvent(
      new KeyboardEvent("keydown", { key: " ", bubbles: true })
    )
    expect(onPauseResume).not.toHaveBeenCalled()
    input.remove()
  })
})
