/** Visualizers upgraded to gold tier (toolbar, theme, completion, learn content). */
export const GOLD_VISUALIZER_IDS = new Set([
  "algo/Sorting",
  "algo/AStarPathfinding",
  "algo/BFSGraph",
  "algo/DijkstraGraph",
  "algo/BellmanFord",
  "algo/BinarySearch",
  "physics/Optics",
  "physics/Projectile",
  "ml/GradientDescent",
  "ml/LinearRegression",
  "ml/NeuralNetwork",
  "ml/KMeansClustering",
  "ml/DecisionTrees",
  "games/Game2048",
  "os/CPUScheduling",
  "os/PageReplacement",
])

export function isGoldVisualizer(topicId: string): boolean {
  return GOLD_VISUALIZER_IDS.has(topicId)
}
