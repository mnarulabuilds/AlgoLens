import { describe, it, expect } from "vitest"
import fs from "fs"
import path from "path"

function luminance(r: number, g: number, b: number): number {
  const channels = [r, g, b].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function contrastRatio(foreground: string, background: string): number {
  const [fr, fg, fb] = parseHex(foreground)
  const [br, bg, bb] = parseHex(background)
  const l1 = luminance(fr, fg, fb)
  const l2 = luminance(br, bg, bb)
  return Math.max(l1, l2) / Math.min(l1, l2)
}

function extractToken(css: string, name: string): string | undefined {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{3,8})`))
  return match?.[1]
}

describe("a11y contrast tokens", () => {
  const tokensPath = path.join(process.cwd(), "src/base/a11y-tokens.css")
  const css = fs.readFileSync(tokensPath, "utf8")

  const darkBlock = css.slice(
    css.indexOf('[data-theme="dark"]'),
    css.indexOf('[data-theme="light"]')
  )
  const lightBlock = css.slice(css.indexOf('[data-theme="light"]'))

  it("meets AA for dark theme text on content background", () => {
    const text = extractToken(darkBlock, "--text-primary")!
    const bg = extractToken(darkBlock, "--content-bg")!
    expect(contrastRatio(text, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it("meets AA for dark theme muted text on content background", () => {
    const text = extractToken(darkBlock, "--text-muted")!
    const bg = extractToken(darkBlock, "--content-bg")!
    expect(contrastRatio(text, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it("meets AA for light theme text on content background", () => {
    const text = extractToken(lightBlock, "--text-primary")!
    const bg = extractToken(lightBlock, "--content-bg")!
    expect(contrastRatio(text, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it("meets AA for light theme accent text on white surfaces", () => {
    const accent = extractToken(lightBlock, "--accent-color")!
    expect(contrastRatio(accent, "#ffffff")).toBeGreaterThanOrEqual(4.5)
  })

  it("meets AA for success button foreground on background", () => {
    const fg = extractToken(lightBlock, "--success-fg")!
    const bg = extractToken(lightBlock, "--success-bg")!
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(4.5)
  })

  it("meets AA for light theme body text on surface background", () => {
    const text = extractToken(lightBlock, "--text-primary")!
    const bg = extractToken(lightBlock, "--surface-bg")!
    expect(contrastRatio(text, bg)).toBeGreaterThanOrEqual(4.5)
  })
})
