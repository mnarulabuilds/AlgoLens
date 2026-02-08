import React, { useState, useRef, useEffect } from "react"
import styles from "./HuffmanCoding.module.css"

class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
  }
}

const HuffmanCoding = () => {
  const [inputText, setInputText] = useState("HUFFMAN CODING")
  const [frequencies, setFrequencies] = useState({})
  const [huffmanTree, setHuffmanTree] = useState(null)
  const [codes, setCodes] = useState({})
  const [encodedText, setEncodedText] = useState("")
  const [decodedText, setDecodedText] = useState("")
  const [buildingSteps, setBuildingSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [compressionRatio, setCompressionRatio] = useState(0)
  const animationRef = useRef(null)

  const calculateFrequencies = (text) => {
    const freq = {}
    for (const char of text) {
      freq[char] = (freq[char] || 0) + 1
    }
    return freq
  }

  const buildHuffmanTree = (frequencies) => {
    const steps = []
    const nodes = Object.entries(frequencies).map(
      ([char, freq]) => new HuffmanNode(char, freq)
    )

    // Sort by frequency
    nodes.sort((a, b) => a.freq - b.freq)
    steps.push({ action: "initial", nodes: [...nodes] })

    while (nodes.length > 1) {
      // Take two nodes with smallest frequencies
      const left = nodes.shift()
      const right = nodes.shift()

      // Create internal node
      const parent = new HuffmanNode(null, left.freq + right.freq, left, right)

      // Insert back maintaining sorted order
      let inserted = false
      for (let i = 0; i < nodes.length; i++) {
        if (parent.freq <= nodes[i].freq) {
          nodes.splice(i, 0, parent)
          inserted = true
          break
        }
      }
      if (!inserted) {
        nodes.push(parent)
      }

      steps.push({
        action: "merge",
        left,
        right,
        parent,
        nodes: [...nodes],
      })
    }

    return { tree: nodes[0], steps }
  }

  const generateCodes = (node, code = "", codesMap = {}) => {
    if (!node) return codesMap

    // Leaf node
    if (node.char !== null) {
      codesMap[node.char] = code || "0" // Handle single character case
      return codesMap
    }

    // Traverse left and right
    generateCodes(node.left, code + "0", codesMap)
    generateCodes(node.right, code + "1", codesMap)

    return codesMap
  }

  const encodeText = (text, codes) => {
    return text
      .split("")
      .map((char) => codes[char] || "")
      .join("")
  }

  const decodeText = (encoded, tree) => {
    if (!tree || !encoded) return ""

    let decoded = ""
    let current = tree

    for (const bit of encoded) {
      current = bit === "0" ? current.left : current.right

      if (current.char !== null) {
        decoded += current.char
        current = tree
      }
    }

    return decoded
  }

  const handleBuildTree = () => {
    if (!inputText.trim()) {
      alert("Please enter some text!")
      return
    }

    const freq = calculateFrequencies(inputText)
    setFrequencies(freq)

    const { tree, steps } = buildHuffmanTree(freq)
    setHuffmanTree(tree)
    setBuildingSteps(steps)

    const huffmanCodes = generateCodes(tree)
    setCodes(huffmanCodes)

    const encoded = encodeText(inputText, huffmanCodes)
    setEncodedText(encoded)

    const decoded = decodeText(encoded, tree)
    setDecodedText(decoded)

    // Calculate compression ratio
    const originalBits = inputText.length * 8 // ASCII
    const compressedBits = encoded.length
    const ratio = ((1 - compressedBits / originalBits) * 100).toFixed(2)
    setCompressionRatio(ratio)

    // Start animation
    setCurrentStep(0)
    setIsAnimating(true)
  }

  useEffect(() => {
    if (isAnimating && currentStep < buildingSteps.length) {
      animationRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 1500)
    } else if (currentStep >= buildingSteps.length) {
      setIsAnimating(false)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current)
      }
    }
  }, [isAnimating, currentStep, buildingSteps.length])

  const resetAnimation = () => {
    setCurrentStep(0)
    setIsAnimating(true)
  }

  const renderTreeNode = (node, x, y, level, horizontalSpacing) => {
    if (!node) return null

    const nodeRadius = 30
    const verticalSpacing = 80
    const offset = horizontalSpacing / Math.pow(2, level + 1)

    const elements = []

    // Draw connections to children
    if (node.left) {
      const childX = x - offset
      const childY = y + verticalSpacing
      elements.push(
        <g key={`left-${x}-${y}`}>
          <line
            x1={x}
            y1={y + nodeRadius}
            x2={childX}
            y2={childY - nodeRadius}
            className={styles.treeLine}
            strokeWidth="2"
          />
          <text
            x={(x + childX) / 2 - 10}
            y={(y + childY) / 2}
            className={styles.edgeLabel}
          >
            0
          </text>
        </g>
      )
      elements.push(
        ...renderTreeNode(
          node.left,
          childX,
          childY,
          level + 1,
          horizontalSpacing
        )
      )
    }

    if (node.right) {
      const childX = x + offset
      const childY = y + verticalSpacing
      elements.push(
        <g key={`right-${x}-${y}`}>
          <line
            x1={x}
            y1={y + nodeRadius}
            x2={childX}
            y2={childY - nodeRadius}
            className={styles.treeLine}
            strokeWidth="2"
          />
          <text
            x={(x + childX) / 2 + 10}
            y={(y + childY) / 2}
            className={styles.edgeLabel}
          >
            1
          </text>
        </g>
      )
      elements.push(
        ...renderTreeNode(
          node.right,
          childX,
          childY,
          level + 1,
          horizontalSpacing
        )
      )
    }

    // Draw node
    const isLeaf = node.char !== null
    elements.push(
      <g key={`node-${x}-${y}`}>
        <circle
          cx={x}
          cy={y}
          r={nodeRadius}
          className={isLeaf ? styles.leafNode : styles.internalNode}
        />
        <text x={x} y={y - 5} textAnchor="middle" className={styles.nodeText}>
          {node.char || "⬤"}
        </text>
        <text x={x} y={y + 12} textAnchor="middle" className={styles.freqText}>
          {node.freq}
        </text>
      </g>
    )

    return elements
  }

  const getCurrentStepInfo = () => {
    if (currentStep === 0 || currentStep > buildingSteps.length) return null
    const step = buildingSteps[currentStep - 1]

    if (step.action === "initial") {
      return "Initial priority queue sorted by frequency"
    } else if (step.action === "merge") {
      const leftChar = step.left.char || "internal"
      const rightChar = step.right.char || "internal"
      return `Merging '${leftChar}' (${step.left.freq}) + '${rightChar}' (${step.right.freq}) = ${step.parent.freq}`
    }
    return null
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Huffman Coding - Data Compression 🗜️</h1>

      {/* Input Section */}
      <div className={styles.inputSection}>
        <div className={styles.inputGroup}>
          <label htmlFor="inputText">Enter Text to Compress:</label>
          <input
            id="inputText"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.toUpperCase())}
            placeholder="Enter text..."
            className={styles.textInput}
            disabled={isAnimating}
          />
        </div>
        <button
          onClick={handleBuildTree}
          className={styles.btnPrimary}
          disabled={isAnimating || !inputText.trim()}
        >
          Build Huffman Tree
        </button>
        {buildingSteps.length > 0 && (
          <button
            onClick={resetAnimation}
            className={styles.btnSecondary}
            disabled={isAnimating}
          >
            Replay Animation
          </button>
        )}
      </div>

      {/* Step Info */}
      {isAnimating && getCurrentStepInfo() && (
        <div className={styles.stepInfo}>
          <strong>Step {currentStep}:</strong> {getCurrentStepInfo()}
        </div>
      )}

      {/* Frequency Table */}
      {Object.keys(frequencies).length > 0 && (
        <div className={styles.section}>
          <h3>Character Frequencies</h3>
          <div className={styles.frequencyTable}>
            {Object.entries(frequencies)
              .sort((a, b) => b[1] - a[1])
              .map(([char, freq]) => (
                <div key={char} className={styles.freqItem}>
                  <span className={styles.charBox}>
                    {char === " " ? "SPACE" : char}
                  </span>
                  <div className={styles.freqBar}>
                    <div
                      className={styles.freqBarFill}
                      style={{
                        width: `${
                          (freq / Math.max(...Object.values(frequencies))) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className={styles.freqCount}>{freq}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Huffman Tree Visualization */}
      {huffmanTree && currentStep >= buildingSteps.length && (
        <div className={styles.section}>
          <h3>Huffman Tree</h3>
          <div className={styles.treeContainer}>
            <svg width="800" height="400" className={styles.treeSvg}>
              {renderTreeNode(huffmanTree, 400, 40, 0, 400)}
            </svg>
          </div>
          <p className={styles.treeNote}>
            Left edges = 0, Right edges = 1. Traverse from root to leaf to get
            the code.
          </p>
        </div>
      )}

      {/* Encoding Table */}
      {Object.keys(codes).length > 0 && currentStep >= buildingSteps.length && (
        <div className={styles.section}>
          <h3>Huffman Codes</h3>
          <div className={styles.codesTable}>
            {Object.entries(codes)
              .sort((a, b) => a[1].length - b[1].length)
              .map(([char, code]) => (
                <div key={char} className={styles.codeItem}>
                  <span className={styles.codeChar}>
                    {char === " " ? "SPACE" : char}
                  </span>
                  <span className={styles.codeArrow}>→</span>
                  <span className={styles.codeBinary}>{code}</span>
                  <span className={styles.codeLength}>
                    ({code.length} bits)
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Encoding/Decoding Results */}
      {encodedText && currentStep >= buildingSteps.length && (
        <div className={styles.section}>
          <h3>Compression Results</h3>
          <div className={styles.resultBox}>
            <div className={styles.resultItem}>
              <strong>Original Text:</strong>
              <div className={styles.textDisplay}>{inputText}</div>
            </div>
            <div className={styles.resultItem}>
              <strong>Encoded Binary:</strong>
              <div className={styles.textDisplay}>{encodedText}</div>
            </div>
            <div className={styles.resultItem}>
              <strong>Decoded Text:</strong>
              <div className={styles.textDisplay}>{decodedText}</div>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Original Size</div>
                <div className={styles.statValue}>
                  {inputText.length * 8} bits
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Compressed Size</div>
                <div className={styles.statValue}>
                  {encodedText.length} bits
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statLabel}>Compression Ratio</div>
                <div className={styles.statValue}>{compressionRatio}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Algorithm Explanation */}
      <div className={styles.explanation}>
        <h3>How Huffman Coding Works:</h3>
        <ol>
          <li>
            <strong>Calculate Frequencies:</strong> Count how many times each
            character appears in the text
          </li>
          <li>
            <strong>Create Priority Queue:</strong> Create a node for each
            character with its frequency
          </li>
          <li>
            <strong>Build Tree:</strong> Repeatedly merge the two nodes with
            smallest frequencies
          </li>
          <li>
            <strong>Generate Codes:</strong> Traverse the tree - left edges are
            0, right edges are 1
          </li>
          <li>
            <strong>Encode:</strong> Replace each character with its binary code
          </li>
          <li>
            <strong>Decode:</strong> Traverse the tree using the binary digits
            to reconstruct original text
          </li>
        </ol>
        <div className={styles.complexityBox}>
          <strong>Time Complexity:</strong> O(n log n) where n is the number of
          unique characters
          <br />
          <strong>Space Complexity:</strong> O(n) for the tree and codes
          <br />
          <strong>Key Property:</strong> Prefix-free codes - no code is a prefix
          of another
        </div>
      </div>
    </div>
  )
}

export default HuffmanCoding
