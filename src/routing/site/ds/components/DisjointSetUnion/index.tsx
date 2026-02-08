import React, { useState } from "react"
import styles from "./DisjointSetUnion.module.css"

class DSU {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i)
    this.rank = Array(size).fill(0)
    this.size = Array(size).fill(1)
    this.n = size
    this.animationSteps = []
  }

  find(x, trackSteps = true) {
    if (trackSteps) {
      this.animationSteps.push({
        type: "find-start",
        node: x,
        message: `Finding root of element ${x}`,
      })
    }

    const path = []
    let root = x

    // Find root and collect path
    while (this.parent[root] !== root) {
      path.push(root)
      if (trackSteps) {
        this.animationSteps.push({
          type: "find-traverse",
          node: root,
          parent: this.parent[root],
          message: `${root} → parent is ${this.parent[root]}`,
        })
      }
      root = this.parent[root]
    }

    if (trackSteps) {
      this.animationSteps.push({
        type: "find-root",
        node: root,
        message: `Root found: ${root}`,
      })
    }

    // Path compression: make all nodes on path point directly to root
    for (const node of path) {
      if (trackSteps && this.parent[node] !== root) {
        this.animationSteps.push({
          type: "path-compression",
          node,
          oldParent: this.parent[node],
          newParent: root,
          message: `Path compression: ${node} now points directly to ${root}`,
        })
      }
      this.parent[node] = root
    }

    return root
  }

  union(x, y) {
    this.animationSteps = []

    this.animationSteps.push({
      type: "union-start",
      nodes: [x, y],
      message: `Union operation: merging sets containing ${x} and ${y}`,
    })

    const rootX = this.find(x)
    const rootY = this.find(y)

    if (rootX === rootY) {
      this.animationSteps.push({
        type: "already-connected",
        nodes: [x, y],
        root: rootX,
        message: `${x} and ${y} are already in the same set (root: ${rootX})`,
      })
      return false
    }

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY
      this.size[rootY] += this.size[rootX]
      this.animationSteps.push({
        type: "union-complete",
        child: rootX,
        parent: rootY,
        message: `Attached tree ${rootX} (rank ${this.rank[rootX]}) under ${rootY} (rank ${this.rank[rootY]})`,
      })
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX
      this.size[rootX] += this.size[rootY]
      this.animationSteps.push({
        type: "union-complete",
        child: rootY,
        parent: rootX,
        message: `Attached tree ${rootY} (rank ${this.rank[rootY]}) under ${rootX} (rank ${this.rank[rootX]})`,
      })
    } else {
      this.parent[rootY] = rootX
      this.rank[rootX]++
      this.size[rootX] += this.size[rootY]
      this.animationSteps.push({
        type: "union-complete",
        child: rootY,
        parent: rootX,
        message: `Same rank: attached ${rootY} under ${rootX}, increased rank to ${this.rank[rootX]}`,
      })
    }

    return true
  }

  connected(x, y) {
    return this.find(x, false) === this.find(y, false)
  }

  getComponents() {
    const components = {}
    for (let i = 0; i < this.n; i++) {
      const root = this.find(i, false)
      if (!components[root]) {
        components[root] = []
      }
      components[root].push(i)
    }
    return components
  }

  clone() {
    const newDSU = new DSU(this.n)
    newDSU.parent = [...this.parent]
    newDSU.rank = [...this.rank]
    newDSU.size = [...this.size]
    return newDSU
  }
}

