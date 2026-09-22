import React from "react"

type VisualizerAnnouncerProps = {
  message: string
}

/** Screen-reader live region for algorithm step updates. */
const VisualizerAnnouncer = ({ message }: VisualizerAnnouncerProps) => (
  <div className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
    {message}
  </div>
)

export default VisualizerAnnouncer
