import { useCallback } from "react"
import { useUser } from "common/context/UserContext"
import { useVisualizerTopic } from "common/context/VisualizerTopicContext"

export function useMarkComplete(explicitTopicId?: string) {
  const topic = useVisualizerTopic()
  const { markComplete } = useUser()
  const topicId = explicitTopicId ?? topic?.id

  return useCallback(() => {
    if (topicId) {
      markComplete(topicId)
    }
  }, [markComplete, topicId])
}
