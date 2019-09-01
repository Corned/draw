import React, { useState } from "react"
import posed from "react-pose"

import ColorPicker from "./ColorPicker"

import "./Toolbar.css"

const Toolbar = ({ color, size, setColor, setSize}) => {
  return (
    <div className="frame toolbar">
      <ColorPicker color={color} setColor={setColor}/>
    </div>
  )
}

export default Toolbar
