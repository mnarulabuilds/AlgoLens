"use client"

import React, { Suspense, lazy } from "react"
import SiteFooter from "./StickyFooter"
import SiteHeader from "./StickyHeader"
import RouteSection from "routing/base/Router"
import { UserProvider } from "common/context/UserContext"
import { ThemeProvider } from "common/context/ThemeContext"
import ErrorBoundary from "common/components/ErrorBoundary"
import "./App.module.scss"
import "./mobile.module.scss"

const Breadcrumbs = lazy(() => import("common/components/Breadcrumbs"))

export default function App({ pathname }: { pathname: string }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <div className="App">
            <a className="skip-link" href="#main-content">
              Skip to main content
            </a>
            <SiteHeader />
            <div style={{ marginTop: 70 }}>
              <Suspense fallback={null}>
                <Breadcrumbs />
              </Suspense>
              <RouteSection pathname={pathname} />
            </div>
            <SiteFooter />
          </div>
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
