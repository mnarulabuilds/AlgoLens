import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import React from "react"
import {
  parseIntParam,
  useVisualizerParams,
} from "../common/hooks/useVisualizerParams"

function wrapper(initialEntries: string[]) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    )
  }
}

describe("useVisualizerParams", () => {
  it("merges URL params with defaults", () => {
    const { result } = renderHook(() => useVisualizerParams({ size: "10" }), {
      wrapper: wrapper(["/?size=20&mode=fast"]),
    })

    expect(result.current[0]).toEqual({ size: "20", mode: "fast" })
  })

  it("sets and clears search params", () => {
    const { result } = renderHook(() => useVisualizerParams(), {
      wrapper: wrapper(["/"]),
    })

    act(() => {
      result.current[1]({ foo: "bar", empty: "" })
    })
    expect(result.current[0].foo).toBe("bar")

    act(() => {
      result.current[1]({ foo: null })
    })
    expect(result.current[0].foo).toBeUndefined()
  })
})

describe("parseIntParam", () => {
  it("parses integers with bounds", () => {
    expect(parseIntParam("42", 0)).toBe(42)
    expect(parseIntParam(undefined, 5)).toBe(5)
    expect(parseIntParam("nope", 3)).toBe(3)
    expect(parseIntParam("1", 10, 5, 20)).toBe(5)
    expect(parseIntParam("99", 10, 5, 20)).toBe(20)
  })
})
