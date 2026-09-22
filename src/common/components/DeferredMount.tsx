import React, { ReactNode, useEffect, useRef, useState } from "react"

type DeferredMountProps = {
  children: ReactNode
  placeholder?: ReactNode
  rootMargin?: string
}

/** Defers mounting heavy canvases until the stage enters the viewport. */
const DeferredMount = ({
  children,
  placeholder = null,
  rootMargin = "120px",
}: DeferredMountProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return <div ref={ref}>{visible ? children : placeholder}</div>
}

export default DeferredMount
