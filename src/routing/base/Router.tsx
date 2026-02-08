import React, { Suspense, lazy } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import { siteSuggestions } from "./routes"

const Dashboard = lazy(() => import(`dashboard/index`))
const CategoryPage = lazy(() => import(`dashboard/CategoryPage`))
const ProfilePage = lazy(() => import(`dashboard/ProfilePage`))
const NotFound = lazy(() => import(`./NotFound`))

export function DynamicLoader(LazyComponent, props) {
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
      <LazyComponent {...props}>{props?.children}</LazyComponent>
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
        {siteSuggestions.map((site, index) => {
          const { route, path } = site
          const Component = lazy(() => import(`../${path}/index.tsx`))
          return (
            <Route
              path={`${route}`}
              render={() => DynamicLoader(Component)}
              key={`${index}-${path}`}
            />
          )
        })}
        <Route path="*" render={() => DynamicLoader(NotFound)} />
      </Switch>
    </main>
  )
}

export default function Routes() {
  return (
    <Router>
      <RouteSection />
    </Router>
  )
}
