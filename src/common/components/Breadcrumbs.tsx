import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaChevronRight, FaHome } from "react-icons/fa"
import { getCategoryLabel } from "common/helpers/categories"
import { getTopicFromRoute } from "routing/base/routes"
import "./Breadcrumbs.module.scss"

function formatSlug(slug: string): string {
  return slug
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const Breadcrumbs = () => {
  const pathname = usePathname() || ""
  const pathnames = pathname.split("/").filter((x) => x)

  if (pathnames.length === 0) return null

  const crumbs: { label: string; to: string; isLast: boolean }[] = []

  if (pathnames[0]) {
    const categoryTopic = pathnames[0]
    crumbs.push({
      label: getCategoryLabel(categoryTopic) ?? formatSlug(categoryTopic),
      to: `/${categoryTopic}`,
      isLast: pathnames.length === 1,
    })
  }

  if (pathnames.length >= 2) {
    const route = `/${pathnames[0]}/${pathnames[1]}`
    const topic = getTopicFromRoute(route)
    crumbs.push({
      label: topic?.label ?? formatSlug(pathnames[1]),
      to: route,
      isLast: true,
    })
  }

  return (
    <div className="breadcrumbs-container">
      <nav className="breadcrumbs" aria-label="breadcrumb">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link home" title="Home">
              <FaHome />
              <span className="visually-hidden">Home</span>
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.to} className="breadcrumb-item">
              <span className="separator" aria-hidden="true">
                <FaChevronRight />
              </span>
              {crumb.isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.to} className="breadcrumb-link">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Breadcrumbs
