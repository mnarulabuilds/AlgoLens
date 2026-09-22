import { describe, it, expect } from "vitest"
import { preloadCategory, preloadVisualizer } from "../routing/base/preload"

describe("preload", () => {
  it("does not throw for valid and invalid routes", () => {
    expect(() => preloadVisualizer("/algo/Sorting")).not.toThrow()
    expect(() => preloadVisualizer("/does/not/exist")).not.toThrow()
  })

  it("preloads the first routes in a category", () => {
    expect(() => preloadCategory("algo")).not.toThrow()
    expect(() => preloadCategory("missing-category")).not.toThrow()
  })
})
