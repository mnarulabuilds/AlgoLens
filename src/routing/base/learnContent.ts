export type LearnContent = {
  summary: string
  complexity?: string
  useCases?: string[]
  relatedLinks?: { label: string; url: string }[]
}

const DEFAULT_BY_CATEGORY: Record<string, LearnContent> = {
  algo: {
    summary:
      "Algorithms are step-by-step procedures for solving problems. Watch how data moves through each step and compare time/space trade-offs.",
    useCases: ["Interview prep", "Understanding core CS concepts"],
  },
  ds: {
    summary:
      "Data structures organize information so operations like search, insert, and delete can be performed efficiently.",
    useCases: ["System design", "Choosing the right structure for a problem"],
  },
  physics: {
    summary:
      "Physics simulations model real-world motion and forces. Adjust parameters to see how equations behave visually.",
    useCases: ["STEM education", "Building intuition for formulas"],
  },
  math: {
    summary:
      "Interactive math tools help you explore equations, series, and geometry by changing variables in real time.",
    useCases: ["Calculus review", "Visualizing functions"],
  },
  games: {
    summary:
      "Games combine logic, strategy, and state management. Play, experiment, and observe the algorithms behind the scenes.",
    useCases: ["Recreational learning", "State machine intuition"],
  },
  os: {
    summary:
      "Operating system visualizers demonstrate scheduling, memory, and synchronization concepts used in real kernels.",
    useCases: ["OS course labs", "Interview preparation"],
  },
  networking: {
    summary:
      "Networking demos walk through protocols layer by layer — from DNS lookups to TCP handshakes.",
    useCases: ["Network fundamentals", "Debugging connectivity issues"],
  },
  ml: {
    summary:
      "Machine learning visualizers show how models learn from data through iterative optimization.",
    useCases: ["ML intuition", "Understanding gradient-based learning"],
  },
  security: {
    summary:
      "Security tools demonstrate encryption, hashing, and classic ciphers in an interactive sandbox.",
    useCases: ["Crypto basics", "Security awareness"],
  },
  logic: {
    summary:
      "Digital logic visualizers connect boolean algebra to the hardware building blocks of processors.",
    useCases: ["Computer architecture", "Boolean logic practice"],
  },
}

const TOPIC_CONTENT: Record<string, LearnContent> = {
  "algo/Sorting": {
    summary:
      "Sorting rearranges elements into order. Compare bubble, quick, and merge sort to see how divide-and-conquer and swapping strategies differ.",
    complexity: "Bubble O(n²) · Quick O(n log n) avg · Merge O(n log n)",
    useCases: ["Database indexing", "Search result ranking", "Data preprocessing"],
    relatedLinks: [
      {
        label: "Sorting (Wikipedia)",
        url: "https://en.wikipedia.org/wiki/Sorting_algorithm",
      },
    ],
  },
  "algo/AStarPathfinding": {
    summary:
      "A* finds the shortest path using a heuristic that estimates remaining cost. Observe how open/closed sets expand toward the goal.",
    complexity: "O(b^d) depending on heuristic quality",
    useCases: ["Game AI navigation", "GPS routing", "Robot motion planning"],
  },
  "games/Game2048": {
    summary:
      "2048 merges tiles with the same value. The game ends when the board fills with no valid moves.",
    useCases: ["Grid state management", "Move validation patterns"],
  },
  "ml/LinearRegression": {
    summary:
      "Linear regression fits a line to data by minimizing squared error with gradient descent.",
    complexity: "Training O(n) per epoch",
    useCases: ["Prediction", "Trend analysis", "Intro to supervised learning"],
  },
}

export function getLearnContent(topicId: string): LearnContent {
  if (TOPIC_CONTENT[topicId]) {
    return TOPIC_CONTENT[topicId]
  }

  const [category] = topicId.split("/")
  return (
    DEFAULT_BY_CATEGORY[category] ?? {
      summary:
        "Explore this interactive visualization to build intuition through experimentation.",
      useCases: ["Self-paced learning", "Classroom demos"],
    }
  )
}
