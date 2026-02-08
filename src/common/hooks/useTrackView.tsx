import { useEffect } from "react"
import { useUser } from "common/context/UserContext"

const useTrackView = (topicData) => {
  const { addToRecentlyViewed } = useUser()

  useEffect(() => {
    if (topicData && topicData.id) {
      addToRecentlyViewed(topicData)
    }
  }, [topicData, addToRecentlyViewed])
}

export default useTrackView
