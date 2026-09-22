import React, {
  Suspense,
  lazy,
  ComponentType,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  Route,
  Routes as AppRoutes,
  useLocation,
  useParams,
} from "react-router-dom"
import { siteSuggestions, SiteSuggestion } from "./routes"
import { loadSiteModule, siteModuleImportPath, siteModules } from "./siteModules"
import VisualizerPage from "common/components/VisualizerPage"
import NotFoundPage from "./NotFound"
import { useRouteSeo } from "common/hooks/useRouteSeo"

const Dashboard = lazy(() => import("dashboard/index"))
const CategoryPage = lazy(() => import("dashboard/CategoryPage"))
const ProfilePage = lazy(() => import("dashboard/ProfilePage"))
const NotFound = lazy(() => import("./NotFound"))

type AnyComponent = ComponentType<Record<string, unknown>>

const siteByRoute = new Map<string, SiteSuggestion>(
  siteSuggestions.map((site) => [site.route, site])
)

siteSuggestions.forEach((site) => {
  const importPath = siteModuleImportPath(site.path)
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
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "40vh",
    }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
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

  if (failed) {
    return <NotFoundPage />
  }

  if (!Component) {
    return suspenseFallback
  }

  return <Component />
}

function DynamicSitePage() {
  const { category, topic } = useParams()
  const route =
    category && topic ? `/${category}/${topic}` : ""
  const site = route ? siteByRoute.get(route) : undefined

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

  if (!site || !topicRef) {
    return <LazyRouteContent Component={NotFound} />
  }

  return (
    <VisualizerPage topic={topicRef} pageTitle={site.title}>
      <AsyncSiteModule sitePath={site.path} />
    </VisualizerPage>
  )
}

function RouteSection() {
  const location = useLocation()

  useDocumentTitle(location.pathname)
  useRouteSeo(location.pathname)

  return (
    <main id="main-content" className="content" tabIndex={-1}>
      <AppRoutes>
        <Route path="/" element={<LazyRouteContent Component={Dashboard} />} />
        <Route
          path="/profile"
          element={<LazyRouteContent Component={ProfilePage} />}
        />
        <Route path="/:category/:topic" element={<DynamicSitePage />} />
        <Route
          path="/:category"
          element={<LazyRouteContent Component={CategoryPage} />}
        />
        <Route path="*" element={<LazyRouteContent Component={NotFound} />} />
      </AppRoutes>
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

export default RouteSection
