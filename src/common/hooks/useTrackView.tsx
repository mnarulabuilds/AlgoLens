import { useEffect } from "react"
import { useUser, TopicRef } from "common/context/UserContext"

const useTrackView = (topicData: TopicRef | null | undefined): void => {
  const { addToRecentlyViewed } = useUser()

  useEffect(() => {
    if (topicData && topicData.id) {
      addToRecentlyViewed(topicData)
    }
  }, [topicData, addToRecentlyViewed])
}

export default useTrackView
