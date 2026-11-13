import React, { createContext, useState, useContext } from "react"

export type Planet = {
  name: string
  radius: number
  distance: number
  speed: number
  angle: number
  fillColor: string
  hasRings?: boolean
}
type PlanetContextValue = {
  planets: Planet[]
  setPlanets: React.Dispatch<React.SetStateAction<Planet[]>>
}

const PlanetContext = createContext<PlanetContextValue | undefined>(undefined)

export const PlanetProvider = ({ children }: { children: React.ReactNode }) => {
  const [planets, setPlanets] = useState<Planet[]>([
    {
      name: "Sun",
      radius: 25,
      distance: 0,
      speed: 0,
      angle: 0,
      fillColor: "#FFB300",
    },
    {
      name: "Mercury",
      radius: 4,
      distance: 35,
      speed: 1.59,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#B9B2AA",
    },
    {
      name: "Venus",
      radius: 7,
      distance: 45,
      speed: 1.2,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#E8C07A",
    },
    {
      name: "Earth",
      radius: 8,
      distance: 60,
      speed: 1,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#2E7DFF",
    },
    {
      name: "Mars",
      radius: 6,
      distance: 75,
      speed: 0.8,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#FF6A3D",
    },
    {
      name: "Jupiter",
      radius: 18,
      distance: 100,
      speed: 0.38,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#D6A07A",
    },
    {
      name: "Saturn",
      radius: 15,
      distance: 130,
      speed: 0.32,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#E0C27B",
      hasRings: true,
    },
    {
      name: "Uranus",
      radius: 12,
      distance: 155,
      speed: 0.23,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#7FE7FF",
    },
    {
      name: "Neptune",
      radius: 11,
      distance: 175,
      speed: 0.18,
      angle: Math.random() * Math.PI * 2,
      fillColor: "#3D62FF",
    },
  ])

  return (
    <PlanetContext.Provider value={{ planets, setPlanets }}>
      {children}
    </PlanetContext.Provider>
  )
}

export const usePlanets = () => {
  const context = useContext(PlanetContext)
  if (!context) {
    throw new Error("usePlanets must be used within a PlanetProvider")
  }
  return context
}
