import React, { useRef, forwardRef, useEffect, useState } from "react"
import Window from "./Window"

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

    const draw = (event) => {
      const rect = canvas.getBoundingClientRect()

      const x = (event.clientX - rect.left) / 2
      const y = (event.clientY - rect.top) / 2

      ctx.beginPath()
      ctx.strokeStyle = "black"
      ctx.lineWidth = 4
      ctx.lineJoin = "round"
      ctx.moveTo(this.state.lastPoint.x, this.state.lastPoint.y)
      ctx.lineTo(x, y)
      ctx.closePath()
      ctx.stroke()
      
      this.setState({ lastPoint: { x, y }})
    }

    const stopDrawing = () => {
      this.setState({ 
        drawing: false,
        lastPoint: { x: null, y: null },
      })
    }

    canvas.addEventListener("mousedown", (event) => {
      const rect = canvas.getBoundingClientRect()

      this.setState({ 
        drawing: true,
        lastPoint: { 
          x: (event.clientX - rect.left) / 2, 
          y: (event.clientY - rect.top) / 2,
        },
      })

      draw(event)
      event.preventDefault()
    }, false);

    canvas.addEventListener("mousemove", (event) => {
      if (!this.state.drawing) return

      draw(event)
      event.preventDefault()
    }, false);

    canvas.addEventListener("mouseup", (event) => {
      stopDrawing()
      event.preventDefault()
    }, false);
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