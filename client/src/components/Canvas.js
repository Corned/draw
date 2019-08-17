import React, { useRef, forwardRef, useEffect, useState } from "react"
import Window from "./Window"
import io from "socket.io-client"

import "./Canvas.css"

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      color: "black",
      size: 4,
      drawing: false,
      lastPoint: { x: null, y: null },
    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    const socket = io("/")

    socket.on("draw", (data) => {
      const { color, size, from, to } = data

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineJoin = "round"
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.closePath()
      ctx.stroke()
    })

    const draw = (event) => {
      if (!this.state.drawing)
        return

      const color = "black"
      const size = 2
      const from = this.state.lastPoint
      const to = getPoint(event)

      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = size
      ctx.lineJoin = "round"
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.closePath()
      ctx.stroke()

      socket.emit("draw", {
        from,
        to,
        size: 2,
        color: "black",
      })
      
      this.setState({ 
        lastPoint: to
      })
    }

    const getPoint = (event) => {
      const { left, top } = canvas.getBoundingClientRect()

      if (event.type.startsWith("mouse")) {
        const { clientX: x, clientY: y } = event
        return { 
          x: (x - left) / 2, 
          y: (y - top) / 2,
        }
      }

      // Touch events
      const { clientX: x, clientY: y } = event.targetTouches[0]
      return { 
        x: (x - left) / 2, 
        y: (y - top) / 2,
      }
    }

    const startDrawing = (event) => {
      event.preventDefault()

      this.setState({
        drawing: true,
        lastPoint: getPoint(event),
      })

      draw(event)
    }

    const stopDrawing = (event) => {
      event.preventDefault()

      this.setState({ 
        drawing: false,
        lastPoint: { x: null, y: null },
      })
    }

    canvas.addEventListener("mousedown", startDrawing, false)
    canvas.addEventListener("mousemove", draw, false)
    canvas.addEventListener("mouseup", stopDrawing, false)

    canvas.addEventListener("touchstart", startDrawing, false)
    canvas.addEventListener("touchmove", draw, false)
    canvas.addEventListener("touchend", stopDrawing, false)
  }

  render() {
    return (
      <Window className="Canvas">
        <h1>Canvas</h1>
        <canvas ref="canvas"/>
      </Window>
    )
  }
}

export default Canvas