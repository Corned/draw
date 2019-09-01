import React, { useState } from "react"
import posed from "react-pose"

import Canvas from "./Canvas"
import Toolbar from "./Toolbar"

import "./DrawingTool.css"

const DrawingTool = () => {
  const [ size, setSize ] = useState(5)
  const [ color, setColor ] = useState("#000000")

  return (
    <div className="drawing-tool">
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
