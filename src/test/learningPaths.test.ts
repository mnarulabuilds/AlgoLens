import { describe, it, expect } from "vitest"
import {
  LEARNING_PATHS,
  getPathProgress,
} from "../routing/base/learningPaths"

describe("learningPaths", () => {
  it("defines curated learning paths", () => {
    expect(LEARNING_PATHS.length).toBeGreaterThanOrEqual(3)
    for (const path of LEARNING_PATHS) {
      expect(path.steps.length).toBeGreaterThanOrEqual(3)
    }
  })

  it("computes progress from completed topics", () => {
    const path = LEARNING_PATHS[0]
    const progress = getPathProgress(path, [path.steps[0].topicId])
    expect(progress.done).toBe(1)
    expect(progress.total).toBe(path.steps.length)
    expect(progress.percent).toBeGreaterThan(0)
  })
})
