import { useEffect } from "react"
import { useUser, TopicRef } from "common/context/UserContext"

const useTrackView = (topicData: TopicRef | null | undefined): void => {
  const { addToRecentlyViewed } = useUser()
  const topicId = topicData?.id

  useEffect(() => {
    if (topicData?.id) {
      addToRecentlyViewed(topicData)
    }
  }, [topicId, addToRecentlyViewed])
}

export default useTrackView
