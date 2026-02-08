import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import styles from "./TrafficSimulation.module.css"

const CAR_WIDTH = 40
const CAR_HEIGHT = 25

const makeCar = (id, lanes, vmax) => ({
  id,
  lane: Math.floor(Math.random() * lanes), // random lane
  pos: 0, // always start at beginning
  speed: Math.floor(Math.random() * (vmax + 1)),
  color: `hsl(${Math.random() * 360}, 70%, 50%)`,
})

const createCars = (lanes, carCount, vmax) => {
  const cars = []
  for (let i = 0; i < carCount; i++) {
    cars.push(makeCar(i, lanes, vmax))
  }
  return cars
}

export default function RealisticTrafficSimulation({
  lanes = 3,
  roadLength = 60, // number of discrete cells
  carCount = 8,
  vmax = 5,
  p = 0.2,
  interval = 500,
}) {
  const roadRef = useRef(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })
  const [cars, setCars] = useState(createCars(lanes, carCount, vmax))
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)
  const nextId = useRef(carCount)

  const measure = () => {
    if (!roadRef.current) return
    const rect = roadRef.current.getBoundingClientRect()
    setDims({ width: rect.width, height: rect.height })
  }

  useLayoutEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const stepSimulation = () => {
    setCars((prev) => {
      let next = prev.map((c) => ({ ...c }))

      // update speeds & positions
      for (let lane = 0; lane < lanes; lane++) {
        const laneCars = next
          .filter((c) => c.lane === lane)
          .sort((a, b) => a.pos - b.pos)

        for (let i = 0; i < laneCars.length; i++) {
          const car = laneCars[i]

          // accelerate
          if (car.speed < vmax) car.speed++

          // distance to next car
          const nextCar = laneCars[i + 1]
          let gap = nextCar ? nextCar.pos - car.pos - 1 : roadLength

          if (car.speed > gap) car.speed = gap

          // random slowdown
          if (Math.random() < p && car.speed > 0) car.speed--

          // move forward
          car.pos += car.speed
        }
      }

      // remove cars that reached end
      const survivors = next.filter((c) => c.pos < roadLength)

      // spawn new cars for removed ones
      const removedCount = next.length - survivors.length
      for (let i = 0; i < removedCount; i++) {
        survivors.push(makeCar(nextId.current++, lanes, vmax))
      }

      return survivors
    })
  }

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(stepSimulation, interval)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, interval])

  // map discrete pos -> pixels
  const usableWidth = Math.max(0, dims.width - CAR_WIDTH)
  const cellWidth = roadLength > 1 ? usableWidth / (roadLength - 1) : 0
  const laneGap =
    lanes > 1 ? Math.max(0, dims.height - CAR_HEIGHT) / (lanes - 1) : 0

  return (
    <div className={styles.container}>
      <h3>Traffic Simulation</h3>

      <div className={styles.road} ref={roadRef}>
        {cars.map((car) => {
          const xPx = Math.round(car.pos * cellWidth)
          const yPx = Math.round(car.lane * laneGap)

          return (
            <div
              key={car.id}
              className={styles.car}
              style={{
                backgroundColor: car.color,
                transform: `translate(${xPx}px, ${yPx}px)`,
              }}
            >
              🚗
            </div>
          )
        })}
      </div>
      <button onClick={() => setRunning((r) => !r)} className={styles.button}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  )
}
