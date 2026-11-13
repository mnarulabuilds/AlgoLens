import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import React, { Suspense } from "react"
import { UserProvider } from "../common/context/UserContext"
import { ThemeProvider } from "../common/context/ThemeContext"
import RouteSection, { DynamicLoader } from "../routing/base/Router"

function RouterShell({ initialPath }: { initialPath: string }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <Suspense fallback={<div>Loading…</div>}>
          <RouteSection pathname={initialPath} />
        </Suspense>
      </UserProvider>
    </ThemeProvider>
  )
}

describe("Router", () => {
  beforeEach(() => {
    document.title = "initial"
  })

  it("sets document titles for core routes", async () => {
    render(<RouterShell initialPath="/" />)
    await waitFor(() => {
      expect(document.title).toBe("AlgoLens – Interactive CS Visualizations")
    })

    render(<RouterShell initialPath="/profile" />)
    await waitFor(() => {
      expect(document.title).toBe("My Profile | AlgoLens")
    })

    render(<RouterShell initialPath="/missing/visualizer" />)
    await waitFor(() => {
      expect(document.title).toBe("Page Not Found | AlgoLens")
    })
  })

  it("renders category and not-found routes", async () => {
    render(<RouterShell initialPath="/algo" />)
    await waitFor(() => {
      expect(screen.getByText(/Algorithms/i)).toBeInTheDocument()
    })

    render(<RouterShell initialPath="/nope/nope" />)
    await waitFor(() => {
      expect(screen.getByText(/Page not found/i)).toBeInTheDocument()
    })
  })

  it("wraps lazy components through DynamicLoader", async () => {
    const LazyChild = React.lazy(async () => ({
      default: () => <span>Lazy child</span>,
    }))

    render(
      <Suspense fallback={<div>wait</div>}>{DynamicLoader(LazyChild)}</Suspense>
    )

    expect(await screen.findByText("Lazy child")).toBeInTheDocument()
  })
})
