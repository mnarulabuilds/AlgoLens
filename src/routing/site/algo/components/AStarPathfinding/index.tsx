import React, { useState, useEffect, useRef } from "react"
import styles from "./AStarPathfinding.module.css"

const GRID_ROWS = 20
const GRID_COLS = 40

const CELL_TYPE = {
  EMPTY: "empty",
  START: "start",
  END: "end",
  WALL: "wall",
  OPEN: "open",
  CLOSED: "closed",
  PATH: "path",
}

const AStarPathfinding = () => {
  const [grid, setGrid] = useState([])
  const [start, setStart] = useState({ row: 5, col: 5 })
  const [end, setEnd] = useState({ row: 14, col: 34 })
  const [isDrawing, setIsDrawing] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [speed, setSpeed] = useState(20)
  const [stats, setStats] = useState({ nodesVisited: 0, pathLength: 0 })
  const [drawMode, setDrawMode] = useState("wall") // wall, start, end
  const stopRef = useRef(false)

  // Initialize grid
  useEffect(() => {
    initializeGrid()
  }, [])

  const initializeGrid = () => {
    const newGrid = []
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = []
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          row,
          col,
          type: CELL_TYPE.EMPTY,
          f: Infinity,
          g: Infinity,
          h: 0,
          parent: null,
        })
      }
      newGrid.push(currentRow)
    }
    setGrid(newGrid)
    setIsComplete(false)
    setStats({ nodesVisited: 0, pathLength: 0 })
  }

  const heuristic = (node, end) => {
    // Manhattan distance
    return Math.abs(node.row - end.row) + Math.abs(node.col - end.col)
  }

  const getNeighbors = (grid, node) => {
    const neighbors = []
    const { row, col } = node
    const directions = [
      { r: -1, c: 0 }, // up
      { r: 1, c: 0 }, // down
      { r: 0, c: -1 }, // left
      { r: 0, c: 1 }, // right
    ]

    directions.forEach(({ r, c }) => {
      const newRow = row + r
      const newCol = col + c
      if (
        newRow >= 0 &&
        newRow < GRID_ROWS &&
        newCol >= 0 &&
        newCol < GRID_COLS
      ) {
        neighbors.push(grid[newRow][newCol])
      }
    })
    return neighbors
  }

  const reconstructPath = (endNode) => {
    const path = []
    let current = endNode
    while (current !== null) {
      path.unshift(current)
      current = current.parent
    }
    return path
  }

  const runAStar = async () => {
    if (isRunning) return
    setIsRunning(true)
    setIsComplete(false)
    stopRef.current = false

    // Reset grid cells except walls, start, and end
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        type:
          cell.type === CELL_TYPE.WALL ||
          (cell.row === start.row && cell.col === start.col) ||
          (cell.row === end.row && cell.col === end.col)
            ? cell.type
            : CELL_TYPE.EMPTY,
        f: Infinity,
        g: Infinity,
        h: 0,
        parent: null,
      }))
    )

    const startNode = newGrid[start.row][start.col]
    const endNode = newGrid[end.row][end.col]

    startNode.g = 0
    startNode.h = heuristic(startNode, endNode)
    startNode.f = startNode.g + startNode.h

    const openSet = [startNode]
    const closedSet = new Set()
    let nodesVisited = 0

    while (openSet.length > 0) {
      if (stopRef.current) {
        setIsRunning(false)
        return
      }

      // Find node with lowest f score
      openSet.sort((a, b) => a.f - b.f)
      const current = openSet.shift()

      // Reached the end
      if (current.row === endNode.row && current.col === endNode.col) {
        const path = reconstructPath(current)
        // Animate path
        for (const node of path) {
          if (
            node.row !== start.row ||
            node.col !== start.col ||
            node.row !== end.row ||
            node.col !== end.col
          ) {
            newGrid[node.row][node.col].type = CELL_TYPE.PATH
            setGrid([...newGrid])
            await new Promise((resolve) => setTimeout(resolve, 50 - speed))
          }
        }
        setStats({ nodesVisited, pathLength: path.length - 1 })
        setIsComplete(true)
        setIsRunning(false)
        return
      }

      closedSet.add(`${current.row},${current.col}`)
      if (current.row !== start.row || current.col !== start.col) {
        newGrid[current.row][current.col].type = CELL_TYPE.CLOSED
      }
      nodesVisited++

      const neighbors = getNeighbors(newGrid, current)

      for (const neighbor of neighbors) {
        if (
          neighbor.type === CELL_TYPE.WALL ||
          closedSet.has(`${neighbor.row},${neighbor.col}`)
        ) {
          continue
        }

        const tentativeG = current.g + 1

        if (tentativeG < neighbor.g) {
          neighbor.parent = current
          neighbor.g = tentativeG
          neighbor.h = heuristic(neighbor, endNode)
          neighbor.f = neighbor.g + neighbor.h

          if (
            !openSet.find(
              (n) => n.row === neighbor.row && n.col === neighbor.col
            )
          ) {
            openSet.push(neighbor)
            if (neighbor.row !== end.row || neighbor.col !== end.col) {
              newGrid[neighbor.row][neighbor.col].type = CELL_TYPE.OPEN
            }
          }
        }
      }

      setGrid([...newGrid])
      setStats({ nodesVisited, pathLength: 0 })
      await new Promise((resolve) => setTimeout(resolve, 50 - speed))
    }

    // No path found
    setIsComplete(true)
    setIsRunning(false)
    alert("No path found!")
  }

  const handleMouseDown = (row, col) => {
    setIsDrawing(true)
    handleCellClick(row, col)
  }

  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      handleCellClick(row, col)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleCellClick = (row, col) => {
    if (isRunning) return

    const newGrid = [...grid]
    const cell = newGrid[row][col]

    if (drawMode === "wall") {
      // Don't allow walls on start or end
      if (
        (row === start.row && col === start.col) ||
        (row === end.row && col === end.col)
      ) {
        return
      }
      cell.type =
        cell.type === CELL_TYPE.WALL ? CELL_TYPE.EMPTY : CELL_TYPE.WALL
    } else if (drawMode === "start") {
      // Clear old start
      if (grid[start.row][start.col].type !== CELL_TYPE.WALL) {
        newGrid[start.row][start.col].type = CELL_TYPE.EMPTY
      }
      setStart({ row, col })
      cell.type = CELL_TYPE.EMPTY
    } else if (drawMode === "end") {
      // Clear old end
      if (grid[end.row][end.col].type !== CELL_TYPE.WALL) {
        newGrid[end.row][end.col].type = CELL_TYPE.EMPTY
      }
      setEnd({ row, col })
      cell.type = CELL_TYPE.EMPTY
    }

    setGrid(newGrid)
  }

  const generateMaze = () => {
    if (isRunning) return
    const newGrid = [...grid]

    // Random maze generation
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (
          (row === start.row && col === start.col) ||
          (row === end.row && col === end.col)
        ) {
          continue
        }
        newGrid[row][col].type =
          Math.random() < 0.3 ? CELL_TYPE.WALL : CELL_TYPE.EMPTY
      }
    }
    setGrid(newGrid)
  }

  const stopAlgorithm = () => {
    stopRef.current = true
  }

  const getCellClass = (cell) => {
    if (cell.row === start.row && cell.col === start.col) return styles.start
    if (cell.row === end.row && cell.col === end.col) return styles.end

    switch (cell.type) {
      case CELL_TYPE.WALL:
        return styles.wall
      case CELL_TYPE.OPEN:
        return styles.open
      case CELL_TYPE.CLOSED:
        return styles.closed
      case CELL_TYPE.PATH:
        return styles.path
      default:
        return styles.empty
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>A* Pathfinding Algorithm 🎯</h1>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.start}`} />
          <span>Start</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.end}`} />
          <span>End</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.wall}`} />
          <span>Wall</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.open}`} />
          <span>Open Set</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.closed}`} />
          <span>Closed Set</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.path}`} />
          <span>Path</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Draw Mode:</label>
          <select
            value={drawMode}
            onChange={(e) => setDrawMode(e.target.value)}
            disabled={isRunning}
          >
            <option value="wall">Wall</option>
            <option value="start">Start Point</option>
            <option value="end">End Point</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label>Speed:</label>
          <input
            type="range"
            min="0"
            max="45"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        <button
          onClick={runAStar}
          disabled={isRunning}
          className={styles.btnPrimary}
        >
          {isRunning ? "Running..." : "Run A*"}
        </button>

        <button
          onClick={stopAlgorithm}
          disabled={!isRunning}
          className={styles.btnSecondary}
        >
          Stop
        </button>

        <button
          onClick={generateMaze}
          disabled={isRunning}
          className={styles.btnSecondary}
        >
          Generate Maze
        </button>

        <button
          onClick={initializeGrid}
          disabled={isRunning}
          className={styles.btnSecondary}
        >
          Clear Grid
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Nodes Visited:</span>
          <span className={styles.statValue}>{stats.nodesVisited}</span>
        </div>
        {isComplete && stats.pathLength > 0 && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>Path Length:</span>
            <span className={styles.statValue}>{stats.pathLength}</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className={styles.gridContainer} onMouseLeave={handleMouseUp}>
        <div className={styles.grid}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className={styles.row}>
              {row.map((cell, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`${styles.cell} ${getCellClass(cell)}`}
                  onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className={styles.instructions}>
        <h3>How to use:</h3>
        <ul>
          <li>Select &quot;Wall&quot; mode and click/drag to draw walls</li>
          <li>
            Select &quot;Start Point&quot; or &quot;End Point&quot; mode to
            reposition them
          </li>
          <li>Click &quot;Generate Maze&quot; for a random maze</li>
          <li>
            Click &quot;Run A*&quot; to watch the algorithm find the shortest
            path
          </li>
          <li>
            A* uses f(n) = g(n) + h(n) where g is cost from start, h is
            heuristic to goal
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AStarPathfinding
