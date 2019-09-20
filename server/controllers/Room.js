const express = require("express")
const router = express.Router()

const RoomHandler = require("../src/classes/RoomHandler")
const roomHandler = new RoomHandler()

const generateUniqueID = () => {
  let id

  do {
    id = Math.random().toString(36).substring(2, 8).toUpperCase()
  } while (roomHandler.getRoomById(id))

  return id
}

router.get("/create", (req, res) => {
  const id = generateUniqueID()
  res.status(200).json({ id })
})


module.exports = router