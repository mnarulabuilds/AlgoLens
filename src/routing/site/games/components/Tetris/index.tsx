import React, { useEffect, useMemo, useState } from "react"
import styles from "./Tetris.module.css"

const COLS = 10
const ROWS = 20
const EMPTY = 0 // empty marker
const MAX_LEVEL = 50

const TETROMINOES = {
  I: {
    color: "#5ab3ff",
    shapes: [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
    ],
  },
  J: {
    color: "#7fb4ff",
    shapes: [
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
      ],
    ],
  },
  L: {
    color: "#ffc857",
    shapes: [
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  O: {
    color: "#ffb02e",
    shapes: [
      [
        [1, 1],
        [1, 1],
      ],
    ],
  },
  S: {
    color: "#4ad6a7",
    shapes: [
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1],
      ],
    ],
  },
  T: {
    color: "#b694ff",
    shapes: [
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
    ],
  },
  Z: {
    color: "#ff6b6b",
    shapes: [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ],
  },
}
const BAG_KEYS = Object.keys(TETROMINOES)

// ——————————— Utility helpers ———————————
const makeEmptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY))

function randomBag() {
  const bag = [...BAG_KEYS]
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[bag[i], bag[j]] = [bag[j], bag[i]]
  }
  return bag
}

function rotate(shape, dir = 1) {
  const N = shape.length
  const res = Array.from({ length: N }, () => Array(N).fill(0))
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (dir > 0) res[x][N - 1 - y] = shape[y][x]
      else res[N - 1 - x][y] = shape[y][x]
    }
  }
  return res
}

const cloneBoard = (b) => b.map((r) => [...r])

function canPlace(board, shape, px, py) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue
      const nx = px + x
      const ny = py + y
      if (nx < 0 || nx >= COLS || ny >= ROWS) return false
      if (ny >= 0 && board[ny][nx] !== EMPTY) return false
    }
  }
  return true
}

function placePiece(board, shape, px, py, color) {
  const out = cloneBoard(board)
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (!shape[y][x]) continue
      const nx = px + x
      const ny = py + y
      if (ny >= 0) out[ny][nx] = color
    }
  }
  return out
}

function clearLines(board) {
  const remaining = board.filter((row) => row.some((c) => c === EMPTY))
  const cleared = ROWS - remaining.length
  const newRows = Array.from({ length: cleared }, () => Array(COLS).fill(EMPTY))
  return { board: [...newRows, ...remaining], cleared }
}

function spawnPiece(key) {
  const def = TETROMINOES[key]
  const shape = def.shapes[0].map((r) => [...r])
  const size = shape[0].length
  return {
    key,
    color: def.color,
    rotationIndex: 0,
    shape,
    x: Math.floor((COLS - size) / 2),
    y: -2,
  }
}

// Boss + difficulty
function levelTimeLimit(level, isBonus) {
  if (isBonus) return Math.max(240, 180 - Math.floor(level * 0.6))
  return Math.max(360, 360 - level * 2)
}
function gravityForLevel(level) {
  const base = 900 // ms
  const step = 18 // per level faster
  return Math.max(120, base - (level - 1) * step)
}
const bossNames = [
  "Bitcrusher",
  "Latency Lord",
  "Null Pointer",
  "Stack Smasher",
  "Garbage Colossus",
  "Packet Phantom",
  "Heisen-Bug",
  "Kernel Kraken",
  "Cache Minotaur",
  "Daemon Duke",
]
const bossTaunts = [
  "Feel the overclock!",
  "I throttle time itself.",
  "Your stack will overflow.",
  "My speed is inevitable.",
  "I'll fragment your hopes.",
  "Packets lost, dreams gone.",
  "Observe non-determinism!",
  "Segfaulting your plans.",
  "Cache this L.",
  "Daemon time!",
]
const bossNameFor = (lvl) =>
  `${bossNames[(lvl - 1) % bossNames.length]} v${lvl}`
const bossTauntFor = (lvl) => bossTaunts[(lvl - 1) % bossTaunts.length]

