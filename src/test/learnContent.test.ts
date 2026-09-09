import { describe, it, expect } from "vitest"
import { getLearnContent } from "../routing/base/learnContent"

describe("learnContent", () => {
  it("returns topic-specific content when available", () => {
    const content = getLearnContent("algo/Sorting")
    expect(content.summary).toContain("Sorting")
    expect(content.complexity).toBeTruthy()
  })

  it("falls back to category defaults", () => {
    const content = getLearnContent("games/TicTacToe")
    expect(content.summary).toBeTruthy()
    expect(content.useCases?.length).toBeGreaterThan(0)
  })

  it("covers new category topics", () => {
    const db = getLearnContent("databases/LRUCache")
    expect(db.summary).toContain("LRU")
    const stats = getLearnContent("statistics/BayesTheorem")
    expect(stats.summary).toBeTruthy()
  })

  it("returns a generic fallback for unknown topics", () => {
    const content = getLearnContent("unknown/Topic")
    expect(content.summary).toContain("interactive")
  })
})
