import { describe, expect, it, vi } from "vitest"
import { copyToClipboard } from "common/helpers/copyToClipboard"

describe("copyToClipboard", () => {
  it("returns true when clipboard API succeeds", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })
    await expect(copyToClipboard("https://example.com")).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith("https://example.com")
  })

  it("returns false when clipboard is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    })
    await expect(copyToClipboard("x")).resolves.toBe(false)
  })
})
