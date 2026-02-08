import React, { useState } from "react"
import styles from "./BTree.module.css"

class BTreeNode {
  constructor(isLeaf = true) {
    this.keys = []
    this.children = []
    this.isLeaf = isLeaf
  }
}

class BTree {
  constructor(order = 3) {
    this.root = new BTreeNode(true)
    this.order = order // Maximum number of children
    this.minKeys = Math.ceil(order / 2) - 1
    this.maxKeys = order - 1
  }

  search(node, key) {
    let i = 0
    while (i < node.keys.length && key > node.keys[i]) {
      i++
    }

    if (i < node.keys.length && key === node.keys[i]) {
      return true
    }

    if (node.isLeaf) {
      return false
    }

    return this.search(node.children[i], key)
  }

  insert(key) {
    const root = this.root

    if (root.keys.length === this.maxKeys) {
      // Root is full, split it
      const newRoot = new BTreeNode(false)
      newRoot.children.push(this.root)
      this.splitChild(newRoot, 0)
      this.root = newRoot
    }

    this.insertNonFull(this.root, key)
  }

  insertNonFull(node, key) {
    let i = node.keys.length - 1

    if (node.isLeaf) {
      // Insert key in sorted order
      node.keys.push(key)
      node.keys.sort((a, b) => a - b)
    } else {
      // Find child to insert
      while (i >= 0 && key < node.keys[i]) {
        i--
      }
      i++

      if (node.children[i].keys.length === this.maxKeys) {
        // Child is full, split it
        this.splitChild(node, i)

        if (key > node.keys[i]) {
          i++
        }
      }

      this.insertNonFull(node.children[i], key)
    }
  }

  splitChild(parent, index) {
    const fullChild = parent.children[index]
    const newChild = new BTreeNode(fullChild.isLeaf)

    const midIndex = Math.floor(this.maxKeys / 2)
    const midKey = fullChild.keys[midIndex]

    // Move keys to new child
    newChild.keys = fullChild.keys.splice(midIndex + 1)
    fullChild.keys.pop() // Remove middle key

    // Move children if not leaf
    if (!fullChild.isLeaf) {
      newChild.children = fullChild.children.splice(midIndex + 1)
    }

    // Insert middle key into parent
    parent.keys.splice(index, 0, midKey)
    parent.children.splice(index + 1, 0, newChild)
  }

  getHeight(node = this.root) {
    if (node.isLeaf) return 1
    return 1 + this.getHeight(node.children[0])
  }

  clone() {
    const newTree = new BTree(this.order)
    newTree.root = this.cloneNode(this.root)
    return newTree
  }

  cloneNode(node) {
    if (!node) return null
    const newNode = new BTreeNode(node.isLeaf)
    newNode.keys = [...node.keys]
    newNode.children = node.children.map((child) => this.cloneNode(child))
    return newNode
  }
}

