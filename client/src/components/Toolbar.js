import React, { useState } from "react"
import posed from "react-pose"

import ColorPicker from "./ColorPicker"
import SizePicker from "./SizePicker"

import "./Toolbar.css"

const Toolbar = ({ color, size, setColor, setSize}) => {
  return (
    <div className="toolbar">
      <ColorPicker color={color} setColor={setColor}/>
      <SizePicker size={size} setSize={setSize}/>
    </div>
  )
}

export default Toolbar
