import React, { useState } from "react"
import posed from "react-pose"

import colors from "../constants/Colors"
import "./ColorPicker.css"

import Window from "./Window"


const ColorPicker = () => {
  return (
    <Window>
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
