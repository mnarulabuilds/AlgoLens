import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import SimWorkbench from "../common/components/SimWorkbench"

describe("SimWorkbench", () => {
  it("renders title, optional slots, and children", () => {
    render(
      <SimWorkbench
        title="Simulation"
        toolbar={<span>Toolbar</span>}
        controls={<span>Controls</span>}
        hint="Use the sliders"
      >
        <div>Stage</div>
      </SimWorkbench>
    )

    expect(screen.getByRole("heading", { name: "Simulation" })).toBeInTheDocument()
    expect(screen.getByText("Toolbar")).toBeInTheDocument()
    expect(screen.getByText("Controls")).toBeInTheDocument()
    expect(screen.getByText("Stage")).toBeInTheDocument()
    expect(screen.getByText("Use the sliders")).toBeInTheDocument()
  })
})
