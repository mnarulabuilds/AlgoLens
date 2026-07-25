import React, { useEffect, ReactNode } from "react"
import "./CustomizedDialogs.css"

type DialogAction = {
  text?: string
  callback?: (close?: () => void) => void
}

type DialogOpenConfig = {
  callback?: () => void
}

export type DialogConfig = {
  open?: boolean | DialogOpenConfig
  close?: DialogAction
  title?: string
  contentJSX?: ReactNode
  accept?: DialogAction
  reject?: DialogAction
}

type CustomizedDialogsProps = {
  dialogConfig?: DialogConfig | null
}

export default function CustomizedDialogs({
  dialogConfig,
}: CustomizedDialogsProps) {
  useEffect(() => {
    if (
      dialogConfig &&
      dialogConfig.open &&
      typeof dialogConfig.open === "object" &&
      dialogConfig.open.callback
    ) {
      dialogConfig.open.callback()
    }
  }, [dialogConfig])

  const handleClose = () => {
    if (dialogConfig?.close?.callback) {
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
                  if (dialogConfig.accept?.callback) {
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
                  if (dialogConfig.reject?.callback) {
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
