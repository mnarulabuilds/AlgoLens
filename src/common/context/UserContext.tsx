import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  name: string
  email: string
  avatar: string
  joinedDate: string
}

interface Favorite {
  id: string
  label: string
  category: string
  route: string
  addedAt: string
}

interface RecentlyViewed {
  id: string
  label: string
  category: string
  route: string
  viewedAt: string
}

interface UserContextType {
  user: User
  updateUser: (userData: Partial<User>) => void
  favorites: Favorite[]
  addFavorite: (topic: any) => boolean
  removeFavorite: (topicId: string) => void
  isFavorite: (topicId: string) => boolean
  recentlyViewed: RecentlyViewed[]
  addToRecentlyViewed: (topic: any) => void
  clearRecentlyViewed: () => void
  getStats: () => { totalFavorites: number; totalViewed: number; categoriesExplored: number }
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: "Guest User",
    email: "",
    avatar: "",
    joinedDate: new Date().toISOString(),
  })

  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([])

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

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }

  const addFavorite = (topic: any) => {
    if (!favorites.find((fav) => fav.id === topic.id)) {
      setFavorites((prev) => [
        ...prev,
        { ...topic, addedAt: new Date().toISOString() },
      ])
      return true
    }
    return false
  }

  const removeFavorite = (topicId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== topicId))
  }

  const isFavorite = (topicId: string) => {
    return favorites.some((fav) => fav.id === topicId)
  }

  const addToRecentlyViewed = (topic: any) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== topic.id)
      const updated = [
        { ...topic, viewedAt: new Date().toISOString() },
        ...filtered,
      ]
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
