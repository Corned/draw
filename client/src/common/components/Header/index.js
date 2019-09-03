import React, { useState } from "react"
import { Link } from "react-router-dom"
import posed from "react-pose"

import "./index.css"

const Header = () => {
  return (
    <nav className="header">
      <h1 className="header__logo">
        <Link className="header__link" to="/">draw.owo</Link>
      </h1>
      <Link className="header__link" to="/public">canvas</Link>
    </nav>
  )
}

export default Header
