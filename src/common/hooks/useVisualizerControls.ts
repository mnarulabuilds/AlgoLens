import { useState, useCallback, useRef } from "react"

export default function useVisualizerControls(initialSpeed = 50) {
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [speed, setSpeed] = useState(initialSpeed)
    const [highlightedLine, setHighlightedLine] = useState(-1)
    const stopRef = useRef(false)
    const stepResolverRef = useRef<(() => void) | null>(null)

    const start = useCallback(() => {
        setIsRunning(true)
        setIsPaused(false)
        stopRef.current = false
    }, [])

    const stop = useCallback(() => {
        stopRef.current = true
        setIsRunning(false)
        setIsPaused(false)
        setHighlightedLine(-1)
        if (stepResolverRef.current) {
            stepResolverRef.current()
            stepResolverRef.current = null
        }
    }, [])

    const pause = useCallback(() => {
        setIsPaused(true)
    }, [])

    const resume = useCallback(() => {
        setIsPaused(false)
        if (stepResolverRef.current) {
            stepResolverRef.current()
            stepResolverRef.current = null
        }
    }, [])

    const step = useCallback(() => {
        if (stepResolverRef.current) {
            stepResolverRef.current()
            stepResolverRef.current = null
        }
    }, [])

    const wait = useCallback(
        async (msOverride?: number) => {
            if (stopRef.current) throw new Error("ALGORITHM_STOPPED")

            const ms = msOverride !== undefined ? msOverride : (101 - speed) * 5

            if (isPaused) {
                await new Promise<void>((resolve) => {
                    stepResolverRef.current = resolve
                })
            } else {
                await new Promise((resolve) => setTimeout(resolve, ms))
                if (isPaused) {
                    await new Promise<void>((resolve) => {
                        stepResolverRef.current = resolve
                    })
                }
            }

            if (stopRef.current) {
                throw new Error("ALGORITHM_STOPPED")
            }
        },
        [speed, isPaused]
    )

    return {
        isRunning,
        setIsRunning,
        isPaused,
        setIsPaused,
        speed,
        setSpeed,
        highlightedLine,
        setHighlightedLine,
        stopRef,
        start,
        stop,
        pause,
        resume,
        step,
        wait,
    }
}
