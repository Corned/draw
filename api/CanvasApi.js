const express = require("express")
const router = express.Router()
const { createCanvas } = require("canvas")

const canvases = { }

const setupRouter = (io) => {
  router.get("/", (req, res) => {
    res.send("Yeehaw!")
  })

  router.get("/h", (req, res) => {

  })

  router.get("/create/sda", (req, res) => {
    // Create a room and put it in memory
    const id = Math.random().toString(36).substring(2, 8).toUpperCase()
    let nsp = io.of(`/${id}`)
    let users = 0

    canvases[id] = createCanvas(750, 500)

    console.log(`Creating room ${id}!`, 0)

    nsp.on("connection", (socket) => {
      users++
      console.log(`Someone connected to room ${id}! active ${!!canvases[id]}`, users)
      socket.emit("replication", (() => {
        if (!canvases[id]) {
          console.log("Canvas is hopefully garbage collected!")
          return
        }

        return canvases[id].toDataURL()
      })()) // TODO: ew

      socket.once("disconnect", () => {
        users = users - 1
        console.log(`Someone disconnected from room ${id}!`, users)

        if (users === 0) {
          console.log(`Closing room ${id}!`)
          // Gargabe collection, move to rooms?
          canvases[id] = undefined
          
          for (socketId in nsp.connected) {
            nsp.connected[socketId].disconnect()
          }

          nsp.removeAllListeners()
          delete io.nsps[`/${id}`]
        }
      })

      socket.on("draw", (data) => {
        if (!canvases[id]) {
          console.log("Canvas is hopefully garbage collected!")
          return
        }

        const { color, size, from, to } = data
        const ctx = canvases[id].getContext("2d")
    
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

    res.status(200).json({ roomId: id })
  })

  return router
}

module.exports = (io) => setupRouter(io)