import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  background: ${(props) => props.bgColor};
  border: none;
  color: white;
  padding: 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin: 2px;
  transition: background-color 0.4s ease;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(75%);
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`

const Button = ({ label, onClick, bgColor }) => {
  return (
    <StyledButton onClick={onClick} bgColor={bgColor}>
      {label}
    </StyledButton>
  )
}

export default Button
