import React, { useEffect, ReactNode } from "react"
import FavoriteButton from "common/components/FavoriteButton"
import LearnPanel from "common/components/LearnPanel"
import useTrackView from "common/hooks/useTrackView"
import { TopicRef } from "common/context/UserContext"
import { VisualizerTopicProvider } from "common/context/VisualizerTopicContext"
import { isGoldVisualizer } from "common/config/goldVisualizers"
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

  const gold = isGoldVisualizer(topic.id)

  return (
    <VisualizerTopicProvider topic={topic}>
      <div className="visualizer-page">
        <div className="visualizer-page-header">
          <div className="visualizer-page-title-wrap">
            <h1 className="visualizer-page-title">{pageTitle}</h1>
            {gold && (
              <span className="visualizer-gold-badge" title="Gold-tier visualizer">
                Gold
              </span>
            )}
          </div>
          <FavoriteButton topic={topic} />
        </div>
        {showLearnPanel && <LearnPanel content={learnContent} />}
        <div className="visualizer-page-content">{children}</div>
      </div>
    </VisualizerTopicProvider>
  )
}

export default VisualizerPage
