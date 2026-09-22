import { describe, expect, it } from "vitest"
import {
  SEO,
  buildCanonicalUrl,
  buildWebSiteJsonLd,
} from "common/config/seo"

describe("seo config", () => {
  it("builds hash-router canonical URLs", () => {
    expect(buildCanonicalUrl("/algo/Sorting")).toBe(
      "https://mnarulabuilds.github.io/AlgoLens/#/algo/Sorting"
    )
  })

  it("exposes WebSite structured data", () => {
    const json = buildWebSiteJsonLd()
    expect(json["@type"]).toBe("WebSite")
    expect(json.url).toBe(SEO.siteUrl)
  })
})
