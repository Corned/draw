const app = require("./src/app")
const socketio = require("socket.io")
const server = require("http").Server(app)

const RoomHandler = require("./src/classes/RoomHandler")
const roomHandler = new RoomHandler()
const onConnection = require("./src/SocketFunctions.js")

const io = socketio(server)
io.of("/canvas").on("connection", onConnection(roomHandler))

const { PORT } = require("./util/config")

server.listen(PORT, () => {
  console.log(`listening to port ${ PORT }.`)
})