import React from "react"
import { Link } from "react-router-dom"
import posed from "react-pose"

import "./index.scss"

const Button = posed.button({
  hoverable: true,

  init: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
  },
})

const Home = () => {
  return (
    <div className="home">
      <h1 className="header--giant">Welcome to draw.owo!</h1>
      <div className="buttons">
        <Link to="/public">
          <button>join the public room</button>
        </Link>
        <button disabled>create a private room</button>
        <button disabled>join a private room</button>
      </div>
    </div>
  )
}

export default Home