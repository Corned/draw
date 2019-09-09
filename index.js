const express = require("express")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)


const rooms = [ ]

io.of("/canvas").on("connection", (socket) => {
  console.log(`Socket connection! | ${socket.id}`)
  socket.on("room-join", (roomName) => {
    console.log(`Socket trying to join room ${roomName}`)
    if (!rooms.includes(roomName)) {
      console.log(`Room ${roomName} doesn't exist, creating once.`)
      rooms.push(roomName)
      //return socket.emit("err", `Invalid room name ${roomName}`)
    }

    socket.join(roomName)
    console.log(`Socket managed to join room ${roomName}`)
    return socket.emit("success", `Joined room ${roomName}`)
  })

  socket.on("draw", (data) => {
    const rooms = Object.keys(socket.rooms).slice(1)
    if (rooms.length !== 1) {
      return socket.emit("err", "you're joined to multple rooms??")
    }

    const room = rooms[0]
    socket.broadcast.to(room).emit("draw", data)
  })

  socket.once("disconnect", () => {
    console.log(`Socket disconnected! | ${socket.id}`)
  })
})









app.use(express.static(path.join(__dirname, "build")))
app.use("/api/canvas", require("./api/CanvasApi")(io))

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "build", "index.html")
  )
})

server.listen(process.env.PORT || 80, () => {
  console.log(`listening to port ${ process.env.PORT || 80 }.`)
})