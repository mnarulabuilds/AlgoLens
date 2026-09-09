import { describe, it, expect } from "vitest"
import {
  categoryIcons,
  categoryDescriptions,
  getCategoryLabel,
  getCategoryIcon,
} from "../common/helpers/categories"

describe("categories helpers", () => {
  it("provides icons for all ten categories", () => {
    const topics = [
      "algo",
      "ds",
      "physics",
      "math",
      "games",
      "os",
      "networking",
      "ml",
      "security",
      "logic",
    ]
    for (const topic of topics) {
      expect(categoryIcons[topic]).toBeDefined()
      expect(categoryDescriptions[topic]).toBeTruthy()
    }
  })

  it("returns category labels from the route registry", () => {
    expect(getCategoryLabel("algo")).toBe("Algorithms 🧠")
    expect(getCategoryLabel("games")).toBe("Game Zone 🎮")
    expect(getCategoryLabel("unknown")).toBeUndefined()
  })

  it("falls back to a default icon for unknown categories", () => {
    expect(getCategoryIcon("unknown")).toBeDefined()
    expect(getCategoryIcon("algo")).toBe(categoryIcons.algo)
  })
})
