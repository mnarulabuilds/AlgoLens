import React, { useEffect, useMemo, useState } from "react"
import styles from "./SudokuGame.module.css"

// ------------------------------------------------------------
// SudokuGame (React + CSS Modules, no TypeScript)
// Features:
// - New Game (Easy/Medium/Hard) with generated puzzles
// - Pencil notes, Undo/Redo, Hint, Check, Clear
// - Conflict highlighting, row/col/box & same-number highlights
// - Keyboard controls: arrows/WASD, 1-9, 0/Delete, Enter toggles pencil
// - Timer with pause/resume
// ------------------------------------------------------------

// ---------- Helpers ----------
const deepCopy = (b) => b.map((r) => [...r])
const makeEmptyBoard = () => Array.from({ length: 9 }, () => Array(9).fill(0))

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function isValid(board, row, col, num) {
  if (num < 1 || num > 9) return false
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false
    if (board[i][col] === num && i !== row) return false
  }
  const sr = Math.floor(row / 3) * 3
  const sc = Math.floor(col / 3) * 3
  for (let r = sr; r < sr + 3; r++) {
    for (let c = sc; c < sc + 3; c++) {
      if (board[r][c] === num && (r !== row || c !== col)) return false
    }
  }
  return true
}

function findEmpty(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) return [r, c]
    }
  }
  return null
}

function solveBoard(board) {
  const empty = findEmpty(board)
  if (!empty) return true
  const [row, col] = empty
  for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num
      if (solveBoard(board)) return true
      board[row][col] = 0
    }
  }
  return false
}

function generateSolved() {
  const b = makeEmptyBoard()
  solveBoard(b)
  return b
}

function countSolutions(board, limit = 2) {
  function helper(b, count) {
    if (count.n >= limit) return true
    const empty = findEmpty(b)
    if (!empty) {
      count.n += 1
      return count.n >= limit
    }
    const [row, col] = empty
    for (let num = 1; num <= 9; num++) {
      if (isValid(b, row, col, num)) {
        b[row][col] = num
        if (helper(b, count)) return true
        b[row][col] = 0
      }
    }
    return false
  }
  const copy = deepCopy(board)
  const c = { n: 0 }
  helper(copy, c)
  return c.n
}

function removeCellsForDifficulty(solved, difficulty) {
  const removals = { Easy: 40, Medium: 50, Hard: 58 }[difficulty] || 50
  const puzzle = deepCopy(solved)
  const cells = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  )
  let removed = 0
  for (const [r, c] of cells) {
    if (removed >= removals) break
    const backup = puzzle[r][c]
    if (backup === 0) continue
    puzzle[r][c] = 0
    if (countSolutions(puzzle, 2) !== 1) {
      puzzle[r][c] = backup // keep unique
    } else {
      removed++
    }
  }
  return puzzle
}

function computeConflicts(board) {
  const conflicts = new Set()
  // rows/cols
  for (let i = 0; i < 9; i++) {
    const rowSeen = {}
    const colSeen = {}
    for (let j = 0; j < 9; j++) {
      const rv = board[i][j]
      const cv = board[j][i]
      if (rv !== 0) {
        ;(rowSeen[rv] ||= []).push(j)
      }
      if (cv !== 0) {
        ;(colSeen[cv] ||= []).push(j)
      }
    }
    Object.keys(rowSeen).forEach((k) => {
      if (rowSeen[k].length > 1)
        rowSeen[k].forEach((j) => conflicts.add(`${i},${j}`))
    })
    Object.keys(colSeen).forEach((k) => {
      if (colSeen[k].length > 1)
        colSeen[k].forEach((j) => conflicts.add(`${j},${i}`))
    })
  }
  // boxes
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const seen = {}
      for (let r = br * 3; r < br * 3 + 3; r++)
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          const v = board[r][c]
          if (v !== 0) (seen[v] ||= []).push([r, c])
        }
      Object.keys(seen).forEach((k) => {
        if (seen[k].length > 1)
          seen[k].forEach(([r, c]) => conflicts.add(`${r},${c}`))
      })
    }
  }
  return conflicts
}

function boardEquals(a, b) {
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) if (a[r][c] !== b[r][c]) return false
  return true
}

