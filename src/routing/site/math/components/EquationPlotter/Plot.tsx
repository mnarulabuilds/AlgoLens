import React, { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { evaluate } from "mathjs"
import { Chart as ChartJS, CategoryScale } from "chart.js/auto"

ChartJS.register(CategoryScale)

const Plot = ({ equation }) => {
  const [data, setData] = useState({ labels: [], datasets: [] })

  useEffect(() => {
    if (equation) {
      const xValues = Array.from({ length: 100 }, (_, i) => i * 2 - 3)
      const yValues = xValues.map((x) => {
        try {
          return evaluate(equation.replace("x", `(${x})`))
        } catch {
          return NaN
        }
      })

      setData({
        labels: xValues,
        datasets: [
          {
            label: equation,
            data: yValues,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      })
    }
  }, [equation])

  return (
    <div className="plot">
      <Line data={data} />
    </div>
  )
}

export default Plot
