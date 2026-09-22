import { describe, expect, it } from "vitest"
import { buildSiteRegistry } from "routing/base/siteRegistry"
import type { Category } from "routing/base/routeTypes"

const sample: Category[] = [
  {
    topic: "demo",
    label: "Demo",
    pages: [
      { topic: "One", label: "One", difficulty: "beginner", prerequisites: [] },
      {
        topic: "Two",
        label: "Two",
        prerequisites: ["demo/One"],
      },
    ],
  },
]

describe("buildSiteRegistry", () => {
  it("builds suggestions with defaults", () => {
    const { siteSuggestions } = buildSiteRegistry(sample)
    expect(siteSuggestions).toHaveLength(2)
    expect(siteSuggestions[0].route).toBe("/demo/One")
    expect(siteSuggestions[0].path).toBe("site/demo/components/One")
    expect(siteSuggestions[1].difficulty).toBe("intermediate")
    expect(siteSuggestions[1].prerequisites).toEqual(["demo/One"])
  })

  it("resolves topics by route", () => {
    const { getTopicFromRoute } = buildSiteRegistry(sample)
    expect(getTopicFromRoute("/demo/Two")?.id).toBe("demo/Two")
    expect(getTopicFromRoute("/missing")).toBeUndefined()
  })
})
