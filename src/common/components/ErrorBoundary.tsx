import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("🚨 AlgoLens Error Boundary Caught:", error, errorInfo)
  }

  handleReload() {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "24px",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          <h2>⚠️ Something went wrong in the visualizer</h2>
          <p>{this.state.error?.message}</p>

          <button
            onClick={this.handleReload}
            style={{
              marginTop: "10px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              background: "#4CAF50",
              color: "white",
            }}
          >
            Refresh Page 🔄
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
