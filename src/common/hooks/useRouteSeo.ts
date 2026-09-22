import { useEffect } from "react"
import { pages, siteSuggestions } from "routing/base/routes"
import { SEO, buildCanonicalUrl } from "common/config/seo"
import { getLearnContent } from "routing/base/learnContent"

function setDocumentMeta(title: string, description: string, path: string) {
  document.title = title

  const setMeta = (key: string, value: string, attr: "name" | "property") => {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement("meta")
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute("content", value)
  }

  const canonical = buildCanonicalUrl(path)
  setMeta("description", description, "name")
  setMeta("og:title", title, "property")
  setMeta("og:description", description, "property")
  setMeta("og:url", canonical, "property")

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement("link")
    link.rel = "canonical"
    document.head.appendChild(link)
  }
  link.href = canonical
}

/** Updates title + description for dashboard routes (home, category, profile, 404). */
export function useRouteSeo(pathname: string) {
  useEffect(() => {
    if (pathname === "/") {
      setDocumentMeta(SEO.defaultTitle, SEO.defaultDescription, "/")
      return
    }

    if (pathname === "/profile") {
      setDocumentMeta(
        "My Profile | AlgoLens",
        "Your favorites, recently viewed visualizers, and learning progress on AlgoLens.",
        "/profile"
      )
      return
    }

    const site = siteSuggestions.find((entry) => entry.route === pathname)
    if (site) {
      const learn = getLearnContent(site.topicId)
      setDocumentMeta(
        `${site.topicLabel} | AlgoLens`,
        learn.summary,
        site.route
      )
      return
    }

    const isCategoryLanding =
      /^\/[^/]+$/.test(pathname) && pathname !== "/profile"
    if (isCategoryLanding) {
      const categoryTopic = pathname.slice(1)
      const category = pages.find((c) => c.topic === categoryTopic)
      if (category) {
        setDocumentMeta(
          `${category.label} | AlgoLens`,
          `Browse ${category.pages.length} interactive ${category.label} visualizations on AlgoLens.`,
          pathname
        )
        return
      }
    }

    setDocumentMeta(
      "Page Not Found | AlgoLens",
      "The page you requested is not available. Explore categories from the AlgoLens home page.",
      pathname
    )
  }, [pathname])
}
