import React, { useState } from "react"
import { Link, Redirect } from "react-router-dom"
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
  const [ redirectId, setRedirectId ] = useState(null)

  const createPrivate = () => {
    fetch("/api/canvas/create")
      .then(response => response.json())
      .then(({ roomId }) => setRedirectId(roomId))
  }

  if (redirectId) {
    return <Redirect to={`/private/${redirectId}`}/>
  }

  return (
    <div className="home">
      <h1 className="header--giant">Welcome to draw.owo!</h1>
      <div className="buttons">
        <button disabled>join the public room</button>
        <button onClick={createPrivate}>create a private room</button>
        <button disabled>join a private room</button>
      </div>
    </div>
  )
}

export default Home