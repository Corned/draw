import React, { useState } from "react"

import Canvas from "./components/Canvas"
import ColorPicker from "./components/ColorPicker"
import SizePicker from "./components/SizePicker"

import "./index.scss"

const DrawingTool = ({ match }) => {
  const [ size, setSize ] = useState(5)
  const [ color, setColor ] = useState("#000000")
  const id = match.params.id

  return (
    <div className="drawing-tool">
      <p style={{ marginBottom: "3px" }}>
        Your invite code: <b>{id}</b>
      </p>
      <Canvas 
        size={size} 
        color={color}
        id={id}
      />

      <div className="drawing-tool__toolbar">
        <ColorPicker color={color} setColor={setColor}/>
        <SizePicker size={size} setSize={setSize}/>
      </div>
    </div>
  )
}

export default DrawingTool
