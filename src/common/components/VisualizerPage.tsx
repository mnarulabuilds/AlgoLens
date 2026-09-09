import React, { useEffect, ReactNode } from "react"
import FavoriteButton from "common/components/FavoriteButton"
import LearnPanel from "common/components/LearnPanel"
import useTrackView from "common/hooks/useTrackView"
import { TopicRef } from "common/context/UserContext"
import { getLearnContent } from "routing/base/learnContent"
import "./VisualizerPage.css"

type VisualizerPageProps = {
  topic: TopicRef
  pageTitle: string
  children: ReactNode
  showLearnPanel?: boolean
}

const VisualizerPage = ({
  topic,
  pageTitle,
  children,
  showLearnPanel = true,
}: VisualizerPageProps) => {
  useTrackView(topic)
  const learnContent = getLearnContent(topic.id)

  useEffect(() => {
    document.title = `${pageTitle} | AlgoLens`
    return () => {
      document.title = "AlgoLens"
    }
  }, [pageTitle])

  return (
    <div className="visualizer-page">
      <div className="visualizer-page-header">
        <h1 className="visualizer-page-title">{pageTitle}</h1>
        <FavoriteButton topic={topic} />
      </div>
      {showLearnPanel && <LearnPanel content={learnContent} />}
      <div className="visualizer-page-content">{children}</div>
    </div>
  )
}

export default VisualizerPage
