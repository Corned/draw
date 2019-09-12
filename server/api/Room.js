const express = require("express")
const router = express.Router()

const RoomHandler = require("../classes/RoomHandler")
const roomHandler = new RoomHandler()

const onConnection = (socket) => {
  const onRoomJoin = (roomId) => {
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
    console.log(room.users)
  }
  
  const onRoomLeave = (roomId) => {
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

    console.log(room.users)

    if (room.users.length === 0) {
      roomHandler.destroyRoom(roomId)
    }
  }
  
  const onRequestReplication = (roomId) => {
    const room = roomHandler.getRoomById(roomId)
    socket.emit("replication", room.canvas.toDataURL())
  }
  
  const onDisconnect = () => {}
  
  const onDraw = (data) => {
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
  }

  socket.on("room-join", onRoomJoin)
  socket.on("room-leave", onRoomLeave)
  socket.on("draw", onDraw)
  socket.once("request-replication", onRequestReplication)
  socket.once("disconnect", onDisconnect)
}


module.exports = (io) => {
  io.of("/canvas").on("connection", onConnection)
  return router
}