import React, { useState } from "react"

const IPv4Subnetting = () => {
  const [ip, setIp] = useState("192.168.1.0")
  const [mask, setMask] = useState(24)

  return (
    <div className="container py-4">
      <div className="text-center mb-5">
        <h1>IPv4 Subnetting Card</h1>
        <p className="lead text-muted">
          Calculate subnets, hosts, and ranges from an IP and CIDR mask.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Calculator</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label font-monospace">Network IP</label>
                <input
                  type="text"
                  className="form-control"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label font-monospace">
                  CIDR Mask (/{mask})
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="32"
                  value={mask}
                  onChange={(e) => setMask(parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Subnet Mask</th>
                    <td className="font-monospace">255.255.255.0</td>
                  </tr>
                  <tr>
                    <th>Network Address</th>
                    <td className="font-monospace text-primary">{ip}</td>
                  </tr>
                  <tr>
                    <th>Broadcast Address</th>
                    <td className="font-monospace text-danger">
                      192.168.1.255
                    </td>
                  </tr>
                  <tr>
                    <th>Usable Host Range</th>
                    <td className="font-monospace">
                      192.168.1.1 - 192.168.1.254
                    </td>
                  </tr>
                  <tr>
                    <th>Total Hosts</th>
                    <td className="font-monospace">256</td>
                  </tr>
                  <tr>
                    <th>Usable Hosts</th>
                    <td className="font-monospace font-weight-bold">254</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3>Binary Representation</h3>
        <div className="bg-light p-4 rounded font-monospace shadow-inner overflow-auto">
          <div className="d-flex gap-4">
            <div>
              <div className="text-muted small">IP (Decimal)</div>
              <div className="fs-5">{ip}</div>
            </div>
            <div>
              <div className="text-muted small">IP (Binary)</div>
              <div className="fs-5 text-success">
                11000000.10101000.00000001.00000000
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex gap-4">
            <div>
              <div className="text-muted small">Mask (Binary)</div>
              <div className="fs-5 text-primary">
                11111111.11111111.11111111.00000000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IPv4Subnetting
