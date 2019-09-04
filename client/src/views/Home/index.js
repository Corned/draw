import React from "react"
import { Link } from "react-router-dom"
import posed from "react-pose"

import "./index.css"

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
      <div className="">
        <button className="">join the public room</button>
        <button className="">create a private room</button>
      </div>
    </div>
  )
}

export default Home