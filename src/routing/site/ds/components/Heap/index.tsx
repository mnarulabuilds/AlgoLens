import React, { useState, useEffect } from "react"
import styles from "./Heap.module.css"

const Heap = () => {
  const [heapArray, setHeapArray] = useState([])
  const [heapType, setHeapType] = useState("min") // 'min' or 'max'
  const [inputValue, setInputValue] = useState("")
  const [animatingIndices, setAnimatingIndices] = useState([])
  const [comparingIndices, setComparingIndices] = useState([])
  const [lastOperation, setLastOperation] = useState("")

  // Initialize with sample data
  useEffect(() => {
    setHeapArray([10, 15, 20, 17, 25])
  }, [])

  const getParentIndex = (i) => Math.floor((i - 1) / 2)
  const getLeftChildIndex = (i) => 2 * i + 1
  const getRightChildIndex = (i) => 2 * i + 2

  const shouldSwap = (parentVal, childVal) => {
    if (heapType === "min") {
      return parentVal > childVal
    } else {
      return parentVal < childVal
    }
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const bubbleUp = async (arr, index) => {
    let currentIndex = index

    while (currentIndex > 0) {
      const parentIndex = getParentIndex(currentIndex)

      setComparingIndices([currentIndex, parentIndex])
      await sleep(600)

      if (shouldSwap(arr[parentIndex], arr[currentIndex])) {
        // Swap
        setAnimatingIndices([currentIndex, parentIndex])
        await sleep(400)
        ;[arr[parentIndex], arr[currentIndex]] = [
          arr[currentIndex],
          arr[parentIndex],
        ]
        setHeapArray([...arr])

        await sleep(400)
        currentIndex = parentIndex
      } else {
        break
      }
    }

    setComparingIndices([])
    setAnimatingIndices([])
  }

  const bubbleDown = async (arr, index) => {
    let currentIndex = index
    const length = arr.length

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const leftChildIndex = getLeftChildIndex(currentIndex)
      const rightChildIndex = getRightChildIndex(currentIndex)
      let targetIndex = currentIndex

      // Find the target index to swap with
      if (leftChildIndex < length) {
        setComparingIndices([currentIndex, leftChildIndex])
        await sleep(600)

        if (shouldSwap(arr[targetIndex], arr[leftChildIndex])) {
          targetIndex = leftChildIndex
        }
      }

      if (rightChildIndex < length) {
        setComparingIndices([currentIndex, rightChildIndex, targetIndex])
        await sleep(600)

        if (shouldSwap(arr[targetIndex], arr[rightChildIndex])) {
          targetIndex = rightChildIndex
        }
      }

      if (targetIndex === currentIndex) {
        break
      }

      // Swap
      setAnimatingIndices([currentIndex, targetIndex])
      await sleep(400)
      ;[arr[currentIndex], arr[targetIndex]] = [
        arr[targetIndex],
        arr[currentIndex],
      ]
      setHeapArray([...arr])

      await sleep(400)
      currentIndex = targetIndex
    }

    setComparingIndices([])
    setAnimatingIndices([])
  }

  const handleInsert = async () => {
    if (!inputValue.trim()) return

    const value = parseInt(inputValue, 10)
    if (isNaN(value)) return

    const newArray = [...heapArray, value]
    setHeapArray(newArray)
    setInputValue("")
    setLastOperation(`Inserted ${value}`)

    await sleep(500)
    await bubbleUp(newArray, newArray.length - 1)
  }

  const handleExtract = async () => {
    if (heapArray.length === 0) return

    const extractedValue = heapArray[0]

    if (heapArray.length === 1) {
      setHeapArray([])
      setLastOperation(`Extracted ${extractedValue} (heap is now empty)`)
      return
    }

    // Move last element to root
    const newArray = [...heapArray]
    newArray[0] = newArray[newArray.length - 1]
    newArray.pop()
    setHeapArray(newArray)
    setLastOperation(`Extracted ${extractedValue}`)

    await sleep(500)
    await bubbleDown(newArray, 0)
  }

  const handleBuildHeap = async () => {
    const arr = [...heapArray]
    setLastOperation("Building heap from array...")

    // Start from last non-leaf node
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      await bubbleDown(arr, i)
    }

    setLastOperation("Heap built successfully!")
  }

  const handleClear = () => {
    setHeapArray([])
    setLastOperation("Heap cleared")
    setAnimatingIndices([])
    setComparingIndices([])
  }

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 100)
    )
    setHeapArray(randomArray)
    setLastOperation("Random array generated")
  }

  const toggleHeapType = () => {
    setHeapType((prev) => (prev === "min" ? "max" : "min"))
    setLastOperation(`Switched to ${heapType === "min" ? "Max" : "Min"} Heap`)
  }

  // Tree rendering
  const renderTreeNode = (index, x, y, level, horizontalSpacing) => {
    if (index >= heapArray.length) return null

    const value = heapArray[index]
    const leftChildIndex = getLeftChildIndex(index)
    const rightChildIndex = getRightChildIndex(index)

    const nodeRadius = 25
    const verticalSpacing = 70
    const offset = horizontalSpacing / Math.pow(2, level + 1)

    const elements = []
    const isAnimating = animatingIndices.includes(index)
    const isComparing = comparingIndices.includes(index)

    // Draw connections to children
    if (leftChildIndex < heapArray.length) {
      const childX = x - offset
      const childY = y + verticalSpacing
      elements.push(
        <line
          key={`left-line-${index}`}
          x1={x}
          y1={y + nodeRadius}
          x2={childX}
          y2={childY - nodeRadius}
          className={styles.treeLine}
          strokeWidth="2"
        />
      )
      elements.push(
        ...renderTreeNode(
          leftChildIndex,
          childX,
          childY,
          level + 1,
          horizontalSpacing
        )
      )
    }

    if (rightChildIndex < heapArray.length) {
      const childX = x + offset
      const childY = y + verticalSpacing
      elements.push(
        <line
          key={`right-line-${index}`}
          x1={x}
          y1={y + nodeRadius}
          x2={childX}
          y2={childY - nodeRadius}
          className={styles.treeLine}
          strokeWidth="2"
        />
      )
      elements.push(
        ...renderTreeNode(
          rightChildIndex,
          childX,
          childY,
          level + 1,
          horizontalSpacing
        )
      )
    }

    // Draw node
    elements.push(
      <g key={`node-${index}`}>
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          className={`${styles.heapNode} ${
            isAnimating ? styles.animating : ""
          } ${isComparing ? styles.comparing : ""} ${
            index === 0 ? styles.rootNode : ""
          }`}
        />
        <text x={x} y={y + 5} textAnchor="middle" className={styles.nodeText}>
          {value}
        </text>
        <text
          x={x}
          y={y - nodeRadius - 8}
          textAnchor="middle"
          className={styles.indexText}
        >
          [{index}]
        </text>
      </g>
    )

    return elements
  }

  const getTreeDepth = () => {
    if (heapArray.length === 0) return 0
    return Math.floor(Math.log2(heapArray.length)) + 1
  }

  const svgHeight = Math.max(300, getTreeDepth() * 80 + 50)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {heapType === "min" ? "Min" : "Max"} Heap Visualization 🏔️
      </h1>

      {/* Heap Type Toggle */}
      <div className={styles.toggleSection}>
        <button onClick={toggleHeapType} className={styles.toggleButton}>
          Switch to {heapType === "min" ? "Max" : "Min"} Heap
        </button>
        <p className={styles.heapDescription}>
          {heapType === "min"
            ? "Min Heap: Parent is smaller than children"
            : "Max Heap: Parent is larger than children"}
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
        <button onClick={handleExtract} className={styles.btnSecondary}>
          Extract {heapType === "min" ? "Min" : "Max"}
        </button>
        <button onClick={handleBuildHeap} className={styles.btnSecondary}>
          Heapify
        </button>
        <button onClick={handleRandomize} className={styles.btnSecondary}>
          Random Array
        </button>
        <button onClick={handleClear} className={styles.btnDanger}>
          Clear
        </button>
      </div>

      {/* Last Operation */}
      {lastOperation && <div className={styles.operation}>{lastOperation}</div>}

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendRoot}`} />
          <span>Root Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendNormal}`} />
          <span>Normal Node</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendComparing}`} />
          <span>Comparing</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendAnimating}`} />
          <span>Swapping</span>
        </div>
      </div>

      {/* Array Representation */}
      <div className={styles.section}>
        <h3>Array Representation</h3>
        <div className={styles.arrayContainer}>
          {heapArray.length === 0 ? (
            <p className={styles.emptyMessage}>Heap is empty</p>
          ) : (
            heapArray.map((value, index) => (
              <div
                key={index}
                className={`${styles.arrayCell} ${
                  animatingIndices.includes(index) ? styles.animating : ""
                } ${comparingIndices.includes(index) ? styles.comparing : ""} ${
                  index === 0 ? styles.rootCell : ""
                }`}
              >
                <div className={styles.arrayIndex}>{index}</div>
                <div className={styles.arrayValue}>{value}</div>
              </div>
            ))
          )}
        </div>
        <div className={styles.arrayFormulas}>
          <p>
            <strong>Parent:</strong> (i-1)/2 | <strong>Left Child:</strong> 2i+1
            | <strong>Right Child:</strong> 2i+2
          </p>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className={styles.section}>
        <h3>Tree Structure</h3>
        {heapArray.length === 0 ? (
          <p className={styles.emptyMessage}>Add elements to see the tree</p>
        ) : (
          <div className={styles.treeContainer}>
            <svg width="800" height={svgHeight} className={styles.treeSvg}>
              {renderTreeNode(0, 400, 40, 0, 400)}
            </svg>
          </div>
        )}
      </div>

      {/* Heap Properties */}
      <div className={styles.section}>
        <h3>Heap Properties & Operations</h3>
        <div className={styles.propertiesGrid}>
          <div className={styles.propertyCard}>
            <h4>Complete Binary Tree</h4>
            <p>
              All levels filled except possibly the last, filled left to right
            </p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Heap Property</h4>
            <p>
              {heapType === "min"
                ? "Each parent ≤ its children"
                : "Each parent ≥ its children"}
            </p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Insert - O(log n)</h4>
            <p>Add at end, bubble up to maintain heap property</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Extract - O(log n)</h4>
            <p>Remove root, move last to root, bubble down</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Peek - O(1)</h4>
            <p>Access {heapType === "min" ? "minimum" : "maximum"} at root</p>
          </div>
          <div className={styles.propertyCard}>
            <h4>Heapify - O(n)</h4>
            <p>Convert arbitrary array into valid heap</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className={styles.explanation}>
        <h3>Real-World Applications:</h3>
        <ul>
          <li>
            <strong>Priority Queues:</strong> OS task scheduling,
            Dijkstra&apos;s algorithm
          </li>
          <li>
            <strong>Heap Sort:</strong> Efficient sorting algorithm O(n log n)
          </li>
          <li>
            <strong>Finding K Largest/Smallest:</strong> Use heap of size K
          </li>
          <li>
            <strong>Median Maintenance:</strong> Two heaps (min + max) approach
          </li>
          <li>
            <strong>Graph Algorithms:</strong> A*, Prim&apos;s, Dijkstra&apos;s
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Heap
