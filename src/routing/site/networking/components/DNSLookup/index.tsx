import React, { useState } from "react"

const DNSLookup = () => {
  const [query, setQuery] = useState("google.com")
  const [animating, setAnimating] = useState(false)

  const steps = [
    {
      name: "Browser Cache",
      status: "checking",
      desc: "Checking local memory for IP address...",
    },
    {
      name: "OS Cache",
      status: "checking",
      desc: "Checking Operating System hosts file and cache...",
    },
    {
      name: "Recursive Resolver",
      status: "checking",
      desc: "Asking your ISP's DNS resolver (e.g., 8.8.8.8)...",
    },
    {
      name: "Root Name Server",
      status: "checking",
      desc: "Redirecting to .com TLD server...",
    },
    {
      name: "TLD Name Server",
      status: "checking",
      desc: "Redirecting to google.com authoritative server...",
    },
    {
      name: "Authoritative Server",
      status: "checking",
      desc: "Found it! IP is 142.250.190.46",
    },
  ]

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1>DNS Lookup Visualization</h1>
        <p className="lead text-muted">
          Trace the journey of a URL to an IP address.
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">https://</span>
            <input
              type="text"
              className="form-control"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter domain name..."
            />
            <button
              className="btn btn-primary"
              onClick={() => setAnimating(true)}
            >
              Resolve
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {steps.map((step, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div
              className={`card h-100 border-start border-4 ${
                animating ? "border-primary" : "border-light"
              }`}
            >
              <div className="card-body">
                <h6>{step.name}</h6>
                <p className="small text-muted mb-0">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-4">
        <i className="bi bi-info-circle-fill me-2"></i>
        <strong>Note:</strong> This is a conceptual visualization. In reality,
        most queries are cached at the Recursive Resolver level.
      </div>
    </div>
  )
}

export default DNSLookup
