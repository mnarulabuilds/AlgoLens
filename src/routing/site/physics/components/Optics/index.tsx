import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import {
  createId,
  traceBeam,
  traceRay,
  LightSource,
  SceneElement,
  MirrorElement,
  LensElement,
} from "./opticsPhysics"
import "./Optics.css"

type PresetKey = "mirror" | "lens" | "combined" | "blank"

type Preset = {
  label: string
  source: LightSource
  elements: SceneElement[]
}

const RAY_COLORS = ["#ff8a80", "#ffd54f", "#80cbc4"]

const PRESETS: Record<PresetKey, Preset> = {
  mirror: {
    label: "Plane mirror",
    source: { x: 90, y: 210, angleDeg: 12 },
    elements: [
      {
        id: "mirror-1",
        type: "mirror",
        x: 420,
        y: 110,
        height: 200,
      },
    ],
  },
  lens: {
    label: "Glass lens",
    source: { x: 90, y: 210, angleDeg: 0 },
    elements: [
      {
        id: "lens-1",
        type: "lens",
        x: 420,
        y: 90,
        height: 240,
      },
    ],
  },
  combined: {
    label: "Mirror + lens",
    source: { x: 80, y: 210, angleDeg: 8 },
    elements: [
      {
        id: "mirror-1",
        type: "mirror",
        x: 300,
        y: 130,
        height: 160,
      },
      {
        id: "lens-1",
        type: "lens",
        x: 520,
        y: 90,
        height: 240,
      },
    ],
  },
  blank: {
    label: "Blank bench",
    source: { x: 100, y: 210, angleDeg: 5 },
    elements: [],
  },
}

type DragTarget =
  | { kind: "source" }
  | { kind: "element"; id: string }
  | null

function scalePreset(
  preset: Preset,
  width: number,
  height: number
): { source: LightSource; elements: SceneElement[] } {
  const sx = width / 640
  const sy = height / 420

  return {
    source: {
      x: preset.source.x * sx,
      y: preset.source.y * sy,
      angleDeg: preset.source.angleDeg,
    },
    elements: preset.elements.map((element) => ({
      ...element,
      id: createId(element.type),
      x: element.x * sx,
      y: element.y * sy,
      height: element.height * sy,
    })),
  }
}

