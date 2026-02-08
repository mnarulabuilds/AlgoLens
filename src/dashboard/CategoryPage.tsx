import React from "react"
import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { pages } from "routing/base/routes"
import {
  FaCode,
  FaTree,
  FaAtom,
  FaCalculator,
  FaGamepad,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaDesktop,
} from "react-icons/fa"
import "./Dashboard.css"

const iconMap = {
  algo: <FaCode />,
  ds: <FaTree />,
  physics: <FaAtom />,
  math: <FaCalculator />,
  games: <FaGamepad />,
  os: <FaDesktop />,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function CategoryPage() {
  const { category: categoryTopic } = useParams()
  const category = pages.find((p) => p.topic === categoryTopic)

  if (!category) {
    return (
      <div className="container text-center mt-5">
        <h2>Category not found</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Go Home
        </Link>
      </div>
    )
  }

  return (
    <div className="dashboard-root">
      <div className="category-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Home
          </Link>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="d-flex align-items-center gap-3 mt-4"
          >
            <div className="category-icon-large">{iconMap[category.topic]}</div>
            <div>
              <h1 className="category-title-main">{category.label}</h1>
              <p className="category-subtitle-main">
                Explore {category.pages.length} interactive visualizations and
                simulations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="features-container mt-5">
        <motion.div
          className="subcategories-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {category.pages.map((page) => (
            <motion.div key={page.topic} variants={itemVariants}>
              <Link
                to={`/${category.topic}/${page.topic}`}
                className="subcategory-card"
              >
                <div className="subcategory-info">
                  <h3 className="subcategory-name">{page.label}</h3>
                  <div className="subcategory-action">
                    Visualize <FaExternalLinkAlt size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
