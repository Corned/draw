const User = require("../models/user")
const Room = require("../models/room")

const initialUsers = [
  { username: "Anthony", authKey: "secret", rooms: [] },
  { username: "Bethany", authKey: "secret", rooms: [] },
  { username: "Cecil", authKey: "secret", rooms: [] },
  { username: "David", authKey: "secret", rooms: [] },
  { username: "Einstein", authKey: "secret", rooms: [] },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const roomsInDb = async () => {
  const rooms = await Room.find({})
  return rooms.map(room => room.toJSON())
}

const initialRooms = [

]

module.exports = {
  initialUsers, initialRooms,
  usersInDb, roomsInDb,
}