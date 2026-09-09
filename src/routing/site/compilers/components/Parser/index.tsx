import React, { useState } from "react"
import SimWorkbench from "common/components/SimWorkbench"
import { useMarkComplete } from "common/hooks/useMarkComplete"
import { useVisualizerParams } from "common/hooks/useVisualizerParams"

type ASTNode = { type: string; value?: string; children?: ASTNode[] }

function parseExpr(input: string): ASTNode | { error: string } {
  const tokens = input
    .replace(/\s+/g, "")
    .match(/(\d+\.?\d*|[+\-*/()])/g) ?? []
  let pos = 0

  function peek() {
    return tokens[pos]
  }
  function consume(expected?: string) {
    const t = tokens[pos]
    if (expected && t !== expected) return null
    pos++
    return t
  }

  function parseFactor(): ASTNode | null {
    const t = peek()
    if (t === "(") {
      consume("(")
      const node = parseExpr()
      if (!node || "error" in node) return null
      if (!consume(")")) return null
      return { type: "group", children: [node as ASTNode] }
    }
    if (t && /^-?\d/.test(t)) {
      const v = consume()
      return { type: "number", value: v! }
    }
    return null
  }

  function parseTerm(): ASTNode | null {
    let left = parseFactor()
    if (!left) return null
    while (peek() === "*" || peek() === "/") {
      const op = consume()!
      const right = parseFactor()
      if (!right) return null
      left = { type: "binary", value: op, children: [left, right] }
    }
    return left
  }

  function parseExpr(): ASTNode | { error: string } | null {
    let left = parseTerm()
    if (!left) return { error: "Expected expression" }
    while (peek() === "+" || peek() === "-") {
      const op = consume()!
      const right = parseTerm()
      if (!right) return { error: "Expected operand after " + op }
      left = { type: "binary", value: op, children: [left, right] }
    }
    if (pos < tokens.length) return { error: "Unexpected token: " + tokens[pos] }
    return left
  }

  if (!tokens.length) return { error: "Empty expression" }
  return parseExpr()
}

const Parser = () => {
  const markComplete = useMarkComplete()
  const [params, setParams] = useVisualizerParams({ expr: "3+4*2" })
  const [expr, setExpr] = useState(params.expr || "3+4*2")
  const [parsed, setParsed] = useState<ASTNode | { error: string } | null>(null)

  const runParse = () => {
    const result = parseExpr(expr)
    setParsed(result)
    setParams({ expr })
    if (result && !("error" in result)) markComplete()
  }

  return (
    <SimWorkbench
      title="Recursive Descent Parser"
      hint="Enter a simple arithmetic expression. The parser builds an AST respecting operator precedence (* / before + -)."
      toolbar={
        <>
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder="e.g. 3+4*2"
            style={{
              flex: 1,
              minWidth: 120,
              padding: "0.45rem 0.75rem",
              borderRadius: 8,
              border: "1px solid rgba(128,128,128,0.35)",
              fontFamily: "monospace",
            }}
            onKeyDown={(e) => e.key === "Enter" && runParse()}
          />
          <button type="button" className="sim-btn" onClick={runParse}>
            Parse
          </button>
        </>
      }
    >
      <div style={{ padding: "1.25rem" }}>
        {parsed === null ? (
          <p style={{ opacity: 0.6 }}>Enter an expression and click Parse</p>
        ) : "error" in parsed ? (
          <p style={{ color: "#f44336" }}>Error: {parsed.error}</p>
        ) : (
          <TreeNode node={parsed} depth={0} />
        )}
      </div>
    </SimWorkbench>
  )
}

function TreeNode({ node, depth }: { node: ASTNode; depth: number }) {
  const indent = depth * 20
  const label =
    node.value != null ? `${node.type}("${node.value}")` : node.type

  return (
    <div style={{ marginLeft: indent, fontFamily: "monospace", fontSize: "0.9rem" }}>
      <div
        style={{
          padding: "0.25rem 0.5rem",
          borderLeft: "3px solid var(--primary-main, #3949ab)",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      {node.children?.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default Parser
