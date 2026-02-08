import React from "react"
import styled from "styled-components"

const DisplayWrapper = styled.div`
  background: #333;
  color: white;
  text-align: right;
  padding: 20px;
  font-size: 2em;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow-x: auto;
`

const Display = ({ value }) => {
  return <DisplayWrapper>{value}</DisplayWrapper>
}

export default Display
