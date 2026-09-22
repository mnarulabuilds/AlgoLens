import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import Element from "../common/components/Element"

describe("Element", () => {
  it("returns null without data", () => {
    const { container } = render(
      <Element type="array" data={null} highlight={false} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders stack top marker and value", () => {
    render(
      <Element
        type="stack"
        data={{ value: 42, index: 0 }}
        highlight
      />
    )
    expect(screen.getByText("Top")).toBeInTheDocument()
    expect(screen.getByText("42")).toBeInTheDocument()
  })

  it("renders linked list head, tail, and next link", () => {
    const { rerender } = render(
      <Element
        type="linkedlist"
        data={{ value: "A", index: 0 }}
        highlight={false}
        next
      />
    )
    expect(screen.getByText(/Head/)).toBeInTheDocument()

    rerender(
      <Element
        type="linkedlist"
        data={{ value: "Z", index: 2 }}
        highlight={false}
        next={false}
      />
    )
    expect(screen.getByText("Tail")).toBeInTheDocument()
  })

  it("renders set nodes with comparison highlights", () => {
    render(
      <Element
        type="sets"
        data={{ value: 7, index: 0 }}
        highlight={false}
        AllGreater
      />
    )
    expect(screen.getByText("7")).toBeInTheDocument()
  })
})
