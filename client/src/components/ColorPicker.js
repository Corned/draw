import React, { useState } from "react"
import posed from "react-pose"
import classnames from "classnames"
import Window from "./Window"

import colors from "../constants/Colors"
import "./ColorPicker.css"

const PickColor = posed.div({
  pressable: true,
  hoverable: true,

  init: {
    scale: 1,
  },
  press: {
    scale: 0.95,
  },
  hover: {
    scale: 1.05,
  },
})

const SelectionIndicator = posed.div({
  init: {
    scale: 0,
    opacity: 0,
  },

  selected: {
    scale: 0.75,
    opacity: 1,
  }
})

const ColorPicker = () => {
  return (
    <Window className="ColorPicker">
      <h1>Colorpicker</h1>
      <ColorOptions/>
    </Window>
  )
}

function ColorOptions() {
  const [ selected, setSelected ] = useState(null)

  return (
    <div className="color-options">
      { colors.map(hex => {
        
        return (
          <PickColor 
            className="color-option" 
            style={{backgroundColor: hex}}
            onClick={() => setSelected(hex)}
          >
            <SelectionIndicator
              pose={selected===hex?"selected":"init"}
            />
          </PickColor>
        )
      })}
    </div>
  )
}

export default ColorPicker
