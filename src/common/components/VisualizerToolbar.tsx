import React, { ReactNode } from "react"
import { FaPlay, FaPause, FaStop } from "react-icons/fa"
import useVisualizerKeyboard from "common/hooks/useVisualizerKeyboard"
import "./VisualizerToolbar.css"

type VisualizerToolbarProps = {
  isRunning: boolean
  isPaused: boolean
  speed: number
  onSpeedChange: (speed: number) => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  onStep?: () => void
  onReset?: () => void
  speedLabel?: string
  speedMin?: number
  speedMax?: number
  showKeyboardHints?: boolean
  leftActions?: ReactNode
  centerActions?: ReactNode
  rightActions?: ReactNode
}

const VisualizerToolbar = ({
  isRunning,
  isPaused,
  speed,
  onSpeedChange,
  onPause,
  onResume,
  onStop,
  onStep,
  onReset,
  speedLabel = "Speed",
  speedMin = 1,
  speedMax = 100,
  showKeyboardHints = true,
  leftActions,
  centerActions,
  rightActions,
}: VisualizerToolbarProps) => {
  useVisualizerKeyboard({
    enabled: isRunning,
    onPauseResume: () => (isPaused ? onResume() : onPause()),
    onStep: isPaused ? onStep : undefined,
    onStop,
    onReset,
  })

  return (
    <div className="visualizer-toolbar card p-3 shadow-sm mb-4">
      <div className="visualizer-toolbar-row">
        {leftActions && (
          <div className="visualizer-toolbar-group">{leftActions}</div>
        )}

        {centerActions && (
          <div className="visualizer-toolbar-group">{centerActions}</div>
        )}

        {isRunning && (
          <div className="visualizer-toolbar-group visualizer-toolbar-playback">
            <button
              type="button"
              className="btn btn-warning btn-sm"
              onClick={isPaused ? onResume : onPause}
              title={isPaused ? "Resume (Space)" : "Pause (Space)"}
              aria-label={isPaused ? "Resume" : "Pause"}
            >
              {isPaused ? <FaPlay /> : <FaPause />}
            </button>
            {isPaused && onStep && (
              <button
                type="button"
                className="btn btn-info btn-sm"
                onClick={onStep}
                title="Next step (→)"
                aria-label="Next step"
              >
                Step
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={onStop}
              title="Stop (Esc)"
              aria-label="Stop"
            >
              <FaStop />
            </button>
          </div>
        )}

        <div className="visualizer-toolbar-group visualizer-toolbar-speed ms-md-auto">
          <label className="small fw-bold d-block" htmlFor="visualizer-speed">
            {speedLabel}: {speed}
          </label>
          <input
            id="visualizer-speed"
            type="range"
            className="form-range"
            min={speedMin}
            max={speedMax}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            aria-valuemin={speedMin}
            aria-valuemax={speedMax}
            aria-valuenow={speed}
          />
        </div>

        {rightActions && (
          <div className="visualizer-toolbar-group">{rightActions}</div>
        )}
      </div>

      {showKeyboardHints && isRunning && (
        <p className="visualizer-keyboard-hints mb-0 mt-2">
          <kbd>Space</kbd> pause/resume · <kbd>→</kbd> step · <kbd>Esc</kbd> stop
          {onReset ? (
            <>
              {" "}
              · <kbd>R</kbd> reset
            </>
          ) : null}
        </p>
      )}
    </div>
  )
}

export default VisualizerToolbar
