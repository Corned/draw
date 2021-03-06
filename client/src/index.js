import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import Header from "common/components/Header"
import Routes from "constants/Routes"

import "./index.scss"
import "./animations.scss"

const App = () => {
  document.title = "Draw!"
  return (
    <Router>
      <div className="app">
        <Header/>
        <div className="view-container">
          { Routes }
        </div>
      </div>
    </Router>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))