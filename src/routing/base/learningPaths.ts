export type LearningPathStep = {
  topicId: string
  route: string
  label: string
}

export type LearningPath = {
  id: string
  title: string
  description: string
  icon: string
  steps: LearningPathStep[]
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "graph-algorithms",
    title: "Intro to Graph Algorithms",
    description:
      "Build intuition for traversal and shortest-path algorithms used in maps, networks, and games.",
    icon: "🌐",
    steps: [
      {
        topicId: "algo/BFSGraph",
        route: "/algo/BFSGraph",
        label: "Breadth First Search",
      },
      {
        topicId: "algo/DFSGraph",
        route: "/algo/DFSGraph",
        label: "Depth First Search",
      },
      {
        topicId: "algo/DijkstraGraph",
        route: "/algo/DijkstraGraph",
        label: "Dijkstra's Algorithm",
      },
      {
        topicId: "algo/AStarPathfinding",
        route: "/algo/AStarPathfinding",
        label: "A* Pathfinding",
      },
      {
        topicId: "algo/BellmanFord",
        route: "/algo/BellmanFord",
        label: "Bellman-Ford",
      },
    ],
  },
  {
    id: "ml-fundamentals",
    title: "ML Fundamentals",
    description:
      "From fitting lines to clustering and trees — see how models learn from data.",
    icon: "🤖",
    steps: [
      {
        topicId: "ml/LinearRegression",
        route: "/ml/LinearRegression",
        label: "Linear Regression",
      },
      {
        topicId: "ml/GradientDescent",
        route: "/ml/GradientDescent",
        label: "Gradient Descent",
      },
      {
        topicId: "ml/KMeansClustering",
        route: "/ml/KMeansClustering",
        label: "K-Means Clustering",
      },
      {
        topicId: "ml/DecisionTrees",
        route: "/ml/DecisionTrees",
        label: "Decision Trees",
      },
      {
        topicId: "ml/NeuralNetwork",
        route: "/ml/NeuralNetwork",
        label: "Neural Network",
      },
    ],
  },
  {
    id: "systems-interview",
    title: "Systems Interview Prep",
    description:
      "Operating systems, databases, and distributed systems concepts common in interviews.",
    icon: "💻",
    steps: [
      {
        topicId: "os/CPUScheduling",
        route: "/os/CPUScheduling",
        label: "CPU Scheduling",
      },
      {
        topicId: "os/PageReplacement",
        route: "/os/PageReplacement",
        label: "Page Replacement",
      },
      {
        topicId: "databases/LRUCache",
        route: "/databases/LRUCache",
        label: "LRU Cache",
      },
      {
        topicId: "distributed/ConsistentHashing",
        route: "/distributed/ConsistentHashing",
        label: "Consistent Hashing",
      },
      {
        topicId: "distributed/RaftConsensus",
        route: "/distributed/RaftConsensus",
        label: "Raft Consensus",
      },
    ],
  },
]

export function getPathProgress(
  path: LearningPath,
  completedTopics: string[]
): { done: number; total: number; percent: number } {
  const total = path.steps.length
  const done = path.steps.filter((step) =>
    completedTopics.includes(step.topicId)
  ).length
  return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}
