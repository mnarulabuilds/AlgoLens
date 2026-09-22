import { useEffect } from "react"

export type PageMeta = {
  title: string
  description: string
  path?: string
}

function upsertMeta(property: string, content: string, attr: "name" | "property") {
  let el = document.querySelector(`meta[${attr}="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, property)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

/** Sets document title and Open Graph tags for shareable visualizer pages. */
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title
    upsertMeta("description", description, "name")
    upsertMeta("og:title", title, "property")
    upsertMeta("og:description", description, "property")
    if (path) {
      const url = `${window.location.origin}${window.location.pathname}${path}`
      upsertMeta("og:url", url, "property")
    }
    return () => {
      document.title = previousTitle
    }
  }, [title, description, path])
}
