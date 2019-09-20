const express = require("express")
const path = require("path")
const mongoose = require("mongoose")

const app = express()

const config = require("./util/config")
const roomRouter = require("./controllers/room")
const userRouter = require("./controllers/user")

mongoose.connect(config.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`)
  })

app.use("/api/room", roomRouter)
app.use("/api/user", userRouter)
app.use(express.static(path.join(__dirname, "../build")))

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build", "index.html")
  )
})

module.exports = app