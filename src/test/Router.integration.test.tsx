import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import React, { Suspense } from "react"
import { UserProvider } from "../common/context/UserContext"
import { ThemeProvider } from "../common/context/ThemeContext"
import RouteSection from "../routing/base/Router"

function AppShell({ initialPath = "/" }: { initialPath?: string }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Suspense fallback={<div>Loading shell...</div>}>
          <RouteSection pathname={initialPath} />
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  )
}

describe("Router integration", () => {
  it("renders the dashboard on the home route", async () => {
    render(<AppShell initialPath="/" />)

    await waitFor(() => {
      expect(screen.getByText(/Welcome to AlgoLens/i)).toBeInTheDocument()
    })
  })

  it("loads a lazy visualizer route with learn panel", async () => {
    render(<AppShell initialPath="/algo/Sorting" />)

    await waitFor(
      () => {
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
          /Sorting/i
        )
        expect(
          screen.getByRole("button", { name: /Learn/i })
        ).toBeInTheDocument()
      },
      { timeout: 5000 }
    )
  })
})
