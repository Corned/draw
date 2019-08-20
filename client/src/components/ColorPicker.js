import React from "react"
import posed from "react-pose"

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

const ColorPicker = ({ color, setColor }) => {
  return (
    <div className="ColorPicker">
      { colors.map(hex => {
        
        return (
          <PickColor 
            className="color-option" 
            style={{backgroundColor: hex}}
            onClick={() => setColor(hex)}
          >
            <SelectionIndicator
              pose={ color === hex ? "selected" : "init" }
            />
          </PickColor>
        )

      })}
    </div>
  )
}

export default ColorPicker
