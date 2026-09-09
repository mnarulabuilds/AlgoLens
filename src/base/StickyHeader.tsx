import React, { lazy } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { siteSuggestions } from "routing/base/routes"
import { DynamicLoader } from "routing/base/Router"
import { useUser } from "common/context/UserContext"
import { AiFillHome } from "react-icons/ai"
import { FaUser, FaStar, FaMoon, FaSun } from "react-icons/fa"
import { useTheme } from "common/context/ThemeContext"
import "./Header.css"

const Search = lazy(() => import(`common/components/SearchSuggestions`))
const FixedSideDrawer = lazy(() => import(`base/FixedSideDrawer`))

export default function PrimarySearchAppBar() {
  const { favorites } = useUser()
  const { theme, toggleTheme } = useTheme()
  const history = useHistory()
  const location = useLocation()
  const isHome = location.pathname === "/"

  return (
    <header className="app-bar">
      <nav className="toolbar">
        <section className="menu-sec">{DynamicLoader(FixedSideDrawer)}</section>

        <section className="search-sec">
          {DynamicLoader(Search, {
            id: "sitemapSuggestions",
            searchOps: siteSuggestions,
            updateSelection: (selection: { route: string }) => {
              history.push(selection.route)
            },
          })}
        </section>
        <div className="icon-sec">
          <Link
            aria-label="home page"
            to="/"
            className={`home-button ${isHome ? "disabled" : ""}`}
            title="Home"
            onClick={(e) => {
              if (isHome) e.preventDefault()
            }}
          >
            <AiFillHome />
          </Link>
          <button
            type="button"
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <Link
            aria-label="profile page"
            to="/profile"
            className="profile-button"
            title="My Profile"
          >
            <FaUser />
            {favorites.length > 0 && (
              <span className="favorites-badge">
                <FaStar />
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  )
}
