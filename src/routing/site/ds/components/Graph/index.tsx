import React, { useReducer } from "react"
import styled, { keyframes } from "styled-components"

const initialState = {
  nodes: [],
  edges: [],
}

const graphReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODE":
      return { ...state, nodes: [...state.nodes, action.payload] }
    case "ADD_EDGE":
      return { ...state, edges: [...state.edges, action.payload] }
    case "CLEAR_GRAPH":
      return initialState
    default:
      return state
  }
}

const GraphVisualizer = () => {
  const [state, dispatch] = useReducer(graphReducer, initialState)
  const { nodes, edges } = state

  const handleAddNode = () => {
    const id = nodes.length + 1
    const x = 50 + Math.random() * 200
    const y = 50 + Math.random() * 200
    dispatch({ type: "ADD_NODE", payload: { id, x, y } })
  }

  const handleAddEdge = () => {
    if (nodes.length < 2) return
    const source = nodes[Math.floor(Math.random() * nodes.length)].id
    let target
    do {
      target = nodes[Math.floor(Math.random() * nodes.length)].id
    } while (source === target)
    dispatch({ type: "ADD_EDGE", payload: { source, target } })
  }

  const handleClearGraph = () => {
    dispatch({ type: "CLEAR_GRAPH" })
  }

  return (
    <Container>
      <Header>Randomized Graph Visualizer</Header>
      <ButtonGroup>
        <Button onClick={handleAddNode}>Add Node</Button>
        <Button onClick={handleAddEdge}>Add Edge</Button>
        <Button onClick={handleClearGraph}>Clear Graph</Button>
      </ButtonGroup>{" "}
      <GraphContainer>
        {edges.map((edge, index) => (
          <Edge
            key={index}
            x1={nodes.find((node) => node.id === edge.source).x}
            y1={nodes.find((node) => node.id === edge.source).y}
            x2={nodes.find((node) => node.id === edge.target).x}
            y2={nodes.find((node) => node.id === edge.target).y}
          />
        ))}
        {nodes.map((node) => (
          <Node key={node.id} x={node.x} y={node.y}>
            {node.id}
          </Node>
        ))}
      </GraphContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.h4`
  color: #1b368d;
`

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const GraphContainer = styled.div`
  position: relative;
  width: 90%;
  height: 70vh;
  max-width: 800px;
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #ccc;
  margin: 20px auto;
`

const Node = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`

const drawLine = keyframes`
  from {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
  }
`

const Edge = styled.svg.attrs((props) => ({
  children: (
    <line
      x1={props.x1}
      y1={props.y1}
      x2={props.x2}
      y2={props.y2}
      stroke="black"
    />
  ),
}))`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${drawLine} 1s linear;
`

export default GraphVisualizer
