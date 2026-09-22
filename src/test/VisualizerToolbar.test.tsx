import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import VisualizerToolbar from "../common/components/VisualizerToolbar"

describe("VisualizerToolbar", () => {
  it("hides playback controls when idle", () => {
    render(
      <VisualizerToolbar
        isRunning={false}
        isPaused={false}
        speed={50}
        onSpeedChange={() => {}}
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
      />
    )

    expect(screen.queryByRole("button", { name: "Pause" })).not.toBeInTheDocument()
    expect(screen.getByLabelText(/Speed/i)).toBeInTheDocument()
  })

  it("renders playback controls when running", async () => {
    const user = userEvent.setup()
    const onPause = vi.fn()
    const onStop = vi.fn()

    render(
      <VisualizerToolbar
        isRunning
        isPaused={false}
        speed={50}
        onSpeedChange={() => {}}
        onPause={onPause}
        onResume={() => {}}
        onStop={onStop}
        onStep={() => {}}
      />
    )

    await user.click(screen.getByRole("button", { name: "Pause" }))
    expect(onPause).toHaveBeenCalled()
  })

  it("shows step control and keyboard hints when paused", async () => {
    const user = userEvent.setup()
    const onStep = vi.fn()
    const onReset = vi.fn()

    render(
      <VisualizerToolbar
        isRunning
        isPaused
        speed={80}
        onSpeedChange={() => {}}
        onPause={() => {}}
        onResume={() => {}}
        onStop={() => {}}
        onStep={onStep}
        onReset={onReset}
      />
    )

    await user.click(screen.getByRole("button", { name: "Next step" }))
    expect(onStep).toHaveBeenCalled()
    expect(screen.getByText(/Space/)).toBeInTheDocument()
    expect(screen.getByText(/reset/i)).toBeInTheDocument()
  })
})
