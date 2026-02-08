import React, { useState } from "react"
import "./RSAEncryption.css"

const RSAEncryption = () => {
  const [p, setP] = useState(61)
  const [q, setQ] = useState(53)
  const [message, setMessage] = useState(42)
  const [step, setStep] = useState(0)

  // Calculations
  const n = p * q
  const phi = (p - 1) * (q - 1)

  // Find e such that 1 < e < phi and gcd(e, phi) = 1
  const findE = (phiVal) => {
    for (let e = 3; e < phiVal; e += 2) {
      if (gcd(e, phiVal) === 1) return e
    }
    return 3
  }

  const gcd = (a, b) => {
    while (b) {
      a %= b
      ;[a, b] = [b, a]
    }
    return a
  }

  const findD = (e, phiVal) => {
    let [a, b, x, y, x1, y1] = [e, phiVal, 1, 0, 0, 1]
    while (b) {
      let q = Math.floor(a / b)
      ;[a, b] = [b, a % b]
      ;[x, x1] = [x1, x - q * x1]
      ;[y, y1] = [y1, y - q * y1]
    }
    return x < 0 ? x + phiVal : x
  }

  const e = findE(phi)
  const d = findD(e, phi)

  // Modular Exponentiation
  const power = (base, exp, mod) => {
    let res = 1n
    base = BigInt(base) % BigInt(mod)
    exp = BigInt(exp)
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % BigInt(mod)
      base = (base * base) % BigInt(mod)
      exp = exp / 2n
    }
    return Number(res)
  }

  const encrypted = power(message, e, n)
  const decrypted = power(encrypted, d, n)

  const steps = [
    {
      title: "Step 1: Choose Two Prime Numbers",
      content: `We choose two distinct prime numbers p and q. For security, these are usually very large.`,
      math: `p = ${p}, q = ${q}`,
      highlight: ["p", "q"],
    },
    {
      title: "Step 2: Calculate n and φ(n)",
      content: `n is the modulus for both the public and private keys. φ(n) is Euler's totient function.`,
      math: `n = p × q = ${n}\nφ(n) = (p-1)(q-1) = ${phi}`,
      highlight: ["n", "phi"],
    },
    {
      title: "Step 3: Choose Public Exponent (e)",
      content: `e must be co-prime to φ(n) and 1 < e < φ(n). The pair (n, e) is the Public Key.`,
      math: `e = ${e}\nPublic Key: (n=${n}, e=${e})`,
      highlight: ["e"],
    },
    {
      title: "Step 4: Calculate Private Key (d)",
      content: `d is the modular multiplicative inverse of e (mod φ(n)). The pair (n, d) is the Private Key.`,
      math: `d = ${d}\nPrivate Key: (n=${n}, d=${d})`,
      highlight: ["d"],
    },
    {
      title: "Step 5: Encryption",
      content: `To encrypt a message m, we calculate c = m^e mod n.`,
      math: `Message (m) = ${message}\nCiphertext (c) = ${message}^${e} mod ${n} = ${encrypted}`,
      highlight: ["message", "encrypted"],
    },
    {
      title: "Step 6: Decryption",
      content: `To decrypt, the receiver uses their private key d: m = c^d mod n.`,
      math: `m = ${encrypted}^${d} mod ${n} = ${decrypted}`,
      highlight: ["decrypted"],
    },
  ]

  return (
    <div className="rsa-container container py-4">
      <div className="text-center mb-5">
        <h1>RSA Encryption 🔐</h1>
        <p className="lead text-muted">
          Asymmetric cryptography algorithm used for secure data transmission.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">Parameters</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Prime p</label>
                <input
                  type="number"
                  className="form-control"
                  value={p}
                  onChange={(e) => setP(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prime q</label>
                <input
                  type="number"
                  className="form-control"
                  value={q}
                  onChange={(e) => setQ(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message (Number &lt; n)</label>
                <input
                  type="number"
                  className="form-control"
                  value={message}
                  onChange={(e) => setMessage(parseInt(e.target.value) || 0)}
                />
              </div>
              <hr />
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setStep(0)}
                >
                  Reset Process
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setStep((s) => Math.min(s + 1, steps.length - 1))
                  }
                  disabled={step === steps.length - 1}
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="rsa-visualizer p-4 bg-white rounded shadow-sm border">
            <div className="step-progress mb-4">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`progress-dot ${i <= step ? "active" : ""}`}
                  onClick={() => setStep(i)}
                ></div>
              ))}
            </div>

            <div className="step-content">
              <h3 className="text-primary mb-3">{steps[step].title}</h3>
              <p className="fs-5">{steps[step].content}</p>
              <pre className="bg-light p-4 rounded math-display">
                {steps[step].math}
              </pre>
            </div>

            <div className="key-display mt-4 row text-center">
              <div className="col-6">
                <div
                  className={`p-3 rounded border ${
                    step >= 2 ? "bg-success text-white" : "bg-light text-muted"
                  }`}
                >
                  <strong>Public Key</strong>
                  <br />
                  {step >= 2 ? `(n: ${n}, e: ${e})` : "???"}
                </div>
              </div>
              <div className="col-6">
                <div
                  className={`p-3 rounded border ${
                    step >= 3 ? "bg-danger text-white" : "bg-light text-muted"
                  }`}
                >
                  <strong>Private Key</strong>
                  <br />
                  {step >= 3 ? `(n: ${n}, d: ${d})` : "???"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSAEncryption
