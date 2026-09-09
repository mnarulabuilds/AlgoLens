import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type TokenType =
  | "keyword"
  | "identifier"
  | "number"
  | "operator"
  | "delimiter"
  | "string"

type Token = { type: TokenType; value: string }

const KEYWORDS = new Set(["if", "else", "while", "return", "int", "float", "void"])

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword: "#c792ea",
  identifier: "#82aaff",
  number: "#f78c6c",
  operator: "#89ddff",
  delimiter: "#ffcb6b",
  string: "#c3e88d",
}

function tokenize(source: string): Token[] {
  const tokens: Token[] = []
  let i = 0
  while (i < source.length) {
    const ch = source[i]
    if (/\s/.test(ch)) {
      i++
      continue
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let word = ""
      while (i < source.length && /[a-zA-Z0-9_]/.test(source[i])) {
        word += source[i++]
      }
      tokens.push({
        type: KEYWORDS.has(word) ? "keyword" : "identifier",
        value: word,
      })
      continue
    }
    if (/[0-9]/.test(ch)) {
      let num = ""
      while (i < source.length && /[0-9.]/.test(source[i])) num += source[i++]
      tokens.push({ type: "number", value: num })
      continue
    }
    if (ch === '"' || ch === "'") {
      const quote = ch
      let str = quote
      i++
      while (i < source.length && source[i] !== quote) str += source[i++]
      if (i < source.length) str += source[i++]
      tokens.push({ type: "string", value: str })
      continue
    }
    if ("+-*/=<>!&|".includes(ch)) {
      let op = ch
      if (i + 1 < source.length && "<>=!".includes(ch) && source[i + 1] === "=") {
        op += "="
        i++
      }
      i++
      tokens.push({ type: "operator", value: op })
      continue
    }
    if ("(){}[],;".includes(ch)) {
      tokens.push({ type: "delimiter", value: ch })
      i++
      continue
    }
    i++
  }
  return tokens
}

const Lexer = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({
    code: "int x = 42; if (x > 0) return x;",
  })
  const [tokens, setTokens] = useState<Token[]>([])
  const [source, setSource] = useState(params.code || "int x = 42;")

  const runLexer = () => {
    const result = tokenize(source)
    setTokens(result)
    setParams({ code: source })
    if (result.length > 0) markComplete()
  }

  return (
    <SimWorkbench
      title="Lexer / Tokenizer"
      hint="The lexer scans source code left-to-right and groups characters into typed tokens."
      toolbar={
        <>
          <button type="button" className="sim-btn" onClick={runLexer}>
            Tokenize
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 600 }}>
          Source code
        </label>
        <textarea
          value={source}
          onChange={(e) => setSource(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            padding: "0.75rem",
            borderRadius: 8,
            border: "1px solid rgba(128,128,128,0.35)",
            resize: "vertical",
          }}
        />
        {tokens.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <strong>Tokens ({tokens.length}):</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {tokens.map((t, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.35rem 0.6rem",
                    borderRadius: 6,
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    background: "rgba(0,0,0,0.25)",
                    borderLeft: `3px solid ${TOKEN_COLORS[t.type]}`,
                  }}
                  title={t.type}
                >
                  <span style={{ color: TOKEN_COLORS[t.type], fontSize: "0.7rem" }}>
                    {t.type}
                  </span>
                  <br />
                  {t.value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </SimWorkbench>
  )
}

export default Lexer
