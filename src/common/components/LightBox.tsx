import React, { useEffect } from "react"
import "./CustomizedDialogs.css"

export default function CustomizedDialogs({ dialogConfig }) {
  useEffect(() => {
    if (dialogConfig && dialogConfig.open && dialogConfig.open.callback) {
      dialogConfig.open.callback()
    }
  }, [dialogConfig])

  const handleClose = () => {
    if (dialogConfig && dialogConfig.close && dialogConfig.close.callback) {
      dialogConfig.close.callback()
    }
  }

  const dialogueJSX = dialogConfig && (
    <div
      className={`dialog-backdrop ${dialogConfig.open ? "open" : ""}`}
      onClick={handleClose}
    >
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h6 className="dialog-title">{dialogConfig.title}</h6>
          {dialogConfig.close && (
            <button
              className="dialog-close-button"
              aria-label="close"
              onClick={handleClose}
            >
              &times;
            </button>
          )}
        </div>
        <div className="dialog-content">{dialogConfig.contentJSX}</div>
        {(dialogConfig.accept || dialogConfig.reject) && (
          <div className="dialog-actions">
            {dialogConfig.accept && (
              <button
                className="dialog-button accept"
                onClick={() => {
                  if (dialogConfig.accept.callback) {
                    dialogConfig.accept.callback(() => {
                      handleClose()
                    })
                  } else {
                    handleClose()
                  }
                }}
              >
                {dialogConfig.accept.text}
              </button>
            )}
            {dialogConfig.reject && (
              <button
                className="dialog-button reject"
                onClick={() => {
                  if (dialogConfig.reject.callback) {
                    dialogConfig.reject.callback(() => {
                      handleClose()
                    })
                  } else {
                    handleClose()
                  }
                }}
              >
                {dialogConfig.reject.text}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  return <>{dialogueJSX}</>
}
