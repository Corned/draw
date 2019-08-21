const express = require("express")
const path = require("path")
const socketio = require("socket.io")
const { createCanvas } = require("canvas")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)

const canvas = createCanvas(720, 720)
const ctx = canvas.getContext("2d")

io.on("connection", (socket) => {
  console.log("Someone connected!")
  socket.emit("replication", canvas.toDataURL())

  socket.on("draw", (data) => {
    const { color, size, from, to } = data

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.lineJoin = "round"
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.closePath()
    ctx.stroke()

    socket.broadcast.emit("draw", data)
  })
})

app.use(express.static(path.join(__dirname, "build")))

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "build", "index.html")
  )
})

server.listen(process.env.PORT || 80, () => {
  console.log(`listening to port ${process.env.PORT || 80}.`)
})