import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import React from "react"
import Board from "../common/components/Board"

describe("Board", () => {
  it("renders a grid with queens placed on given cells", () => {
    const { container } = render(<Board size={4} queens={[0, 5, 10, 15]} />)
    const cells = container.querySelectorAll(".ch-board > div")
    expect(cells.length).toBe(16)
    expect(container.querySelectorAll("svg").length).toBe(4)
  })
})
