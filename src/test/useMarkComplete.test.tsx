import { describe, it, expect } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { UserProvider } from "../common/context/UserContext"
import { VisualizerTopicProvider } from "../common/context/VisualizerTopicContext"
import { useMarkComplete } from "../common/hooks/useMarkComplete"

const topic = {
  id: "algo/Sorting",
  label: "Sorting",
  category: "Algorithms",
  route: "/algo/Sorting",
}

function MarkCompleteConsumer({ topicId }: { topicId?: string }) {
  const markComplete = useMarkComplete(topicId)
  return (
    <button type="button" onClick={markComplete}>
      Complete
    </button>
  )
}

describe("useMarkComplete", () => {
  it("marks the visualizer topic complete from context", async () => {
    const user = userEvent.setup()
    render(
      <UserProvider>
        <VisualizerTopicProvider topic={topic}>
          <MarkCompleteConsumer />
        </VisualizerTopicProvider>
      </UserProvider>
    )

    await user.click(screen.getByRole("button", { name: "Complete" }))
    expect(localStorage.getItem("algolens_completed")).toContain("algo/Sorting")
  })

  it("uses an explicit topic id when provided", async () => {
    const user = userEvent.setup()
    render(
      <UserProvider>
        <MarkCompleteConsumer topicId="ds/Array" />
      </UserProvider>
    )

    await act(async () => {
      await user.click(screen.getByRole("button", { name: "Complete" }))
    })
    expect(localStorage.getItem("algolens_completed")).toContain("ds/Array")
  })
})
