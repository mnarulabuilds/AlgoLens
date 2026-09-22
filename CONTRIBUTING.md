# Contributing to AlgoLens

Thank you for your interest in contributing!

## Getting started

1. Fork the repository and clone it locally.
2. Install dependencies: `npm install`
3. Start the dev server: `npm start`
4. Create a feature branch: `git checkout -b feature/your-feature`

## Development checks

Before opening a pull request, run:

```bash
npm run lint
npm run test
npm run typecheck:strict
npm run build
```

Pre-commit hooks (via Husky) run ESLint and Prettier on staged files.

## Adding a visualizer

1. Create a component under `src/routing/site/<category>/components/<Name>/index.tsx`.
2. Register the page in `src/routing/base/routes.ts` (or `categories/extendedCategories.ts` for new categories).
3. Run `npm run validate:routes` — every route must resolve to a lazy `index.tsx` module.
4. Favorites, recently viewed, share links, and page titles are applied automatically via `VisualizerPage`.
5. Prefer `SimWorkbench`, `useVisualizerParams` (shareable URL state), and `useMarkComplete` after meaningful interaction.
6. Wrap heavy canvases with `DeferredMount` so WebGL/canvas work starts only when visible.
7. Optionally add pseudocode using `PseudocodeViewer` and step announcements via `VisualizerAnnouncer`.

### Architecture notes

- **Registry pattern**: `buildSiteRegistry()` in `siteRegistry.ts` derives `siteSuggestions` from category metadata.
- **Repository pattern**: user persistence goes through `common/storage/localStorageStore.ts`.
- **SOLID**: keep visualizer UI thin; extract pure logic (e.g. convolutions, pathfinding steps) into testable helpers under `src/common/helpers/`.

## Code style

- Match existing patterns in neighboring files.
- TypeScript is preferred; keep strict-mode files (`src/common`, `src/routing/base`, `src/dashboard`) fully typed.
- Run Prettier before committing (or rely on lint-staged).

## Pull requests

- Keep PRs focused on a single change.
- Fill out the PR template with a test plan.
- Link related issues when applicable.

## Questions

Open a GitHub issue for bugs, feature ideas, or questions.
