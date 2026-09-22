import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import useCalculatorState from "../common/hooks/useCalculatorState"

describe("useCalculatorState", () => {
  it("builds expressions and evaluates them", () => {
    const { result } = renderHook(() => useCalculatorState())

    act(() => result.current.handleButtonClick("2"))
    act(() => result.current.handleButtonClick("+"))
    act(() => result.current.handleButtonClick("3"))
    expect(result.current.display).toBe("2+3")

    act(() => result.current.handleButtonClick("="))
    expect(result.current.display).toBe("5")
  })

  it("clears the display and handles invalid expressions", () => {
    const { result } = renderHook(() => useCalculatorState())

    act(() => result.current.handleButtonClick("1"))
    act(() => result.current.handleButtonClick("C"))
    expect(result.current.display).toBe("")

    act(() => result.current.handleButtonClick("("))
    act(() => result.current.handleButtonClick("="))
    expect(result.current.display).toBe("Error")
  })
})
