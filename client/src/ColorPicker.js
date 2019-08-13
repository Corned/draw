import React, { useState } from "react"
import Draggable from "react-draggable"

import colors from "./constants/Colors"
import "./ColorPicker.css"

const ColorPicker = () => {
  return (
    <Draggable handle=".dragger">
      <div className="ColorPicker">
        <div className="dragger">
          <div/>
        </div>
        <h1>Picker of Colors</h1>
        <ColorOptions/>
      </div>
    </Draggable>
  )
}

function ColorOptions() {
  return (
    <div className="color-options">
      { colors.map(hex => (
        <div className="color-option" style={{backgroundColor: hex}}/>
      ))}
    </div>
  )
}

export default ColorPicker
