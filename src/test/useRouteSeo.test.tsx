import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { useRouteSeo } from "common/hooks/useRouteSeo"

function SeoProbe({ path }: { path: string }) {
  useRouteSeo(path)
  return null
}

describe("useRouteSeo", () => {
  it("sets home title and description", () => {
    render(<SeoProbe path="/" />)
    expect(document.title).toContain("AlgoLens")
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
    ).toBeTruthy()
  })
})
