import React from "react"
import { Link } from "react-router-dom"
import "./NotFound.css"

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-header">
          <p className="not-found-code">404</p>
          <p className="not-found-message">Oops! Page not found</p>
        </div>
        <div className="not-found-body">
          <p className="not-found-description">
            We&apos;re sorry, but the page you were looking for does not exist.
            It might have been moved or deleted.
          </p>
          <Link to="/" className="not-found-home-link">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
