import React, { useState, useEffect, useMemo, useCallback } from "react"
import { FaCode, FaPlay, FaPause, FaStop, FaRandom } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import useVisualizerControls from "common/hooks/useVisualizerControls"
import "./SortingVisualizer.css"

const SortingVisualizer = () => {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(40)
  const [showPseudocode, setShowPseudocode] = useState(false)
  const [activeAlgo, setActiveAlgo] = useState(null)

  const {
    isRunning,
    isPaused,
    speed,
    setSpeed,
    highlightedLine,
    setHighlightedLine,
    start,
    stop,
    pause,
    resume,
    step,
    wait,
  } = useVisualizerControls(60)

  useTrackView({
    id: "algo-sorting",
    label: "Sorting Algorithms",
    category: "Algorithms",
    route: "/algo/Sorting",
  })

  const algoData = {
    bubble: {
      title: "Bubble Sort",
      complexity: "O(n²)",
      pseudocode: [
        { text: "function bubbleSort(array):", indent: 0 },
        { text: "  n = length(array)", indent: 0 },
        { text: "  for i from 0 to n-1:", indent: 0 },
        { text: "    for j from 0 to n-i-2:", indent: 1 },
        { text: "      if array[j] > array[j+1]:", indent: 2 },
        { text: "        swap(array[j], array[j+1])", indent: 3 },
      ],
    },
    quick: {
      title: "Quick Sort",
      complexity: "O(n log n)",
      pseudocode: [
        { text: "function quickSort(array, low, high):", indent: 0 },
        { text: "  if low < high:", indent: 1 },
        { text: "    pi = partition(array, low, high)", indent: 2 },
        { text: "    quickSort(array, low, pi-1)", indent: 2 },
        { text: "    quickSort(array, pi+1, high)", indent: 2 },
      ],
    },
    merge: {
      title: "Merge Sort",
      complexity: "O(n log n)",
      pseudocode: [
        { text: "function mergeSort(array):", indent: 0 },
        { text: "  if length(array) <= 1: return array", indent: 1 },
        { text: "  mid = length(array) / 2", indent: 1 },
        { text: "  left = mergeSort(array[0:mid])", indent: 1 },
        { text: "  right = mergeSort(array[mid:end])", indent: 1 },
        { text: "  return merge(left, right)", indent: 1 },
      ],
    },
  }

  const isSorted = useMemo(() => {
    if (array.length === 0) return false
    for (let i = 1; i < array.length; i++) {
      if (array[i] < array[i - 1]) return false
    }
    return true
  }, [array])

  useEffect(() => {
    generateRandomArray(arraySize)
  }, [arraySize])

  const generateRandomArray = (size) => {
    if (isRunning) return
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 90) + 5
    )
    setArray(newArray)
  }

  const handleBubbleSort = async () => {
    start()
    setActiveAlgo("bubble")
    const arr = [...array]
    try {
      setHighlightedLine(1)
      await wait(undefined)
      for (let i = 0; i < arr.length; i++) {
        setHighlightedLine(2)
        for (let j = 0; j < arr.length - i - 1; j++) {
          setHighlightedLine(3)
          if (arr[j] > arr[j + 1]) {
            setHighlightedLine(4)
              ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            setArray([...arr])
            setHighlightedLine(5)
            await wait(undefined)
          }
        }
      }
    } catch (e) {
      if (e.message !== "ALGORITHM_STOPPED") throw e
    }
    stop()
  }

  const handleQuickSort = async () => {
    start()
    setActiveAlgo("quick")
    const arr = [...array]
    try {
      await quickSortInternal(arr, 0, arr.length - 1)
    } catch (e) {
      if (e.message !== "ALGORITHM_STOPPED") throw e
    }
    stop()
  }

  const quickSortInternal = async (arr, low, high) => {
    if (low < high) {
      setHighlightedLine(1)
      const pi = await partition(arr, low, high)
      setHighlightedLine(2)
      await quickSortInternal(arr, low, pi - 1)
      setHighlightedLine(3)
      await quickSortInternal(arr, pi + 1, high)
    }
  }

  const partition = async (arr, low, high) => {
    const pivot = arr[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
        await wait(undefined)
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await wait(undefined)
    return i + 1
  }

  return (
    <div className="sorting-visualizer container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="visualization-title mb-0">Sorting Visualizer 📊</h1>
        <div className="d-flex gap-3 align-items-center">
          {activeAlgo && (
            <span className="badge bg-primary fs-6">
              {algoData[activeAlgo].title}: {algoData[activeAlgo].complexity}
            </span>
          )}
          <FavoriteButton
            topic={{
              id: "algo-sorting",
              label: "Sorting Algorithms",
              category: "Algorithms",
              route: "/algo/Sorting",
            }}
          />
        </div>
      </div>

      <div className="controls card p-3 shadow-sm mb-4">
        <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center">
          <button
            className="btn btn-outline-info d-flex align-items-center gap-2"
            onClick={() => {
              if (isRunning) {
                setShowPseudocode(true)
              } else {
                if (!activeAlgo) setActiveAlgo("bubble")
                setShowPseudocode(true)
              }
            }}
          >
            <FaCode /> Pseudocode
          </button>

          <button
            className="btn btn-secondary d-flex align-items-center gap-2"
            onClick={() => generateRandomArray(arraySize)}
            disabled={isRunning}
          >
            <FaRandom /> Generate
          </button>

          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={handleBubbleSort}
              disabled={isRunning || isSorted}
            >
              Bubble
            </button>
            <button
              className="btn btn-primary"
              onClick={handleQuickSort}
              disabled={isRunning || isSorted}
            >
              Quick
            </button>
          </div>

          <div className="d-flex align-items-center gap-2 ms-md-4">
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
                <button className="btn btn-danger btn-sm" onClick={stop} title="Stop">
                  <FaStop />
                </button>
              </>
            )}
          </div>

          <div className="d-flex align-items-center gap-3 ms-md-auto">
            <div className="range-control">
              <label className="small fw-bold d-block">Size: {arraySize}</label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="100"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                disabled={isRunning}
              />
            </div>
            <div className="range-control">
              <label className="small fw-bold d-block">Speed</label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="array-container shadow-sm rounded">
        {array.map((value, idx) => (
          <div
            key={`array-element-${idx}`}
            className="array-bar"
            style={{
              height: `${value}%`,
              width: `${100 / array.length}%`,
              transition: array.length > 50 ? "none" : "height 0.2s",
            }}
          >
            {array.length < 25 && (
              <span className="bar-value">{value}</span>
            )}
          </div>
        ))}
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: activeAlgo
            ? `${algoData[activeAlgo].title} - Logic`
            : "Algorithm Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={activeAlgo ? algoData[activeAlgo].pseudocode : []}
              title={activeAlgo ? algoData[activeAlgo].title : "Select an algorithm"}
              highlightedLine={highlightedLine}
            />
          ),
          close: {
            callback: () => setShowPseudocode(false),
          },
        }}
      />
    </div>
  )
}

export default SortingVisualizer
