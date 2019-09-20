const { NODE_ENV } = process.env
if (NODE_ENV !== "production") {
  require("dotenv").config()
}

let { PORT, DB_URL } = process.env
if (NODE_ENV === "test") {
  PORT = process.env.TEST_PORT
  // TEST_DB_URL doesn't exist yet
  // DB_URL = process.env.TEST_DB_URL
}

module.exports = { PORT, DB_URL }