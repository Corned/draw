import React, { useState } from "react"

import Canvas from "./components/Canvas"
import ColorPicker from "./components/ColorPicker"
import SizePicker from "./components/SizePicker"

import "./index.css"

const DrawingTool = () => {
  const [ size, setSize ] = useState(5)
  const [ color, setColor ] = useState("#000000")

  return (
    <div className="drawing-tool">
      <Canvas 
        size={size} 
        color={color}
      />

      <div className="drawing-tool__toolbar">
        <ColorPicker color={color} setColor={setColor}/>
        <SizePicker size={size} setSize={setSize}/>
      </div>
    </div>
  )
}

export default DrawingTool
