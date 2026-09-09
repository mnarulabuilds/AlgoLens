import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export function useVisualizerParams(
  defaults: Record<string, string> = {}
): [Record<string, string>, (updates: Record<string, string | null>) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useMemo(() => {
    const merged = { ...defaults }
    searchParams.forEach((value, key) => {
      merged[key] = value
    })
    return merged
  }, [searchParams, defaults])

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") {
              next.delete(key)
            } else {
              next.set(key, value)
            }
          })
          return next
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  return [params, setParams]
}

export function parseIntParam(
  value: string | undefined,
  fallback: number,
  min?: number,
  max?: number
): number {
  const parsed = Number.parseInt(value ?? "", 10)
  if (Number.isNaN(parsed)) return fallback
  if (min !== undefined && parsed < min) return min
  if (max !== undefined && parsed > max) return max
  return parsed
}
