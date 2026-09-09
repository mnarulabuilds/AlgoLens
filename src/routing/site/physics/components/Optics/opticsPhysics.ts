export type Point = { x: number; y: number }

export type MirrorElement = {
  id: string
  type: "mirror"
  x: number
  y: number
  height: number
}

export type LensElement = {
  id: string
  type: "lens"
  x: number
  y: number
  height: number
}

export type SceneElement = MirrorElement | LensElement

export type LightSource = {
  x: number
  y: number
  angleDeg: number
}

export type Bounds = { width: number; height: number }

const AIR_INDEX = 1
const GLASS_INDEX = 1.5

export function degToDir(angleDeg: number): Point {
  const rad = (angleDeg * Math.PI) / 180
  return { x: Math.cos(rad), y: Math.sin(rad) }
}

export function normalize(v: Point): Point {
  const len = Math.hypot(v.x, v.y)
  if (len === 0) return { x: 1, y: 0 }
  return { x: v.x / len, y: v.y / len }
}

export function dot(a: Point, b: Point): number {
  return a.x * b.x + a.y * b.y
}

export function reflect(dir: Point, normal: Point): Point {
  const n = normalize(normal)
  const d = normalize(dir)
  return normalize({
    x: d.x - 2 * dot(d, n) * n.x,
    y: d.y - 2 * dot(d, n) * n.y,
  })
}

export function intersectVerticalSegment(
  origin: Point,
  dir: Point,
  mx: number,
  y0: number,
  y1: number
): { point: Point; t: number } | null {
  if (Math.abs(dir.x) < 1e-9) return null
  const t = (mx - origin.x) / dir.x
  if (t <= 1e-6) return null
  const y = origin.y + t * dir.y
  const top = Math.min(y0, y1)
  const bottom = Math.max(y0, y1)
  if (y < top || y > bottom) return null
  return { point: { x: mx, y }, t }
}

export function refractAtVertical(
  dir: Point,
  normalX: number,
  n1: number,
  n2: number
): Point | null {
  const n = { x: normalX, y: 0 }
  const d = normalize(dir)
  const cosI = -dot(d, n)
  const eta = n1 / n2
  const k = 1 - eta * eta * (1 - cosI * cosI)
  if (k < 0) return null
  const sqrtK = Math.sqrt(k)
  return normalize({
    x: eta * d.x + (eta * cosI - sqrtK) * n.x,
    y: eta * d.y + (eta * cosI - sqrtK) * n.y,
  })
}

export function distanceToBounds(
  origin: Point,
  dir: Point,
  bounds: Bounds
): number {
  let minT = Infinity
  if (dir.x < -1e-9) minT = Math.min(minT, -origin.x / dir.x)
  if (dir.x > 1e-9) minT = Math.min(minT, (bounds.width - origin.x) / dir.x)
  if (dir.y < -1e-9) minT = Math.min(minT, -origin.y / dir.y)
  if (dir.y > 1e-9) minT = Math.min(minT, (bounds.height - origin.y) / dir.y)
  return minT === Infinity ? 1000 : Math.max(minT, 0)
}

type Hit = {
  t: number
  point: Point
  element: SceneElement
  kind: "mirror" | "lens"
}

function findNearestHit(
  origin: Point,
  dir: Point,
  elements: SceneElement[]
): Hit | null {
  let best: Hit | null = null

  for (const element of elements) {
    const hit = intersectVerticalSegment(
      origin,
      dir,
      element.x,
      element.y,
      element.y + element.height
    )
    if (!hit) continue
    if (!best || hit.t < best.t) {
      best = {
        ...hit,
        element,
        kind: element.type === "mirror" ? "mirror" : "lens",
      }
    }
  }

  return best
}

export function traceRay(
  source: LightSource,
  elements: SceneElement[],
  bounds: Bounds,
  maxSegments = 10
): Point[] {
  const path: Point[] = [{ x: source.x, y: source.y }]
  let origin = { x: source.x, y: source.y }
  let dir = degToDir(source.angleDeg)
  let medium: "air" | "glass" = "air"

  for (let segment = 0; segment < maxSegments; segment += 1) {
    const hit = findNearestHit(origin, dir, elements)
    const boundaryT = distanceToBounds(origin, dir, bounds)

    if (!hit || boundaryT <= hit.t) {
      path.push({
        x: origin.x + dir.x * boundaryT,
        y: origin.y + dir.y * boundaryT,
      })
      break
    }

    path.push(hit.point)
    origin = hit.point

    if (hit.kind === "mirror") {
      const normal = dir.x > 0 ? { x: -1, y: 0 } : { x: 1, y: 0 }
      dir = reflect(dir, normal)
      continue
    }

    const entering = dir.x > 0
    const n1 = medium === "air" ? AIR_INDEX : GLASS_INDEX
    const n2 = medium === "air" ? GLASS_INDEX : AIR_INDEX
    const normalX = entering ? -1 : 1
    const refracted = refractAtVertical(dir, normalX, n1, n2)

    if (!refracted) {
      dir = reflect(dir, { x: normalX, y: 0 })
    } else {
      dir = refracted
      medium = medium === "air" ? "glass" : "air"
    }
  }

  return path
}

export function traceBeam(
  source: LightSource,
  elements: SceneElement[],
  bounds: Bounds,
  spreadDeg = 8
): Point[][] {
  const offsets = [-spreadDeg, 0, spreadDeg]
  return offsets.map((offset) =>
    traceRay({ ...source, angleDeg: source.angleDeg + offset }, elements, bounds)
  )
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
