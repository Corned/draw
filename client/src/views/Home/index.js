import React, { useState } from "react"
import { Redirect } from "react-router-dom"

import "./index.scss"

const Home = () => {
  const [ redirectId, setRedirectId ] = useState(null)

  const createPrivate = () => {
    
  }

  const joinPublic = () => {
    setRedirectId("public")
  }

  if (redirectId) {
    return <Redirect to={`/${redirectId}`}/>
  }

  return (
    <div className="home animation-fadein">
      <h1 className="header--giant">Welcome to draw.owo!</h1>
      <div className="buttons">
        <button onClick={joinPublic}>join the public room</button>
        <button onClick={createPrivate} disabled>create a private room</button>
      </div>
    </div>
  )
}

export default Home