const express = require("express")
const app = express()
const path = require("path")

const RoomApi = require("../controllers/Room")

app.use("/api/room", RoomApi)
app.use(express.static(path.join(__dirname, "../build")))

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build", "index.html")
  )
})

module.exports = app