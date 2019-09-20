const { NODE_ENV } = process.env
if (NODE_ENV !== "production") {
  require("dotenv").config()
}

let { PORT } = process.env
if (NODE_ENV === "test") {
  PORT = process.env.TEST_PORT
}

module.exports = { PORT }