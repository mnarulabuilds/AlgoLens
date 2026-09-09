import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/react"
import React from "react"
import { UserProvider, TopicRef } from "../common/context/UserContext"
import useTrackView from "../common/hooks/useTrackView"

const topic: TopicRef = {
  id: "algo/Sorting",
  label: "Sorting 📊",
  category: "Algorithms 🧠",
  route: "/algo/Sorting",
}

describe("useTrackView", () => {
  it("does not loop when tracking the same topic", async () => {
    let renderCount = 0

    function TrackViewProbe() {
      renderCount += 1
      useTrackView(topic)
      return null
    }

    render(
      <UserProvider>
        <TrackViewProbe />
      </UserProvider>
    )

    await waitFor(
      () => {
        expect(renderCount).toBeLessThan(10)
      },
      { timeout: 500 }
    )
  })
})
