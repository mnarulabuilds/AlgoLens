import { evaluate } from "mathjs"

self.onmessage = function (e) {
  const { equation, precision } = e.data
  const size = 50
  const step = precision
  const pointsArray = []

  for (let x = -size; x <= size; x += step) {
    for (let y = -size; y <= size; y += step) {
      try {
        const z = evaluate(
          equation.replace("x", `(${x})`).replace("y", `(${y})`)
        )
        pointsArray.push({ x, y, z })
      } catch (err) {
        console.error("Invalid equation", err)
      }
    }
  }

  self.postMessage(pointsArray)
}
