/** Central SEO constants (single source for HTML + runtime meta updates). */
export const SEO = {
  siteName: "AlgoLens",
  siteUrl: "https://mnarulabuilds.github.io/AlgoLens/",
  defaultTitle: "AlgoLens – Interactive CS Visualizations",
  defaultDescription:
    "Explore 100+ interactive visualizers for algorithms, data structures, physics, math, machine learning, games, and more.",
  locale: "en_US",
  twitterCard: "summary_large_image" as const,
  ogImagePath: "/logo512.png",
  themeColorLight: "#3949ab",
  themeColorDark: "#0f172a",
}

export function seoImageUrl(): string {
  if (typeof window !== "undefined") {
    return new URL(SEO.ogImagePath, window.location.origin).href
  }
  return `${SEO.siteUrl.replace(/\/$/, "")}${SEO.ogImagePath}`
}

/** HashRouter canonical: base URL + hash path */
export function buildCanonicalUrl(routePath: string): string {
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`
  const base = SEO.siteUrl.replace(/\/$/, "")
  return `${base}/#${normalized}`
}

export function buildWebSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO.siteName,
    url: SEO.siteUrl,
    description: SEO.defaultDescription,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SEO.siteUrl}#/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function buildWebPageJsonLd(
  title: string,
  description: string,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: SEO.siteName,
      url: SEO.siteUrl,
    },
  }
}
