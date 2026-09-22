import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import CustomizedDialogs from "../common/components/LightBox"

describe("CustomizedDialogs", () => {
  it("runs open callback and handles accept/reject actions", async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    const onClose = vi.fn()
    const onAccept = vi.fn()
    const onReject = vi.fn()

    render(
      <CustomizedDialogs
        dialogConfig={{
          open: { callback: onOpen },
          close: { callback: onClose },
          title: "Confirm",
          contentJSX: <p>Body text</p>,
          accept: { text: "Yes", callback: onAccept },
          reject: { text: "No", callback: onReject },
        }}
      />
    )

    expect(onOpen).toHaveBeenCalled()
    expect(screen.getByText("Confirm")).toBeInTheDocument()
    expect(screen.getByText("Body text")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Yes" }))
    expect(onAccept).toHaveBeenCalled()

    await user.click(screen.getByRole("button", { name: "No" }))
    expect(onReject).toHaveBeenCalled()
  })

  it("closes via backdrop when close handler is set", async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <CustomizedDialogs
        dialogConfig={{
          open: true,
          close: { callback: onClose },
          title: "Dialog",
          contentJSX: <span>Content</span>,
        }}
      />
    )

    await user.click(screen.getByText("Content").closest(".dialog-backdrop")!)
    expect(onClose).toHaveBeenCalled()
  })
})
