import React, { createContext, useContext, ReactNode } from "react"
import { TopicRef } from "common/context/UserContext"

const VisualizerTopicContext = createContext<TopicRef | null>(null)

export function VisualizerTopicProvider({
  topic,
  children,
}: {
  topic: TopicRef
  children: ReactNode
}) {
  return (
    <VisualizerTopicContext.Provider value={topic}>
      {children}
    </VisualizerTopicContext.Provider>
  )
}

export function useVisualizerTopic(): TopicRef | null {
  return useContext(VisualizerTopicContext)
}
