const express = require("express")
const router = express.Router()

const RoomHandler = require("../classes/RoomHandler")
const roomHandler = new RoomHandler()

const onConnection = require("../SocketFunctions")

const generateUniqueID = () => {
  let id

  do {
    id = Math.random().toString(36).substring(2, 8).toUpperCase()
  } while (roomHandler.getRoomById(id))

  return id
}

router.get("/", (req, res) => {
res.status(200).json({ x: "what" })
})

router.get("/create", (req, res) => {
  const id = generateUniqueID()

  console.log(id)

  res.status(200).json({ id })
})


module.exports = (io) => {

  io.of("/canvas").on("connection", onConnection(roomHandler))

  return router
}