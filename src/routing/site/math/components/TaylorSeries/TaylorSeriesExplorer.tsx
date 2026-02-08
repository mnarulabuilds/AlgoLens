import React, { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"

const Layout = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 360px;
    align-items: start;
  }
`

const Card = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  overflow: hidden;
`

const PlotWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  position: relative;
`

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
`

const Controls = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  padding: 14px;
  color: rgba(255, 255, 255, 0.9);
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.35);
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  cursor: pointer;
`

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 12px 0 6px;
`

const Value = styled.span`
  color: rgba(255, 255, 255, 0.65);
  font-variant-numeric: tabular-nums;
`

const Slider = styled.input`
  width: 100%;
`

const Legend = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
`

const Dot = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${(p) => p.color};
  box-shadow: 0 0 12px ${(p) => p.color};
  margin-right: 6px;
`

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

function factorial(n) {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}

function safePow(x, n) {
  // Avoid huge numbers for large x-range
  const v = Math.pow(x, n)
  if (!Number.isFinite(v)) return v > 0 ? Number.MAX_VALUE : -Number.MAX_VALUE
  return v
}

// Derivatives at a for supported functions
function derivativesAt(fnKey, a, maxN) {
  const out = new Array(maxN + 1)
  if (fnKey === "sin") {
    // sin derivatives cycle: sin, cos, -sin, -cos
    for (let n = 0; n <= maxN; n++) {
      const k = n % 4
      if (k === 0) out[n] = Math.sin(a)
      else if (k === 1) out[n] = Math.cos(a)
      else if (k === 2) out[n] = -Math.sin(a)
      else out[n] = -Math.cos(a)
    }
    return out
  }
  if (fnKey === "cos") {
    // cos derivatives cycle: cos, -sin, -cos, sin
    for (let n = 0; n <= maxN; n++) {
      const k = n % 4
      if (k === 0) out[n] = Math.cos(a)
      else if (k === 1) out[n] = -Math.sin(a)
      else if (k === 2) out[n] = -Math.cos(a)
      else out[n] = Math.sin(a)
    }
    return out
  }
  if (fnKey === "exp") {
    const ea = Math.exp(a)
    for (let n = 0; n <= maxN; n++) out[n] = ea
    return out
  }
  if (fnKey === "ln1p") {
    // f(x)=ln(1+x); derivatives: f'(x)=1/(1+x), f''=-1/(1+x)^2, ...
    // f^(n)(x) = (-1)^{n-1} (n-1)! / (1+x)^n  for n>=1
    out[0] = Math.log(1 + a)
    const denom = 1 + a
    for (let n = 1; n <= maxN; n++) {
      out[n] = (Math.pow(-1, n - 1) * factorial(n - 1)) / safePow(denom, n)
    }
    return out
  }
  // default fallback (shouldn't happen)
  for (let n = 0; n <= maxN; n++) out[n] = 0
  return out
}

function f(fnKey, x) {
  if (fnKey === "sin") return Math.sin(x)
  if (fnKey === "cos") return Math.cos(x)
  if (fnKey === "exp") return Math.exp(x)
  if (fnKey === "ln1p") return Math.log(1 + x)
  return x
}

function taylorValue(fnKey, x, a, n, derivs) {
  let sum = 0
  const dx = x - a
  for (let k = 0; k <= n; k++) {
    sum += (derivs[k] * safePow(dx, k)) / factorial(k)
  }
  return sum
}

