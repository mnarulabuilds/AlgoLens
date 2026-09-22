import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import BugReportForm from "../common/components/BugReportForm"
import * as sendBugReport from "../common/helpers/sendBugReport"

describe("BugReportForm", () => {
  const originalKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  beforeEach(() => {
    vi.spyOn(sendBugReport, "sendBugReportEmail").mockResolvedValue(undefined)
  })

  afterEach(() => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = originalKey
    vi.restoreAllMocks()
  })

  it("shows configuration warning when bug reporting is disabled", () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = ""
    render(<BugReportForm />)
    expect(screen.getByRole("alert")).toHaveTextContent(/not configured/i)
    expect(screen.getByRole("button", { name: "Submit Report" })).toBeDisabled()
  })

  it("submits a report and shows success state", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<BugReportForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/Bug Title/i), "Broken UI")
    await user.type(
      screen.getByLabelText(/Description/i),
      "Steps to reproduce the bug"
    )
    await user.click(screen.getByRole("button", { name: "Submit Report" }))

    await waitFor(() => {
      expect(sendBugReport.sendBugReportEmail).toHaveBeenCalled()
    })
    expect(onSubmit).toHaveBeenCalled()
    expect(
      screen.getByText(/Bug Reported Successfully!/i)
    ).toBeInTheDocument()
  })

  it("calls onCancel when cancel is clicked", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    const user = userEvent.setup()
    const onCancel = vi.fn()

    render(<BugReportForm onCancel={onCancel} />)
    await user.click(screen.getByRole("button", { name: "Cancel" }))
    expect(onCancel).toHaveBeenCalled()
  })

  it("shows an error when submission fails", async () => {
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY = "test-key"
    vi.mocked(sendBugReport.sendBugReportEmail).mockRejectedValue(
      new Error("Network down")
    )
    const user = userEvent.setup()

    render(<BugReportForm />)

    await user.type(screen.getByLabelText(/Bug Title/i), "Crash")
    await user.type(screen.getByLabelText(/Description/i), "Details here")
    await user.click(screen.getByRole("button", { name: "Submit Report" }))

    expect(await screen.findByRole("alert")).toHaveTextContent("Network down")
  })
})
