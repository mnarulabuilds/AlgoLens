import React, { useMemo } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"

function convolve(a: number[], k: number[]) {
  const out: number[] = []
  for (let i = 0; i <= a.length + k.length - 2; i++) {
    let sum = 0
    for (let j = 0; j < k.length; j++) {
      const idx = i - j
      if (idx >= 0 && idx < a.length) sum += a[idx] * k[j]
    }
    out.push(Number(sum.toFixed(2)))
  }
  return out
}

const DiscreteConvolution = () => {
  const markComplete = useMarkComplete()
  const signal = [0, 0, 1, 2, 1, 0]
  const kernel = [1, 1, 1]
  const result = useMemo(() => convolve(signal, kernel), [])

  React.useEffect(() => {
    markComplete()
  }, [markComplete])

  return (
    <SimWorkbench
      title="Discrete Convolution"
      hint="Slide a kernel over a signal and sum products at each position."
    >
      <p>Signal: [{signal.join(", ")}]</p>
      <p>Kernel: [{kernel.join(", ")}]</p>
      <p>Output: [{result.join(", ")}]</p>
    </SimWorkbench>
  )
}

export default DiscreteConvolution
