import React, { useState } from "react"
import posed from "react-pose"

import NewColorPicker from "./NewColorPicker"

import "./Toolbar.css"

const Toolbar = ({ color, size, setColor, setSize}) => {
  return (
    <div className="Toolbar">
      <NewColorPicker color={color} setColor={setColor}/>
    </div>
  )
}

export default Toolbar
