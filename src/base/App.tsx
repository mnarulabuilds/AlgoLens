import React, { lazy } from "react"
import { HashRouter as Router } from "react-router-dom"
import SiteFooter from "./StickyFooter"
import SiteHeader from "./StickyHeader"
import RouteSection, { DynamicLoader } from "routing/base/Router"
import { UserProvider } from "common/context/UserContext"
import { ThemeProvider } from "common/context/ThemeContext"
import "./App.css"
import "./mobile.css"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorBoundary from "common/components/ErrorBoundary"

const Breadcrumbs = lazy(() => import(`common/components/Breadcrumbs`))

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="App">
              <a className="skip-link" href="#main-content">
                Skip to main content
              </a>
              <SiteHeader />
              <div style={{ marginTop: 70 }}>
                {DynamicLoader(Breadcrumbs)}
                <RouteSection />
              </div>
              <SiteFooter />
            </div>
          </Router>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
