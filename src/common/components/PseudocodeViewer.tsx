import React from "react"
import "./PseudocodeViewer.css"

export type PseudocodeLine = {
  text: string
  indent: number
}

type PseudocodeViewerProps = {
  pseudocode: PseudocodeLine[]
  title?: string
  highlightedLine?: number
}

const PseudocodeViewer = ({
  pseudocode,
  title,
  highlightedLine,
}: PseudocodeViewerProps) => {
  return (
    <div className="pseudocode-viewer">
      <div className="pseudocode-header">
        <h3>{title || "Algorithm Pseudocode"}</h3>
      </div>
      <div className="pseudocode-content">
        <pre className="pseudocode-block">
          {pseudocode.map((line, index) => (
            <div
              key={index}
              className={`pseudocode-line ${
                highlightedLine === index ? "highlighted" : ""
              }`}
            >
              <span className="line-number">{index + 1}</span>
              <code
                className="line-code"
                style={{ paddingLeft: `${line.indent * 20}px` }}
              >
                {line.text}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default PseudocodeViewer
