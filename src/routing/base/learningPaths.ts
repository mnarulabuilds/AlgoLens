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
  {
    id: "graphics-pipeline",
    title: "Graphics Pipeline Basics",
    description: "From pixels and color to transforms used in 2D rendering.",
    icon: "🖥️",
    steps: [
      {
        topicId: "graphics/RGBColorMixer",
        route: "/graphics/RGBColorMixer",
        label: "RGB Color Mixer",
      },
      {
        topicId: "graphics/BresenhamLine",
        route: "/graphics/BresenhamLine",
        label: "Bresenham Line",
      },
      {
        topicId: "graphics/AffineTransform2D",
        route: "/graphics/AffineTransform2D",
        label: "2D Affine Transforms",
      },
    ],
  },
  {
    id: "robotics-intro",
    title: "Robotics Intro",
    description: "Plan, move, and control a simple robot arm and grid world.",
    icon: "🤖",
    steps: [
      {
        topicId: "robotics/ForwardKinematics",
        route: "/robotics/ForwardKinematics",
        label: "Forward Kinematics",
      },
      {
        topicId: "robotics/OccupancyGrid",
        route: "/robotics/OccupancyGrid",
        label: "Occupancy Grid",
      },
      {
        topicId: "robotics/PIDController",
        route: "/robotics/PIDController",
        label: "PID Controller",
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
