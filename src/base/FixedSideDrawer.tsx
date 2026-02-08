import React, { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { pages } from "routing/base/routes"
import useOutsideClick from "common/hooks/useOutsideClick"
import {
  FaCode,
  FaTree,
  FaAtom,
  FaCalculator,
  FaGamepad,
  FaChevronRight,
  FaDesktop,
  FaNetworkWired,
  FaBrain,
  FaShieldAlt,
  FaMicrochip,
} from "react-icons/fa"
import "./SideDrawer.css"

const iconMap = {
  algo: <FaCode />,
  ds: <FaTree />,
  physics: <FaAtom />,
  math: <FaCalculator />,
  games: <FaGamepad />,
  os: <FaDesktop />,
  networking: <FaNetworkWired />,
  ml: <FaBrain />,
  security: <FaShieldAlt />,
  logic: <FaMicrochip />,
}

const cleanLabel = (label) => {
  return label
    .replace(
      /\s+[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}].*$/u,
      ""
    )
    .trim()
}

const SideDrawer = () => {
  const sideDrawerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [openSections, setOpenSections] = useState({})

  // Toggle drawer state
  const toggleDrawer = (e) => {
    if (e) e.stopPropagation()
    setIsOpen(!isOpen)
  }

  // Toggle section expansion
  const toggleSection = (topic, e) => {
    if (e) e.stopPropagation()
    setOpenSections((prevState) => ({
      ...prevState,
      [topic]: !prevState[topic],
    }))
  }

  // Close everything when an item is selected
  const handleItemClick = (category, page) => {
    window.location.hash = `/${category}/${page}`
    setIsOpen(false)
  }

  // Handle outside clicks
  useOutsideClick(sideDrawerRef, () => {
    if (isOpen) setIsOpen(false)
  })

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <div className="side-drawer-container" ref={sideDrawerRef}>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={toggleDrawer}
        title={isOpen ? "Close Menu" : "Open Menu"}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for sleek look and easy closing */}
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar content */}
            <motion.div
              className="side-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="drawer-header">
                <h2>AlgoLens Menu</h2>
                <small>Select a category to explore</small>
              </div>

              <div className="drawer-content">
                {pages.map((section) => (
                  <div key={section.topic} className="drawer-section">
                    <div
                      className={`section-header ${
                        openSections[section.topic] ? "active" : ""
                      }`}
                      onClick={(e) => toggleSection(section.topic, e)}
                    >
                      <div className="section-label">
                        <span className="section-icon">
                          {iconMap[section.topic]}
                        </span>
                        {cleanLabel(section.label)}
                      </div>
                      <motion.span
                        animate={{
                          rotate: openSections[section.topic] ? 90 : 0,
                        }}
                        className="chevron-icon"
                      >
                        <FaChevronRight size={12} />
                      </motion.span>
                    </div>

                    <AnimatePresence>
                      {openSections[section.topic] && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {section.pages.map((subpage) => (
                            <motion.li
                              key={subpage.topic}
                              whileHover={{ x: 5 }}
                            >
                              <div
                                className="route"
                                onClick={() =>
                                  handleItemClick(section.topic, subpage.topic)
                                }
                              >
                                {cleanLabel(subpage.label)}
                              </div>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SideDrawer
