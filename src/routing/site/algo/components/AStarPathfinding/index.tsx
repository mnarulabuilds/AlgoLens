import React, { useState, useEffect, useRef, useCallback } from "react"
import styles from "./AStarPathfinding.module.css"
import Cell from "./Cell"
import useVisualizerControls from "common/hooks/useVisualizerControls"
import { FaPlay, FaPause, FaStop } from "react-icons/fa"

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
  const [draggingNode, setDraggingNode] = useState(null)
  const [isComplete, setIsComplete] = useState(false)
  const [stats, setStats] = useState({ nodesVisited: 0, pathLength: 0 })

  const {
    isRunning,
    setIsRunning,
    isPaused,
    setIsPaused,
    speed,
    setSpeed,
    stopRef,
    start: startVis,
    stop: stopVis,
    pause,
    resume,
    step,
    wait,
  } = useVisualizerControls(25)

  // Initialize grid
  useEffect(() => {
    initializeGrid()
  }, [])

  const initializeGrid = useCallback(() => {
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
    setIsRunning(false)
    setIsPaused(false)
  }, [setIsRunning, setIsPaused])

  const heuristic = (node, target) => {
    return Math.abs(node.row - target.row) + Math.abs(node.col - target.col)
  }

  const getNeighbors = (grid, node) => {
    const neighbors = []
    const { row, col } = node
    const directions = [
      { r: -1, c: 0 },
      { r: 1, c: 0 },
      { r: 0, c: -1 },
      { r: 0, c: 1 },
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

  const runAStar = async () => {
    if (isRunning) return
    startVis()
    setIsComplete(false)

    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        type: cell.type === CELL_TYPE.WALL ? CELL_TYPE.WALL : CELL_TYPE.EMPTY,
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

    try {
      while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f)
        const current = openSet.shift()

        if (current.row === endNode.row && current.col === endNode.col) {
          let pathNode = current
          const path = []
          while (pathNode) {
            path.unshift(pathNode)
            pathNode = pathNode.parent
          }

          for (const node of path) {
            newGrid[node.row][node.col].type = CELL_TYPE.PATH
            setGrid([...newGrid])
            await wait()
          }

          setStats({ nodesVisited, pathLength: path.length - 1 })
          setIsComplete(true)
          stopVis()
          return
        }

        closedSet.add(`${current.row},${current.col}`)
        if (!(current.row === start.row && current.col === start.col)) {
          newGrid[current.row][current.col].type = CELL_TYPE.CLOSED
        }
        nodesVisited++

        const neighbors = getNeighbors(newGrid, current)
        for (const neighbor of neighbors) {
          if (
            neighbor.type === CELL_TYPE.WALL ||
            closedSet.has(`${neighbor.row},${neighbor.col}`)
          )
            continue

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
              if (!(neighbor.row === end.row && neighbor.col === end.col)) {
                newGrid[neighbor.row][neighbor.col].type = CELL_TYPE.OPEN
              }
            }
          }
        }

        setGrid([...newGrid])
        setStats({ nodesVisited, pathLength: 0 })
        await wait()
      }
    } catch (e) {
      if (e.message !== "ALGORITHM_STOPPED") throw e
      return
    }

    setIsComplete(true)
    stopVis()
  }

  const handleMouseDown = (row, col) => {
    if (isRunning) return

    if (row === start.row && col === start.col) {
      setDraggingNode("start")
    } else if (row === end.row && col === end.col) {
      setDraggingNode("end")
    } else {
      setIsDrawing(true)
      toggleWall(row, col)
    }
  }

  const handleMouseEnter = (row, col) => {
    if (isRunning) return

    if (draggingNode === "start") {
      if (row === end.row && col === end.col) return
      setStart({ row, col })
    } else if (draggingNode === "end") {
      if (row === start.row && col === start.col) return
      setEnd({ row, col })
    } else if (isDrawing) {
      toggleWall(row, col)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setDraggingNode(null)
  }

  const toggleWall = (row, col) => {
    if (
      (row === start.row && col === start.col) ||
      (row === end.row && col === end.col)
    )
      return
    const newGrid = [...grid]
    newGrid[row][col] = {
      ...newGrid[row][col],
      type:
        newGrid[row][col].type === CELL_TYPE.WALL
          ? CELL_TYPE.EMPTY
          : CELL_TYPE.WALL,
    }
    setGrid(newGrid)
  }

  const generateMaze = () => {
    if (isRunning) return
    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        type:
          Math.random() < 0.3 &&
            !(cell.row === start.row && cell.col === start.col) &&
            !(cell.row === end.row && cell.col === end.col)
            ? CELL_TYPE.WALL
            : CELL_TYPE.EMPTY,
      }))
    )
    setGrid(newGrid)
  }

  return (
    <div className={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className={`${styles.title} mb-0`}>A* Pathfinding Algorithm 🎯</h1>
        <div className="complexity-badge" title="Time Complexity">
          <span className="badge bg-dark">O(E log V)</span>
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.start}`} />
          <span>Start (Draggable)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.end}`} />
          <span>End (Draggable)</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.wall}`} />
          <span>Wall (Click/Drag)</span>
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

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label>Speed:</label>
          <input
            type="range"
            min="1"
            max="49"
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

        <div className="d-flex gap-2">
          {isRunning && (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={isPaused ? resume : pause}
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <FaPlay /> : <FaPause />}
              </button>
              {isPaused && (
                <button
                  className="btn btn-info btn-sm"
                  onClick={step}
                  title="Next Step"
                >
                  Step
                </button>
              )}
              <button className="btn btn-danger btn-sm" onClick={stopVis} title="Stop">
                <FaStop />
              </button>
            </>
          )}
        </div>

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

      <div className={styles.gridContainer} onMouseLeave={handleMouseUp}>
        <div className={styles.grid}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className={styles.row}>
              {row.map((cell, colIdx) => (
                <Cell
                  key={`${rowIdx}-${colIdx}`}
                  row={rowIdx}
                  col={colIdx}
                  type={cell.type}
                  isStart={rowIdx === start.row && colIdx === start.col}
                  isEnd={rowIdx === end.row && colIdx === end.col}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.instructions}>
        <h3>Quick Guide:</h3>
        <ul>
          <li>
            <strong>Move Points:</strong> Drag the Green (Start) or Red (End)
            nodes.
          </li>
          <li>
            <strong>Draw Walls:</strong> Click and drag on empty (White) cells.
          </li>
          <li>
            <strong>Visualize:</strong> Click "Run A*" to see the algorithm find
            the shortest path.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AStarPathfinding
