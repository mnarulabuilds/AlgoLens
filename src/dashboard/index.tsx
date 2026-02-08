import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import constants from "common/helpers/constants"
import { pages } from "routing/base/routes"
import {
  FaCode,
  FaTree,
  FaAtom,
  FaCalculator,
  FaGamepad,
  FaArrowRight,
  FaBrain,
  FaLaptop,
  FaNetworkWired,
  FaShieldAlt,
  FaMicrochip,
} from "react-icons/fa"
import "./Dashboard.css"

const iconMap = {
  algo: <FaCode />,
  ds: <FaTree />,
  physics: <FaAtom />,
  math: <FaCalculator />,
  games: <FaGamepad />,
  os: <FaLaptop />,
  networking: <FaNetworkWired />,
  ml: <FaBrain />,
  security: <FaShieldAlt />,
  logic: <FaMicrochip />,
}

const descriptions = {
  algo:
    "Visualize complex algorithms like Pathfinding, Sorting, and Graph traversals to understand their inner workings.",
  ds:
    "Explore fundamental data structures including Trees, Graphs, Linked Lists, and Heaps with interactive demos.",
  physics:
    "Simulate physical phenomena such as Projectile Motion, Solar Systems, and Pendulums in a virtual lab.",
  math:
    "Interactive tools for plotting equations, number systems, and geometric theorems.",
  games:
    "Play and analyze classic games and puzzles backed by Game Theory concepts.",
  os:
    "Understand operating system concepts like CPU Scheduling, Memory Allocation, and process synchronization.",
  networking:
    "Explore network protocols, TCP/IP stack, DNS resolution, and network communication fundamentals.",
  ml:
    "Visualize ML algorithms and neural networks including Linear Regression, K-Means, Neural Networks, and more.",
  security:
    "Explore cybersecurity fundamentals including Encryption, Hashing, and secure communication protocols.",
  logic:
    "Understand the hardware foundations of computing through Logic Gates, Digital Displays, and Arithmetic Circuits.",
}

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
        </div>
      </motion.section>

      <div className="features-container">
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pages.map((category) => (
            <motion.div key={category.topic} variants={itemVariants}>
              <Link to={`/${category.topic}`} className="feature-card">
                <div className="feature-icon-wrapper">
                  {iconMap[category.topic] || <FaCode />}
                </div>
                <h3 className="feature-title">{category.label}</h3>
                <p className="feature-desc">
                  {descriptions[category.topic] ||
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