export default function TaylorSeriesExplorer() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)

  const [fnKey, setFnKey] = useState("sin")
  const [order, setOrder] = useState(5)
  const [center, setCenter] = useState(0)
  const [xRange, setXRange] = useState(8) // shows [-range/2, range/2]
  const [yAuto, setYAuto] = useState(true)

  // Resize canvas
  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ro = new ResizeObserver(() => {
      const rect = wrap.getBoundingClientRect()
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      const ctx = canvas.getContext("2d")
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  const derivs = useMemo(() => derivativesAt(fnKey, center, order), [
    fnKey,
    center,
    order,
  ])

  const samples = useMemo(() => {
    const N = 700
    const half = xRange / 2
    const xMin = -half
    const xMax = half

    // Keep ln(1+x) domain safe
    const safeMin = fnKey === "ln1p" ? Math.max(xMin, -0.99) : xMin
    const safeMax = xMax

    const xs = new Array(N)
    const ys = new Array(N)
    const ts = new Array(N)

    let yMin = Infinity
    let yMax = -Infinity

    for (let i = 0; i < N; i++) {
      const t = i / (N - 1)
      const x = safeMin + (safeMax - safeMin) * t
      const y = f(fnKey, x)
      const p = taylorValue(fnKey, x, center, order, derivs)
      xs[i] = x
      ys[i] = y
      ts[i] = p
      yMin = Math.min(yMin, y, p)
      yMax = Math.max(yMax, y, p)
    }

    // pad for readability
    const pad = (yMax - yMin) * 0.12 || 1
    return {
      xs,
      ys,
      ts,
      xMin: safeMin,
      xMax: safeMax,
      yMin: yMin - pad,
      yMax: yMax + pad,
    }
  }, [derivs, fnKey, order, center, xRange])

  // Draw on param change
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    // background
    const bg = ctx.createLinearGradient(0, 0, 0, h)
    bg.addColorStop(0, "rgba(2,6,23,1)")
    bg.addColorStop(1, "rgba(0,0,0,1)")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, w, h)

    const margin = { l: 44, r: 16, t: 18, b: 36 }
    const pw = w - margin.l - margin.r
    const ph = h - margin.t - margin.b

    const xMin = samples.xMin
    const xMax = samples.xMax

    let yMin = -4
    let yMax = 4
    if (yAuto) {
      yMin = samples.yMin
      yMax = samples.yMax
    }

    const xToPx = (x) => margin.l + ((x - xMin) / (xMax - xMin)) * pw
    const yToPx = (y) => margin.t + (1 - (y - yMin) / (yMax - yMin)) * ph

    // grid
    ctx.save()
    ctx.strokeStyle = "rgba(255,255,255,0.08)"
    ctx.lineWidth = 1
    for (let i = 0; i <= 8; i++) {
      const x = margin.l + (pw * i) / 8
      ctx.beginPath()
      ctx.moveTo(x, margin.t)
      ctx.lineTo(x, margin.t + ph)
      ctx.stroke()
    }
    for (let i = 0; i <= 6; i++) {
      const y = margin.t + (ph * i) / 6
      ctx.beginPath()
      ctx.moveTo(margin.l, y)
      ctx.lineTo(margin.l + pw, y)
      ctx.stroke()
    }
    ctx.restore()

    // axes (if within range)
    ctx.save()
    ctx.strokeStyle = "rgba(255,255,255,0.22)"
    ctx.lineWidth = 1.5
    if (0 >= xMin && 0 <= xMax) {
      const x0 = xToPx(0)
      ctx.beginPath()
      ctx.moveTo(x0, margin.t)
      ctx.lineTo(x0, margin.t + ph)
      ctx.stroke()
    }
    if (0 >= yMin && 0 <= yMax) {
      const y0 = yToPx(0)
      ctx.beginPath()
      ctx.moveTo(margin.l, y0)
      ctx.lineTo(margin.l + pw, y0)
      ctx.stroke()
    }
    ctx.restore()

    // center marker line at x=a
    ctx.save()
    ctx.strokeStyle = "rgba(251,172,97,0.35)"
    ctx.setLineDash([6, 6])
    ctx.lineWidth = 1.5
    if (center >= xMin && center <= xMax) {
      const xa = xToPx(center)
      ctx.beginPath()
      ctx.moveTo(xa, margin.t)
      ctx.lineTo(xa, margin.t + ph)
      ctx.stroke()
    }
    ctx.restore()

    // plot function
    drawCurve(ctx, samples.xs, samples.ys, xToPx, yToPx, {
      color: "rgba(127,231,255,0.95)",
      width: 3,
      glow: "rgba(127,231,255,0.35)",
    })

    // plot taylor polynomial
    drawCurve(ctx, samples.xs, samples.ts, xToPx, yToPx, {
      color: "rgba(251,172,97,0.95)",
      width: 3,
      glow: "rgba(251,172,97,0.35)",
    })

    // labels
    ctx.save()
    ctx.fillStyle = "rgba(255,255,255,0.75)"
    ctx.font =
      "12px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    ctx.fillText(`f(x) vs Taylorₙ(x)`, margin.l, 14)
    ctx.fillText(`n=${order}   a=${center.toFixed(2)}`, margin.l, h - 10)
    ctx.restore()
  }, [samples, order, center, yAuto])

  return (
    <Layout>
      <Card>
        <PlotWrap ref={wrapRef}>
          <Canvas ref={canvasRef} />
        </PlotWrap>
      </Card>

      <Controls>
        <Label>
          Function <Value>{prettyFn(fnKey)}</Value>
        </Label>
        <Select value={fnKey} onChange={(e) => setFnKey(e.target.value)}>
          <option value="sin">sin(x)</option>
          <option value="cos">cos(x)</option>
          <option value="exp">e^x</option>
          <option value="ln1p">ln(1 + x)</option>
        </Select>

        <Label>
          Order n <Value>{order}</Value>
        </Label>
        <Slider
          type="range"
          min="0"
          max="18"
          step="1"
          value={order}
          onChange={(e) => setOrder(parseInt(e.target.value, 10))}
        />

        <Label>
          Center a <Value>{center.toFixed(2)}</Value>
        </Label>
        <Slider
          type="range"
          min={fnKey === "ln1p" ? "-0.9" : "-4"}
          max="4"
          step="0.05"
          value={center}
          onChange={(e) => setCenter(parseFloat(e.target.value))}
        />

        <Label>
          X range <Value>{xRange.toFixed(1)}</Value>
        </Label>
        <Slider
          type="range"
          min="2"
          max="16"
          step="0.5"
          value={xRange}
          onChange={(e) => setXRange(parseFloat(e.target.value))}
        />

        <Label>
          Y scale <Value>{yAuto ? "Auto" : "Fixed"}</Value>
        </Label>
        <Slider
          type="range"
          min="0"
          max="1"
          step="1"
          value={yAuto ? 1 : 0}
          onChange={(e) => setYAuto(e.target.value === "1")}
        />

        <Legend>
          <span>
            <Dot color="rgba(127,231,255,0.95)" />
            f(x)
          </span>
          <span>
            <Dot color="rgba(251,172,97,0.95)" />
            Taylorₙ(x)
          </span>
          <span>
            <Dot color="rgba(251,172,97,0.45)" /> x = a
          </span>
        </Legend>
      </Controls>
    </Layout>
  )
}

function prettyFn(fnKey) {
  if (fnKey === "sin") return "sin(x)"
  if (fnKey === "cos") return "cos(x)"
  if (fnKey === "exp") return "e^x"
  if (fnKey === "ln1p") return "ln(1+x)"
  return fnKey
}

function drawCurve(ctx, xs, ys, xToPx, yToPx, style) {
  ctx.save()
  ctx.lineWidth = style.width
  ctx.strokeStyle = style.color
  ctx.shadowBlur = 10
  ctx.shadowColor = style.glow
  ctx.lineJoin = "round"
  ctx.lineCap = "round"

  ctx.beginPath()
  for (let i = 0; i < xs.length; i++) {
    const x = xToPx(xs[i])
    const y = yToPx(ys[i])
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.restore()
}
