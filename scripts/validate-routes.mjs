import { spawnSync } from "child_process"

const result = spawnSync(
  "npx",
  ["vitest", "run", "src/test/validateRoutes.test.ts"],
  { stdio: "inherit", shell: true }
)

process.exit(result.status ?? 1)
