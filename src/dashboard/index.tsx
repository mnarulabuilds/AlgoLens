import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import constants from "common/helpers/constants"
import {
  categoryIcons,
  categoryDescriptions,
  getCategoryIcon,
} from "common/helpers/categories"
import { useUser } from "common/context/UserContext"
import { pages, siteSuggestions } from "routing/base/routes"
import { preloadCategory } from "routing/base/preload"
import {
  LEARNING_PATHS,
  getPathProgress,
} from "routing/base/learningPaths"
import { FaArrowRight, FaCheckCircle } from "react-icons/fa"
import "./Dashboard.css"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function Dashboard() {
  const { getStats, completedTopics } = useUser()
  const stats = getStats()
  const totalVisualizers = siteSuggestions.length
  const progressPercent = Math.round(
    (stats.totalCompleted / totalVisualizers) * 100
  )

  return (
    <div className="dashboard-root">
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1
            className="hero-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome to {constants.BRAND_NAME}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            An interactive platform to visualize and master Science, Technology,
            Engineering, and Mathematics and more through immersive
            demonstrations.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/algo/Sorting" className="hero-cta">
              Start Exploring <FaArrowRight style={{ marginLeft: "8px" }} />
            </Link>
          </motion.div>
          {stats.totalCompleted > 0 && (
            <div className="hero-progress" aria-label="Learning progress">
              <FaCheckCircle aria-hidden="true" />
              <span>
                {stats.totalCompleted} of {totalVisualizers} visualizers
                completed ({progressPercent}%)
              </span>
              <div className="hero-progress-bar">
                <div
                  className="hero-progress-fill"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <div className="features-container">
        <section className="learning-paths-section">
          <h2 className="section-heading">Learning Paths</h2>
          <p className="section-subheading">
            Curated sequences to guide you from fundamentals to advanced topics.
          </p>
          <div className="learning-paths-grid">
            {LEARNING_PATHS.map((path) => {
              const progress = getPathProgress(path, completedTopics)
              return (
                <div key={path.id} className="learning-path-card">
                  <div className="learning-path-header">
                    <span className="learning-path-icon" aria-hidden="true">
                      {path.icon}
                    </span>
                    <div>
                      <h3>{path.title}</h3>
                      <p>{path.description}</p>
                    </div>
                  </div>
                  <div className="learning-path-progress">
                    <span>
                      {progress.done}/{progress.total} complete ({progress.percent}
                      %)
                    </span>
                    <div className="hero-progress-bar">
                      <div
                        className="hero-progress-fill"
                        style={{ width: `${progress.percent}%` }}
                      />
                    </div>
                  </div>
                  <ol className="learning-path-steps">
                    {path.steps.map((step) => (
                      <li key={step.topicId}>
                        <Link to={step.route}>{step.label}</Link>
                        {completedTopics.includes(step.topicId) && (
                          <FaCheckCircle className="step-done" aria-label="Completed" />
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )
            })}
          </div>
        </section>

        <h2 className="section-heading">Explore Categories</h2>
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pages.map((category) => (
            <motion.div key={category.topic} variants={itemVariants}>
              <Link
                to={`/${category.topic}`}
                className="feature-card"
                onMouseEnter={() => preloadCategory(category.topic)}
              >
                <div className="feature-icon-wrapper">
                  {categoryIcons[category.topic] ?? getCategoryIcon(category.topic)}
                </div>
                <h3 className="feature-title">{category.label}</h3>
                <p className="feature-desc">
                  {categoryDescriptions[category.topic] ??
                    "Explore these concepts visually."}
                </p>
                <div className="feature-tags">
                  {category.pages.slice(0, 4).map((page) => (
                    <span key={page.topic} className="feature-tag">
                      {page.label.split(" ")[0]}
                    </span>
                  ))}
                  {category.pages.length > 4 && (
                    <span className="feature-tag">
                      +{category.pages.length - 4} more
                    </span>
                  )}
                </div>
                <div className="mt-4 feature-link">
                  Explore <FaArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
