# AlgoLens

**AlgoLens** is an interactive visualization playground for **Computer Science, Mathematics, Physics, and Games**. It bridges the gap between abstract theory and intuition by letting you **see** algorithms run, **tweak** parameters, and **experiment** with simulations.

[**🚀 Live Demo**](https://mnarulabuilds.github.io/AlgoLens/) | [**🎥 Watch Demo Video**](https://youtu.be/ULegeOI0ALE)

## ✨ Features

### 🧠 Algorithms

- **Pathfinding & Graph**: A\* Pathfinding, Dijkstra, Bellman-Ford, Floyd-Warshall, BFS, DFS, MST (Prim's & Kruskal's), Flood Fill.
- **Sorting & Searching**: Visual Sorting Algorithms, Binary Search, Jump Search.
- **Mathematics**: Factorial, Fibonacci, Prime Factorization, Sieve of Eratosthenes, Exponentiation.
- **Optimization & Others**: N-Queens, Tower of Hanoi, Huffman Coding, Traffic Simulation, Peak Finding, Palindrome Check.

### 🌳 Data Structures

- **Trees**: Binary Tree, B-Tree, B+ Tree, Red-Black Tree, Trie (Prefix Tree), Min/Max Heap.
- **Linear Structures**: Arrays, Linked Lists, Stacks, Queues.
- **Others**: Disjoint Set Union, Hash Lookup, Randomized Graphs, Sets.

### 🌌 Physics & Math

- **Physics**: Solar System Simulation, Double Pendulum (Chaos), Wave Interference, Projectile Motion, Simple Harmonic Motion, Simple Pendulum, Rolling Motion, Circular Motion.
- **Mathematics Utilities**: 2D & 3D Equation Plotters, Advanced Calculator, Number Systems Converter, Pythagoras Theorem Visualizer.

### 🎮 Game Zone

- **Classic Games**: Chess, Sudoku, Tetris, Tic Tac Toe, Rock Paper Scissors.
- **Puzzles**: Prisoner's Dilemma, Match Tiles.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: Bootstrap 5, Styled Components
- **Visualization**: Three.js (`@react-three/fiber`, `@react-three/drei`), Chart.js
- **Logic**: Math.js, Chess.js, Web Workers (`worker-loader`)
- **Routing**: React Router
- **Build tooling**: `react-app-rewired` (CRA overrides)

## ✅ Prerequisites

- **Node.js**: `16.16.0`
- **npm**: `8.11.0`

> These match the versions declared in `package.json` under `engines`.

## 📦 Installation & Usage

1.  **Clone the repository**

    ```bash
    git clone https://github.com/mnarulabuilds/AlgoLens.git
    cd AlgoLens
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm start
    ```

    The application will run at `http://localhost:3000`.

4.  **Build for production**

    ```bash
    npm run build
    ```

## 📜 Scripts

- **`npm start`**: run locally (development)
- **`npm run build`**: production build
- **`npm test`**: run tests (CRA)
- **`npm run serve`**: serve the production build at `http://localhost:3000`
- **`npm run deploy`**: deploy to GitHub Pages (uses `gh-pages`)

## 🧭 Project Structure (high-level)

- `src/routing/`: site routes + feature pages (algorithms, games, physics, etc.)
- `src/base/`: shared layout components
- `src/common/`: shared UI/components
- `public/`: static assets and entry HTML

## 🤝 Contributing

Contributions are always welcome!

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 🧪 Notes / Troubleshooting

- If you see **source-map warnings** from dependencies during development, they are typically safe to ignore and do not affect runtime behavior.

## 📄 License

This project is open source.
