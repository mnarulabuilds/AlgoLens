import { useCallback, useEffect, useMemo, useState } from "react"

export function useVisualizerParams(
  defaults: Record<string, string> = {}
): [Record<string, string>, (updates: Record<string, string | null>) => void] {
  const [searchParams, setSearchParams] = useState(
    () =>
      new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search
      )
  )

  useEffect(() => {
    const syncSearchParams = () =>
      setSearchParams(new URLSearchParams(window.location.search))

    window.addEventListener("popstate", syncSearchParams)
    return () => window.removeEventListener("popstate", syncSearchParams)
  }, [])

  const params = useMemo(() => {
    const merged = { ...defaults }
    searchParams.forEach((value, key) => {
      merged[key] = value
    })
    return merged
  }, [searchParams, defaults])

  const setParams = useCallback(
    (updates: Record<string, string | null>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        Object.entries(updates).forEach(([key, value]) => {
          if (value === null || value === "") {
            next.delete(key)
          } else {
            next.set(key, value)
          }
        })

        const query = next.toString()
        const url = `${window.location.pathname}${query ? `?${query}` : ""}${
          window.location.hash
        }`
        window.history.replaceState(window.history.state, "", url)
        return next
      })
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
