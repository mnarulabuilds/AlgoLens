import React, { useState, useCallback, useEffect, useRef } from "react"
import { Trie } from "./dataTypes"
import "./TrieVisualizer.css"

const TrieVisualizer = () => {
  const [trie, setTrie] = useState(new Trie())
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState(null)
  const [highlightPath, setHighlightPath] = useState([])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderTrie()
  }, [trie, highlightPath])

  const handleInsert = useCallback(() => {
    if (inputValue.trim()) {
      setTrie((currentTrie) => {
        currentTrie.insert(inputValue.trim())
        return currentTrie.clone()
      })
      setInputValue("")
      setSearchResult(null)
      setHighlightPath([])
    }
  }, [inputValue])

  const handleDelete = useCallback(() => {
    if (inputValue.trim()) {
      setTrie((currentTrie) => {
        currentTrie.delete(inputValue.trim())
        return currentTrie.clone()
      })
      setInputValue("")
      setSearchResult(null)
      setHighlightPath([])
    }
  }, [inputValue])

  const handleSearch = useCallback(() => {
    if (searchValue.trim()) {
      const result = trie.search(searchValue.trim())
      setSearchResult(result.found ? "Word found!" : "Word not found!")
      setHighlightPath(result.path)
    }
  }, [trie, searchValue])

  const handleStartsWith = useCallback(() => {
    if (searchValue.trim()) {
      const result = trie.startsWith(searchValue.trim())
      setSearchResult(
        result.found ? "Prefix exists in trie!" : "Prefix not found in trie!"
      )
      setHighlightPath(result.path)
    }
  }, [trie, searchValue])

  const handleClear = useCallback(() => {
    setTrie(new Trie())
    setInputValue("")
    setSearchValue("")
    setSearchResult(null)
    setHighlightPath([])
  }, [])

  const renderTrie = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const startX = canvas.width / 2
    const startY = 50
    const levelHeight = 60

    // Render root node
    ctx.beginPath()
    ctx.arc(startX, startY, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "#8bc34a"
    ctx.fill()
    ctx.strokeStyle = "#4caf50"
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "14px Arial"
    ctx.fillText("ROOT", startX, startY)

    // Render children recursively
    if (trie.root.children) {
      const children = Object.keys(trie.root.children).sort()
      renderChildren(
        ctx,
        trie.root,
        children,
        startX,
        startY,
        canvas.width * 0.8,
        levelHeight,
        1,
        []
      )
    }

    // Render word list on the right
    renderWordList(ctx, canvas)
  }

  const renderChildren = (
    ctx,
    node,
    children,
    parentX,
    parentY,
    totalWidth,
    levelHeight,
    level,
    path
  ) => {
    if (children.length === 0) return

    const childWidth = totalWidth / children.length
    const startX = parentX - totalWidth / 2 + childWidth / 2

    children.forEach((char, index) => {
      const childX = startX + index * childWidth
      const childY = parentY + levelHeight
      const childNode = node.children[char]

      // Draw line
      ctx.beginPath()
      ctx.moveTo(parentX, parentY + 20)
      ctx.lineTo(childX, childY - 20)
      ctx.strokeStyle = highlightPath.includes(char) ? "#ff7043" : "#ccc"
      ctx.lineWidth = highlightPath.includes(char) ? 3 : 2
      ctx.stroke()

      // Draw node
      const newPath = [...path, char]
      const isHighlighted = highlightPath.includes(char)

      ctx.beginPath()
      ctx.arc(childX, childY, 20, 0, 2 * Math.PI)
      ctx.fillStyle = isHighlighted
        ? "#ff7043"
        : childNode.isEndOfWord
        ? "#4caf50"
        : "#8bc34a"
      ctx.fill()
      ctx.strokeStyle = childNode.isEndOfWord ? "#2e7d32" : "#4caf50"
      ctx.lineWidth = childNode.isEndOfWord ? 3 : 2
      ctx.stroke()

      // Draw character
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = "bold 14px Arial"
      ctx.fillText(char.toUpperCase(), childX, childY)

      // Recursively render children
      const grandChildren = Object.keys(childNode.children).sort()
      if (grandChildren.length > 0) {
        renderChildren(
          ctx,
          childNode,
          grandChildren,
          childX,
          childY,
          childWidth * 0.9,
          levelHeight,
          level + 1,
          newPath
        )
      }
    })
  }

  const renderWordList = (ctx, canvas) => {
    const words = trie.getAllWords()
    const x = canvas.width - 150
    const y = 20

    ctx.fillStyle = "#333"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "left"
    ctx.fillText("Words in Trie:", x, y)

    ctx.font = "12px Arial"
    words.forEach((word, index) => {
      ctx.fillText(word, x, y + 25 + index * 20)
    })
  }

  return (
    <div className="trie-visualizer">
      <h4>Trie (Prefix Tree) Visualizer</h4>

      <div className="controls-container">
        <div className="input-group">
          <label>Insert/Delete Word:</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Enter word"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleInsert()}
            />
            <button onClick={handleInsert}>Insert</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="input-group">
          <label>Search/Prefix Check:</label>
          <div className="input-container">
            <input
              type="text"
              placeholder="Search or check prefix"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={handleStartsWith}>Check Prefix</button>
          </div>
        </div>

        <div className="input-container">
          <button onClick={handleClear} className="clear-btn">
            Clear Trie
          </button>
        </div>
      </div>

      {searchResult && (
        <div
          className={`search-result ${
            searchResult.includes("found") || searchResult.includes("exists")
              ? "success"
              : "error"
          }`}
        >
          {searchResult}
        </div>
      )}

      <div className="legend">
        <div className="legend-item">
          <div className="legend-circle root"></div>
          <span>Root Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle regular"></div>
          <span>Regular Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle end-word"></div>
          <span>End of Word</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle highlighted"></div>
          <span>Highlighted Path</span>
        </div>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} width={1000} height={600}></canvas>
      </div>
    </div>
  )
}

export default TrieVisualizer
