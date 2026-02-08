import React, { lazy } from "react"
import { siteSuggestions } from "routing/base/routes"
import { DynamicLoader } from "routing/base/Router"
import { useUser } from "common/context/UserContext"
import { AiFillHome } from "react-icons/ai"
import { FaUser, FaStar } from "react-icons/fa"
import "./Header.css"

const Search = lazy(() => import(`common/components/SearchSuggestions`))
const FixedSideDrawer = lazy(() => import(`base/FixedSideDrawer`))

export default function PrimarySearchAppBar() {
  const { favorites } = useUser()

  return (
    <header className="app-bar">
      <nav className="toolbar">
        <section className="menu-sec">{DynamicLoader(FixedSideDrawer)}</section>
        <section className="search-sec">
          {DynamicLoader(Search, {
            id: "sitemapSuggestions",
            searchOps: siteSuggestions,
            updateSelection: (selection) => {
              window.location.hash = selection.route
            },
          })}
        </section>
        <div className="icon-sec">
          <a
            aria-label="home page"
            href="#/"
            className={`home-button ${
              window.location.hash === "#/" || window.location.hash === ""
                ? "disabled"
                : ""
            }`}
            title="Home"
          >
            <AiFillHome />
          </a>
          <a
            aria-label="profile page"
            href="#/profile"
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
          </a>
        </div>
      </nav>
    </header>
  )
}