const BTreeVisualizer = () => {
  const [tree, setTree] = useState(new BTree(4))
  const [order, setOrder] = useState(4)
  const [inputValue, setInputValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [highlightedNodes, setHighlightedNodes] = useState([])
  const [lastOperation, setLastOperation] = useState("")

  const handleInitialize = () => {
    const newOrder = parseInt(order, 10)
    if (isNaN(newOrder) || newOrder < 3 || newOrder > 7) {
      alert("Please enter order between 3 and 7")
      return
    }
    setTree(new BTree(newOrder))
    setLastOperation(`Initialized B-Tree of order ${newOrder}`)
    setHighlightedNodes([])
  }

  const handleInsert = () => {
    const value = parseInt(inputValue, 10)
    if (isNaN(value)) {
      alert("Please enter a valid number")
      return
    }

    const newTree = tree.clone()
    newTree.insert(value)
    setTree(newTree)
    setInputValue("")
    setLastOperation(`Inserted ${value}`)
    setHighlightedNodes([value])

    setTimeout(() => setHighlightedNodes([]), 2000)
  }

  const handleSearch = () => {
    const value = parseInt(searchValue, 10)
    if (isNaN(value)) {
      alert("Please enter a valid number")
      return
    }

    const found = tree.search(tree.root, value)
    setSearchValue("")
    setLastOperation(
      `Search for ${value}: ${found ? "Found ✓" : "Not Found ✗"}`
    )

    if (found) {
      setHighlightedNodes([value])
      setTimeout(() => setHighlightedNodes([]), 2000)
    }
  }

  const handleLoadExample = () => {
    const newTree = new BTree(4)
    const values = [10, 20, 30, 40, 50, 25, 35, 45, 15, 5]
    values.forEach((val) => newTree.insert(val))
    setTree(newTree)
    setLastOperation("Loaded example B-Tree")
    setHighlightedNodes([])
  }

  const renderNode = (node, x, y, width, level) => {
    if (!node) return []

    const elements = []
    const nodeHeight = 50
    const keyWidth = 50
    const nodeWidth = Math.max(node.keys.length * keyWidth + 10, 60)
    const verticalSpacing = 100

    // Draw node box
    elements.push(
      <rect
        key={`box-${x}-${y}`}
        x={x - nodeWidth / 2}
        y={y}
        width={nodeWidth}
        height={nodeHeight}
        className={styles.nodeBox}
      />
    )

    // Draw keys
    node.keys.forEach((key, i) => {
      const keyX = x - nodeWidth / 2 + (i + 0.5) * keyWidth + 5
      const isHighlighted = highlightedNodes.includes(key)

      // Key separator
      if (i > 0) {
        elements.push(
          <line
            key={`sep-${x}-${y}-${i}`}
            x1={x - nodeWidth / 2 + i * keyWidth + 5}
            y1={y}
            x2={x - nodeWidth / 2 + i * keyWidth + 5}
            y2={y + nodeHeight}
            className={styles.separator}
          />
        )
      }

      // Key text
      elements.push(
        <text
          key={`key-${x}-${y}-${i}`}
          x={keyX}
          y={y + nodeHeight / 2 + 6}
          textAnchor="middle"
          className={`${styles.keyText} ${
            isHighlighted ? styles.highlighted : ""
          }`}
        >
          {key}
        </text>
      )
    })

    // Draw children
    if (!node.isLeaf && node.children.length > 0) {
      const childWidth = width / node.children.length
      node.children.forEach((child, i) => {
        const childX = x - width / 2 + (i + 0.5) * childWidth

        // Draw edge from parent to child
        const parentConnectionX =
          x - nodeWidth / 2 + ((i + 0.5) * nodeWidth) / node.children.length

        elements.push(
          <line
            key={`edge-${x}-${y}-${i}`}
            x1={parentConnectionX}
            y1={y + nodeHeight}
            x2={childX}
            y2={y + verticalSpacing}
            className={styles.edge}
          />
        )

        // Recursively render child
        elements.push(
          ...renderNode(
            child,
            childX,
            y + verticalSpacing,
            childWidth,
            level + 1
          )
        )
      })
    }

    // Leaf indicator
    if (node.isLeaf) {
      elements.push(
        <text
          key={`leaf-${x}-${y}`}
          x={x}
          y={y + nodeHeight + 15}
          textAnchor="middle"
          className={styles.leafLabel}
        >
          Leaf
        </text>
      )
    }

    return elements
  }

  const treeHeight = tree.getHeight()
  const svgHeight = Math.max(400, treeHeight * 120 + 100)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>B-Tree Visualization 🌲</h1>

      {/* Description */}
      <div className={styles.description}>
        <p>
          A B-Tree is a self-balancing tree data structure that maintains sorted
          data and allows searches, insertions, and deletions in logarithmic
          time. Used extensively in databases and file systems.
        </p>
      </div>

      {/* Initialize */}
      <div className={styles.section}>
        <h3>Initialize B-Tree</h3>
        <div className={styles.initGroup}>
          <label>Order (m):</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={styles.input}
            min="3"
            max="7"
          />
          <button onClick={handleInitialize} className={styles.btnPrimary}>
            Initialize
          </button>
          <button onClick={handleLoadExample} className={styles.btnSecondary}>
            Load Example
          </button>
          <span className={styles.info}>
            Current: Order {tree.order} | Max keys per node: {tree.maxKeys} |
            Min keys: {tree.minKeys}
          </span>
        </div>
      </div>

      {/* Operations */}
      <div className={styles.operations}>
        <div className={styles.operationCard}>
          <h4>Insert Key</h4>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className={styles.input}
              onKeyPress={(e) => e.key === "Enter" && handleInsert()}
            />
            <button onClick={handleInsert} className={styles.btnOperation}>
              Insert
            </button>
          </div>
        </div>

        <div className={styles.operationCard}>
          <h4>Search Key</h4>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter value"
              className={styles.input}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className={styles.btnOperation}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Last Operation */}
      {lastOperation && (
        <div className={styles.lastOperation}>{lastOperation}</div>
      )}

      {/* Tree Visualization */}
      <div className={styles.section}>
        <h3>Tree Structure (Height: {treeHeight})</h3>
        <div className={styles.treeContainer}>
          <svg width="1000" height={svgHeight} className={styles.treeSvg}>
            {renderNode(tree.root, 500, 50, 900, 0)}
          </svg>
        </div>
      </div>

      {/* Properties */}
      <div className={styles.section}>
        <h3>B-Tree Properties</h3>
        <div className={styles.propertiesGrid}>
          <div className={styles.propertyCard}>
            <h4>Balanced</h4>
            <p>All leaf nodes are at the same level</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Multi-way</h4>
            <p>Each node can have multiple keys and children</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Sorted Keys</h4>
            <p>Keys within nodes are in ascending order</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Node Capacity</h4>
            <p>
              Min: {tree.minKeys} keys, Max: {tree.maxKeys} keys
            </p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Children Rule</h4>
            <p>Node with k keys has k+1 children</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Root Exception</h4>
            <p>Root can have fewer than minimum keys</p>
          </div>
        </div>
      </div>

      {/* Complexity */}
      <div className={styles.section}>
        <h3>Time Complexity</h3>
        <div className={styles.complexityGrid}>
          <div className={styles.complexityCard}>
            <h4>Search</h4>
            <p className={styles.complexity}>O(log n)</p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Insert</h4>
            <p className={styles.complexity}>O(log n)</p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Delete</h4>
            <p className={styles.complexity}>O(log n)</p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Space</h4>
            <p className={styles.complexity}>O(n)</p>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className={styles.explanation}>
        <h3>Real-World Applications:</h3>
        <ul>
          <li>
            <strong>Database Indexing:</strong> Most relational databases use
            B-Trees for indexing
          </li>
          <li>
            <strong>File Systems:</strong> NTFS, ext4, HFS+ use B-Trees for file
            organization
          </li>
          <li>
            <strong>Large Datasets:</strong> Efficient for data that
            doesn&apos;t fit in memory
          </li>
          <li>
            <strong>Range Queries:</strong> Efficient for finding ranges of
            values
          </li>
        </ul>
        <div className={styles.note}>
          <strong>Why B-Trees?</strong> Designed to work efficiently with block
          storage (disk). Each node fits in a disk block, minimizing disk I/O
          operations. The order is typically much higher (100+) in real systems.
        </div>
      </div>
    </div>
  )
}

export default BTreeVisualizer
