import React from "react"
import ReactDOM from "react-dom"
import { Route } from "react-router-dom"

import Home from "views/Home"
import Draw from "views/Draw"

const routeData = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/draw",
    component: Draw,
    exact: false,
  },
]

export default routeData.map(data => <Route {...data}/>)