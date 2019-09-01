import React from "react"
import posed from "react-pose"

import colors from "../constants/Colors"
import "./NewColorPicker.css"

const PickColor = posed.div({
  pressable: true,
  hoverable: true,

  init: {
    scale: 1,
  },
  press: {
    scale: 0.975,
  },
  hover: {
    scale: 1.05,
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

const NewColorPicker = ({ color, setColor }) => {
  //const color = "#4BCB7C"
  console.log(color)
  const textColor = getContrastYIQ(color)

  return (
    <div className="NewColorPicker">
      <div className="hex-input" style={{backgroundColor:color}}>
        <p style={{color:textColor}}>{color}</p>
      </div>
      
      <div className="color-options">
        { colors.map(hex => {
          
          return (
            <PickColor 
              className="color-option" 
              style={{backgroundColor: hex}}
              onClick={() => setColor(hex)}
            />
          )

        })}
      </div>
    </div>
  )
}

export default NewColorPicker
