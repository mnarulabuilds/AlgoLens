import { siteSuggestions } from "./routes"

const siteModules = import.meta.glob("../site/**/index.tsx")

export function preloadVisualizer(route: string): void {
  const site = siteSuggestions.find((entry) => entry.route === route)
  if (!site) return

  const importPath = `../${site.path}/index.tsx`
  const loader = siteModules[importPath] as (() => Promise<unknown>) | undefined
  if (loader) {
    void loader()
  }
}

export function preloadCategory(categoryTopic: string): void {
  siteSuggestions
    .filter((entry) => entry.route.startsWith(`/${categoryTopic}/`))
    .slice(0, 3)
    .forEach((entry) => preloadVisualizer(entry.route))
}
