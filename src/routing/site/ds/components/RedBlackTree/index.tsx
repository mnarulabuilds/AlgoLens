import React, { useState } from "react"
import styles from "./RedBlackTree.module.css"

const RED = "red"
const BLACK = "black"

class RBNode {
  constructor(value, color = RED) {
    this.value = value
    this.color = color
    this.left = null
    this.right = null
    this.parent = null
  }
}

class RedBlackTree {
  constructor() {
    this.root = null
    this.animationSteps = []
  }

  rotateLeft(node) {
    this.animationSteps.push({
      type: "rotate-left",
      node: node.value,
      message: `Left rotation on node ${node.value}`,
    })

    const rightChild = node.right
    node.right = rightChild.left

    if (rightChild.left !== null) {
      rightChild.left.parent = node
    }

    rightChild.parent = node.parent

    if (node.parent === null) {
      this.root = rightChild
    } else if (node === node.parent.left) {
      node.parent.left = rightChild
    } else {
      node.parent.right = rightChild
    }

    rightChild.left = node
    node.parent = rightChild
  }

  rotateRight(node) {
    this.animationSteps.push({
      type: "rotate-right",
      node: node.value,
      message: `Right rotation on node ${node.value}`,
    })

    const leftChild = node.left
    node.left = leftChild.right

    if (leftChild.right !== null) {
      leftChild.right.parent = node
    }

    leftChild.parent = node.parent

    if (node.parent === null) {
      this.root = leftChild
    } else if (node === node.parent.right) {
      node.parent.right = leftChild
    } else {
      node.parent.left = leftChild
    }

    leftChild.right = node
    node.parent = leftChild
  }

  fixViolation(node) {
    let parent = null
    let grandParent = null

    while (
      node !== this.root &&
      node.color === RED &&
      node.parent.color === RED
    ) {
      parent = node.parent
      grandParent = parent.parent

      // Case A: Parent is left child of grandparent
      if (parent === grandParent.left) {
        const uncle = grandParent.right

        // Case 1: Uncle is red - only recoloring needed
        if (uncle !== null && uncle.color === RED) {
          this.animationSteps.push({
            type: "recolor",
            nodes: [grandParent.value, parent.value, uncle.value],
            message: `Recoloring: GP(${grandParent.value}) RED, P(${parent.value}) BLACK, U(${uncle.value}) BLACK`,
          })

          grandParent.color = RED
          parent.color = BLACK
          uncle.color = BLACK
          node = grandParent
        } else {
          // Case 2: Node is right child - left rotation needed
          if (node === parent.right) {
            this.rotateLeft(parent)
            node = parent
            parent = node.parent
          }

          // Case 3: Node is left child - right rotation needed
          this.animationSteps.push({
            type: "recolor",
            nodes: [parent.value, grandParent.value],
            message: `Recoloring and rotating: P(${parent.value}) BLACK, GP(${grandParent.value}) RED`,
          })

          this.rotateRight(grandParent)
          const tempColor = parent.color
          parent.color = grandParent.color
          grandParent.color = tempColor
          node = parent
        }
      }
      // Case B: Parent is right child of grandparent
      else {
        const uncle = grandParent.left

        // Case 1: Uncle is red - only recoloring needed
        if (uncle !== null && uncle.color === RED) {
          this.animationSteps.push({
            type: "recolor",
            nodes: [grandParent.value, parent.value, uncle.value],
            message: `Recoloring: GP(${grandParent.value}) RED, P(${parent.value}) BLACK, U(${uncle.value}) BLACK`,
          })

          grandParent.color = RED
          parent.color = BLACK
          uncle.color = BLACK
          node = grandParent
        } else {
          // Case 2: Node is left child - right rotation needed
          if (node === parent.left) {
            this.rotateRight(parent)
            node = parent
            parent = node.parent
          }

          // Case 3: Node is right child - left rotation needed
          this.animationSteps.push({
            type: "recolor",
            nodes: [parent.value, grandParent.value],
            message: `Recoloring and rotating: P(${parent.value}) BLACK, GP(${grandParent.value}) RED`,
          })

          this.rotateLeft(grandParent)
          const tempColor = parent.color
          parent.color = grandParent.color
          grandParent.color = tempColor
          node = parent
        }
      }
    }

    this.root.color = BLACK
  }

