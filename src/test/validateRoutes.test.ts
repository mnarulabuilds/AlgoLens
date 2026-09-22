import { describe, expect, it } from "vitest"
import { readFileSync, existsSync } from "fs"
import path from "path"
import { siteSuggestions } from "routing/base/routes"
import { siteModuleImportPath, siteModules } from "routing/base/siteModules"

describe("route registry integrity", () => {
  it("maps every registered route to a lazy-loaded module", () => {
    const missing: string[] = []
    for (const site of siteSuggestions) {
      const importPath = siteModuleImportPath(site.path)
      if (!siteModules[importPath]) {
        missing.push(importPath)
      }
    }
    expect(missing).toEqual([])
  })

  it("maps every registered route to an on-disk index.tsx", () => {
    const root = path.join(process.cwd(), "src/routing")
    const missing: string[] = []
    for (const site of siteSuggestions) {
      const filePath = path.join(root, `${site.path}/index.tsx`)
      if (!existsSync(filePath)) {
        missing.push(filePath)
      }
    }
    expect(missing).toEqual([])
  })

  it("uses unique topic ids", () => {
    const ids = siteSuggestions.map((s) => s.topicId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("assigns difficulty metadata to every suggestion", () => {
    for (const site of siteSuggestions) {
      expect(["beginner", "intermediate", "advanced"]).toContain(site.difficulty)
      expect(Array.isArray(site.prerequisites)).toBe(true)
    }
  })
})

describe("extended category modules", () => {
  it("registers extended categories in routes source", () => {
    const routesSource = readFileSync(
      path.join(process.cwd(), "src/routing/base/routes.ts"),
      "utf8"
    )
    expect(routesSource).toContain("EXTENDED_CATEGORIES")
  })
})
