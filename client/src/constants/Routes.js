import React from "react"
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
    path: "/public",
    component: Draw,
    exact: true,
  },
  {
    path: "/private",
    component: Draw,
    exact: false,
  },
]

export default routeData.map(data => <Route {...data}/>)