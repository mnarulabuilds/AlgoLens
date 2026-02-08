import React, { useState } from "react"
import styles from "./BPlusTree.module.css"

class BPlusTreeNode {
  constructor(isLeaf = true) {
    this.keys = []
    this.children = [] // For internal nodes
    this.values = [] // For leaf nodes (data)
    this.isLeaf = isLeaf
    this.next = null // Link to next leaf (for range queries)
  }
}

class BPlusTree {
  constructor(order = 4) {
    this.root = new BPlusTreeNode(true)
    this.order = order
    this.maxKeys = order - 1
    this.minKeys = Math.ceil(order / 2) - 1
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (node.isLeaf) {
      const index = node.keys.indexOf(key)
      return index !== -1 ? node.values[index] : null
    }

    // Find appropriate child
    let i = 0
    while (i < node.keys.length && key >= node.keys[i]) {
      i++
    }
    return this.searchNode(node.children[i], key)
  }

  insert(key, value = key) {
    const root = this.root

    if (root.keys.length === this.maxKeys) {
      // Root is full, split it
      const newRoot = new BPlusTreeNode(false)
      newRoot.children.push(this.root)
      this.splitChild(newRoot, 0)
      this.root = newRoot
    }

    this.insertNonFull(this.root, key, value)
  }

  insertNonFull(node, key, value) {
    if (node.isLeaf) {
      // Insert in leaf node
      let i = 0
      while (i < node.keys.length && key > node.keys[i]) {
        i++
      }
      node.keys.splice(i, 0, key)
      node.values.splice(i, 0, value)
    } else {
      // Find child to insert
      let i = 0
      while (i < node.keys.length && key >= node.keys[i]) {
        i++
      }

      if (node.children[i].keys.length === this.maxKeys) {
        // Child is full, split it
        this.splitChild(node, i)

        if (key >= node.keys[i]) {
          i++
        }
      }

      this.insertNonFull(node.children[i], key, value)
    }
  }

  splitChild(parent, index) {
    const fullChild = parent.children[index]
    const newChild = new BPlusTreeNode(fullChild.isLeaf)

    const midIndex = Math.ceil(this.maxKeys / 2)

    if (fullChild.isLeaf) {
      // Split leaf node - copy up
      const midKey = fullChild.keys[midIndex]

      newChild.keys = fullChild.keys.slice(midIndex)
      newChild.values = fullChild.values.slice(midIndex)
      fullChild.keys = fullChild.keys.slice(0, midIndex)
      fullChild.values = fullChild.values.slice(0, midIndex)

      // Link leaves
      newChild.next = fullChild.next
      fullChild.next = newChild

      // Insert middle key into parent
      parent.keys.splice(index, 0, midKey)
    } else {
      // Split internal node - push up
      const midKey = fullChild.keys[midIndex - 1]

      newChild.keys = fullChild.keys.slice(midIndex)
      newChild.children = fullChild.children.slice(midIndex)
      fullChild.keys = fullChild.keys.slice(0, midIndex - 1)
      fullChild.children = fullChild.children.slice(0, midIndex)

      parent.keys.splice(index, 0, midKey)
    }

    parent.children.splice(index + 1, 0, newChild)
  }

  getHeight(node = this.root) {
    if (node.isLeaf) return 1
    return 1 + this.getHeight(node.children[0])
  }

  getAllLeaves() {
    const leaves = []
    let current = this.getFirstLeaf(this.root)
    while (current) {
      leaves.push(current)
      current = current.next
    }
    return leaves
  }

  getFirstLeaf(node) {
    if (node.isLeaf) return node
    return this.getFirstLeaf(node.children[0])
  }

  clone() {
    const newTree = new BPlusTree(this.order)
    const { clonedRoot, leafMap } = this.cloneNode(this.root)
    newTree.root = clonedRoot

    // Restore leaf links
    const leaves = Object.keys(leafMap).sort(
      (a, b) => parseInt(a) - parseInt(b)
    )
    for (let i = 0; i < leaves.length - 1; i++) {
      leafMap[leaves[i]].next = leafMap[leaves[i + 1]]
    }

    return newTree
  }

  cloneNode(node, leafMap = {}) {
    if (!node) return { clonedRoot: null, leafMap }

    const newNode = new BPlusTreeNode(node.isLeaf)
    newNode.keys = [...node.keys]
    newNode.values = [...node.values]

    if (node.isLeaf) {
      // Track leaves for linking
      const leafId = node.keys.join("-")
      leafMap[leafId] = newNode
    } else {
      node.children.forEach((child) => {
        const { clonedRoot: clonedChild } = this.cloneNode(child, leafMap)
        newNode.children.push(clonedChild)
      })
    }

    return { clonedRoot: newNode, leafMap }
  }
}

