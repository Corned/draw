import React, { useState } from "react"
import posed from "react-pose"

import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <h1 className="logo">OwO</h1>
      <a>home</a>
      <a>weather</a>
      <a className="current">draw</a>
      <a>chat</a>
    </div>
  )
}

export default Header
