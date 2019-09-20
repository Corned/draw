const supertest = require("supertest")
const app = require("./app")

const api = supertest(app)


test("/ serves the React app", async () => {
  await api
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/html; charset=UTF-8")
})