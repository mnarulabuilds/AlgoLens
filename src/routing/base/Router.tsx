"use client"

import React, {
  ComponentType,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
} from "react"
import { siteSuggestions, SiteSuggestion } from "./routes"
import { loadSiteModule, siteModules } from "./siteModules"
import VisualizerPage from "common/components/VisualizerPage"
import NotFoundPage from "./NotFound"
import { useRouteSeo } from "common/hooks/useRouteSeo"

const Dashboard = lazy(() => import("dashboard/index"))
const CategoryPage = lazy(() => import("dashboard/CategoryPage"))
const ProfilePage = lazy(() => import("dashboard/ProfilePage"))

type AnyComponent = ComponentType<Record<string, unknown>>

const siteByRoute = new Map<string, SiteSuggestion>(
  siteSuggestions.map((site) => [site.route, site])
)

siteSuggestions.forEach((site) => {
  const importPath = `../${site.path}/index.tsx`
  if (!siteModules[importPath]) {
    console.error(
      `[AlgoLens] Missing module for route ${site.route}: expected ${importPath}`
    )
  }
})

type DynamicLoaderProps = Record<string, unknown> & {
  children?: ReactNode
}

const suspenseFallback = (
  <div className="route-loading" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
)

function LazyRouteContent({
  Component,
  ...props
}: DynamicLoaderProps & {
  Component: React.LazyExoticComponent<AnyComponent> | AnyComponent
}) {
  return (
    <Suspense fallback={suspenseFallback}>
      <Component {...props}>{props.children}</Component>
    </Suspense>
  )
}

export function DynamicLoader(
  LazyComponent: React.LazyExoticComponent<AnyComponent> | AnyComponent,
  props: DynamicLoaderProps = {}
) {
  return <LazyRouteContent Component={LazyComponent} {...props} />
}

function AsyncSiteModule({ sitePath }: { sitePath: string }) {
  const [Component, setComponent] = useState<AnyComponent | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let mounted = true
    setComponent(null)
    setFailed(false)

    loadSiteModule(sitePath)
      .then((mod) => {
        if (mounted) {
          setComponent(() => mod.default)
        }
      })
      .catch(() => {
        if (mounted) {
          setFailed(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [sitePath])

  if (failed) return <NotFoundPage />
  if (!Component) return suspenseFallback
  return <Component />
}

function DynamicSitePage({ pathname }: { pathname: string }) {
  const site = siteByRoute.get(pathname)
  const topicRef = useMemo(
    () =>
      site
        ? {
            id: site.topicId,
            label: site.topicLabel,
            category: site.categoryLabel,
            route: site.route,
          }
        : null,
    [site]
  )

  if (!site || !topicRef) return <NotFoundPage />

  return (
    <VisualizerPage topic={topicRef} pageTitle={site.title}>
      <Suspense fallback={suspenseFallback}>
        <AsyncSiteModule sitePath={site.path} />
      </Suspense>
    </VisualizerPage>
  )
}

export default function RouteSection({ pathname }: { pathname: string }) {
  const segments = pathname.split("/").filter(Boolean)

  useDocumentTitle(pathname)
  useRouteSeo(pathname)

  let page: ReactNode
  if (pathname === "/") {
    page = <LazyRouteContent Component={Dashboard} />
  } else if (pathname === "/profile") {
    page = <LazyRouteContent Component={ProfilePage} />
  } else if (segments.length === 2) {
    page = <DynamicSitePage pathname={pathname} />
  } else if (segments.length === 1 && segments[0] !== "profile") {
    page = (
      <LazyRouteContent Component={CategoryPage} categoryTopic={segments[0]} />
    )
  } else {
    page = <NotFoundPage />
  }

  return (
    <main id="main-content" className="content" tabIndex={-1}>
      {page}
    </main>
  )
}

function useDocumentTitle(pathname: string) {
  useEffect(() => {
    const isCategoryLanding =
      /^\/[^/]+$/.test(pathname) && pathname !== "/profile"

    if (pathname === "/") {
      document.title = "AlgoLens – Interactive CS Visualizations"
    } else if (pathname === "/profile") {
      document.title = "My Profile | AlgoLens"
    } else if (!siteByRoute.has(pathname) && !isCategoryLanding) {
      document.title = "Page Not Found | AlgoLens"
    }
  }, [pathname])
}
