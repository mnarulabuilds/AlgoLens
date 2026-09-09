import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { ThemeProvider, useTheme } from "../common/context/ThemeContext"

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  )
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-theme")
  })

  it("defaults to dark when no preference is stored", () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )

    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark")
  })

  it("restores a saved theme from localStorage", () => {
    localStorage.setItem("algolens_theme", "light")

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )

    expect(screen.getByTestId("theme")).toHaveTextContent("light")
    expect(document.documentElement.getAttribute("data-theme")).toBe("light")
  })

  it("toggles theme and persists the choice", async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>
    )

    await user.click(screen.getByText("Toggle theme"))
    expect(screen.getByTestId("theme")).toHaveTextContent("light")
    expect(localStorage.getItem("algolens_theme")).toBe("light")
    expect(document.documentElement.getAttribute("data-theme")).toBe("light")

    await user.click(screen.getByText("Toggle theme"))
    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(localStorage.getItem("algolens_theme")).toBe("dark")
  })
})
