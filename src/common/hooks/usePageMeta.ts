import { useEffect } from "react"
import {
  SEO,
  buildCanonicalUrl,
  buildWebPageJsonLd,
  seoImageUrl,
} from "common/config/seo"

export type PageMeta = {
  title: string
  description: string
  path?: string
  /** When false, skips WebPage JSON-LD (e.g. during transient titles). */
  structuredData?: boolean
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

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", rel)
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

function upsertJsonLd(id: string, data: Record<string, unknown> | null) {
  const existing = document.getElementById(id)
  if (!data) {
    existing?.remove()
    return
  }
  const script = existing ?? document.createElement("script")
  script.id = id
  script.setAttribute("type", "application/ld+json")
  script.textContent = JSON.stringify(data)
  if (!existing) {
    document.head.appendChild(script)
  }
}

/** Sets document title, social meta, canonical URL, and optional JSON-LD. */
export function usePageMeta({
  title,
  description,
  path,
  structuredData = true,
}: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    upsertMeta("description", description, "name")
    upsertMeta("og:title", title, "property")
    upsertMeta("og:description", description, "property")
    upsertMeta("og:site_name", SEO.siteName, "property")
    upsertMeta("og:locale", SEO.locale, "property")
    upsertMeta("og:type", "website", "property")
    upsertMeta("twitter:card", SEO.twitterCard, "name")
    upsertMeta("twitter:title", title, "name")
    upsertMeta("twitter:description", description, "name")
    upsertMeta("twitter:image", seoImageUrl(), "name")
    upsertMeta("og:image", seoImageUrl(), "property")

    const canonical = path ? buildCanonicalUrl(path) : SEO.siteUrl
    upsertLink("canonical", canonical)
    upsertMeta("og:url", canonical, "property")

    const themeColor =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? SEO.themeColorDark
        : SEO.themeColorLight
    upsertMeta("theme-color", themeColor, "name")

    if (structuredData && path) {
      upsertJsonLd(
        "algolens-page-jsonld",
        buildWebPageJsonLd(title, description, canonical)
      )
    } else {
      upsertJsonLd("algolens-page-jsonld", null)
    }

    return () => {
      document.title = previousTitle
    }
  }, [title, description, path, structuredData])
}
