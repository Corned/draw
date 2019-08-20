import React, { useState } from "react"
import posed from "react-pose"

import Canvas from "./Canvas"
import Toolbar from "./Toolbar"

import "./DrawingTool.css"

const DrawingTool = () => {
  const [ size, setSize ] = useState(2)
  const [ color, setColor ] = useState("#000000")

  console.log("YEET")

  return (
    <div className="DrawingTool">
      <Canvas 
        size={size} 
        color={color}
      />

      <Toolbar
        size={size}
        color={color}
        setSize={setSize}
        setColor={setColor}
      />
    </div>
  )
}

export default DrawingTool
