import React, { useState } from "react"
import { FaBook, FaChevronDown, FaChevronUp } from "react-icons/fa"
import { LearnContent } from "routing/base/learnContent"
import "./LearnPanel.css"

type LearnPanelProps = {
  content: LearnContent
}

const LearnPanel = ({ content }: LearnPanelProps) => {
  const [open, setOpen] = useState(false)

  return (
    <section className="learn-panel" aria-label="Learn about this topic">
      <button
        type="button"
        className="learn-panel-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <FaBook aria-hidden="true" />
        <span>Learn</span>
        {open ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
      </button>

      {open && (
        <div className="learn-panel-body">
          <p className="learn-panel-summary">{content.summary}</p>
          {content.complexity && (
            <p className="learn-panel-meta">
              <strong>Complexity:</strong> {content.complexity}
            </p>
          )}
          {content.useCases && content.useCases.length > 0 && (
            <div>
              <strong>Use cases</strong>
              <ul>
                {content.useCases.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {content.relatedLinks && content.relatedLinks.length > 0 && (
            <div className="learn-panel-links">
              {content.relatedLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default LearnPanel
