const socketio = require("socket.io")
const { createCanvas } = require("canvas")

const generate = () => {
  return Math.random().toString(36).substring(2).toUpperCase()
}

class Room {
  constructor(io, isPublic) {
    this.id = isPublic ? "public" : generate()
    this.nsp = io.of(`/${this.id}`)
    this.users = 0

    this.canvas = createCanvas(750, 500)
    this.ctx = this.canvas.getContext("2d")
    this.ctx.fillStyle = "white"
    this.ctx.fillRect(0, 0, 750, 500)

    console.log(`Creating room ${this.id}!`, this.users)

    this.nsp.on("connection", (socket) => {
      this.users = this.users + 1
      console.log(`Someone connected to room ${this.id}!`, this.users)
      socket.emit("replication", this.canvas.toDataURL())
      
      socket.once("disconnect", () => {
        this.users = this.users - 1
        console.log(`Someone disconnected from room ${this.id}!`, this.users)

        if (this.users === 0) {
          console.log(`Closing room ${this.id}!`) // ??
        }
      })
    
      socket.on("draw", (data) => {
        const { color, size, from, to } = data

        const ctx = this.canvas.getContext("2d")
    
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = size
        ctx.lineJoin = "round"
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.closePath()
        ctx.stroke()
    
        socket.broadcast.emit("draw", data)
      })
    })

  }

  get id() {
    return this._id
  }

  set id(id) {
    this._id = id
  }
}

module.exports = Room