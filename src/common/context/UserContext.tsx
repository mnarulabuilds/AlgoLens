import React, { createContext, useContext, useState, useEffect } from "react"

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "",
    avatar: "",
    joinedDate: new Date().toISOString(),
  })

  const [favorites, setFavorites] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("algolens_user")
    const savedFavorites = localStorage.getItem("algolens_favorites")
    const savedRecent = localStorage.getItem("algolens_recent")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
    if (savedRecent) {
      setRecentlyViewed(JSON.parse(savedRecent))
    }
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("algolens_user", JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem("algolens_favorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem("algolens_recent", JSON.stringify(recentlyViewed))
  }, [recentlyViewed])

  const updateUser = (userData) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  const addFavorite = (topic) => {
    if (!favorites.find((fav) => fav.id === topic.id)) {
      setFavorites((prev) => [
        ...prev,
        { ...topic, addedAt: new Date().toISOString() },
      ])
      return true
    }
    return false
  }

  const removeFavorite = (topicId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== topicId))
  }

  const isFavorite = (topicId) => {
    return favorites.some((fav) => fav.id === topicId)
  }

  const addToRecentlyViewed = (topic) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== topic.id)
      // Add to beginning
      const updated = [
        { ...topic, viewedAt: new Date().toISOString() },
        ...filtered,
      ]
      // Keep only last 20
      return updated.slice(0, 20)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  const getStats = () => {
    return {
      totalFavorites: favorites.length,
      totalViewed: recentlyViewed.length,
      categoriesExplored: new Set(favorites.map((f) => f.category)).size,
    }
  }

  const value = {
    user,
    updateUser,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    getStats,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
