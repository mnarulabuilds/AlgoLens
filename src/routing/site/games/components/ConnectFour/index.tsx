import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { FaRedo, FaUser, FaRobot } from "react-icons/fa"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./ConnectFour.css"

const ROWS = 6
const COLS = 7
const EMPTY = 0
const PLAYER = 1
const AI = 2

const getEmptyBoard = () =>
  Array(ROWS)
    .fill()
    .map(() => Array(COLS).fill(EMPTY))

const getDropRow = (board, col) => {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) return row
  }
  return -1
}

const ConnectFour = () => {
  const [board, setBoard] = useState(getEmptyBoard)
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER)
  const [winner, setWinner] = useState(null)
  const [winningCells, setWinningCells] = useState([])
  const [gameMode, setGameMode] = useState("ai") // 'ai' or '2player'
  const [scores, setScores] = useState({ player: 0, ai: 0, ties: 0 })
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [hoverCol, setHoverCol] = useState(null)

  const boardRef = useRef(board)
  const aiTimeoutRef = useRef(null)

  useEffect(() => {
    boardRef.current = board
  }, [board])

  useTrackView({
    id: "games-connect-four",
    label: "Connect Four",
    category: "Game Zone",
    route: "/games/ConnectFour",
  })

  useEffect(() => {
    // Prevent double-scheduling in React 18 StrictMode and ensure latest board is used.
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current)
      aiTimeoutRef.current = null
    }

    if (gameMode !== "ai" || winner || currentPlayer !== AI) return
    if (isAIThinking) return

    setIsAIThinking(true)
    aiTimeoutRef.current = setTimeout(() => {
      makeAIMove(boardRef.current)
      setIsAIThinking(false)
      aiTimeoutRef.current = null
    }, 450)

    return () => {
      if (aiTimeoutRef.current) {
        clearTimeout(aiTimeoutRef.current)
        aiTimeoutRef.current = null
      }
    }
  }, [currentPlayer, gameMode, winner, isAIThinking])

  const checkWinner = (board) => {
    // Check horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          return {
            winner: board[row][col],
            cells: [
              [row, col],
              [row, col + 1],
              [row, col + 2],
              [row, col + 3],
            ],
          }
        }
      }
    }

    // Check vertical
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          return {
            winner: board[row][col],
            cells: [
              [row, col],
              [row + 1, col],
              [row + 2, col],
              [row + 3, col],
            ],
          }
        }
      }
    }

    // Check diagonal (down-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          return {
            winner: board[row][col],
            cells: [
              [row, col],
              [row + 1, col + 1],
              [row + 2, col + 2],
              [row + 3, col + 3],
            ],
          }
        }
      }
    }

    // Check diagonal (up-right)
    for (let row = 3; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        if (
          board[row][col] !== EMPTY &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row][col] === board[row - 2][col + 2] &&
          board[row][col] === board[row - 3][col + 3]
        ) {
          return {
            winner: board[row][col],
            cells: [
              [row, col],
              [row - 1, col + 1],
              [row - 2, col + 2],
              [row - 3, col + 3],
            ],
          }
        }
      }
    }

    // Check for tie
    if (board.every((row) => row.every((cell) => cell !== EMPTY))) {
      return { winner: "tie", cells: [] }
    }

    return null
  }

  const applyMove = (col, player) => {
    const current = boardRef.current
    const row = getDropRow(current, col)
    if (row === -1) return false

    const next = current.map((r) => [...r])
    next[row][col] = player
    setBoard(next)

    const result = checkWinner(next)
    if (result) {
      setWinner(result.winner)
      setWinningCells(result.cells)

      if (result.winner === PLAYER) {
        setScores((s) => ({ ...s, player: s.player + 1 }))
      } else if (result.winner === AI) {
        setScores((s) => ({ ...s, ai: s.ai + 1 }))
      } else if (result.winner === "tie") {
        setScores((s) => ({ ...s, ties: s.ties + 1 }))
      }
    } else {
      setCurrentPlayer(player === PLAYER ? AI : PLAYER)
    }

    return true
  }

  const canInteract = useMemo(() => {
    if (winner) return false
    if (gameMode === "ai" && currentPlayer === AI) return false
    if (isAIThinking) return false
    return true
  }, [winner, gameMode, currentPlayer, isAIThinking])

  const handleColumnClick = (col) => {
    if (!canInteract) return
    applyMove(col, currentPlayer)
  }

  const makeAIMove = (boardState) => {
    const validColumns = []
    for (let col = 0; col < COLS; col++) {
      if (boardState[0][col] === EMPTY) {
        validColumns.push(col)
      }
    }

    if (validColumns.length === 0) return

    // Simple AI: Try to win, block player, or random
    let bestCol = null

    // Check if AI can win
    for (const col of validColumns) {
      const testBoard = boardState.map((r) => [...r])
      for (let row = ROWS - 1; row >= 0; row--) {
        if (testBoard[row][col] === EMPTY) {
          testBoard[row][col] = AI
          if (checkWinner(testBoard)?.winner === AI) {
            bestCol = col
          }
          break
        }
      }
      if (bestCol !== null) break
    }

    // Check if need to block player
    if (bestCol === null) {
      for (const col of validColumns) {
        const testBoard = boardState.map((r) => [...r])
        for (let row = ROWS - 1; row >= 0; row--) {
          if (testBoard[row][col] === EMPTY) {
            testBoard[row][col] = PLAYER
            if (checkWinner(testBoard)?.winner === PLAYER) {
              bestCol = col
            }
            break
          }
        }
        if (bestCol !== null) break
      }
    }

    // Otherwise pick center or random
    if (bestCol === null) {
      const centerCol = Math.floor(COLS / 2)
      if (validColumns.includes(centerCol)) {
        bestCol = centerCol
      } else {
        bestCol = validColumns[Math.floor(Math.random() * validColumns.length)]
      }
    }

    applyMove(bestCol, AI)
  }

  const resetGame = () => {
    setBoard(getEmptyBoard())
    setCurrentPlayer(PLAYER)
    setWinner(null)
    setWinningCells([])
    setIsAIThinking(false)
    setHoverCol(null)
    if (aiTimeoutRef.current) {
      clearTimeout(aiTimeoutRef.current)
      aiTimeoutRef.current = null
    }
  }

  const isWinningCell = (row, col) => {
    return winningCells.some(([r, c]) => r === row && c === col)
  }

  return (
    <div className="connect-four-container">
      <div className="connect-four-header">
        <h1>Connect Four 🔴🟡</h1>
        <p>Connect four discs in a row to win!</p>
        <div className="header-buttons">
          <FavoriteButton
            topic={{
              id: "games-connect-four",
              label: "Connect Four",
              category: "Game Zone",
              route: "/games/ConnectFour",
            }}
          />
        </div>
      </div>

      <div className="connect-four-content">
        <div className="game-controls">
          <div className="mode-selector">
            <button
              className={`mode-btn ${gameMode === "ai" ? "active" : ""}`}
              onClick={() => {
                setGameMode("ai")
                resetGame()
              }}
            >
              <FaRobot /> vs AI
            </button>
            <button
              className={`mode-btn ${gameMode === "2player" ? "active" : ""}`}
              onClick={() => {
                setGameMode("2player")
                resetGame()
              }}
            >
              <FaUser /> 2 Players
            </button>
          </div>

          <div className="scores">
            <div className="score-box player">
              <div className="score-label">
                {gameMode === "ai" ? "You" : "Player 1"}
              </div>
              <div className="score-value">{scores.player}</div>
            </div>
            <div className="score-box ties">
              <div className="score-label">Ties</div>
              <div className="score-value">{scores.ties}</div>
            </div>
            <div className="score-box ai">
              <div className="score-label">
                {gameMode === "ai" ? "AI" : "Player 2"}
              </div>
              <div className="score-value">{scores.ai}</div>
            </div>
          </div>

          <div className="game-status">
            {winner ? (
              <div className="winner-message">
                {winner === "tie"
                  ? "It's a Tie! 🤝"
                  : winner === PLAYER
                  ? `${gameMode === "ai" ? "You" : "Player 1"} Win! 🎉`
                  : `${gameMode === "ai" ? "AI" : "Player 2"} Wins! 🎉`}
              </div>
            ) : (
              <div className="turn-indicator">
                {currentPlayer === PLAYER ? (
                  <span className="player-turn">
                    {gameMode === "ai" ? "Your" : "Player 1's"} Turn
                  </span>
                ) : (
                  <span className="ai-turn">
                    {gameMode === "ai" ? "AI" : "Player 2"}&apos;s Turn
                    {isAIThinking && " 🤔"}
                  </span>
                )}
              </div>
            )}
          </div>

          <button className="reset-btn" onClick={resetGame}>
            <FaRedo /> New Game
          </button>
        </div>

        <div className="board-container">
          <div className="connect-four-board-wrap">
            <div
              className="column-select"
              role="group"
              aria-label="Choose column"
            >
              {Array.from({ length: COLS }).map((_, col) => {
                const full = getDropRow(board, col) === -1
                const disabled = full || !canInteract
                const isActive = hoverCol === col

                return (
                  <button
                    key={col}
                    className={`col-btn ${isActive ? "active" : ""}`}
                    disabled={disabled}
                    onMouseEnter={() => setHoverCol(col)}
                    onMouseLeave={() => setHoverCol(null)}
                    onFocus={() => setHoverCol(col)}
                    onBlur={() => setHoverCol(null)}
                    onClick={() => handleColumnClick(col)}
                    aria-label={`Drop in column ${col + 1}`}
                  >
                    <span
                      className={`preview-disc ${
                        currentPlayer === PLAYER ? "player" : "ai"
                      } ${disabled ? "disabled" : ""}`}
                    />
                  </button>
                )
              })}
            </div>

            <div className="connect-four-board">
              {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`cell ${
                      canInteract && getDropRow(board, colIndex) !== -1
                        ? "clickable"
                        : ""
                    }`}
                    onClick={() => handleColumnClick(colIndex)}
                    onMouseEnter={() => setHoverCol(colIndex)}
                    onMouseLeave={() => setHoverCol(null)}
                    role="button"
                    tabIndex={-1}
                  >
                    {cell !== EMPTY && (
                      <motion.div
                        className={`disc ${cell === PLAYER ? "player" : "ai"} ${
                          isWinningCell(rowIndex, colIndex) ? "winning" : ""
                        }`}
                        initial={{ y: -220, scale: 0.9 }}
                        animate={{ y: 0, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 24,
                        }}
                      />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on a column to drop your disc</li>
            <li>Connect 4 discs horizontally, vertically, or diagonally</li>
            <li>Block your opponent from getting 4 in a row</li>
            <li>
              {gameMode === "ai"
                ? "Beat the AI to prove your strategy!"
                : "Take turns with your friend!"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ConnectFour
