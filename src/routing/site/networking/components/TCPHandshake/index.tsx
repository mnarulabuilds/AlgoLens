import React, { useState } from "react"
import "./TCPHandshake.css"

const steps = [
  {
    title: "Step 0: Initial State",
    description:
      "Server is in LISTEN mode, waiting for connections. Client is CLOSED.",
    clientStatus: "CLOSED",
    serverStatus: "LISTEN",
    packet: null,
  },
  {
    title: "Step 1: SYN",
    description:
      "Client chooses an Initial Sequence Number (ISN) and sends a SYN packet to the server.",
    clientStatus: "SYN_SENT",
    serverStatus: "LISTEN",
    packet: { label: "SYN", info: "Seq=100", pos: "client-to-server" },
  },
  {
    title: "Step 2: SYN-ACK",
    description:
      "Server receives SYN, sends back SYN-ACK. It chooses its own ISN and acknowledges client's ISN (seq+1).",
    clientStatus: "SYN_SENT",
    serverStatus: "SYN_RECEIVED",
    packet: {
      label: "SYN-ACK",
      info: "Seq=500, Ack=101",
      pos: "server-to-client",
    },
  },
  {
    title: "Step 3: ACK",
    description:
      "Client receives SYN-ACK, sends back an ACK. The connection is now established on both sides.",
    clientStatus: "ESTABLISHED",
    serverStatus: "ESTABLISHED",
    packet: { label: "ACK", info: "Seq=101, Ack=501", pos: "client-to-server" },
  },
]

const TCPHandshake = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const handleReset = () => {
    setCurrentStep(0)
  }

  const step = steps[currentStep]

  const getPacketStyle = () => {
    if (!step.packet) return { display: "none" }

    if (step.packet.pos === "client-to-server") {
      return {
        left: "250px",
        top: "calc(50% - 30px)",
        transform: "translateX(200px)",
        opacity: 1,
      }
    } else {
      return {
        right: "250px",
        top: "calc(50% - 30px)",
        transform: "translateX(-200px)",
        opacity: 1,
      }
    }
  }

  return (
    <div className="tcp-container container py-4">
      <div className="text-center mb-5">
        <h1>TCP 3-Way Handshake</h1>
        <p className="lead text-muted">
          Visualize how a reliable connection is established between client and
          server.
        </p>
      </div>

      <div className="handshake-stage mb-4 shadow-sm">
        <div className="timeline"></div>

        {/* Client */}
        <div className="entity client">
          <div className="entity-icon">💻</div>
          <h5>Client</h5>
          <div
            className={`entity-status status-${step.clientStatus
              .toLowerCase()
              .replace("_", "-")}`}
          >
            {step.clientStatus}
          </div>
        </div>

        {/* Server */}
        <div className="entity server">
          <div className="entity-icon">🖥️</div>
          <h5>Server</h5>
          <div
            className={`entity-status status-${step.serverStatus
              .toLowerCase()
              .replace("_", "-")}`}
          >
            {step.serverStatus}
          </div>
        </div>

        {/* Packet Animation */}
        {step.packet && (
          <div className="packet" style={getPacketStyle()}>
            <div className="packet-label">{step.packet.label}</div>
            <div className="packet-info">{step.packet.info}</div>
          </div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-header bg-primary text-white">Controls</div>
            <div className="card-body d-flex flex-column gap-2">
              <button className="btn btn-outline-primary" onClick={handleReset}>
                Reset
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Next Step →
              </button>
              <div className="mt-auto">
                <div className="progress" style={{ height: "10px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="handshake-steps">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`card step-card mb-2 shadow-sm ${
                  currentStep === idx ? "active border-primary" : "opacity-75"
                }`}
                onClick={() => setCurrentStep(idx)}
                style={{ cursor: "pointer" }}
              >
                <div className="card-body py-2">
                  <h6 className="m-0 mb-1">{s.title}</h6>
                  <p className="small m-0 text-muted">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TCPHandshake
