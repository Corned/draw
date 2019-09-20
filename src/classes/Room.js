const { createCanvas } = require("canvas")

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

module.exports = Room