const DisjointSetUnion = () => {
  const [dsu, setDsu] = useState(new DSU(10))
  const [size, setSize] = useState(10)
  const [unionX, setUnionX] = useState("")
  const [unionY, setUnionY] = useState("")
  const [findX, setFindX] = useState("")
  const [animationSteps, setAnimationSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [highlightedNodes, setHighlightedNodes] = useState([])
  const [highlightedEdges, setHighlightedEdges] = useState([])
  const [lastOperation, setLastOperation] = useState("")

  const handleInitialize = () => {
    const newSize = parseInt(size, 10)
    if (isNaN(newSize) || newSize < 2 || newSize > 20) {
      alert("Please enter a size between 2 and 20")
      return
    }
    setDsu(new DSU(newSize))
    setAnimationSteps([])
    setCurrentStepIndex(-1)
    setHighlightedNodes([])
    setHighlightedEdges([])
    setLastOperation(`Initialized DSU with ${newSize} elements`)
  }

  const handleUnion = () => {
    const x = parseInt(unionX, 10)
    const y = parseInt(unionY, 10)

    if (isNaN(x) || isNaN(y) || x < 0 || x >= dsu.n || y < 0 || y >= dsu.n) {
      alert(`Please enter valid values between 0 and ${dsu.n - 1}`)
      return
    }

    const newDSU = dsu.clone()
    const success = newDSU.union(x, y)
    setDsu(newDSU)
    setAnimationSteps(newDSU.animationSteps)
    setCurrentStepIndex(0)
    setUnionX("")
    setUnionY("")

    if (success) {
      setLastOperation(`Union(${x}, ${y}) - Sets merged`)
      highlightStep(newDSU.animationSteps[0])
    } else {
      setLastOperation(`Union(${x}, ${y}) - Already connected`)
    }
  }

  const handleFind = () => {
    const x = parseInt(findX, 10)

    if (isNaN(x) || x < 0 || x >= dsu.n) {
      alert(`Please enter a value between 0 and ${dsu.n - 1}`)
      return
    }

    const newDSU = dsu.clone()
    const root = newDSU.find(x)
    setDsu(newDSU)
    setAnimationSteps(newDSU.animationSteps)
    setCurrentStepIndex(0)
    setFindX("")
    setLastOperation(`Find(${x}) = ${root}`)
    highlightStep(newDSU.animationSteps[0])
  }

  const highlightStep = (step) => {
    if (!step) return

    const nodes = []
    const edges = []

    switch (step.type) {
      case "find-start":
      case "find-root":
        nodes.push(step.node)
        break
      case "find-traverse":
        nodes.push(step.node, step.parent)
        edges.push([step.node, step.parent])
        break
      case "path-compression":
        nodes.push(step.node, step.newParent)
        edges.push([step.node, step.newParent])
        break
      case "union-start":
        nodes.push(...step.nodes)
        break
      case "union-complete":
        nodes.push(step.child, step.parent)
        edges.push([step.child, step.parent])
        break
      case "already-connected":
        nodes.push(...step.nodes, step.root)
        break
      default:
        break
    }

    setHighlightedNodes(nodes)
    setHighlightedEdges(edges)
  }

  const nextStep = () => {
    if (currentStepIndex < animationSteps.length - 1) {
      const newIndex = currentStepIndex + 1
      setCurrentStepIndex(newIndex)
      highlightStep(animationSteps[newIndex])
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1
      setCurrentStepIndex(newIndex)
      highlightStep(animationSteps[newIndex])
    }
  }

  const clearHighlight = () => {
    setHighlightedNodes([])
    setHighlightedEdges([])
  }

  const handlePresetExample = () => {
    const newDSU = new DSU(8)
    newDSU.union(0, 1)
    newDSU.union(2, 3)
    newDSU.union(4, 5)
    newDSU.union(6, 7)
    newDSU.union(0, 2)
    newDSU.union(4, 6)
    setDsu(newDSU.clone())
    setAnimationSteps([])
    setCurrentStepIndex(-1)
    setHighlightedNodes([])
    setHighlightedEdges([])
    setLastOperation("Loaded preset example with 4 components")
  }

  const components = dsu.getComponents()
  const numComponents = Object.keys(components).length

  const renderForest = () => {
    const componentsList = Object.entries(components)
    const forestWidth = 900
    const componentWidth = forestWidth / componentsList.length
    const elements = []

    componentsList.forEach(([root, nodes], compIndex) => {
      const centerX = (compIndex + 0.5) * componentWidth
      const treeElements = renderTree(
        parseInt(root),
        nodes,
        centerX,
        60,
        0,
        Math.min(80, componentWidth / 2)
      )
      elements.push(...treeElements)
    })

    return elements
  }

  const renderTree = (
    node,
    nodesInComponent,
    x,
    y,
    level,
    horizontalSpacing
  ) => {
    const elements = []
    const nodeRadius = 25
    const verticalSpacing = 80

    // Find children
    const children = nodesInComponent.filter(
      (n) => dsu.parent[n] === node && n !== node
    )

    const isHighlighted = highlightedNodes.includes(node)
    const isRoot = dsu.parent[node] === node

    // Draw edges to children
    children.forEach((child, index) => {
      const offset = horizontalSpacing / Math.pow(2, level + 1)
      const childX = x + (index - children.length / 2) * offset * 2
      const childY = y + verticalSpacing

      const isEdgeHighlighted = highlightedEdges.some(
        ([from, to]) =>
          (from === node && to === child) || (from === child && to === node)
      )

      elements.push(
        <line
          key={`edge-${node}-${child}`}
          x1={x}
          y1={y + nodeRadius}
          x2={childX}
          y2={childY - nodeRadius}
          className={`${styles.edge} ${
            isEdgeHighlighted ? styles.highlightedEdge : ""
          }`}
          strokeWidth="3"
        />
      )

      elements.push(
        ...renderTree(
          child,
          nodesInComponent,
          childX,
          childY,
          level + 1,
          horizontalSpacing
        )
      )
    })

    // Draw node
    elements.push(
      <g key={`node-${node}`}>
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          className={`${styles.node} ${isRoot ? styles.rootNode : ""} ${
            isHighlighted ? styles.highlightedNode : ""
          }`}
        />
        <text x={x} y={y - 35} textAnchor="middle" className={styles.infoText}>
          rank: {dsu.rank[node]}
        </text>
        <text x={x} y={y + 6} textAnchor="middle" className={styles.nodeText}>
          {node}
        </text>
        {isRoot && (
          <text
            x={x}
            y={y + 42}
            textAnchor="middle"
            className={styles.rootLabel}
          >
            Root
          </text>
        )}
      </g>
    )

    return elements
  }

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < animationSteps.length
      ? animationSteps[currentStepIndex]
      : null

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Disjoint Set Union (Union-Find) 🔗</h1>

      {/* Description */}
      <div className={styles.description}>
        <p>
          A data structure that keeps track of elements partitioned into
          disjoint (non-overlapping) sets. Supports efficient union and find
          operations with path compression and union by rank optimizations.
        </p>
      </div>

      {/* Initialize */}
      <div className={styles.section}>
        <h3>Initialize DSU</h3>
        <div className={styles.initializeGroup}>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Size"
            className={styles.input}
            min="2"
            max="20"
          />
          <button onClick={handleInitialize} className={styles.btnPrimary}>
            Initialize
          </button>
          <button onClick={handlePresetExample} className={styles.btnSecondary}>
            Load Example
          </button>
          <span className={styles.sizeInfo}>
            Current size: {dsu.n} elements | {numComponents} component(s)
          </span>
        </div>
      </div>

      {/* Operations */}
      <div className={styles.operations}>
        <div className={styles.operationCard}>
          <h4>Union Operation</h4>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={unionX}
              onChange={(e) => setUnionX(e.target.value)}
              placeholder="Element 1"
              className={styles.input}
              min="0"
              max={dsu.n - 1}
            />
            <input
              type="number"
              value={unionY}
              onChange={(e) => setUnionY(e.target.value)}
              placeholder="Element 2"
              className={styles.input}
              min="0"
              max={dsu.n - 1}
            />
            <button onClick={handleUnion} className={styles.btnOperation}>
              Union
            </button>
          </div>
        </div>

        <div className={styles.operationCard}>
          <h4>Find Operation</h4>
          <div className={styles.inputGroup}>
            <input
              type="number"
              value={findX}
              onChange={(e) => setFindX(e.target.value)}
              placeholder="Element"
              className={styles.input}
              min="0"
              max={dsu.n - 1}
            />
            <button onClick={handleFind} className={styles.btnOperation}>
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Last Operation */}
      {lastOperation && (
        <div className={styles.lastOperation}>{lastOperation}</div>
      )}

      {/* Animation Controls */}
      {animationSteps.length > 0 && (
        <div className={styles.animationControls}>
          <button
            onClick={prevStep}
            disabled={currentStepIndex <= 0}
            className={styles.btnNav}
          >
            ← Previous
          </button>
          <span className={styles.stepCounter}>
            Step {currentStepIndex + 1} of {animationSteps.length}
          </span>
          <button
            onClick={nextStep}
            disabled={currentStepIndex >= animationSteps.length - 1}
            className={styles.btnNav}
          >
            Next →
          </button>
          <button onClick={clearHighlight} className={styles.btnNav}>
            Clear Highlight
          </button>
        </div>
      )}

      {/* Current Step Message */}
      {currentStep && (
        <div className={styles.stepMessage}>
          <strong>Step {currentStepIndex + 1}:</strong> {currentStep.message}
        </div>
      )}

      {/* Forest Visualization */}
      <div className={styles.section}>
        <h3>Forest Structure ({numComponents} Component(s))</h3>
        <div className={styles.forestContainer}>
          <svg width="900" height="400" className={styles.forestSvg}>
            {renderForest()}
          </svg>
        </div>
      </div>

      {/* Components Info */}
      <div className={styles.section}>
        <h3>Components</h3>
        <div className={styles.componentsGrid}>
          {Object.entries(components).map(([root, nodes]) => (
            <div key={root} className={styles.componentCard}>
              <div className={styles.componentHeader}>
                Root: <span className={styles.rootValue}>{root}</span>
              </div>
              <div className={styles.componentBody}>
                Elements: {nodes.sort((a, b) => a - b).join(", ")}
              </div>
              <div className={styles.componentFooter}>
                Size: {nodes.length} | Rank: {dsu.rank[parseInt(root)]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operations Info */}
      <div className={styles.section}>
        <h3>Time Complexity</h3>
        <div className={styles.complexityGrid}>
          <div className={styles.complexityCard}>
            <h4>Find</h4>
            <p className={styles.complexity}>O(α(n))</p>
            <p className={styles.complexityNote}>
              With path compression, amortized inverse Ackermann
            </p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Union</h4>
            <p className={styles.complexity}>O(α(n))</p>
            <p className={styles.complexityNote}>
              With union by rank, amortized inverse Ackermann
            </p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Connected</h4>
            <p className={styles.complexity}>O(α(n))</p>
            <p className={styles.complexityNote}>Two find operations</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className={styles.explanation}>
        <h3>Real-World Applications:</h3>
        <ul>
          <li>
            <strong>Kruskal&apos;s Algorithm:</strong> Minimum Spanning Tree -
            detect cycles efficiently
          </li>
          <li>
            <strong>Network Connectivity:</strong> Check if two computers are
            connected in a network
          </li>
          <li>
            <strong>Image Processing:</strong> Connected components labeling in
            images
          </li>
          <li>
            <strong>Social Networks:</strong> Find groups of friends, detect
            communities
          </li>
          <li>
            <strong>Least Common Ancestor:</strong> Finding LCA in trees using
            offline algorithms
          </li>
          <li>
            <strong>Game Development:</strong> Dynamic connectivity in
            procedural generation
          </li>
        </ul>
        <div className={styles.note}>
          <strong>Key Optimization:</strong> Path compression flattens the tree
          structure during find operations, making subsequent operations nearly
          constant time. Union by rank ensures the shorter tree is attached
          under the taller one.
        </div>
      </div>
    </div>
  )
}

export default DisjointSetUnion
