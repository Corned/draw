import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

import Header from "common/components/Header"
import Routes from "constants/Routes"

import "./index.css"

const App = () => {
  return (
    <div className="app">
      <Header/>
      <Router className="view-container">
        { Routes }
      </Router>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"))