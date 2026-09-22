import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CopyShareLink from "common/components/CopyShareLink"

vi.mock("common/helpers/copyToClipboard", () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}))

import { copyToClipboard } from "common/helpers/copyToClipboard"

describe("CopyShareLink", () => {
  it("copies the current URL", async () => {
    const user = userEvent.setup()
    render(<CopyShareLink />)
    await user.click(screen.getByRole("button", { name: /copy link/i }))
    expect(copyToClipboard).toHaveBeenCalledWith(window.location.href)
    expect(await screen.findByText("Copied!")).toBeInTheDocument()
  })
})
