import React, { useState, useEffect, useRef } from "react"
import { FaPlay, FaMapMarkedAlt } from "react-icons/fa"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./MazeGame.css"

const CELL_SIZE = 20
const SIZES = {
  small: { rows: 15, cols: 20 },
  medium: { rows: 20, cols: 30 },
  large: { rows: 25, cols: 40 },
}

const ALGORITHMS = {
  dfs: "Depth-First Search",
  bfs: "Breadth-First Search",
  astar: "A* Algorithm",
}

const MazeGame = () => {
  const [size, setSize] = useState("small")
  const [maze, setMaze] = useState([])
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [path, setPath] = useState([])
  const [visited, setVisited] = useState([])
  const [algorithm, setAlgorithm] = useState("astar")
  const [isSolving, setIsSolving] = useState(false)
  const [stats, setStats] = useState({ pathLength: 0, nodesVisited: 0 })
  const canvasRef = useRef(null)

  useTrackView({
    id: "games-maze",
    label: "Maze Generator & Solver",
    category: "Game Zone",
    route: "/games/MazeGame",
  })

  useEffect(() => {
    generateMaze()
  }, [size])

  useEffect(() => {
    if (canvasRef.current) {
      drawMaze()
    }
  }, [maze, path, visited])

  const generateMaze = () => {
    const { rows, cols } = SIZES[size]
    const newMaze = Array(rows)
      .fill()
      .map(() => Array(cols).fill(1)) // 1 = wall, 0 = path

    // Recursive backtracking maze generation
    const stack = []
    const startRow = 1
    const startCol = 1
    newMaze[startRow][startCol] = 0
    stack.push([startRow, startCol])

    const directions = [
      [-2, 0],
      [2, 0],
      [0, -2],
      [0, 2],
    ]

    while (stack.length > 0) {
      const [row, col] = stack[stack.length - 1]
      const neighbors = []

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc

        if (
          newRow > 0 &&
          newRow < rows - 1 &&
          newCol > 0 &&
          newCol < cols - 1 &&
          newMaze[newRow][newCol] === 1
        ) {
          neighbors.push([newRow, newCol, row + dr / 2, col + dc / 2])
        }
      }

      if (neighbors.length > 0) {
        const [newRow, newCol, wallRow, wallCol] = neighbors[
          Math.floor(Math.random() * neighbors.length)
        ]
        newMaze[newRow][newCol] = 0
        newMaze[wallRow][wallCol] = 0
        stack.push([newRow, newCol])
      } else {
        stack.pop()
      }
    }

    setMaze(newMaze)
    setStart([1, 1])
    setEnd([rows - 2, cols - 2])
    setPath([])
    setVisited([])
    setStats({ pathLength: 0, nodesVisited: 0 })
  }

  const drawMaze = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const { rows, cols } = SIZES[size]

    canvas.width = cols * CELL_SIZE
    canvas.height = rows * CELL_SIZE

    // Draw maze
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (maze[row] && maze[row][col] === 1) {
          ctx.fillStyle = "#2c3e50"
        } else {
          ctx.fillStyle = "#ecf0f1"
        }

        // Highlight visited cells
        if (visited.some(([r, c]) => r === row && c === col)) {
          ctx.fillStyle = "#3498db"
        }

        // Highlight path
        if (path.some(([r, c]) => r === row && c === col)) {
          ctx.fillStyle = "#f39c12"
        }

        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)

        // Draw grid lines
        ctx.strokeStyle = "#bdc3c7"
        ctx.lineWidth = 0.5
        ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      }
    }

    // Draw start
    if (start) {
      ctx.fillStyle = "#2ecc71"
      ctx.fillRect(
        start[1] * CELL_SIZE,
        start[0] * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      )
    }

    // Draw end
    if (end) {
      ctx.fillStyle = "#e74c3c"
      ctx.fillRect(end[1] * CELL_SIZE, end[0] * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const solveMazeDFS = async () => {
    const { rows, cols } = SIZES[size]
    const visitedSet = new Set()
    const visitedArr = []
    const stack = [[start[0], start[1], [[start[0], start[1]]]]]

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    while (stack.length > 0 && !isSolving) {
      return
    }

    setIsSolving(true)

    while (stack.length > 0) {
      const [row, col, currentPath] = stack.pop()
      const key = `${row},${col}`

      if (visitedSet.has(key)) continue
      visitedSet.add(key)
      visitedArr.push([row, col])
      setVisited([...visitedArr])
      await sleep(10)

      if (row === end[0] && col === end[1]) {
        setPath(currentPath)
        setStats({
          pathLength: currentPath.length,
          nodesVisited: visitedArr.length,
        })
        setIsSolving(false)
        return
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          maze[newRow][newCol] === 0 &&
          !visitedSet.has(`${newRow},${newCol}`)
        ) {
          stack.push([newRow, newCol, [...currentPath, [newRow, newCol]]])
        }
      }
    }

    setIsSolving(false)
  }

  const solveMazeBFS = async () => {
    const { rows, cols } = SIZES[size]
    const visitedSet = new Set()
    const visitedArr = []
    const queue = [[start[0], start[1], [[start[0], start[1]]]]]
    visitedSet.add(`${start[0]},${start[1]}`)

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    setIsSolving(true)

    while (queue.length > 0) {
      const [row, col, currentPath] = queue.shift()
      visitedArr.push([row, col])
      setVisited([...visitedArr])
      await sleep(10)

      if (row === end[0] && col === end[1]) {
        setPath(currentPath)
        setStats({
          pathLength: currentPath.length,
          nodesVisited: visitedArr.length,
        })
        setIsSolving(false)
        return
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        const key = `${newRow},${newCol}`

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          maze[newRow][newCol] === 0 &&
          !visitedSet.has(key)
        ) {
          visitedSet.add(key)
          queue.push([newRow, newCol, [...currentPath, [newRow, newCol]]])
        }
      }
    }

    setIsSolving(false)
  }

  const solveMazeAStar = async () => {
    const { rows, cols } = SIZES[size]
    const visitedSet = new Set()
    const visitedArr = []

    const heuristic = (r, c) => Math.abs(r - end[0]) + Math.abs(c - end[1])

    const openSet = [
      {
        row: start[0],
        col: start[1],
        path: [[start[0], start[1]]],
        g: 0,
        f: heuristic(start[0], start[1]),
      },
    ]

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]

    setIsSolving(true)

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f)
      const current = openSet.shift()
      const { row, col, path: currentPath, g } = current
      const key = `${row},${col}`

      if (visitedSet.has(key)) continue
      visitedSet.add(key)
      visitedArr.push([row, col])
      setVisited([...visitedArr])
      await sleep(10)

      if (row === end[0] && col === end[1]) {
        setPath(currentPath)
        setStats({
          pathLength: currentPath.length,
          nodesVisited: visitedArr.length,
        })
        setIsSolving(false)
        return
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr
        const newCol = col + dc
        const newKey = `${newRow},${newCol}`

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          maze[newRow][newCol] === 0 &&
          !visitedSet.has(newKey)
        ) {
          const newG = g + 1
          const newF = newG + heuristic(newRow, newCol)
          openSet.push({
            row: newRow,
            col: newCol,
            path: [...currentPath, [newRow, newCol]],
            g: newG,
            f: newF,
          })
        }
      }
    }

    setIsSolving(false)
  }

  const solveMaze = () => {
    setPath([])
    setVisited([])

    switch (algorithm) {
      case "dfs":
        solveMazeDFS()
        break
      case "bfs":
        solveMazeBFS()
        break
      case "astar":
        solveMazeAStar()
        break
      default:
        break
    }
  }

  return (
    <div className="maze-game-container">
      <div className="maze-game-header">
        <h1>Maze Generator & Solver 🌀</h1>
        <p>Watch algorithms find the path!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-maze",
              label: "Maze Generator & Solver",
              category: "Game Zone",
              route: "/games/MazeGame",
            }}
          />
        </div>
      </div>

      <div className="maze-game-content">
        <div className="game-controls">
          <div className="control-group">
            <label>Maze Size:</label>
            <div className="button-group">
              {Object.keys(SIZES).map((s) => (
                <button
                  key={s}
                  className={`control-btn ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                  disabled={isSolving}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label>Algorithm:</label>
            <div className="button-group">
              {Object.entries(ALGORITHMS).map(([key, name]) => (
                <button
                  key={key}
                  className={`control-btn ${algorithm === key ? "active" : ""}`}
                  onClick={() => setAlgorithm(key)}
                  disabled={isSolving}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="action-btn solve-btn"
              onClick={solveMaze}
              disabled={isSolving || path.length > 0}
            >
              <FaPlay /> Solve
            </button>
            <button
              className="action-btn generate-btn"
              onClick={generateMaze}
              disabled={isSolving}
            >
              <FaMapMarkedAlt /> New Maze
            </button>
          </div>

          {(path.length > 0 || visited.length > 0) && (
            <div className="stats-panel">
              <div className="stat-item">
                <span className="stat-label">Path Length:</span>
                <span className="stat-value">{stats.pathLength}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Nodes Visited:</span>
                <span className="stat-value">{stats.nodesVisited}</span>
              </div>
            </div>
          )}
        </div>

        <div className="canvas-wrapper">
          <canvas ref={canvasRef} className="maze-canvas" />
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color start"></div>
            <span>Start</span>
          </div>
          <div className="legend-item">
            <div className="legend-color end"></div>
            <span>End</span>
          </div>
          <div className="legend-item">
            <div className="legend-color visited"></div>
            <span>Visited</span>
          </div>
          <div className="legend-item">
            <div className="legend-color path"></div>
            <span>Path</span>
          </div>
          <div className="legend-item">
            <div className="legend-color wall"></div>
            <span>Wall</span>
          </div>
        </div>

        <div className="instructions">
          <h3>About the Algorithms:</h3>
          <ul>
            <li>
              <strong>DFS (Depth-First Search):</strong> Explores as far as
              possible along each branch before backtracking
            </li>
            <li>
              <strong>BFS (Breadth-First Search):</strong> Explores all
              neighbors at the current depth before moving deeper
            </li>
            <li>
              <strong>A* Algorithm:</strong> Uses heuristics to find the optimal
              path efficiently
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MazeGame
