import { describe, it, expect, vi } from "vitest"
import { renderHook } from "@testing-library/react"
import usePoint from "../common/hooks/usePoint"

describe("usePoint", () => {
  it("draws coordinates on canvas click", () => {
    const canvas = document.createElement("canvas")
    canvas.getBoundingClientRect = () =>
      ({
        left: 10,
        top: 20,
        width: 200,
        height: 200,
        right: 210,
        bottom: 220,
        x: 10,
        y: 20,
        toJSON: () => ({}),
      }) as DOMRect

    const arc = vi.fn()
    const fill = vi.fn()
    const fillText = vi.fn()
    const beginPath = vi.fn()
    vi.spyOn(canvas, "getContext").mockReturnValue({
      fillStyle: "",
      arc,
      fill,
      fillText,
      beginPath,
      font: "",
    } as unknown as CanvasRenderingContext2D)

    const { result } = renderHook(() => usePoint(canvas))
    result.current.draw({
      clientX: 60,
      clientY: 90,
    } as MouseEvent)

    expect(beginPath).toHaveBeenCalled()
    expect(arc).toHaveBeenCalledWith(50, 70, 3, 0, Math.PI * 2, true)
    expect(fillText).toHaveBeenCalledWith("( 50 , 70 )", 56, 76)
  })

  it("no-ops when canvas is missing", () => {
    const { result } = renderHook(() => usePoint(null))
    expect(() =>
      result.current.draw({ clientX: 0, clientY: 0 } as MouseEvent)
    ).not.toThrow()
  })
})
