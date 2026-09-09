import { useEffect } from "react"

type VisualizerKeyboardHandlers = {
  enabled?: boolean
  onPauseResume?: () => void
  onStep?: () => void
  onStop?: () => void
  onReset?: () => void
}

export default function useVisualizerKeyboard({
  enabled = true,
  onPauseResume,
  onStep,
  onStop,
  onReset,
}: VisualizerKeyboardHandlers): void {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return
      }

      switch (event.key) {
        case " ":
          if (onPauseResume) {
            event.preventDefault()
            onPauseResume()
          }
          break
        case "ArrowRight":
          if (onStep) {
            event.preventDefault()
            onStep()
          }
          break
        case "Escape":
          if (onStop) {
            event.preventDefault()
            onStop()
          }
          break
        case "r":
        case "R":
          if (onReset) {
            event.preventDefault()
            onReset()
          }
          break
        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enabled, onPauseResume, onStep, onStop, onReset])
}
