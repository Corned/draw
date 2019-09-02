import React, { useState, useEffect } from "react"

import Header from "./common/components/Header"
import Draw from "./views/Draw"

import "./App.css"

function App() {
  return (
    <div>
      <Header/>
      <div className="app">
        <Draw/>
      </div>
    </div>
  )
}

export default App
