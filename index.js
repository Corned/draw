const express = require("express")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)


const rooms = [ ]
const { createCanvas } = require("canvas")

const createRoom = (roomName) => ({
  name: roomName,
  users: 0,
  canvas: createCanvas(750, 500),
})

const getRoom = (roomName) => {
  for (const roomData of rooms) {
    if (roomData.name === roomName) {
      return roomData
    }
  }

  return null
}

const formatSocketId = socket => socket.id.substring(23, 28)

io.of("/canvas").on("connection", (socket) => {
  console.log(`Socket connection! | ${formatSocketId(socket)}`)
  socket.on("room-join", (roomName) => {
    console.log(`Socket trying to join room "${roomName}"`)
    if (!getRoom(roomName)) {
      console.log(`Room "${roomName}" doesn't exist, creating one.`)
      rooms.push(createRoom(roomName))
    }

    socket.join(roomName)
    console.log(`Socket joined room "${roomName}"`)

    socket.emit("room-joined-success", `Joined room "${roomName}"`)
  })

  socket.on("request-replication", (roomName) => {
    console.log(`Requesting replication for room "${roomName}" | ${formatSocketId(socket)}`)
    const room = getRoom(roomName)
    socket.emit("replication", room.canvas.toDataURL())
  })

  socket.on("room-leave", (roomName) => {
    console.log(`Socket leaving room "${roomName}"!`)
    socket.leave(roomName)
    console.log(`Disconnecting socket... | ${formatSocketId(socket)}`)
    socket.disconnect(true)
  })

  socket.on("draw", (data) => {
    const rooms = Object.keys(socket.rooms).slice(1)
    if (rooms.length !== 1) {
      return socket.emit("err", "you're joined to multple rooms??")
    }

    const roomName = rooms[0]
    const room = getRoom(roomName)

    const { color, size, from, to } = data
    const ctx = room.canvas.getContext("2d")

    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = size
    ctx.lineJoin = "round"
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.closePath()
    ctx.stroke()

    socket.to(roomName).broadcast.emit("draw", data)
  })

  socket.once("disconnect", (x, y, z) => {
    console.log(`Socket disconnected! | ${formatSocketId(socket)}`)
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