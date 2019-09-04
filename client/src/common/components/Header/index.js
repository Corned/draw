import React from "react"
import { Link } from "react-router-dom"

import "./index.scss"

const Navigation = () => {
  return (
    <nav className="nav">
      <h1 className="nav__logo">
        <Link className="nav__link" to="/">draw.owo</Link>
      </h1>
    </nav>
  )
}

export default Navigation
