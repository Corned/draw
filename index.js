const express = require("express")
const path = require("path")
const socketio = require("socket.io")

const app = express()
const server = require("http").Server(app)
const io = socketio(server)


app.use(express.static(path.join(__dirname, "build")))
app.use("/api", require("./api/RoomApi")(io))

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "build", "index.html")
  )
})

server.listen(process.env.PORT || 80, () => {
  console.log(`listening to port ${ process.env.PORT || 80 }.`)

  new (require("./api/RoomHandler"))(io, true)
})