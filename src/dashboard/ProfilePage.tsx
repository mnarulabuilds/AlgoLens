import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useUser } from "common/context/UserContext"
import {
  FaStar,
  FaHistory,
  FaEdit,
  FaArrowRight,
  FaTrash,
  FaChartLine,
  FaCalendar,
  FaHeart,
} from "react-icons/fa"
import "./ProfilePage.css"

const ProfilePage = () => {
  const {
    user,
    updateUser,
    favorites,
    removeFavorite,
    recentlyViewed,
    clearRecentlyViewed,
    getStats,
  } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user.name)
  const [activeTab, setActiveTab] = useState("favorites") // favorites, recent, stats

  const stats = getStats()

  const handleSaveName = () => {
    updateUser({ name: editedName })
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 30) return `${diffDays}d ago`
    return formatDate(dateString)
  }

  return (
    <div className="profile-page">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-info">
            {isEditing ? (
              <div className="edit-name-group">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="name-input"
                  placeholder="Enter your name"
                />
                <button onClick={handleSaveName} className="save-btn">
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setEditedName(user.name)
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="name-display">
                <h1>{user.name}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-btn"
                  title="Edit name"
                >
                  <FaEdit />
                </button>
              </div>
            )}
            <p className="join-date">
              <FaCalendar /> Joined {formatDate(user.joinedDate)}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaStar className="stat-icon favorites-icon" />
            <div className="stat-content">
              <h3>{stats.totalFavorites}</h3>
              <p>Favorites</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaHistory className="stat-icon history-icon" />
            <div className="stat-content">
              <h3>{stats.totalViewed}</h3>
              <p>Recently Viewed</p>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaChartLine className="stat-icon progress-icon" />
            <div className="stat-content">
              <h3>{stats.categoriesExplored}</h3>
              <p>Categories Explored</p>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "favorites" ? "active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <FaStar /> Favorites ({favorites.length})
            </button>
            <button
              className={`tab ${activeTab === "recent" ? "active" : ""}`}
              onClick={() => setActiveTab("recent")}
            >
              <FaHistory /> Recent ({recentlyViewed.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "favorites" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {favorites.length === 0 ? (
                <div className="empty-state">
                  <FaHeart className="empty-icon" />
                  <h3>No favorites yet</h3>
                  <p>
                    Start exploring visualizations and click the star button to
                    add them to your favorites!
                  </p>
                  <Link to="/" className="explore-btn">
                    Explore Topics
                  </Link>
                </div>
              ) : (
                <div className="items-grid">
                  {favorites.map((fav) => (
                    <motion.div
                      key={fav.id}
                      className="item-card"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link to={fav.route} className="item-link">
                        <div className="item-header">
                          <span className="item-category">{fav.category}</span>
                          <span className="item-date">
                            {formatDate(fav.addedAt)}
                          </span>
                        </div>
                        <h3 className="item-title">{fav.label}</h3>
                        <div className="item-footer">
                          <span className="view-link">
                            View <FaArrowRight />
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              removeFavorite(fav.id)
                            }}
                            className="remove-btn"
                            title="Remove from favorites"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "recent" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {recentlyViewed.length === 0 ? (
                <div className="empty-state">
                  <FaHistory className="empty-icon" />
                  <h3>No recent activity</h3>
                  <p>Your recently viewed visualizations will appear here.</p>
                  <Link to="/" className="explore-btn">
                    Start Exploring
                  </Link>
                </div>
              ) : (
                <>
                  <div className="clear-history-container">
                    <button
                      onClick={clearRecentlyViewed}
                      className="clear-history-btn"
                    >
                      <FaTrash /> Clear History
                    </button>
                  </div>
                  <div className="items-list">
                    {recentlyViewed.map((item) => (
                      <motion.div
                        key={item.id}
                        className="list-item"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        whileHover={{ x: 5 }}
                      >
                        <Link to={item.route} className="list-item-link">
                          <div className="list-item-content">
                            <span className="list-item-category">
                              {item.category}
                            </span>
                            <h4 className="list-item-title">{item.label}</h4>
                            <span className="list-item-time">
                              {getTimeAgo(item.viewedAt)}
                            </span>
                          </div>
                          <FaArrowRight className="list-item-arrow" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ProfilePage
