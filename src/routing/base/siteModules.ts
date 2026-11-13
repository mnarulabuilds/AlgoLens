import type { ComponentType } from "react"

export type SiteModule = {
  default: ComponentType<Record<string, unknown>>
}

export type SiteModuleLoader = () => Promise<SiteModule>

export function siteModuleImportPath(sitePath: string): string {
  return `../${sitePath}/index.tsx`
}

export const siteModules: Record<string, SiteModuleLoader> = {
  [siteModuleImportPath("site/algo/components/AStarPathfinding")]: () =>
    import(
      "../site/algo/components/AStarPathfinding/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/BFSGraph")]: () =>
    import("../site/algo/components/BFSGraph/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/BellmanFord")]: () =>
    import("../site/algo/components/BellmanFord/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/BinarySearch")]: () =>
    import("../site/algo/components/BinarySearch/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/ClosestPair")]: () =>
    import("../site/algo/components/ClosestPair/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/DFSGraph")]: () =>
    import("../site/algo/components/DFSGraph/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/DijkstraGraph")]: () =>
    import(
      "../site/algo/components/DijkstraGraph/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Exponentiation")]: () =>
    import(
      "../site/algo/components/Exponentiation/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Factorial")]: () =>
    import("../site/algo/components/Factorial/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Factorize")]: () =>
    import("../site/algo/components/Factorize/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Fibonacci")]: () =>
    import("../site/algo/components/Fibonacci/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/FloodFill")]: () =>
    import("../site/algo/components/FloodFill/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/FloydWarshall")]: () =>
    import(
      "../site/algo/components/FloydWarshall/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/HuffmanCoding")]: () =>
    import(
      "../site/algo/components/HuffmanCoding/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/JumpSearch")]: () =>
    import("../site/algo/components/JumpSearch/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/KnuthShuffle")]: () =>
    import("../site/algo/components/KnuthShuffle/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/KruskalMST")]: () =>
    import("../site/algo/components/KruskalMST/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/NQueens")]: () =>
    import("../site/algo/components/NQueens/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Palindrome")]: () =>
    import("../site/algo/components/Palindrome/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Peak")]: () =>
    import("../site/algo/components/Peak/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Primes")]: () =>
    import("../site/algo/components/Primes/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/PrimsMST")]: () =>
    import("../site/algo/components/PrimsMST/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Sieve")]: () =>
    import("../site/algo/components/Sieve/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/Sorting")]: () =>
    import("../site/algo/components/Sorting/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/TowerOfHanoi")]: () =>
    import("../site/algo/components/TowerOfHanoi/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/algo/components/TrafficSimulation")]: () =>
    import(
      "../site/algo/components/TrafficSimulation/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/compilers/components/Lexer")]: () =>
    import("../site/compilers/components/Lexer/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/compilers/components/Parser")]: () =>
    import("../site/compilers/components/Parser/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/databases/components/BloomFilter")]: () =>
    import(
      "../site/databases/components/BloomFilter/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/databases/components/IndexScan")]: () =>
    import(
      "../site/databases/components/IndexScan/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/databases/components/LRUCache")]: () =>
    import(
      "../site/databases/components/LRUCache/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/databases/components/SQLJoin")]: () =>
    import("../site/databases/components/SQLJoin/index") as Promise<SiteModule>,
  [siteModuleImportPath(
    "site/databases/components/TransactionIsolation"
  )]: () =>
    import(
      "../site/databases/components/TransactionIsolation/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/distributed/components/ConsistentHashing")]: () =>
    import(
      "../site/distributed/components/ConsistentHashing/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/distributed/components/MapReduce")]: () =>
    import(
      "../site/distributed/components/MapReduce/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/distributed/components/RaftConsensus")]: () =>
    import(
      "../site/distributed/components/RaftConsensus/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Array")]: () =>
    import("../site/ds/components/Array/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/BPlusTree")]: () =>
    import("../site/ds/components/BPlusTree/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/BTree")]: () =>
    import("../site/ds/components/BTree/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/BinaryTree")]: () =>
    import("../site/ds/components/BinaryTree/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/DisjointSetUnion")]: () =>
    import(
      "../site/ds/components/DisjointSetUnion/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Graph")]: () =>
    import("../site/ds/components/Graph/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Heap")]: () =>
    import("../site/ds/components/Heap/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/LinkedList")]: () =>
    import("../site/ds/components/LinkedList/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Lookup")]: () =>
    import("../site/ds/components/Lookup/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Queues")]: () =>
    import("../site/ds/components/Queues/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/RedBlackTree")]: () =>
    import("../site/ds/components/RedBlackTree/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Sets")]: () =>
    import("../site/ds/components/Sets/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Stacks")]: () =>
    import("../site/ds/components/Stacks/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ds/components/Trie")]: () =>
    import("../site/ds/components/Trie/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/economics/components/CompoundInterest")]: () =>
    import(
      "../site/economics/components/CompoundInterest/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath(
    "site/economics/components/PrisonersDilemmaPayoff"
  )]: () =>
    import(
      "../site/economics/components/PrisonersDilemmaPayoff/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/economics/components/SupplyDemand")]: () =>
    import(
      "../site/economics/components/SupplyDemand/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Breakout")]: () =>
    import("../site/games/components/Breakout/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Chess")]: () =>
    import("../site/games/components/Chess/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/ConnectFour")]: () =>
    import("../site/games/components/ConnectFour/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Game2048")]: () =>
    import("../site/games/components/Game2048/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/LightsOut")]: () =>
    import("../site/games/components/LightsOut/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/MatchTiles")]: () =>
    import("../site/games/components/MatchTiles/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/MazeGame")]: () =>
    import("../site/games/components/MazeGame/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/MemoryCards")]: () =>
    import("../site/games/components/MemoryCards/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Minesweeper")]: () =>
    import("../site/games/components/Minesweeper/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/PrisonerDilemma")]: () =>
    import(
      "../site/games/components/PrisonerDilemma/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Puzzle15")]: () =>
    import("../site/games/components/Puzzle15/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/RockPaperScissors")]: () =>
    import(
      "../site/games/components/RockPaperScissors/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/SnakeGame")]: () =>
    import("../site/games/components/SnakeGame/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Sudoku")]: () =>
    import("../site/games/components/Sudoku/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/Tetris")]: () =>
    import("../site/games/components/Tetris/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/games/components/TicTacToe")]: () =>
    import("../site/games/components/TicTacToe/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/graphics/components/AffineTransform2D")]: () =>
    import(
      "../site/graphics/components/AffineTransform2D/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/graphics/components/BresenhamLine")]: () =>
    import(
      "../site/graphics/components/BresenhamLine/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/graphics/components/RGBColorMixer")]: () =>
    import(
      "../site/graphics/components/RGBColorMixer/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/hci/components/FittsLaw")]: () =>
    import("../site/hci/components/FittsLaw/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/hci/components/GestaltProximity")]: () =>
    import(
      "../site/hci/components/GestaltProximity/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/hci/components/HickHyman")]: () =>
    import("../site/hci/components/HickHyman/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/logic/components/BinaryAdder")]: () =>
    import("../site/logic/components/BinaryAdder/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/logic/components/LogicGates")]: () =>
    import("../site/logic/components/LogicGates/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/logic/components/Multiplexer")]: () =>
    import("../site/logic/components/Multiplexer/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/logic/components/SRLatch")]: () =>
    import("../site/logic/components/SRLatch/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/logic/components/SevenSegment")]: () =>
    import(
      "../site/logic/components/SevenSegment/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/3DEquationPlotter")]: () =>
    import(
      "../site/math/components/3DEquationPlotter/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/AdvancedCalculator")]: () =>
    import(
      "../site/math/components/AdvancedCalculator/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/BezierCurves")]: () =>
    import("../site/math/components/BezierCurves/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/Calculator")]: () =>
    import("../site/math/components/Calculator/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/EquationPlotter")]: () =>
    import(
      "../site/math/components/EquationPlotter/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/FourierSeries")]: () =>
    import(
      "../site/math/components/FourierSeries/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/FractalTrees")]: () =>
    import("../site/math/components/FractalTrees/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/MonteCarloPi")]: () =>
    import("../site/math/components/MonteCarloPi/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/NumberSystems")]: () =>
    import(
      "../site/math/components/NumberSystems/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/PythagorasTheorem")]: () =>
    import(
      "../site/math/components/PythagorasTheorem/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/math/components/TaylorSeries")]: () =>
    import("../site/math/components/TaylorSeries/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/DecisionTrees")]: () =>
    import("../site/ml/components/DecisionTrees/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/GradientDescent")]: () =>
    import(
      "../site/ml/components/GradientDescent/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/KMeansClustering")]: () =>
    import(
      "../site/ml/components/KMeansClustering/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/KNearestNeighbors")]: () =>
    import(
      "../site/ml/components/KNearestNeighbors/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/LinearRegression")]: () =>
    import(
      "../site/ml/components/LinearRegression/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/ml/components/NeuralNetwork")]: () =>
    import("../site/ml/components/NeuralNetwork/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/networking/components/DNSLookup")]: () =>
    import(
      "../site/networking/components/DNSLookup/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/networking/components/IPv4Subnetting")]: () =>
    import(
      "../site/networking/components/IPv4Subnetting/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/networking/components/OSIModel")]: () =>
    import(
      "../site/networking/components/OSIModel/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/networking/components/TCPHandshake")]: () =>
    import(
      "../site/networking/components/TCPHandshake/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/BankersAlgorithm")]: () =>
    import(
      "../site/os/components/BankersAlgorithm/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/CPUScheduling")]: () =>
    import("../site/os/components/CPUScheduling/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/DiningPhilosophers")]: () =>
    import(
      "../site/os/components/DiningPhilosophers/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/DiskScheduling")]: () =>
    import("../site/os/components/DiskScheduling/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/MemoryAllocation")]: () =>
    import(
      "../site/os/components/MemoryAllocation/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/os/components/PageReplacement")]: () =>
    import(
      "../site/os/components/PageReplacement/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/CircularMotion")]: () =>
    import(
      "../site/physics/components/CircularMotion/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/DoublePendulum")]: () =>
    import(
      "../site/physics/components/DoublePendulum/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/ElasticCollisions")]: () =>
    import(
      "../site/physics/components/ElasticCollisions/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/FluidRipple")]: () =>
    import(
      "../site/physics/components/FluidRipple/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/MagneticField")]: () =>
    import(
      "../site/physics/components/MagneticField/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/Optics")]: () =>
    import("../site/physics/components/Optics/index") as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/Projectile")]: () =>
    import(
      "../site/physics/components/Projectile/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/RollingMotion")]: () =>
    import(
      "../site/physics/components/RollingMotion/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/SimpleHarmonicMotion")]: () =>
    import(
      "../site/physics/components/SimpleHarmonicMotion/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/SimplePendulum")]: () =>
    import(
      "../site/physics/components/SimplePendulum/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/SolarSystem")]: () =>
    import(
      "../site/physics/components/SolarSystem/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/Thermodynamics")]: () =>
    import(
      "../site/physics/components/Thermodynamics/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/physics/components/WaveInterference")]: () =>
    import(
      "../site/physics/components/WaveInterference/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/quantum/components/HadamardSuperposition")]: () =>
    import(
      "../site/quantum/components/HadamardSuperposition/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/quantum/components/PauliGates")]: () =>
    import(
      "../site/quantum/components/PauliGates/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/quantum/components/QubitBloch")]: () =>
    import(
      "../site/quantum/components/QubitBloch/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/robotics/components/ForwardKinematics")]: () =>
    import(
      "../site/robotics/components/ForwardKinematics/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/robotics/components/OccupancyGrid")]: () =>
    import(
      "../site/robotics/components/OccupancyGrid/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/robotics/components/PIDController")]: () =>
    import(
      "../site/robotics/components/PIDController/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/security/components/CaesarCipher")]: () =>
    import(
      "../site/security/components/CaesarCipher/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/security/components/HashingVisualizer")]: () =>
    import(
      "../site/security/components/HashingVisualizer/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/security/components/RSAEncryption")]: () =>
    import(
      "../site/security/components/RSAEncryption/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/signals/components/DiscreteConvolution")]: () =>
    import(
      "../site/signals/components/DiscreteConvolution/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/signals/components/MovingAverageFilter")]: () =>
    import(
      "../site/signals/components/MovingAverageFilter/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/signals/components/NyquistSampling")]: () =>
    import(
      "../site/signals/components/NyquistSampling/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/statistics/components/BayesTheorem")]: () =>
    import(
      "../site/statistics/components/BayesTheorem/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath(
    "site/statistics/components/CentralLimitTheorem"
  )]: () =>
    import(
      "../site/statistics/components/CentralLimitTheorem/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath(
    "site/statistics/components/ConfidenceIntervals"
  )]: () =>
    import(
      "../site/statistics/components/ConfidenceIntervals/index"
    ) as Promise<SiteModule>,
  [siteModuleImportPath("site/statistics/components/MarkovChains")]: () =>
    import(
      "../site/statistics/components/MarkovChains/index"
    ) as Promise<SiteModule>,
}

export async function loadSiteModule(sitePath: string): Promise<SiteModule> {
  const importPath = siteModuleImportPath(sitePath)
  const loader = siteModules[importPath]
  if (!loader) {
    throw new Error(`Missing site module: ${importPath}`)
  }
  return loader()
}
