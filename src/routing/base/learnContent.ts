import { pages } from "./routes"

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
  databases: {
    summary:
      "Database visualizers explain caching, indexing, joins, and isolation — core concepts for backend and system design interviews.",
    useCases: ["SQL optimization", "System design interviews", "Backend engineering"],
  },
  statistics: {
    summary:
      "Probability and statistics demos build intuition for inference, Bayes' rule, and stochastic processes.",
    useCases: ["Data science foundations", "A/B testing", "ML prerequisites"],
  },
  distributed: {
    summary:
      "Distributed systems visualizers cover consensus, hashing, and data processing at scale.",
    useCases: ["System design", "Cloud architecture", "Interview prep"],
  },
  compilers: {
    summary:
      "Compiler front-end demos show how source code becomes tokens and parse trees before execution.",
    useCases: ["Language implementation", "Parsing interview questions"],
  },
}

const TOPIC_CONTENT: Record<string, LearnContent> = {
  "algo/Sorting": {
    summary:
      "Sorting rearranges elements into order. Compare bubble, quick, and merge sort to see how divide-and-conquer and swapping strategies differ.",
    complexity: "Bubble O(n²) · Quick O(n log n) avg · Merge O(n log n)",
    useCases: ["Database indexing", "Search result ranking", "Data preprocessing"],
  },
  "algo/AStarPathfinding": {
    summary:
      "A* finds the shortest path using a heuristic that estimates remaining cost. Observe how open/closed sets expand toward the goal.",
    complexity: "O(E log V) with priority queue",
    useCases: ["Game AI navigation", "GPS routing", "Robot motion planning"],
  },
  "algo/BFSGraph": {
    summary: "Breadth-first search explores a graph layer by layer, guaranteeing shortest paths in unweighted graphs.",
    complexity: "O(V + E)",
    useCases: ["Social networks", "Maze solving", "Broadcast routing"],
  },
  "algo/DijkstraGraph": {
    summary: "Dijkstra's algorithm finds shortest paths from a source in weighted graphs with non-negative edges.",
    complexity: "O(E log V)",
    useCases: ["Maps", "Network routing", "Game pathfinding"],
  },
  "games/Game2048": {
    summary: "2048 merges tiles with the same value. The game ends when the board fills with no valid moves.",
    useCases: ["Grid state management", "Move validation patterns"],
  },
  "physics/Optics": {
    summary:
      "Explore reflection and refraction by moving a light source, mirrors, and lenses on an optical bench.",
    complexity: "Reflection: θᵢ = θᵣ · Snell: n₁ sin θ₁ = n₂ sin θ₂",
    useCases: ["Understanding mirrors and lenses", "Physics lab demos"],
  },
  "ml/LinearRegression": {
    summary: "Linear regression fits a line to data by minimizing squared error with gradient descent.",
    complexity: "Training O(n) per epoch",
    useCases: ["Prediction", "Trend analysis", "Intro to supervised learning"],
  },
  "ml/GradientDescent": {
    summary: "Gradient descent iteratively moves downhill on a loss surface by following the negative gradient.",
    complexity: "O(n) per iteration",
    useCases: ["Training neural networks", "Optimization", "ML foundations"],
  },
  "ml/DecisionTrees": {
    summary: "Decision trees split data on features to maximize information gain, creating interpretable rules.",
    complexity: "Training O(n · m · log n) for n samples, m features",
    useCases: ["Classification", "Feature importance", "Explainable AI"],
  },
  "databases/LRUCache": {
    summary: "LRU evicts the least recently used item when the cache is full — common in Memcached, Redis, and CPU caches.",
    useCases: ["Web caching", "Database buffer pools", "System design"],
  },
  "distributed/RaftConsensus": {
    summary: "Raft elects a leader and replicates logs to achieve consensus in distributed systems.",
    useCases: ["etcd", "Consul", "Distributed databases"],
  },
  "distributed/ConsistentHashing": {
    summary: "Consistent hashing maps keys to nodes so adding/removing servers minimizes remapping.",
    useCases: ["Load balancers", "Distributed caches", "CDNs"],
  },
  "statistics/BayesTheorem": {
    summary: "Bayes' theorem updates beliefs with new evidence: P(A|B) = P(B|A)P(A) / P(B).",
    useCases: ["Medical testing", "Spam filtering", "ML priors"],
  },
  "compilers/Lexer": {
    summary: "A lexer scans source code character-by-character and groups them into tokens for the parser.",
    useCases: ["Building DSLs", "Syntax highlighting", "Compiler front-ends"],
  },
}

function buildAutoSummary(category: string, label: string): string {
  const cleanLabel = label.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim()
  const categoryIntro =
    DEFAULT_BY_CATEGORY[category]?.summary.split(".")[0] ?? "Interactive visualization"
  return `${cleanLabel}: ${categoryIntro.toLowerCase()}. Experiment with parameters and observe the behavior step by step.`
}

/** Build auto-generated entries for every registered page. */
function buildTopicCatalog(): Record<string, LearnContent> {
  const catalog: Record<string, LearnContent> = {}

  pages.forEach((category) => {
    category.pages.forEach((page) => {
      const topicId = `${category.topic}/${page.topic}`
      if (TOPIC_CONTENT[topicId]) return

      const base = DEFAULT_BY_CATEGORY[category.topic]
      catalog[topicId] = {
        summary: buildAutoSummary(category.topic, page.label),
        useCases: base?.useCases ?? ["Self-paced learning", "Classroom demos"],
      }
    })
  })

  return catalog
}

const AUTO_TOPIC_CONTENT = buildTopicCatalog()

export function getLearnContent(topicId: string): LearnContent {
  return (
    TOPIC_CONTENT[topicId] ??
    AUTO_TOPIC_CONTENT[topicId] ??
    DEFAULT_BY_CATEGORY[topicId.split("/")[0]] ?? {
      summary:
        "Explore this interactive visualization to build intuition through experimentation.",
      useCases: ["Self-paced learning", "Classroom demos"],
    }
  )
}

export function getAllLearnTopicIds(): string[] {
  return Object.keys(AUTO_TOPIC_CONTENT).concat(Object.keys(TOPIC_CONTENT))
}
