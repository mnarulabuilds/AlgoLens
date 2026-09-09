import React, {
  Suspense,
  lazy,
  ComponentType,
  ReactNode,
  useEffect,
  useMemo,
} from "react"
import { Route, Switch, useLocation } from "react-router-dom"
import { siteSuggestions, SiteSuggestion } from "./routes"
import VisualizerPage from "common/components/VisualizerPage"

const Dashboard = lazy(() => import("dashboard/index"))
const CategoryPage = lazy(() => import("dashboard/CategoryPage"))
const ProfilePage = lazy(() => import("dashboard/ProfilePage"))
const NotFound = lazy(() => import("./NotFound"))

// Vite needs a statically analyzable glob so every visualizer becomes its own chunk.
const siteModules = import.meta.glob("../site/**/index.tsx")

type AnyComponent = ComponentType<Record<string, unknown>>

type SiteRoute = SiteSuggestion & {
  Component: React.LazyExoticComponent<AnyComponent>
}

const siteRoutes: SiteRoute[] = siteSuggestions.map((site) => {
  const importPath = `../${site.path}/index.tsx`
  const loader = siteModules[importPath]

  if (!loader) {
    console.error(
      `[AlgoLens] Missing module for route ${site.route}: expected ${importPath}`
    )
  }

  const fallbackLoader = () => import("./NotFound")

  return {
    ...site,
    Component: lazy(
      (loader as (() => Promise<{ default: AnyComponent }>) | undefined) ??
        fallbackLoader
    ),
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

function SiteRouteRenderer({
  site,
  Component,
}: {
  site: SiteRoute
  Component: SiteRoute["Component"]
}) {
  const topic = useMemo(
    () => ({
      id: site.topicId,
      label: site.topicLabel,
      category: site.categoryLabel,
      route: site.route,
    }),
    [site.topicId, site.topicLabel, site.categoryLabel, site.route]
  )

  return (
    <VisualizerPage topic={topic} pageTitle={site.title}>
      <LazyRouteContent Component={Component} />
    </VisualizerPage>
  )
}

function RouteSection() {
  const location = useLocation()

  useDocumentTitle(location.pathname)

  return (
    <main className="content">
      <Switch>
        <Route exact path={`/`} render={() => DynamicLoader(Dashboard)} />
        <Route
          exact
          path={`/profile`}
          render={() => DynamicLoader(ProfilePage)}
        />
        <Route
          exact
          path={`/:category`}
          render={() => DynamicLoader(CategoryPage)}
        />
        {siteRoutes.map((site) => (
          <Route
            path={site.route}
            render={() => (
              <SiteRouteRenderer site={site} Component={site.Component} />
            )}
            key={site.path}
          />
        ))}
        <Route path="*" render={() => DynamicLoader(NotFound)} />
      </Switch>
    </main>
  )
}

function useDocumentTitle(pathname: string) {
  useEffect(() => {
    if (pathname === "/") {
      document.title = "AlgoLens – Interactive CS Visualizations"
    } else if (pathname === "/profile") {
      document.title = "My Profile | AlgoLens"
    } else if (!siteRoutes.some((s) => pathname.startsWith(s.route))) {
      document.title = "Page Not Found | AlgoLens"
    }
  }, [pathname])
}

export default function Routes() {
  return <RouteSection />
}
