import { describe, expect, it } from "vitest"
import {
  SEO,
  buildCanonicalUrl,
  buildWebSiteJsonLd,
  seoImageUrl,
} from "common/config/seo"

describe("seo config", () => {
  it("builds path-based canonical URLs", () => {
    expect(buildCanonicalUrl("/algo/Sorting")).toBe(
      "https://mnarulabuilds.github.io/AlgoLens/algo/Sorting/"
    )
  })

  it("exposes WebSite structured data", () => {
    const json = buildWebSiteJsonLd()
    expect(json["@type"]).toBe("WebSite")
    expect(json.url).toBe(SEO.siteUrl)
  })

  it("includes the GitHub Pages project path in social image URLs", () => {
    expect(seoImageUrl()).toBe(
      "https://mnarulabuilds.github.io/AlgoLens/logo512.png"
    )
  })
})
