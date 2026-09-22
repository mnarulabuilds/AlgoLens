import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { useRouteSeo } from "common/hooks/useRouteSeo"

function SeoProbe({ path }: { path: string }) {
  useRouteSeo(path)
  return null
}

describe("useRouteSeo", () => {
  it("sets home title and description", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<SeoProbe path="/" />} />
        </Routes>
      </MemoryRouter>
    )
    expect(document.title).toContain("AlgoLens")
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBeTruthy()
  })
})
