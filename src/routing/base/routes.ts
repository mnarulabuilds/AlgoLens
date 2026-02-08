const pages = [
  {
    topic: "algo",
    label: "Algorithms 🧠",
    pages: [
      {
        topic: "AStarPathfinding",
        label: "A* Pathfinding 🎯",
      },
      {
        topic: "BellmanFord",
        label: "Bellman-Ford Algorithm 🚦",
      },
      {
        topic: "BFSGraph",
        label: "Breadth First Search 🌐",
      },
      {
        topic: "BinarySearch",
        label: "Binary Search 🔍",
      },
      {
        topic: "ClosestPair",
        label: "Closest Pair 🤏",
      },
      {
        topic: "DFSGraph",
        label: "DFS Visualization 🌲",
      },
      {
        topic: "DijkstraGraph",
        label: "Dijkstra's Algorithm 🚦",
      },
      {
        topic: "Exponentiation",
        label: "Exponentiation ⏰",
      },
      {
        topic: "Factorial",
        label: "Factorial ➕",
      },
      {
        topic: "Factorize",
        label: "Factorize ✖️",
      },
      {
        topic: "Fibonacci",
        label: "Fibonacci 🔢",
      },
      {
        topic: "FloodFill",
        label: "Flood Fill 🌊",
      },
      {
        topic: "FloydWarshall",
        label: "Floyd–Warshall Algorithm 🛣️",
      },
      {
        topic: "HuffmanCoding",
        label: "Huffman Coding 🗜️",
      },
      {
        topic: "JumpSearch",
        label: "🏃‍♂️ Jump Search",
      },
      {
        topic: "KnuthShuffle",
        label: "Knuth Shuffle 🃏",
      },
      {
        topic: "KruskalMST",
        label: "Kruskal's MST Algorithm 🪢",
      },
      {
        topic: "NQueens",
        label: "NQueens 👑",
      },
      {
        topic: "Palindrome",
        label: "Palindrome 🔀",
      },
      {
        topic: "Peak",
        label: "Peak ⛰️",
      },
      {
        topic: "PrimsMST",
        label: "Prim's MST 🌳",
      },
      {
        topic: "Primes",
        label: "Prime Check 🔢",
      },
      {
        topic: "Sieve",
        label: "Sieve 🪣",
      },
      {
        topic: "Sorting",
        label: "Sorting 📊",
      },
      {
        topic: "TowerOfHanoi",
        label: "Tower of Hanoi 🗼",
      },
      {
        topic: "TrafficSimulation",
        label: "Traffic Simulation 🚦",
      },
    ],
  },
  {
    topic: "ds",
    label: "Data Structures 🌳",
    pages: [
      {
        topic: "Array",
        label: "Array 📚",
      },
      {
        topic: "BinaryTree",
        label: "Binary Tree 🌳",
      },
      {
        topic: "BPlusTree",
        label: "B+ Tree 🌲➕",
      },
      {
        topic: "BTree",
        label: "B-Tree 🌲",
      },
      {
        topic: "DisjointSetUnion",
        label: "Disjoint Set Union 🔗",
      },
      {
        topic: "LinkedList",
        label: "Linked List 🔗",
      },
      {
        topic: "Lookup",
        label: "Lookup 🔍",
      },
      {
        topic: "Queues",
        label: "Queues 📚",
      },
      {
        topic: "RedBlackTree",
        label: "Red-Black Tree 🔴⚫",
      },
      {
        topic: "Graph",
        label: "Randomized Graph 📈",
      },
      {
        topic: "Heap",
        label: "Heap (Min/Max) 🏔️",
      },
      {
        topic: "Sets",
        label: "Sets 🎰",
      },
      {
        topic: "Stacks",
        label: "Stacks 📚",
      },
      {
        topic: "Trie",
        label: "Trie (Prefix Tree) 🌿",
      },
    ],
  },
  {
    topic: "physics",
    label: "Physics 🌌",
    pages: [
      {
        topic: "CircularMotion",
        label: "Circular Motion and Angular Momentum 🔄",
      },
      {
        topic: "Optics",
        label: "Optics and Light Behavior 🔦",
      },
      {
        topic: "Thermodynamics",
        label: "Ideal Gas Law 🌡️",
      },
      {
        topic: "MagneticField",
        label: "Lorentz Force : Magnetic Field 🧲",
      },
      {
        topic: "SolarSystem",
        label: "Planetary Motion : Solar System 🌍",
      },
      {
        topic: "DoublePendulum",
        label: "Double Pendulum (Chaos) 🪀",
      },
      {
        topic: "WaveInterference",
        label: "Wave Interference Pattern 🌈",
      },
      {
        topic: "Projectile",
        label: "Projectile Motion 💥",
      },
      {
        topic: "RollingMotion",
        label: "Rolling Motion ⚙️",
      },
      {
        topic: "SimpleHarmonicMotion",
        label: "Simple Harmonic Motion 🌊",
      },
      {
        topic: "SimplePendulum",
        label: "Simple Pendulum ⏱️",
      },
      {
        topic: "ElasticCollisions",
        label: "Elastic Collisions 🎱",
      },
      {
        topic: "FluidRipple",
        label: "Fluid Ripple Simulation 🌊",
      },
    ],
  },
  {
    topic: "math",
    label: "Mathematics 🧮",
    pages: [
      {
        topic: "EquationPlotter",
        label: "2-D Equation Plotter 📈",
      },
      {
        topic: "3DEquationPlotter",
        label: "3-D Equation Plotter 📈",
      },
      {
        topic: "MonteCarloPi",
        label: "Monte Carlo π Estimator 🎯",
      },
      {
        topic: "TaylorSeries",
        label: "Taylor Series Explorer ∑",
      },
      {
        topic: "AdvancedCalculator",
        label: "Advanced Calculator 🔬",
      },
      {
        topic: "Calculator",
        label: "Basic Calculator ➕",
      },
      {
        topic: "NumberSystems",
        label: "Number Systems 🔢",
      },
      {
        topic: "PythagorasTheorem",
        label: "Pythagoras Theorem 📐",
      },
      {
        topic: "BezierCurves",
        label: "Bezier Curves ➰",
      },
      {
        topic: "FourierSeries",
        label: "Fourier Series 📉",
      },
      {
        topic: "FractalTrees",
        label: "Fractal Trees 🌳",
      },
    ],
  },
  {
    topic: "games",
    label: "Game Zone 🎮",
    pages: [
      {
        topic: "PrisonerDilemma",
        label: "Prisoner's Dilemma ⚖️",
      },
      {
        topic: "RockPaperScissors",
        label: "Rock Paper Scissors ✂️",
      },
      {
        topic: "TicTacToe",
        label: "Tic Tac Toe ❌⭕",
      },
      {
        topic: "Chess",
        label: "Chess ♔",
      },
      {
        topic: "Sudoku",
        label: "Sudoku Puzzle 🧩",
      },
      {
        topic: "Tetris",
        label: "Tetris Boss Rush 🟥🟦🟩🟨 ",
      },
      {
        topic: "MatchTiles",
        label: "Match Tiles 🧩",
      },
      {
        topic: "Game2048",
        label: "2048 Game 🔢",
      },
      {
        topic: "SnakeGame",
        label: "Snake Game 🐍",
      },
      {
        topic: "Minesweeper",
        label: "Minesweeper 💣",
      },
      {
        topic: "ConnectFour",
        label: "Connect Four 🔴🟡",
      },
      {
        topic: "MemoryCards",
        label: "Memory Cards 🃏",
      },
      {
        topic: "MazeGame",
        label: "Maze Generator & Solver 🌀",
      },
      {
        topic: "LightsOut",
        label: "Lights Out 💡",
      },
      {
        topic: "Puzzle15",
        label: "15-Puzzle Slider 🧩",
      },
    ],
  },
  {
    topic: "os",
    label: "Operating Systems 💻",
    pages: [
      {
        topic: "CPUScheduling",
        label: "CPU Scheduling ⏱️",
      },
      {
        topic: "PageReplacement",
        label: "Page Replacement Algorithms 📁",
      },
      {
        topic: "DiskScheduling",
        label: "Disk Scheduling Algorithms 💿",
      },
      {
        topic: "BankersAlgorithm",
        label: "Banker's Algorithm 🏦",
      },
      {
        topic: "DiningPhilosophers",
        label: "Dining Philosophers 🍝",
      },
      {
        topic: "MemoryAllocation",
        label: "Memory Allocation 🧠",
      },
    ],
  },
  {
    topic: "networking",
    label: "Computer Networking 🌐",
    pages: [
      {
        topic: "OSIModel",
        label: "OSI Model Explorer  camadas",
      },
      {
        topic: "TCPHandshake",
        label: "TCP 3-Way Handshake 🤝",
      },
      {
        topic: "DNSLookup",
        label: "DNS Lookup Visualization 🔍",
      },
      {
        topic: "IPv4Subnetting",
        label: "IPv4 Subnetting 🔢",
      },
    ],
  },
  {
    topic: "ml",
    label: "Machine Learning 🤖",
    pages: [
      {
        topic: "LinearRegression",
        label: "Linear Regression 📈",
      },
      {
        topic: "KMeansClustering",
        label: "K-Means Clustering 🎯",
      },
      {
        topic: "NeuralNetwork",
        label: "Neural Network 🧠",
      },
      {
        topic: "GradientDescent",
        label: "Gradient Descent 📉",
      },
      {
        topic: "KNearestNeighbors",
        label: "K-Nearest Neighbors 🎯",
      },
    ],
  },
  {
    topic: "security",
    label: "Cyber Security 🛡️",
    pages: [
      {
        topic: "CaesarCipher",
        label: "Caesar Cipher 🔓",
      },
      {
        topic: "RSAEncryption",
        label: "RSA Encryption 🔐",
      },
      {
        topic: "HashingVisualizer",
        label: "Hashing Visualizer 🔑",
      },
    ],
  },
  {
    topic: "logic",
    label: "Digital Logic 🔌",
    pages: [
      {
        topic: "LogicGates",
        label: "Basic Logic Gates ⚡",
      },
      {
        topic: "SRLatch",
        label: "SR Latch (Memory) 💾",
      },
      {
        topic: "Multiplexer",
        label: "Multiplexer (MUX) 🔀",
      },
      {
        topic: "SevenSegment",
        label: "7-Segment Display 🔟",
      },
      {
        topic: "BinaryAdder",
        label: "Full Adder Circuit ➕",
      },
    ],
  },
]

const dynamicRoute = (categoryTopic, subjectTopic) => {
  return `${categoryTopic}/${subjectTopic}`
}

const dynamicPath = (categoryTopic, subjectTopic) => {
  return `site/${categoryTopic}/components/${subjectTopic}`
}

const siteSuggestions = []

pages.forEach((category) => {
  category.pages.forEach((subject) => {
    const path = `${dynamicPath(category.topic, subject.topic)}`
    const route = `/${dynamicRoute(category.topic, subject.topic)}`
    const title = `${category.label} : ${subject.label}`
    siteSuggestions.push({
      route,
      title,
      path,
    })
  })
})

export { siteSuggestions, pages }
