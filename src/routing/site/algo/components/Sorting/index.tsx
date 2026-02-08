import React, { useState, useEffect, useMemo } from "react"
import { FaCode } from "react-icons/fa"
import CustomizedDialogs from "common/components/LightBox"
import PseudocodeViewer from "common/components/PseudocodeViewer"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import "./SortingVisualizer.css"

const SortingVisualizer = () => {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(50)
  const [isSorting, setIsSorting] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [showPseudocode, setShowPseudocode] = useState(false)

  // Track this view in user's history
  useTrackView({
    id: "algo-sorting",
    label: "Sorting Algorithms",
    category: "Algorithms",
    route: "/algo/Sorting",
  })

  const pseudocode = [
    { text: "// BUBBLE SORT", indent: 0 },
    { text: "function bubbleSort(array):", indent: 0 },
    { text: "n = length(array)", indent: 1 },
    { text: "for i from 0 to n-1:", indent: 1 },
    { text: "for j from 0 to n-i-2:", indent: 2 },
    { text: "if array[j] > array[j+1]:", indent: 3 },
    { text: "swap(array[j], array[j+1])", indent: 4 },
    { text: "", indent: 0 },
    { text: "// QUICK SORT", indent: 0 },
    { text: "function quickSort(array, low, high):", indent: 0 },
    { text: "if low < high:", indent: 1 },
    { text: "pi = partition(array, low, high)", indent: 2 },
    { text: "quickSort(array, low, pi-1)", indent: 2 },
    { text: "quickSort(array, pi+1, high)", indent: 2 },
    { text: "", indent: 0 },
    { text: "function partition(array, low, high):", indent: 0 },
    { text: "pivot = array[high]", indent: 1 },
    { text: "i = low - 1", indent: 1 },
    { text: "for j from low to high-1:", indent: 1 },
    { text: "if array[j] < pivot:", indent: 2 },
    { text: "i++", indent: 3 },
    { text: "swap(array[i], array[j])", indent: 3 },
    { text: "swap(array[i+1], array[high])", indent: 1 },
    { text: "return i+1", indent: 1 },
    { text: "", indent: 0 },
    { text: "// MERGE SORT", indent: 0 },
    { text: "function mergeSort(array):", indent: 0 },
    { text: "if length(array) <= 1:", indent: 1 },
    { text: "return array", indent: 2 },
    { text: "mid = length(array) / 2", indent: 1 },
    { text: "left = mergeSort(array[0:mid])", indent: 1 },
    { text: "right = mergeSort(array[mid:end])", indent: 1 },
    { text: "return merge(left, right)", indent: 1 },
    { text: "", indent: 0 },
    { text: "function merge(left, right):", indent: 0 },
    { text: "result = []", indent: 1 },
    { text: "while left not empty AND right not empty:", indent: 1 },
    { text: "if left[0] < right[0]:", indent: 2 },
    { text: "result.append(left[0])", indent: 3 },
    { text: "remove left[0]", indent: 3 },
    { text: "else:", indent: 2 },
    { text: "result.append(right[0])", indent: 3 },
    { text: "remove right[0]", indent: 3 },
    { text: "result.append(remaining of left and right)", indent: 1 },
    { text: "return result", indent: 1 },
  ]

  const isSorted = useMemo(() => {
    for (let i = 1; i < array.length; ++i) {
      if (array[i] < array[i - 1]) {
        return false
      }
    }

    return true
  }, [array])

  useEffect(() => {
    generateRandomArray(arraySize)
  }, [arraySize])

  const generateRandomArray = (size) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    )
    setArray(newArray)
  }

  const bubbleSort = async () => {
    setIsSorting(true)
    const arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, speed))
        }
      }
    }
    setIsSorting(false)
  }

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pi = await partition(arr, low, high)
      await Promise.all([
        quickSort(arr, low, pi - 1),
        quickSort(arr, pi + 1, high),
      ])
    }
    setArray([...arr])
    return arr
  }

  const partition = async (arr, low, high) => {
    const pivot = arr[high]
    let i = low - 1
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
        await new Promise((resolve) => setTimeout(resolve, speed))
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await new Promise((resolve) => setTimeout(resolve, speed))
    return i + 1
  }

  const mergeSort = async (arr) => {
    if (arr.length <= 1) return arr
    const mid = Math.floor(arr.length / 2)
    const left = await mergeSort(arr.slice(0, mid))
    const right = await mergeSort(arr.slice(mid))
    return await merge(left, right)
  }

  const merge = async (left, right) => {
    let sortedArray = []
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArray.push(left.shift())
      } else {
        sortedArray.push(right.shift())
      }
      setArray([...sortedArray, ...left, ...right])
      await new Promise((resolve) => setTimeout(resolve, speed))
    }
    return [...sortedArray, ...left, ...right]
  }

  const handleArraySizeChange = (e) => {
    setArraySize(Number(e.target.value))
  }

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value))
  }

  return (
    <div className="sorting-visualizer">
      <div className="controls">
        <button
          className="pseudocode-btn"
          onClick={() => setShowPseudocode(true)}
          title="View Pseudocode"
        >
          <FaCode /> Pseudocode
        </button>
        <FavoriteButton
          topic={{
            id: "algo-sorting",
            label: "Sorting Algorithms",
            category: "Algorithms",
            route: "/algo/Sorting",
          }}
        />
        <button
          onClick={() => generateRandomArray(arraySize)}
          disabled={isSorting}
        >
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={isSorting || isSorted}>
          Bubble Sort
        </button>
        <button
          onClick={async () => {
            setIsSorting(true)
            await quickSort(array)
            setIsSorting(false)
          }}
          disabled={isSorting || isSorted}
        >
          Quick Sort
        </button>
        <button
          onClick={async () => {
            setIsSorting(true)
            await mergeSort(array)
            setIsSorting(false)
          }}
          disabled={isSorting || isSorted}
        >
          Merge Sort
        </button>
        <label>
          Array Size:
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={handleArraySizeChange}
            disabled={isSorting}
          />
        </label>
        <label>
          Speed:
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={handleSpeedChange}
            disabled={isSorting}
          />
        </label>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={`array-element-${value}-${idx}`}
            className="array-bar"
            style={{ height: `${value}%` }}
          ></div>
        ))}
      </div>

      <CustomizedDialogs
        dialogConfig={{
          open: showPseudocode,
          title: "Sorting Algorithms - Pseudocode",
          contentJSX: (
            <PseudocodeViewer
              pseudocode={pseudocode}
              title="Sorting Algorithms (Bubble, Quick, Merge)"
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
