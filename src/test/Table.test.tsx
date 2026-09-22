import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { useState } from "react"
import EnhancedTable from "../common/components/Table"

const headCells = [
  { id: "name", label: "Name" },
  { id: "score", label: "Score", numeric: true },
]

const allRows = [
  { name: "Alice", score: 90 },
  { name: "Bob", score: 75 },
  { name: "Carol", score: 82 },
  { name: "Dave", score: 66 },
  { name: "Eve", score: 99 },
  { name: "Frank", score: 71 },
]

function TableHarness({
  deleteHandler = vi.fn(),
}: {
  deleteHandler?: (selected: (string | number)[]) => void
}) {
  const [rows, setRows] = useState(allRows)
  return (
    <EnhancedTable
      title="Scores"
      allRows={allRows}
      rows={rows}
      headCells={headCells}
      setFilteredRows={setRows}
      deleteHandler={deleteHandler}
    />
  )
}

describe("EnhancedTable", () => {
  it("sorts, searches, selects rows, and paginates", async () => {
    const user = userEvent.setup()
    render(<TableHarness />)

    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.queryByText("Frank")).not.toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText(/Rows per page/i), "5")
    await user.click(screen.getByRole("button", { name: "Next" }))
    expect(screen.getByText("Frank")).toBeInTheDocument()

    await user.click(screen.getByText("Score"))
    await user.click(screen.getByText("Score"))

    const search = screen.getByPlaceholderText("Search In Table")
    await user.type(search, "car")
    await user.click(screen.getByTitle("Filter table"))
    expect(screen.getByText("Carol")).toBeInTheDocument()
    expect(screen.queryByText("Alice")).not.toBeInTheDocument()

    await user.click(screen.getByLabelText("select all entries"))
    expect(screen.getByText(/1 selected/)).toBeInTheDocument()
  })

  it("deletes selected rows from the toolbar", async () => {
    const user = userEvent.setup()
    const deleteHandler = vi.fn()

    render(<TableHarness deleteHandler={deleteHandler} />)

    await user.click(screen.getByText("Bob"))
    await user.click(screen.getByTitle("Delete"))
    expect(deleteHandler).toHaveBeenCalledWith(["Bob"])
  })

  it("shows empty state messaging", () => {
    render(
      <EnhancedTable
        title="Empty"
        allRows={[]}
        rows={[]}
        headCells={headCells}
        setFilteredRows={() => {}}
        deleteHandler={() => {}}
      />
    )
    expect(
      screen.getByText(/No data found. Please add some entries/i)
    ).toBeInTheDocument()
  })
})
