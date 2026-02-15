import React from "react"
import { useLocation, Link } from "react-router-dom"
import { FaChevronRight, FaHome } from "react-icons/fa"
import "./Breadcrumbs.css"

const Breadcrumbs = () => {
    const location = useLocation()
    const pathname = location?.pathname || ""
    const pathnames = pathname.split("/").filter((x) => x)

    if (pathnames.length === 0) return null

    // Map of slugs to labels if needed, or just capitalize
    const formatLabel = (slug) => {
        return slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }

    return (
        <div className="breadcrumbs-container">
            <nav className="breadcrumbs" aria-label="breadcrumb">
                <ol className="breadcrumb-list">
                    <li className="breadcrumb-item">
                        <Link to="/" className="breadcrumb-link home" title="Home">
                            <FaHome />
                        </Link>
                    </li>
                    {pathnames.map((value, index) => {
                        const last = index === pathnames.length - 1
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`

                        return (
                            <li key={to} className="breadcrumb-item">
                                <span className="separator">
                                    <FaChevronRight />
                                </span>
                                {last ? (
                                    <span className="breadcrumb-current">{formatLabel(value)}</span>
                                ) : (
                                    <Link to={to} className="breadcrumb-link">
                                        {formatLabel(value)}
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbs
