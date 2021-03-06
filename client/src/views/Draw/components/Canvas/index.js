import React from "react"

import "./index.scss"

class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      drawing: false,
      lastPoint: { x: null, y: null },
      socket: props.socket,
    }
  }

  componentDidMount() {
    const socket = this.state.socket
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")

    socket.emit("request-replication", this.props.roomId)

    socket.on("replication", (dataUrl) => {
      console.log("replication")
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = dataUrl
    })

    socket.on("draw", (data) => {
      console.log("draw")
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

      const { lastPoint: from } = this.state
      const { color, size } = this.props
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
        size,
        color,
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
          x: (x - left), 
          y: (y - top),
        }
      }

      // Touch events
      const { clientX: x, clientY: y } = event.targetTouches[0]
      return { 
        x: (x - left), 
        y: (y - top),
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
    canvas.addEventListener("mouseleave", stopDrawing, false)

    canvas.addEventListener("touchstart", startDrawing, false)
    canvas.addEventListener("touchmove", draw, false)
    canvas.addEventListener("touchend", stopDrawing, false)
    canvas.addEventListener("touchcancel", stopDrawing, false)
  }

  render() {
    return (
      <canvas
        className="frame"
        width="750"
        height="500"
        ref="canvas"
      />
    )
  }
}

export default Canvas