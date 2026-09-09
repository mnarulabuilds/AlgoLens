import React, { useEffect, ReactNode } from "react"
import FavoriteButton from "common/components/FavoriteButton"
import useTrackView from "common/hooks/useTrackView"
import { TopicRef } from "common/context/UserContext"
import "./VisualizerPage.css"

type VisualizerPageProps = {
  topic: TopicRef
  pageTitle: string
  children: ReactNode
}

const VisualizerPage = ({ topic, pageTitle, children }: VisualizerPageProps) => {
  useTrackView(topic)

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
      <div className="visualizer-page-content">{children}</div>
    </div>
  )
}

export default VisualizerPage
