import React, { useState, useEffect } from "react"
import io from "socket.io-client"

import Canvas from "./components/Canvas"
import ColorPicker from "./components/ColorPicker"
import SizePicker from "./components/SizePicker"
import LoadingAnimation from "common/components/LoadingAnimation"

import "./index.scss"

const DrawingTool = ({ match }) => {
   // Probably no need for useState for roomId
  const [ roomId ] = useState(match.params.id)
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ socket, setSocket ] = useState(null)
  
  const [ size, setSize ] = useState(5)
  const [ color, setColor ] = useState("#000000")
  
  useEffect(() => {
    if (!socket) {
      setSocket( io("/canvas") )
      return
    }

    socket.on("connect", () => {
      console.log(`Socket connected! Requesting to join room ${roomId}`)
      socket.emit("room-join", roomId)
    })

    socket.on("room-joined-success", (message) => {
      console.log(`SUCCESS: ${message}`)
      setTimeout(() => setLoading(false), 1000)
    })

    socket.on("room-joined-error", (message) => {
      console.log(`ERROR: ${message}`)
      setError(message)
    })

    // useEffect's cleanup function doesn't fire when
    // the user closes the window.
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault()
      console.log(`CLEANUP! Leaving room ${roomId}`)
      socket.emit("room-leave", roomId)
    })

    return () => {
      console.log(`CLEANUP! Leaving room ${roomId}`)
      socket.emit("room-leave", roomId)
    }
  }, [ roomId, socket ])

  if (error) {
    return <p className="error">{error}</p>
  }

  if (loading) {
    return <LoadingAnimation/>
  }

  return (
    <div className="drawing-tool animation-fadein">
      <p style={{ marginBottom: "3px" }}>
        Invite friends: <span style={{userSelect: "text"}}>{window.location.href}</span>
      </p>
      
      <Canvas 
        roomId={roomId}
        size={size} 
        color={color}
        socket={socket}
      />

      <div className="drawing-tool__toolbar">
        <ColorPicker color={color} setColor={setColor}/>
        <SizePicker size={size} setSize={setSize}/>
      </div>
    </div>
  )
}

export default DrawingTool
