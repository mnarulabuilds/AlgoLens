import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react"
import {
  LocalStorageStore,
  readStoredJson,
  writeStoredJson,
} from "common/storage/localStorageStore"

export interface User {
  name: string
  email: string
  avatar: string
  joinedDate: string
}

export interface Favorite {
  id: string
  label: string
  category: string
  route: string
  addedAt: string
}

export interface RecentlyViewed {
  id: string
  label: string
  category: string
  route: string
  viewedAt: string
}

/** Topic payload used when favoriting or tracking a page view. */
export interface TopicRef {
  id: string
  label: string
  category: string
  route: string
}

interface UserContextType {
  user: User
  updateUser: (userData: Partial<User>) => void
  favorites: Favorite[]
  addFavorite: (topic: TopicRef) => boolean
  removeFavorite: (topicId: string) => void
  isFavorite: (topicId: string) => boolean
  recentlyViewed: RecentlyViewed[]
  addToRecentlyViewed: (topic: TopicRef) => void
  clearRecentlyViewed: () => void
  completedTopics: string[]
  markComplete: (topicId: string) => void
  isComplete: (topicId: string) => boolean
  getStats: () => {
    totalFavorites: number
    totalViewed: number
    categoriesExplored: number
    totalCompleted: number
  }
}

const STORAGE_KEYS = {
  user: "algolens_user",
  favorites: "algolens_favorites",
  recent: "algolens_recent",
  completed: "algolens_completed",
} as const

const userDataStore = new LocalStorageStore()

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    name: "Guest User",
    email: "",
    avatar: "",
    joinedDate: new Date().toISOString(),
  })

  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewed[]>([])
  const [completedTopics, setCompletedTopics] = useState<string[]>([])

  useEffect(() => {
    const savedUser = readStoredJson<User>(userDataStore, STORAGE_KEYS.user)
    const savedFavorites = readStoredJson<Favorite[]>(
      userDataStore,
      STORAGE_KEYS.favorites
    )
    const savedRecent = readStoredJson<RecentlyViewed[]>(
      userDataStore,
      STORAGE_KEYS.recent
    )
    const savedCompleted = readStoredJson<string[]>(
      userDataStore,
      STORAGE_KEYS.completed
    )

    if (savedUser) setUser(savedUser)
    if (savedFavorites) setFavorites(savedFavorites)
    if (savedRecent) setRecentlyViewed(savedRecent)
    if (savedCompleted) setCompletedTopics(savedCompleted)
  }, [])

  useEffect(() => {
    writeStoredJson(userDataStore, STORAGE_KEYS.user, user)
  }, [user])

  useEffect(() => {
    writeStoredJson(userDataStore, STORAGE_KEYS.favorites, favorites)
  }, [favorites])

  useEffect(() => {
    writeStoredJson(userDataStore, STORAGE_KEYS.recent, recentlyViewed)
  }, [recentlyViewed])

  useEffect(() => {
    writeStoredJson(userDataStore, STORAGE_KEYS.completed, completedTopics)
  }, [completedTopics])

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...userData }))
  }, [])

  const addFavorite = useCallback(
    (topic: TopicRef) => {
      if (favorites.some((fav) => fav.id === topic.id)) {
        return false
      }
      setFavorites((prev) => [
        ...prev,
        { ...topic, addedAt: new Date().toISOString() },
      ])
      return true
    },
    [favorites]
  )

  const removeFavorite = useCallback((topicId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== topicId))
  }, [])

  const isFavorite = useCallback(
    (topicId: string) => favorites.some((fav) => fav.id === topicId),
    [favorites]
  )

  const addToRecentlyViewed = useCallback((topic: TopicRef) => {
    setRecentlyViewed((prev) => {
      if (prev[0]?.id === topic.id) {
        return prev
      }
      const filtered = prev.filter((item) => item.id !== topic.id)
      return [
        { ...topic, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, 20)
    })
  }, [])

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([])
  }, [])

  const markComplete = useCallback((topicId: string) => {
    setCompletedTopics((prev) =>
      prev.includes(topicId) ? prev : [...prev, topicId]
    )
  }, [])

  const isComplete = useCallback(
    (topicId: string) => completedTopics.includes(topicId),
    [completedTopics]
  )

  const getStats = useCallback(
    () => ({
      totalFavorites: favorites.length,
      totalViewed: recentlyViewed.length,
      categoriesExplored: new Set(favorites.map((f) => f.category)).size,
      totalCompleted: completedTopics.length,
    }),
    [favorites, recentlyViewed, completedTopics]
  )

  const value: UserContextType = useMemo(
    () => ({
      user,
      updateUser,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      completedTopics,
      markComplete,
      isComplete,
      getStats,
    }),
    [
      user,
      updateUser,
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      completedTopics,
      markComplete,
      isComplete,
      getStats,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
