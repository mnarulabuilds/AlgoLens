import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import {
  VisualizerTopicProvider,
  useVisualizerTopic,
} from "../common/context/VisualizerTopicContext"

const topic = {
  id: "algo/Sorting",
  label: "Sorting",
  category: "Algorithms",
  route: "/algo/Sorting",
}

function TopicReader() {
  const current = useVisualizerTopic()
  return <span data-testid="topic">{current?.id ?? "none"}</span>
}

describe("VisualizerTopicContext", () => {
  it("provides the active visualizer topic", () => {
    render(
      <VisualizerTopicProvider topic={topic}>
        <TopicReader />
      </VisualizerTopicProvider>
    )
    expect(screen.getByTestId("topic")).toHaveTextContent("algo/Sorting")
  })

  it("returns null outside a provider", () => {
    render(<TopicReader />)
    expect(screen.getByTestId("topic")).toHaveTextContent("none")
  })
})
