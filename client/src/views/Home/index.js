import React from "react"
import { Link } from "react-router-dom"

import "./index.css"

const Home = () => {
  return (
    <div className="home">
      <h1 className="header--giant">Welcome to draw.owo!</h1>
      <h2>Join the public drawing room</h2>
      <Link to="/public">public</Link>
    </div>
  )
}

export default Home