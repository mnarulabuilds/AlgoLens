import React, { useState } from "react"
import "./OSIModel.css"

const layers = [
  {
    number: 1,
    name: "Physical",
    pdu: "Bits",
    color: "#6c757d",
    description:
      "Transmits raw bit stream over physical medium (cables, radio waves, light).",
    protocols: [
      "Ethernet (802.3)",
      "WiFi (802.11)",
      "Bluetooth",
      "USB",
      "RJ45",
    ],
    functions: [
      "Bit synchronization",
      "Physical topology",
      "Transmission mode (Half/Full Duplex)",
    ],
  },
  {
    number: 2,
    name: "Data Link",
    pdu: "Frames",
    color: "#17a2b8",
    description:
      "Provides node-to-node data transfer and handles error correction from physical layer.",
    protocols: ["Ethernet", "PPP", "MAC addressing", "LLC", "VLAN (802.1Q)"],
    functions: [
      "Framing",
      "Physical addressing (MAC)",
      "Error detection",
      "Flow control",
    ],
  },
  {
    number: 3,
    name: "Network",
    pdu: "Packets",
    color: "#28a745",
    description:
      "Determines the best physical path for the data using logical addressing (IP).",
    protocols: ["IPv4", "IPv6", "ICMP", "IPsec", "IGMP", "OSPF", "RIP"],
    functions: [
      "Routing",
      "Logical addressing (IP)",
      "Inter-networking",
      "Fragmenting",
    ],
  },
  {
    number: 4,
    name: "Transport",
    pdu: "Segments / Datagrams",
    color: "#ffc107",
    description:
      "Responsible for end-to-end communication, segmentation, and flow control.",
    protocols: ["TCP", "UDP", "SCTP", "DCCP"],
    functions: [
      "Segmentation",
      "Service point addressing (Ports)",
      "Connection control",
      "Error recovery",
    ],
  },
  {
    number: 5,
    name: "Session",
    pdu: "Data",
    color: "#fd7e14",
    description:
      "Manages sessions between applications, including establishment, maintenance, and termination.",
    protocols: ["NetBIOS", "RPC", "PPTP", "SOCKS"],
    functions: [
      "Session establishment",
      "Authentication",
      "Synchronization (Checkpoints)",
      "Dialogue control",
    ],
  },
  {
    number: 6,
    name: "Presentation",
    pdu: "Data",
    color: "#dc3545",
    description:
      "Translates data from application format to network format (and vice versa).",
    protocols: ["SSL / TLS", "MIME", "JPEG", "MPEG", "ASCII", "EBCDIC"],
    functions: [
      "Translation",
      "Encryption / Decryption",
      "Compression / Decompression",
    ],
  },
  {
    number: 7,
    name: "Application",
    pdu: "Data",
    color: "#6f42c1",
    description:
      "Provides network services directly to the end user or application software.",
    protocols: ["HTTP", "HTTPS", "FTP", "DNS", "SMTP", "SSH", "Telnet", "DHCP"],
    functions: [
      "Network virtual terminal",
      "File transfer",
      "Mail services",
      "Directory services",
    ],
  },
]

const OSIModel = () => {
  const [activeLayer, setActiveLayer] = useState(layers[6])

  return (
    <div className="osi-container container py-4">
      <div className="text-center mb-5">
        <h1>OSI Model Explorer</h1>
        <p className="lead text-muted">
          The Open Systems Interconnection model defines 7 layers of networking.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="osi-stack">
            {layers.map((layer) => (
              <div
                key={layer.number}
                className={`osi-layer ${
                  activeLayer.number === layer.number ? "active" : ""
                }`}
                style={{ backgroundColor: layer.color }}
                onClick={() => setActiveLayer(layer)}
              >
                <div className="layer-number">{layer.number}</div>
                <div className="layer-name">{layer.name}</div>
                <div className="layer-pdu">{layer.pdu}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          <div
            className={`layer-details-card card shadow h-100 overflow-hidden`}
          >
            <div
              className="card-header text-white"
              style={{ backgroundColor: activeLayer.color }}
            >
              <h3 className="m-0">
                Layer {activeLayer.number}: {activeLayer.name}
              </h3>
            </div>
            <div className="card-body">
              <section className="mb-4">
                <h5>
                  <i className="bi bi-info-circle me-2"></i>What it does
                </h5>
                <p>{activeLayer.description}</p>
              </section>

              <section className="mb-4">
                <h5>
                  <i className="bi bi-gear-fill me-2"></i>Key Functions
                </h5>
                <ul className="list-group list-group-flush">
                  {activeLayer.functions.map((f, i) => (
                    <li
                      key={i}
                      className="list-group-item bg-transparent px-0 py-1 border-0"
                    >
                      <i className="bi bi-check2-circle text-success me-2"></i>
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mb-4">
                <h5>
                  <i className="bi bi-code-square me-2"></i>Protocols &
                  Standards
                </h5>
                <div className="d-flex flex-wrap mt-2">
                  {activeLayer.protocols.map((p, i) => (
                    <span key={i} className="protocol-tag">
                      {p}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h5>
                  <i className="bi bi-box-seam me-2"></i>Data Unit (PDU)
                </h5>
                <div className="encapsulation-demo mt-2">
                  <p className="small text-muted mb-1">
                    Visual representation of a{" "}
                    <strong>{activeLayer.pdu}</strong> at this layer:
                  </p>
                  <div className="pdu-visual rounded overflow-hidden">
                    <div className="pdu-header" style={{ width: "120px" }}>
                      {activeLayer.name} Hdr
                    </div>
                    <div className="pdu-data bg-light">
                      {activeLayer.number > 1
                        ? "Payload Data (from L" +
                          (activeLayer.number + 1) +
                          ")"
                        : "1011001..."}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="card-footer bg-light text-center py-3">
              <small className="text-muted">
                Click any layer on the left to explore its details
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OSIModel
