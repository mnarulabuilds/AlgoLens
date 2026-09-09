import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { UserProvider } from "../common/context/UserContext"
import FavoriteButton from "../common/components/FavoriteButton"

const topic = {
  id: "algo/Sorting",
  label: "Sorting 📊",
  category: "Algorithms 🧠",
  route: "/algo/Sorting",
}

describe("FavoriteButton", () => {
  it("adds and removes a favorite", async () => {
    const user = userEvent.setup()

    render(
      <UserProvider>
        <FavoriteButton topic={topic} />
      </UserProvider>
    )

    const button = screen.getByRole("button", { name: "Add to favorites" })
    await user.click(button)
    expect(
      screen.getByRole("button", { name: "Remove from favorites" })
    ).toBeInTheDocument()
    expect(screen.getByText("Added to favorites!")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Remove from favorites" }))
    expect(
      screen.getByRole("button", { name: "Add to favorites" })
    ).toBeInTheDocument()
  })
})
