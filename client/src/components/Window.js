import React, { useState, useEffect } from "react"
import Draggable from "react-draggable"
import posed from "react-pose"

import "./Window.css"

const CollapsableDiv = posed.div({
  open: {
    height: "auto",
  },
  closed: {
    height: "36px",
  },
})

function Window(props) {
  const [ open, setOpen ] = useState(true)
  
  return (
    <Draggable
      handle=".dragger"
      bounds="parent"
    >
      <CollapsableDiv pose={ open ? "open" : "closed" } className="Window">
        <div className="dragger" onDoubleClick={() => setOpen(!open)}>
          <div/>
        </div>
        { props.children }
      </CollapsableDiv>
    </Draggable>
  )
}

export default Window
