import { describe, it, expect } from "vitest"
import {
  reflect,
  traceRay,
  intersectVerticalSegment,
  degToDir,
} from "../routing/site/physics/components/Optics/opticsPhysics"

describe("opticsPhysics", () => {
  it("reflects a horizontal ray off a vertical mirror", () => {
    const reflected = reflect({ x: 1, y: 0 }, { x: -1, y: 0 })
    expect(reflected.x).toBeCloseTo(-1, 5)
    expect(reflected.y).toBeCloseTo(0, 5)
  })

  it("finds intersection with a vertical segment", () => {
    const dir = degToDir(10)
    const hit = intersectVerticalSegment({ x: 50, y: 200 }, dir, 300, 100, 300)
    expect(hit).not.toBeNull()
    expect(hit?.point.x).toBeCloseTo(300, 3)
  })

  it("traces a ray that reaches the canvas edge", () => {
    const path = traceRay(
      { x: 50, y: 100, angleDeg: 0 },
      [],
      { width: 600, height: 400 }
    )
    expect(path.length).toBeGreaterThanOrEqual(2)
    expect(path[path.length - 1].x).toBeGreaterThan(path[0].x)
  })

  it("reflects at a mirror in the scene", () => {
    const path = traceRay(
      { x: 50, y: 200, angleDeg: 0 },
      [{ id: "m1", type: "mirror", x: 300, y: 100, height: 200 }],
      { width: 600, height: 400 }
    )
    expect(path.length).toBeGreaterThanOrEqual(3)
  })
})
