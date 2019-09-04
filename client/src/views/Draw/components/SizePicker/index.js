import React from "react"
import posed from "react-pose"
import classnames from "classnames"

import "./index.scss"

const SizeGridOption = posed.div({
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

const SizePicker = ({ size: currentSize, setSize }) => {
  const sizes = [ 2, 5, 8, 11, 14, 17, 20, 23, 26]

  return (
    <div className="frame frame--padding">
      <div className="size-grid">
        {
          sizes.map((size) => {
            const classes = classnames({
              "size-grid__option": true,
              "size-grid__option--selected": currentSize === size,
            })

            return (
              <SizeGridOption 
                className={classes}
                onClick={() => setSize(size)}
              >
                <div 
                  className="size-grid__option__indicator"
                  style={{ width: size, height: size }}
                />
              </SizeGridOption>
            )
          })
        }
      </div>
    </div>
  )
}

export default SizePicker