// ——————————— Component ———————————
export default function TetrisBossRush() {
  // board + pieces
  const [board, setBoard] = useState(makeEmptyBoard())
  const [bag, setBag] = useState(randomBag())
  const [nextBag, setNextBag] = useState(randomBag())
  const [queue, setQueue] = useState(() => {
    const b = randomBag()
    return b
  })
  const [current, setCurrent] = useState(() => spawnPiece(queue[0]))
  const [hold, setHold] = useState(null)
  const [canHold, setCanHold] = useState(true)

  // meta
  const [level, setLevel] = useState(1)
  const [linesThisLevel, setLinesThisLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(levelTimeLimit(1, false))
  const [paused, setPaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [medal, setMedal] = useState(false)
  const [isBonus, setIsBonus] = useState(false)
  const [bonusAchieved, setBonusAchieved] = useState(false)
  const [bossRage, setBossRage] = useState(false)

  // difficulty
  const gravityMs = useMemo(
    () => gravityForLevel(level) * (bossRage ? 0.5 : 1),
    [level, bossRage]
  )
  const goalLines = isBonus ? 6 : 10

  // ——— queue helpers
  function shiftQueue() {
    let q = [...queue]
    let b = [...bag]
    let nb = [...nextBag]

    let key = q.shift()
    if (q.length < 3) {
      if (b.length === 0) {
        b = nb
        nb = randomBag()
      }
      q = [...q, ...b.splice(0, Math.min(7, b.length))]
    }

    setQueue(q)
    setBag(b)
    setNextBag(nb)
    return key
  }

  function startLevel(lvl) {
    const bonus = lvl % 5 === 0
    setIsBonus(bonus)
    setBonusAchieved(false)
    setLinesThisLevel(0)
    setBoard(makeEmptyBoard())
    const nextKey = shiftQueue()
    setCurrent(spawnPiece(nextKey))
    setTimeLeft(levelTimeLimit(lvl, bonus))
    setPaused(false)
    setGameOver(false)
    setCanHold(true)
  }

  // init
  useEffect(() => {
    startLevel(1)
  }, [])

  // gravity loop
  useEffect(() => {
    if (paused || gameOver || medal) return
    const id = setInterval(() => {
      setCurrent((cur) => {
        if (!cur) return cur
        const ny = cur.y + 1
        if (canPlace(board, cur.shape, cur.x, ny)) return { ...cur, y: ny }
        // lock
        const placed = placePiece(board, cur.shape, cur.x, cur.y, cur.color)
        const { board: clearedBoard, cleared } = clearLines(placed)

        if (cleared > 0) {
          const base = [0, 100, 300, 500, 800][cleared]
          const timeGain = [0, 2, 5, 8, 12][cleared]
          const mult = isBonus && bonusAchieved ? 2 : 1
          setScore((s) => s + base * level * mult)
          setLinesThisLevel((n) => n + cleared)
          setTimeLeft((t) =>
            Math.min(levelTimeLimit(level, isBonus), t + timeGain)
          )
        }

        setBoard(clearedBoard)
        setCanHold(true)

        const nextKey = shiftQueue()
        const next = spawnPiece(nextKey)
        if (!canPlace(clearedBoard, next.shape, next.x, next.y)) {
          setGameOver(true)
          return cur
        }
        return next
      })
    }, gravityMs)
    return () => clearInterval(id)
  }, [board, gravityMs, paused, gameOver, medal, isBonus, bonusAchieved, level])

  // boss rage pulses
  useEffect(() => {
    if (paused || gameOver || medal) return
    const rageInterval = setInterval(() => {
      setBossRage(true)
      const calm = setTimeout(() => setBossRage(false), 4000)
      return () => clearTimeout(calm)
    }, 12000)
    return () => clearInterval(rageInterval)
  }, [paused, gameOver, medal, level])

  // countdown
  useEffect(() => {
    if (paused || gameOver || medal) return
    const tid = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameOver(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(tid)
  }, [paused, gameOver, medal])

  // progression
  useEffect(() => {
    if (gameOver || medal) return
    if (linesThisLevel >= goalLines) {
      if (isBonus) setBonusAchieved(true)
      const next = level + 1
      if (next > MAX_LEVEL) {
        setMedal(true)
        setPaused(true)
        return
      }
      setLevel(next)
      startLevel(next)
    }
  }, [linesThisLevel])

  // controls
  useEffect(() => {
    function onKey(e) {
      if (e.repeat) return
      if (e.key === "p" || e.key === "P") {
        setPaused((v) => !v)
        return
      }
      if (e.key === "r" || e.key === "R") {
        setLevel(1)
        setScore(0)
        setMedal(false)
        startLevel(1)
        return
      }
      if (paused || gameOver || medal) return

      setCurrent((cur) => {
        if (!cur) return cur
        const tryMove = (nx, ny, nshape = cur.shape) =>
          canPlace(board, nshape, nx, ny)
            ? { ...cur, x: nx, y: ny, shape: nshape }
            : cur
        switch (e.key) {
          case "ArrowLeft":
          case "a":
          case "A":
            return tryMove(cur.x - 1, cur.y)
          case "ArrowRight":
          case "d":
          case "D":
            return tryMove(cur.x + 1, cur.y)
          case "ArrowDown":
          case "s":
          case "S":
            return tryMove(cur.x, cur.y + 1)
          case "ArrowUp":
          case "w":
          case "W": {
            let rotated = rotate(cur.shape, 1)
            const kicks = [
              [0, 0],
              [-1, 0],
              [1, 0],
              [0, -1],
              [-2, 0],
              [2, 0],
            ]
            for (const [dx, dy] of kicks)
              if (canPlace(board, rotated, cur.x + dx, cur.y + dy))
                return { ...cur, shape: rotated, x: cur.x + dx, y: cur.y + dy }
            return cur
          }
          case "z":
          case "Z": {
            const rotated = rotate(cur.shape, -1)
            if (canPlace(board, rotated, cur.x, cur.y))
              return { ...cur, shape: rotated }
            return cur
          }
          case "x":
          case "X": {
            const rotated = rotate(cur.shape, 1)
            if (canPlace(board, rotated, cur.x, cur.y))
              return { ...cur, shape: rotated }
            return cur
          }
          case "c":
          case "C": {
            // hold
            if (!canHold) return cur
            setCanHold(false)
            if (!hold) {
              setHold({ key: cur.key, color: cur.color, shape: cur.shape })
              const nextKey = shiftQueue()
              return spawnPiece(nextKey)
            } else {
              const swapKey = hold.key
              setHold({ key: cur.key, color: cur.color, shape: cur.shape })
              const swapped = spawnPiece(swapKey)
              if (canPlace(board, swapped.shape, swapped.x, swapped.y))
                return swapped
              return cur
            }
          }
          case " ": {
            let ny = cur.y
            while (canPlace(board, cur.shape, cur.x, ny + 1)) ny++
            return { ...cur, y: ny }
          }
          default:
            return cur
        }
      })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [board, paused, gameOver, medal, canHold, hold])

  // derived
  const ghostY = useMemo(() => {
    if (!current) return 0
    let ny = current.y
    while (canPlace(board, current.shape, current.x, ny + 1)) ny++
    return ny
  }, [board, current])

  const upcoming = useMemo(() => queue.slice(0, 5), [queue])

  const cellsToRender = useMemo(() => {
    const temp = cloneBoard(board)
    // ghost
    if (current) {
      for (let y = 0; y < current.shape.length; y++) {
        for (let x = 0; x < current.shape[y].length; x++) {
          if (!current.shape[y][x]) continue
          const gx = current.x + x
          const gy = ghostY + y
          if (gy >= 0 && temp[gy][gx] === EMPTY) temp[gy][gx] = "ghost"
        }
      }
      // active
      for (let y = 0; y < current.shape.length; y++) {
        for (let x = 0; x < current.shape[y].length; x++) {
          if (!current.shape[y][x]) continue
          const ax = current.x + x
          const ay = current.y + y
          if (ay >= 0) temp[ay][ax] = current.color
        }
      }
    }
    return temp
  }, [board, current, ghostY])

  // ——————————— Render ———————————
  const bossName = bossNameFor(level)
  const bossTaunt = bossTauntFor(level)

  const Cell = ({ val }) => (
    <div
      className={`${styles.cell} ${
        val === EMPTY
          ? styles.empty
          : val === "ghost"
          ? styles.ghost
          : styles.filled
      }`}
      style={val && val !== "ghost" ? { backgroundColor: val } : {}}
    />
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>Tetris: Boss Rush</div>
        <div className={styles.controls}>
          <span>
            Controls: ← → move • ↓ soft drop • ↑/Z/X rotate • Space hard drop •
            C hold • P pause • R restart
          </span>
        </div>
      </div>

      <div className={styles.hud}>
        <div className={styles.stat}>
          <span>Level</span>
          <strong>{level}</strong>
        </div>
        <div className={styles.stat}>
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className={styles.stat}>
          <span>Lines</span>
          <strong>
            {linesThisLevel}/{goalLines}
          </strong>
        </div>
        <div className={styles.timerBar}>
          <div
            className={styles.timerFill}
            style={{
              width: `${(timeLeft / levelTimeLimit(level, isBonus)) * 100}%`,
            }}
          />
          <div className={styles.timerText}>{timeLeft}s</div>
        </div>
        <div className={styles.bossBox} data-rage={bossRage ? "1" : "0"}>
          <div className={styles.bossName}>{bossName}</div>
          <div className={styles.bossTaunt}>{bossTaunt}</div>
        </div>
        {isBonus && (
          <div className={styles.bonusPill}>
            {bonusAchieved ? "2x Active!" : "Bonus Stage"}
          </div>
        )}
      </div>

      <div className={styles.stage}>
        <div className={styles.board}>
          {cellsToRender.map((row, y) => (
            <div key={y} className={styles.row}>
              {row.map((v, x) => (
                <Cell key={`${x}-${y}`} val={v} />
              ))}
            </div>
          ))}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.panel}>
            <div className={styles.panelTitle}>Next</div>
            <div className={styles.nextList}>
              {upcoming.map((k, i) => (
                <div key={i} className={styles.miniPiece}>
                  {TETROMINOES[k].shapes[0].map((r, ry) => (
                    <div key={ry} className={styles.miniRow}>
                      {r.map((c, rx) => (
                        <div
                          key={rx}
                          className={`${styles.miniCell} ${
                            c ? styles.miniFilled : styles.miniEmpty
                          }`}
                          style={
                            c ? { backgroundColor: TETROMINOES[k].color } : {}
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>Hold</div>
            <div className={styles.holdBox}>
              {hold ? (
                TETROMINOES[hold.key].shapes[0].map((r, ry) => (
                  <div key={ry} className={styles.miniRow}>
                    {r.map((c, rx) => (
                      <div
                        key={rx}
                        className={`${styles.miniCell} ${
                          c ? styles.miniFilled : styles.miniEmpty
                        }`}
                        style={
                          c
                            ? { backgroundColor: TETROMINOES[hold.key].color }
                            : {}
                        }
                      />
                    ))}
                  </div>
                ))
              ) : (
                <div className={styles.holdEmpty}>—</div>
              )}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelTitle}>Boss</div>
            <div className={styles.panelBody}>
              <div>
                <strong>{bossName}</strong>
              </div>
              <div className={styles.tauntSm}>{bossTaunt}</div>
              <div className={styles.metaRow}>
                <span>Rage</span>
                <span>{bossRage ? "ON" : "off"}</span>
              </div>
              <div className={styles.metaRow}>
                <span>Stage</span>
                <span>{isBonus ? "Bonus" : "Normal"}</span>
              </div>
            </div>
          </div>

          {gameOver && (
            <div className={styles.gameOver}>
              ⏳ Time&apos;s up! Press R to retry
            </div>
          )}
          {medal && (
            <div className={styles.victory}>
              🏅 You cleared {MAX_LEVEL} bosses! Medal unlocked!
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
