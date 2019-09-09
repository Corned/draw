const Room = require("./Room")

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
    const roomFilter = (roomId) => roomId !== id
    const l = this.rooms.length
    
    for (let index in this.rooms) {
      if (this.rooms[index].id === id) {
        return this.rooms.splice(index, 1)
      }
    }
  }

  getRoomById(id) {
    const roomFilter = (room) => room.id === id
    const filteredRooms = this.rooms.filter(roomFilter)

    return filteredRooms.length > 0 ? filteredRooms[0] : null
  }
}

module.exports = RoomHandler