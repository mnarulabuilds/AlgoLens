import { siteSuggestions } from "./routes"
import { siteModuleImportPath, siteModules } from "./siteModules"

export function preloadVisualizer(route: string): void {
  const site = siteSuggestions.find((entry) => entry.route === route)
  if (!site) return

  const importPath = siteModuleImportPath(site.path)
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
