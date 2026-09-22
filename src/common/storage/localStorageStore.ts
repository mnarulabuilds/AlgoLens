/** Repository abstraction over key–value persistence (DIP: context depends on interface). */
export interface KeyValueStore {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export class LocalStorageStore implements KeyValueStore {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

export function readStoredJson<T>(
  store: KeyValueStore,
  key: string
): T | null {
  try {
    const raw = store.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch (error) {
    console.warn(`[AlgoLens] Ignoring corrupt storage key "${key}"`, error)
    try {
      store.removeItem(key)
    } catch {
      // ignore quota / private-mode failures
    }
    return null
  }
}

export function writeStoredJson(
  store: KeyValueStore,
  key: string,
  value: unknown
): void {
  try {
    store.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`[AlgoLens] Failed to persist "${key}"`, error)
  }
}
