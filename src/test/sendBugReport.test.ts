import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  isBugReportConfigured,
  sendBugReportEmail,
} from "../common/helpers/sendBugReport"

describe("sendBugReport", () => {
  const originalKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn())
  })

  afterEach(() => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = originalKey
    vi.unstubAllGlobals()
  })

  it("reports whether bug reporting is configured", () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = ""
    expect(isBugReportConfigured()).toBe(false)

    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    expect(isBugReportConfigured()).toBe(true)
  })

  it("throws when the access key is missing", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = ""

    await expect(
      sendBugReportEmail({ title: "Broken sort", description: "Steps...", file: null })
    ).rejects.toThrow("Bug reporting is not configured")
    expect(fetch).not.toHaveBeenCalled()
  })

  it("submits a bug report when configured", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    await sendBugReportEmail({
      title: "Broken sort",
      description: "Steps to reproduce",
      file: null,
      reporterEmail: "dev@example.com",
    })

    expect(fetch).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    )

    const [, requestInit] = vi.mocked(fetch).mock.calls[0]
    const body = JSON.parse(String(requestInit?.body))
    expect(body.access_key).toBe("test-key")
    expect(body.bug_title).toBe("Broken sort")
    expect(body.email).toBe("dev@example.com")
  })

  it("includes attachment metadata when a file is provided", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    const file = new File(["bytes"], "screenshot.png", { type: "image/png" })
    await sendBugReportEmail({
      title: "UI glitch",
      description: "See attachment",
      file,
    })

    const [, requestInit] = vi.mocked(fetch).mock.calls[0]
    const body = JSON.parse(String(requestInit?.body))
    expect(body.attachment_name).toBe("screenshot.png")
    expect(body.attachment_type).toBe("image/png")
  })

  it("throws a generic error when the API body is not JSON", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error("not json")
      },
    } as Response)

    await expect(
      sendBugReportEmail({ title: "Bug", description: "Details", file: null })
    ).rejects.toThrow("Failed to send bug report")
  })

  it("throws when the API returns an error", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: "Invalid access key" }),
    } as Response)

    await expect(
      sendBugReportEmail({ title: "Bug", description: "Details", file: null })
    ).rejects.toThrow("Invalid access key")
  })
})
