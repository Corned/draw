const express = require("express")
const router = express.Router()

const User = require("../models/user")

router.get("/", async (req, res) => {
  const users = await User.find({})

  res.json(users.map(user => user.toJSON()))
})

router.post("/create", async (req, res) => {

})

router.post("/auth", async (req, res) => {

})

router.delete("/:id", async (req, res) => {
  
})

module.exports = router