const BPlusTreeVisualizer = () => {
  const [tree, setTree] = useState(new BPlusTree(4))
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
    setTree(new BPlusTree(newOrder))
    setLastOperation(`Initialized B+ Tree of order ${newOrder}`)
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

    const found = tree.search(value)
    setSearchValue("")
    setLastOperation(
      `Search for ${value}: ${found !== null ? "Found ✓" : "Not Found ✗"}`
    )

    if (found !== null) {
      setHighlightedNodes([value])
      setTimeout(() => setHighlightedNodes([]), 2000)
    }
  }

  const handleLoadExample = () => {
    const newTree = new BPlusTree(4)
    const values = [10, 20, 5, 15, 25, 30, 35, 40, 45, 12]
    values.forEach((val) => newTree.insert(val))
    setTree(newTree)
    setLastOperation("Loaded example B+ Tree")
    setHighlightedNodes([])
  }

  const renderNode = (node, x, y, width, level) => {
    if (!node) return []

    const elements = []
    const nodeHeight = 50
    const keyWidth = 50
    const nodeWidth = Math.max(node.keys.length * keyWidth + 10, 60)
    const verticalSpacing = 100

    // Determine node color
    const nodeClass = node.isLeaf ? styles.leafNodeBox : styles.internalNodeBox

    // Draw node box
    elements.push(
      <rect
        key={`box-${x}-${y}`}
        x={x - nodeWidth / 2}
        y={y}
        width={nodeWidth}
        height={nodeHeight}
        className={nodeClass}
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

    // Draw children for internal nodes
    if (!node.isLeaf && node.children.length > 0) {
      const childWidth = width / node.children.length
      node.children.forEach((child, i) => {
        const childX = x - width / 2 + (i + 0.5) * childWidth

        // Draw edge
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

    // Node type label
    if (node.isLeaf) {
      elements.push(
        <text
          key={`label-${x}-${y}`}
          x={x}
          y={y + nodeHeight + 15}
          textAnchor="middle"
          className={styles.leafLabel}
        >
          Leaf (Data)
        </text>
      )
    } else {
      elements.push(
        <text
          key={`label-${x}-${y}`}
          x={x}
          y={y - 10}
          textAnchor="middle"
          className={styles.internalLabel}
        >
          Internal
        </text>
      )
    }

    return elements
  }

  const renderLeafLinks = () => {
    const leaves = tree.getAllLeaves()
    const elements = []
    const leafY = tree.getHeight() * 100 + 25 // Middle of leaf nodes

    leaves.forEach((leaf, index) => {
      if (index < leaves.length - 1) {
        const startX = 500 - 450 + (index + 1) * (900 / (leaves.length + 1))
        const endX = 500 - 450 + (index + 2) * (900 / (leaves.length + 1))

        elements.push(
          <path
            key={`link-${index}`}
            d={`M ${startX + 30} ${leafY} Q ${(startX + endX) / 2} ${
              leafY + 30
            } ${endX - 30} ${leafY}`}
            className={styles.leafLink}
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        )
      }
    })

    return elements
  }

  const treeHeight = tree.getHeight()
  const svgHeight = Math.max(450, treeHeight * 120 + 150)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>B+ Tree Visualization 🌲➕</h1>

      {/* Description */}
      <div className={styles.description}>
        <p>
          A B+ Tree is a variation of B-Tree where all data is stored in leaf
          nodes. Internal nodes only contain keys for navigation. Leaves are
          linked for efficient range queries.
        </p>
      </div>

      {/* Initialize */}
      <div className={styles.section}>
        <h3>Initialize B+ Tree</h3>
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
            Current: Order {tree.order} | Max keys per node: {tree.maxKeys}
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
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
              </marker>
            </defs>
            {renderNode(tree.root, 500, 50, 900, 0)}
            {renderLeafLinks()}
          </svg>
        </div>
        <p className={styles.treeNote}>
          Green arrows show linked leaf nodes for range queries
        </p>
      </div>

      {/* Key Differences */}
      <div className={styles.section}>
        <h3>B+ Tree vs B-Tree</h3>
        <div className={styles.comparisonGrid}>
          <div className={styles.comparisonCard}>
            <h4>Data Storage</h4>
            <p className={styles.bplus}>✓ All data in leaf nodes only</p>
            <p className={styles.btree}>✗ Data in all nodes</p>
          </div>
          <div className={styles.comparisonCard}>
            <h4>Internal Nodes</h4>
            <p className={styles.bplus}>✓ Only keys for navigation</p>
            <p className={styles.btree}>✗ Contains data too</p>
          </div>
          <div className={styles.comparisonCard}>
            <h4>Leaf Links</h4>
            <p className={styles.bplus}>✓ Leaves are linked</p>
            <p className={styles.btree}>✗ No leaf links</p>
          </div>
          <div className={styles.comparisonCard}>
            <h4>Range Queries</h4>
            <p className={styles.bplus}>✓ Very efficient</p>
            <p className={styles.btree}>✗ Requires tree traversal</p>
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
            <h4>Range Query</h4>
            <p className={styles.complexity}>O(log n + k)</p>
            <p className={styles.note}>k = number of results</p>
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className={styles.explanation}>
        <h3>Real-World Applications:</h3>
        <ul>
          <li>
            <strong>Database Indexing:</strong> MySQL, PostgreSQL use B+ Trees
            extensively
          </li>
          <li>
            <strong>File Systems:</strong> NTFS, ReiserFS, XFS use B+ Trees
          </li>
          <li>
            <strong>Range Queries:</strong> Excellent for SQL BETWEEN, &lt;,
            &gt; operations
          </li>
          <li>
            <strong>Sequential Access:</strong> Linked leaves enable efficient
            scans
          </li>
        </ul>
        <div className={styles.note}>
          <strong>Why B+ Trees in Databases?</strong> Leaf linking makes range
          queries and sequential scans very efficient. All data at leaf level
          means internal nodes can hold more keys, reducing tree height. Fewer
          disk I/O operations!
        </div>
      </div>
    </div>
  )
}

export default BPlusTreeVisualizer
