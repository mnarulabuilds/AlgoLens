import React, { useState } from "react"
import { motion } from "framer-motion"
import "./MemoryAllocation.css"

const MemoryAllocation = () => {
  const [initialBlocks] = useState([
    { id: 1, size: 100, originalSize: 100, process: null },
    { id: 2, size: 500, originalSize: 500, process: null },
    { id: 3, size: 200, originalSize: 200, process: null },
    { id: 4, size: 300, originalSize: 300, process: null },
    { id: 5, size: 600, originalSize: 600, process: null },
  ])

  const [memoryBlocks, setMemoryBlocks] = useState([...initialBlocks])
  const [processes] = useState([
    { id: "A", size: 212 },
    { id: "B", size: 417 },
    { id: "C", size: 112 },
    { id: "D", size: 426 },
  ])

  const [logs, setLogs] = useState([])

  const reset = () => {
    setMemoryBlocks(
      initialBlocks.map((b) => ({ ...b, process: null, size: b.originalSize }))
    )

    setLogs(["System reset. Ready for allocation."])
  }

  const runFirstFit = () => {
    let currentBlocks = initialBlocks.map((b) => ({
      ...b,
      process: null,
      size: b.originalSize,
    }))
    let results = []
    let newLogs = ["Running First Fit Allocation..."]

    processes.forEach((proc) => {
      let allocated = false
      for (let i = 0; i < currentBlocks.length; i++) {
        if (!currentBlocks[i].process && currentBlocks[i].size >= proc.size) {
          currentBlocks[i].process = proc
          results.push({
            proc,
            blockId: currentBlocks[i].id,
            status: "allocated",
          })
          newLogs.push(
            `Process ${proc.id} (${proc.size} KB) allocated to Block ${currentBlocks[i].id}`
          )
          allocated = true
          break
        }
      }
      if (!allocated) {
        results.push({ proc, blockId: null, status: "failed" })
        newLogs.push(
          `Process ${proc.id} (${proc.size} KB) could not be allocated.`
        )
      }
    })

    setMemoryBlocks(currentBlocks)

    setLogs(newLogs)
  }

  const runBestFit = () => {
    let currentBlocks = initialBlocks.map((b) => ({
      ...b,
      process: null,
      size: b.originalSize,
    }))
    let results = []
    let newLogs = ["Running Best Fit Allocation..."]

    processes.forEach((proc) => {
      let bestIdx = -1
      for (let i = 0; i < currentBlocks.length; i++) {
        if (!currentBlocks[i].process && currentBlocks[i].size >= proc.size) {
          if (
            bestIdx === -1 ||
            currentBlocks[i].size < currentBlocks[bestIdx].size
          ) {
            bestIdx = i
          }
        }
      }

      if (bestIdx !== -1) {
        currentBlocks[bestIdx].process = proc
        results.push({
          proc,
          blockId: currentBlocks[bestIdx].id,
          status: "allocated",
        })
        newLogs.push(
          `Process ${proc.id} (${proc.size} KB) allocated to Block ${currentBlocks[bestIdx].id}`
        )
      } else {
        results.push({ proc, blockId: null, status: "failed" })
        newLogs.push(
          `Process ${proc.id} (${proc.size} KB) could not be allocated.`
        )
      }
    })

    setMemoryBlocks(currentBlocks)

    setLogs(newLogs)
  }

  return (
    <div className="os-visualizer container py-4">
      <div className="text-center mb-5">
        <h2 className="display-6 fw-bold text-primary">Memory Allocation</h2>
        <p className="text-muted">
          Simulating how various OS strategies assign memory to incoming
          processes.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-3">Incoming Processes</h5>
            <div className="process-list mb-4">
              {processes.map((p) => (
                <div
                  key={p.id}
                  className="process-item d-flex justify-content-between p-2 mb-2 bg-light rounded"
                >
                  <span className="fw-bold">Process {p.id}</span>
                  <span className="text-muted">{p.size} KB</span>
                </div>
              ))}
            </div>

            <h6 className="fw-bold mb-3">Algorithm Select</h6>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary" onClick={runFirstFit}>
                First Fit
              </button>
              <button className="btn btn-outline-success" onClick={runBestFit}>
                Best Fit
              </button>
              <button className="btn btn-light" onClick={reset}>
                Reset System
              </button>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <h6 className="fw-bold mb-3">Allocations Logs</h6>
            <div className="alloc-logs small scrollbar-thin">
              {logs.map((log, i) => (
                <div key={i} className="mb-2 border-bottom border-light pb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h5 className="fw-bold mb-4 text-center">
              Memory Map (2.0 MB Total)
            </h5>
            <div className="memory-map">
              {memoryBlocks.map((block) => (
                <div key={block.id} className="memory-block-container mb-3">
                  <div className="d-flex justify-content-between mb-1 small">
                    <span className="fw-bold">
                      Block {block.id} ({block.originalSize} KB)
                    </span>
                    {block.process && (
                      <span className="text-success fw-bold">
                        Allocated to P{block.process.id}
                      </span>
                    )}
                  </div>
                  <div className="block-bar">
                    <motion.div
                      className={`block-fill ${
                        block.process ? "filled" : "empty"
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: block.process
                          ? `${(block.process.size / block.size) * 100}%`
                          : "0%",
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {block.process && `P${block.process.id}`}
                    </motion.div>
                    {block.process && (
                      <div className="fragmentation-label">
                        Int. Frag: {block.originalSize - block.process.size} KB
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemoryAllocation
