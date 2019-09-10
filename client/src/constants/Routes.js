import React from "react"
import { Route } from "react-router-dom"

import Home from "views/Home"
import Draw from "views/Draw"

const routeData = [
  {
    key: "home",
    path: "/",
    component: Home,
    exact: true,
  },
  {
    key: "canvas",
    path: "/:id",
    component: Draw,
  },
]

export default routeData.map(data => <Route {...data}/>)