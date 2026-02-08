import React, { useState } from "react"
import "./CaesarCipher.css"

const CaesarCipher = () => {
  const [text, setText] = useState("HELLOWORLD")
  const [shift, setShift] = useState(3)
  const [isEncrypt, setIsEncrypt] = useState(true)

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const processText = (input, s, encrypt) => {
    return input
      .toUpperCase()
      .split("")
      .map((char) => {
        if (!alphabet.includes(char)) return char
        const index = alphabet.indexOf(char)
        let newIndex
        if (encrypt) {
          newIndex = (index + s) % 26
        } else {
          newIndex = (index - s + 26) % 26
        }
        return alphabet[newIndex]
      })
      .join("")
  }

  const result = processText(text, shift, isEncrypt)

  const renderWheel = () => {
    return (
      <div className="cipher-wheels">
        <div className="wheel-outer">
          {alphabet.map((char, i) => (
            <div
              key={`outer-${char}`}
              className="wheel-char"
              style={{ transform: `rotate(${(i * 360) / 26}deg)` }}
            >
              {char}
            </div>
          ))}
        </div>
        <div
          className="wheel-inner"
          style={{ transform: `rotate(${(shift * 360) / 26}deg)` }}
        >
          {alphabet.map((char, i) => (
            <div
              key={`inner-${char}`}
              className="wheel-char"
              style={{ transform: `rotate(${(i * 360) / 26}deg)` }}
            >
              {char}
            </div>
          ))}
        </div>
        <div className="wheel-pointer">▲</div>
      </div>
    )
  }

  return (
    <div className="caesar-container container py-4">
      <div className="text-center mb-5">
        <h1>Caesar Cipher 🔓</h1>
        <p className="lead text-muted">
          One of the simplest and most widely known encryption techniques. It is
          a type of substitution cipher.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        <div className="col-lg-6">
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-primary text-white">Controls</div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                  type="text"
                  className="form-control"
                  value={text}
                  onChange={(e) =>
                    setText(
                      e.target.value.toUpperCase().replace(/[^A-Z ]/g, "")
                    )
                  }
                  placeholder="Enter message (A-Z only)"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Shift (Key): {shift}</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="25"
                  value={shift}
                  onChange={(e) => setShift(parseInt(e.target.value))}
                />
              </div>
              <div className="btn-group w-100" role="group">
                <button
                  type="button"
                  className={`btn ${
                    isEncrypt ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setIsEncrypt(true)}
                >
                  Encrypt
                </button>
                <button
                  type="button"
                  className={`btn ${
                    !isEncrypt ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setIsEncrypt(false)}
                >
                  Decrypt
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">Result</div>
            <div className="card-body">
              <div className="result-box p-3 bg-light rounded text-center mb-0">
                <h2 className="text-primary font-monospace m-0 text-break">
                  {result}
                </h2>
                <small className="text-muted mt-2 d-block">
                  {isEncrypt ? "Encrypted Message" : "Decrypted Message"}
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 d-flex justify-content-center">
          {renderWheel()}
        </div>
      </div>

      <div className="mt-5">
        <h3>How it works</h3>
        <p>
          Each letter in the plaintext is replaced by a letter some fixed number
          of positions down the alphabet. For example, with a shift of 3, A
          would be replaced by D, B would become E, and so on.
        </p>
        <div className="formula bg-light p-3 rounded font-monospace">
          Encryption(x) = (x + n) mod 26 <br />
          Decryption(x) = (x - n) mod 26
        </div>
      </div>
    </div>
  )
}

export default CaesarCipher
