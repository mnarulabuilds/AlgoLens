import React from "react"
import "./PseudocodeViewer.css"

const PseudocodeViewer = ({ pseudocode, title }) => {
  return (
    <div className="pseudocode-viewer">
      <div className="pseudocode-header">
        <h3>{title || "Algorithm Pseudocode"}</h3>
      </div>
      <div className="pseudocode-content">
        <pre className="pseudocode-block">
          {pseudocode.map((line, index) => (
            <div key={index} className="pseudocode-line">
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
