const express = require("express")
const router = express.Router()

const Room = require("./RoomHandler")
const rooms = []


module.exports = (io) => {
  router.get("/", (req, res) => {
    res.send("yeet")
  })
  
  router.get("/create-room", (req, res) => {
    const room = new Room(io)
    rooms.push(room)
    res.status(200).json({ roomId: room.id })
  })

  return router
}