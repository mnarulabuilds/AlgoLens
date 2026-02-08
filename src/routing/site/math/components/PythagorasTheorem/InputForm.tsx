import React from "react"
import styled from "styled-components"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #00796b;
  }
`

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 2px solid #00796b;
  border-radius: 4px;
  width: 200px;
  font-size: 1em;
  transition: border-color 0.3s;

  &:focus {
    border-color: #004d40;
    outline: none;
  }
`

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #00796b;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #004d40;
  }
`

const InputForm = ({ setSideA, setSideB }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setSideA(Number(form.elements.sideA.value))
    setSideB(Number(form.elements.sideB.value))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Side A (0 to 25):{" "}
        <Input name="sideA" type="number" defaultValue={3} min="0" max="25" />
      </label>
      <label>
        Side B (0 to 25):{" "}
        <Input name="sideB" type="number" defaultValue={4} min="0" max="25" />
      </label>
      <Button type="submit">Calculate</Button>
    </Form>
  )
}

export default InputForm
