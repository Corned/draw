import React, { useState, useEffect } from "react"
import Draggable from "react-draggable"
import posed from "react-pose"
import classnames from "classnames"

import "./Window.css"

const CollapsableDiv = posed.div({
  open: {
    height: "auto",
  },
  closed: {
    height: "36px",
  },
})

function Window({ className, children }) {
  const [ open, setOpen ] = useState(true)
  const classes = classnames("Window", className)
  
  return (
    <Draggable
      handle=".dragger"
      bounds="parent"
    >
      <CollapsableDiv pose={ open ? "open" : "closed" } className={ classes }>
        <div className="dragger" onDoubleClick={() => setOpen(!open)}>
          <div/>
        </div>
        { children }
      </CollapsableDiv>
    </Draggable>
  )
}

export default Window
