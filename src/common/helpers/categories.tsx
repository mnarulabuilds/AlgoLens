import React from "react"
import {
  FaCode,
  FaTree,
  FaAtom,
  FaCalculator,
  FaGamepad,
  FaLaptop,
  FaNetworkWired,
  FaBrain,
  FaShieldAlt,
  FaMicrochip,
  FaDatabase,
  FaChartBar,
  FaCloud,
} from "react-icons/fa"
import { pages } from "routing/base/routes"

export const categoryIcons: Record<string, React.ReactNode> = {
  algo: <FaCode />,
  ds: <FaTree />,
  physics: <FaAtom />,
  math: <FaCalculator />,
  games: <FaGamepad />,
  os: <FaLaptop />,
  networking: <FaNetworkWired />,
  ml: <FaBrain />,
  security: <FaShieldAlt />,
  logic: <FaMicrochip />,
  databases: <FaDatabase />,
  statistics: <FaChartBar />,
  distributed: <FaCloud />,
  compilers: <FaCode />,
}

export const categoryDescriptions: Record<string, string> = {
  algo:
    "Visualize complex algorithms like Pathfinding, Sorting, and Graph traversals to understand their inner workings.",
  ds:
    "Explore fundamental data structures including Trees, Graphs, Linked Lists, and Heaps with interactive demos.",
  physics:
    "Simulate physical phenomena such as Projectile Motion, Solar Systems, and Pendulums in a virtual lab.",
  math:
    "Interactive tools for plotting equations, number systems, and geometric theorems.",
  games:
    "Play and analyze classic games and puzzles backed by Game Theory concepts.",
  os:
    "Understand operating system concepts like CPU Scheduling, Memory Allocation, and process synchronization.",
  networking:
    "Explore network protocols, TCP/IP stack, DNS resolution, and network communication fundamentals.",
  ml:
    "Visualize ML algorithms and neural networks including Linear Regression, K-Means, Neural Networks, and more.",
  security:
    "Explore cybersecurity fundamentals including Encryption, Hashing, and secure communication protocols.",
  logic:
    "Understand the hardware foundations of computing through Logic Gates, Digital Displays, and Arithmetic Circuits.",
  databases:
    "Explore caching, indexing, joins, and transaction isolation — essential database concepts for backend engineers.",
  statistics:
    "Build intuition for probability, inference, and stochastic processes through interactive simulations.",
  distributed:
    "Visualize consensus, hashing, and large-scale data processing patterns used in modern cloud systems.",
  compilers:
    "See how source code becomes tokens and parse trees in the front-end of a compiler pipeline.",
}

export function getCategoryLabel(categoryTopic: string): string | undefined {
  return pages.find((p) => p.topic === categoryTopic)?.label
}

export function getCategoryIcon(categoryTopic: string): React.ReactNode {
  return categoryIcons[categoryTopic] ?? <FaCode />
}
