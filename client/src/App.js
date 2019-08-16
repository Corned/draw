import React, { useState, useEffect } from "react"
import ColorPicker from "./components/ColorPicker"
import Canvas from "./components/Canvas"

import "./App.css"

function App() {
  return (
    <div className="App">
      <Canvas/>
      <ColorPicker/>
    </div>
  )
}

export default App
