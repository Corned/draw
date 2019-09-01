import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import DrawingTool from "./components/DrawingTool"

import "./App.css"

function App() {
  return (
    <div>
      <Header/>
      <div className="app">
        <DrawingTool/>
      </div>
    </div>
  )
}

export default App
