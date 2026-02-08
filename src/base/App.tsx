import React from "react"
import SiteFooter from "./StickyFooter"
import SiteHeader from "./StickyHeader"
import Router from "routing/base/Router"
import { UserProvider } from "common/context/UserContext"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import ErrorBoundary from "common/components/ErrorBoundary"

const theme = {
  palette: {
    primary: {
      light: "#757ce8",
      main: "#162788",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#0D681C",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
}

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <div
          className="App"
          style={{
            "--primary-light": theme.palette.primary.light,
            "--primary-main": theme.palette.primary.main,
            "--primary-dark": theme.palette.primary.dark,
            "--primary-contrastText": theme.palette.primary.contrastText,
            "--secondary-light": theme.palette.secondary.light,
            "--secondary-main": theme.palette.secondary.main,
            "--secondary-dark": theme.palette.secondary.dark,
            "--secondary-contrastText": theme.palette.secondary.contrastText,
          }}
        >
          <SiteHeader />
          <div
            style={{
              marginTop: 70,
            }}
          >
            <Router />
          </div>
          <SiteFooter />
        </div>
      </UserProvider>
    </ErrorBoundary>
  )
}

export default App