  insert(value) {
    this.animationSteps = []
    const newNode = new RBNode(value)

    this.animationSteps.push({
      type: "insert",
      node: value,
      message: `Inserting ${value} as RED node`,
    })

    if (this.root === null) {
      this.root = newNode
      this.root.color = BLACK
      this.animationSteps.push({
        type: "root",
        node: value,
        message: `${value} is root, changing to BLACK`,
      })
      return this.animationSteps
    }

    let current = this.root
    let parent = null

    while (current !== null) {
      parent = current
      if (value < current.value) {
        current = current.left
      } else if (value > current.value) {
        current = current.right
      } else {
        // Duplicate value
        return []
      }
    }

    newNode.parent = parent

    if (value < parent.value) {
      parent.left = newNode
    } else {
      parent.right = newNode
    }

    // Fix Red-Black Tree violations
    if (newNode.parent.parent === null) {
      return this.animationSteps
    }

    this.fixViolation(newNode)
    return this.animationSteps
  }

  clone() {
    const newTree = new RedBlackTree()
    newTree.root = this.cloneNode(this.root, null)
    return newTree
  }

  cloneNode(node, parent) {
    if (node === null) return null

    const newNode = new RBNode(node.value, node.color)
    newNode.parent = parent
    newNode.left = this.cloneNode(node.left, newNode)
    newNode.right = this.cloneNode(node.right, newNode)
    return newNode
  }
}

