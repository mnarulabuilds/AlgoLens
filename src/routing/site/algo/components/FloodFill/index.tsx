import React, { useState, useCallback, lazy } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  InputGroup,
  Input,
  Alert,
  Button,
} from "reactstrap"
import DetailsPane from "./DetailsPane"
import { SketchPicker } from "react-color"

const CanvasImage = lazy(() => import("./CanvasImage"))

const FloodFill = () => {
  const [alert, setAlert] = useState(null)
  const [background, setBackground] = useState("#fff")

  const handleChangeComplete = useCallback((color) => {
    setBackground(color.hex)
  }, [])

  const getClearedCanvas = useCallback(() => {
    const canvas = document.getElementById("cusImage")
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    return ctx
  }, [])

  const getCustomImage = useCallback((event) => {
    const file = event.target.files[0]

    if (!file.type.startsWith("image/")) {
      setAlert("Please upload an image")
      setTimeout(() => setAlert(null), 5000)
      return
    }

    const img = new Image()
    const url = URL.createObjectURL(file)
    img.src = url

    img.onload = () => {
      const ctx = getClearedCanvas()
      ctx.drawImage(img, 0, 0, 360, 360)

      setAlert(
        "Click at a position in the image to start flood fill with the color of your choice"
      )
      setTimeout(() => setAlert(null), 5000)
    }
  }, [])

  return (
    <Container>
      <Row>
        <Col sm={12}>{alert && <Alert color="primary">{alert}</Alert>}</Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Card style={{ border: "1px solid rgba(22,45,167,0.9)" }}>
            <CardHeader>Flood Fill Algorithm on Custom Image</CardHeader>
            <CardBody className="text-center">
              <CardTitle>Choose Custom Image</CardTitle>
              <InputGroup>
                <Input
                  id="getCustomImage"
                  type="file"
                  placeholder="Custom Image"
                  onChange={getCustomImage}
                />
              </InputGroup>
              <Button
                color="info"
                outline
                onClick={getClearedCanvas}
                className="mt-4"
              >
                Clear Canvas
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm={6}>
          <SketchPicker
            color={background}
            onChangeComplete={handleChangeComplete}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <CanvasImage fill={background} />
        </Col>
        <Col sm={6}>
          <DetailsPane />
        </Col>
      </Row>
    </Container>
  )
}

export default FloodFill
