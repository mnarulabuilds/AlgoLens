import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import VisualizerToolbar from "../common/components/VisualizerToolbar"

describe("VisualizerToolbar", () => {
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
})
