import React, { useState, useCallback, useEffect, useRef } from "react"
import { BinaryTree } from "./dataTypes"
import "./BinaryTreeVisualizer.css"

const BinaryTreeVisualizer = () => {
  const [tree, setTree] = useState(new BinaryTree())
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [foundNode, setFoundNode] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderTree(tree.root, canvas.width / 2, 50, canvas.width / 2, 1)
  }, [tree, foundNode])

  const handleInsert = useCallback(() => {
    if (inputValue.trim()) {
      setTree((newTree) => {
        newTree.insert(parseInt(inputValue, 10))
        return newTree.clone()
      })
      setInputValue("")
    }
  }, [tree, inputValue])

  const handleDelete = useCallback(() => {
    if (inputValue.trim()) {
      setTree((newTree) => {
        newTree.delete(parseInt(inputValue, 10))
        return newTree.clone()
      })
      setInputValue("")
    }
  }, [tree, inputValue])

  const handleFind = useCallback(() => {
    const node = tree.find(parseInt(searchValue, 10))
    setFoundNode(node)
  }, [tree, searchValue])

  const renderTree = (node, x, y, dx, level) => {
    if (!node) return

    const radius = 20
    const gap = 50
    const lineWidth = 2

    const ctx = canvasRef.current.getContext("2d")
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle =
      foundNode && foundNode.value === node.value ? "#ff7043" : "#8bc34a"
    ctx.fill()
    ctx.strokeStyle = "#4caf50"
    ctx.lineWidth = lineWidth
    ctx.stroke()
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.font = "16px Arial"
    ctx.fillText(node.value, x, y)

    if (node.left) {
      const xLeft = x - dx / Math.pow(2, level)
      const yLeft = y + gap
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(xLeft, yLeft - radius)
      ctx.lineWidth = lineWidth
      ctx.stroke()
      renderTree(node.left, xLeft, yLeft, dx / 2, level + 1)
    }

    if (node.right) {
      const xRight = x + dx / Math.pow(2, level)
      const yRight = y + gap
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(xRight, yRight - radius)
      ctx.lineWidth = lineWidth
      ctx.stroke()
      renderTree(node.right, xRight, yRight, dx / 2, level + 1)
    }
  }

  return (
    <div className="binary-tree-visualizer">
      <h4>Binary Tree Visualizer</h4>
      <div className="input-container">
        <input
          type="number"
          placeholder="Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleInsert}>Insert</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="input-container">
        <input
          type="number"
          placeholder="Search Value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleFind}>Find</button>
      </div>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  )
}

export default BinaryTreeVisualizer
