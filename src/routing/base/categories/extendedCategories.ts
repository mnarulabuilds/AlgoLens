import type { Category } from "../routeTypes"

/** Categories added beyond the original AlgoLens catalog. */
export const EXTENDED_CATEGORIES: Category[] = [
  {
    topic: "graphics",
    label: "Computer Graphics 🖥️",
    pages: [
      {
        topic: "BresenhamLine",
        label: "Bresenham Line Drawing ✏️",
        difficulty: "intermediate",
      },
      {
        topic: "RGBColorMixer",
        label: "RGB Color Mixer 🎨",
        difficulty: "beginner",
      },
      {
        topic: "AffineTransform2D",
        label: "2D Affine Transforms 🔄",
        difficulty: "intermediate",
        prerequisites: ["math/BezierCurves"],
      },
    ],
  },
  {
    topic: "quantum",
    label: "Quantum Computing ⚛️",
    pages: [
      {
        topic: "QubitBloch",
        label: "Qubit & Bloch Sphere 🌐",
        difficulty: "intermediate",
      },
      {
        topic: "PauliGates",
        label: "Pauli Gates (X, Y, Z) 🚪",
        difficulty: "advanced",
        prerequisites: ["quantum/QubitBloch"],
      },
      {
        topic: "HadamardSuperposition",
        label: "Hadamard Superposition ➕",
        difficulty: "intermediate",
        prerequisites: ["quantum/QubitBloch"],
      },
    ],
  },
  {
    topic: "signals",
    label: "Signal Processing 📡",
    pages: [
      {
        topic: "NyquistSampling",
        label: "Nyquist Sampling Theorem 〰️",
        difficulty: "intermediate",
        prerequisites: ["math/FourierSeries"],
      },
      {
        topic: "DiscreteConvolution",
        label: "Discrete Convolution ⊗",
        difficulty: "advanced",
      },
      {
        topic: "MovingAverageFilter",
        label: "Moving Average Filter 📉",
        difficulty: "beginner",
      },
    ],
  },
  {
    topic: "economics",
    label: "Economics & Finance 💹",
    pages: [
      {
        topic: "SupplyDemand",
        label: "Supply & Demand 📈",
        difficulty: "beginner",
      },
      {
        topic: "CompoundInterest",
        label: "Compound Interest 💰",
        difficulty: "beginner",
      },
      {
        topic: "PrisonersDilemmaPayoff",
        label: "Game Theory Payoffs 🤝",
        difficulty: "intermediate",
        prerequisites: ["games/PrisonerDilemma"],
      },
    ],
  },
  {
    topic: "hci",
    label: "Human–Computer Interaction 🖱️",
    pages: [
      {
        topic: "FittsLaw",
        label: "Fitts's Law 🎯",
        difficulty: "beginner",
      },
      {
        topic: "HickHyman",
        label: "Hick–Hyman Law ⏱️",
        difficulty: "intermediate",
      },
      {
        topic: "GestaltProximity",
        label: "Gestalt Proximity 👁️",
        difficulty: "beginner",
      },
    ],
  },
  {
    topic: "robotics",
    label: "Robotics 🤖",
    pages: [
      {
        topic: "ForwardKinematics",
        label: "2-Link Forward Kinematics 🦾",
        difficulty: "intermediate",
        prerequisites: ["math/PythagorasTheorem"],
      },
      {
        topic: "PIDController",
        label: "PID Controller ⚙️",
        difficulty: "advanced",
      },
      {
        topic: "OccupancyGrid",
        label: "Occupancy Grid Mapping 🗺️",
        difficulty: "intermediate",
        prerequisites: ["algo/AStarPathfinding"],
      },
    ],
  },
]
