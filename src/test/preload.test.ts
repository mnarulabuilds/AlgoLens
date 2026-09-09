import { describe, it, expect } from "vitest"
import { preloadVisualizer } from "../routing/base/preload"

describe("preload", () => {
  it("does not throw for valid and invalid routes", () => {
    expect(() => preloadVisualizer("/algo/Sorting")).not.toThrow()
    expect(() => preloadVisualizer("/does/not/exist")).not.toThrow()
  })
})