const OpticsSimulation = () => {
  const stageRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ width: 640, height: 420 })
  const [source, setSource] = useState<LightSource>(PRESETS.mirror.source)
  const [elements, setElements] = useState<SceneElement[]>(PRESETS.mirror.elements)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activePreset, setActivePreset] = useState<PresetKey>("mirror")
  const [showBeam, setShowBeam] = useState(true)
  const dragRef = useRef<DragTarget>(null)
  const markComplete = useMarkComplete()

  useEffect(() => {
    const node = stageRef.current?.parentElement
    if (!node) return

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect
      setSize({
        width: Math.max(320, width),
        height: Math.max(320, Math.min(520, width * 0.62)),
      })
    })

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const bounds = useMemo(() => size, [size])

  const rayPaths = useMemo(() => {
    if (!showBeam) {
      return [traceRay(source, elements, bounds)]
    }
    return traceBeam(source, elements, bounds, 8)
  }, [source, elements, bounds, showBeam])

  const applyPreset = useCallback(
    (key: PresetKey) => {
      const scaled = scalePreset(PRESETS[key], size.width, size.height)
      setSource(scaled.source)
      setElements(scaled.elements)
      setSelectedId(null)
      setActivePreset(key)
      markComplete()
    },
    [size.width, size.height, markComplete]
  )

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = stageRef.current
    if (!svg) return { x: 0, y: 0 }
    const pt = svg.createSVGPoint()
    pt.x = clientX
    pt.y = clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return { x: 0, y: 0 }
    const local = pt.matrixTransform(ctm.inverse())
    return { x: local.x, y: local.y }
  }, [])

  const handlePointerDown = (
    event: React.PointerEvent,
    target: DragTarget
  ) => {
    event.preventDefault()
    dragRef.current = target
    ;(event.currentTarget as Element).setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent) => {
    const target = dragRef.current
    if (!target) return

    const { x, y } = clientToSvg(event.clientX, event.clientY)

    if (target.kind === "source") {
      setSource((prev) => ({
        ...prev,
        x: Math.max(24, Math.min(size.width - 24, x)),
        y: Math.max(24, Math.min(size.height - 24, y)),
      }))
      return
    }

    setElements((prev) =>
      prev.map((element) => {
        if (element.id !== target.id) return element
        return {
          ...element,
          x: Math.max(40, Math.min(size.width - 40, x)),
          y: Math.max(20, Math.min(size.height - element.height - 20, y)),
        }
      })
    )
  }

  const handlePointerUp = () => {
    dragRef.current = null
  }

  const addMirror = () => {
    const mirror: MirrorElement = {
      id: createId("mirror"),
      type: "mirror",
      x: size.width * 0.55,
      y: size.height * 0.28,
      height: size.height * 0.45,
    }
    setElements((prev) => [...prev, mirror])
    setSelectedId(mirror.id)
    setActivePreset("blank")
  }

  const addLens = () => {
    const lens: LensElement = {
      id: createId("lens"),
      type: "lens",
      x: size.width * 0.55,
      y: size.height * 0.22,
      height: size.height * 0.56,
    }
    setElements((prev) => [...prev, lens])
    setSelectedId(lens.id)
    setActivePreset("blank")
  }

  const removeSelected = () => {
    if (!selectedId) return
    setElements((prev) => prev.filter((element) => element.id !== selectedId))
    setSelectedId(null)
  }

  const resetScene = () => {
    applyPreset(activePreset)
  }

  const arrowEnd = useMemo(() => {
    const rad = (source.angleDeg * Math.PI) / 180
    const len = 36
    return {
      x: source.x + Math.cos(rad) * len,
      y: source.y + Math.sin(rad) * len,
    }
  }, [source])

  return (
    <div className="optics-sim">
      <h2 className="visualization-title">Optics Bench 🔦</h2>

      <div className="optics-toolbar">
        <span className="optics-preset-label">Presets</span>
        <div className="optics-toolbar-group">
          {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
            <button
              key={key}
              type="button"
              className={`optics-btn optics-btn-secondary${
                activePreset === key ? " active" : ""
              }`}
              onClick={() => applyPreset(key)}
            >
              {PRESETS[key].label}
            </button>
          ))}
        </div>

        <div className="optics-toolbar-divider" aria-hidden="true" />

        <div className="optics-toolbar-group">
          <button type="button" className="optics-btn" onClick={addMirror}>
            + Mirror
          </button>
          <button type="button" className="optics-btn" onClick={addLens}>
            + Lens
          </button>
          <button
            type="button"
            className="optics-btn optics-btn-secondary"
            onClick={() => setShowBeam((prev) => !prev)}
          >
            {showBeam ? "Single ray" : "Beam (3 rays)"}
          </button>
          <button
            type="button"
            className="optics-btn optics-btn-danger"
            onClick={removeSelected}
            disabled={!selectedId}
          >
            Remove selected
          </button>
          <button
            type="button"
            className="optics-btn optics-btn-secondary"
            onClick={resetScene}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="optics-stage-wrap">
        <svg
          ref={stageRef}
          className="optics-stage"
          viewBox={`0 0 ${size.width} ${size.height}`}
          role="img"
          aria-label="Optics simulation canvas"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <defs>
            <linearGradient id="mirrorGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#eceff1" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#b0bec5" />
            </linearGradient>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="#ffd54f" />
            </marker>
          </defs>

          <g className="optics-grid">
            {Array.from({ length: Math.ceil(size.width / 40) }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 40}
                y1={0}
                x2={i * 40}
                y2={size.height}
              />
            ))}
            {Array.from({ length: Math.ceil(size.height / 40) }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * 40}
                x2={size.width}
                y2={i * 40}
              />
            ))}
          </g>

          <line
            className="optics-axis"
            x1={0}
            y1={size.height / 2}
            x2={size.width}
            y2={size.height / 2}
          />

          {rayPaths.map((path, index) => (
            <polyline
              key={`ray-${index}`}
              className={`optics-ray${index === 1 ? " optics-ray-center" : ""}`}
              points={path.map((point) => `${point.x},${point.y}`).join(" ")}
              stroke={RAY_COLORS[index] ?? RAY_COLORS[1]}
            />
          ))}

          {elements.map((element) => {
            const selected = selectedId === element.id
            const width = element.type === "lens" ? 14 : 8
            const label = element.type === "mirror" ? "Mirror" : "Lens"

            return (
              <g
                key={element.id}
                className={`optics-element${selected ? " selected" : ""}`}
                onPointerDown={(event) => {
                  setSelectedId(element.id)
                  handlePointerDown(event, { kind: "element", id: element.id })
                }}
              >
                <rect
                  className={`optics-element-body optics-${element.type}-body`}
                  x={element.x - width / 2}
                  y={element.y}
                  width={width}
                  height={element.height}
                  rx={element.type === "lens" ? 6 : 2}
                />
                <text
                  className="optics-element-label"
                  x={element.x + 16}
                  y={element.y + element.height / 2}
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              </g>
            )
          })}

          <g
            className="optics-source"
            onPointerDown={(event) => handlePointerDown(event, { kind: "source" })}
          >
            <circle
              className="optics-source-core"
              cx={source.x}
              cy={source.y}
              r={12}
            />
            <line
              className="optics-source-arrow"
              x1={source.x}
              y1={source.y}
              x2={arrowEnd.x}
              y2={arrowEnd.y}
            />
            <text
              className="optics-element-label"
              x={source.x - 10}
              y={source.y - 20}
            >
              Light
            </text>
          </g>
        </svg>
      </div>

      <div className="optics-controls">
        <div className="optics-control-card">
          <label htmlFor="beam-angle">Beam angle ({source.angleDeg.toFixed(0)}°)</label>
          <input
            id="beam-angle"
            type="range"
            min={-40}
            max={40}
            value={source.angleDeg}
            onChange={(event) =>
              setSource((prev) => ({
                ...prev,
                angleDeg: Number(event.target.value),
              }))
            }
          />
        </div>
        <div className="optics-control-card">
          <p className="optics-hint">
            Drag the yellow light source and optical elements. Mirrors reflect;
            lenses refract using Snell&apos;s law. Select an element and use
            &quot;Remove selected&quot; to delete it.
          </p>
          <div className="optics-legend">
            <span className="optics-legend-item">
              <span
                className="optics-legend-swatch"
                style={{ background: RAY_COLORS[1] }}
              />
              Central ray
            </span>
            <span className="optics-legend-item">
              <span
                className="optics-legend-swatch"
                style={{ background: "#eceff1" }}
              />
              Mirror
            </span>
            <span className="optics-legend-item">
              <span
                className="optics-legend-swatch"
                style={{ background: "rgba(100,181,246,0.5)" }}
              />
              Lens
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpticsSimulation
