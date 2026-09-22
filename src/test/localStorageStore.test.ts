import { describe, expect, it, vi } from "vitest"
import {
  LocalStorageStore,
  readStoredJson,
  writeStoredJson,
} from "common/storage/localStorageStore"

describe("localStorageStore", () => {
  it("reads and writes JSON safely", () => {
    const store = new LocalStorageStore()
    writeStoredJson(store, "test-key", { ok: true })
    expect(readStoredJson<{ ok: boolean }>(store, "test-key")).toEqual({ ok: true })
  })

  it("clears corrupt entries", () => {
    const backing = new Map<string, string>()
    const store = {
      getItem: (k: string) => backing.get(k) ?? null,
      setItem: (k: string, v: string) => {
        backing.set(k, v)
      },
      removeItem: (k: string) => {
        backing.delete(k)
      },
    }
    backing.set("bad", "{not-json")
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(readStoredJson(store, "bad")).toBeNull()
    expect(backing.has("bad")).toBe(false)
    warn.mockRestore()
  })
})
