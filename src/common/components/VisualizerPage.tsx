import React, { ReactNode } from "react"
import FavoriteButton from "common/components/FavoriteButton"
import CopyShareLink from "common/components/CopyShareLink"
import LearnPanel from "common/components/LearnPanel"
import useTrackView from "common/hooks/useTrackView"
import { usePageMeta } from "common/hooks/usePageMeta"
import { TopicRef } from "common/context/UserContext"
import { VisualizerTopicProvider } from "common/context/VisualizerTopicContext"
import { isGoldVisualizer } from "common/config/goldVisualizers"
import { getLearnContent } from "routing/base/learnContent"
import { siteSuggestions } from "routing/base/routes"
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
  const siteMeta = siteSuggestions.find((s) => s.topicId === topic.id)

  usePageMeta({
    title: `${pageTitle} | AlgoLens`,
    description: learnContent.summary,
    path: topic.route,
  })

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
          <div className="visualizer-page-actions">
            <CopyShareLink />
            <FavoriteButton topic={topic} />
          </div>
        </div>
        {siteMeta && siteMeta.prerequisites.length > 0 && (
          <p className="visualizer-prerequisites">
            Recommended first:{" "}
            {siteMeta.prerequisites.map((id) => id.split("/")[1]).join(", ")}
          </p>
        )}
        {showLearnPanel && <LearnPanel content={learnContent} />}
        <div className="visualizer-page-content">{children}</div>
      </div>
    </VisualizerTopicProvider>
  )
}

export default VisualizerPage
