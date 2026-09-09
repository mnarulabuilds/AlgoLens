import React, { ReactNode } from "react"
import "./SimWorkbench.css"

type SimWorkbenchProps = {
  title: string
  toolbar?: ReactNode
  controls?: ReactNode
  hint?: string
  children: ReactNode
}

const SimWorkbench = ({
  title,
  toolbar,
  controls,
  hint,
  children,
}: SimWorkbenchProps) => (
  <div className="sim-workbench">
    <h2 className="visualization-title sim-workbench-title">{title}</h2>
    {toolbar && <div className="sim-workbench-toolbar">{toolbar}</div>}
    <div className="sim-workbench-stage">{children}</div>
    {controls && <div className="sim-workbench-controls">{controls}</div>}
    {hint && <p className="sim-workbench-hint">{hint}</p>}
  </div>
)

export default SimWorkbench
