import React, { useCallback, useState } from "react"
import { Alert } from "common/components/Ui"
import "./Game.module.scss"

const Choice = {
  C: "HELP",
  D: "BETRAY",
}
type PrisonerChoice = typeof Choice[keyof typeof Choice]
type AlertState = { text: string; type: "danger" } | null

const Game = () => {
  const [numPrisoners, setNumPrisoners] = useState(2)
  const [grid, setGrid] = useState<PrisonerChoice[][]>(
    Array.from({ length: 2 }, () => Array<PrisonerChoice>(2).fill(Choice.C))
  )
  const [alert, setAlert] = useState<AlertState>(null)
  const payoffs = grid.map((row) =>
    row.map((cell, x) => {
      let payoff = 0
      if (cell === Choice.C) {
        payoff += row.filter((c) => c === Choice.C).length - 1 // Coop with row members
        payoff += grid.map((r) => r[x]).filter((c) => c === Choice.C).length - 1 // Coop with col members
      } else {
        payoff += row.filter((c) => c === Choice.D).length // Defect with row members
        payoff += grid.map((r) => r[x]).filter((c) => c === Choice.D).length // Defect with col members
      }
      return payoff
    })
  )

  const handleNumPrisonersChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value)
      if (value < 2 || value > 8) {
        setAlert({
          text: "Number of prisoners must be between 2 and 8",
          type: "danger",
        })
        return
      }
      setNumPrisoners(value)
      setGrid(
        Array.from({ length: value }, () =>
          Array<PrisonerChoice>(value).fill(Choice.C)
        )
      )
    },
    []
  )

  const toggleCell = useCallback(
    (x, y) => {
      const newGrid = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === y && colIndex === x) {
            return cell === Choice.C ? Choice.D : Choice.C
          }
          return cell
        })
      )
      setGrid(newGrid)
    },
    [grid]
  )

  return (
    <div className="game-prisoners-dilemma">
      <h1>Prisoner&apos;s Dilemma</h1>
      <label>
        Number of Prisoners and Turns{" "}
        <input
          type="number"
          value={numPrisoners}
          onChange={handleNumPrisonersChange}
          min="2"
          max="8"
        />
      </label>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${numPrisoners}, minmax(48px, 1fr))`,
        }}
      >
        {grid.map((row, y) => (
          <div key={y} className="row">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`cell ${cell === Choice.C ? "C" : "D"}`}
                onClick={() => toggleCell(x, y)}
              >
                {cell} ({payoffs[y][x]})
              </div>
            ))}
          </div>
        ))}
      </div>
      {alert && (
        <Alert
          color={alert.type}
          isOpen={!!alert.text}
          toggle={() => setAlert(null)}
        >
          {alert.text}
        </Alert>
      )}
    </div>
  )
}

export default Game
