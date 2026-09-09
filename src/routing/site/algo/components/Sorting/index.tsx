import React, { useState, useEffect, useMemo } from "react"
import { FaCode, FaRandom } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import VisualizerToolbar from "common/components/VisualizerToolbar"
import useVisualizerControls from "common/hooks/useVisualizerControls"
import {
  useVisualizerParams,
  parseIntParam,
} from "common/hooks/useVisualizerParams"
import { useUser } from "common/context/UserContext"
import "./SortingVisualizer.css"

const TOPIC_ID = "algo/Sorting"

type AlgoKey = "bubble" | "quick" | "merge"

const SortingVisualizer = () => {
  const { markComplete } = useUser()
  const [params, setParams] = useVisualizerParams({ size: "40" })
  const arraySize = parseIntParam(params.size, 40, 10, 100)
  const [array, setArray] = useState<number[]>([])
  const [showPseudocode, setShowPseudocode] = useState(false)
  const [activeAlgo, setActiveAlgo] = useState<AlgoKey | null>(null)

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

  const algoData: Record<
    AlgoKey,
    {
      title: string
      complexity: string
      pseudocode: { text: string; indent: number }[]
    }
  > = {
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

  const setArraySize = (size: number) => {
    setParams({ size: String(size) })
  }

  const generateRandomArray = (size: number) => {
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
      if ((e as Error).message !== "ALGORITHM_STOPPED") throw e
    }
    stop()
    markComplete(TOPIC_ID)
  }

  const handleQuickSort = async () => {
    start()
    setActiveAlgo("quick")
    const arr = [...array]
    try {
      await quickSortInternal(arr, 0, arr.length - 1)
    } catch (e) {
      if ((e as Error).message !== "ALGORITHM_STOPPED") throw e
    }
    stop()
    markComplete(TOPIC_ID)
  }

  const quickSortInternal = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      setHighlightedLine(1)
      const pi = await partition(arr, low, high)
      setHighlightedLine(2)
      await quickSortInternal(arr, low, pi - 1)
      setHighlightedLine(3)
      await quickSortInternal(arr, pi + 1, high)
    }
  }

  const partition = async (arr: number[], low: number, high: number) => {
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
        <h2 className="visualization-title mb-0">Sorting Visualizer 📊</h2>
        <div className="d-flex gap-3 align-items-center">
          {activeAlgo && (
            <span className="badge bg-primary fs-6">
              {algoData[activeAlgo].title}: {algoData[activeAlgo].complexity}
            </span>
          )}
        </div>
      </div>

      <VisualizerToolbar
        isRunning={isRunning}
        isPaused={isPaused}
        speed={speed}
        onSpeedChange={setSpeed}
        onPause={pause}
        onResume={resume}
        onStop={stop}
        onStep={step}
        onReset={() => generateRandomArray(arraySize)}
        leftActions={
          <>
            <button
              type="button"
              className="btn btn-outline-info d-flex align-items-center gap-2"
              onClick={() => {
                if (!activeAlgo) setActiveAlgo("bubble")
                setShowPseudocode(true)
              }}
            >
              <FaCode /> Pseudocode
            </button>
            <button
              type="button"
              className="btn btn-secondary d-flex align-items-center gap-2"
              onClick={() => generateRandomArray(arraySize)}
              disabled={isRunning}
            >
              <FaRandom /> Generate
            </button>
          </>
        }
        centerActions={
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleBubbleSort}
              disabled={isRunning || isSorted}
            >
              Bubble
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleQuickSort}
              disabled={isRunning || isSorted}
            >
              Quick
            </button>
          </div>
        }
        rightActions={
          <div className="range-control">
            <label className="small fw-bold d-block" htmlFor="array-size">
              Size: {arraySize}
            </label>
            <input
              id="array-size"
              type="range"
              className="form-range"
              min="10"
              max="100"
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>
        }
      />

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
