import React, { useState } from "react"
import posed from "react-pose"
import Window from "./Window"

import colors from "../constants/Colors"
import "./ColorPicker.css"



const ColorPicker = () => {
  return (
    <Window className="ColorPicker">
      <h1>Picker of Colors</h1>
      <ColorOptions/>
    </Window>
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
