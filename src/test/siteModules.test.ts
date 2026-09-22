import { describe, it, expect } from "vitest"
import { siteSuggestions } from "../routing/base/routes"
import {
  loadSiteModule,
  siteModuleImportPath,
  siteModules,
} from "../routing/base/siteModules"

describe("siteModules", () => {
  it("loads every registered visualizer entry point", async () => {
    for (const site of siteSuggestions) {
      const mod = await loadSiteModule(site.path)
      expect(mod.default).toBeTruthy()
    }
  }, 120_000)

  it("resolves import paths and rejects missing modules", async () => {
    const samplePath = siteSuggestions[0].path
    expect(siteModuleImportPath(samplePath)).toBe(`../${samplePath}/index.tsx`)
    await expect(loadSiteModule("this/path/does/not/exist")).rejects.toThrow(
      /Missing site module/
    )
    expect(siteModules[siteModuleImportPath(siteSuggestions[0].path)]).toBeTypeOf(
      "function"
    )
  })
})
