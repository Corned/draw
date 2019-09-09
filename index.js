const express = require("express")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)


const { createCanvas } = require("canvas")


class RoomHandler {
  constructor() {
    this.rooms = []
  }

  createRoom(id) {
    const room = new Room(id)
    this.rooms.push(room)
    return room
  }

  destroyRoom(id) {
    const roomFilter = (roomId) => roomId !== room
    this.rooms = this.rooms.filter(roomFilter)
  }

  getRoomById(id) {
    const roomFilter = (room) => room.id === id
    const filteredRooms = this.rooms.filter(roomFilter)

    return filteredRooms.length > 0 ? filteredRooms[0] : null
  }
}

class Room {
  constructor(id) {
    this.id = id
    this.canvas = createCanvas(750, 500)
    this.users = []
  }

  userExists(id) {
    return this.users.includes(id)
  }

  addUser(id) {
    if (this.users.includes(id))
      return null
    
    this.users.push(id)
  }

  removeUser(id) {
    if (!this.users.includes(id))
      return null

    const userFilter = (userId) => userId !== id
    this.users = this.users.filter(userFilter)
  }
}

const roomHandler = new RoomHandler()

io.of("/canvas").on("connection", (socket) => {

  socket.on("room-join", (roomId) => {
    if (!roomHandler.getRoomById(roomId)) {
      roomHandler.createRoom(roomId)
    }

    const room = roomHandler.getRoomById(roomId)
    if (room.userExists(socket.id)) {
      //return 
    }

    room.addUser(socket.id)
    socket.join(roomId)
    socket.emit("room-joined-success", `Joined room "${roomId}"`)
  })

  socket.on("room-leave", (roomId) => {
    if (!roomHandler.getRoomById(roomId)) {
      return
    }

    const room = roomHandler.getRoomById(roomId)
    if (!room.userExists) {
      //return
    }

    room.removeUser(socket.id)
    socket.leave(roomId)
    socket.disconnect(true)
  })

  socket.once("request-replication", (roomId) => {
    const room = roomHandler.getRoomById(roomId)
    socket.emit("replication", room.canvas.toDataURL())
  })

  socket.once("disconnect", () => {
    
  })

  socket.on("draw", (data) => {
    const rooms = Object.keys(socket.rooms).slice(1)
    if (rooms.length !== 1) {
      return socket.emit("err", "Something went wrong, please refresh the window.")
    }

    const roomId = rooms[0]
    const room = roomHandler.getRoomById(roomId)

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

    socket.to(roomId).broadcast.emit("draw", data)
  })

})

app.use(express.static(path.join(__dirname, "build")))

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "build", "index.html")
  )
})

server.listen(process.env.PORT || 80, () => {
  console.log(`listening to port ${ process.env.PORT || 80 }.`)
})