import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { useRef } from "react"
import useOutsideClick from "../common/hooks/useOutsideClick"

function OutsideClickProbe({ onOutside }: { onOutside: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, onOutside)

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <button type="button">Outside</button>
    </div>
  )
}

describe("useOutsideClick", () => {
  it("calls the callback when clicking outside the ref element", async () => {
    const user = userEvent.setup()
    const onOutside = vi.fn()

    render(<OutsideClickProbe onOutside={onOutside} />)

    await user.click(screen.getByTestId("inside"))
    expect(onOutside).not.toHaveBeenCalled()

    await user.click(screen.getByRole("button", { name: "Outside" }))
    expect(onOutside).toHaveBeenCalledTimes(1)
  })
})
