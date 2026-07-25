import React, { Suspense, lazy, ComponentType, ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import { siteSuggestions, SiteSuggestion } from "./routes"

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

export function DynamicLoader(
  LazyComponent: React.LazyExoticComponent<AnyComponent> | AnyComponent,
  props: DynamicLoaderProps = {}
) {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    >
      <LazyComponent {...props}>{props.children}</LazyComponent>
    </Suspense>
  )
}

function RouteSection() {
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
        {siteRoutes.map(({ route, path, Component }) => (
          <Route
            path={route}
            render={() => DynamicLoader(Component)}
            key={path}
          />
        ))}
        <Route path="*" render={() => DynamicLoader(NotFound)} />
      </Switch>
    </main>
  )
}

export default function Routes() {
  return <RouteSection />
}
