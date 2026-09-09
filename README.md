# AlgoLens

**AlgoLens** is an interactive visualization playground for **Computer Science, Mathematics, Physics, Games, Operating Systems, Networking, Machine Learning, Security, and Digital Logic**. It bridges the gap between abstract theory and intuition by letting you **see** algorithms run, **tweak** parameters, and **experiment** with simulations.

[**Live Demo**](https://mnarulabuilds.github.io/AlgoLens/) | [**Watch Demo Video**](https://youtu.be/ULegeOI0ALE)

## Features

### Algorithms

Pathfinding & graphs (A*, Dijkstra, Bellman-Ford, Floyd-Warshall, BFS, DFS, MST), sorting & searching, math utilities (factorial, Fibonacci, primes, sieve), and classics like N-Queens, Tower of Hanoi, and Huffman coding.

### Data Structures

Arrays, linked lists, stacks, queues, trees (binary, B-tree, B+, red-black, trie), heaps, disjoint set union, hash lookup, and sets.

### Physics & Math

Solar system, pendulums, wave interference, projectile motion, optics, thermodynamics, 2D/3D plotters, Taylor/Fourier series, fractals, and more.

### Game Zone

Chess, Sudoku, Tetris, 2048, Snake, Minesweeper, Connect Four, Breakout, and many puzzles.

### Operating Systems

CPU scheduling, page replacement, disk scheduling, Banker's algorithm, dining philosophers, memory allocation.

### Computer Networking

OSI model, TCP handshake, DNS lookup, IPv4 subnetting.

### Machine Learning

Linear regression, k-means, neural networks, gradient descent, k-NN.

### Cyber Security & Digital Logic

Caesar cipher, RSA, hashing; logic gates, SR latch, MUX, 7-segment display, full adder.

### Platform features

- **Favorites & profile** — star any visualizer; track recently viewed pages
- **Dark / light mode** — toggle in the header (respects system preference by default)
- **Search** — jump to any of 100+ visualizers from the header
- **Bug reports** — optional Web3Forms integration

## Tech stack

- **Frontend**: React 18, TypeScript, Vite 7
- **Styling**: Bootstrap 5, CSS variables, Styled Components
- **Visualization**: Three.js, Chart.js, Math.js, Chess.js
- **Routing**: React Router (HashRouter for GitHub Pages)
- **Testing**: Vitest, Testing Library

## Prerequisites

- **Node.js** 18 or later
- **npm** 9 or later

## Installation & usage

```bash
git clone https://github.com/mnarulabuilds/AlgoLens.git
cd AlgoLens
npm install
npm start          # http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` / `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | ESLint |
| `npm run typecheck:strict` | Strict TypeScript check |
| `npm run check:bundle-size` | Verify production bundle gzip budgets |
| `npm run deploy` | Build for GitHub Pages and publish via `gh-pages` |

## Environment variables

Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_ACCESS_KEY` to enable in-app bug reports. For GitHub Pages deploys, add the same secret in your repository settings (used by the deploy workflow).

## Project structure

```
src/
├── base/           # App shell, header, footer
├── common/         # Shared components, hooks, context
├── dashboard/      # Home, category, and profile pages
└── routing/
    ├── base/       # Router, routes registry
    └── site/       # Visualizer components by category
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests welcome!

## License

[MIT](LICENSE)
