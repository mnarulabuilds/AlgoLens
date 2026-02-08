import React, { useState } from "react"
import styles from "./FloydWarshall.module.css"

const FloydWarshallVisualizer = () => {
  const [nodes, setNodes] = useState([])
  const [matrix, setMatrix] = useState([])
  const [log, setLog] = useState([])
  const INF = 999999999

  const addNode = () => {
    const newNode = `N${nodes.length}`
    const newNodes = [...nodes, newNode]

    // Extend matrix
    const newMatrix = matrix.map((row) => [...row, INF])
    newMatrix.push(new Array(newNodes.length).fill(INF))

    // Set diagonal 0
    newMatrix[newNodes.length - 1][newNodes.length - 1] = 0

    setNodes(newNodes)
    setMatrix(newMatrix)
  }

  const updateWeight = (i, j) => {
    const w = Number(prompt(`Weight ${nodes[i]} → ${nodes[j]}`))
    const newMatrix = [...matrix]
    newMatrix[i][j] = w
    setMatrix(newMatrix)
  }

  const runFW = () => {
    let dist = matrix.map((row) => [...row])
    let steps = []

    for (let k = 0; k < nodes.length; k++) {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j]
            steps.push(
              `Updated ${nodes[i]} → ${nodes[j]} via ${nodes[k]} = ${dist[i][j]}`
            )
          }
        }
      }
    }

    setMatrix(dist)
    setLog(steps)
  }

  return (
    <div className={styles.wrapper}>
      <h2>Floyd–Warshall Visualizer 🧠➡️🌐</h2>

      <div className={styles.controls}>
        <button onClick={addNode}>➕ Add Node</button>
        <button onClick={runFW} className={styles.runBtn}>
          ▶️ Run Floyd–Warshall
        </button>
      </div>

      <div className={styles.grid}>
        <div>
          <h3>Adjacency Matrix</h3>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th></th>
                {nodes.map((n) => (
                  <th key={n}>{n}</th>
                ))}
              </tr>
              {matrix.map((row, i) => (
                <tr key={i}>
                  <th>{nodes[i]}</th>
                  {row.map((val, j) => (
                    <td key={j} onClick={() => updateWeight(i, j)}>
                      {val === INF ? "∞" : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.logBox}>
          <h3>Updates</h3>
          {log.map((l, i) => (
            <div key={i} className={styles.logItem}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FloydWarshallVisualizer
