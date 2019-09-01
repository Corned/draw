import React from "react"
import posed from "react-pose"

import colors from "../constants/Colors"
import "./ColorPicker.css"

const ColorGridOption = posed.div({
  pressable: true,
  hoverable: true,

  init: {
    scale: 1,
  },
  press: {
    scale: 0.9,
  },
  hover: {
    scale: 1.1,
  },
})

const getContrastYIQ = (hexColor) => {
  hexColor = hexColor.replace("#", "")
  const r = parseInt(hexColor.substr(0,2), 16);
  const g = parseInt(hexColor.substr(2,2), 16);
  const b = parseInt(hexColor.substr(4,2), 16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 156) ? '#000000' : '#ffffff';
}

const NewColorPicker = ({ color: currentColor, setColor }) => {
  const textColor = getContrastYIQ(currentColor)

  return (
    <div className="frame frame--padding">
      <div 
        className="hex-input" 
        style={{ backgroundColor:currentColor }}>
        <p 
          className="hex-input__code"
          style={{ color: textColor }}>
          {currentColor}
        </p>
      </div>
      
      <div className="color-grid">
        { colors.map((color) => (
            <ColorGridOption 
              className="color-grid__option" 
              style={{ backgroundColor: color }}
              onClick={() => setColor(color)}
            />
          )
        )}
      </div>
    </div>
  )
}

export default NewColorPicker
