import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { usePageMeta } from "common/hooks/usePageMeta"

function MetaProbe() {
  usePageMeta({
    title: "Test Title",
    description: "Test description",
    path: "/algo/Sorting",
  })
  return null
}

describe("usePageMeta", () => {
  it("sets title and meta tags", () => {
    render(<MetaProbe />)
    expect(document.title).toBe("Test Title")
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      "Test description"
    )
    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
      "Test Title"
    )
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toContain(
      "#/algo/Sorting"
    )
    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe(
      "summary_large_image"
    )
  })
})
