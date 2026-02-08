import React, { useCallback } from "react"

const CanvasImage = ({ fill }) => {
  const captureMousePixel = useCallback((event) => {
    const image = document.getElementById("cusImage")
    const details = document.getElementById("detailsPane")
    const ctx = image.getContext("2d")
    const imageData = ctx.getImageData(
      event.nativeEvent.offsetX,
      event.nativeEvent.offsetY,
      1,
      1
    )
    const pixelData = imageData.data
    details.innerHTML = `R: ${pixelData[0]}<br>G: ${pixelData[1]}<br>B: ${pixelData[2]}<br>A: ${pixelData[3]}`
  }, [])

  const hexToRgb = useCallback((hex) => {
    return hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16))
  }, [])

  const fillPixel = useCallback(
    (fillColor, xPos, yPos, firstRgb, image) => {
      if (xPos < 0 || xPos >= image.width || yPos < 0 || yPos >= image.height) {
        return
      }

      const ctx = image.getContext("2d")
      const imageData = ctx.getImageData(xPos, yPos, 1, 1)
      const pixelData = imageData.data

      if (
        pixelData[0] !== firstRgb[0] ||
        pixelData[1] !== firstRgb[1] ||
        pixelData[2] !== firstRgb[2]
      ) {
        return
      }

      const rgb = hexToRgb(fillColor)
      const newImageData = ctx.createImageData(1, 1)
      const newPixelData = newImageData.data
      newPixelData[0] = rgb[0]
      newPixelData[1] = rgb[1]
      newPixelData[2] = rgb[2]
      newPixelData[3] = 255

      ctx.putImageData(newImageData, xPos, yPos)

      setTimeout(
        () => fillPixel(fillColor, xPos + 1, yPos, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos + 1, yPos - 1, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos + 1, yPos + 1, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos, yPos + 1, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos, yPos - 1, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos - 1, yPos, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos - 1, yPos - 1, firstRgb, image),
        20
      )
      setTimeout(
        () => fillPixel(fillColor, xPos - 1, yPos + 1, firstRgb, image),
        20
      )
    },
    [hexToRgb]
  )

  const handleCanvasClick = useCallback(
    (event) => {
      const xPos = event.nativeEvent.offsetX
      const yPos = event.nativeEvent.offsetY

      const image = document.getElementById("cusImage")
      const ctx = image.getContext("2d")
      const imageData = ctx.getImageData(xPos, yPos, 1, 1)
      const originalRgb = imageData.data

      fillPixel(fill, xPos, yPos, originalRgb, image)
    },
    [fill, fillPixel]
  )

  return (
    <canvas
      id="cusImage"
      width="360"
      height="360"
      style={{
        cursor: "crosshair",
        margin: "5% auto",
        border: "1px solid #bbb",
      }}
      onMouseMove={captureMousePixel}
      onClick={handleCanvasClick}
    ></canvas>
  )
}

export default CanvasImage