const RedBlackTreeVisualizer = () => {
  const [tree, setTree] = useState(new RedBlackTree())
  const [inputValue, setInputValue] = useState("")
  const [animationSteps, setAnimationSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [highlightedNodes, setHighlightedNodes] = useState([])

  const handleInsert = () => {
    if (!inputValue.trim()) return

    const value = parseInt(inputValue, 10)
    if (isNaN(value)) return

    const steps = tree.insert(value)
    setTree(tree.clone())
    setAnimationSteps(steps)
    setCurrentStepIndex(0)
    setInputValue("")

    // Highlight first step
    if (steps.length > 0) {
      highlightStep(steps[0])
    }
  }

  const highlightStep = (step) => {
    if (step.type === "recolor" && step.nodes) {
      setHighlightedNodes(step.nodes)
    } else if (step.node !== undefined) {
      setHighlightedNodes([step.node])
    }
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
  }

  const handleClear = () => {
    setTree(new RedBlackTree())
    setAnimationSteps([])
    setCurrentStepIndex(-1)
    setHighlightedNodes([])
  }

  const handleSample = () => {
    const sampleValues = [10, 20, 30, 15, 25, 5, 1]
    const newTree = new RedBlackTree()
    sampleValues.forEach((val) => newTree.insert(val))
    setTree(newTree.clone())
    setAnimationSteps([])
    setCurrentStepIndex(-1)
    setHighlightedNodes([])
  }

  const renderTree = (node, x, y, level, horizontalSpacing) => {
    if (!node) return null

    const nodeRadius = 28
    const verticalSpacing = 80
    const offset = horizontalSpacing / Math.pow(2, level + 1)

    const elements = []
    const isHighlighted = highlightedNodes.includes(node.value)

    // Draw connections to children
    if (node.left) {
      const childX = x - offset
      const childY = y + verticalSpacing
      elements.push(
        <line
          key={`left-line-${node.value}`}
          x1={x}
          y1={y + nodeRadius}
          x2={childX}
          y2={childY - nodeRadius}
          className={styles.treeLine}
          strokeWidth="3"
        />
      )
      elements.push(
        ...renderTree(node.left, childX, childY, level + 1, horizontalSpacing)
      )
    }

    if (node.right) {
      const childX = x + offset
      const childY = y + verticalSpacing
      elements.push(
        <line
          key={`right-line-${node.value}`}
          x1={x}
          y1={y + nodeRadius}
          x2={childX}
          y2={childY - nodeRadius}
          className={styles.treeLine}
          strokeWidth="3"
        />
      )
      elements.push(
        ...renderTree(node.right, childX, childY, level + 1, horizontalSpacing)
      )
    }

    // Draw node
    const nodeClass = node.color === RED ? styles.redNode : styles.blackNode

    elements.push(
      <g key={`node-${node.value}`}>
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          className={`${nodeClass} ${isHighlighted ? styles.highlighted : ""}`}
        />
        <text x={x} y={y + 6} textAnchor="middle" className={styles.nodeText}>
          {node.value}
        </text>
      </g>
    )

    return elements
  }

  const getTreeDepth = (node) => {
    if (!node) return 0
    return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right))
  }

  const treeDepth = getTreeDepth(tree.root)
  const svgHeight = Math.max(400, treeDepth * 90 + 50)

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < animationSteps.length
      ? animationSteps[currentStepIndex]
      : null

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Red-Black Tree Visualization 🔴⚫</h1>

      {/* Description */}
      <div className={styles.description}>
        <p>
          A Red-Black Tree is a self-balancing binary search tree where each
          node has a color (red or black) and follows specific properties to
          maintain O(log n) operations.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className={styles.input}
            onKeyPress={(e) => e.key === "Enter" && handleInsert()}
          />
          <button onClick={handleInsert} className={styles.btnPrimary}>
            Insert
          </button>
        </div>
        <button onClick={handleSample} className={styles.btnSecondary}>
          Load Sample
        </button>
        <button onClick={handleClear} className={styles.btnDanger}>
          Clear Tree
        </button>
      </div>

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

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendRed}`} />
          <span>Red Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendBlack}`} />
          <span>Black Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendHighlight}`} />
          <span>Highlighted</span>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className={styles.section}>
        <h3>Tree Structure</h3>
        {!tree.root ? (
          <p className={styles.emptyMessage}>Tree is empty. Add some nodes!</p>
        ) : (
          <div className={styles.treeContainer}>
            <svg width="900" height={svgHeight} className={styles.treeSvg}>
              {renderTree(tree.root, 450, 40, 0, 450)}
            </svg>
          </div>
        )}
      </div>

      {/* Red-Black Tree Properties */}
      <div className={styles.section}>
        <h3>Red-Black Tree Properties</h3>
        <div className={styles.propertiesGrid}>
          <div className={styles.propertyCard}>
            <div className={styles.propertyNumber}>1</div>
            <p>Every node is either RED or BLACK</p>
          </div>
          <div className={styles.propertyCard}>
            <div className={styles.propertyNumber}>2</div>
            <p>The root is always BLACK</p>
          </div>
          <div className={styles.propertyCard}>
            <div className={styles.propertyNumber}>3</div>
            <p>All NULL leaves are considered BLACK</p>
          </div>
          <div className={styles.propertyCard}>
            <div className={styles.propertyNumber}>4</div>
            <p>
              Red node cannot have red children (no two consecutive red nodes)
            </p>
          </div>
          <div className={styles.propertyCard}>
            <div className={styles.propertyNumber}>5</div>
            <p>
              Every path from root to NULL has the same number of black nodes
              (Black Height)
            </p>
          </div>
        </div>
      </div>

      {/* Operations & Complexity */}
      <div className={styles.section}>
        <h3>Operations & Time Complexity</h3>
        <div className={styles.complexityGrid}>
          <div className={styles.complexityCard}>
            <h4>Search</h4>
            <p className={styles.complexity}>O(log n)</p>
            <p className={styles.complexityNote}>Same as BST</p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Insert</h4>
            <p className={styles.complexity}>O(log n)</p>
            <p className={styles.complexityNote}>BST insert + rebalancing</p>
          </div>
          <div className={styles.complexityCard}>
            <h4>Delete</h4>
            <p className={styles.complexity}>O(log n)</p>
            <p className={styles.complexityNote}>BST delete + rebalancing</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className={styles.explanation}>
        <h3>Real-World Applications:</h3>
        <ul>
          <li>
            <strong>Java TreeMap & TreeSet:</strong> Standard library
            implementations
          </li>
          <li>
            <strong>C++ STL map & set:</strong> Often implemented as Red-Black
            Trees
          </li>
          <li>
            <strong>Linux Kernel:</strong> Used in process scheduling
            (Completely Fair Scheduler)
          </li>
          <li>
            <strong>Database Indexing:</strong> Alternative to B-trees for
            in-memory indexes
          </li>
          <li>
            <strong>Computational Geometry:</strong> Used in various geometric
            algorithms
          </li>
        </ul>
        <div className={styles.note}>
          <strong>Note:</strong> Red-Black Trees guarantee O(log n) time for all
          operations by maintaining balanced height through rotations and color
          changes.
        </div>
      </div>
    </div>
  )
}

export default RedBlackTreeVisualizer
