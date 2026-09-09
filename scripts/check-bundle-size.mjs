import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { gzipSync } from "zlib"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildDir = path.join(__dirname, "..", "build", "assets")

const LIMITS_KB = {
  "vendor-react": 60,
  "vendor-charts": 75,
}

function gzipSizeKb(filePath) {
  const buffer = fs.readFileSync(filePath)
  return gzipSync(buffer).length / 1024
}

if (!fs.existsSync(buildDir)) {
  console.error("Build output not found. Run npm run build first.")
  process.exit(1)
}

const files = fs.readdirSync(buildDir).filter((file) => file.endsWith(".js"))
const violations = []

for (const [prefix, limitKb] of Object.entries(LIMITS_KB)) {
  const match = files.find((file) => file.startsWith(prefix))
  if (!match) continue

  const sizeKb = gzipSizeKb(path.join(buildDir, match))
  if (sizeKb > limitKb) {
    violations.push(`${prefix}: ${sizeKb.toFixed(1)} KB gzip (limit ${limitKb} KB)`)
  } else {
    console.log(`✓ ${prefix}: ${sizeKb.toFixed(1)} KB gzip`)
  }
}

if (violations.length > 0) {
  console.error("Bundle size budget exceeded:")
  violations.forEach((line) => console.error(`  - ${line}`))
  process.exit(1)
}

console.log("Bundle size check passed.")
