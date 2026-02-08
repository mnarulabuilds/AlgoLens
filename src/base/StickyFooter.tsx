import React, { lazy, useState, Suspense } from "react"
import PropTypes from "prop-types"
import constants from "common/helpers/constants"

const LightBox = lazy(() => import("common/components/LightBox"))
const BugReportForm = lazy(() => import("common/components/BugReportForm"))

function ScrollTop(props) {
  const { children, window } = props
  const [trigger, setTrigger] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setTrigger(true)
      } else {
        setTrigger(false)
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
    }
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = () => {
    const anchor = document.querySelector("#back-to-top-anchor")
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: trigger ? "flex" : "none",
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        backgroundColor: "#f50057",
        color: "white",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {children}
    </div>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.node.isRequired,
}

function Copyright({ brandName }) {
  return (
    <div style={{ textAlign: "center", padding: "1rem", color: "white" }}>
      {"Copyright © "}
      <a
        href={`/${brandName}`}
        style={{
          color: "#25d4eb",
          textDecoration: "none",
        }}
      >
        {brandName}
      </a>{" "}
      {new Date().getFullYear()}.
    </div>
  )
}

Copyright.propTypes = {
  brandName: PropTypes.string.isRequired,
}

export default function StickyFooter(props) {
  const [dialogConfig, setDialogConfig] = useState(null)

  const whyWeBuilt = `${constants.BRAND_NAME} is built to provide a platform for visualizing and explaining various data structures and algorithms in the vast field of Computer Science.`

  const openBugReport = () => {
    setDialogConfig({
      title: "Report a Bug",
      open: {
        callback: () => console.log("Bug report opened"),
      },
      close: {
        callback: () => setDialogConfig(null),
      },
      contentJSX: (
        <Suspense fallback={<div>Loading form...</div>}>
          <BugReportForm
            onSubmit={() => {
              // The form handles its own "success" state
              // We'll just close the dialog after a delay
              setTimeout(() => setDialogConfig(null), 2500)
            }}
            onCancel={() => setDialogConfig(null)}
          />
        </Suspense>
      ),
    })
  }

  return (
    <>
      <footer
        style={{
          padding: "2rem 1rem",
          backgroundColor: "#111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Copyright brandName="AlgoLens" />
        <p
          style={{
            fontStyle: "italic",
            fontSize: "1rem",
            textAlign: "center",
            maxWidth: "800px",
            opacity: 0.8,
            marginBottom: "1.5rem",
          }}
        >
          {whyWeBuilt}
        </p>
        <button
          style={{
            backgroundColor: "#162788",
            color: "white",
            border: "none",
            padding: "12px 24px",
            margin: "10px auto",
            cursor: "pointer",
            borderRadius: "50px",
            fontWeight: "600",
            transition: "transform 0.2s, background-color 0.2s",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          onClick={openBugReport}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Report A Bug
        </button>
        <ScrollTop {...props}>
          <span>&uarr;</span>
        </ScrollTop>
      </footer>
      {dialogConfig && (
        <Suspense fallback={null}>
          <LightBox dialogConfig={dialogConfig} />
        </Suspense>
      )}
    </>
  )
}
