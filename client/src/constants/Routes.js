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
    path: "/:id",
    component: Draw,
  },
]

export default routeData.map(data => <Route {...data}/>)