const app = require("./app")
const socketio = require("socket.io")
const server = require("http").Server(app)

const RoomHandler = require("./classes/RoomHandler")
const roomHandler = new RoomHandler()
const onConnection = require("./SocketFunctions.js")

const io = socketio(server)
io.of("/canvas").on("connection", onConnection(roomHandler))

const { PORT } = require("./util/config")
if (!PORT) {
  console.error("NO PORT DEFINED!")
  process.exit(0)
}

server.listen(PORT, () => {
  console.log(`listening to port ${ PORT }.`)
})