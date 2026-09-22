import type { ComponentType } from "react"

export const siteModules = import.meta.glob("../site/**/index.tsx")

export type SiteModule = {
  default: ComponentType<Record<string, unknown>>
}

export function siteModuleImportPath(sitePath: string): string {
  return `../${sitePath}/index.tsx`
}

export async function loadSiteModule(sitePath: string): Promise<SiteModule> {
  const importPath = siteModuleImportPath(sitePath)
  const loader = siteModules[importPath] as (() => Promise<SiteModule>) | undefined
  if (!loader) {
    throw new Error(`Missing site module: ${importPath}`)
  }
  return loader()
}
