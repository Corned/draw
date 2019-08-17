const express = require("express")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)

io.on("connection", (socket) => {
  console.log("Someone connected!")
  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data)
  })
})


app.get("/", (req, res) => {
  res.status(200).sendFile(
    path.join(__dirname, "build", "index.html")
  )
})

server.listen(process.env.PORT || 80, () => {
  console.log(`listening to port ${process.env.PORT || 80}.`)
})