// ---------- Component ----------
export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState("Easy")
  const [board, setBoard] = useState(makeEmptyBoard())
  const [fixed, setFixed] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(false))
  )
  const [solution, setSolution] = useState(null)
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()))
  )
  const [pencil, setPencil] = useState(false)
  const [history, setHistory] = useState([])
  const [future, setFuture] = useState([])
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [paused, setPaused] = useState(false)

  const conflicts = useMemo(() => computeConflicts(board), [board])

  // Timer
  useEffect(() => {
    if (startTime === null || paused) return
    const id = setInterval(() => setElapsed(Date.now() - startTime), 250)
    return () => clearInterval(id)
  }, [startTime, paused])

  function pushHistory(next) {
    setHistory((h) => [...h, deepCopy(board)])
    setFuture([])
    setBoard(next)
  }

  function undo() {
    setHistory((h) => {
      if (h.length === 0) return h
      const prev = h[h.length - 1]
      setFuture((f) => [deepCopy(board), ...f])
      setBoard(prev)
      return h.slice(0, -1)
    })
  }

  function redo() {
    setFuture((f) => {
      if (f.length === 0) return f
      const next = f[0]
      setHistory((h) => [...h, deepCopy(board)])
      setBoard(next)
      return f.slice(1)
    })
  }

  function formatTime(ms) {
    const s = Math.floor(ms / 1000)
    const mm = String(Math.floor(s / 60)).padStart(2, "0")
    const ss = String(s % 60).padStart(2, "0")
    return `${mm}:${ss}`
  }

  function newGame(diff) {
    const solved = generateSolved()
    const puzzle = removeCellsForDifficulty(solved, diff)
    const fixedMatrix = puzzle.map((row) => row.map((v) => v !== 0))

    setDifficulty(diff)
    setBoard(deepCopy(puzzle))
    setFixed(fixedMatrix)
    setSolution(deepCopy(solved))
    setSelected(null)
    setNotes(
      Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => new Set())
      )
    )
    setHistory([])
    setFuture([])
    setStartTime(Date.now())
    setElapsed(0)
    setPaused(false)
  }

  useEffect(() => {
    newGame("Easy")
  }, [])

  const selectedVal = selected ? board[selected.r][selected.c] : 0

  function placeNumber(num) {
    if (!selected) return
    const { r, c } = selected
    if (fixed[r][c]) return
    const next = deepCopy(board)
    if (pencil) {
      const n = new Set(notes[r][c])
      if (n.has(num)) n.delete(num)
      else n.add(num)
      const newNotes = notes.map((row, ri) =>
        row.map((s, ci) => (ri === r && ci === c ? n : new Set(s)))
      )
      setNotes(newNotes)
      return
    } else {
      next[r][c] = num
      pushHistory(next)
      // Clear notes in peers
      const newNotes = notes.map((row) => row.map((s) => new Set(s)))
      for (let i = 0; i < 9; i++) newNotes[r][i].delete(num)
      for (let i = 0; i < 9; i++) newNotes[i][c].delete(num)
      const sr = Math.floor(r / 3) * 3
      const sc = Math.floor(c / 3) * 3
      for (let rr = sr; rr < sr + 3; rr++)
        for (let cc = sc; cc < sc + 3; cc++) newNotes[rr][cc].delete(num)
      setNotes(newNotes)
    }
  }

  function clearCell() {
    if (!selected) return
    const { r, c } = selected
    if (fixed[r][c]) return
    const next = deepCopy(board)
    next[r][c] = 0
    pushHistory(next)
  }

  function fillHint() {
    if (!solution) return
    const empties = []
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) if (board[r][c] === 0) empties.push([r, c])
    if (empties.length === 0) return
    const [r, c] = empties[Math.floor(Math.random() * empties.length)]
    const next = deepCopy(board)
    next[r][c] = solution[r][c]
    pushHistory(next)
  }

  function checkBoard() {
    const complete = board.flat().every((v) => v !== 0)
    const correct = solution ? boardEquals(board, solution) : false
    return { complete, correct }
  }

  // Keyboard
  useEffect(() => {
    function onKey(e) {
      if (!selected) return
      const { r, c } = selected
      if (e.key >= "1" && e.key <= "9") {
        placeNumber(parseInt(e.key, 10))
      } else if (["Backspace", "Delete", "0"].includes(e.key)) {
        e.preventDefault()
        clearCell()
      } else if (["ArrowUp", "w", "W"].includes(e.key)) {
        e.preventDefault()
        setSelected({ r: Math.max(0, r - 1), c })
      } else if (["ArrowDown", "s", "S"].includes(e.key)) {
        e.preventDefault()
        setSelected({ r: Math.min(8, r + 1), c })
      } else if (["ArrowLeft", "a", "A"].includes(e.key)) {
        e.preventDefault()
        setSelected({ r, c: Math.max(0, c - 1) })
      } else if (["ArrowRight", "d", "D"].includes(e.key)) {
        e.preventDefault()
        setSelected({ r, c: Math.min(8, c + 1) })
      } else if (e.key === "Enter") {
        setPencil((p) => !p)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, board, pencil, notes])

  // UI helpers
  function cellClass(r, c, v) {
    const isFixed = fixed[r][c]
    const isSelected = selected && selected.r === r && selected.c === c
    const sameNumber = selectedVal !== 0 && v === selectedVal
    const inSame =
      selected &&
      (selected.r === r ||
        selected.c === c ||
        (Math.floor(selected.r / 3) === Math.floor(r / 3) &&
          Math.floor(selected.c / 3) === Math.floor(c / 3)))
    const isConflict = conflicts.has(`${r},${c}`)

    return [
      styles.cell,
      isFixed ? styles.cellFixed : "",
      isSelected ? styles.cellSelected : "",
      inSame && !isSelected ? styles.cellPeer : "",
      sameNumber && !isSelected ? styles.cellSame : "",
      isConflict ? styles.cellConflict : "",
    ]
      .filter(Boolean)
      .join(" ")
  }

  const { complete, correct } = useMemo(() => checkBoard(), [board, solution])

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Sudoku</h1>
          <p className={styles.hint}>
            Keys: 1–9 fill • 0/Delete clear • Arrows/WASD move • Enter = Pencil
          </p>
        </div>
        <div className={styles.toolbar}>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={styles.select}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button
            onClick={() => newGame(difficulty)}
            className={styles.primaryBtn}
          >
            New Game
          </button>
          <button
            onClick={() => setPencil((p) => !p)}
            className={`${styles.button} ${pencil ? styles.buttonActive : ""}`}
            title="Toggle pencil mode"
          >
            ✏️ {pencil ? "Pencil On" : "Pencil Off"}
          </button>
          <button
            onClick={undo}
            className={styles.button}
            disabled={history.length === 0}
          >
            ⟲ Undo
          </button>
          <button
            onClick={redo}
            className={styles.button}
            disabled={future.length === 0}
          >
            ⟳ Redo
          </button>
          <button onClick={fillHint} className={styles.button}>
            💡 Hint
          </button>
          <button
            onClick={() => setPaused((p) => !p)}
            className={styles.button}
          >
            {paused ? "▶️ Resume" : "⏸️ Pause"}
          </button>
          <div className={styles.timer}>⏱️ {formatTime(elapsed)}</div>
        </div>
      </div>

      <div className={styles.gameRow}>
        {/* Board */}
        <div className={styles.board}>
          {Array.from({ length: 9 }, (_, r) => (
            <React.Fragment key={r}>
              {Array.from({ length: 9 }, (_, c) => {
                const v = board[r][c]
                const isFixed = fixed[r][c]
                return (
                  <button
                    key={`${r}-${c}`}
                    className={cellClass(r, c, v)}
                    onClick={() => setSelected({ r, c })}
                  >
                    {v !== 0 ? (
                      <span
                        className={isFixed ? styles.valFixed : styles.valUser}
                      >
                        {v}
                      </span>
                    ) : notes[r][c].size > 0 ? (
                      <div className={styles.notesGrid}>
                        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                          <span key={n} className={styles.note}>
                            {notes[r][c].has(n) ? n : "\u00A0"}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={styles.placeholder}>0</span>
                    )}
                  </button>
                )
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Numpad */}
        <div className={styles.sidePanel}>
          <div className={styles.numpad}>
            {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => placeNumber(n)}
                className={styles.numpadBtn}
              >
                {pencil ? `✏️ ${n}` : n}
              </button>
            ))}
            <button
              onClick={clearCell}
              className={`${styles.numpadBtn} ${styles.wide}`}
            >
              ⌫ Clear
            </button>
            <button
              onClick={() => {
                if (complete && correct) {
                  alert("🎉 Puzzle complete! Great job.")
                  setPaused(true)
                } else if (complete && !correct) {
                  alert(
                    "Filled but incorrect — check red conflicts or use a hint."
                  )
                } else {
                  alert("Keep going — there are still empty cells.")
                }
              }}
              className={`${styles.primaryBtn} ${styles.wide}`}
            >
              ✅ Check Progress
            </button>
          </div>

          <div className={styles.legend}>
            <div>
              <span
                className={`${styles.legendSwatch} ${styles.swatchGiven}`}
              ></span>{" "}
              Given cell
            </div>
            <div>
              <span
                className={`${styles.legendSwatch} ${styles.swatchSame}`}
              ></span>{" "}
              Same number
            </div>
            <div>
              <span
                className={`${styles.legendSwatch} ${styles.swatchPeer}`}
              ></span>{" "}
              Same row/col/box
            </div>
            <div>
              <span
                className={`${styles.legendSwatch} ${styles.swatchConflict}`}
              >
                x
              </span>{" "}
              Conflict
            </div>
          </div>

          <div className={styles.statusBox}>
            <div className={styles.statusRow}>
              <span>Status:</span>
              <span
                className={
                  complete
                    ? correct
                      ? styles.solved
                      : styles.filledWrong
                    : styles.inProgress
                }
              >
                {complete
                  ? correct
                    ? "Solved"
                    : "Filled but incorrect"
                  : "In progress"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerNote}>
        Pro tip: Use ✏️ pencil mode to jot candidates; press Enter to toggle
        quickly.
      </div>
    </div>
  )
}
