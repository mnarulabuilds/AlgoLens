import React, { useCallback, useState } from "react"
import { FaLink } from "react-icons/fa"
import { copyToClipboard } from "common/helpers/copyToClipboard"
import "./CopyShareLink.css"

type CopyShareLinkProps = {
  label?: string
}

const CopyShareLink = ({ label = "Copy link to this view" }: CopyShareLinkProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    const ok = await copyToClipboard(window.location.href)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <button
      type="button"
      className="copy-share-link"
      onClick={onCopy}
      aria-label={label}
      title={label}
    >
      <FaLink aria-hidden="true" />
      <span>{copied ? "Copied!" : "Share"}</span>
    </button>
  )
}

export default CopyShareLink
