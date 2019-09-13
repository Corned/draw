

module.exports = (roomHandler) => {
  console.log(roomHandler)

  const onConnection = (socket) => {
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
    
      if (room.users.length === 0) {
        roomHandler.destroyRoom(roomId)
      }
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
  
    socket.once("request-replication", (roomId) => {
      const room = roomHandler.getRoomById(roomId)
      socket.emit("replication", room.canvas.toDataURL())
    })
  
    socket.once("disconnect", () => {})
  }

  return onConnection
}